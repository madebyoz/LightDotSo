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

import { useEffect, type FC } from "react";
import type { DataTableToolbarProps } from "@/app/(wallet)/[address]/transactions/(components)/data-table/data-table-toolbar";
import { DataTableToolbar } from "@/app/(wallet)/[address]/transactions/(components)/data-table/data-table-toolbar";
import { useTables } from "@/stores";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type TransactionsDataTableToolbarProps = Pick<
  DataTableToolbarProps,
  "status"
>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TransactionsDataTableToolbar: FC<
  TransactionsDataTableToolbarProps
> = ({ status }) => {
  const { userOperationTable } = useTables();

  useEffect(() => {
    if (!useTables.persist.hasHydrated()) {
      useTables.persist.rehydrate();
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!userOperationTable || !useTables.persist.hasHydrated()) {
    return null;
  }

  return <DataTableToolbar status={status} table={userOperationTable} />;
};