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

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import dynamic from "next/dynamic";
import type { FC, ReactNode } from "react";
import { useState, useEffect } from "react";
import superjson from "superjson";

// -----------------------------------------------------------------------------
// Dynamic
// -----------------------------------------------------------------------------

const ReactQueryDevtoolsProduction = dynamic(() =>
  //@ts-expect-error
  import("@tanstack/react-query-devtools/production").then(d => ({
    default: d.ReactQueryDevtools,
  })),
);

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ReactQueryProviderProps = {
  children: ReactNode;
  showDevTools?: boolean;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({
  children,
  showDevTools = false,
}) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: Infinity,
          staleTime: 5 * 1000,
        },
      },
    });

    const persister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient: client,
      persister: persister,
    });

    setQueryClient(client);
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // Ensure that rendering is blocked until useEffect initializes `queryClient`
  if (!queryClient) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration transformer={superjson}>
        {children}
      </ReactQueryStreamedHydration>
      {showDevTools && process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && (
        <div className="hidden lg:block">
          <ReactQueryDevtoolsProduction />
        </div>
      )}
    </QueryClientProvider>
  );
};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export { ReactQueryProvider };
