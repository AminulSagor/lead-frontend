import B2CLeadsTable from "./b2c-leads-table";
import { getToken } from "@/lib/get-token";

interface Props {
  page: number;
  limit: number;
  filters: Record<string, any>;
  hasFilters: boolean;
}

const B2CTableLoader = async ({ limit, page, filters, hasFilters }: Props) => {
  const token = await getToken();
  let url: string;
  if (!hasFilters) {
    // 🔹 No filters → normal listing API
    url = `${process.env.API_URL}/b2c?page=${page}&limit=${limit}`;
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

    url = `${process.env.API_URL}/b2c/search?${query}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    console.log("Something went wrong");
  }
  const data = await res.json();
  return <B2CLeadsTable result={data.data} total={data.meta?.total} />;
};

export default B2CTableLoader;
