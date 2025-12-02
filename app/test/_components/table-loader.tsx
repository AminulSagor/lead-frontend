import TestTable from './test-table';
import { fetchPosts } from '../fetcher/get-posts';
import { PaginationWithLinks } from '@/components/pagination-with-links';

interface Props {
  sParams: { [key: string]: string | string[] | undefined };
}

const TableLoader = async ({ sParams }: Props) => {
  const currentPage = parseInt((sParams.page as string) || '0');
  const postPerPage = parseInt((sParams.pageSize as string) || '10');
  const { posts, totalPosts } = await fetchPosts(currentPage, postPerPage);
  return (
    <>
      <TestTable data={posts} />
      <PaginationWithLinks
        page={currentPage}
        pageSize={postPerPage}
        totalCount={totalPosts}
        pageSizeSelectOptions={{
          pageSizeOptions: [5, 10, 15, 20],
        }}
        navigationMode="router"
      />
    </>
  );
};

export default TableLoader;
