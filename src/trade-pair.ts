import { log, BigInt, BigDecimal } from "@graphprotocol/graph-ts";

import {
  PositionClosed as PositionClosedEvent,
  PositionOpened as PositionOpenedEvent,
  ProtocolSet as ProtocolSetEvent,
  LiquidityPoolSet as LiquidityPoolSetEvent,
  ProtocolShareTaken as ProtocolShareTakenEvent,
} from "../generated/TradePair/TradePair";
import { Position, Protocol, TradePair, Trader } from "../generated/schema";
import {
  getLiquidityPool,
  getLpRatio,
  getLpRatioBefore,
  previewRedeem,
  removeOpenInterestFromLiquidityPool,
} from "./liquidity-pool";

export function getTrader(id: string): Trader {
  let trader = Trader.load(id);

  if (trader == null) {
    trader = new Trader(id);
    trader.save();
  }

  return trader as Trader;
}

export function getPosition(id: string): Position {
  let position = Position.load(id);

  if (position == null) {
    position = new Position(id);
  }

  return position as Position;
}

export function getTradePair(id: string): TradePair {
  let tradePair = TradePair.load(id);

  if (tradePair == null) {
    tradePair = new TradePair(id);
    tradePair.longCollateral = BigInt.fromI32(0);
    tradePair.shortCollateral = BigInt.fromI32(0);
    tradePair.longShares = BigInt.fromI32(0);
    tradePair.shortShares = BigInt.fromI32(0);
    tradePair.longPositionCount = BigInt.fromI32(0);
    tradePair.shortPositionCount = BigInt.fromI32(0);
  }

  return tradePair as TradePair;
}

export function getProtocol(id: string): Protocol {
  let protocol = Protocol.load(id);

  if (protocol == null) {
    protocol = new Protocol(id);
    protocol.totalShares = BigInt.fromI32(0);
  }

  protocol.save();
  return protocol as Protocol;
}

export function addStatsToTradePair(
  tradePairId: string,
  collateral: BigInt,
  shares: BigInt,
  isLong: boolean
): void {
  let tradePair = getTradePair(tradePairId);

  // Is position opened or closed?
  let countDirection = collateral.gt(BigInt.fromI32(0))
    ? BigInt.fromI32(1)
    : BigInt.fromI32(-1);

  if (isLong) {
    tradePair.longCollateral = tradePair.longCollateral.plus(collateral);
    tradePair.longShares = tradePair.longShares.plus(shares);
    tradePair.longPositionCount = tradePair.longPositionCount.plus(
      countDirection
    );
  } else {
    tradePair.shortCollateral = tradePair.shortCollateral.plus(collateral);
    tradePair.shortShares = tradePair.shortShares.plus(shares);
    tradePair.shortPositionCount = tradePair.shortPositionCount.plus(
      countDirection
    );
  }
  tradePair.save();
}

export function handlePositionOpened(event: PositionOpenedEvent): void {
  log.info("handlePositionOpened", []);

  let position = getPosition(event.params.positionId.toString());

  position.trader = getTrader(event.params.trader.toHex()).id;
  position.collateral = event.params.collateral;
  position.shares = event.params.shares;
  position.openLpRatio = event.params.shares.div(event.params.collateral);
  position.leverage = event.params.leverage;
  position.isLong = event.params.isLong;
  position.entryPrice = event.params.entryPrice;
  position.liquidationPrice = event.params.liquidationPrice;
  position.takeProfitPrice = event.params.takeProfitPrice;
  position.minClosePrice = position.isLong
    ? position.liquidationPrice
    : position.takeProfitPrice;
  position.maxClosePrice = position.isLong
    ? position.takeProfitPrice
    : position.liquidationPrice;
  position.openDate = event.params.openDate;
  position.openTransactionHash = event.transaction.hash;
  position.isOpen = true;

  position.save();

  addStatsToTradePair(
    event.address.toHex(),
    event.params.collateral,
    event.params.shares,
    event.params.isLong
  );
}

export function handlePositionClosed(event: PositionClosedEvent): void {
  // Gets fired after shares got minted or burned, so lp price is accurate
  let position = getPosition(event.params.positionId.toString());
  let tradePair = getTradePair(event.address.toHex());

  position.closePrice = event.params.closePrice;
  position.closeDate = event.params.closeDate;
  position.closeLpRatio = getLpRatio(tradePair.liquidityPool);
  position.closeLpRatioBefore = getLpRatioBefore(
    tradePair.liquidityPool,
    event.params.pnlShares
  );

  position.pnlShares = event.params.pnlShares;
  let payoutShares = position.shares.plus(event.params.pnlShares);
  log.info("1", []);
  let payoutAssets = previewRedeem(tradePair.liquidityPool, payoutShares);
  log.info("payoutAssets {}", [payoutAssets.toString()]);
  let pnlAssets = payoutAssets.minus(position.collateral);
  position.pnlSharesPercentage = event.params.pnlShares
    .toBigDecimal()
    .times(BigDecimal.fromString("100"))
    .div(position.shares.toBigDecimal());

  position.pnlAssetsPercentage = pnlAssets
    .toBigDecimal()
    .times(BigDecimal.fromString("100"))
    .div(position.collateral.toBigDecimal());

  position.payoutShares = payoutShares;
  position.payoutAssets = payoutAssets;
  position.pnlAssets = pnlAssets;

  position.closeTransactionHash = event.transaction.hash;
  position.isOpen = false;
  position.save();

  addStatsToTradePair(
    event.address.toHex(),
    position.collateral.neg(),
    position.shares.neg(),
    position.isLong
  );

  removeOpenInterestFromLiquidityPool(tradePair.liquidityPool, position.shares);
}

export function handleProtocolSet(event: ProtocolSetEvent): void {
  let protocol = getProtocol(event.params.protocol.toHex());
  let tradePair = getTradePair(event.address.toHex());
  tradePair.protocol = protocol.id;
  tradePair.save();
}

export function handleLiquidityPoolSet(event: LiquidityPoolSetEvent): void {
  let liquidityPool = getLiquidityPool(event.params.liquidityPool.toHex());
  let tradePair = getTradePair(event.address.toHex());
  tradePair.liquidityPool = liquidityPool.id;
  tradePair.save();
}

export function handleProtocolShareTaken(event: ProtocolShareTakenEvent): void {
  let protocol = getProtocol(event.address.toHex());
  protocol.totalShares = protocol.totalShares.plus(event.params.protocolShare);

  protocol.save();
}
