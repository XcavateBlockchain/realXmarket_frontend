export interface PropertyFile {
  fileKey: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  fileCategory: 'floor_plan' | 'sales_agreement' | 'property_image' | 'other';
}

export interface PropertyInformation {
  property_name: string;
  address_street: string;
  address_town_city: string;
  post_code: string;
  property_type: string;
  property_number: string;
  local_authority: string;
  planning_permission_Code?: string;
  map: string;
  floor_plan?: string; // File key reference
  sales_agreement?: string; // File key reference
  property_images?: string[]; // File key references
  region?: number;
  location?: number;
}

export interface PropertyPricing {
  number_of_tokens: number;
  price_per_token: number;
  property_price: number;
  estimated_rental_income: number;
}

export interface PropertyFeatures {
  area: string;
  quality: string;
  outdoor_space: string;
  no_of_Bedrooms: number;
  construction_date: string;
  no_of_bathrooms: number;
  Off_street_parking: string;
  property_description: string;
  property_development_Code: string;
  title_deed_number: string;
  property_images?: string[]; // File key references
}

export interface Property {
  id?: string;
  propertyId: number;
  accountAddress: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'sold' | 'archived';

  // Property information
  information: PropertyInformation;

  // Property pricing
  pricing: PropertyPricing;

  // Property features
  features: PropertyFeatures;

  // Files
  files: PropertyFile[];

  // Blockchain metadata
  nftCollectionId?: number;
  nftItemId?: number;
  assetId?: number;
  blockNumber?: number;
  signer?: string;
  tokenPrice?: number;
  tokenAmount?: number;
}

export interface CreatePropertyRequest {
  accountAddress: string;
  information: Omit<PropertyInformation, 'floor_plan' | 'sales_agreement' | 'property_images'>;
}

export interface UpdatePropertyRequest {
  information?: Partial<PropertyInformation>;
  pricing?: Partial<PropertyPricing>;
  features?: Partial<PropertyFeatures>;
  status?: Property['status'];
}

export interface PropertyQueryFilters {
  accountAddress?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: Property['status'];
  region?: number;
  location?: number;
}

export const PROPERTY_TYPES = [
  'Apartment',
  'Flat',
  'Bungalow',
  'Detached',
  'Semi-Detached',
  'Terraced',
  'Commercial',
  'Industrial',
  'Mixed-use'
] as const;

export const PROPERTY_QUALITIES = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'] as const;

export const PROPERTY_STATUSES = ['draft', 'published', 'sold', 'archived'] as const;
