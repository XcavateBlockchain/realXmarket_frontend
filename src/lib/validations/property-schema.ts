import { z } from 'zod';
import { PropertyStatus, PropertyType } from '../property-model';

// export const propertySchema = z.object({
//   property_name: z.string(),
//   address_street: z.string(),
//   address_town_city: z.string(),
//   post_code: z.string(),
//   description: z.string(),
//   area: z.string(),
//   quality: z.string(),
//   property_type: z.string(),
//   no_of_Bedrooms: z.number(),
//   outdoor_space: z.string(),
//   construction_date: z.string(),
//   number_of_bathrooms: z.number(),
//   Off_street_parking: z.string(),
//   floor_Plan: z.string(),
//   sales_agreement: z.string(),
//   property_image: z.string(),
//   images: z.array(z.instanceof(File)),
//   property_price: z.number(),
//   estimated_rental_income: z.number(),
//   property_development_Code: z.string(),
//   planning_permission_Code: z.string(),
//   title_deed_number: z.string(),
//   map: z.string()
// });

export const propertyInformationSchema = z.object({
  property_name: z.string().min(1, 'Property name is required'),
  address_street: z.string().min(1, 'Street address is required'),
  address_town_city: z.string().min(1, 'Town/City is required'),
  post_code: z.string().min(1, 'Postal code is required'),
  property_type: z.string().min(1, 'Property type is required'),
  property_number: z.string().min(1, 'Property number is required'),
  local_authority: z.string().min(1, 'Local authority is required'),
  planning_permission_Code: z.string().min(1, 'Planning permission code is required'),
  // title_deed_number: z.string().min(1),
  map: z.string().min(1, 'Map link is required'),
  floor_plan: z.instanceof(File, { message: 'Floor plan is required' }),
  sales_agreement: z.instanceof(File, { message: 'Sales agreement is required' }),
  building_control_code: z.string().min(1, 'Building control code is required'),
  legal_representative: z.string().min(1, 'Legal representative is required'),
  other_documents: z.array(z.instanceof(File)).optional().nullish()
  // region: z.number(),
  // location: z.number()
});

export type IPropertyInformationInput = z.infer<typeof propertyInformationSchema>;

export const propertyPricingSchema = z.object({
  number_of_tokens: z.string().min(1, 'Number of tokens is required'),
  // price_per_token: z.string().min(1, 'Price per token is required'),
  property_price: z.string().min(1, 'Property price is required'),
  estimated_rental_income: z.string().min(1, 'Estimated rental income is required'),
  annualServiceCharge: z.string().min(1, 'Annual service charge is required'),
  stampDutyTax: z.string().min(1, 'Stamp duty tax is required'),
  isStampDutyPaid: z.boolean().optional().default(false),
  isAnnualServiceChargePaid: z.boolean().optional().default(false)
});

export type IPricingDetails = z.infer<typeof propertyPricingSchema>;

export const propertyFeaturesSchema = z.object({
  area: z.string().min(1, 'Area is required'),
  quality: z.string().min(1, 'Quality is required'),
  outdoor_space: z.string().min(1, 'Outdoor space is required'),
  no_of_Bedrooms: z.string().min(1, 'Number of bedrooms is required'),
  construction_date: z.string().min(1, 'Construction date is required'),
  no_of_bathrooms: z.string().min(1, 'Number of bathrooms is required'),
  Off_street_parking: z.string().min(1, 'Off-street parking is required'),
  property_description: z.string().min(1, 'Property description is required'),
  property_images: z
    .array(z.instanceof(File))
    .min(1, 'At least one property image is required')
});

// .refine(file => file.type.startsWith('image/'), {
//   message: 'Only image files are allowed'
// })

export type IPropertyFeatures = z.infer<typeof propertyFeaturesSchema>;

export const propertyFormSchema = propertyInformationSchema
  .merge(propertyPricingSchema)
  .merge(propertyFeaturesSchema);

export type PropertyInput = z.infer<typeof propertyFormSchema>;

export const PROPERTY_STATUSES = [
  'draft',
  'inprogress',
  'approved',
  'listed',
  'archived'
] as const;

export const propertyTypes: { label: string; value: string }[] = [
  {
    label: 'Apartment',
    value: 'Apartment'
  },
  {
    label: 'Flat',
    value: 'Flat'
  },
  {
    label: 'Bungalow',
    value: 'Bungalow'
  },
  {
    label: 'Detached',
    value: 'Detached'
  },
  {
    label: 'Semi-Detached',
    value: 'Semi-Detached'
  },
  {
    label: 'Terraced',
    value: 'Terraced'
  }
];

export const legalRepresentatives: { label: string; value: string }[] = [
  {
    label: 'St Albans Property Law LLP',
    value: 'St Albans Property Law LLP'
  },
  {
    label: 'Thames Legal Chambers',
    value: 'Thames Legal Chambers'
  },
  {
    label: 'Watford Conveyancing & Legal Services Ltd',
    value: 'Watford Conveyancing & Legal Services Ltd'
  },
  {
    label: 'Capital & Counties Legal Associates',
    value: 'Capital & Counties Legal Associates'
  }
];

export const localAuthorities: { label: string; value: string }[] = [
  {
    label: 'Battersea District Council',
    value: 'Battersea District Council'
  },
  {
    label: 'Borehamwood, Hertfordshire',
    value: 'Borehamwood, Hertfordshire'
  },
  {
    label: 'City of London Council',
    value: 'City of London Council'
  },
  {
    label: 'Croydon District Council',
    value: 'Croydon District Council'
  },
  {
    label: 'East London District Council',
    value: 'East London District Council'
  },
  {
    label: 'Greenwich Council',
    value: 'Greenwich Council'
  },
  {
    label: 'St Albans City and District Council',
    value: 'St Albans City and District Council'
  },
  {
    label: 'West Herts District Council',
    value: 'West Herts District Council'
  }
];

// Zod schemas for PropertyMetadata and nested types
export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  townCity: z.string().min(1, 'Town/City is required'),
  flatOrUnit: z.string().min(1, 'Flat or unit is required'),
  postCode: z.string().min(1, 'Post code is required'),
  localAuthority: z.string().min(1, 'Local authority is required'),
  region: z.string().optional(),
  location: z.string().optional()
});

export const financialsSchema = z.object({
  propertyPrice: z.number().positive('Property price must be positive'),
  numberOfTokens: z.number().int().positive('Number of tokens must be a positive integer'),
  pricePerToken: z.number().positive('Price per token must be positive'),
  estimatedRentalIncome: z.number().nonnegative().optional(),
  annualServiceCharge: z.number().nonnegative().optional(),
  stampDutyTax: z.number().nonnegative().optional(),
  isStampDutyPaid: z.boolean().optional(),
  isAnnualServiceChargePaid: z.boolean().optional()
});

export const attributesSchema = z.object({
  area: z.string().optional(),
  quality: z.string().optional(),
  outdoorSpace: z.string().optional(),
  numberOfBedrooms: z.number().int().nonnegative().optional(),
  numberOfBathrooms: z.number().int().nonnegative().optional(),
  constructionDate: z.string().optional(), // ISO date string
  offStreetParking: z.string().optional()
});

export const mediaRefsSchema = z.object({
  images: z
    .array(z.string().url('Image must be a valid URI'))
    .min(1, 'At least one image is required'),
  floorPlan: z.array(z.string().url('Floor plan must be a valid URI')).optional(),
  salesAgreement: z.array(z.string().url('Sales agreement must be a valid URI')).optional(),
  otherDocuments: z.array(z.string().url('Document must be a valid URI')).optional()
});

export const companySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Company name is required'),
  logo: z.string().url('Logo must be a valid URI').optional()
});

export const propertyMetadataSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  status: z.nativeEnum(PropertyStatus, {
    errorMap: () => ({ message: 'Invalid property status' })
  }),
  developerAddress: z.string().min(1, 'Developer address is required'),
  propertyName: z.string().min(1, 'Property name is required'),
  propertyType: z.nativeEnum(PropertyType, {
    errorMap: () => ({ message: 'Invalid property type' })
  }),
  address: addressSchema,
  planningCode: z.string().optional(),
  buildingControlCode: z.string().optional(),
  legalRepresentative: z.string().optional(),
  map: z.string().url('Map must be a valid URI').optional(),
  financials: financialsSchema,
  attributes: attributesSchema.optional(),
  propertyDescription: z.string().optional(),
  media: mediaRefsSchema.optional(),
  company: companySchema.optional(),
  createdAt: z.string().datetime('Created at must be a valid ISO timestamp'),
  updatedAt: z.string().datetime('Updated at must be a valid ISO timestamp')
});

export type PropertyMetadataInput = z.infer<typeof propertyMetadataSchema>;

// Form- schspecificema based on propertyMetadataSchema but adapted for form inputs
// - Uses string types for financials (form inputs are strings)
// - Uses File types for media uploads
// - Makes auto-generated fields optional
export const propertyMetadataFormSchema = z.object({
  propertyName: z.string().min(1, 'Property name is required'),
  propertyType: z.string().min(1, 'Property type is required'), // Accept string, validate enum in onSubmit
  address: addressSchema,
  planningCode: z.string().optional(),
  buildingControlCode: z.string().optional(),
  legalRepresentative: z.string().optional(),
  map: z.string().optional(),
  financials: z.object({
    propertyPrice: z.string().min(1, 'Property price is required'),
    numberOfTokens: z.string().min(1, 'Number of tokens is required'),
    estimatedRentalIncome: z.string().min(1, 'Estimated rental income is required'),
    annualServiceCharge: z.string().min(1, 'Annual service charge is required'),
    stampDutyTax: z.string().min(1, 'Stamp duty tax is required'),
    isStampDutyPaid: z.boolean().optional().default(false),
    isAnnualServiceChargePaid: z.boolean().optional().default(false)
  }),
  attributes: z.object({
    area: z.string().min(1, 'Area is required'),
    quality: z.string().min(1, 'Quality is required'),
    outdoorSpace: z.string().min(1, 'Outdoor space is required'),
    numberOfBedrooms: z.string().min(1, 'Number of bedrooms is required'),
    numberOfBathrooms: z.string().min(1, 'Number of bathrooms is required'),
    constructionDate: z.string().min(1, 'Construction date is required'),
    offStreetParking: z.string().min(1, 'Off-street parking is required')
  }),
  propertyDescription: z.string().min(1, 'Property description is required'),
  // File uploads - handled separately
  floorPlan: z.instanceof(File, { message: 'Floor plan is required' }),
  salesAgreement: z.instanceof(File, { message: 'Sales agreement is required' }),
  propertyImages: z
    .array(z.instanceof(File))
    .min(1, 'At least one property image is required'),
  otherDocuments: z.array(z.instanceof(File)).optional()
});

export type PropertyMetadataFormInput = z.infer<typeof propertyMetadataFormSchema>;
