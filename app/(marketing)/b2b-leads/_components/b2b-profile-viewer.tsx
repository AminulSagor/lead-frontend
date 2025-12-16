import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { B2B_SECTIONS } from "./b2b-section";

const formatValue = (value: any) => {
  if (value === null || value === undefined || value === "") return "N/A";

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "N/A";
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return "N/A";
    return entries.map(([k, v]) => `${k}: ${v ?? "N/A"}`).join(", ");
  }

  return String(value);
};

const B2BProfileViewer = ({ data }: { data: any }) => {
  return (
    <div className="space-y-2">
      <Button asChild>
        <Link href="/b2c-leads">
          <ArrowLeftCircle />
          Back
        </Link>
      </Button>

      <div className="space-y-4">
        {B2B_SECTIONS.map((section) => (
          <Card key={section.title} className="rounded-sm">
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>

            <CardContent
              className={
                section.title === "Company Image"
                  ? "flex justify-center"
                  : "grid grid-cols-1 md:grid-cols-2 gap-4"
              }
            >
              {/* 🔹 COMPANY IMAGE */}
              {section.title === "Company Image" ? (
                data.companyImgUrl ? (
                  <img
                    src={data.companyImgUrl}
                    alt="Company"
                    className="w-72 rounded-md border object-cover"
                  />
                ) : (
                  <p className="text-muted-foreground">No company image</p>
                )
              ) : (
                section.fields.map((field) => (
                  <div key={field} className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (c) => c.toUpperCase())}
                    </p>

                    {/* 🔹 SERVICE OVERVIEW */}
                    {field === "serviceOverview" ? (
                      data.serviceOverview?.length ? (
                        <div className="space-y-3">
                          {data.serviceOverview.map(
                            (service: any, index: number) => (
                              <div
                                key={index}
                                className="rounded-md border p-3"
                              >
                                <p>
                                  <b>Service:</b> {service.serviceName}
                                </p>
                                <p>
                                  <b>Category:</b> {service.category}
                                </p>
                                <p>
                                  <b>Pricing:</b> {service.pricingModel}
                                </p>
                                <p>
                                  <b>Rate:</b> {service.rate} {service.currency}
                                </p>
                                <p>
                                  <b>Availability:</b>{" "}
                                  {service.serviceAvailability}
                                </p>
                                <p>
                                  <b>Online:</b> {service.onlineService}
                                </p>
                                <p>
                                  <b>Description:</b>{" "}
                                  {service.serviceDescription || "N/A"}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="font-medium">N/A</p>
                      )
                    ) : /* 🔹 KEY CONTACTS */
                    field === "keyContacts" ? (
                      data.keyContacts?.length ? (
                        <div className="space-y-3">
                          {data.keyContacts.map(
                            (contact: any, index: number) => (
                              <div
                                key={index}
                                className="rounded-md border p-3"
                              >
                                <p>
                                  <b>Name:</b> {contact.name || "N/A"}
                                </p>
                                <p>
                                  <b>Position:</b> {contact.position || "N/A"}
                                </p>
                                <p>
                                  <b>Department:</b>{" "}
                                  {contact.department || "N/A"}
                                </p>
                                <p>
                                  <b>Phone:</b> {contact.phone || "N/A"}
                                </p>
                                <p>
                                  <b>Email:</b> {contact.email || "N/A"}
                                </p>
                                <p>
                                  <b>LinkedIn:</b>{" "}
                                  {contact.linkedIn ? (
                                    <a
                                      href={contact.linkedIn}
                                      target="_blank"
                                      className="text-blue-600 underline"
                                    >
                                      View
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="font-medium">N/A</p>
                      )
                    ) : (
                      /* 🔹 DEFAULT */
                      <p className="font-medium">
                        {formatValue(data?.[field])}
                      </p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default B2BProfileViewer;
