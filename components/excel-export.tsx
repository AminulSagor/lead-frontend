"use client";
import { Button } from "@/components/ui/button";
import { FolderUp } from "lucide-react";
import { usePathname } from "next/navigation";

const ExcelExport = () => {
  const pathanme = usePathname();
  const isB2C = pathanme.startsWith("/b2c-leads");
  const handleDownload = async () => {
    const res = isB2C
      ? await fetch("/api/b2c-leads-export")
      : await fetch("/api/b2b-leads-export");
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isB2C ? "b2c-export.xlsx" : "b2b-export.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={handleDownload}>
      <FolderUp />
      Bulk Export
    </Button>
  );
};

export default ExcelExport;
