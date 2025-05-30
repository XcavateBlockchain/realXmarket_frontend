'use client';

import { IProperty, ListingDetails, STATE_STATUS } from '@/types';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { buyNft } from '@/lib/extrinsic';
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NumericFormat, OnValueChange } from 'react-number-format';
import { formatNumber, formatPrice } from '@/lib/utils';
import { getCookieStorage } from '@/lib/cookie-storage';
import { toast } from 'sonner';
import { formatDate } from '@polkadot/util';
import AssetSwitcher from '@/components/asset-switcher';
import { NodeContext } from '@/context';
import { getAssetBalances } from '@/lib/formaters';
import { useWalletContext } from '@/context/wallet-context';
import usePaymentAsset from '@/hooks/use-payment-asset';

type AmountProps = {
  amount: number;
  tokens: any;
  fileUrls: string[];
  data: ListingDetails;
  property: IProperty;
  close: () => void;
  setIndex: Dispatch<SetStateAction<number>>;
  setAmount: Dispatch<SetStateAction<number>>;
};

function SelectAmount({
  fileUrls,
  amount,
  setIndex,
  data,
  close,
  tokens,
  property,
  setAmount
}: AmountProps) {
  const { api } = useContext(NodeContext);
  const { asset, selectedAccount } = useWalletContext();
  const address = selectedAccount?.[0]?.address;
  const [balance, setBalance] = useState<any | null>(null);

  const handleAmountChange: OnValueChange = ({ value }) =>
    setAmount(parseInt(value.replace(/,/g, '')));
  const totalPrice = 1.5 * property.price_per_token;

  useEffect(() => {
    if (address) {
      getAssetBalances(address, api).then(balance => {
        if (balance) {
          setBalance(balance);
        }
      });
    }
  }, [setBalance, api]);
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">Buy Tokens</h1>
        <Button variant={'text'} size={'icon'} onClick={close}>
          <Icons.close className="size-6" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Image
          src={fileUrls[0]}
          alt={property.property_name}
          width={100}
          height={100}
          className=" size-[100px] object-cover"
          priority
        />
        <div className="flex flex-col gap-2 text-[#4E4E4E]/[0.50]">
          <p className="text-[0.875rem]/[1.5rem]">Gade Homes</p>
          <h1 className="font-mona text-[1rem]/[1.5rem] font-medium text-foreground">
            {property.property_name}
          </h1>
          <div className="flex items-center gap-1">
            <Image
              src={'/icons/pin_location.svg'}
              alt="loc"
              width={24}
              height={24}
              className="pointer-events-none"
            />
            <h3 className="font-sans  text-[0.875rem]/[1.5rem]">
              {property.address_street} {property.address_town_city}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between  font-mona text-[1rem]/[1.5rem] font-medium">
        <span>Price per Token</span>
        <span>{formatPrice(property.price_per_token)}</span>
      </div>

      <div className="flex w-full flex-col gap-2 rounded bg-[#4E4E4E]/[0.06] p-2 font-sans text-[0.875rem]/[1.5rem]">
        <div className="flex items-center justify-between">
          <span>Pay with:</span>
          <AssetSwitcher />
        </div>
        <div className="flex items-center justify-between">
          <span>Balance</span>
          <span>{balance?.[asset] || '0'}</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="flex justify-between text-[0.875rem]/[1.5rem]">
          <span>Tokens left:</span>{' '}
          <span className="font-sans text-[#78B36E]">
            {tokens} of {data.tokenAmount}
          </span>
        </div>
        <div className="space-y-10">
          <div className="flex w-full items-center justify-between rounded border border-[#4E4E4E]/[0.50] bg-white p-4">
            <NumericFormat
              value={amount}
              className="w-full bg-transparent text-[1.875rem]/[2.5rem] font-bold outline-none placeholder:text-[#4E4E4E]/[0.50]"
              placeholder="0"
              thousandSeparator=","
              allowNegative={false}
              max={property.number_of_tokens}
              onValueChange={handleAmountChange}
            />
            <button
              className="rounded-md p-2 font-sans text-[1rem]/[1.5rem] text-[#ECB278] transition-colors duration-300 hover:bg-primary-200/90 hover:text-white"
              onClick={() => setAmount(tokens)}
            >
              MAX
            </button>
          </div>

          {amount > 0 ? (
            <div className="flex justify-between text-[0.875rem]/[1.5rem]">
              <span className="text-[#4E4E4E]/[0.50]">To buy:</span>{' '}
              <span className="font-sans text-[#DC7DA6]">
                {formatNumber(amount * totalPrice)} USDT
              </span>
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant={'outline'}
              size={'md'}
              className="w-[96px] px-7 py-2 font-sans text-[0.875rem]/[1.5rem] font-bold"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              size={'md'}
              type="submit"
              onClick={() => setIndex(2)}
              className="w-[96px] px-7 py-2 font-sans text-[0.875rem]/[1.5rem] font-bold text-white disabled:opacity-90"
              disabled={amount === 0}
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

type SummaryProps = {
  amount: number;
  fileUrls: string[];
  data: ListingDetails;
  property: IProperty;
  listingId: number;
  close: () => void;
  setIndex: Dispatch<SetStateAction<number>>;
};

function PurchaseSummary({
  listingId,
  fileUrls,
  close,
  data,
  amount,
  property,
  setIndex
}: SummaryProps) {
  const router = useRouter();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const { asset } = useWalletContext();
  const { asset: paymentAsset } = usePaymentAsset(asset);

  async function onSubmit() {
    setStatus(STATE_STATUS.LOADING);
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
      await buyNft(address, listingId, amount, Number(paymentAsset.id));
      setIndex(3);
      router.refresh();
    } catch (error: any) {
      setIndex(1);
      setStatus(STATE_STATUS.ERROR);
      toast.error(error?.error ? error?.error?.message : error?.message);
    } finally {
      setStatus(STATE_STATUS.SUCCESS);
    }
  }

  const totalPrice = 1.3 * property.price_per_token;
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1>Confirm purchase</h1>
        <Button variant={'text'} size={'icon'} onClick={close}>
          <Icons.close className="size-6" />
        </Button>
      </div>
      <div className="flex flex-col items-start gap-6 rounded bg-foreground/[0.06] px-2 py-4">
        <div className="flex items-center gap-4">
          <Image
            src={fileUrls[0]}
            alt={property.property_name}
            width={100}
            height={100}
            className=" size-[100px] object-cover"
            priority
          />
          <div className="flex flex-col gap-2 text-[#4E4E4E]/[0.50]">
            <p className="text-[0.875rem]/[1.5rem]">Gade Homes</p>
            <h1 className="font-mona text-[1rem]/[1.5rem] font-medium text-foreground">
              {property.property_name}
            </h1>
            <div className="flex items-center gap-1">
              <Image
                src={'/icons/pin_location.svg'}
                alt="loc"
                width={24}
                height={24}
                className="pointer-events-none"
              />
              <h3 className="font-sans  text-[0.875rem]/[1.5rem]">
                {property.address_street} {property.address_town_city}
              </h3>
            </div>
          </div>
        </div>
        <dl className="flex w-full flex-col items-start gap-4">
          <ItemList title="Token price" value={formatPrice(property.price_per_token)} />
          <ItemList title="To buy" value={`${amount} Tokens`} />
          <ItemList title="To pay" value={`${formatNumber(amount * totalPrice)} USDT`} />
          <ItemList title="Order No." value={'183421176753467564908654765'} />
          <ItemList title="Order time." value={formatDate(new Date())} />
        </dl>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant={'outline'}
          size={'md'}
          className="w-[96px] px-7 py-2 font-sans text-[0.875rem]/[1.5rem] font-bold"
          onClick={() => setIndex(1)}
        >
          Back
        </Button>
        <Button
          size={'md'}
          className="px-7 py-2 font-sans text-[0.875rem]/[1.5rem] font-bold text-white disabled:opacity-90"
          type="submit"
          onClick={onSubmit}
          disabled={status === STATE_STATUS.LOADING}
        >
          Pay
        </Button>
      </div>
    </>
  );
}

function SuccessModal({ close }: { close: () => void }) {
  return (
    <>
      <div className="flex flex-col items-center space-y-4 p-4 py-1 md:p-5">
        <div className="mb-3 h-28 w-28 overflow-hidden rounded-full bg-white/[0.86]">
          <Image
            src={'/icons/tick.svg'}
            alt="success"
            width={112}
            height={112}
            priority
            className=" pointer-events-none rounded-full"
          />
        </div>
        <h1 className="text-center text-xl font-bold text-black">Successful</h1>
        <p className="text-center">
          Congratulations! Your NFT purchase was successful. You now own a fraction of Plot -
          Plea Wharf. Please note it might take a few minutes to reflect in your profile.
        </p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant={'outline'} onClick={close}>
          Back
        </Button>
        <Button asChild>
          <Link href="/profile/portfolio">Portfolio</Link>
        </Button>
      </div>
    </>
  );
}

interface FetchedProperty {
  [key: string]: any;
}

interface ISection {
  [key: number]: ReactNode;
}

export default function BuyToken({
  listingId,
  tokens,
  property,
  fileUrls,
  data,
  totalTokensOwned
}: {
  listingId: number;
  tokens: any;
  fileUrls: string[];
  property: IProperty;
  data: ListingDetails;
  totalTokensOwned: any;
}) {
  const router = useRouter();
  const [openDialog, setIsDialogOpen] = useState(false);
  const [index, setIndex] = useState(1);
  const [amount, setAmount] = useState(0);

  function closeModal() {
    setIndex(1);
    setAmount(0);
    router.refresh();
    setIsDialogOpen(false);
  }

  const actions: ISection = {
    1: (
      <SelectAmount
        fileUrls={fileUrls}
        setAmount={setAmount}
        data={data}
        amount={amount}
        tokens={tokens}
        property={property}
        close={closeModal}
        setIndex={setIndex}
      />
    ),
    2: (
      <PurchaseSummary
        fileUrls={fileUrls}
        data={data}
        close={closeModal}
        amount={amount}
        property={property}
        setIndex={setIndex}
        listingId={listingId}
      />
    ),
    3: <SuccessModal close={closeModal} />
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button className="h-[48px] w-[153px] px-[55px] py-3">
          {totalTokensOwned ? 'BUY MORE' : 'BUY'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex max-w-[518px] flex-col gap-6 p-6">
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle>Buy token</AlertDialogTitle>
          <AlertDialogDescription>Buy listed token</AlertDialogDescription>
        </AlertDialogHeader>
        {actions[index]}
      </AlertDialogContent>
    </AlertDialog>
  );
}

const ItemList = ({ title, value }: { title: string; value: string }) => (
  <div className="flex w-full items-center justify-between font-sans text-[0.875rem]/[1.5rem]">
    <dt>{title}</dt>
    <dd>{value}</dd>
  </div>
);
