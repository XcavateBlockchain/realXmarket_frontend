export type Property = {
  id: string;
  status: string;
  developerAddress: string;
  propertyNumber: string;
  propertyName: string;
  propertyPrice: number;
  propertyType: string;
  addressStreet: string;
  addressTownCity: string;
  postCode: string;
  localAuthority: string;
  planningCode: string;
  map: string; //  not sure if this is required
  floorPlan: string;
  salesAgreement: string;
  buildingControlCode: string;
  legalRepresentative: string;
  region: number; // not sure if this is required
  location: string; // not sure if this is required
  numberOfTokens: number;
  pricePerToken: number;
  estimatedRentalIncome: number;
  annualServiceCharge: number;
  stampDutyTax: number;
  isStampDutyPaid: boolean;
  isAnnualServiceChargePaid: boolean;
  area: string;
  quality: string;
  outdoorSpace: string;
  numberOfBedrooms: string;
  numberOfBathrooms: string;
  constructionDate: string;
  offStreetParking: string;
  propertyDescription: string;
  images: string[];
  files: string[];
  otherDocuments: string[];
  company: {
    id: string; // not sure if this is required
    name: string;
    logo: string;
  };
  createdAt: string;
  updatedAt: string;
};

export enum PropertyStatus {
  Draft = 'Draft',
  Listed = 'Listed',
  Sold = 'Sold',
  Archived = 'Archived'
}

export enum PropertyType {
  Apartment = 'Apartment',
  House = 'House',
  Townhouse = 'Townhouse',
  Land = 'Land',
  Commercial = 'Commercial'
}

export type Company = {
  id?: string; // Optional if not always known at submission
  name: string;
  logo?: string; // URI to logo; optional
};

export type MediaRefs = {
  images: string[]; // URIs (IPFS/http). Keep count bounded in runtime.
  floorPlan?: string[]; // Optional floorplan URI
  salesAgreement?: string[]; // URIs to PDFs/docs
  otherDocuments?: string[]; // Optional extra docs
};

export type Address = {
  street: string;
  townCity: string;
  postCode: string;
  localAuthority: string;
  region?: string; // Optional; string is more flexible than number
  location?: string; // Optional; free-text or "lat,long" string
};

export type Financials = {
  propertyPrice: number;
  numberOfTokens: number;
  pricePerToken: number;
  estimatedRentalIncome?: number; // Optional forecast
  annualServiceCharge?: number; // Optional
  stampDutyTax?: number; // Optional
  isStampDutyPaid?: boolean;
  isAnnualServiceChargePaid?: boolean;
};

export type Attributes = {
  area?: string; // e.g., "85 sqm"
  quality?: string; // high, medium, low
  outdoorSpace?: string; // e.g., "Balcony", "Garden"
  numberOfBedrooms?: number; // prefer numeric
  numberOfBathrooms?: number; // prefer numeric
  constructionDate?: string; // ISO date string "YYYY-MM-DD"
  offStreetParking?: string; // e.g., "Garage", "None"
};

export type PropertyMetadata = {
  id: string; // canonical resource ID (UUID or slug)
  status: PropertyStatus;
  developerAddress: string; // chain address (SS58/hex)
  propertyNumber: string; // developer internal reference
  propertyName: string;
  propertyType: PropertyType;
  address: Address;
  planningCode?: string;
  buildingControlCode?: string;
  legalRepresentative?: string;
  map?: string; // Optional map URI         // Optional contract URI
  financials: Financials;
  attributes?: Attributes;
  propertyDescription?: string;
  media?: MediaRefs;
  company?: Company;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};
