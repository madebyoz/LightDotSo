/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
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

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import type { Address } from "viem";
import { TokensList } from "@/components/token/tokens-list";
import { handler } from "@/handlers/paths/[address]/handler";
import { handler as pageHandler } from "@/handlers/paths/[address]/overview/tokens/handler";
import { preloader as pagePreloader } from "@/preloaders/paths/[address]/overview/tokens/preloader";
import { preloader } from "@/preloaders/paths/[address]/preloader";
import { queries } from "@/queries";
import { getQueryClient } from "@/services";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface PageProps {
  params: { address: Address };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: PageProps) {
  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(params);
  pagePreloader(params);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { walletSettings } = await handler(params);

  const { tokens, portfolio } = await pageHandler(params);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  queryClient.setQueryData(
    queries.wallet.settings(params.address as Address).queryKey,
    walletSettings,
  );
  queryClient.setQueryData(
    queries.portfolio.get(params.address as Address).queryKey,
    portfolio,
  );
  queryClient.setQueryData(
    queries.token.list({
      address: params.address as Address,
      is_testnet: walletSettings?.is_enabled_testnet,
    }).queryKey,
    tokens,
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <TokensList address={params.address as Address} />
      </Suspense>
    </HydrationBoundary>
  );
}