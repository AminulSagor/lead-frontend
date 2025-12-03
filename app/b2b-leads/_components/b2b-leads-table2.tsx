'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import {
  BUSINESS_TYPE_LIST,
  COUNTRY_LIST,
  DUMMY_LEADS,
  INDUSTRY_LIST,
} from './data';

export default function B2BLeadsTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /* ------------------------ URL → derived state ------------------------ */
  const filters = {
    businessType: searchParams.get('businessType') || '',
    industry: searchParams.get('industry') || '',
    onlineService: searchParams.get('onlineService') || '',
    country: searchParams.get('country') || '',
    niche: searchParams.get('niche') || '',
    serviceAvailability: searchParams.get('serviceAvailability') || '',
    city: searchParams.get('city') || '',
  };

  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || 10);

  /* ------------------------ Helper to update URL ------------------------ */
  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    router.replace(`${pathname}?${params.toString()}`);
  }

  /* ------------------------ Filtering Logic ------------------------ */
  const filteredLeads = useMemo(() => {
    return DUMMY_LEADS.filter((lead) => {
      if (filters.businessType) {
        const bt = lead.businessType.toLowerCase().replace(/\s+/g, '');
        if (!bt.includes(filters.businessType.toLowerCase())) return false;
      }

      if (filters.industry) {
        if (
          !lead.primaryIndustry
            .toLowerCase()
            .includes(filters.industry.toLowerCase())
        ) {
          return false;
        }
      }

      if (filters.onlineService) {
        if (
          lead.onlineService.toLowerCase() !==
          filters.onlineService.toLowerCase()
        ) {
          return false;
        }
      }

      if (filters.country) {
        if (lead.country.toLowerCase() !== filters.country.toLowerCase())
          return false;
      }

      // NEW → Niche filter
      if (filters.niche) {
        if (!lead.niche?.toLowerCase().includes(filters.niche.toLowerCase()))
          return false;
      }

      // NEW → Service Availability
      if (filters.serviceAvailability) {
        if (
          lead.serviceAvailability?.toLowerCase() !==
          filters.serviceAvailability.toLowerCase()
        ) {
          return false;
        }
      }

      // NEW → City
      if (filters.city) {
        if (lead.city.toLowerCase() !== filters.city.toLowerCase())
          return false;
      }

      return true;
    });
  }, [filters]);

  /* ------------------------ Pagination Logic ------------------------ */
  const totalItems = filteredLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, page, pageSize]);

  /* ------------------------ Fix invalid page when filtering ------------------------ */
  useEffect(() => {
    if (page > totalPages) updateParam('page', '1');
  }, [totalPages]);

  /* ------------------------ UI ------------------------ */
  return (
    <div className="space-y-4">
      {/* FILTER BAR */}
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <p className="text-lg font-semibold">Filters:</p>

          {/* Business Type */}
          <Select
            value={filters.businessType}
            onValueChange={(value) => updateParam('businessType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Business Type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPE_LIST.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Industry */}
          <Select
            value={filters.industry}
            onValueChange={(value) => updateParam('industry', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_LIST.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Online Service */}
          <Select
            value={filters.onlineService}
            onValueChange={(value) => updateParam('onlineService', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Online Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>

          {/* Country */}
          <Select
            value={filters.country}
            onValueChange={(value) => updateParam('country', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_LIST.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* NEW: Niche */}
          <Select
            value={filters.niche}
            onValueChange={(value) => updateParam('niche', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Niche" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(DUMMY_LEADS.map((x) => x.niche))).map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* NEW: Service Availability */}
          <Select
            value={filters.serviceAvailability}
            onValueChange={(value) => updateParam('serviceAvailability', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                new Set(DUMMY_LEADS.map((x) => x.serviceAvailability))
              ).map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* NEW: City */}
          <Select
            value={filters.city}
            onValueChange={(value) => updateParam('city', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(DUMMY_LEADS.map((x) => x.city))).map(
                (city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Reset */}
        <Button
          className="hover:cursor-pointer"
          variant="destructive"
          onClick={() => router.replace(pathname)}
        >
          Reset Filters
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Online</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedLeads.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.businessType}</TableCell>
                <TableCell>{row.primaryIndustry}</TableCell>
                <TableCell>{row.niche}</TableCell>
                <TableCell>{row.serviceAvailability}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      row.onlineService === 'Yes'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {row.onlineService}
                  </span>
                </TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.city}</TableCell>

                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-1">
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/b2b-leads/${row.id}`}>
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/b2b-leads/edit/${row.id}`}>
                        <EditIcon className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/b2b-leads/delete/${row.id}`}>
                        <TrashIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION + PAGE SIZE */}
      <div className="flex items-center justify-between py-2">
        {/* Page Size */}

        <div></div>
        {/* <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            updateParam('pageSize', value);
            updateParam('page', '1');
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select> */}

        {/* Pagination */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => updateParam('page', String(page - 1))}
          >
            Previous
          </Button>

          <span>
            Page <b>{page}</b> of <b>{totalPages}</b>
          </span>

          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => updateParam('page', String(page + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
