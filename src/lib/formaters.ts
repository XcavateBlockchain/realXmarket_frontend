import { formatBalance } from '@polkadot/util';
import { ApiPromise } from '@polkadot/api';

export const getPercentageDiff = (value: number) => {
  const isPositive = value > 0;
  let prefix = isPositive ? '+' : '';
  let suffix = '%';
  return `${prefix}${value} ${suffix}`;
};

export const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.toLocaleLowerCase().slice(1);
};

export const formatPercentage = (value?: number | string): number => {
  if (!value) {
    return 0;
  }
  return value ? +value / 100 : 0;
};

export const abbriviateNumber = (number: number, fraction = 2, shortFormat = true): string => {
  let defaultOptions = {
    maximumFractionDigits: fraction
  };

  const shortFormatOptions = {
    notation: 'compact',
    compactDisplay: 'short'
  };

  if (shortFormat) {
    defaultOptions = { ...defaultOptions, ...shortFormatOptions };
  }

  // @ts-ignore
  return number.toLocaleString('en-US', { ...defaultOptions });
};

export const formatAddress = (
  text?: string,
  startChars: number = 4,
  endChars: number = 4,
  maxLength: number = 12
): string => {
  if (!text) {
    return '';
  }
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + '.';
    }
    return start + end;
  }
  return text;
};

export const formatIpfsLink = (ipfsHash: string): string => {
  return `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}${ipfsHash}`;
};

export const getFormattedBalance = async (
  address: string,
  api?: ApiPromise | null
): Promise<string> => {
  if (!api) {
    return '';
  }
  await api.isReady;

  //@ts-ignore
  const { data: balance } = await api.query.system.account(address);

  const chainDecimals = api.registry.chainDecimals[0];
  formatBalance.setDefaults({ unit: api.registry.chainTokens[0] });

  return formatBalance(balance.free, {
    withSiFull: false,
    withZero: false,
    decimals: chainDecimals
  }).replace(/\.(\d{2})\d+/g, '.$1');
};

export const getAssetBalances = async (
  address: string,
  api?: ApiPromise | null
): Promise<
  | {
      usdc?: string;
      usdt?: string;
    }
  | string
> => {
  if (!api) {
    return '';
  }
  await api.isReady;

  //@ts-ignore
  const { data: balance } = await api.query.system.account(address);

  const chainDecimals = api.registry.chainDecimals[0];
  formatBalance.setDefaults({ unit: api.registry.chainTokens[0] });

  const balanceUSDT: any = (
    await api.query.assets.account(process.env.NEXT_PUBLIC_USDT_PAYMENT_TOKEN, address)
  ).toHuman();

  const balanceUSDC: any = (
    await api.query.assets.account(process.env.NEXT_PUBLIC_USDC_PAYMENT_TOKEN, address)
  ).toHuman();

  const coreBalace = formatBalance(balance.free, {
    withSiFull: false,
    withZero: false,
    decimals: chainDecimals
  }).replace(/\.(\d{2})\d+/g, '.$1');

  return {
    usdc: balanceUSDC?.balance!,
    usdt: balanceUSDT?.balance
  };
};

export function convertEstimate(estimate: any) {
  // Constants
  const PLANCKS_PER_DOT = 10_000_000_000; // 1 DOT = 10^10 plancks
  const BLOCK_TIME_SECONDS = 6; // typical Polkadot block time
  const MAX_REF_TIME = 1_000_000_000; // max refTime per block

  // Convert fee from plancks to DOT
  const feePlancks = BigInt(estimate.partialFee);
  const feeDOT = Number(feePlancks) / PLANCKS_PER_DOT;

  // Convert refTime to seconds (approximate)
  const refTime = BigInt(estimate.weight.refTime);
  const refTimeSeconds = Number(refTime) * (BLOCK_TIME_SECONDS / MAX_REF_TIME);

  return {
    feeDOT,
    refTimeSeconds
  };
}
