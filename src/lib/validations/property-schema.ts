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
  property_name: z.string(),
  address_street: z.string(),
  address_town_city: z.string(),
  post_code: z.string(),
  property_type: z.string(),
  property_number: z.string(),
  local_authority: z.string(),
  title_deed_number: z.string(),
  map: z.string(),
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
