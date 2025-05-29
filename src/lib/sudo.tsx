'use server';

import Keyring from '@polkadot/keyring';
import { ApiPromise, HttpProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';

export async function initializeAccount(keyring: Keyring): Promise<KeyringPair> {
  if (!process.env.ENCODED_SEED || !process.env.SUDO_ADDRESS || !process.env.PASSPHRASE) {
    throw new Error('Missing required environment variables');
  }

  const account = keyring.createFromJson({
    encoded: process.env.ENCODED_SEED,
    encoding: {
      content: ['pkcs8', 'sr25519'],
      type: ['scrypt', 'xsalsa20-poly1305'],
      version: '3'
    },
    address: process.env.SUDO_ADDRESS,
    meta: {
      genesisHash: '0x',
      name: 'XCAV-SUDO',
      whenCreated: 1702476542911
    }
  });

  account.unlock(process.env.PASSPHRASE);
  return account;
}

export async function WhiteListExtrinsic(
  address: string
): Promise<{ txHash: string; address: string }> {
  const provider = new HttpProvider(process.env.NEXT_PUBLIC_RPC_HTTP);
  const api = await ApiPromise.create({ provider });

  const keyring = new Keyring({ type: 'sr25519' });
  const account = await initializeAccount(keyring);

  account.unlock(process.env.PASSPHRASE!);
  const extrinsic = api.tx.xcavateWhitelist.addToWhitelist(address);

  //   const signedTx = await extrinsic.signAsync(account);
  //   const txHash = await api.rpc.author.submitExtrinsic(signedTx.toHex());

  const signedTx = await api.tx.sudo.sudo(extrinsic).signAsync(account);
  const txHash = await api.rpc.author.submitExtrinsic(signedTx.toHex());

  console.log(`Transaction submitted! Hash: ${txHash}`);

  return { txHash: txHash.toString(), address: address };
}
