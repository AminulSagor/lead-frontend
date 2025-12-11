import { cookies } from "next/headers";
import B2CLeadsTable from "./b2c-leads-table";

interface Props {
  page: number;
  limit: number;
  filters: Record<string, any>;
  hasFilters: boolean;
}

const B2CTableLoader = async ({ limit, page, filters, hasFilters }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
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

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

  return <B2CLeadsTable result={data.data} total={data.meta.total} />;
};

export default B2CTableLoader;
