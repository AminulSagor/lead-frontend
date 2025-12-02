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
import { useEffect, useMemo, useState } from 'react';
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
  const [filters, setFilters] = useState({
    businessType: '',
    industry: '',
    onlineService: '',
    country: '',
  });

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  const filteredLeads = useMemo(() => {
    return DUMMY_LEADS.filter((lead) => {
      // business type
      if (filters.businessType) {
        const normalized = lead.businessType.toLowerCase().replace(/\s+/g, '');
        if (!normalized.includes(filters.businessType)) return false;
      }

      // industry
      if (filters.industry) {
        if (!lead.primaryIndustry.toLowerCase().includes(filters.industry)) {
          return false;
        }
      }

      // onlineService
      if (filters.onlineService) {
        if (
          lead.onlineService.toLowerCase() !==
          filters.onlineService.toLowerCase()
        ) {
          return false;
        }
      }

      // country
      if (filters.country) {
        if (lead.country.toLowerCase() !== filters.country) return false;
      }

      return true;
    });
  }, [filters]);

  useEffect(() => {
    setFilters({
      businessType: searchParams.get('businessType') || '',
      industry: searchParams.get('industry') || '',
      onlineService: searchParams.get('onlineService') || '',
      country: searchParams.get('country') || '',
    });
  }, [searchParams]);

  return (
    <div className="space-y-4">
      {/* FILTER BAR */}
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <p className="text-lg font-semibold">Filters:</p>
          {/* Business Type */}
          <Select
            value={filters.businessType}
            onValueChange={(value) => {
              setFilters({
                ...filters,
                businessType: value,
              });
              updateParam('businessType', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Business Type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPE_LIST.map((businessType) => {
                return (
                  <SelectItem
                    key={businessType.value}
                    value={businessType.value}
                  >
                    {businessType.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {/* Industry */}

          <Select
            value={filters.industry}
            onValueChange={(value) => {
              setFilters({
                ...filters,
                industry: value,
              });
              updateParam('industry', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_LIST.map((industry) => {
                return (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select
            value={filters.onlineService}
            onValueChange={(value) => {
              setFilters({
                ...filters,
                onlineService: value,
              });
              updateParam('onlineService', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Online Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.country}
            onValueChange={(value) => {
              setFilters({
                ...filters,
                country: value,
              });
              updateParam('country', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_LIST.map((country) => {
                return (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => {
              setFilters({
                businessType: '',
                industry: '',
                onlineService: '',
                country: '',
              });

              router.replace(pathname); // removes all params
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>

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
            {filteredLeads.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className=" font-medium">{row.name}</TableCell>
                <TableCell>{row.businessType}</TableCell>
                <TableCell>{row.primaryIndustry}</TableCell>
                <TableCell className="max-w-[140px] truncate">
                  {row.niche}
                </TableCell>
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
                <TableCell className=" text-right">
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
                      <Link href={`/b2b-leads/edit/${row.id}`}>
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
    </div>
  );
}
