'use client';
import {
  // AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
  // AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useXcavateContext } from '@/providers/xcavate-provider';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import Spinner from './wallet-loading';

export function WalletModal() {
  const { open, connect, setOpen, qrCodeDataUrl, isLoading } = useXcavateContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (open) {
      connect();
    }
  }, [open]);

  // console.log('qrCodeDataUrl', qrCodeDataUrl);

  return (
    <>
      <AlertDialogContent className="flex min-h-[500px] flex-col items-center justify-center gap-6  px-[51px] py-[50px] sm:max-w-[500px]">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex cursor-pointer rounded-full bg-[#A6A6A6]/[0.20] p-1 hover:bg-[#A6A6A6]/[0.60]"
        >
          <X size={16} />
        </button>
        <AlertDialogHeader className="items-center md:text-center">
          <AlertDialogTitle className="font-mona text-[18px]/[24px] font-semibold text-border">
            Sign in to Xcavate
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[14px]/[100%] font-normal text-border">
            To connect your wallet, complete verification using the Xcavate app. If you already
            have the app, scan the QR code to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="relative flex size-[250px] items-center justify-center rounded-md border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCodeDataUrl!} className="absolute p-1" alt="qr_code" />
          </div>
        )}
        <div className="flex flex-col items-center gap-2">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>Don't have Xcavate app?</p>
          <div className="flex items-center justify-center gap-[19px]">
            <Button
              // variant={'secondary'}
              className="h-[55px] w-[160px] rounded-[10px] bg-transparent p-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/app_store.svg" alt="download_app_store" />
            </Button>
            <Button
              // variant={'secondary'}
              className="h-[55px] w-[160px] rounded-[10px] bg-transparent p-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/play_store.svg" alt="download_play_store" />
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </>
  );
}
