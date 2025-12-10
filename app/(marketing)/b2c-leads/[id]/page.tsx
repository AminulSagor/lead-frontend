import { Suspense } from "react";
import B2CProfileLoader from "../_components/b2c-profile-loader";
import { B2C_DUMMY_DATA } from "../_components/data";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<p>loading...</p>}>
      <B2CProfileLoader id={Number(id)} />
    </Suspense>
  );
};

export default page;
