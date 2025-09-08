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

  const balanceUSDT: any = (
    await api.query.assets.account(process.env.NEXT_PUBLIC_USDT_PAYMENT_TOKEN, address)
  ).toHuman();

  const balanceUSDC: any = (
    await api.query.assets.account(process.env.NEXT_PUBLIC_USDC_PAYMENT_TOKEN, address)
  ).toHuman();

  // const asset: any = await api.query.assets.account(1984, address);

  // if (asset.isSome) {
  //   console.log('Balance:', asset.unwrap().balance);

  //   formatBalance.setDefaults({ unit: 'USDT' });
  //   formatBalance.getDefaults();

  //   console.log('FREE_UDT', asset.unwrap().balance.free);

  //   const final = formatBalance(asset.unwrap().balance, {
  //     forceUnit: '',
  //     withSiFull: false,
  //     withZero: false,
  //     decimals: 6
  //   });

  //   // .replace(/\.(\d{2})\d+/g, '.$1');
  //   console.log('FI', final);
  // } else {
  //   console.log('No balance or asset not found');
  // }

  // const metadata: any = await api.query.assets.metadata(assetId);

  // console.log(metadata.toHuman());

  // const usdtAsset = await api.query.assets.account(assetId, address);
  // if (asset.isSome) {
  //   const rawAssetBalance = asset.unwrap().balance.toString(); // Full balance as a string
  //   // Convert rawAssetBalance to a number with 6 decimals
  //   const rawAssetBalanceNum = Number(rawAssetBalance) / 10 ** 6;
  //   console.log('RawBalance (6 decimals):', rawAssetBalanceNum);
  // }

  // Removed unused formatted balance fetch and console logging
  return {
    usdc: balanceUSDC?.balance!,
    usdt: balanceUSDT?.balance
  };
};

// export function convertEstimate(estimate: any) {
//   // Constants
//   const PLANCKS_PER_DOT = 10_000_000_000; // 1 DOT = 10^10 plancks
//   const BLOCK_TIME_SECONDS = 6; // typical Polkadot block time
//   const MAX_REF_TIME = 1_000_000_000; // max refTime per block

//   // Convert fee from plancks to DOT
//   const feePlancks = BigInt(estimate.partialFee);
//   const feeDOT = Number(feePlancks) / PLANCKS_PER_DOT;

//   // Convert refTime to seconds (approximate)
//   const refTime = BigInt(estimate.weight.refTime);
//   const refTimeSeconds = Number(refTime) * (BLOCK_TIME_SECONDS / MAX_REF_TIME);

//   return {
//     feeDOT,
//     refTimeSeconds
//   };
// }

/**
 * Parses a human-readable asset balance (with 6 decimals) to the raw format (as string).
 * @param formattedBalance - The balance as a string or number (e.g., "10.123456")
 * @returns The raw balance as a string (e.g., "10123456")
 */
export function parseAssetBalance(formattedBalance: string | number): string {
  const num = Number(formattedBalance);
  const raw = Math.round(num * 1_000_000);
  return raw.toString();
}

interface IGetFormattedBalance {
  asset?: string;
  address: string;
  api?: ApiPromise | null;
}

export const getFormattedAssetBalance = async ({ ...rest }: IGetFormattedBalance) => {
  const { api, address, asset } = rest;
  if (!api) return '';

  await api.isReady;

  if (asset) {
    const assetAccount: any = await api.query.assets.account(asset, address);
    if (assetAccount.isSome) {
      const foundAsset = assetAccount.unwrap();
      return formatUnits(foundAsset.balance.toString(), 6);
    } else {
      return '0.000000';
    }
  } else {
    const result: any = await api.query.system.account(address);
    return formatUnits(result.data.free);
  }
};

/**
 * Formats a raw asset balance (string, number, or bigint) into a human-readable string,
 *  with a specified number of decimal places (default is 12).
 * @param rawBalance - The raw balance value to be formatted.
 * @returns The formatted balance as a string with the specified number of decimals.
 */
export const formatUnits = (value: string | number | bigint, decimals: number = 12) => {
  if (!value) return '';

  const sanitizeNumericString = (input: string) => input.replace(/[,_\s]/g, '');

  const normalizedValue =
    typeof value === 'string' ? sanitizeNumericString(value) : (value as number | bigint);

  const raw = BigInt(normalizedValue);
  const divisor = 10n ** BigInt(decimals);
  const whole = raw / divisor;
  const fraction = raw % divisor;
  const balance = Number(whole) + Number(fraction) / Number(divisor);
  return balance;
};

export function parseUnits(value: string, decimals: number = 12): bigint {
  const sanitizeNumericString = (input: string) => input.replace(/[,_\s]/g, '');
  const sanitized = sanitizeNumericString(value);

  if (!new RegExp(`^\\d+(\\.\\d{0,${decimals}})?$`).test(sanitized)) {
    throw new Error(`Invalid value format for ${decimals} decimals`);
  }
  const [whole, fraction = ''] = sanitized.split('.');
  const wholeUnits = BigInt(whole) * 10n ** BigInt(decimals);
  // Pad or trim the fraction to the correct number of digits
  const fractionUnits = BigInt((fraction + '0'.repeat(decimals)).slice(0, decimals));
  return wholeUnits + fractionUnits;
}

export function parseValue(amount: string): bigint {
  return parseUnits(amount, 6);
}
