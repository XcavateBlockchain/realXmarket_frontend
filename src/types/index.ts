import {
  InjectedExtension,
  InjectedMetadata,
  InjectedProvider
} from '@polkadot/extension-inject/types';
import { Signer } from '@polkadot/types/types';

export type TabNavItem = {
  title: string;
  href: string;
  icon: string;
};

export interface FetchedProperty {
  realEstateDeveloper: string;
  tokenPrice: string;
  collectedFunds: string;
  assetId: string;
  itemId: string;
  collectionId: string;
  tokenAmount: string;
  remainingTokens: string;
}

export type Property = {
  property_name: string;
  id: string;
  address_street: string;
  address_town_city: string;
  post_code: string;
  description: string;
  area: string;
  quality: string;
  property_type: string;
  no_of_Bedrooms: number;
  outdoor_space: string;
  construction_date: string;
  number_of_bathrooms: number;
  Off_street_parking: string;
  floor_Plan: string;
  sales_agreement: string;
  property_image: string;
  images: string[];
  property_price: number;
  estimated_rental_income: number;
  property_development_Code: string;
  planning_permission_Code: string;
  local_authority: string;
  title_deed_number: string;
  map: string;
};

export interface WalletAccount {
  address: string;
  source: string;
  name?: string;
  wallet?: Wallet;
  signer?: unknown;
}

export interface WalletLogoProps {
  src: string;
  alt: string;
}

export interface WalletInfo {
  extensionName: string;
  title: string;
  installUrl: string;
  logo: WalletLogoProps;
}

export interface WalletMethods {
  enable: () => Promise<unknown>;

  getAccounts: (ss58Format: number) => Promise<WalletAccount[] | null>;
}

export interface Wallet extends WalletInfo, WalletMethods {
  installed: boolean | undefined;

  extension: InjectedExtension | undefined;

  signer: Signer | undefined;

  metadata: InjectedMetadata | undefined;

  provider: InjectedProvider | undefined;
}

export type Option = {
  label: string;
  value: string;
};

export enum STATE_STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
