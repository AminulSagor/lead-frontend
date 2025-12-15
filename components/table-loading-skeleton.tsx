"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TableLoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* FILTER BAR SKELETON */}
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <p className="text-lg font-semibold">Filters:</p>

          <Input
            disabled
            placeholder="Business Type"
            className="w-[180px] bg-muted"
          />

          <Input
            disabled
            placeholder="Industry"
            className="w-[180px] bg-muted"
          />

          <Select disabled>
            <SelectTrigger className="w-[180px] bg-muted">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
          </Select>

          <Input disabled placeholder="Niche" className="w-[180px] bg-muted" />

          <Input disabled placeholder="City" className="w-[180px] bg-muted" />
        </div>

        <Button variant="destructive" disabled>
          Reset Filters
        </Button>
      </div>

      {/* TABLE SKELETON */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 8 }).map((__, j) => (
                  <TableCell key={j}>
                    <div className="h-4 w-full rounded bg-muted" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION SKELETON */}
      <div className="flex items-center justify-between py-2">
        <Select disabled>
          <SelectTrigger className="w-[120px] bg-muted">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
        </Select>

        <div className="flex items-center gap-3">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <span className="h-4 w-24 rounded bg-muted inline-block" />
          <Button variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
