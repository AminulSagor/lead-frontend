import { getToken } from "@/lib/get-token";
import B2BCreateForm from "../../create/_components/b2b-create-form";
import { nullsToEmptyStrings } from "@/lib/utils";

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

  const cleanedData = nullsToEmptyStrings(data);

  // Map keyContacts to form shape:
  const mappedKeyContacts = (cleanedData.keyContacts || []).map((kc: any) => ({
    keyContactName: kc.name,
    keyContactPosition: kc.position,
    keyContactDepartment: kc.department,
    keyContactPhone: kc.phone,
    keyContactEmail: kc.email,
    keyContactLinkedIn: kc.linkedIn,
  }));

  const normalizeMetaTags = (metaTags: any): string[] => {
    if (Array.isArray(metaTags)) return metaTags;

    if (typeof metaTags === "string" && metaTags.trim() !== "") {
      return metaTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    return [];
  };

  const initialData = {
    ...cleanedData,
    metaTags: normalizeMetaTags(cleanedData.metaTags),
    keyContacts: mappedKeyContacts,
  };

  return (
    <div>
      <B2BCreateForm initialData={initialData} />
    </div>
  );
};

export default page;
