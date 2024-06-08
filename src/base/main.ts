import { TypeormDatabase } from "@subsquid/typeorm-store";
import { AccountDeployed, UserOperationEvent } from "../model/generated";
import * as entryPointAbi from "../abi/entryPoint";
import { processor } from "./processor";
import { ENTRYPOINT_V6, ENTRYPOINT_V7 } from "../constants";
import { convertTimestampMilliToSeconds } from "../utils";

processor.run(
  new TypeormDatabase({
    supportHotBlocks: true,
    stateSchema: "base_processor",
  }),
  async (ctx) => {
    const accountDeployedEvents: AccountDeployed[] = [];
    const userOperationEvents: UserOperationEvent[] = [];

    for (let c of ctx.blocks) {
      for (let log of c.logs) {
        if (
          log.address.toLowerCase() !== ENTRYPOINT_V6 &&
          log.address.toLowerCase() !== ENTRYPOINT_V7
        )
          continue;

        if (log.topics[0] === entryPointAbi.events.AccountDeployed.topic) {
          let { userOpHash, sender, factory, paymaster } =
            entryPointAbi.events.AccountDeployed.decode(log);
          accountDeployedEvents.push(
            new AccountDeployed({
              id: log.id,
              network: "base",
              block: c.header.height,
              entryPoint: log.address.toLowerCase(),
              timestamp: new Date(
                convertTimestampMilliToSeconds(c.header.timestamp),
              ),
              userOpHash: userOpHash.toLowerCase(),
              sender: sender.toLowerCase(),
              factory: factory.toLowerCase(),
              paymaster: paymaster.toLowerCase(),
              txHash: log.transactionHash.toLowerCase(),
            }),
          );
        } else if (
          log.topics[0] === entryPointAbi.events.UserOperationEvent.topic
        ) {
          let {
            userOpHash,
            sender,
            paymaster,
            nonce,
            success,
            actualGasCost,
            actualGasUsed,
          } = entryPointAbi.events.UserOperationEvent.decode(log);
          userOperationEvents.push(
            new UserOperationEvent({
              id: log.id,
              network: "base",
              block: c.header.height,
              entryPoint: log.address.toLowerCase(),
              timestamp: new Date(
                convertTimestampMilliToSeconds(c.header.timestamp),
              ),
              userOpHash: userOpHash.toLowerCase(),
              sender: sender.toLowerCase(),
              paymaster: paymaster.toLowerCase(),
              nonce,
              success,
              actualGasCost,
              actualGasUsed,
              txHash: log.transactionHash.toLowerCase(),
            }),
          );
        }
      }
    }

    await ctx.store.upsert([...accountDeployedEvents]);
    await ctx.store.upsert([...userOperationEvents]);
  },
);
