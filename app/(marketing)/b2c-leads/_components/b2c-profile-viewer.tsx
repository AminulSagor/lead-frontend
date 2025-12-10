import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { B2C_SECTIONS } from "./b2c-sections";

const formatValue = (value: any) => {
  if (value === null || value === undefined || value === "") return "N/A";

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "N/A";
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return "N/A";

    return entries.map(([key, val]) => `${key}: ${val ?? "N/A"}`).join(", ");
  }

  return String(value);
};

const B2CProfileViewer = ({ data }: { data: any }) => {
  return (
    <div className="space-y-2">
      <div>
        <Button asChild>
          <Link href={"/b2c-leads"}>
            <ArrowLeftCircle />
            Back
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        {B2C_SECTIONS.map((section) => (
          <Card key={section.title} className="rounded-sm">
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-4 gap-4">
              {section.fields.map((field) => (
                <div key={field}>
                  <p className="text-sm text-muted-foreground">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (c) => c.toUpperCase())}
                  </p>

                  <p className="font-medium">{formatValue(data[field])}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default B2CProfileViewer;
