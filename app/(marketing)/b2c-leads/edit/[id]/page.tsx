import { getToken } from "@/lib/get-token";
import React from "react";
import B2CCreateForm from "../../_components/b2c-create-form";

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

  return (
    <div>
      <B2CCreateForm initialData={data} />
    </div>
  );
};

export default page;
