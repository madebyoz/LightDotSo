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

use crate::{result::AppJsonResult, state::AppState};
use autometrics::autometrics;
use axum::{
    extract::{Query, State},
    Json,
};
use ethers_main::{types::H160, utils::to_checksum};

use lightdotso_prisma::{user_operation, UserOperationStatus};
use lightdotso_tracing::tracing::info;
use prisma_client_rust::{or, Direction};
use serde::{Deserialize, Serialize};
use utoipa::{IntoParams, ToSchema};

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

#[derive(Debug, Deserialize, Default, IntoParams)]
#[serde(rename_all = "snake_case")]
#[into_params(parameter_in = Query)]
pub struct GetQuery {
    /// The chain id to get the user operation nonce for.
    pub chain_id: i64,
    /// The sender address to filter by.
    pub address: String,
}

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/// Nonce
#[derive(Serialize, Deserialize, ToSchema, Clone)]
#[serde(rename_all = "snake_case")]
pub(crate) struct UserOperationNonce {
    /// The hash of the transaction.
    pub nonce: i64,
}

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// Get a user operation nonce
#[utoipa::path(
        get,
        path = "/user_operation/nonce",
        params(
            GetQuery
        ),
        responses(
            (status = 200, description = " User operation nonce returned successfully", body = UserOperationNonce),
            (status = 404, description = " User operation nonce not found", body = UserOperationError),
        )
    )]
#[autometrics]
pub(crate) async fn v1_user_operation_nonce_handler(
    get_query: Query<GetQuery>,
    State(state): State<AppState>,
) -> AppJsonResult<UserOperationNonce> {
    // -------------------------------------------------------------------------
    // Parse
    // -------------------------------------------------------------------------

    // Get the get query.
    let Query(query) = get_query;
    let chain_id = query.chain_id;
    // Get the wallet address from the nonce query.
    let address: H160 = query.address.parse()?;

    // Get the user operations from the database.
    let user_operation = state
        .client
        .user_operation()
        .find_first(vec![
            user_operation::chain_id::equals(chain_id),
            user_operation::sender::equals(to_checksum(&address, None)),
            or![
                user_operation::status::equals(UserOperationStatus::Executed),
                user_operation::status::equals(UserOperationStatus::Reverted)
            ],
        ])
        .order_by(user_operation::nonce::order(Direction::Desc))
        .exec()
        .await?;
    info!(?user_operation);

    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------

    // If the user operation is not found, return 0 as Ok.
    match user_operation {
        Some(user_operation) => {
            // If the user operation is of nonce 0, query if there is an additional user operation
            // of AccountDeploy
            // if user_operation.nonce == 0 {
            //     info!("Found user operation of nonce 0");

            //     if let Some(hash) = user_operation.transaction_hash {
            //         // Fetch the receipt and logs
            //         let receipt = client
            //             .client
            //
            //             .receipt()
            //             .find_unique(receipt::transaction_hash::equals(hash))
            //             .with(receipt::logs::fetch(vec![]).with(log::topics::fetch(vec![])))
            //             .exec()
            //             .await?;
            //         info!(?receipt);

            //         if let Some(receipt) = receipt {
            //             info!(?receipt);

            //             // Iterate through the logs and check if the first log is an `Account
            //             // Deployed` event
            //             // Unwrap is safe because `with::Fetch`` has been called
            //             for log in receipt.logs {
            //                 for topic in log.topics {
            //                     // If the data is equal to the hash of the `AccountDeployed`
            // event                     if topic.id ==
            // *"0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d-0" &&
            // log.data.len() == 64 {                       // Parse the topic data as
            // hex string                       // Get the first 64 characters
            //                       let address = H160::from_slice(&log.data[44..64]);
            //                       info!("address: {}", to_checksum(&address, None));

            //                       // Check if the data in the paymaster is one of ours
            //                       if LIGHT_PAYMASTER_ADDRESSES.contains(&address) {
            //                         return Ok(Json::from(UserOperationNonce { nonce: 2 }));
            //                       }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }

            Ok(Json::from(UserOperationNonce { nonce: user_operation.nonce + 1 }))
        }
        None => Ok(Json::from(UserOperationNonce { nonce: 0 })),
    }
}
