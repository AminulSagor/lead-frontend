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
import { EditIcon, EyeIcon, Trash2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import {
  BUSINESS_TYPE_LIST,
  COUNTRY_LIST,
  DUMMY_LEADS,
  INDUSTRY_LIST,
} from "./data";
import { deleteB2BLead } from "@/actions/deleteB2BLead";
import toast from "react-hot-toast";

export interface B2BLeadsTableProps {
  result: any;
  total: number;
}

export default function B2BLeadsTable({ result, total }: B2BLeadsTableProps) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /* ------------------------ GET FILTERS ------------------------ */
  const filters = {
    businessType: searchParams.get("businessType") || "",
    industry: searchParams.get("industry") || "",
    onlineService: searchParams.get("onlineService") || "",
    country: searchParams.get("country") || "",
    niche: searchParams.get("niche") || "",
    serviceAvailability: searchParams.get("serviceAvailability") || "",
    city: searchParams.get("city") || "",
  };

  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  /* ------------------------ Update URL Params ------------------------ */
  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    // When changing filters, reset to page 1
    if (key !== "page") params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  /* ---- If filters reduce result count, fix invalid page ---- */
  useEffect(() => {
    if (page > totalPages) updateParam("page", "1");
  }, [totalPages]);

  const handleDelete = (businessId: string) => {
    const toastId = toast.loading("Deleting...");
    startTransition(async () => {
      try {
        await deleteB2BLead(businessId);
        toast.success("Lead deleted successfully", { id: toastId });
      } catch (error) {
        toast.error("Failed to delete");
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* FILTER BAR */}
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <p className="text-lg font-semibold">Filters:</p>

          {/* Business Type */}
          <Select
            value={filters.businessType}
            onValueChange={(value) => updateParam("businessType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Business Type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPE_LIST.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Industry */}
          <Select
            value={filters.industry}
            onValueChange={(value) => updateParam("industry", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_LIST.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Online Service */}
          <Select
            value={filters.onlineService}
            onValueChange={(value) => updateParam("onlineService", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Online Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

          {/* Country */}
          <Select
            value={filters.country}
            onValueChange={(value) => updateParam("country", value)}
          >
            <SelectTrigger>
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

          {/* Niche */}
          <Select
            value={filters.niche}
            onValueChange={(value) => updateParam("niche", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Niche" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(DUMMY_LEADS.map((x) => x.niche))).map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Service Availability */}
          <Select
            value={filters.serviceAvailability}
            onValueChange={(value) => updateParam("serviceAvailability", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Service Availability" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                new Set(DUMMY_LEADS.map((x) => x.serviceAvailability))
              ).map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* City */}
          <Select
            value={filters.city}
            onValueChange={(value) => updateParam("city", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(DUMMY_LEADS.map((x) => x.city))).map(
                (city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Reset */}
        <Button variant="destructive" onClick={() => router.replace(pathname)}>
          Reset Filters
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border">
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
              <TableHead className="text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {result.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.businessType}</TableCell>
                <TableCell>{row.primaryIndustry}</TableCell>
                <TableCell>{row.niche}</TableCell>
                <TableCell>
                  {row.serviceName?.map((service: string, i: number) => (
                    <span key={i}>
                      {service}
                      {i < row.serviceName.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </TableCell>
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
                      className="cursor-pointer"
                      size="sm"
                      variant={"ghost"}
                      onClick={() => handleDelete(row.businessId)}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between py-2">
        <div>
          {/* Page Size */}
          <Select
            value={String(pageSize)}
            onValueChange={(v) => updateParam("pageSize", v)}
          >
            <SelectTrigger className="w-[120px]">
              Rows: {pageSize}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
