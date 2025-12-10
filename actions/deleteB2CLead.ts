"use server";

import { getToken } from "@/lib/get-token";
import { revalidatePath } from "next/cache";

export const deleteB2CLead = async (id: number) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Missing authorization token");
    }

    const res = await fetch(`${process.env.API_URL}/b2c/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || "Failed to delete lead");
    }

    // Optional: Revalidate listing page
    revalidatePath("/b2c");

    return {
      success: true,
      message: "Lead deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
};
