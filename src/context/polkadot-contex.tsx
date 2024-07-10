'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export type SubstrateContext = {
  isConnected: boolean;
  address: string;
  userType: any;
  onSelectUserType: any;
  handleConnect: any;
  disconnectWallet: any;
};

const SubstrateContext = createContext<SubstrateContext>({
  isConnected: false,
  address: "",
  userType: '',
  onSelectUserType: () => {},
  handleConnect: async () => {}, // Dummy function for handleConnect
  disconnectWallet: () => {} // Dummy function for disconnectWallet
});

export function useSubstrateContext() {
  return useContext(SubstrateContext);
}

export interface SubstrateProps {
  children?: React.ReactNode;
}

export default function SubstrateContextProvider({ children }: SubstrateProps) {
  const router = useRouter();
  const [userType, setUserType] = useState<'developer' | 'investor' | 'agent'>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [address, setAddress] = useState<string>('');

  // const handleConnect = async () => {
  //   setIsConnected(true);
  // };

  const handleConnect = async () => {
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
    const extensions = await web3Enable('RealXchange');
    if (extensions.length === 0) {
      toast.error('No Polkadot wallet extensions found!');
      return;
    }

    setIsLoading(true);

    const accounts = await web3Accounts();
    const account = accounts[0].address;

    setAddress(account);
    localStorage.setItem('selectedWalletAddress', account);
    setIsLoading(false);
    setIsConnected(true);
  };

  const disconnectWallet = () => {
    setAddress('');
    localStorage.removeItem('selectedWalletAddress');
    setIsConnected(false);
    router.refresh();
  };

  const onReconnect = async () => {
    const localStorageAddress = localStorage.getItem('selectedWalletAddress');
    if (localStorageAddress) {
      setAddress(localStorageAddress);
      setIsConnected(true);
    }
  };

  useEffect(() => {
    onReconnect();
  }, []);

  // const disconnectWallet = () => {
  //   setIsConnected(false);
  // };

  const onSelectUserType = (type: 'developer' | 'investor' | 'agent') => {
    setUserType(type);
  };

  return (
    <SubstrateContext.Provider
      value={{
        address,
        isConnected,
        userType,
        onSelectUserType,
        handleConnect,
        disconnectWallet
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
}
