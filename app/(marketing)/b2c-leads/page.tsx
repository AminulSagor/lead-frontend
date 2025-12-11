import { Button } from "@/components/ui/button";
import { CirclePlus, Import } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import B2CTableLoader from "./_components/b2c-table-loader";
import ExcelExport from "./_components/excel-export";

interface B2CPageProps {
  searchParams: {
    page?: string;
    pageSize?: string;

    name?: string;
    gender?: string;
    industry?: string;
    nationality?: string;
    state?: string;
    subSector?: string;
    skills?: string;
    highestDegree?: string;
    hobbies?: string;
    organizations?: string;
    maritalStatus?: string;
    income?: string;
    salary?: string;
  };
}

const page = async ({ searchParams }: B2CPageProps) => {
  const params = await searchParams;
  const parsedParams = {
    page: Number(params.page ?? 1),
    pageSize: Number(params.pageSize ?? 10),

    name: params.name ?? "",
    gender: params.gender ?? "",
    industry: params.industry ?? "",
    nationality: params.nationality ?? "",
    state: params.state ?? "",
    subSector: params.subSector ?? "",
    skills: params.skills ?? "",
    highestDegree: params.highestDegree ?? "",
    hobbies: params.hobbies ?? "",
    organizations: params.organizations ?? "",
    maritalStatus: params.maritalStatus ?? "",
    income: params.income ?? "",
    salary: params.salary ?? "",
  };

  // detect if filters except page/pageSize exist
  const hasFilters = Object.entries(parsedParams).some(
    ([key, value]) =>
      key !== "page" &&
      key !== "pageSize" &&
      value !== "" &&
      value !== undefined
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">B2C Leads</h2>
        <div className="space-x-2">
          <ExcelExport />
          <Button asChild variant={"outline"}>
            <Link href={"/b2c-leads/bulk-import"}>
              <Import />
              Bulk Import
            </Link>
          </Button>
          <Button asChild>
            <Link href={"/b2c-leads/create"}>
              <CirclePlus />
              Create
            </Link>
          </Button>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <B2CTableLoader
          page={parsedParams.page}
          limit={parsedParams.pageSize}
          filters={parsedParams}
          hasFilters={hasFilters}
        />
      </Suspense>
    </div>
  );
};

export default page;
