import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { getToken } from "@/lib/get-token";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id, "id");

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

  const SECTIONS = [
    {
      title: "Business Profile",
      fields: [
        "name",
        "businessType",
        "businessDescription",
        "registrationNumber",
        "taxId",
      ],
    },
    {
      title: "Location",
      fields: ["street", "city", "state", "postalCode", "country"],
    },
    {
      title: "Key Contact",
      fields: [
        "keyContactName",
        "keyContactPosition",
        "keyContactPhone",
        "keyContactEmail",
      ],
    },
    {
      title: "Online Presence",
      fields: [
        "opFacebook",
        "opInstagram",
        "opLinkedin",
        "opTwitter",
        "opYoutube",
      ],
    },
    {
      title: "Operations",
      fields: [
        "operationsOpeningHours",
        "operationsEmployees",
        "operationsTools",
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <Button asChild>
          <Link href={"/b2b-leads"}>
            <ArrowLeftCircle />
            Back
          </Link>
        </Button>
      </div>
      <div className=" mx-auto  space-y-4">
        {SECTIONS.map((section) => (
          <Card key={section.title} className="rounded-sm">
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field}>
                  <p className="text-sm text-muted-foreground">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (c) => c.toUpperCase())}
                  </p>

                  <p className="font-medium">{data[field] || "N/A"}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
