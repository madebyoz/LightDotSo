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

import { cn, getChainWithChainId, shortenName } from "@lightdotso/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type {
  FC,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps,
} from "react";
import { ArbitrumNovaLogo } from "./arbitrum-nova";
import { ArbitrumLogo } from "./arbitrum";
import { AvalancheLogo } from "./avalanche";
import { BaseLogo } from "./base";
import { BlastLogo } from "./blast";
import { BscLogo } from "./bsc";
import { CeloLogo } from "./celo";
import { EthereumLogo } from "./ethereum";
import { FantomLogo } from "./fantom";
import { FuseLogo } from "./fuse";
import { GnosisLogo } from "./gnosis";
import { LineaLogo } from "./linea";
import { ModeLogo } from "./mode";
import { OptimismLogo } from "./optimism";
import { PolygonZkEvmLogo } from "./polygon-zkevm";
import { PolygonLogo } from "./polygon";
import { SeiLogo } from "./sei";
import { ScrollLogo } from "./scroll";
import { ZoraLogo } from "./zora";

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const chainLogoVariants = cva([], {
  variants: {
    size: {
      default: "size-6",
      sm: "size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const testnetChainLogoVariants = cva([], {
  variants: {
    size: {
      default: "size-3 text-[6px]",
      sm: "size-2 text-[4px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// -----------------------------------------------------------------------------
// Wrapper
// -----------------------------------------------------------------------------

interface TestnetChainLogoWrapperProps
  extends SVGProps<SVGSVGElement>,
    VariantProps<typeof testnetChainLogoVariants> {
  logo: ForwardRefExoticComponent<
    PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
  >;
  chainId: number;
}

export const TestnetChainLogoWrapper: FC<TestnetChainLogoWrapperProps> = ({
  logo: Logo,
  chainId,
  size,
  ref: _,
  ...props
}) => (
  <span className="relative">
    <Logo {...props} />
    <span
      className={cn(
        "absolute bottom-0 right-0 inline-flex items-center justify-center rounded-full border border-border-primary-weak bg-background-stronger",
        testnetChainLogoVariants({ size: size }),
      )}
    >
      {shortenName(getChainWithChainId(chainId).name)}
    </span>
  </span>
);

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface ChainLogoProps
  extends SVGProps<SVGSVGElement>,
    VariantProps<typeof testnetChainLogoVariants> {
  chainId: number;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ChainLogo: FC<ChainLogoProps> = ({
  chainId,
  ref: _,
  className,
  size,
  ...props
}) => {
  const variantClassName = cn(className, chainLogoVariants({ size: size }));

  switch (chainId) {
    // -------------------------------------------------------------------------
    // Mainnet
    // -------------------------------------------------------------------------

    case 1:
      return <EthereumLogo className={variantClassName} {...props} />;
    case 10:
      return <OptimismLogo className={variantClassName} {...props} />;
    case 56:
      return <BscLogo className={variantClassName} {...props} />;
    case 100:
      return <GnosisLogo className={variantClassName} {...props} />;
    case 122:
      return <FuseLogo className={variantClassName} {...props} />;
    case 137:
      return <PolygonLogo className={variantClassName} {...props} />;
    case 250:
      return <FantomLogo className={variantClassName} {...props} />;
    case 1101:
      return <PolygonZkEvmLogo className={variantClassName} {...props} />;
    case 1329:
      return <SeiLogo className={variantClassName} {...props} />;
    case 8453:
      return <BaseLogo className={variantClassName} {...props} />;
    case 34443:
      return <ModeLogo className={variantClassName} {...props} />;
    case 42161:
      return <ArbitrumLogo className={variantClassName} {...props} />;
    case 42170:
      return <ArbitrumNovaLogo className={variantClassName} {...props} />;
    case 43114:
      return <AvalancheLogo className={variantClassName} {...props} />;
    case 42220:
      return <CeloLogo className={variantClassName} {...props} />;
    case 59144:
      return <LineaLogo className={variantClassName} {...props} />;
    case 81457:
      return <BlastLogo className={variantClassName} {...props} />;
    case 534352:
      return <ScrollLogo className={variantClassName} {...props} />;
    case 7777777:
      return <ZoraLogo className={variantClassName} {...props} />;

    // -------------------------------------------------------------------------
    // Testnet
    // -------------------------------------------------------------------------

    case 44787:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={CeloLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 59141:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={LineaLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 80001:
    case 80002:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={PolygonLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 84532:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={BaseLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 421614:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={ArbitrumLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 534351:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={LineaLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 713715:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={SeiLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 11155111:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={EthereumLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 11155420:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={OptimismLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    case 168587773:
      return (
        <TestnetChainLogoWrapper
          className={variantClassName}
          logo={BlastLogo}
          chainId={chainId}
          size={size}
          {...props}
        />
      );
    default:
      return <BaseLogo className={variantClassName} {...props} />;
  }
};
