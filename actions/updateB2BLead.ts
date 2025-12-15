"use server";
import { BusinessProfileFormType } from "@/app/(marketing)/b2b-leads/create/_components/b2b-create-form-schema";
import { getToken } from "@/lib/get-token";

export async function updateB2BLead(
  businessId: string,
  values: BusinessProfileFormType
) {
  const token = await getToken();
  const res = await fetch(process.env.API_URL + "/b2b/" + businessId, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await res.json();

  return data;
}
