'use client';

import { AlertDialog } from '@/components/ui/alert-dialog';
import { WalletModal } from '@/components/connect/wallet-modal';
import { dotenv } from '@/config/dotenv';
import { getFormattedBalance } from '@/lib/balance-formarter';
import { initPolkadot } from '@/lib/init-polkadot';
import { useLocalStorage } from '@/lib/system-storage';
import {
  type XcavateContextType,
  type XcavateError,
  XcavateErrorCode
} from '@/context/xcavate-context';
import {
  AccessCredentials,
  initializePlutonicationDAppClient
} from '@plutonication/plutonication';
import type { ApiPromise, HttpProvider, WsProvider } from '@polkadot/api';
import type { Injected, InjectedAccount, Unsubcall } from '@polkadot/extension-inject/types';
import type { Signer } from '@polkadot/types/types';
import QRCode from 'qrcode';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { NodeContext } from '@/context';
export const LS_ACTIVE_ACCOUNT_ADDRESS = 'activeAccountAddress';
export const LS_PLUTONICATION_KEY = 'plutonication_key';

const XcavateContext = createContext<XcavateContextType>({
  open: false,
  isLoading: false,
  setOpen: () => false,
  qrCodeDataUrl: null,
  connect: async () => {},
  disconnect: () => {},
  updateActiveAccount: () => {},
  balance: null,
  setBalance: (balance: string | null) => balance
});

/**
 * Use Xcavte
 * @description Xcavte hook that exposes `XcvateProvider`.
 */
export const useXcavateContext = () => {
  const context = useContext(XcavateContext);
  if (!context) throw new Error('useXcavteContex must be used within a XcavteProvider');
  return context;
};

interface XcavateProviderProps extends PropsWithChildren {
  connectOnInit?: boolean;
  serverUrl?: string;
  appName?: string;
  appIconUrl?: string;
}
/**
 * Main provider that needs to be wrapped around the app
 * to use `Xcavte` context anywhere.
 */
export default function XcavateProvider({
  children,
  connectOnInit,
  serverUrl = 'https://plutonication.com/',
  appName = dotenv.APP_NAME,
  appIconUrl = `${dotenv.APP_URL}/images/realXmarket_logo.svg`
}: XcavateProviderProps) {
  const isInitializing = useRef(false);
  const isInitialized = useRef(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState(connectOnInit);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<XcavateError | undefined>();
  // const [api, setApi] = useState<ApiPromise>();
  const [provider, setProvider] = useState<WsProvider | HttpProvider>();
  const [accounts, setAccounts] = useState<InjectedAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<InjectedAccount>();
  const [activeSigner, setActiveSigner] = useState<Signer>();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const { api } = useContext(NodeContext);
  // const accessCredentialsRef = useRef<AccessCredentials | null>(null);
  const [_publicKey, setPublicKey] = useState<string>();
  // const activeSigner = useRef<Signer>(undefined);
  const unsubscribeAccounts = useRef<Unsubcall | null>(null);

  const accessCredentials: AccessCredentials = new AccessCredentials(
    serverUrl,
    appName,
    appIconUrl
  );

  let injectedAccount: Injected;

  // const initialize = async () => {
  //   isInitializing.current = true;
  //   setIsConnected(false);
  //   setError(undefined);
  //   let _api: ApiPromise | undefined;
  //   let _provider: WsProvider | HttpProvider | undefined;
  //   try {
  //     ({ api: _api, provider: _provider } = await initPolkadot(dotenv.RPC_URL!));

  //     setApi(_api);
  //     provider?.disconnect();
  //     setProvider(_provider);
  //     isInitialized.current = true;
  //     console.log('Connected to node: XCAVATE CHAIN');
  //   } catch (err: any) {
  //     const message = 'Error while initializing Polkadot.js API';
  //     console.error(message, err);
  //     setError({ code: XcavateErrorCode.InitializationError, message });
  //     setIsConnected(false);
  //     setIsConnecting(false);
  //     setApi(undefined);
  //     setProvider(undefined);
  //     isInitialized.current = false;
  //   } finally {
  //     setIsConnecting(false);
  //   }
  // };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   initialize();
  //   return () => {
  //     api?.off('disconnected', disconnect);
  //     api?.disconnect();
  //   };
  // }, []);

  // Add effect for auto-reconnection
  useEffect(() => {
    initializePlutonicReconnect();
  }, []);

  // useEffect(() => {
  //   if (activeAccount?.address) {
  //     getFormattedBalance(activeAccount.address || '', api).then(balance => {
  //       setBalance(balance);
  //     });
  //   }
  // }, [activeAccount]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const storedAddress = localStorage.getItem(LS_ACTIVE_ACCOUNT_ADDRESS);
    if (storedAddress && !activeAccount) {
      console.log('Restoring active account from local storage...');

      const account = accounts.find(acc => acc.address === storedAddress);

      if (account) {
        setActiveAccount(account);
      }
    }
  }, [accounts]);

  useEffect(() => {
    if (activeAccount?.address) {
      getFormattedBalance(activeAccount.address, api).then(balance => {
        setBalance(balance);
      });
    }
  }, [activeAccount, api]);

  useEffect(() => {
    api?.setSigner(activeSigner);
  }, [api, activeSigner]);

  async function connect() {
    setIsConnecting(true);
    setIsConnected(!!activeAccount);
    try {
      // Generate QR code
      const uri = accessCredentials.ToUri();
      useLocalStorage.setItem(LS_PLUTONICATION_KEY, accessCredentials.key);
      await generateQRCode(uri);

      injectedAccount = (await initializePlutonicationDAppClient(
        accessCredentials,
        (receivedPubkey: string) => {
          setPublicKey(receivedPubkey);
          setIsLoading(true);
        }
      )) as unknown as Injected;

      await new Promise(resolve => setTimeout(resolve, 2000));

      unsubscribeAccounts.current?.();
      const accounts = await injectedAccount.accounts.get();

      if (accounts) {
        setAccounts(accounts);
        setActiveSigner(injectedAccount.signer);
        updateActiveAccount(() => accounts[0]);
        useLocalStorage.setItem(LS_ACTIVE_ACCOUNT_ADDRESS, accounts[0].address);
        setIsLoading(false);
        setIsConnecting(false);
        setIsConnected(true);
        setOpen(false);
      }
    } catch (error) {
      console.error('Error initializing Plutonication:', error);
      setError({
        code: XcavateErrorCode.InitializationError,
        message: 'Failed to initialize Plutonication'
      });
    }
  }

  async function initializePlutonicReconnect() {
    setIsConnecting(true);
    console.log('XHECKING');
    const storedKey = useLocalStorage.getItem(LS_PLUTONICATION_KEY);
    if (storedKey !== undefined) {
      console.log('XHECKING 2');
      try {
        const credentials = accessCredentials;
        injectedAccount = (await initializePlutonicationDAppClient(
          {
            ...credentials,
            key: storedKey,
            ToUri() {
              return credentials.ToUri();
            }
          },
          (receivedPubkey: string) => {
            setPublicKey(receivedPubkey);
            // console.log('receivedPubkey', receivedPubkey);
          }
        )) as unknown as Injected;
        unsubscribeAccounts.current?.();
        const accounts = await injectedAccount.accounts.get();

        if (accounts) {
          setIsConnected(true);
          setIsConnecting(false);
          setAccounts(accounts);
          setActiveSigner(await injectedAccount.signer);
          useLocalStorage.setItem(LS_ACTIVE_ACCOUNT_ADDRESS, accounts[0].address);
          updateActiveAccount(() => accounts[0]);
          setOpen(false);
        }
      } catch (_error) {}
    }
  }

  // Disconnect.
  // const disconnect = async (disconnectApi = false) => {
  //   try {
  //     if (disconnectApi) {
  //       if (provider) {
  //         console.log('Disconnecting provider...');
  //         await provider.disconnect();
  //         setProvider(undefined);
  //       }

  //       if (api) {
  //         console.log('Disconnecting API...');
  //         await api.disconnect();
  //         setApi(undefined);
  //       }

  //       localStorage.removeItem(LS_PLUTONICATION_KEY);
  //       localStorage.removeItem(LS_ACTIVE_ACCOUNT_ADDRESS);
  //     }

  //     setIsConnected(false);
  //     setActiveAccount(undefined);
  //     setAccounts([]);
  //     setBalance(null);

  //     unsubscribeAccounts.current?.();
  //     unsubscribeAccounts.current = null;

  //     isInitialized.current = false;
  //     isInitializing.current = false;

  //     console.log('Disconnected successfully');
  //   } catch (error) {
  //     console.error('Error during disconnection:', error);
  //   }
  // };

  const disconnect = async (disconnectApi = false) => {
    try {
      console.log('Starting disconnect process...');

      if (disconnectApi) {
        console.log('Disconnecting provider and API...');

        await Promise.all([
          provider
            ?.disconnect()
            .catch(err => console.error('Provider disconnect error:', err)),
          api?.disconnect().catch(err => console.error('API disconnect error:', err))
        ]);

        console.log('Provider and API disconnected.');
      }

      console.log('Clearing state...');

      setIsConnected(false);
      setActiveAccount(undefined);
      setAccounts([]);
      setBalance(null);

      unsubscribeAccounts.current?.();
      unsubscribeAccounts.current = null;

      isInitialized.current = false;
      isInitializing.current = false;

      console.log('State cleared. Attempting to clear local storage...');

      // Use a timeout to make sure state updates are complete before clearing local storage
      setTimeout(() => {
        console.log('Clearing local storage...');
        localStorage.removeItem(LS_PLUTONICATION_KEY);
        localStorage.removeItem(LS_ACTIVE_ACCOUNT_ADDRESS);
        console.log('Local storage cleared.');
      }, 0);

      console.log('Disconnected successfully');
    } catch (error) {
      console.error('Error during disconnection:', error);
    }
  };

  // Set active account with local storage persistence
  const updateActiveAccount = (account: React.SetStateAction<InjectedAccount | undefined>) => {
    if (typeof account === 'function') {
      setActiveAccount(prevAccount => {
        const newAccount = account(prevAccount);
        updateLocalStorage(newAccount);
        return newAccount;
      });
    } else {
      setActiveAccount(account);
      updateLocalStorage(account);
    }
  };

  const updateLocalStorage = (account: InjectedAccount | undefined) => {
    if (account) {
      localStorage.setItem(LS_ACTIVE_ACCOUNT_ADDRESS, account.address);
    } else {
      localStorage.removeItem(LS_ACTIVE_ACCOUNT_ADDRESS);
    }
  };

  const generateQRCode = async (text: string) => {
    try {
      console.log('Generating QR code for URI:', text);
      const dataUrl = await QRCode.toDataURL(text, {
        margin: 1,
        width: 250,
        color: {
          dark: '#4E4E4E',
          light: '#ffffff'
        }
      });
      console.log('QR code generated successfully');
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setError({
        code: XcavateErrorCode.InitializationError,
        message: 'Failed to generate QR code'
      });
    }
  };

  const contextValue: XcavateContextType = {
    isInitializing: isInitializing.current,
    isInitialized: isInitialized.current,
    isConnecting,
    isConnected,
    isLoading,
    error,
    open,
    qrCodeDataUrl,
    api: api || undefined,
    provider,
    connect,
    disconnect,
    updateActiveAccount,
    accounts,
    activeSigner,
    activeAccount,
    setActiveAccount,
    setOpen,
    balance,
    setBalance
  };

  return (
    <XcavateContext.Provider value={contextValue}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <WalletModal />
      </AlertDialog>
    </XcavateContext.Provider>
  );
}
