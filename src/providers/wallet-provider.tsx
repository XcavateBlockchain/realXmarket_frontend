// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getWalletBySource } from '@/components/wallet/wallets';
import { Wallet, WalletAccount } from '@/types';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
  OpenSelectWallet,
  WalletContext,
  WalletContextInterface
} from '@/context/wallet-context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatAddress, getFormattedBalance } from '@/lib/formaters';
import { NodeContext } from '@/context';
import { AlertDialog } from '@/components/ui/alert-dialog';
import VerifyCredential from '@/components/credential/verify-crendentail';
import { deleteCookieItem, getCookieStorage, setCookieStorage } from '@/lib/cookie-storage';

interface Props {
  children: React.ReactNode;
}

export function WalletContextProvider({ children }: Props) {
  const router = useRouter();
  const { api } = useContext(NodeContext);
  // const [, setBalanceSubscription] = useState<any>();
  const initWalletFromLocalStorage = async (walletKey: string) => {
    if (!api || !api.registry.chainSS58) {
      console.log('Node is not connected');
      return;
    }
    console.log('Loading wallet from local storage', walletKey);

    const wallet = await selectWallet(getWalletBySource(walletKey)!);
    const accountKey = localStorage.getItem('acc-key');
    if (accountKey) {
      console.log('Loading account from local storage', accountKey);
      const account = JSON.parse(accountKey as string);
      const accounts = await wallet?.getAccounts(api.registry.chainSS58);
      const selectedAccount = accounts?.filter(acc => acc.address === account);
      if (selectedAccount?.length) {
        setSelectedAccount(selectedAccount);
        setAccountKey(selectedAccount[0]?.address);
        await axios.post('/api/auth', {
          accountKey: selectedAccount[0]?.address
        });
        setBalance(await getFormattedBalance(selectedAccount[0]?.address, api));
        router.refresh();
      } else {
        toast.error(
          `Account ${formatAddress(account)} is not connected. Try to connect again.`
        );
        disconnectWallet();
        router.refresh();
      }
    }
  };

  const [walletKey, setWalletKey] = useLocalStorage(
    'wallet-key',
    undefined,
    initWalletFromLocalStorage
  );
  const [walletType, setWalletType] = useLocalStorage('wallet-type', 'substrate');
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>();
  const [accountKey, setAccountKey] = useLocalStorage('acc-key', undefined);

  const [isSelectWallet, setIsSelectWallet] = useState(false);
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount[] | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [investorType, setInvestorType] = useState<'developer' | 'investor' | 'agent'>();
  const [showCredentialDialog, setShowCredentialDialog] = useState(false);

  useEffect(() => {
    if (api && api.registry.chainSS58) {
      initWalletFromLocalStorage(walletKey);
    }
  }, [api]);

  const afterSelectWallet = useCallback(
    async (wallet: Wallet) => {
      if (!api || !api.registry.chainSS58) {
        toast.error('Node is not connected');
        return;
      }
      const infos = await wallet.getAccounts(api.registry.chainSS58);

      infos && setAccounts(infos);
    },
    [api]
  );

  // const selectWallet = useCallback(
  //   async (wallet: Wallet) => {
  //     setCurrentWallet(wallet);

  //     await wallet.enable();
  //     setWalletKey(wallet.extensionName);

  //     await afterSelectWallet(wallet);

  //     return wallet;
  //   },
  //   [afterSelectWallet, currentWallet, setWalletKey]
  // );

  const selectWallet = useCallback(
    async (wallet: Wallet) => {
      if (!wallet) {
        toast.error('Wallet is not defined');
        return;
      }

      setCurrentWallet(wallet);

      await wallet.enable();
      setWalletKey(wallet.extensionName);

      await afterSelectWallet(wallet);

      return wallet;
    },
    [afterSelectWallet, currentWallet, setWalletKey]
  );

  const selectAccount = useCallback(
    async (value: string) => {
      if (!api || !api.registry.chainSS58) {
        toast.error('Node is not connected');
        return;
      }
      if (!value) {
        setSelectedAccount(null);
        return;
      }
      const accounts = await currentWallet?.getAccounts(api.registry.chainSS58);
      const selectedAccount = accounts?.filter(acc => acc.address === value);
      if (selectedAccount?.length) {
        setSelectedAccount(selectedAccount);
        setAccountKey(selectedAccount[0]?.address);

        await axios.post('/api/auth', {
          accountKey: selectedAccount[0]?.address
        });
        setBalance(await getFormattedBalance(selectedAccount[0]?.address, api));
        setShowCredentialDialog(true);
        router.refresh();
      }
    },
    [currentWallet, walletKey, api]
  );

  const disconnectWallet = async () => {
    localStorage.removeItem('acc-key');
    localStorage.removeItem('wallet-key');
    localStorage.removeItem('wallet-type');
    deleteCookieItem('accountKey');
    deleteCookieItem('investorType');
    deleteCookieItem('isWhiteListed');
    await axios.post('/api/signOut');
    setCurrentWallet(undefined);
    setAccounts([]);
    setSelectedAccount(null);
    setIsSelectWallet(false);
    setBalance(null);
  };

  const setWallet = (wallet: Wallet | undefined, walletType: 'substrate' | 'evm') => {
    if (walletType === 'substrate') {
      wallet && selectWallet(wallet as Wallet);
    } else {
      console.log('EVM wallet is not supported yet');
    }

    wallet && setWalletType(walletType);
  };

  const onSelectInvestorType = useCallback(
    async (type: 'developer' | 'investor' | 'agent') => {
      setCookieStorage('investorType', type);
      setInvestorType(type);
    },
    [setCookieStorage, setInvestorType]
  );

  useEffect(() => {
    const checkAuth = async () => {
      const isConnected = selectedAccount?.[0]?.address;
      if (isConnected) {
        const userType = await getCookieStorage('investorType');
        const isWhiteListed = await getCookieStorage('isWhiteListed');
        if (!userType || !isWhiteListed) {
          setShowCredentialDialog(true);
        }
      }
    };
    const timeoutId = setTimeout(checkAuth, 100);
    return () => clearTimeout(timeoutId);
  }, [selectAccount, setShowCredentialDialog]);

  const walletContext = {
    wallet: getWalletBySource(walletKey),
    accounts,
    accountKey,
    walletType,
    selectAccount,
    selectedAccount,
    setWallet,
    disconnectWallet,
    setBalance,
    balance,
    investorType,
    onSelectInvestorType,
    showCredentialDialog,
    setShowCredentialDialog
  };

  const selectWalletContext = {
    isOpen: isSelectWallet,
    open: () => {
      setIsSelectWallet(true);
    },
    close: () => {
      setIsSelectWallet(false);
    }
  };

  return (
    <WalletContext.Provider value={walletContext as WalletContextInterface}>
      <OpenSelectWallet.Provider value={selectWalletContext}>
        {children}
        <AlertDialog open={showCredentialDialog} onOpenChange={setShowCredentialDialog}>
          <VerifyCredential />
        </AlertDialog>
      </OpenSelectWallet.Provider>
    </WalletContext.Provider>
  );
}
