import { getToken } from "@/lib/get-token";
import B2BLeadsTable from "./b2b-leads-table";

interface Props {
  page: number;
  limit: number;
  filters: Record<string, any>;
  hasFilters: boolean;
}

const B2bTableLoader = async ({ filters, hasFilters, limit, page }: Props) => {
  const token = await getToken();
  let url: string;
  if (!hasFilters) {
    // 🔹 No filters → normal listing API
    url = `${process.env.API_URL}/b2b?page=${page}&limit=${limit}`;
  } else {
    // 🔹 Build a query string for all filters
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) => key !== "page" && key !== "pageSize" && value !== ""
        )
      ),
    }).toString();

    url = `${process.env.API_URL}/b2b/search?${query}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return (
    <>
      <B2BLeadsTable result={data.data} total={data.meta.total} />
    </>
  );
};

export default B2bTableLoader;
