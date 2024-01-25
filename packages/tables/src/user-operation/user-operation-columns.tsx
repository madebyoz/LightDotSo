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

import type { UserOperationData } from "@lightdotso/data";
import { DataTableColumnHeader } from "@lightdotso/templates";
import type { ColumnDef } from "@tanstack/react-table";
import { UserOperationTableRowActions } from "./actions";
import {
  UserOperationCardInterpretationAction,
  UserOperationCardChain,
  UserOperationCardNonce,
  UserOperationCardStatus,
  UserOperationCardInterpretation,
  UserOperationCardToggle,
} from "./card";

// -----------------------------------------------------------------------------
// Definitions
// -----------------------------------------------------------------------------

export const userOperationColumns: ColumnDef<UserOperationData>[] = [
  {
    id: "actions",
    accessorKey: "actions",
    accessorFn: row => {
      return row?.interpretation?.actions;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => (
      <UserOperationCardInterpretationAction userOperation={row.original} />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 32,
  },
  {
    id: "chain_id",
    accessorKey: "chain_id",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-10" column={column} title="Chain" />
    ),
    cell: ({ row }) => <UserOperationCardChain userOperation={row.original} />,
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as number).toString());
    },
    enableSorting: true,
    enableHiding: true,
    size: 32,
  },
  {
    id: "interpretation",
    accessorKey: "interpretation",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-10"
        column={column}
        title="Interpretation"
      />
    ),
    cell: ({ row }) => (
      <UserOperationCardInterpretation userOperation={row.original} />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 32,
  },
  {
    id: "nonce",
    accessorKey: "nonce",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-10" column={column} title="Nonce" />
    ),
    cell: ({ row }) => <UserOperationCardNonce userOperation={row.original} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
    size: 32,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-10" column={column} title="Status" />
    ),
    cell: ({ row }) => <UserOperationCardStatus userOperation={row.original} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
    size: 32,
  },
  {
    id: "toggle",
    cell: () => <UserOperationCardToggle />,
    enableHiding: false,
    size: 32,
  },
  {
    id: "row_actions",
    cell: ({ row }) => <UserOperationTableRowActions row={row} />,
    size: 32,
  },
];
