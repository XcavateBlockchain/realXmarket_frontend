// import type { Signer, SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types';
// import type { SignerResult } from '@polkadot/types/types';

// export class AssetFeeSigner implements Signer {
//   constructor(
//     private innerSigner: Signer,
//     private assetId: number
//   ) {}

//   async signPayload(payload: SignerPayloadJSON): Promise<SignerResult> {
//     // Inject the custom `assetId` field into the payload
//     const modifiedPayload = {
//       ...payload,
//       assetId: this.assetId
//     };

//     if (!this.innerSigner.signPayload) {
//       throw new Error('Inner signer does not implement signPayload');
//     }

//     return this.innerSigner.signPayload(modifiedPayload as any); // Type override necessary
//   }

//   // Optional: if you also use `signRaw`, forward it
//   async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
//     if (!this.innerSigner.signRaw) {
//       throw new Error('Inner signer does not implement signRaw');
//     }

//     return this.innerSigner.signRaw(raw);
//   }
// }

import type {
  Signer,
  SignerResult,
  SignerPayloadJSON,
  SignerPayloadRaw
} from '@polkadot/types/types';

export class AssetFeeSigner implements Signer {
  constructor(
    private innerSigner: any,
    private assetId: any
  ) {}

  async signPayload(payload: SignerPayloadJSON): Promise<SignerResult> {
    const modified = {
      ...payload,
      assetId: this.assetId // Convert number to hex string
    };

    if (!this.innerSigner.signPayload) {
      throw new Error('Inner signer does not implement signPayload');
    }

    return this.innerSigner.signPayload(modified as any);
  }

  async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
    if (!this.innerSigner.signRaw) {
      throw new Error('Inner signer does not implement signRaw');
    }
    return this.innerSigner.signRaw(raw);
  }
}

// export async function buyNft(senderAddress: string, listingId: number, amount: number) {
//   try {
//     const api = await apiPRomise
//     const extensions = await web3Enable('RealXMarket');
//     const injected = await web3FromAddress(senderAddress);
//     const extrinsic = api.tx.nftMarketplace.buyToken(listingId, amount);
//     const signer = injected.signer;

//     const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
//       if (result.status.isInBlock) {
//         console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
//       } else if (result.status.isBroadcast) {
//         console.log(`Transaction finalized at blockHash ${result.status.asBroadcast}`);
//       }
//     });

//     console.log('Transaction sent:', unsub);
//   } catch (error) {
//     console.error('Failed to list property:', error);
//   }
// }

// export async function buyNft(
//   senderAddress: string,
//   listingId: number,
//   amount: number,
//   asset: number
// ) {
//   try {
//     const api = await apiPRomise;
//     const extensions = await web3Enable('RealXMarket');
//     const injected = await web3FromAddress(senderAddress);
//     const extrinsic = api.tx.nftMarketplace.buyToken(listingId, amount, asset);
//     // const signer = injected.signer;

//     const signer = new AssetFeeSigner(api.signer, 42); // assetId = 42

//     const palletInstance = { PalletInstance: 75 };
//     const generalIndex = { GeneralIndex: asset };

//     const unsub = await extrinsic.signAndSend(
//       senderAddress,
//       {
//         signer,
//         payload: {
//           assetId: asset // The custom asset ID to use for fee
//         }
//       },
//       result => {
//         console.log(result);
//         if (result.status.isInBlock) {
//           console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
//         } else if (result.status.isBroadcast) {
//           console.log(`Transaction finalized at blockHash ${result.status.asBroadcast}`);
//         }
//       }
//     );

//     console.log('Transaction sent:', unsub);
//   } catch (error: any) {
//     // Throwing a custom error
//     console.log(error);
//     throw new NftError(`Failed to buy NFT: ${error.message}`);
//   }
// }

// export async function buyNft(
//   senderAddress: string,
//   listingId: number,
//   amount: number,
//   asset: number
// ) {
//   try {
//     const api = await apiPRomise;

//     // Inject extension signer
//     const extensions = await web3Enable('RealXMarket');
//     const injected = await web3FromAddress(senderAddress);
//     const signer = injected.signer;

//     // ✅ Wrap injected signer in a custom signer to include assetId
//     // const signer: any = new AssetFeeSigner(injected.signer, asset);

//     // Create extrinsic
//     const extrinsic = api.tx.nftMarketplace.buyToken(listingId, amount, asset);

//     const payload = api.createType('SignerPayload', {
//       method: extrinsic.method.toHex(),
//       nonce: await api.rpc.system.accountNextIndex(senderAddress),
//       genesisHash: api.genesisHash,
//       blockHash: api.genesisHash,
//       runtimeVersion: api.runtimeVersion,
//       version: api.extrinsicVersion,
//       address: senderAddress,
//       tip: 0,
//       signedExtensions: ['ChargeAssetTxPayment'],
//       additionalSigned: {
//         assetId: asset
//       }
//     });
//     const { signature } = await signer.signPayload!(payload.toPayload());
//     extrinsic.addSignature(senderAddress, signature, payload.toPayload());

//     // 🚫 REMOVE the payload field here — it's not supported in v15
//     const unsub = await extrinsic.send(result => {
//       if (result.status.isInBlock) {
//         console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
//       } else if (result.status.isFinalized) {
//         console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
//       }
//     });

//     console.log('Transaction sent:', unsub);
//   } catch (error: any) {
//     console.error('Buy NFT failed:', error);
//     throw new NftError(`Failed to buy NFT: ${error.message}`);
//   }
// }
