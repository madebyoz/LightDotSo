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

import { paginationParser } from "@lightdotso/nuqs";
import {
  getUserOperations,
  getUserOperationsCount,
} from "@lightdotso/services";
import { validateAddress } from "@lightdotso/validators";
import { Result } from "neverthrow";
import { notFound } from "next/navigation";
import type { Address } from "viem";
import { handler as addressHandler } from "@/handlers/[address]/handler";

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

export const handler = async (
  params: { address: string },
  searchParams: {
    pagination?: string;
  },
) => {
  // ---------------------------------------------------------------------------
  // Validators
  // ---------------------------------------------------------------------------

  if (!validateAddress(params.address)) {
    return notFound();
  }

  // ---------------------------------------------------------------------------
  // Parsers
  // ---------------------------------------------------------------------------

  const paginationState = paginationParser.parseServerSide(
    searchParams.pagination,
  );

  // ---------------------------------------------------------------------------
  // Fetch
  // ---------------------------------------------------------------------------

  const { walletSettings } = await addressHandler(params);

  const userOperationsPromise = getUserOperations({
    address: params.address as Address,
    status: "history",
    offset: paginationState.pageIndex * paginationState.pageSize,
    limit: paginationState.pageSize,
    order: "desc",
    is_testnet: walletSettings.is_enabled_testnet,
  });

  const userOperationsCountPromise = getUserOperationsCount({
    address: params.address as Address,
    status: "history",
    is_testnet: walletSettings.is_enabled_testnet,
  });

  const [userOperations, userOperationsCount] = await Promise.all([
    userOperationsPromise,
    userOperationsCountPromise,
  ]);

  // ---------------------------------------------------------------------------
  // Parse
  // ---------------------------------------------------------------------------

  const res = Result.combineWithAllErrors([
    userOperations,
    userOperationsCount,
  ]);

  return res.match(
    ([userOperations, userOperationsCount]) => {
      return {
        paginationState: paginationState,
        walletSettings: walletSettings,
        userOperations: userOperations,
        userOperationsCount: userOperationsCount,
      };
    },
    () => {
      return {
        paginationState: paginationState,
        walletSettings: walletSettings,
        userOperations: [],
        userOperationsCount: { count: 0 },
      };
    },
  );
};
