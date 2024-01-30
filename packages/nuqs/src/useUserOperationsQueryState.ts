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

import type { PartialUserOperations } from "@lightdotso/schemas";
import { createParser, useQueryState } from "nuqs";

// -----------------------------------------------------------------------------
// Parser
// -----------------------------------------------------------------------------

export const userOperationsParser = createParser({
  parse(value) {
    if (value === "") {
      return [];
    }
    const keys = value.split(";");
    return keys
      .map(key => {
        const [chainId, initCode, callData] = key.split(":");
        const parsedChainId = parseInt(chainId);
        const parsedInitCode = initCode === "_" ? undefined : initCode;
        const parsedCallData = callData === "_" ? undefined : callData;

        return {
          chainId: !isNaN(parsedChainId) ? BigInt(parsedChainId) : undefined,
          initCode: parsedInitCode,
          callData: parsedCallData,
        };
      })
      .filter(
        operation => operation.chainId !== undefined && operation !== undefined,
      );
  },
  serialize(value: PartialUserOperations) {
    if (!value) {
      return "";
    }

    return value
      .map(
        operation =>
          `${operation.chainId}:${operation.initCode ?? "_"}:${
            operation.callData ?? "_"
          }`,
      )
      .join(";");
  },
});

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export const useUserOperationsQueryState = (
  initialUserOperations?: PartialUserOperations,
) => {
  return useQueryState(
    "userOperations",
    userOperationsParser.withDefault(initialUserOperations ?? [{}]),
  );
};