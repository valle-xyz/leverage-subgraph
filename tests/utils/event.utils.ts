import {
  Address,
  BigInt,
  Bytes,
  Wrapped,
  ethereum,
} from "@graphprotocol/graph-ts";

export let defaultAddress = Address.fromString(
  "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
);
let defaultAddressBytes = defaultAddress as Bytes;
let defaultBigInt = BigInt.fromI32(1);
let defaultIntBytes = Bytes.fromI32(1);
let defaultEventDataLogType = "default_log_type";

export function newEvent<EventType>(values: Array<ethereum.Value>): EventType {
  let params = values.map<ethereum.EventParam>(
    (value) => new ethereum.EventParam("parameter", value)
  );

  let event = new ethereum.Event(
    defaultAddress,
    defaultBigInt,
    defaultBigInt,
    defaultEventDataLogType,
    newBlock(),
    newTransaction(),
    params,
    newTransactionReceipt()
  );

  return changetype<EventType>(event);
}

export function newMockEvent(): ethereum.Event {
  return new ethereum.Event(
    defaultAddress,
    defaultBigInt,
    defaultBigInt,
    defaultEventDataLogType,
    newBlock(),
    newTransaction(),
    [],
    newTransactionReceipt()
  );
}

export function newMockCall(): ethereum.Call {
  return new ethereum.Call(
    defaultAddress,
    defaultAddress,
    newBlock(),
    newTransaction(),
    [],
    []
  );
}

function newBlock(): ethereum.Block {
  return new ethereum.Block(
    defaultAddressBytes,
    defaultAddressBytes,
    defaultAddressBytes,
    defaultAddress,
    defaultAddressBytes,
    defaultAddressBytes,
    defaultAddressBytes,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt
  );
}

function newTransaction(): ethereum.Transaction {
  return new ethereum.Transaction(
    defaultAddressBytes,
    defaultBigInt,
    defaultAddress,
    defaultAddress,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt,
    defaultAddressBytes,
    defaultBigInt
  );
}

function newTransactionReceipt(): ethereum.TransactionReceipt {
  return new ethereum.TransactionReceipt(
    defaultAddressBytes,
    defaultBigInt,
    defaultAddressBytes,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt,
    defaultAddress,
    [newLog()],
    defaultBigInt,
    defaultAddressBytes,
    defaultAddressBytes
  );
}

function newLog(): ethereum.Log {
  return new ethereum.Log(
    defaultAddress,
    [defaultAddressBytes],
    defaultAddressBytes,
    defaultAddressBytes,
    defaultIntBytes,
    defaultAddressBytes,
    defaultBigInt,
    defaultBigInt,
    defaultBigInt,
    defaultEventDataLogType,
    new Wrapped(false)
  );
}
