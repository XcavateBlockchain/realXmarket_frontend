import Keyring from '@polkadot/keyring';
import { mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';

export interface WalletInfo {
  address: string;
  seed: string;
}

/**
 * Generates a new Polkadot wallet with address and seed phrase
 * @returns Object containing the wallet address and seed phrase
 */
export async function generateWallet(): Promise<WalletInfo> {
  // Wait for crypto to be ready
  await cryptoWaitReady();

  const keyring = new Keyring({ type: 'sr25519' });

  // Generate a new mnemonic (seed phrase)
  const mnemonic = mnemonicGenerate();

  // Create account from mnemonic
  const account = keyring.addFromMnemonic(mnemonic);

  return {
    address: account.address,
    seed: mnemonic
  };
}

/**
 * Generates multiple wallets for partners
 * @param count Number of wallets to generate
 * @returns Array of wallet information
 */
export async function generateMultipleWallets(count: number): Promise<WalletInfo[]> {
  const wallets: WalletInfo[] = [];

  for (let i = 0; i < count; i++) {
    wallets.push(await generateWallet());
  }

  return wallets;
}

/**
 * Generates wallets for all partners in the white-list
 * @returns Object mapping partner names to their wallet information
 */
export async function generatePartnerWallets() {
  const { developers } = require('../config/white-list');

  const partnerWallets: Record<string, WalletInfo> = {};

  for (const developer of developers) {
    for (const partner of developer.partners) {
      const wallet = await generateWallet();
      partnerWallets[partner.name] = wallet;
    }
  }

  return partnerWallets;
}
