import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus, Import } from "lucide-react";
import { Suspense } from "react";
import B2bTableLoader from "./_components/b2b-table-loader";
import ExcelExport from "@/components/excel-export";
import TableLoadingSkeleton from "@/components/table-loading-skeleton";

interface B2BPageProps {
  searchParams: {
    page?: string;
    pageSize?: string;
    businessType?: string;
    primaryIndustry?: string;
    niche?: string;
    serviceName?: string;
    country?: string;
    city?: string;
  };
}

const page = async ({ searchParams }: B2BPageProps) => {
  const params = await searchParams;
  const parsedParams = {
    page: Number(params.page ?? 1),
    pageSize: Number(params.pageSize ?? 10),
    businessType: params.businessType ?? "",
    primaryIndustry: params.primaryIndustry ?? "",
    niche: params.niche ?? "",
    serviceName: params.serviceName ?? "",
    country: params.country ?? "",
    city: params.city ?? "",
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
        <h2 className="text-2xl font-semibold tracking-tight">B2B Leads</h2>
        <div className="space-x-2">
          <ExcelExport />
          <Button asChild variant={"outline"}>
            <Link href={"/b2b-leads/bulk-import"}>
              <Import />
              Bulk Import
            </Link>
          </Button>
          <Button asChild>
            <Link href={"/b2b-leads/create"}>
              <CirclePlus />
              Create
            </Link>
          </Button>
        </div>
      </div>
      <Suspense fallback={<TableLoadingSkeleton />}>
        <B2bTableLoader
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
