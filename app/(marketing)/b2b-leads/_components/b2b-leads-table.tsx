"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { COUNTRY_LIST } from "./data";
import { deleteB2BLead } from "@/actions/deleteB2BLead";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

export interface B2BLeadsTableProps {
  result: any[];
  total: number;
}

export default function B2BLeadsTable({ result, total }: B2BLeadsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  /* ---------------- URL VALUES ---------------- */
  const filters = {
    businessType: searchParams.get("businessType") || "",
    primaryIndustry: searchParams.get("primaryIndustry") || "",
    niche: searchParams.get("niche") || "",
    city: searchParams.get("city") || "",
    country: searchParams.get("country") || "",
  };

  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  /* ---------------- HELPERS ---------------- */
  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    params.set("page", "1"); // reset page on filter change
    router.replace(`${pathname}?${params.toString()}`);
  }

  /* ---------------- FIX INVALID PAGE ---------------- */
  useEffect(() => {
    if (page > totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [page, totalPages, pathname, router, searchParams]);

  /* ---------------- DELETE ---------------- */
  const handleDelete = (businessId: string) => {
    const toastId = toast.loading("Deleting...");
    startTransition(async () => {
      try {
        await deleteB2BLead(businessId);
        toast.success("Lead deleted successfully", { id: toastId });
      } catch {
        toast.error("Failed to delete", { id: toastId });
      }
    });
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="space-y-4">
      {/* FILTER BAR */}
      <div className="p-4 border rounded-lg flex justify-between gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Input
            placeholder="Business Type"
            value={filters.businessType}
            onChange={(e) => updateParam("businessType", e.target.value)}
            className="w-[180px]"
          />

          <Input
            placeholder="Industry"
            value={filters.primaryIndustry}
            onChange={(e) => updateParam("primaryIndustry", e.target.value)}
            className="w-[180px]"
          />

          <Input
            placeholder="Niche"
            value={filters.niche}
            onChange={(e) => updateParam("niche", e.target.value)}
            className="w-[180px]"
          />

          <Input
            placeholder="City"
            value={filters.city}
            onChange={(e) => updateParam("city", e.target.value)}
            className="w-[180px]"
          />

          <Select
            value={filters.country}
            onValueChange={(v) => updateParam("country", v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_LIST.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="destructive" onClick={() => router.replace(pathname)}>
          Reset
        </Button>
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {result.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              result.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.businessType}</TableCell>
                  <TableCell>{row.primaryIndustry}</TableCell>
                  <TableCell>{row.niche}</TableCell>
                  <TableCell>{row.serviceName?.join(", ")}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/b2b-leads/${row.businessId}`}>
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/b2b-leads/edit/${row.businessId}`}>
                          <EditIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(row.businessId)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <Select
          value={String(pageSize)}
          onValueChange={(v) => updateParam("pageSize", v)}
        >
          <SelectTrigger className="w-[120px]">Rows: {pageSize}</SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => updateParam("page", String(page - 1))}
          >
            Previous
          </Button>

          <span>
            Page <b>{page}</b> of <b>{totalPages}</b>
          </span>

          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => updateParam("page", String(page + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
