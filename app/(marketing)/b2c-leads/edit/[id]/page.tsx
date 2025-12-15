import { getToken } from "@/lib/get-token";
import B2CCreateForm from "../../_components/b2c-create-form";
import { nullsToEmptyStrings } from "@/lib/utils";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const token = await getToken();
  const req = await fetch(process.env.API_URL + "/b2c/" + id, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = await req.json();
  const cleanedData = nullsToEmptyStrings(data);

  return (
    <div>
      <B2CCreateForm initialData={cleanedData} />
    </div>
  );
};

export default page;
