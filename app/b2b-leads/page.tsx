import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import B2BLeadsTable from './_components/b2bleads-table';

const page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">B2B Leads</h2>
        <Button asChild>
          <Link href={'/b2b-leads/create'}>Create</Link>
        </Button>
      </div>
      <B2BLeadsTable />
    </div>
  );
};

export default page;
