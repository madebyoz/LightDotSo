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

/* eslint-disable @next/next/no-img-element */

import type { NftData } from "@lightdotso/data";
import { cn } from "@lightdotso/utils";
import { useState, type FC } from "react";
import { Blurhash } from "react-blurhash";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type NftImageProps = {
  className?: string;
  nft: NftData;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const NftImage: FC<NftImageProps> = ({
  className,
  nft: { contract_address, image_url, collection, previews, extra_metadata },
}) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className={cn(
        "aspect-h-1 aspect-w-1 relative w-full overflow-hidden bg-background",
        className,
      )}
    >
      {!isImageLoaded && previews && previews.blurhash && (
        <div className="absolute inset-0 size-full">
          <Blurhash width="100%" height="100%" hash={previews.blurhash} />
        </div>
      )}
      <img
        className={cn(
          "absolute inset-0 w-full duration-500 ease-in-out",
          !isImageLoaded && "bg-emphasis-medium animate-pulse",
          !isImageLoaded
            ? "scale-90 blur-xl"
            : "group-hover:blur-2 scale-100 blur-0 grayscale-0 group-hover:scale-125 group-hover:grayscale-0",
        )}
        src={
          image_url ??
          previews?.image_large_url ??
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          extra_metadata?.image_original_url!
        }
        alt={collection?.description ?? contract_address!}
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
};
