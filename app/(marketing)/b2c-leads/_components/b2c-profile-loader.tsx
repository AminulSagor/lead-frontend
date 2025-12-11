import B2CProfileViewer from "./b2c-profile-viewer";
import { getToken } from "@/lib/get-token";

const B2CProfileLoader = async ({ id }: { id: number }) => {
  const token = await getToken();
  const res = await fetch(process.env.API_URL + "/b2c/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer" + " " + token,
    },
    next: { revalidate: 0 },
  });

  const data = await res.json();
  return <B2CProfileViewer data={data.data} />;
};

export default B2CProfileLoader;
