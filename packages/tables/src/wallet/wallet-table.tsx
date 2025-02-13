// Copyright 2023-2024 LightDotSo.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type { WalletData } from "@lightdotso/data";
import { EmptyState } from "@lightdotso/elements";
import { useDebounced, useMediaQuery } from "@lightdotso/hooks";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@lightdotso/ui";
import type {
  ColumnDef,
  TableOptions,
  Table as ReactTable,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, type FC, useMemo } from "react";
import { walletColumns } from "./wallet-columns";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type WalletTableProps = {
  isLoading: boolean;
  pageSize: number;
  data: WalletData[] | null;
  tableOptions?: Omit<
    TableOptions<WalletData>,
    "data" | "columns" | "getCoreRowModel"
  >;
  columns?: ColumnDef<WalletData>[];
  setWalletTable?: (tableObject: ReactTable<WalletData>) => void;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const WalletTable: FC<WalletTableProps> = ({
  isLoading,
  pageSize,
  data,
  tableOptions,
  columns = walletColumns,
  setWalletTable,
}) => {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const isDesktop = useMediaQuery("md");

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const tableColumns = useMemo(() => {
    if (isDesktop) {
      return columns;
    }
    return columns.filter(column => column.id !== "actions");
  }, [columns, isDesktop]);

  // ---------------------------------------------------------------------------
  // Table
  // ---------------------------------------------------------------------------

  const table = useReactTable({
    ...tableOptions,
    data: data || [],
    columns: tableColumns,
    enableExpanding: true,
    enableRowSelection: false,
    manualPagination: true,
    paginateExpandedRows: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (setWalletTable) {
      setWalletTable(table);
    }
  }, [
    table,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table?.getColumn("address"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table?.getColumn("address")?.getFilterValue(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table?.getColumn("name"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table?.getColumn("name")?.getFacetedUniqueValues(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table?.getColumn("name")?.getCanHide(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table?.getColumn("name")?.getIsVisible(),
    setWalletTable,
  ]);

  // ---------------------------------------------------------------------------
  // Debounced Hooks
  // ---------------------------------------------------------------------------

  const delayedIsLoading = useDebounced(isLoading, 1000);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className="cursor-pointer"
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  <Link href={`/${row.original.address}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : delayedIsLoading ? (
          Array(pageSize)
            .fill(null)
            .map((_, index) => (
              <TableRow key={`loading-${index}`}>
                {table.getVisibleLeafColumns().map(column => (
                  <TableCell
                    key={column.id}
                    style={{ width: column.getSize() }}
                  >
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              <EmptyState entity="wallet" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
