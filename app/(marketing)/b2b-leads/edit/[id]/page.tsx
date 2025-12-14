import { getToken } from "@/lib/get-token";
import B2BCreateForm from "../../create/_components/b2b-create-form";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const token = await getToken();
  const req = await fetch(process.env.API_URL + "/b2b/" + id, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data } = await req.json();
  console.log(data, "req");
  // Map keyContacts to form shape:
  const mappedKeyContacts = (data.keyContacts || []).map((kc: any) => ({
    keyContactName: kc.name || "",
    keyContactPosition: kc.position || "",
    keyContactDepartment: kc.department || "",
    keyContactPhone: kc.phone || "",
    keyContactEmail: kc.email || "",
    keyContactLinkedIn: kc.linkedIn || "",
  }));

  const initialData = {
    ...data,
    keyContacts: mappedKeyContacts,
  };

  console.log(initialData, "initial data");

  return (
    <div>
      <B2BCreateForm initialData={initialData} />
    </div>
  );
};

export default page;
