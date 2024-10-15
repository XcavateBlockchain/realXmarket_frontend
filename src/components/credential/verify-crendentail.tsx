import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { AccountTypeButton } from '../utility-button';
import { Icons } from '../icons';
import { useWalletContext } from '@/context/wallet-context';
import { profiles } from '@/config/profiles';
import { setCookieStorage } from '@/lib/cookie-storage';

interface ISection {
  [key: number]: ReactNode;
}

export default function VerifyCredential() {
  const [index, setIndex] = useState(1);
  const { setShowCredentialDialog } = useWalletContext();

  function closeDialog() {
    setShowCredentialDialog(false);
  }

  const actions: ISection = {
    1: <SelectUserType setIndex={setIndex} close={closeDialog} />,
    2: <ConnectCredential setIndex={setIndex} close={closeDialog} />,
    3: <SuccessConnectedCredential setIndex={setIndex} close={closeDialog} />,
    4: <CredentialNotFound />
  };

  return (
    <AlertDialogContent className="w-[518px] gap-6 rounded-lg">
      {actions[index]}
    </AlertDialogContent>
  );
}

interface DialogProps {
  setIndex: Dispatch<SetStateAction<number>>;
  close: () => void;
}

function SelectUserType({ setIndex, close }: DialogProps) {
  const { selectedAccount, onSelectInvestorType } = useWalletContext();
  const address = selectedAccount?.[0]?.address;

  const profile = address ? profiles[address] : null;
  const handleSelect = (type: 'developer' | 'investor' | 'agent') => {
    if (!profile) {
      onSelectInvestorType(type);
      setIndex(4);
    } else {
      onSelectInvestorType(type);
      setIndex(2);
    }
  };
  return (
    <>
      <header className="flex w-full flex-col items-start gap-2 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-primary-foreground">
            Who are you?
          </h1>
          <Button variant={'text'} size={'icon'} onClick={close}>
            <Icons.close className="size-6" />
          </Button>
        </div>
        <p className="text-[0.875rem]/[1.5rem]">
          You need to connect a wallet to complete transactions
        </p>
      </header>
      <div className="grid grid-cols-2 gap-4 p-6">
        <AccountTypeButton
          variant={'developer'}
          account="developer"
          icon="/icons/developer.svg"
          onClick={() => handleSelect('developer')}
        />
        <AccountTypeButton
          variant={'investor'}
          account="investor"
          icon="/icons/investor.svg"
          onClick={() => handleSelect('investor')}
        />
        <AccountTypeButton
          variant={'agent'}
          account="agent"
          icon="/icons/letting_agent.svg"
          onClick={() => handleSelect('agent')}
        />
        <AccountTypeButton
          variant={'lawyer'}
          account="lawyer"
          icon="/icons/loan_evaluator.svg"
          disabled={true}
        />
      </div>
    </>
  );
}

function ConnectCredential({ setIndex, close }: DialogProps) {
  return (
    <>
      <div className="inline-flex w-full flex-col items-center justify-center gap-6 p-4">
        <div className="size-[100px] items-center justify-center rounded-full border border-primary">
          <Image src={'/icons/verify_your_identity.svg'} alt="" width={100} height={100} />
        </div>

        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">
            Verify Your company KYC Credential
          </h1>
          <span className="text-[0.875rem]/[1.5rem]">
            To interact with Xcavate you would need to have gone through all the necessary
            regulatory checks
          </span>
        </div>
        <div className="flex w-full items-center gap-2 rounded-lg border border-primary-foreground px-4 py-2">
          <div className="size-10 rounded-full border border-primary">
            <Image src={'/icons/verify_your_identity.svg'} alt="" width={40} height={40} />
          </div>
          <span className="font-mona text-[1.125rem]/[1.5rem]">Connect credentials</span>
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 px-6 pb-6">
        <Button variant={'outline'} size={'md'} onClick={close}>
          cancel
        </Button>
        <Button
          size={'md'}
          className="text-white"
          onClick={() => {
            setIndex(3);
            setCookieStorage('isWhiteListed', 'true');
          }}
        >
          CONNECT
        </Button>
      </div>
    </>
  );
}
function SuccessConnectedCredential({ close }: DialogProps) {
  const { setShowCredentialDialog } = useWalletContext();
  return (
    <>
      <div className="inline-flex w-full flex-col items-center justify-center gap-6 p-4">
        <div className="size-[100px] items-center justify-center rounded-full border border-primary">
          <Image src={'/icons/tick.svg'} alt="" width={100} height={100} />
        </div>

        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">Verified</h1>
          <span className="text-[0.875rem]/[1.5rem]">
            You have successfully completed all the necessary regulatory checks. You can now
            interact with Xcavate without any restrictions.
          </span>
        </div>
        <div className="flex w-full items-center gap-2 rounded-lg border border-primary-foreground px-4 py-2">
          <div className="size-10 rounded-full border border-primary">
            <Image src={'/icons/verify_your_identity.svg'} alt="" width={40} height={40} />
          </div>
          <span className="font-mona text-[1.125rem]/[1.5rem]">Connected</span>
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 px-6 pb-6">
        <Button size={'md'} className="text-white" onClick={() => setShowCredentialDialog()}>
          continue
        </Button>
      </div>
    </>
  );
}

function CredentialNotFound() {
  const { setShowCredentialDialog } = useWalletContext();

  return (
    <>
      <div className="inline-flex w-full flex-col items-center justify-center gap-6 p-4">
        <div className="size-[100px] items-center justify-center rounded-full border border-primary">
          <Image src={'/icons/exclamation.svg'} alt="" width={100} height={100} />
        </div>

        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">
            Credential wallet not detected
          </h1>
          <span className="text-[0.875rem]/[1.5rem]">
            Please connect your credential wallet to verify your eligibility before gaining
            full access to our platform.
          </span>
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 px-6 pb-6">
        <Button
          size={'md'}
          className="text-white"
          onClick={() => setShowCredentialDialog(false)}
        >
          GET STARTED
        </Button>
      </div>
    </>
  );
}
