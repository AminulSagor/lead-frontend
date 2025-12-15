"use client";

import { useState, useEffect, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { deleteB2CLead } from "@/actions/deleteB2CLead";
import { useDebounce } from "@/hooks/use-debounce-hook";

export interface Lead {
  id: number;
  name: string;
  gender: string;
  nationality: string;
  state: string;
  industry: string;
  subSector: string;
  skills: string;
  highestDegree: string;
  interests: string[];
  company: string;
  maritalStatus: string;
  income: string;
  salary: any;
}

export interface B2CLeadsTableProps {
  result: Lead[];
  total: number;
}

export default function B2CLeadsTable({ result, total }: B2CLeadsTableProps) {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Extract filters from URL
  const filters = {
    name: searchParams.get("name") || "",
    gender: searchParams.get("gender") || "",
    nationality: searchParams.get("nationality") || "",
    state: searchParams.get("state") || "",
    industry: searchParams.get("industry") || "",
    subSector: searchParams.get("subSector") || "",
    skills: searchParams.get("skills") || "",
    highestDegree: searchParams.get("highestDegree") || "",
    hobbies: searchParams.get("hobbies") || "",
    organizations: searchParams.get("organizations") || "",
    maritalStatus: searchParams.get("maritalStatus") || "",
    income: searchParams.get("income") || "",
    salary: searchParams.get("salary") || "",
  };

  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  // Local state for controlled inputs
  const [inputs, setInputs] = useState({
    name: filters.name,
    gender: filters.gender,
    nationality: filters.nationality,
    state: filters.state,
    industry: filters.industry,
    subSector: filters.subSector,
    skills: filters.skills,
    highestDegree: filters.highestDegree,
    hobbies: filters.hobbies,
    organizations: filters.organizations,
    maritalStatus: filters.maritalStatus,
    income: filters.income,
    salary: filters.salary,
  });

  // Debounced values to reduce URL updates on fast typing
  const debouncedName = useDebounce(inputs.name, 500);
  const debouncedGender = useDebounce(inputs.gender, 500);
  const debouncedNationality = useDebounce(inputs.nationality, 500);
  const debouncedState = useDebounce(inputs.state, 500);
  const debouncedIndustry = useDebounce(inputs.industry, 500);
  const debouncedSubSector = useDebounce(inputs.subSector, 500);
  const debouncedSkills = useDebounce(inputs.skills, 500);
  const debouncedHighestDegree = useDebounce(inputs.highestDegree, 500);
  const debouncedHobbies = useDebounce(inputs.hobbies, 500);
  const debouncedOrganizations = useDebounce(inputs.organizations, 500);
  const debouncedMaritalStatus = useDebounce(inputs.maritalStatus, 500);
  const debouncedIncome = useDebounce(inputs.income, 500);
  const debouncedSalary = useDebounce(inputs.salary, 500);

  // Function to update URL params
  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to first page on filter change:
    if (key !== "page") {
      params.set("page", "1");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  // Sync debounced inputs to URL params
  useEffect(() => {
    updateParam("name", debouncedName);
  }, [debouncedName]);

  useEffect(() => {
    updateParam("gender", debouncedGender);
  }, [debouncedGender]);

  useEffect(() => {
    updateParam("nationality", debouncedNationality);
  }, [debouncedNationality]);

  useEffect(() => {
    updateParam("state", debouncedState);
  }, [debouncedState]);

  useEffect(() => {
    updateParam("industry", debouncedIndustry);
  }, [debouncedIndustry]);

  useEffect(() => {
    updateParam("subSector", debouncedSubSector);
  }, [debouncedSubSector]);

  useEffect(() => {
    updateParam("skills", debouncedSkills);
  }, [debouncedSkills]);

  useEffect(() => {
    updateParam("highestDegree", debouncedHighestDegree);
  }, [debouncedHighestDegree]);

  useEffect(() => {
    updateParam("hobbies", debouncedHobbies);
  }, [debouncedHobbies]);

  useEffect(() => {
    updateParam("organizations", debouncedOrganizations);
  }, [debouncedOrganizations]);

  useEffect(() => {
    updateParam("maritalStatus", debouncedMaritalStatus);
  }, [debouncedMaritalStatus]);

  useEffect(() => {
    updateParam("income", debouncedIncome);
  }, [debouncedIncome]);

  useEffect(() => {
    updateParam("salary", debouncedSalary);
  }, [debouncedSalary]);

  // Fix invalid page if total changes
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => {
    if (page > totalPages) updateParam("page", "1");
  }, [totalPages]);

  // Delete handler with transition
  const handleDelete = (id: number) => {
    const toastId = toast.loading("Deleting...");
    startTransition(async () => {
      try {
        await deleteB2CLead(id);
        toast.success("Lead deleted successfully", { id: toastId });
      } catch {
        toast.error("Failed to delete lead", { id: toastId });
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* FILTER BAR */}
      <div className="p-4 border rounded-lg flex flex-wrap gap-4 items-center justify-between">
        <p className="text-lg font-semibold">Filters:</p>

        <Input
          placeholder="Name"
          value={inputs.name}
          onChange={(e) => setInputs((p) => ({ ...p, name: e.target.value }))}
          className="w-[180px]"
        />

        <Select
          value={inputs.gender || "__all"}
          onValueChange={(v) =>
            setInputs((p) => ({ ...p, gender: v === "__all" ? "" : v }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all">All</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Nationality"
          value={inputs.nationality}
          onChange={(e) =>
            setInputs((p) => ({ ...p, nationality: e.target.value }))
          }
          className="w-[180px]"
        />
        <Input
          placeholder="State"
          value={inputs.state}
          onChange={(e) => setInputs((p) => ({ ...p, state: e.target.value }))}
          className="w-[180px]"
        />
        <Input
          placeholder="Industry"
          value={inputs.industry}
          onChange={(e) =>
            setInputs((p) => ({ ...p, industry: e.target.value }))
          }
          className="w-[180px]"
        />
        <Input
          placeholder="Sub Sector"
          value={inputs.subSector}
          onChange={(e) =>
            setInputs((p) => ({ ...p, subSector: e.target.value }))
          }
          className="w-[180px]"
        />
        <Input
          placeholder="Skills"
          value={inputs.skills}
          onChange={(e) => setInputs((p) => ({ ...p, skills: e.target.value }))}
          className="w-[180px]"
        />
        <Select
          value={inputs.highestDegree || "__all"}
          onValueChange={(v) =>
            setInputs((p) => ({ ...p, highestDegree: v === "__all" ? "" : v }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Highest Degree" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all">All</SelectItem>
            <SelectItem value="Bachelor">Bachelor</SelectItem>
            <SelectItem value="Master">Master</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Hobbies"
          value={inputs.hobbies}
          onChange={(e) =>
            setInputs((p) => ({ ...p, hobbies: e.target.value }))
          }
          className="w-[180px]"
        />
        <Input
          placeholder="Organizations"
          value={inputs.organizations}
          onChange={(e) =>
            setInputs((p) => ({ ...p, organizations: e.target.value }))
          }
          className="w-[180px]"
        />
        <Select
          value={inputs.maritalStatus || "__all"}
          onValueChange={(v) =>
            setInputs((p) => ({ ...p, maritalStatus: v === "__all" ? "" : v }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Marital Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all">All</SelectItem>
            <SelectItem value="Single">Single</SelectItem>
            <SelectItem value="Married">Married</SelectItem>
            <SelectItem value="Divorced">Divorced</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Income"
          value={inputs.income}
          onChange={(e) => setInputs((p) => ({ ...p, income: e.target.value }))}
          className="w-[180px]"
        />
        <Input
          placeholder="Salary"
          value={inputs.salary}
          onChange={(e) => setInputs((p) => ({ ...p, salary: e.target.value }))}
          className="w-[180px]"
        />

        <Button
          variant="destructive"
          onClick={() => router.replace(pathname)}
          className="ml-auto cursor-pointer"
        >
          Reset Filters
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Sub Sector</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Highest Degree</TableHead>
              <TableHead>Hobbies</TableHead>
              <TableHead>Organizations</TableHead>
              <TableHead>Marital Status</TableHead>
              <TableHead>Income</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {result?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={14} className="text-center py-6">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              result?.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.gender}</TableCell>
                  <TableCell>{lead.nationality}</TableCell>
                  <TableCell>{lead.state}</TableCell>
                  <TableCell>{lead.industry}</TableCell>
                  <TableCell>{lead.subSector}</TableCell>
                  <TableCell>{lead.skills}</TableCell>
                  <TableCell>{lead.highestDegree}</TableCell>
                  <TableCell>
                    {lead.interests?.map((interest, i) => (
                      <span key={i}>
                        {interest}
                        {i < lead.interests.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.maritalStatus}</TableCell>
                  <TableCell>{lead.income}</TableCell>
                  <TableCell>
                    {lead.salary?.salaryAmount
                      ? `${lead.salary.salaryAmount} ${lead.salary.salaryCurrency}`
                      : null}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/b2c-leads/${lead.id}`}>
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/b2c-leads/edit/${lead.id}`}>
                          <EditIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(lead.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
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
      <div className="flex items-center justify-between py-2">
        {/* Page Size */}
        <Select
          value={String(pageSize)}
          onValueChange={(v) => updateParam("pageSize", v)}
        >
          <SelectTrigger>
            <SelectValue>Rows: {pageSize}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>

        {/* Pagination */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => updateParam("page", String(page - 1))}
          >
            Previous
          </Button>

          <span>
            Page <b>{page}</b> of <b>{totalPages || 1}</b>
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
