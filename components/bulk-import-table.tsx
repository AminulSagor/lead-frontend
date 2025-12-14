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
import { usePathname } from "next/navigation";
import { normalizeB2BRow } from "./normalize-b2b-row";
import { saveB2BBulkImport } from "@/actions/saveB2BImport";

type B2CProfileRow = Record<string, unknown>;

const BulkImportTable = () => {
  const pathname = usePathname();

  // Detect mode from URL
  const isB2C = pathname?.startsWith("/b2c-leads");
  const isB2B = pathname?.startsWith("/b2b-leads");

  console.log({ isB2B, isB2C });

  const [tableData, setTableData] = useState<B2CProfileRow[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Select normalize function based on route
  const normalizeRow = isB2C
    ? normalizeB2CRow
    : isB2B
    ? normalizeB2BRow
    : (row: any) => row;

  // Select save function based on route
  const saveBulkImport = isB2C
    ? saveB2CBulkImport
    : isB2B
    ? saveB2BBulkImport
    : async () => {
        alert("Unknown import type");
      };

  // Select back link based on route
  const backHref = isB2C ? "/b2c-leads" : isB2B ? "/b2b-leads" : "/";

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawRows = XLSX.utils.sheet_to_json<B2CProfileRow>(sheet, {
      defval: "",
    });
    const normalizedRows = rawRows.map(normalizeRow);
    setTableData(normalizedRows);
  };

  function renderCellValue(value: unknown) {
    if (Array.isArray(value)) {
      return value
        .map((item: any) => item.organizations ?? item)
        .filter(Boolean)
        .join(", ");
    }
    if (typeof value === "object" && value !== null) {
      return Object.values(value as Record<string, any>)
        .filter(Boolean)
        .join(" ");
    }
    return String(value ?? "");
  }

  const handleSave = async () => {
    if (tableData.length === 0) return;
    setIsSaving(true);
    try {
      const res = await saveBulkImport(tableData);
      setTableData([]);
      console.log(res);
    } catch (error) {
      console.error(error);
      alert("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  console.log(tableData, "table data");
  return (
    <>
      <div className="flex justify-between">
        <div>
          <Button asChild>
            <Link href={backHref}>
              <ArrowLeftCircle />
              Back
            </Link>
          </Button>
        </div>
        <div>
          <Button asChild variant="outline">
            <label htmlFor="file-upload" className="cursor-pointer">
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

      <div className="lg:max-w-[80vw] 2xl:max-w-[85vw] mx-auto">
        {tableData.length > 0 ? (
          <div className="w-full">
            <div className="mx-auto [&>div]:rounded-sm [&>div]:border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow className="[&>th]:border-r [&>th]:border-r-accent-foreground/20 [&>th:last-child]:border-r-0">
                    {Object.keys(tableData[0]).map((key) => (
                      <TableHead key={key}>{key}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {tableData.map((row, rowIndex) => (
                    <TableRow
                      className="[&>td]:border-r [&>td:last-child]:border-r-0"
                      key={rowIndex}
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
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/40 px-6 py-10 text-center">
            <div className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
              <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              No data imported yet
            </p>
            <p className="max-w-sm text-xs text-muted-foreground">
              Upload an Excel file to preview and validate your{" "}
              {isB2C ? "B2C" : isB2B ? "B2B" : ""} profile rows here.
            </p>
          </div>
        )}
      </div>

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
