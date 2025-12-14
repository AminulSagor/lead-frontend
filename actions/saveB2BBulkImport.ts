"use server";
import { getToken } from "@/lib/get-token";

export const saveB2BBulkImport = async (tableData: any) => {
  const token = await getToken();
  const res = await fetch(process.env.API_URL + "/b2b/bulk-create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: tableData,
    }),
  });

  const data = await res.json();
  return data;
};
