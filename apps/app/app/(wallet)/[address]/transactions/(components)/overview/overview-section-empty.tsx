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

import type {
  UserOperationCountData,
  WalletSettingsData,
} from "@lightdotso/data";
import { EmptyState } from "@lightdotso/elements";
import { queryKeys } from "@lightdotso/query-keys";
import { Table, TableBody, TableCell, TableRow } from "@lightdotso/ui";
import { useQueryClient } from "@tanstack/react-query";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface OverviewSectionEmptyProps {
  address: Address;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const OverviewSectionEmpty = ({
  address,
}: OverviewSectionEmptyProps) => {
  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const walletSettings: WalletSettingsData | undefined =
    queryClient.getQueryData(queryKeys.wallet.settings({ address }).queryKey);

  const currentData: UserOperationCountData | undefined =
    queryClient.getQueryData(
      queryKeys.user_operation.listCount({
        address: address as Address,
        status: null,
        is_testnet: walletSettings?.is_enabled_testnet ?? false,
      }).queryKey,
    );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!currentData || currentData?.count > 0) {
    return null;
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="h-24 text-center">
            <EmptyState entity="transaction" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
