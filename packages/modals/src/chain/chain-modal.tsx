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

"use client";

import { MAINNET_CHAINS, TESTNET_CHAINS } from "@lightdotso/const";
import { useChainQueryState } from "@lightdotso/nuqs";
import { useQueryWalletSettings } from "@lightdotso/query";
import { useAuth, useModals } from "@lightdotso/stores";
import { ChainLogo } from "@lightdotso/svg";
import { Modal } from "@lightdotso/templates";
import {
  Command,
  CommandList,
  CommandItem,
  CommandInput,
  TabsList,
  TabsTrigger,
  Tabs,
  TabsContent,
} from "@lightdotso/ui";
import { useMemo } from "react";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ChainModal() {
  // ---------------------------------------------------------------------------
  // Query State Hooks
  // ---------------------------------------------------------------------------

  const [, setChainState] = useChainQueryState();

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { wallet } = useAuth();
  const {
    isChainModalVisible,
    hideChainModal,
    chainModalProps: { onChainSelect },
  } = useModals();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { walletSettings } = useQueryWalletSettings({
    address: wallet as Address,
  });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const isTestnet = useMemo(
    () => walletSettings?.is_enabled_testnet ?? false,
    [walletSettings],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Command className="bg-transparent">
      <CommandList className="max-h-full">
        <Tabs className="w-full" defaultValue="mainnet">
          <Modal
            isSheet
            isHeightFixed
            open={isChainModalVisible}
            className="p-2"
            headerContent={
              <CommandInput
                className="my-0"
                wrapperClassName="flex grow border-b-0"
                placeholder="Type a chain or search..."
              />
            }
            bannerContent={
              isTestnet ? (
                <TabsList className="w-full">
                  <TabsTrigger className="w-full" value="mainnet">
                    Mainnet
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="testnet">
                    Testnet
                  </TabsTrigger>
                </TabsList>
              ) : undefined
            }
            onClose={hideChainModal}
          >
            {isTestnet ? (
              <>
                <TabsContent value="mainnet">
                  {MAINNET_CHAINS.map(chain => (
                    <CommandItem
                      key={chain.id}
                      value={chain.name}
                      onSelect={() => {
                        onChainSelect(chain.id);
                        setChainState(chain);
                        hideChainModal();
                      }}
                    >
                      <>
                        <ChainLogo chainId={chain.id} />
                        <span className="ml-2">{chain.name}</span>
                      </>
                    </CommandItem>
                  ))}
                </TabsContent>
                <TabsContent value="testnet">
                  {TESTNET_CHAINS.map(chain => (
                    <CommandItem
                      key={chain.id}
                      value={chain.name}
                      onSelect={() => {
                        onChainSelect(chain.id);
                        setChainState(chain);
                        hideChainModal();
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <ChainLogo chainId={chain.id} />
                        <span className="ml-2">{chain.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </TabsContent>
              </>
            ) : (
              <div className="mt-2">
                {MAINNET_CHAINS.map(chain => (
                  <CommandItem
                    key={chain.id}
                    value={chain.name}
                    onSelect={() => {
                      onChainSelect(chain.id);
                      setChainState(chain);
                      hideChainModal();
                    }}
                  >
                    <>
                      <ChainLogo chainId={chain.id} />
                      <span className="ml-2">{chain.name}</span>
                    </>
                  </CommandItem>
                ))}
              </div>
            )}
          </Modal>
        </Tabs>
      </CommandList>
    </Command>
  );
}

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export default ChainModal;
