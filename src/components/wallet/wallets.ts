// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BaseDotSamaWallet } from '@/config/BaseDotSamaWallet';
import { PREDEFINED_WALLETS } from '@/config/dotsama';
import { Wallet, WalletInfo } from '@/types';

// This file is get idea from https://github.com/TalismanSociety/talisman-connect/blob/master/libs/wallets/src/lib/wallets.ts

const walletList: Wallet[] = [];

// Add more wallet, please sure you call this method before any getWallets or getWalletBySource
export function addWallet(data: WalletInfo) {
  const wallet = new BaseDotSamaWallet(data) as Wallet;

  walletList.push(wallet);
}

// Implement predefined wallets
PREDEFINED_WALLETS.forEach(walletInfo => {
  addWallet(walletInfo);
});

// Get all wallet
export function getWallets(): Wallet[] {
  return walletList;
}

export function getWalletBySource(source: string | unknown): Wallet | undefined {
  return getWallets().find(wallet => {
    return wallet.extensionName === source;
  });
}

export function isWalletInstalled(source: string | unknown): boolean {
  const wallet = getWalletBySource(source);

  return wallet?.installed as boolean;
}

export function web3FromSource() {
  const selectedItem = localStorage.getItem('wallet-key');
  const wallet = getWalletBySource(selectedItem as string);
  const extension = wallet?.extension;
  return extension;
}
