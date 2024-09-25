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
