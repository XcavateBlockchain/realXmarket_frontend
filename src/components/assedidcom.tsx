// 'use client';

// import { useState, useEffect } from 'react';
// import { ApiPromise, WsProvider } from '@polkadot/api';
// import type { Signer } from '@polkadot/types/types';

// // These imports are now safe because they will only be executed in the browser.
// import { AssetDidCommClient } from 'assetdidcomm';
// import { DidManager } from 'assetdidcomm';
// import { KiltDidResolver } from 'assetdidcomm';
// import { ApiStorageAdapter } from 'assetdidcomm';
// import { generateX25519Keypair, encryptKeyWithPassword, decryptKeyWithPassword } from "assetdidcomm"

// export default function Assedidcom() {

// const { publicKeyJwk, privateKeyJwk } = generateX25519Keypair();

// const encryptedKey = await encryptKeyWithPassword(privateKeyJwk, process.env.PASSWORD!);

// const  config = {
//     rpcEndpoint: process.env.NEXT_PUBLIC_RPC_URL,
//     didResolver: new KiltDidResolver(),
//     address: process.env.NEXT_PUBLIC_ADDRESS,
//     signer: new Signer,
//     userPrivateKeyJwk: process.env.NEXT_PUBLIC_PRIVATE_KEY
// }
//     const didcom = new AssetDidCommClient();

//     return (
//         <div>
//             <h1>Assedidcom</h1>
//         </div>
//     )
// }
