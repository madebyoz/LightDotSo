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

import {
  ownerParser,
  useInviteCodeQueryState,
  useNameQueryState,
  useOwnersQueryState,
  useSaltQueryState,
  useThresholdQueryState,
  useTypeQueryState,
} from "@lightdotso/nuqs";
import { cn } from "@lightdotso/utils";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { FC } from "react";
import {
  steps,
  StepsEnum,
} from "@/app/(authenticated)/new/(components)/root/root";
import type { Step } from "@/app/(authenticated)/new/(components)/root/root";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface RootLinkProps {
  stepType: StepsEnum;
  currentStepType: StepsEnum;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const RootLink: FC<RootLinkProps> = ({ currentStepType, stepType }) => {
  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const router = useRouter();
  const searchParams = useSearchParams();

  // ---------------------------------------------------------------------------
  // Query State Hooks
  // ---------------------------------------------------------------------------

  const [inviteCode] = useInviteCodeQueryState();
  const [name] = useNameQueryState();
  const [type] = useTypeQueryState();
  const [threshold] = useThresholdQueryState();
  const [salt] = useSaltQueryState();
  const [owners] = useOwnersQueryState();

  // ---------------------------------------------------------------------------
  // Mapping
  // ---------------------------------------------------------------------------

  const linkSteps = steps.map(step => {
    // Update the status of the step based on the current step
    if (step.enum === currentStepType) {
      return { ...step, status: "current" };
    }

    // If the current step is `new`, then we want to set the status as `upcoming`
    // for all other steps
    if (currentStepType === StepsEnum.New) {
      return { ...step, status: "upcoming" };
    }

    // If the current step is `configuration`, then we want to set `new` as `complete` and `configuration` as `upcoming`
    if (currentStepType === StepsEnum.Configuration) {
      if (step.enum === StepsEnum.New) {
        return { ...step, status: "complete" };
      }

      return { ...step, status: "upcoming" };
    }

    // If the current step is `confirm`, then we want to set `new` and `configuration` as `complete`
    if (
      currentStepType === StepsEnum.Confirm &&
      (step.enum === StepsEnum.New || step.enum === StepsEnum.Configuration)
    ) {
      return { ...step, status: "complete" };
    }

    // Return the step w/ the status as `complete` for typing purposes
    return { ...step, status: "complete" };
  });

  // Get the step from the stepType
  const step =
    linkSteps.find(step => step.href.includes(stepType)) ?? linkSteps[0];

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const navigateToStep = useCallback(
    (step: Step) => {
      const url = new URL(step.href, window.location.origin);
      // Forward the search params to the next step
      url.searchParams.set("inviteCode", inviteCode);
      url.searchParams.set("name", name);
      url.searchParams.set("type", type);
      url.searchParams.set("threshold", threshold.toString());
      url.searchParams.set("salt", salt ?? "");
      url.searchParams.set("owners", ownerParser.serialize(owners));
      router.push(url.toString());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, type, threshold, salt, owners],
  );

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------

  const validateParams = (
    params: ReadonlyURLSearchParams,
    requiredParams: string[],
  ) => {
    let totalWeight = 0;
    let threshold = 0;

    // Iterate over each key-value pair
    // for (const [key, value] of params.entries()) {
    //   // If the key matches the pattern "owners[i][weight]"
    //   if (/^owners\[\d+\]\[weight\]$/.test(key)) {
    //     // Add the parsed integer value to the total weight
    //     totalWeight += parseInt(value, 10);
    //   }
    //   // If the key matches the "threshold"
    //   if (key === "threshold") {
    //     // Store the parsed integer value
    //     threshold = parseInt(value, 10);
    //   }
    // }

    // Iterate over each required param
    for (let i = 0; i < requiredParams.length; i++) {
      if (!params.has(requiredParams[i]) || !params.get(requiredParams[i])) {
        return false;
      }
    }

    // If the total weight is lesser than the threshold, then return false
    if (totalWeight < threshold) return false;

    return true;
  };

  let requiredParams = ["inviteCode", "name", "owners", "salt", "threshold"];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <button
      disabled={
        // If stepType is `new`, it's always enabled
        (!(stepType === StepsEnum.New) &&
          // If stepType is `configuration` it's disabled if the name is not set
          stepType === StepsEnum.Configuration &&
          !name) ||
        // If stepType is `confirm` it's disabled if the validateParams returns false
        (stepType === StepsEnum.Confirm &&
          !validateParams(searchParams, requiredParams))
      }
      className="group flex w-full items-center bg-background-weak disabled:cursor-not-allowed"
      onClick={() => navigateToStep(step)}
    >
      <span
        className={cn(
          stepType === StepsEnum.New &&
            "absolute left-0 top-0 h-full bg-transparent md:bottom-0 md:top-auto md:w-[calc(100%-1.25rem)]",
          stepType === StepsEnum.Configuration &&
            "absolute left-0 top-0 h-full bg-transparent md:bottom-0 md:left-auto md:right-5 md:top-auto md:w-full",
          stepType === StepsEnum.Confirm &&
            "absolute left-0 top-0 h-full bg-transparent md:bottom-0 md:left-auto md:right-0 md:top-auto md:w-[calc(100%+1.25rem)]",
          // If the step is the current step, then we want to show the primary color
          // If the step is not the current step, then we want to show the muted color
          step.status === "current"
            ? "w-1 bg-background-primary md:h-1"
            : "w-0 bg-border md:h-0",
        )}
        aria-hidden="true"
      />
      <span className="flex items-center px-4 py-2 text-sm font-medium md:px-6 md:py-4">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-background-weak",
            step.status === "current"
              ? "border-border-primary"
              : "border-border",
          )}
        >
          {step.status === "complete" ? (
            <CheckIcon
              className="size-4 text-border [&>path]:stroke-[3]"
              aria-hidden="true"
            />
          ) : (
            <span
              className={cn(
                step.status === "current" ? "text-text" : "text-border",
              )}
            >
              {step.id}
            </span>
          )}
        </span>
        <span
          className={cn(
            "ml-4 text-sm font-medium",
            step.status === "current" ? "text-text" : "text-border",
          )}
        >
          {step.name}
        </span>
      </span>
    </button>
  );
};
