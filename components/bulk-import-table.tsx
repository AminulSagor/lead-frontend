"use client";
import { saveB2CBulkImport } from "@/actions/saveB2CBulkImport";
import { normalizeB2CRow } from "@/app/(marketing)/b2c-leads/_components/normalizeB2CRow";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftCircle, FileSpreadsheet, Import, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import * as XLSX from "xlsx";
type B2CProfileRow = Record<string, unknown>;
const BulkImportTable = () => {
  const [tableData, setTableData] = useState<B2CProfileRow[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json<B2CProfileRow>(sheet, {
      defval: "",
    });

    console.log(rawRows, "raworws");
    const normalizedRows = rawRows.map(normalizeB2CRow);
    setTableData(normalizedRows);
  };

  console.log(tableData, "tabledata");

  function renderCellValue(value: unknown) {
    if (Array.isArray(value)) {
      // civicActivities
      return value
        .map((item: any) => item.organizations)
        .filter(Boolean)
        .join(", ");
    }

    if (typeof value === "object" && value !== null) {
      // salary / totalIncome
      const obj = value as Record<string, any>;
      return Object.values(obj).filter(Boolean).join(" ");
    }

    return String(value ?? "");
  }

  const handleSave = async () => {
    const s = await saveB2CBulkImport(tableData);
    console.log(s, "s");
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Button asChild>
            <Link href={"/b2c-leads"}>
              <ArrowLeftCircle />
              Back
            </Link>
          </Button>
        </div>
        <div className="">
          <Button asChild variant={"outline"} className="">
            <label htmlFor="file-upload" className="hover:cursor-pointer">
              <Import />
              Import Excel
            </label>
          </Button>

          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      </div>

      <div className="lg:max-w-[80vw] 2xl:max-w-[85vw] mx-auto ">
        {tableData.length > 0 && (
          <div className="w-full ">
            <div className="mx-auto [&>div]:rounded-sm [&>div]:border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow className="[&>th]:border-r [&>th]:border-r-accent-foreground/20 [&>th:last-child]:border-r-0">
                    {/* Dynamically generate headers from first row keys */}
                    {Object.keys(tableData[0]).map((key) => (
                      <TableHead key={key}>{key}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {tableData.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      className="[&>td]:border-r [&>td:last-child]:border-r-0"
                    >
                      {Object.keys(row).map((colKey, colIndex) => (
                        <TableCell key={colIndex}>
                          {renderCellValue(row[colKey])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {tableData.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/40 px-6 py-10 text-center">
          <div className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
            {/* If you use lucide-react */}
            <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="text-sm font-medium text-foreground">
            No data imported yet
          </p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Upload an Excel file to preview and validate your B2C profile rows
            here.
          </p>
        </div>
      )}
      {tableData.length > 0 && (
        <div>
          <Button variant="secondary" disabled={isSaving} onClick={handleSave}>
            <Save />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      )}
    </>
  );
};

export default BulkImportTable;
