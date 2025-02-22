// import { ApiPromise, WsProvider } from '@polkadot/api';

// export async function getApi() {
//   const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_RPC_URL);
//   const api = await ApiPromise.create({ provider: wsProvider });
//   return api;
// }

import { ApiPromise, WsProvider, HttpProvider } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';

let apiInstance: ApiPromise | undefined;

export async function getApi(wsProvider: WsProvider | HttpProvider): Promise<ApiPromise> {
  try {
    if (apiInstance?.isConnected) {
      return apiInstance;
    }

    if (apiInstance && !apiInstance.isConnected) {
      await apiInstance.disconnect();
      apiInstance = undefined;
    }

    await cryptoWaitReady();
    // const wsProvider  = new provider(process.env.NEXT_PUBLIC_RPC);
    // wsProvider = new HttpProvider(process.env.NEXT_PUBLIC_RPC_HTTP);
    apiInstance = await ApiPromise.create({ provider: wsProvider });

    return apiInstance;
  } catch (error) {
    console.error('Failed to create Polkadot API instance:', error);
    throw error;
  }
}
