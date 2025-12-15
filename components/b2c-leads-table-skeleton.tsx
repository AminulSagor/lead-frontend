"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function B2CLeadsTableSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* FILTER BAR SKELETON */}
      <div className="p-4 border rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Filters:</p>
          <Button variant="destructive" disabled>
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {Array.from({ length: 14 }).map((_, i) => (
            <Input
              key={i}
              disabled
              className="w-full bg-muted"
              placeholder="Loading"
            />
          ))}
        </div>
      </div>

      {/* TABLE SKELETON */}
      <div className="w-full">
        <div className="mx-auto min-w-full max-w-[80vw] border rounded-sm">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Sub Sector</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Highest Degree</TableHead>
                <TableHead>Hobbies</TableHead>
                <TableHead>Organizations</TableHead>
                <TableHead>Marital Status</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 6 }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                  {Array.from({ length: 14 }).map((__, cellIdx) => (
                    <TableCell key={cellIdx}>
                      <div className="h-4 w-full rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
