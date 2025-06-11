import { ApiPromise } from '@polkadot/api';
import { Signer } from '@polkadot/types/types';
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { web3FromSource } from '@/components/wallet/wallets';

// Transaction status enum for better type safety
export enum TransactionStatus {
  PENDING = 'PENDING',
  IN_BLOCK = 'IN_BLOCK',
  FINALIZED = 'FINALIZED',
  ERROR = 'ERROR',
  CANCELLED = 'CANCELLED'
}

// Transaction result interface
export interface TransactionResult {
  status: TransactionStatus;
  message: string;
  blockHash?: string;
  txHash?: string;
  error?: string;
  unsubscribe?: () => void;
}

// Enhanced interface with better typing
export interface ISubmitTransaction {
  api: ApiPromise;
  extrinsic: any; // Could be more specific based on your extrinsic types
  signer: Signer | undefined;
  senderAddress: string;
  appName?: string; // Optional app name for web3Enable
  waitForFinalization?: boolean; // Whether to wait for finalization or just inclusion
  timeout?: number; // Timeout in milliseconds (default: 60000)
}

// Promise-based transaction submission with status tracking
export async function submitTransaction({
  api,
  signer,
  extrinsic,
  senderAddress,
  waitForFinalization = true,
  timeout = 60000
}: ISubmitTransaction): Promise<TransactionResult> {
  try {
    // Create a promise that resolves when transaction reaches desired status
    return new Promise((resolve, reject) => {
      let unsubscribe: (() => void) | undefined;
      let isResolved = false;

      // Set up timeout
      const timeoutId = setTimeout(() => {
        if (!isResolved && unsubscribe) {
          unsubscribe();
          isResolved = true;
          resolve({
            status: TransactionStatus.ERROR,
            message: 'Transaction timeout',
            error: 'TIMEOUT'
          });
        }
      }, timeout);

      // Submit transaction
      extrinsic
        .signAndSend(senderAddress, { signer }, (result: any) => {
          try {
            const txHash = extrinsic.hash.toHex();

            if (result.status.isInBlock) {
              const blockHash = result.status.asInBlock.toHex();
              console.log(`Transaction included at blockHash ${blockHash}`);

              if (!waitForFinalization && !isResolved) {
                clearTimeout(timeoutId);
                if (unsubscribe) unsubscribe();
                isResolved = true;
                resolve({
                  status: TransactionStatus.IN_BLOCK,
                  message: 'Transaction included in block',
                  blockHash,
                  txHash,
                  unsubscribe
                });
              }
            }

            if (result.status.isFinalized) {
              const blockHash = result.status.asFinalized.toHex();
              console.log(`Transaction finalized at blockHash ${blockHash}`);

              if (!isResolved) {
                clearTimeout(timeoutId);
                if (unsubscribe) unsubscribe();
                isResolved = true;
                resolve({
                  status: TransactionStatus.FINALIZED,
                  message: 'Transaction finalized',
                  blockHash,
                  txHash,
                  unsubscribe
                });
              }
            }

            // Check for transaction errors
            if (result.dispatchError) {
              let errorMessage = 'Transaction failed';

              if (result.dispatchError.isModule) {
                // For module errors, try to get the specific error
                const decoded = api.registry.findMetaError(result.dispatchError.asModule);
                errorMessage = `${decoded.section}.${decoded.name}: ${decoded.docs}`;
              }

              if (!isResolved) {
                clearTimeout(timeoutId);
                if (unsubscribe) unsubscribe();
                isResolved = true;
                resolve({
                  status: TransactionStatus.ERROR,
                  message: errorMessage,
                  error: 'DISPATCH_ERROR',
                  txHash
                });
              }
            }
          } catch (callbackError) {
            console.error('Error in transaction callback:', callbackError);
            if (!isResolved) {
              clearTimeout(timeoutId);
              if (unsubscribe) unsubscribe();
              isResolved = true;
              resolve({
                status: TransactionStatus.ERROR,
                message: 'Error processing transaction result',
                error:
                  callbackError instanceof Error
                    ? callbackError.message
                    : 'UNKNOWN_CALLBACK_ERROR'
              });
            }
          }
        })
        .then((unsub: () => void) => {
          unsubscribe = unsub;
          console.log('Transaction submitted successfully');
        })
        .catch((error: any) => {
          if (!isResolved) {
            clearTimeout(timeoutId);
            isResolved = true;
            resolve({
              status: TransactionStatus.ERROR,
              message: 'Failed to submit transaction',
              error: error.message || 'SUBMISSION_ERROR'
            });
          }
        });
    });
  } catch (error) {
    console.error('Transaction submission error:', error);
    return {
      status: TransactionStatus.ERROR,
      message: 'Failed to submit transaction',
      error: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
    };
  }
}

// Utility function for common NFT marketplace operations
export async function buyToken(
  api: ApiPromise,
  listingId: number,
  amount: string,
  senderAddress: string,
  options?: Partial<ISubmitTransaction>
): Promise<TransactionResult> {
  // Enable web3 and get the signer
  await web3Enable('RealXMarket');
  const injected = await web3FromAddress(senderAddress);
  const extrinsic = api.tx.nftMarketplace.buyToken(listingId, amount);

  return submitTransaction({
    api,
    signer: injected?.signer,
    extrinsic,
    senderAddress,
    ...options
  });
}

// Utility function for listing properties
export async function listProperty(
  api: ApiPromise,
  tokenId: number,
  price: string,
  senderAddress: string,
  options?: Partial<ISubmitTransaction>
): Promise<TransactionResult> {
  // Enable web3 and get the signer
  await web3Enable('RealXMarket');
  const injected = await web3FromAddress(senderAddress);
  const extrinsic = api.tx.nftMarketplace.listToken(tokenId, price);

  return submitTransaction({
    api,
    signer: injected?.signer,
    extrinsic,
    senderAddress,
    ...options
  });
}

export async function reclaimUnsold(
  api: ApiPromise,
  listingId: number,
  senderAddress: string,
  options?: Partial<ISubmitTransaction>
): Promise<TransactionResult> {
  // Enable web3 and get the signer
  await web3Enable('RealXMarket');
  const injected = await web3FromAddress(senderAddress);
  const extrinsic = api.tx.nftMarketplace.reclaimUnsold(listingId);

  return submitTransaction({
    api,
    signer: injected?.signer,
    extrinsic,
    senderAddress,
    ...options
  });
}

export async function requestRefund(
  api: ApiPromise,
  listingId: number,
  senderAddress: string,
  options?: Partial<ISubmitTransaction>
): Promise<TransactionResult> {
  // Enable web3 and get the signer
  await web3Enable('RealXMarket');
  const injected = await web3FromAddress(senderAddress);
  const extrinsic = api.tx.nftMarketplace.refundExpired(listingId);

  return submitTransaction({
    api,
    signer: injected?.signer,
    extrinsic,
    senderAddress,
    ...options
  });
}

// Example usage:
/*
async function example() {
  try {
    const result = await buyToken(
      api,
      123, // listingId
      '1000000000000', // amount in smallest unit
      'YOUR_ADDRESS_HERE',
      {
        waitForFinalization: true,
        timeout: 120000 // 2 minutes
      }
    );

    switch (result.status) {
      case TransactionStatus.FINALIZED:
        console.log('✅ Transaction successful!', result.blockHash);
        break;
      case TransactionStatus.IN_BLOCK:
        console.log('⏳ Transaction in block:', result.blockHash);
        break;
      case TransactionStatus.ERROR:
        console.error('❌ Transaction failed:', result.error);
        break;
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}
*/
