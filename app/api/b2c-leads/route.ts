import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({
      success: false,
      status: 404,
      message: "Unauthorized to create b2c leads",
    });
  }
  const res = await fetch(process.env.API_URL + "/b2c/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    // Normalize message
    let message = "Failed to create lead";
    if (errorData.message) {
      if (Array.isArray(errorData.message)) {
        message = errorData.message.join(", ");
      } else if (typeof errorData.message === "string") {
        message = errorData.message;
      }
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json({ success: true, data });
}
