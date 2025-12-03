import { Button } from '@/components/ui/button';
import Link from 'next/link';
import B2BLeadsTable from './_components/b2b-leads-table2';
import { CirclePlus } from 'lucide-react';
import { Suspense } from 'react';

const page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">B2B Leads</h2>
        <Button asChild>
          <Link href={'/b2b-leads/create'}>
            <CirclePlus />
            Create
          </Link>
        </Button>
      </div>
      <Suspense>
        <B2BLeadsTable />
      </Suspense>
    </div>
  );
};

export default page;
