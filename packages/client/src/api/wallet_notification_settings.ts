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

import { ResultAsync, err, ok } from "neverthrow";
import type { ClientType } from "../client";
import { getClient } from "../client";

// -----------------------------------------------------------------------------
// GET
// -----------------------------------------------------------------------------

export const getWalletNotificationSettings = async (
  {
    params,
  }: {
    params: {
      query: { address: string; user_id?: string | null | undefined };
    };
  },
  clientType?: ClientType,
) => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.GET("/wallet/notification/settings/get", {
      params: params,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};

// -----------------------------------------------------------------------------
// PUT
// -----------------------------------------------------------------------------

export const updateWalletNotificationSettings = async (
  {
    params,
    body,
  }: {
    params: {
      query: { address: string };
    };
    body: {
      wallet_notification_settings: {
        settings?: { key: string; value: boolean }[] | null | undefined;
      };
    };
  },
  clientType?: ClientType,
) => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.PUT("/wallet/notification/settings/update", {
      params: params,
      body: body,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};
