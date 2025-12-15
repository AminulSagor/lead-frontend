import { getToken } from "@/lib/get-token";

export async function GET() {
  const token = await getToken();

  const res = await fetch(process.env.API_URL + "/b2c/export", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = await res.blob();

  return new Response(blob, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="b2c-export.xlsx"',
    },
  });
}
