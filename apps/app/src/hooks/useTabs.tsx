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

// Full complete example from: https://github.com/hqasmei/youtube-tutorials/blob/ee44df8fbf6ab4f4c2f7675f17d67813947a7f61/vercel-animated-tabs/src/hooks/use-tabs.tsx
// License: MIT

import {
  useQueryUserOperationsCount,
  useQueryConfiguration,
  useQueryWalletFeatures,
  useQueryWalletSettings,
} from "@lightdotso/query";
import { useAuth, useBanners } from "@lightdotso/stores";
import type { Tab } from "@lightdotso/types";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import type { Address } from "viem";
import { AI_TAB, DEV_TAB, DEFAULT_TABS, HOME_TABS } from "@/const";
import { useAppGroup } from "@/hooks";

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export function useTabs() {
  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { wallet: walletAddress, address: connectedAddress } = useAuth();

  // ---------------------------------------------------------------------------
  // Operation Hooks
  // ---------------------------------------------------------------------------

  const appGroup = useAppGroup();

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const tabs = useMemo(() => {
    if (appGroup === "demo") {
      return DEFAULT_TABS.filter(tab => {
        // Don't return `settings` and `support` and `activity` tabs
        return (
          tab.id !== "settings" && tab.id !== "support" && tab.id !== "activity"
        );
      });
    }
    return DEFAULT_TABS;
  }, [appGroup]);

  const isTabsNavigationVisible = useMemo(() => {
    if (
      appGroup === "unauthenticated" ||
      appGroup === "authenticated" ||
      appGroup === "swap"
    ) {
      return false;
    }
    return true;
  }, [appGroup]);

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { setIsNotOwner } = useBanners();

  // ---------------------------------------------------------------------------
  // Local Variables
  // ---------------------------------------------------------------------------

  const tabIds = tabs.map(tab => tab.id);

  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  // The index of the selected tab
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | undefined>(
    undefined,
  );

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // Set the initialTabId to the matching slug in tabIds array
  useEffect(() => {
    // Split the path using '/' as delimiter and remove empty strings
    const slugs = pathname.split("/").filter(slug => slug);
    const replacedSlugs = slugs.map(slug =>
      slug
        // Replace occurences of 'op' with 'transactions'
        .replace("op", "transactions")
        // Replace occurences of 'send' with 'transactions'
        .replace("send", "transactions"),
    );
    // Get the matching slug in tabIds array
    const matchingId = tabIds.find(slug => replacedSlugs.includes(slug));

    // Set the mount id
    const mountId = matchingId || "overview";
    // Set the initialTabId to the mount id
    const indexOfInitialTab = tabs.findIndex(tab => tab.id === mountId);
    // Set the initial tab
    setSelectedTabIndex(indexOfInitialTab === -1 ? 0 : indexOfInitialTab);

    // Only run on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { walletSettings } = useQueryWalletSettings({
    address: walletAddress as Address,
  });

  const { configuration, isConfigurationLoading, refetchConfiguration } =
    useQueryConfiguration({
      address: walletAddress as Address,
    });

  const { walletFeatures, refetchWalletFeatures } = useQueryWalletFeatures({
    address: walletAddress as Address,
  });

  const { userOperationsCount, refetchUserOperationsCount } =
    useQueryUserOperationsCount({
      address: walletAddress as Address,
      status: "queued",
      is_testnet: walletSettings?.is_enabled_testnet ?? false,
    });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  // Get the owners addresses
  const ownersAddresses = useMemo(() => {
    return configuration?.owners?.map(owner => owner.address) || [];
  }, [configuration?.owners]);

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // If the configuration is loading, return
    if (isConfigurationLoading) {
      return;
    }

    // If the `appGroup` is not `wallet`, do nothing
    if (appGroup !== "wallet") {
      return;
    }

    // If the user has connected their wallet
    if (connectedAddress) {
      // If the connected address is not in the owners addresses, show the not owner banner
      if (!ownersAddresses.includes(connectedAddress)) {
        setIsNotOwner(true);
      } else {
        // If the connected address is in the owners addresses, hide the not owner banner
        setIsNotOwner(false);
      }
      return;
    }

    // If the user hasn't connected their wallet, show the banner
    if (walletAddress && !connectedAddress) {
      setIsNotOwner(true);
    }
  }, [
    ownersAddresses,
    setIsNotOwner,
    appGroup,
    walletAddress,
    connectedAddress,
    isConfigurationLoading,
  ]);

  // Refetch the queries when the wallet address changes
  useEffect(() => {
    refetchWalletFeatures();
    refetchConfiguration();
    refetchUserOperationsCount();
  }, [
    walletAddress,
    refetchWalletFeatures,
    refetchConfiguration,
    refetchUserOperationsCount,
  ]);

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  // Inside useTabs function
  const transformedTabs: Tab[] = useMemo(() => {
    if (walletSettings?.is_enabled_dev) {
      // If dev not yet in tabs, add it
      if (!tabs.find(tab => tab.id === DEV_TAB.id)) {
        // Add it after the id `owners`
        const indexOfOwners = tabs.findIndex(tab => tab.id === "owners");
        tabs.splice(indexOfOwners + 1, 0, DEV_TAB);
      }
    }
    if (walletFeatures?.is_enabled_ai) {
      // If AI not yet in tabs, add it
      if (!tabs.find(tab => tab.id === AI_TAB.id)) {
        // Add it after the id `activity`
        const indexOfTransactions = tabs.findIndex(
          tab => tab.id === "activity",
        );
        tabs.splice(indexOfTransactions + 1, 0, AI_TAB);
      }
    }

    return tabs.map(tab => {
      if (tab.id === "owners") {
        if (configuration?.owners) {
          tab.number = configuration.owners.length;
        }
      } else if (tab.id === "transactions") {
        if (userOperationsCount?.count) {
          tab.number = userOperationsCount?.count;
        }
      }
      // else if (tab.id === "activity") {
      //   number = data.transaction_count;
      // }
      return tab;
    });
  }, [
    configuration,
    userOperationsCount,
    walletSettings?.is_enabled_dev,
    walletFeatures?.is_enabled_ai,
    tabs,
  ]);

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  if (appGroup === "unauthenticated" || appGroup === "authenticated") {
    return {
      tabProps: {
        tabs: HOME_TABS,
        selectedTabIndex: undefined,
        setSelectedTabIndex: setSelectedTabIndex,
      },
      selectedTab: null,
      contentProps: {
        order: 0,
        selectedTabIndex: undefined,
      },
    };
  }

  return {
    isTabsNavigationVisible: isTabsNavigationVisible,
    tabProps: {
      tabs: transformedTabs,
      selectedTabIndex: selectedTabIndex,
      setSelectedTabIndex: setSelectedTabIndex,
    },
    selectedTab: selectedTabIndex !== undefined ? tabs[selectedTabIndex] : null,
    contentProps: {
      order: 0,
      selectedTabIndex: selectedTabIndex,
    },
  };
}
