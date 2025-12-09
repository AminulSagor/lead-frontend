"use client";
import { Button } from "@/components/ui/button";
import { FolderUp } from "lucide-react";
import { B2CProfileSchemaType } from "./b2c-create-form-schema";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const formatB2CProfileForExcel = (profile: B2CProfileSchemaType) => {
  const flat: Record<string, any> = {};

  for (const [key, value] of Object.entries(profile)) {
    if (Array.isArray(value)) {
      // Convert arrays to comma string
      flat[key] = value
        .map((v) => (typeof v === "string" ? v : JSON.stringify(v)))
        .join(", ");
    } else if (typeof value === "object" && value !== null) {
      // Flatten nested object like salary, totalIncome
      for (const [innerKey, innerValue] of Object.entries(value)) {
        flat[`${key}_${innerKey}`] = innerValue ?? "";
      }
    } else {
      flat[key] = value ?? "";
    }
  }

  return flat;
};

const ExcelExport = () => {
  const exportB2CProfilesToExcel = (profiles: B2CProfileSchemaType[]) => {
    const formatted = profiles.map(formatB2CProfileForExcel);

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "B2C Profiles");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "b2c-profiles.xlsx");
  };

  return (
    <Button
      className="hover:cursor-pointer"
      variant={"outline"}
      //   onClick={() => exportB2CProfilesToExcel(data)}
    >
      <FolderUp />
      Bulk Export
    </Button>
  );
};

export default ExcelExport;
