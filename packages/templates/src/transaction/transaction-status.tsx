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

import { INTERNAL_LINKS } from "@lightdotso/const";
import {
  useQueryUserOperation,
  useQueryUserOperationMerkle,
} from "@lightdotso/query";
import { useUserOperations } from "@lightdotso/stores";
import { StateInfoSection } from "@lightdotso/ui";
import { shortenBytes32 } from "@lightdotso/utils";
import { getEtherscanUrlWithChainId } from "@lightdotso/utils/src/etherscan";
import { ArrowUpRight, CheckCircle2, LoaderIcon } from "lucide-react";
import { useMemo, type FC } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TransactionStatus: FC = () => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { pendingUserOperationMerkleRoot, pendingUserOperationHashes } =
    useUserOperations();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { userOperationMerkle } = useQueryUserOperationMerkle(
    {
      root: pendingUserOperationMerkleRoot,
    },
    true,
  );

  const { userOperation } = useQueryUserOperation(
    {
      hash:
        pendingUserOperationHashes && pendingUserOperationHashes.length === 1
          ? pendingUserOperationHashes[0]
          : null,
    },
    true,
  );

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const isStatusPending = useMemo(() => {
    // Get the status from the user operation merkle
    if (userOperationMerkle) {
      return userOperationMerkle.user_operations.every(
        userOperation => userOperation.transaction !== null,
      )
        ? false
        : true;
    }

    // Get the status from the single user operation
    if (userOperation) {
      return userOperation.transaction === null;
    }

    // Default to true if no data is available
    return true;
  }, [userOperationMerkle, userOperation]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <StateInfoSection
      icon={
        isStatusPending ? (
          <LoaderIcon className="mx-auto size-8 animate-spin rounded-full border border-border p-2 text-text-weak duration-1000 md:size-10" />
        ) : (
          <CheckCircle2 className="mx-auto size-8 rounded-full border border-border p-2 text-text-weak md:size-10" />
        )
      }
      title={
        isStatusPending
          ? pendingUserOperationHashes.length === 1
            ? "Pending transaction..."
            : `Pending ${pendingUserOperationHashes.length} transactions...`
          : "Success"
      }
      description={
        isStatusPending
          ? "Please wait while we handle your request..."
          : "Your transaction has been sent successfully."
      }
    >
      <div className="space-y-3">
        {pendingUserOperationMerkleRoot && (
          <div className="text-xs text-text-weak">
            Merkle Root:{" "}
            <a
              className="inline-flex items-center hover:underline"
              href={`${INTERNAL_LINKS.Explorer}/root/${pendingUserOperationMerkleRoot}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenBytes32(pendingUserOperationMerkleRoot)}
              <ArrowUpRight className="ml-2 size-4 shrink-0 opacity-50" />
            </a>
          </div>
        )}
        {userOperationMerkle &&
          userOperationMerkle.user_operations
            .filter(userOperation => userOperation.transaction !== null)
            .map(userOperation => (
              <div key={userOperation.hash} className="text-xs text-text-weak">
                Transaction Hash:{" "}
                <a
                  className="inline-flex items-center hover:underline"
                  href={`${getEtherscanUrlWithChainId(userOperation.chain_id)}/tx/${userOperation.transaction!.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenBytes32(userOperationMerkle.root)}
                  <ArrowUpRight className="ml-2 size-4 shrink-0 opacity-50" />
                </a>
              </div>
            ))}
        {userOperation && userOperation.transaction && (
          <div className="text-xs text-text-weak">
            Transaction Hash:{" "}
            <a
              className="inline-flex items-center hover:underline"
              href={`${getEtherscanUrlWithChainId(userOperation.chain_id)}/tx/${userOperation.transaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenBytes32(userOperation.transaction.hash)}
              <ArrowUpRight className="ml-2 size-4 shrink-0 opacity-50" />
            </a>
          </div>
        )}
      </div>
    </StateInfoSection>
  );
};
