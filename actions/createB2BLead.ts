"use server";
import { BusinessProfileFormType } from "@/app/(marketing)/b2b-leads/create/_components/b2b-create-form-schema";
import { getToken } from "@/lib/get-token";
import { revalidatePath } from "next/cache";

export async function createB2BLead(value: BusinessProfileFormType) {
  try {
    const token = await getToken();
    const res = await fetch(process.env.API_URL + "/b2b/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    revalidatePath("/b2b-leads");
    return data;
  } catch (error) {
    console.log(error);
  }
}
