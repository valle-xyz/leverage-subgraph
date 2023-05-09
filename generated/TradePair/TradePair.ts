// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ChainlinkAggregatorSet extends ethereum.Event {
  get params(): ChainlinkAggregatorSet__Params {
    return new ChainlinkAggregatorSet__Params(this);
  }
}

export class ChainlinkAggregatorSet__Params {
  _event: ChainlinkAggregatorSet;

  constructor(event: ChainlinkAggregatorSet) {
    this._event = event;
  }

  get aggregator(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class LiquidityPoolSet extends ethereum.Event {
  get params(): LiquidityPoolSet__Params {
    return new LiquidityPoolSet__Params(this);
  }
}

export class LiquidityPoolSet__Params {
  _event: LiquidityPoolSet;

  constructor(event: LiquidityPoolSet) {
    this._event = event;
  }

  get liquidityPool(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class PositionClosed extends ethereum.Event {
  get params(): PositionClosed__Params {
    return new PositionClosed__Params(this);
  }
}

export class PositionClosed__Params {
  _event: PositionClosed;

  constructor(event: PositionClosed) {
    this._event = event;
  }

  get trader(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get positionId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get closePrice(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get closeDate(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get pnlShares(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class PositionOpened extends ethereum.Event {
  get params(): PositionOpened__Params {
    return new PositionOpened__Params(this);
  }
}

export class PositionOpened__Params {
  _event: PositionOpened;

  constructor(event: PositionOpened) {
    this._event = event;
  }

  get trader(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get positionId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get collateral(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get shares(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get leverage(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get isLong(): boolean {
    return this._event.parameters[5].value.toBoolean();
  }

  get entryPrice(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get liquidationPrice(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get takeProfitPrice(): BigInt {
    return this._event.parameters[8].value.toBigInt();
  }

  get openDate(): BigInt {
    return this._event.parameters[9].value.toBigInt();
  }
}

export class ProtocolSet extends ethereum.Event {
  get params(): ProtocolSet__Params {
    return new ProtocolSet__Params(this);
  }
}

export class ProtocolSet__Params {
  _event: ProtocolSet;

  constructor(event: ProtocolSet) {
    this._event = event;
  }

  get protocol(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ProtocolShareTaken extends ethereum.Event {
  get params(): ProtocolShareTaken__Params {
    return new ProtocolShareTaken__Params(this);
  }
}

export class ProtocolShareTaken__Params {
  _event: ProtocolShareTaken;

  constructor(event: ProtocolShareTaken) {
    this._event = event;
  }

  get protocol(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get protocolShare(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TradePair__positionsResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;
  value3: boolean;
  value4: BigInt;

  constructor(
    value0: Address,
    value1: BigInt,
    value2: BigInt,
    value3: boolean,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromBoolean(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getTrader(): Address {
    return this.value0;
  }

  getShares(): BigInt {
    return this.value1;
  }

  getLeverage(): BigInt {
    return this.value2;
  }

  getIsLong(): boolean {
    return this.value3;
  }

  getEntryPrice(): BigInt {
    return this.value4;
  }
}

export class TradePair extends ethereum.SmartContract {
  static bind(address: Address): TradePair {
    return new TradePair("TradePair", address);
  }

  chainlinkAggregator(): Address {
    let result = super.call(
      "chainlinkAggregator",
      "chainlinkAggregator():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_chainlinkAggregator(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "chainlinkAggregator",
      "chainlinkAggregator():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  liquidityPool(): Address {
    let result = super.call("liquidityPool", "liquidityPool():(address)", []);

    return result[0].toAddress();
  }

  try_liquidityPool(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "liquidityPool",
      "liquidityPool():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  positions(param0: BigInt): TradePair__positionsResult {
    let result = super.call(
      "positions",
      "positions(uint256):(address,uint128,uint32,bool,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new TradePair__positionsResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBoolean(),
      result[4].toBigInt()
    );
  }

  try_positions(
    param0: BigInt
  ): ethereum.CallResult<TradePair__positionsResult> {
    let result = super.tryCall(
      "positions",
      "positions(uint256):(address,uint128,uint32,bool,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TradePair__positionsResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBoolean(),
        value[4].toBigInt()
      )
    );
  }

  protocol(): Address {
    let result = super.call("protocol", "protocol():(address)", []);

    return result[0].toAddress();
  }

  try_protocol(): ethereum.CallResult<Address> {
    let result = super.tryCall("protocol", "protocol():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get liquidityPool_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get protocol_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get chainlinkAggregator_(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ClosePositionCall extends ethereum.Call {
  get inputs(): ClosePositionCall__Inputs {
    return new ClosePositionCall__Inputs(this);
  }

  get outputs(): ClosePositionCall__Outputs {
    return new ClosePositionCall__Outputs(this);
  }
}

export class ClosePositionCall__Inputs {
  _call: ClosePositionCall;

  constructor(call: ClosePositionCall) {
    this._call = call;
  }

  get positionId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ClosePositionCall__Outputs {
  _call: ClosePositionCall;

  constructor(call: ClosePositionCall) {
    this._call = call;
  }
}

export class ClosePositionsCall extends ethereum.Call {
  get inputs(): ClosePositionsCall__Inputs {
    return new ClosePositionsCall__Inputs(this);
  }

  get outputs(): ClosePositionsCall__Outputs {
    return new ClosePositionsCall__Outputs(this);
  }
}

export class ClosePositionsCall__Inputs {
  _call: ClosePositionsCall;

  constructor(call: ClosePositionsCall) {
    this._call = call;
  }

  get positionIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }
}

export class ClosePositionsCall__Outputs {
  _call: ClosePositionsCall;

  constructor(call: ClosePositionsCall) {
    this._call = call;
  }
}

export class OpenPositionCall extends ethereum.Call {
  get inputs(): OpenPositionCall__Inputs {
    return new OpenPositionCall__Inputs(this);
  }

  get outputs(): OpenPositionCall__Outputs {
    return new OpenPositionCall__Outputs(this);
  }
}

export class OpenPositionCall__Inputs {
  _call: OpenPositionCall;

  constructor(call: OpenPositionCall) {
    this._call = call;
  }

  get collateral(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get leverage(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get isLong(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class OpenPositionCall__Outputs {
  _call: OpenPositionCall;

  constructor(call: OpenPositionCall) {
    this._call = call;
  }
}

export class SetChainlinkAggregatorCall extends ethereum.Call {
  get inputs(): SetChainlinkAggregatorCall__Inputs {
    return new SetChainlinkAggregatorCall__Inputs(this);
  }

  get outputs(): SetChainlinkAggregatorCall__Outputs {
    return new SetChainlinkAggregatorCall__Outputs(this);
  }
}

export class SetChainlinkAggregatorCall__Inputs {
  _call: SetChainlinkAggregatorCall;

  constructor(call: SetChainlinkAggregatorCall) {
    this._call = call;
  }

  get aggregator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetChainlinkAggregatorCall__Outputs {
  _call: SetChainlinkAggregatorCall;

  constructor(call: SetChainlinkAggregatorCall) {
    this._call = call;
  }
}

export class SetLiquidityPoolCall extends ethereum.Call {
  get inputs(): SetLiquidityPoolCall__Inputs {
    return new SetLiquidityPoolCall__Inputs(this);
  }

  get outputs(): SetLiquidityPoolCall__Outputs {
    return new SetLiquidityPoolCall__Outputs(this);
  }
}

export class SetLiquidityPoolCall__Inputs {
  _call: SetLiquidityPoolCall;

  constructor(call: SetLiquidityPoolCall) {
    this._call = call;
  }

  get _liquidityPool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetLiquidityPoolCall__Outputs {
  _call: SetLiquidityPoolCall;

  constructor(call: SetLiquidityPoolCall) {
    this._call = call;
  }
}

export class SetProtocolCall extends ethereum.Call {
  get inputs(): SetProtocolCall__Inputs {
    return new SetProtocolCall__Inputs(this);
  }

  get outputs(): SetProtocolCall__Outputs {
    return new SetProtocolCall__Outputs(this);
  }
}

export class SetProtocolCall__Inputs {
  _call: SetProtocolCall;

  constructor(call: SetProtocolCall) {
    this._call = call;
  }

  get _protocol(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetProtocolCall__Outputs {
  _call: SetProtocolCall;

  constructor(call: SetProtocolCall) {
    this._call = call;
  }
}
