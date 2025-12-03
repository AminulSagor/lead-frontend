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
  SelectValue,
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

  //
  const nationalityFilter = searchParams.get('nationality') || '';
  const stateFilter = searchParams.get('state') || '';
  const subSectorFilter = searchParams.get('subSector') || '';
  const skillsFilter = searchParams.get('skills') || '';
  const highestDegreeFilter = searchParams.get('highestDegree') || '';
  const hobbiesFilter = searchParams.get('hobbies') || '';
  const organizationsFilter = searchParams.get('organizations') || '';
  const maritalStatusFilter = searchParams.get('maritalStatus') || '';
  const incomeFilter = searchParams.get('income') || '';
  const salaryFilter = searchParams.get('salary') || '';

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
      if (genderFilter && lead.gender !== genderFilter) return false;
      if (industryFilter && lead.industry !== industryFilter) return false;

      if (
        nationalityFilter &&
        !lead.nationality
          .toLowerCase()
          .includes(nationalityFilter.toLowerCase())
      )
        return false;
      if (
        stateFilter &&
        !lead.state.toLowerCase().includes(stateFilter.toLowerCase())
      )
        return false;
      if (
        subSectorFilter &&
        !lead.subSector.toLowerCase().includes(subSectorFilter.toLowerCase())
      )
        return false;
      if (
        skillsFilter &&
        !lead.skills.toLowerCase().includes(skillsFilter.toLowerCase())
      )
        return false;

      if (highestDegreeFilter && lead.highestDegree !== highestDegreeFilter)
        return false;
      if (
        hobbiesFilter &&
        !lead.hobbies.toLowerCase().includes(hobbiesFilter.toLowerCase())
      )
        return false;
      if (
        organizationsFilter &&
        !lead.organizations
          .toLowerCase()
          .includes(organizationsFilter.toLowerCase())
      )
        return false;

      if (maritalStatusFilter && lead.maritalStatus !== maritalStatusFilter)
        return false;

      if (
        incomeFilter &&
        !lead.income.toLowerCase().includes(incomeFilter.toLowerCase())
      )
        return false;
      if (
        salaryFilter &&
        !lead.salary.toLowerCase().includes(salaryFilter.toLowerCase())
      )
        return false;

      return true;
    });
  }, [
    nameFilter,
    genderFilter,
    industryFilter,
    nationalityFilter,
    stateFilter,
    subSectorFilter,
    skillsFilter,
    highestDegreeFilter,
    hobbiesFilter,
    organizationsFilter,
    maritalStatusFilter,
    incomeFilter,
    salaryFilter,
  ]);

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
      <div className="p-4 border rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Filters:</p>
          {/* Reset */}
          <Button
            className="hover:cursor-pointer"
            variant="destructive"
            onClick={() => router.replace(pathname)}
          >
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {/* Name Filter */}
          <Input
            placeholder="Search by name..."
            value={nameFilter}
            onChange={(e) => updateParam('name', e.target.value)}
          />

          {/* Gender Filter */}
          <Select
            value={genderFilter || '__all'}
            onValueChange={(v) => updateParam('gender', v === '__all' ? '' : v)}
          >
            <SelectTrigger className="w-full">
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
            <SelectTrigger className="w-full">
              {industryFilter || 'Industry'}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all">All</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Nationality"
            value={nationalityFilter}
            onChange={(e) => updateParam('nationality', e.target.value)}
          />
          <Input
            placeholder="State"
            value={stateFilter}
            onChange={(e) => updateParam('state', e.target.value)}
          />
          <Input
            placeholder="Sub Sector"
            value={subSectorFilter}
            onChange={(e) => updateParam('subSector', e.target.value)}
          />
          <Input
            placeholder="Skills"
            value={skillsFilter}
            onChange={(e) => updateParam('skills', e.target.value)}
          />

          <Select
            value={highestDegreeFilter || '__all'}
            onValueChange={(v) =>
              updateParam('highestDegree', v === '__all' ? '' : v)
            }
          >
            <SelectTrigger className="w-full">
              {highestDegreeFilter || 'Highest Degree'}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all">All</SelectItem>
              <SelectItem value="Bachelor">Bachelor</SelectItem>
              <SelectItem value="Master">Master</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Hobbies"
            value={hobbiesFilter}
            onChange={(e) => updateParam('hobbies', e.target.value)}
          />

          <Input
            placeholder="Organizations"
            value={organizationsFilter}
            onChange={(e) => updateParam('organizations', e.target.value)}
          />

          <Select
            value={maritalStatusFilter || '__all'}
            onValueChange={(v) =>
              updateParam('maritalStatus', v === '__all' ? '' : v)
            }
          >
            <SelectTrigger className="w-full">
              {maritalStatusFilter || 'Marital Status'}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all">All</SelectItem>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Income"
            value={incomeFilter}
            onChange={(e) => updateParam('income', e.target.value)}
          />

          <Input
            placeholder="Salary"
            value={salaryFilter}
            onChange={(e) => updateParam('salary', e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full">
        <div className="mx-auto min-w-full max-w-[80vw] [&>div]:rounded-sm [&>div]:border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="[&>th]:border-r [&>th]:border-r-accent-foreground/20 [&>th:last-child]:border-r-0">
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
                  <TableRow
                    className="[&>td]:border-r [&>td:last-child]:border-r-0"
                    key={lead.id}
                  >
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
                          <Link href={`/b2c-leads/${lead.id}`}>
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
