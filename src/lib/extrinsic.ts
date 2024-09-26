import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { getApi } from './polkadot';

export async function listNFT(senderAddress: string, collectionId: number, nftId: number) {
  try {
    const api = await getApi();
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.gameModule.listNFT(collectionId, nftId);
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      if (result.status.isInBlock) {
        console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
      } else if (result.status.isBroadcast) {
        console.log('Broadcasting the guess...');
      }
    });

    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to submit guess:', error);
  }
}

export async function buyNft(senderAddress: string, listingId: number, amount: number) {
  try {
    const api = await getApi();
    const extensions = await web3Enable('RealXMarket');
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.nftMarketplace.buyToken(listingId, amount);
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      if (result.status.isInBlock) {
        console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
      } else if (result.status.isBroadcast) {
        console.log(`Transaction finalized at blockHash ${result.status.asBroadcast}`);
      }
    });

    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to list property:', error);
  }
}
export async function listProperty(
  senderAddress: string,
  region: number,
  location: string,
  tokenPrice: number,
  tokenAmount: number,
  data: any
) {
  // const region = 1;
  // const location = 'London';
  // const tokenPrice = 1000;
  // const tokenAmount = 150;
  // const data = {
  //   address: 'Somewhere',
  //   postcode: 'PO 223'
  // };
  try {
    const api = await getApi();
    const extensions = await web3Enable('RealXMarket');
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.nftMarketplace.listObject(
      region,
      location,
      tokenPrice,
      tokenAmount,
      JSON.stringify(data)
    );
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      if (result.status.isInBlock) {
        console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
      } else if (result.status.isBroadcast) {
        console.log(`Transaction finalized at blockHash ${result.status.asBroadcast}`);
      }
    });
    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to list property:', error);
  }
}
