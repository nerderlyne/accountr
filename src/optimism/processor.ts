import { assertNotNull } from "@subsquid/util-internal";
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import * as entryPointAbi from "../abi/entryPoint";
import { ENTRYPOINT_V6, ENTRYPOINT_V7 } from "../constants";

export const processor = new EvmBatchProcessor()
  // Lookup archive by the network name in Subsquid registry
  // See https://docs.subsquid.io/evm-indexing/supported-networks/
  .setGateway("https://v2.archive.subsquid.io/network/optimism-mainnet")
  // Chain RPC endpoint is required for
  //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
  //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
  .setRpcEndpoint(
    assertNotNull(
      process.env.RPC_OPTIMISM_HTTP,
      "Required env variable RPC_OPTIMISM_HTTP is missing",
    ),
  )
  .setFinalityConfirmation(75)
  .setFields({
    log: {
      transactionHash: true,
    },
  })
  .setBlockRange({
    from: 88234528, // entrypoint v6 deployment block https://optimistic.etherscan.io/tx/0xcddea14be9b486fd1c7311dbaf58fe13f1316eebd16d350bed3573b90e9515b8
  })
  .addLog({
    address: [ENTRYPOINT_V6, ENTRYPOINT_V7],
    topic0: [
      entryPointAbi.events.AccountDeployed.topic,
      entryPointAbi.events.UserOperationEvent.topic,
    ],
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
