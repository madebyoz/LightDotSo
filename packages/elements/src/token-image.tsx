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

/* eslint-disable @next/next/no-img-element */

import type { TokenData } from "@lightdotso/data";
import { Skeleton } from "@lightdotso/ui";
import { cn, shortenName } from "@lightdotso/utils";
import { getChainLabelById } from "@lightdotso/utils/src/chain";
import { cva, type VariantProps } from "class-variance-authority";
import { useState, type FC, useEffect } from "react";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const parseTokenAddress = (token: TokenData) => {
  if (
    token.chain_id == 137 &&
    token.address == "0x0000000000000000000000000000000000000000"
  ) {
    return [1, "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"];
  }

  if (token.address == "0x0000000000000000000000000000000000000000") {
    return [1, "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"];
  }

  return [token.chain_id, token.address.toLowerCase()];
};

// -----------------------------------------------------------------------------
// Cva
// -----------------------------------------------------------------------------

const tokenImageVariants = cva("inline-flex overflow-hidden rounded-full", {
  variants: {
    size: {
      xs: "size-6",
      sm: "size-8",
      md: "size-12",
      lg: "size-16",
      xl: "size-24",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type TokenImageProps = {
  className?: string;
  token: TokenData;
  size?: VariantProps<typeof tokenImageVariants>["size"];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TokenImage: FC<TokenImageProps> = ({ className, token, size }) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [tokenChainId, tokenAddress] = parseTokenAddress(token);

  // ---------------------------------------------------------------------------
  // Local Variables
  // ---------------------------------------------------------------------------

  const urls = [
    `https://logos.covalenthq.com/tokens/${tokenChainId}/${tokenAddress}.png`,
    `https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/${getChainLabelById(token.chain_id)}/assets/${token.address.toLowerCase()}/logo.png`,
    `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${getChainLabelById(token.chain_id)}/assets/${token.address.toLowerCase()}/logo.png`,
  ];
  const currentUrl = urls[currentUrlIndex];

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const img = new Image();
    img.src = currentUrl;
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => {
      if (currentUrlIndex < urls.length - 1) {
        setCurrentUrlIndex(prevUrlIndex => prevUrlIndex + 1);
        setIsImageLoaded(false);
      } else {
        setIsImageLoaded(true);
        setIsImageError(true);
      }
    };
  }, [currentUrl, currentUrlIndex, urls.length]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!isImageLoaded) {
    return <Skeleton className={cn(tokenImageVariants({ size }), className)} />;
  }

  if (isImageLoaded && !isImageError) {
    return (
      <img
        className={cn(tokenImageVariants({ size }), className)}
        src={currentUrl}
        alt={token.name ?? token.symbol}
        onLoad={() => setIsImageLoaded(true)}
        onErrorCapture={() => setIsImageError(true)}
      />
    );
  }

  return (
    <span
      className={cn(
        "items-center justify-center text-ellipsis border border-border-primary-weak bg-background-stronger text-xs leading-none text-text-weak",
        tokenImageVariants({ size }),
        className,
      )}
    >
      {shortenName(token.name ?? token.symbol)}
    </span>
  );
};