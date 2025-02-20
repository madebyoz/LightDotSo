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

import { queryKeys } from "@lightdotso/query-keys";
import { getQueryClient } from "@lightdotso/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { unstable_noStore } from "next/cache";
import type { Address } from "viem";
import { ActivityDataTable } from "@/app/(wallet)/[address]/activity/(components)/activity-data-table";
import { ActivityDataTablePagination } from "@/app/(wallet)/[address]/activity/(components)/activity-data-table-pagination";
import { handler } from "@/handlers/[address]/activity/handler";
import { preloader } from "@/preloaders/[address]/activity/preloader";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface PageProps {
  params: { address: Address };
  searchParams: {
    pagination?: string;
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params, searchParams }: PageProps) {
  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  unstable_noStore();

  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(params, searchParams);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { activities, activitiesCount, paginationState } = await handler(
    params,
    searchParams,
  );

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    queryKeys.activity.list({
      address: params.address as Address,
      limit: paginationState.pageSize,
      offset: paginationState.pageIndex * paginationState.pageSize,
    }).queryKey,
    activities,
  );

  queryClient.setQueryData(
    queryKeys.activity.listCount({
      address: params.address as Address,
    }).queryKey,
    activitiesCount,
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ActivityDataTable address={params.address as Address} />
      <ActivityDataTablePagination />
    </HydrationBoundary>
  );
}
