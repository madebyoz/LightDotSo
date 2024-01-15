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

import type { TokenData } from "@lightdotso/data";
import { useAuth } from "@lightdotso/stores";
import {
  ButtonIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@lightdotso/ui";
import { Send, Shuffle } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type TokenCardActionsProps = { token: TokenData };

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TokenCardActions: FC<TokenCardActionsProps> = ({
  token: { address: tokenAddress, chain_id, decimals, symbol },
}) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { wallet } = useAuth();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (chain_id === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex items-center justify-end gap-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <ButtonIcon disabled size="sm" variant="shadow">
                <Shuffle className="h-4 w-4" />
                <span className="sr-only">Open swap modal</span>
              </ButtonIcon>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Swap {symbol}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <ButtonIcon asChild size="sm" variant="shadow">
                <Link
                  href={`/${wallet}/send?transfers=0:_:_:${chain_id}:erc20:${tokenAddress}|${decimals}|0`}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Open send modal</span>
                </Link>
              </ButtonIcon>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send {symbol}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};