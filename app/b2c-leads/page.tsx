import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">B2C Leads</h2>
        <Button asChild>
          <Link href={'/b2b-leads/create'}>Create</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
