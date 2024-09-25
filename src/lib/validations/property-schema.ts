// src/config/property.ts
import { z } from 'zod';

export const propertySchema = z.object({
  property_name: z.string(),
  address_street: z.string(),
  address_town_city: z.string(),
  post_code: z.string(),
  description: z.string(),
  area: z.string(),
  quality: z.string(),
  property_type: z.string(),
  no_of_Bedrooms: z.number(),
  outdoor_space: z.string(),
  construction_date: z.string(),
  number_of_bathrooms: z.number(),
  Off_street_parking: z.string(),
  floor_Plan: z.string(),
  sales_agreement: z.string(),
  property_image: z.string(),
  images: z.array(z.instanceof(File)),
  property_price: z.number(),
  estimated_rental_income: z.number(),
  property_development_Code: z.string(),
  planning_permission_Code: z.string(),
  title_deed_number: z.string(),
  map: z.string()
});

export const propertyInformationSchema = z.object({
  property_name: z.string().min(1),
  address_street: z.string().min(1),
  address_town_city: z.string().min(1),
  post_code: z.string().min(1),
  property_type: z.string(),
  property_number: z.string().min(1),
  local_authority: z.string().min(1),
  title_deed_number: z.string().min(1),
  map: z.string().min(1),
  floor_plan: z.instanceof(File),
  sales_agreement: z.instanceof(File)
  // region: z.number(),
  // location: z.number()
});

export type IPropertyInformationInput = z.infer<typeof propertyInformationSchema>;

export const propertyPricingSchema = z.object({
  number_of_tokens: z.string(),
  price_per_token: z.string(),
  property_price: z.string(),
  estimated_rental_income: z.string()
});

export type IPricingDetails = z.infer<typeof propertyPricingSchema>;

export const propertyFeaturesSchema = z.object({
  area: z.string(),
  quality: z.string(),
  outdoor_space: z.string(),
  no_of_Bedrooms: z.number(),
  construction_date: z.string(),
  number_of_bathrooms: z.number(),
  Off_street_parking: z.string(),
  property_description: z.string(),
  property_development_Code: z.string(),
  planning_permission_Code: z.string(),
  property_images: z.array(z.instanceof(File))
});

export type IPropertyFeatures = z.infer<typeof propertyFeaturesSchema>;
