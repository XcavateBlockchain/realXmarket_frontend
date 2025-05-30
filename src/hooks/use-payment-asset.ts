export const paymentAsset = {
  usdc: {
    id: process.env.NEXT_PUBLIC_USDC_PAYMENT_TOKEN as string,
    name: 'usdc',
    symbol: 'USDC',
    icon: 'USDC'
  },
  usdt: {
    id: process.env.NEXT_PUBLIC_USDT_PAYMENT_TOKEN as string,
    name: 'usdt',
    symbol: 'USDT',
    icon: 'USDT'
  }
};

const usePaymentAsset = (asset: keyof typeof paymentAsset) => {
  const getAsset = paymentAsset[asset];

  return { asset: getAsset };
};

export default usePaymentAsset;
