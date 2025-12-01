'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { leadsData, Lead } from '@/lib/data';

export default function B2BLeadsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalSearch, setGlobalSearch] = useState('');

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      { accessorKey: 'companyName', header: 'Company Name' },
      { accessorKey: 'contactName', header: 'Contact Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'Phone' },
      {
        accessorKey: 'industry',
        header: 'Industry',
        cell: ({ row }) => row.original.industry,
        filterFn: 'includesString',
      },
      {
        accessorKey: 'country',
        header: 'Country',
        cell: ({ row }) => row.original.country,
        filterFn: 'includesString',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          const color =
            status === 'New'
              ? 'bg-blue-100 text-blue-800'
              : status === 'Contacted'
              ? 'bg-yellow-100 text-yellow-800'
              : status === 'Qualified'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800';
          return (
            <Badge className={`${color} px-2 py-1 rounded-full`}>
              {status}
            </Badge>
          );
        },
        filterFn: 'equalsString',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert(`Viewing ${row.original.companyName}`)}
            >
              View
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => alert(`Editing ${row.original.companyName}`)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => alert(`Deleting ${row.original.companyName}`)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: leadsData,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Global Search */}
      <Input
        placeholder="Search company, contact, email..."
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* Column Filters */}
      <div className="flex gap-2">
        <Input
          placeholder="Filter by Industry"
          value={table.getColumn('industry')?.getFilterValue() ?? ''}
          onChange={(e) =>
            table.getColumn('industry')?.setFilterValue(e.target.value)
          }
          className="max-w-xs"
        />
        <Input
          placeholder="Filter by Country"
          value={table.getColumn('country')?.getFilterValue() ?? ''}
          onChange={(e) =>
            table.getColumn('country')?.setFilterValue(e.target.value)
          }
          className="max-w-xs"
        />
        <Input
          placeholder="Filter by Status"
          value={table.getColumn('status')?.getFilterValue() ?? ''}
          onChange={(e) =>
            table.getColumn('status')?.setFilterValue(e.target.value)
          }
          className="max-w-xs"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}
