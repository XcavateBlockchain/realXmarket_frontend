import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hexDecode = (hexString: string) => {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2);
  }
  let result = '';
  for (let i = 0; i < hexString.length; i += 2) {
    const hexCode = hexString.substr(i, 2);
    const charCode = parseInt(hexCode, 16);
    result += String.fromCharCode(charCode);
  }
  return result;
};

export function formatAddress(address: string, charLength = 4) {
  if (!address) return '';
  const prefix = address.substring(0, charLength); // Take first 6 characters
  const suffix = address.substring(address.length - charLength); // Take last 4 characters
  return `${prefix}...${suffix}`; // Combine with ellipsis in the middle
}

// // Example usage
// const decodedString = hexDecode('0x48656c6c6f20576f726c64');
// console.log(decodedString); // Outputs: Hello World

export function formatNumber(number: number | string, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-UK', {
    style: options.style ?? 'decimal',
    notation: options.notation ?? 'standard',
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
    ...options
  }).format(Number(number));
}

export function formatPrice(price: number | string, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: options.currency ?? 'GBP',
    notation: options.notation ?? 'standard',
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
    ...options
  }).format(Number(price));
}

export function hexToString(hex: string): string {
  if (hex.startsWith('0x')) {
    hex = hex.slice(2);
  }

  // Convert hex string to bytes
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }

  // Convert bytes to UTF-8 string
  try {
    return new TextDecoder('utf-8').decode(new Uint8Array(bytes));
  } catch (error) {
    // Fallback to the old method if UTF-8 decoding fails
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }
}

export function formatAPY(rental_income: number, price: number) {
  const ARI = rental_income * 12;
  const APY = ARI / price;
  const prefix = APY * 100;
  return `${Number(prefix.toFixed(2))}%`;
}

export function priceRangeFormat(price: number) {
  const percentage = 0.05; // 5% as a decimal
  const percentageIncrease = price * (1 + percentage);
  const percentageDecrease = price * (1 - percentage);
  // const totalIncrease = percentageIncrease + percentageDecrease;
  return {
    percentageIncrease,
    percentageDecrease,
    percentage: Number((price * 100) / percentageIncrease)
  };
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function convertBlocksToTime(blockCount: number, blockTimeSeconds: number = 6): string {
  const totalSeconds = blockCount * blockTimeSeconds;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}

export function calcCurvePercent(currentLiquidity: number, targetLiquidity: number): number {
  return Number((currentLiquidity * 100) / targetLiquidity);
}

export function blocksLeftToTime(
  currentBlock: number,
  targetBlock: number,
  blockTimeSeconds: number = 6
): string {
  // remaining blocks
  const remainingBlocks = Math.max(targetBlock - currentBlock, 0);
  const totalSeconds = remainingBlocks * blockTimeSeconds;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}
