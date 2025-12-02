'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { DUMMY_B2C_LEADS } from './data';

/* -------------------------------------------------------------------------- */
/*                                DUMMY DATA                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */

export default function B2CLeadsTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /* ------------------------ URL params → derived state ------------------------ */

  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || 5);

  const nameFilter = searchParams.get('name') || '';
  const genderFilter = searchParams.get('gender') || '';
  const industryFilter = searchParams.get('industry') || '';

  /* ------------------------ Helper to update URL params ------------------------ */

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    router.replace(`${pathname}?${params.toString()}`);
  }

  /* -------------------------------------------------------------------------- */
  /*                                FILTER LOGIC                                */
  /* -------------------------------------------------------------------------- */

  const filteredData = useMemo(() => {
    return DUMMY_B2C_LEADS.filter((lead) => {
      if (
        nameFilter &&
        !lead.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
        return false;
      if (
        genderFilter &&
        genderFilter !== 'undefined' &&
        lead.gender !== genderFilter
      )
        return false;
      if (
        industryFilter &&
        industryFilter !== 'undefined' &&
        lead.industry !== industryFilter
      )
        return false;

      return true;
    });
  }, [nameFilter, genderFilter, industryFilter]);

  /* ------------------------ Fix invalid page after filtering ------------------------ */
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const validPage = Math.min(page, totalPages || 1);

  /* ------------------------ Pagination Slice ------------------------ */
  const paginatedData = filteredData.slice(
    (validPage - 1) * pageSize,
    validPage * pageSize
  );

  /* -------------------------------------------------------------------------- */
  /*                                    UI                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="space-y-4">
      {/* FILTER BAR */}
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <p className="text-lg font-semibold">Filters:</p>
          {/* Name Filter */}
          <Input
            placeholder="Search by name..."
            className="w-[200px]"
            value={nameFilter}
            onChange={(e) => updateParam('name', e.target.value)}
          />

          {/* Gender Filter */}
          <Select
            value={genderFilter || '__all'}
            onValueChange={(v) => updateParam('gender', v === '__all' ? '' : v)}
          >
            <SelectTrigger className="w-[150px]">
              {genderFilter || 'Gender'}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all">All</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>

          {/* Industry Filter */}
          <Select
            value={industryFilter || '__all'}
            onValueChange={(v) =>
              updateParam('industry', v === '__all' ? '' : v)
            }
          >
            <SelectTrigger className="w-[180px]">
              {industryFilter || 'Industry'}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all">All</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset */}
        <Button variant="outline" onClick={() => router.replace(pathname)}>
          Reset Filters
        </Button>
      </div>

      {/* TABLE */}
      <div className="w-full">
        <div className="mx-auto min-w-full max-w-[80vw] [&>div]:rounded-sm [&>div]:border">
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
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={13} className="text-center py-6">
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.gender}</TableCell>
                    <TableCell>{lead.nationality}</TableCell>
                    <TableCell>{lead.state}</TableCell>
                    <TableCell>{lead.industry}</TableCell>
                    <TableCell>{lead.subSector}</TableCell>
                    <TableCell>{lead.skills}</TableCell>
                    <TableCell>{lead.highestDegree}</TableCell>
                    <TableCell>{lead.hobbies}</TableCell>
                    <TableCell>{lead.organizations}</TableCell>
                    <TableCell>{lead.maritalStatus}</TableCell>
                    <TableCell>{lead.income}</TableCell>
                    <TableCell>{lead.salary}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/b2b-leads/`}>
                            <EyeIcon className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/b2b-leads/edit/`}>
                            <EditIcon className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/b2b-leads/delete/`}>
                            <TrashIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PAGINATION + PAGE SIZE */}
      <div className="flex items-center justify-between py-2">
        {/* Page Size */}
        <Select
          value={String(pageSize)}
          onValueChange={(v) => updateParam('pageSize', v)}
        >
          <SelectTrigger className="w-[120px]">Rows: {pageSize}</SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>

        {/* Pagination */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={validPage <= 1}
            onClick={() => updateParam('page', String(validPage - 1))}
          >
            Previous
          </Button>

          <span>
            Page <b>{validPage}</b> of <b>{totalPages || 1}</b>
          </span>

          <Button
            variant="outline"
            disabled={validPage >= totalPages}
            onClick={() => updateParam('page', String(validPage + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
