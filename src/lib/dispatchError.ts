// import type { DispatchError } from 'dedot/codecs'
// import type { LegacyClient } from 'dedot'

import type { ApiPromise } from '@polkadot/api';
import type { DispatchError } from '@polkadot/types/interfaces';

export function getReadableDispatchError(
  api: ApiPromise,
  dispatchError: DispatchError
): string {
  try {
    if (dispatchError.isModule) {
      const meta = api.registry.findMetaError(dispatchError.asModule);
      const { docs, name, section } = meta;
      return `[useSendTransaction]: ${section}.${name} error, ${docs.join(' ')}`;
    }

    // Non-module errors (e.g., Token, BadOrigin, CannotLookup, etc.)
    return `[useSendTransaction]: ${dispatchError.toString()}`;
  } catch (e) {
    return `[useSendTransaction]: Failed to decode dispatch error: ${e instanceof Error ? e.message : 'Unknown error'} (${dispatchError.toString()})`;
  }
}
