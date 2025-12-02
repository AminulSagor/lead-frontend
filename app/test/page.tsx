import { Button } from '@/components/ui/button';
import TableLoader from './_components/table-loader';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: Props) => {
  const sParams = await searchParams;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Test Leads</h2>
        <Button>Create</Button>
      </div>
      <TableLoader sParams={sParams} />
    </div>
  );
};

export default page;
