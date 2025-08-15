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
  let str = '';
  if (hex.startsWith('0x')) {
    hex = hex.slice(2);
  }
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
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
