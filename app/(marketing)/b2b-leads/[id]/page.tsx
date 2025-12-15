import { getToken } from "@/lib/get-token";
import B2BProfileViewer from "../_components/b2b-profile-viewer";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const token = await getToken();

  const res = await fetch(process.env.API_URL + `/b2b/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lead");
  }

  const { data } = await res.json();

  if (!data) {
    return <div className="p-6 text-center text-red-500">Lead not found.</div>;
  }

  return <B2BProfileViewer data={data} />;
};

export default Page;
