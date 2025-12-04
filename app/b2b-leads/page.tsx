import { Button } from '@/components/ui/button';
import Link from 'next/link';
import B2BLeadsTable from './_components/b2b-leads-table2';
import { CirclePlus, Import } from 'lucide-react';
import { Suspense } from 'react';

const page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">B2B Leads</h2>
        <div className="space-x-2">
          <Button asChild variant={'outline'}>
            <Link href={'/b2c-leads/bulk-import'}>
              <Import />
              Bulk Import
            </Link>
          </Button>
          <Button asChild>
            <Link href={'/b2b-leads/create'}>
              <CirclePlus />
              Create
            </Link>
          </Button>
        </div>
      </div>
      <Suspense>
        <B2BLeadsTable />
      </Suspense>
    </div>
  );
};

export default page;
