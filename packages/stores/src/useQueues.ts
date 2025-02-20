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

import type { Address } from "viem";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

type QueueTimestamp = {
  [address: Address]: number | null;
};

type QueuesStore = {
  tokenQueueTimestamp: QueueTimestamp;
  portfolioQueueTimestamp: QueueTimestamp;
  setTokenQueueTimestamp: (address: Address, timestamp: number) => void;
  setPortfolioQueueTimestamp: (address: Address, timestamp: number) => void;
};

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export const useQueues = create(
  devtools(
    persist<QueuesStore>(
      set => ({
        tokenQueueTimestamp: {},
        portfolioQueueTimestamp: {},
        setTokenQueueTimestamp: (address, timestamp) =>
          set(state => ({
            tokenQueueTimestamp: {
              ...state.tokenQueueTimestamp,
              [address]: timestamp,
            },
          })),
        setPortfolioQueueTimestamp: (address, timestamp) =>
          set(state => ({
            portfolioQueueTimestamp: {
              ...state.tokenQueueTimestamp,
              [address]: timestamp,
            },
          })),
      }),
      {
        name: "queues-state-v1",
        storage: createJSONStorage(() => sessionStorage),
        skipHydration: true,
        version: 0,
      },
    ),
    {
      anonymousActionType: "useQueues",
      name: "QueuesStore",
      serialize: { options: true },
    },
  ),
);
