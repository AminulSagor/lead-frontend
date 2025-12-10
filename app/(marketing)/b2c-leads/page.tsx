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
  };
}

const page = async ({ searchParams }: B2CPageProps) => {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const limit = Number(params.pageSize ?? "10");

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
        <B2CTableLoader page={page} limit={limit} />
      </Suspense>
    </div>
  );
};

export default page;
