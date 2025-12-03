import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import B2CLeadsTable from './_components/b2c-leads-table';
import { Suspense } from 'react';

const page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">B2C Leads</h2>
        <Button asChild>
          <Link href={'/b2c-leads/create'}>
            <CirclePlus />
            Create
          </Link>
        </Button>
      </div>
      <Suspense>
        <B2CLeadsTable />
      </Suspense>
    </div>
  );
};

export default page;
