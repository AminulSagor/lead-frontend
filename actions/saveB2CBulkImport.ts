"use server";

import { getToken } from "@/lib/get-token";

export async function saveB2CBulkImport(tableData: any) {
  const token = await getToken();
  const res = await fetch(process.env.API_URL + "/b2c/bulk-create", {
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
}
