import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex flex-col gap-4 justify-center items-center h-[80vh]">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Lead Flow</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          A simple, powerful platform to manage and explore B2B & B2C leads.
        </p>
      </div>

      <div className="flex justify-center gap-2">
        <Button asChild>
          <Link href={"/b2b-leads"}>Explore B2B Leads</Link>
        </Button>
        <Button variant={"outline"}>
          <Link href={"/b2c-leads"}>Explore B2C Leads</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-2 pt-8">
        <div className="p-6 border rounded-xl shadow-sm bg-card">
          <h3 className="font-semibold text-xl mb-2">Lead Intelligence</h3>
          <p className="text-muted-foreground text-sm">
            Dive into rich datasets with filtering, sorting, and segmentation.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow-sm bg-card">
          <h3 className="font-semibold text-xl mb-2">Smart Navigation</h3>
          <p className="text-muted-foreground text-sm">
            Navigate through leads easily with a clean sidebar-driven layout.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow-sm bg-card">
          <h3 className="font-semibold text-xl mb-2">Fast & Minimal</h3>
          <p className="text-muted-foreground text-sm">
            Built using Next.js, Tailwind, and ShadCN for top performance.
          </p>
        </div>
      </div>
    </div>
  );
}
