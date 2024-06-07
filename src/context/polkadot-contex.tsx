'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type SubstrateContext = {
  isConnected: boolean;
  userType: any;
  onSelectUserType: any;
  handleConnect: any;
  disconnectWallet: any;
};

const SubstrateContext = createContext<SubstrateContext>({
  isConnected: false,
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
  // const router = useRouter();
  const [userType, setUserType] = useState<'developer' | 'investor' | 'agent'>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleConnect = async () => {
    setIsConnected(true);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
  };

  const onSelectUserType = (type: 'developer' | 'investor' | 'agent') => {
    setUserType(type);
  };

  return (
    <SubstrateContext.Provider
      value={{
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
