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

import { useUserOperations } from "@lightdotso/stores";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
  Textarea,
} from "@lightdotso/ui";
import type { FC } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TransactionCalldata: FC = () => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { userOperations } = useUserOperations();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {userOperations &&
        userOperations.length > 0 &&
        userOperations.map((userOperation, index) => {
          return (
            <Accordion
              key={index}
              collapsible
              defaultValue="value-0"
              className="rounded-md border border-border bg-background-weak p-4"
              type="single"
            >
              <AccordionItem className="border-0" value={`value-${index}`}>
                <AccordionTrigger className="px-1 py-0 text-xl font-medium md:text-2xl">
                  Calldata #{index + 1}
                </AccordionTrigger>
                <AccordionContent className="px-1 pt-4">
                  <pre className="text-sm italic">
                    <Textarea
                      readOnly
                      className="h-auto w-full"
                      value={userOperation.callData}
                    />
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
    </>
  );
};
