// Existing hooks
export * from './use-balance';
export * from './use-debounce';
// export * from './use-did-from-address';
export * from './use-media-query';
export * from './use-payment-asset';
export * from './useLocalStorage';

// New blockchain query hooks
export * from './use-blockchain-queries';

// Property service
export { propertyService } from '@/lib/property.service';
export type {
  Property,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyQueryFilters,
  PropertyInformation,
  PropertyPricing,
  PropertyFeatures,
  PropertyFile
} from '@/lib/property.model';
