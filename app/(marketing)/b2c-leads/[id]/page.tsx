import B2CProfileViewer from '../_components/b2c-profile-viewer';
import { B2C_DUMMY_DATA } from '../_components/data';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = B2C_DUMMY_DATA.find((lead) => lead.id === id);
  if (!data) return <div>Profile not found</div>;

  return <B2CProfileViewer data={data} />;
};

export default page;
