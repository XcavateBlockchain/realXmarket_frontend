'use client';

import React, { useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletContextProvider } from '@/providers/wallet-provider';
import { useRouter } from 'next/navigation';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { WalletContextInterface } from '@/context/wallet-context';

type TProps = {
  children: React.ReactNode;
};

export interface NodeContextInterface {
  nativeCurrency: string;
  subscanUrl: string;
  api: ApiPromise | null;
}

export function WalletProvider({ children }: TProps) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}

export const NodeContext = React.createContext<NodeContextInterface>({
  nativeCurrency: '',
  subscanUrl: '',
  api: null
});

export function useNodeContext() {
  return useContext(NodeContext);
}

export function NodeSocketProvider({ children }: TProps) {
  const [api, setApi] = React.useState<ApiPromise | null>(null);
  const [nativeCurrency, setNativeCurrency] = React.useState<string>('');
  const [subscanUrl, setSubscanUrl] = React.useState<string>('');
  const connect = async () => {
    const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_RPC_URL!);

    const api = await ApiPromise.create({
      provider: wsProvider
    });

    setApi(api);
    setNativeCurrency(api.registry.chainTokens[0]);
    if (api.registry.chainTokens[0] === 'SBY') {
      setSubscanUrl('https://shibuya.subscan.io/');
    } else if (api.registry.chainTokens[0] === 'ASTR') {
      setSubscanUrl('https://astar.subscan.io/');
    } else {
      setSubscanUrl('https://subscan.io/');
    }

    console.log('Connected to node: ' + process.env.NEXT_PUBLIC_RPC_URL);
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RPC_URL) {
      console.error('Node wss:// URL is not set.');
      return;
    }

    connect();
  }, []);

  // 3. Initialize your new QueryClient
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NodeContext.Provider value={{ nativeCurrency, subscanUrl, api }}>
        {children}
      </NodeContext.Provider>
    </QueryClientProvider>
  );
}
