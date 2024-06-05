"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type SubstrateContext = {
  isConnected: boolean;
  handleConnect: any;
  disconnectWallet: any;
};

const SubstrateContext = createContext<SubstrateContext>({
  isConnected: false,
  handleConnect: async () => {}, // Dummy function for handleConnect
  disconnectWallet: () => {}, // Dummy function for disconnectWallet
});

export function useSubstrateContext() {
  return useContext(SubstrateContext);
}

export interface SubstrateProps {
  children?: React.ReactNode;
}

export default function SubstrateContextProvider({ children }: SubstrateProps) {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleConnect = async () => {
    setIsConnected(true);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
  };

  return (
    <SubstrateContext.Provider
      value={{
        isConnected,

        handleConnect,
        disconnectWallet,
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
}
