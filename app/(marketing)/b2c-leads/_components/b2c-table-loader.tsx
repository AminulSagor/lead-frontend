import { cookies } from "next/headers";
import B2CLeadsTable from "./b2c-leads-table";

interface Props {
  page: number;
  limit: number;
}

const B2CTableLoader = async ({ limit, page }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const res = await fetch(
    `${process.env.API_URL}/b2c?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const total = data.meta.total;
  const result = data.data;

  return (
    <>
      <B2CLeadsTable result={result} total={total} />
    </>
  );
};

export default B2CTableLoader;
