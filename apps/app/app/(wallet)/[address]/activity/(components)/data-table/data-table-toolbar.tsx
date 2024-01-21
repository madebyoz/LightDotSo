// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

"use client";

import type { ActivityData } from "@lightdotso/data";
import { queryKeys } from "@lightdotso/query-keys";
import { useAuth, useTables } from "@lightdotso/stores";
import {
  DataTableFacetedFilter,
  DataTableViewOptions,
} from "@lightdotso/templates";
import { Button, ToolbarSectionWrapper } from "@lightdotso/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import type { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import type { Address } from "viem";
import { usePaginationQueryState } from "@/queryStates";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface DataTableToolbarProps {
  table: Table<ActivityData>;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const { wallet } = useAuth();
  const { activityColumnFilters } = useTables();

  // ---------------------------------------------------------------------------
  // Query State Hooks
  // ---------------------------------------------------------------------------

  const [paginationState] = usePaginationQueryState();

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const offsetCount = useMemo(() => {
    return paginationState.pageSize * paginationState.pageIndex;
  }, [paginationState.pageSize, paginationState.pageIndex]);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const currentData: ActivityData[] | undefined = queryClient.getQueryData(
    queryKeys.activity.list({
      address: wallet as Address,
      offset: offsetCount,
      limit: paginationState.pageSize,
    }).queryKey,
  );

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const uniqueEntityValues = useMemo(() => {
    // Get all unique weight values from current data
    const uniqueEntityValues = new Set<string>();
    currentData?.forEach(activity => {
      uniqueEntityValues.add(activity.entity);
    });
    return uniqueEntityValues;
  }, [currentData]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <ToolbarSectionWrapper>
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("entity") && (
          <DataTableFacetedFilter
            column={table.getColumn("entity")}
            title="Entity"
            options={Array.from(uniqueEntityValues).map(entity => ({
              value: entity,
              label: `${entity.charAt(0).toUpperCase()}${entity
                .slice(1)
                .toLowerCase()}`,
            }))}
          />
        )}
        {activityColumnFilters.length > 0 && (
          <Button
            variant="outline"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions
        table={table}
        columnMapping={{
          entity: "Entity",
          operation: "Operation",
          timestmap: "Timestamp",
        }}
      />
    </ToolbarSectionWrapper>
  );
}
