import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AccountDeployed: event("0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d", {"userOpHash": indexed(p.bytes32), "sender": indexed(p.address), "factory": p.address, "paymaster": p.address}),
    BeforeExecution: event("0xbb47ee3e183a558b1a2ff0874b079f3fc5478b7454eacf2bfc5af2ff5878f972", {}),
    Deposited: event("0x2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4", {"account": indexed(p.address), "totalDeposit": p.uint256}),
    PostOpRevertReason: event("0xf62676f440ff169a3a9afdbf812e89e7f95975ee8e5c31214ffdef631c5f4792", {"userOpHash": indexed(p.bytes32), "sender": indexed(p.address), "nonce": p.uint256, "revertReason": p.bytes}),
    SignatureAggregatorChanged: event("0x575ff3acadd5ab348fe1855e217e0f3678f8d767d7494c9f9fefbee2e17cca4d", {"aggregator": indexed(p.address)}),
    StakeLocked: event("0xa5ae833d0bb1dcd632d98a8b70973e8516812898e19bf27b70071ebc8dc52c01", {"account": indexed(p.address), "totalStaked": p.uint256, "unstakeDelaySec": p.uint256}),
    StakeUnlocked: event("0xfa9b3c14cc825c412c9ed81b3ba365a5b459439403f18829e572ed53a4180f0a", {"account": indexed(p.address), "withdrawTime": p.uint256}),
    StakeWithdrawn: event("0xb7c918e0e249f999e965cafeb6c664271b3f4317d296461500e71da39f0cbda3", {"account": indexed(p.address), "withdrawAddress": p.address, "amount": p.uint256}),
    UserOperationEvent: event("0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f", {"userOpHash": indexed(p.bytes32), "sender": indexed(p.address), "paymaster": indexed(p.address), "nonce": p.uint256, "success": p.bool, "actualGasCost": p.uint256, "actualGasUsed": p.uint256}),
    UserOperationPrefundTooLow: event("0x67b4fa9642f42120bf031f3051d1824b0fe25627945b27b8a6a65d5761d5482e", {"userOpHash": indexed(p.bytes32), "sender": indexed(p.address), "nonce": p.uint256}),
    UserOperationRevertReason: event("0x1c4fada7374c0a9ee8841fc38afe82932dc0f8e69012e927f061a8bae611a201", {"userOpHash": indexed(p.bytes32), "sender": indexed(p.address), "nonce": p.uint256, "revertReason": p.bytes}),
    Withdrawn: event("0xd1c19fbcd4551a5edfb66d43d2e337c04837afda3482b42bdf569a8fccdae5fb", {"account": indexed(p.address), "withdrawAddress": p.address, "amount": p.uint256}),
}

export const functions = {
    addStake: fun("0x0396cb60", {"unstakeDelaySec": p.uint32}, ),
    balanceOf: viewFun("0x70a08231", {"account": p.address}, p.uint256),
    delegateAndRevert: fun("0x850aaf62", {"target": p.address, "data": p.bytes}, ),
    depositTo: fun("0xb760faf9", {"account": p.address}, ),
    deposits: viewFun("0xfc7e286d", {"_0": p.address}, {"deposit": p.uint256, "staked": p.bool, "stake": p.uint112, "unstakeDelaySec": p.uint32, "withdrawTime": p.uint48}),
    getDepositInfo: viewFun("0x5287ce12", {"account": p.address}, p.struct({"deposit": p.uint256, "staked": p.bool, "stake": p.uint112, "unstakeDelaySec": p.uint32, "withdrawTime": p.uint48})),
    getNonce: viewFun("0x35567e1a", {"sender": p.address, "key": p.uint192}, p.uint256),
    getSenderAddress: fun("0x9b249f69", {"initCode": p.bytes}, ),
    getUserOpHash: viewFun("0x22cdde4c", {"userOp": p.struct({"sender": p.address, "nonce": p.uint256, "initCode": p.bytes, "callData": p.bytes, "accountGasLimits": p.bytes32, "preVerificationGas": p.uint256, "gasFees": p.bytes32, "paymasterAndData": p.bytes, "signature": p.bytes})}, p.bytes32),
    handleAggregatedOps: fun("0xdbed18e0", {"opsPerAggregator": p.array(p.struct({"userOps": p.array(p.struct({"sender": p.address, "nonce": p.uint256, "initCode": p.bytes, "callData": p.bytes, "accountGasLimits": p.bytes32, "preVerificationGas": p.uint256, "gasFees": p.bytes32, "paymasterAndData": p.bytes, "signature": p.bytes})), "aggregator": p.address, "signature": p.bytes})), "beneficiary": p.address}, ),
    handleOps: fun("0x765e827f", {"ops": p.array(p.struct({"sender": p.address, "nonce": p.uint256, "initCode": p.bytes, "callData": p.bytes, "accountGasLimits": p.bytes32, "preVerificationGas": p.uint256, "gasFees": p.bytes32, "paymasterAndData": p.bytes, "signature": p.bytes})), "beneficiary": p.address}, ),
    incrementNonce: fun("0x0bd28e3b", {"key": p.uint192}, ),
    innerHandleOp: fun("0x0042dc53", {"callData": p.bytes, "opInfo": p.struct({"mUserOp": p.struct({"sender": p.address, "nonce": p.uint256, "verificationGasLimit": p.uint256, "callGasLimit": p.uint256, "paymasterVerificationGasLimit": p.uint256, "paymasterPostOpGasLimit": p.uint256, "preVerificationGas": p.uint256, "paymaster": p.address, "maxFeePerGas": p.uint256, "maxPriorityFeePerGas": p.uint256}), "userOpHash": p.bytes32, "prefund": p.uint256, "contextOffset": p.uint256, "preOpGas": p.uint256}), "context": p.bytes}, p.uint256),
    nonceSequenceNumber: viewFun("0x1b2e01b8", {"_0": p.address, "_1": p.uint192}, p.uint256),
    supportsInterface: viewFun("0x01ffc9a7", {"interfaceId": p.bytes4}, p.bool),
    unlockStake: fun("0xbb9fe6bf", {}, ),
    withdrawStake: fun("0xc23a5cea", {"withdrawAddress": p.address}, ),
    withdrawTo: fun("0x205c2878", {"withdrawAddress": p.address, "withdrawAmount": p.uint256}, ),
}

export class Contract extends ContractBase {

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    deposits(_0: DepositsParams["_0"]) {
        return this.eth_call(functions.deposits, {_0})
    }

    getDepositInfo(account: GetDepositInfoParams["account"]) {
        return this.eth_call(functions.getDepositInfo, {account})
    }

    getNonce(sender: GetNonceParams["sender"], key: GetNonceParams["key"]) {
        return this.eth_call(functions.getNonce, {sender, key})
    }

    getUserOpHash(userOp: GetUserOpHashParams["userOp"]) {
        return this.eth_call(functions.getUserOpHash, {userOp})
    }

    nonceSequenceNumber(_0: NonceSequenceNumberParams["_0"], _1: NonceSequenceNumberParams["_1"]) {
        return this.eth_call(functions.nonceSequenceNumber, {_0, _1})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }
}

/// Event types
export type AccountDeployedEventArgs = EParams<typeof events.AccountDeployed>
export type BeforeExecutionEventArgs = EParams<typeof events.BeforeExecution>
export type DepositedEventArgs = EParams<typeof events.Deposited>
export type PostOpRevertReasonEventArgs = EParams<typeof events.PostOpRevertReason>
export type SignatureAggregatorChangedEventArgs = EParams<typeof events.SignatureAggregatorChanged>
export type StakeLockedEventArgs = EParams<typeof events.StakeLocked>
export type StakeUnlockedEventArgs = EParams<typeof events.StakeUnlocked>
export type StakeWithdrawnEventArgs = EParams<typeof events.StakeWithdrawn>
export type UserOperationEventEventArgs = EParams<typeof events.UserOperationEvent>
export type UserOperationPrefundTooLowEventArgs = EParams<typeof events.UserOperationPrefundTooLow>
export type UserOperationRevertReasonEventArgs = EParams<typeof events.UserOperationRevertReason>
export type WithdrawnEventArgs = EParams<typeof events.Withdrawn>

/// Function types
export type AddStakeParams = FunctionArguments<typeof functions.addStake>
export type AddStakeReturn = FunctionReturn<typeof functions.addStake>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type DelegateAndRevertParams = FunctionArguments<typeof functions.delegateAndRevert>
export type DelegateAndRevertReturn = FunctionReturn<typeof functions.delegateAndRevert>

export type DepositToParams = FunctionArguments<typeof functions.depositTo>
export type DepositToReturn = FunctionReturn<typeof functions.depositTo>

export type DepositsParams = FunctionArguments<typeof functions.deposits>
export type DepositsReturn = FunctionReturn<typeof functions.deposits>

export type GetDepositInfoParams = FunctionArguments<typeof functions.getDepositInfo>
export type GetDepositInfoReturn = FunctionReturn<typeof functions.getDepositInfo>

export type GetNonceParams = FunctionArguments<typeof functions.getNonce>
export type GetNonceReturn = FunctionReturn<typeof functions.getNonce>

export type GetSenderAddressParams = FunctionArguments<typeof functions.getSenderAddress>
export type GetSenderAddressReturn = FunctionReturn<typeof functions.getSenderAddress>

export type GetUserOpHashParams = FunctionArguments<typeof functions.getUserOpHash>
export type GetUserOpHashReturn = FunctionReturn<typeof functions.getUserOpHash>

export type HandleAggregatedOpsParams = FunctionArguments<typeof functions.handleAggregatedOps>
export type HandleAggregatedOpsReturn = FunctionReturn<typeof functions.handleAggregatedOps>

export type HandleOpsParams = FunctionArguments<typeof functions.handleOps>
export type HandleOpsReturn = FunctionReturn<typeof functions.handleOps>

export type IncrementNonceParams = FunctionArguments<typeof functions.incrementNonce>
export type IncrementNonceReturn = FunctionReturn<typeof functions.incrementNonce>

export type InnerHandleOpParams = FunctionArguments<typeof functions.innerHandleOp>
export type InnerHandleOpReturn = FunctionReturn<typeof functions.innerHandleOp>

export type NonceSequenceNumberParams = FunctionArguments<typeof functions.nonceSequenceNumber>
export type NonceSequenceNumberReturn = FunctionReturn<typeof functions.nonceSequenceNumber>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type UnlockStakeParams = FunctionArguments<typeof functions.unlockStake>
export type UnlockStakeReturn = FunctionReturn<typeof functions.unlockStake>

export type WithdrawStakeParams = FunctionArguments<typeof functions.withdrawStake>
export type WithdrawStakeReturn = FunctionReturn<typeof functions.withdrawStake>

export type WithdrawToParams = FunctionArguments<typeof functions.withdrawTo>
export type WithdrawToReturn = FunctionReturn<typeof functions.withdrawTo>

