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

import { debounce } from "lodash";
import { useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export function useDebouncedValue<T>(value: T, delay: number): T {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const handler = debounce(() => setDebouncedValue(value), delay);
    handler();
    return handler.cancel;
  }, [value, delay]);

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return debouncedValue;
}
