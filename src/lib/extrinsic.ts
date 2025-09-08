import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { getApi } from './polkadot';
import { WsProvider } from '@polkadot/api';
import { parseUnits } from './formaters';

const apiPRomise = getApi(new WsProvider(process.env.NEXT_PUBLIC_RPC_URL));

class NftError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NftError';
  }
}

export async function listNFT(senderAddress: string, collectionId: number, nftId: number) {
  try {
    const api = await apiPRomise;
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

export async function buyNft(
  senderAddress: string,
  listingId: number,
  amount: number | string | bigint,
  asset: number
) {
  try {
    const api = await apiPRomise;
    const extensions = await web3Enable('RealXMarket');
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.marketplace.buyPropertyToken(listingId, amount, asset);
    const signer = injected.signer;

    const estimatedFee = await extrinsic.paymentInfo(senderAddress);
    console.log(`Estimated transaction fee: ${estimatedFee.partialFee.toHuman()}`);

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      console.log(result);
      if (result.status.isInBlock) {
        console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
      } else if (result.status.isBroadcast) {
        console.log(`Transaction finalized at blockHash ${result.status.asBroadcast}`);
      }
    });

    console.log('Transaction sent:', unsub);
  } catch (error: any) {
    // Throwing a custom error
    throw new NftError(`Failed to buy NFT: ${error.message}`);
  }
}

export async function listProperty(
  senderAddress: string,
  region: number,
  location: string,
  tokenPrice: number,
  tokenAmount: number,
  data: any
): Promise<any> {
  console.log('REGION ID', region);
  console.log('LOCATION_ID', location);
  try {
    const api = await apiPRomise;
    const extensions = await web3Enable('RealXMarket');
    const injected = await web3FromAddress(senderAddress);
    const parsePrice = parseUnits(String(tokenPrice), 6);
    const extrinsic = api.tx.marketplace.listProperty(
      region,
      location,
      parsePrice,
      tokenAmount,
      JSON.stringify(data),
      true
    );
    const signer = injected.signer;

    return new Promise((resolve, reject) => {
      extrinsic
        .signAndSend(senderAddress, { signer }, result => {
          if (result.status.isInBlock) {
            console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
            // Get the events from the transaction
            const events = result.events.map(event => ({
              section: event.event.section,
              method: event.event.method,
              data: event.event.data.toHuman()
            }));
            console.log('Events', events);
            resolve(events);
          } else if (result.status.isFinalized) {
            console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
          } else if (result.status.isDropped) {
            reject(new Error(`Transaction dropped: ${result.status.toString()}`));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (error) {
    console.error('Failed to list property:', error);
    throw error;
  }
}

export async function listenForWhiteListEvent(
  txHash: string,
  address: string,
  handleResult: (data: { registered: boolean; message: string } | null) => void
) {
  try {
    const api = await apiPRomise;
    // console.log(`Listening for events related to transaction: ${txHash}`);
    const unsubscribe: any = await api.query.system.events((events: any[]) => {
      events.forEach(record => {
        const { event, phase } = record;

        if (event.section === 'xcavateWhitelist' && event.method === 'NewUserWhitelisted') {
          const foundEvent = event.toHuman();
          if (foundEvent.data.user === address) {
            // console.log(event.toHuman());

            handleResult({
              registered: true,
              message: 'Player successfully registered'
            });
          }
          unsubscribe();
        }
      });
    });
  } catch (error) {
    handleResult(null);
  }
}

export async function claimProperty(senderAddress: string, listingId: number) {
  try {
    const api = await apiPRomise;
    const extensions = await web3Enable('RealXMarket');
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.marketplace.claimPropertyToken(listingId);
    const signer = injected.signer;

    const estimatedFee = await extrinsic.paymentInfo(senderAddress);
    console.log(`Estimated transaction fee: ${estimatedFee.partialFee.toHuman()}`);

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      console.log(result);
      if (result.status.isInBlock) {
        console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
      } else if (result.status.isBroadcast) {
        console.log(`Transaction finalized at blockHash ${result.status.asBroadcast}`);
      }
    });

    console.log('Transaction sent:', unsub);
  } catch (error: any) {
    // Throwing a custom error
    throw new NftError(`Failed to claim property: ${error.message}`);
  }
}
