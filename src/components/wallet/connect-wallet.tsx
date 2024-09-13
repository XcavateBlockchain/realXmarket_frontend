'use client';

import { useContext, useState } from 'react';
import { Popover } from '@/components/ui/popover';

import { NodeContext } from '@/context';
import { useWalletContext } from '@/context/wallet-context';
import { useScreenSize } from '@/lib/resolutionScreens';
import WalletConnectors from './wallet-connectors';
import { WalletAccount } from './wallet-account';

export default function ConnectWalletButton({ open = false }: { open?: boolean }) {
  const [index, setIndex] = useState(1);
  const { api } = useContext(NodeContext);
  const walletContext = useWalletContext();
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  const screenSize = useScreenSize();

  const [walletModal, showWalletModal] = useState(open);

  return (
    <Popover open={walletModal} onOpenChange={showWalletModal}>
      {selectedAddress ? (
        <WalletAccount
          onConnected={() => {
            showWalletModal(false);
          }}
          onClose={() => {
            showWalletModal(false);
          }}
        />
      ) : (
        <WalletConnectors
          onConnected={() => {
            showWalletModal(false);
          }}
          onClose={() => {
            showWalletModal(false);
          }}
        />
      )}
    </Popover>
  );
}
