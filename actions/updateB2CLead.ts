"use server";
import { B2CProfileSchemaType } from "@/app/(marketing)/b2c-leads/_components/b2c-create-form-schema";
import { getToken } from "@/lib/get-token";

export async function updateB2CLead(id: number, values: B2CProfileSchemaType) {
  const token = await getToken();
  const res = await fetch(process.env.API_URL + "/b2c/" + id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await res.json();

  console.log("data from update b2c", data);
  return data;
}
