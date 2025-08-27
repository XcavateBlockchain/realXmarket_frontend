import FileInput, { MimeTypes } from '@/components/file-input';
import NumberInput from '@/components/number-input';
import SelectInput from '@/components/select-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  legalRepresentatives,
  PropertyInput,
  propertyTypes
} from '@/lib/validations/property-schema';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IForm {
  form: UseFormReturn<PropertyInput>;
}

export const PropertyDetails = ({ form }: IForm) => (
  <>
    <Input type="text" label="Property name" {...form.register('property_name')} />
    {/* <div className="grid w-full grid-cols-2 gap-2">
        <SelectInput
          label="Region"
          placeholder="select"
          options={propertyTypes}
          {...form.register('property_region')}
        />
        <SelectInput
          label="Location"
          placeholder="select"
          options={propertyTypes}
          {...form.register('property_location')}
        />
      </div> */}
    <div className="grid w-full grid-cols-3 gap-2">
      <Input
        type="text"
        label="Property Address"
        placeholder="Street"
        {...form.register('address_street')}
      />
      <Input
        type="text"
        label="Town / City"
        placeholder="Town/City"
        {...form.register('address_town_city')}
      />
      <Input
        type="text"
        label="Postal Code"
        placeholder="Postal code"
        {...form.register('post_code')}
      />
    </div>
    <div className="grid w-full grid-cols-2 gap-2">
      <Input
        type="text"
        label="Property number"
        placeholder=""
        {...form.register('property_number')}
      />
      {/* <Input
          type="text"
          label="Property Type"
          placeholder="E.G (Flat, Apartment)"
          {...form.register('property_type')}
        /> */}
      <SelectInput
        label="Property Type"
        placeholder="select"
        options={propertyTypes}
        {...form.register('property_type')}
      />
    </div>
    <div className="grid w-full grid-cols-3 gap-2">
      <Input
        type="text"
        label="local authority"
        placeholder=""
        {...form.register('local_authority')}
      />
      <Input
        type="text"
        label="Planning code"
        placeholder=""
        {...form.register('planning_permission_Code', { required: true })}
      />
      {/* <Input
          type="text"
          label="title deed number"
          placeholder="e.g"
          {...form.register('title_deed_number')}
        /> */}
      <Input type="text" label="google map link" placeholder="" {...form.register('map')} />
    </div>
    <div className="grid w-full grid-cols-3 gap-2">
      <Input
        type="text"
        label="BUILDING CONTROL CODE"
        placeholder=""
        {...form.register('building_control_code')}
      />
      {/* <Input
          type="text"
          label="Property Type"
          placeholder="E.G (Flat, Apartment)"
          {...form.register('property_type')}
        /> */}
      <SelectInput
        label="ADD A LIGAL REPRESENTATIVE"
        placeholder="select"
        options={legalRepresentatives}
        {...form.register('legal_representative')}
      />
    </div>
    <div className="flex w-full flex-col">
      <span className="font-mona text-[18px]/[24px] font-semibold">Document</span>
      <Separator className="mb-8 mt-4" />
      <div className="grid grid-cols-4 gap-2">
        <FileInput
          name="Upload Sales Agreement"
          types={[MimeTypes.PDF]}
          handleFileChange={files => {
            form.setValue('floor_plan', files[0], {
              shouldValidate: true,
              shouldDirty: true
            });
          }}
        />

        <FileInput
          name="Upload Floor plan"
          types={[MimeTypes.PDF]}
          handleFileChange={files =>
            form.setValue('sales_agreement', files[0], {
              shouldValidate: true,
              shouldDirty: true
            })
          }
        />
        <FileInput
          name="Other"
          types={[MimeTypes.PDF]}
          handleFileChange={files => form.setValue('other_documents', files)}
          isMultiple
          disabled
        />
      </div>
    </div>
  </>
);

export const PropertyPricing = ({
  form,
  pricePerToken
}: {
  form: UseFormReturn<PropertyInput>;
  pricePerToken: number;
}) => {
  return (
    <div className=" flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col gap-1">
        <NumberInput
          label="NUMBER OF TOKENS"
          {...form.register('number_of_tokens')}
          max={100}
          thousandSeparator=","
          allowNegative={false}
          placeholder="0"
          disabled={true}
        />
        {pricePerToken !== 0 && (
          <span className="flex items-center justify-end text-[14px]/[20px] uppercase">
            Price per token : £ {pricePerToken}
          </span>
        )}
      </div>
      {/* <div className="flex w-full flex-col gap-2">
        <label htmlFor={'number of tokens'} className="text-[16px]/[24px] uppercase">
          Price per token
        </label>
        <div className="flex w-full items-center  rounded-lg border border-caption bg-white px-4 py-2">
          <span className="mr-1">£</span>
          <NumberInput
            thousandSeparator=","
            allowNegative={false}
            placeholder="0.00"
            {...form.register('price_per_token')}
            className="w-full border-0 p-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
      </div> */}
      {/* </div> */}
      {/* <div className="flex w-full items-center gap-2"> */}
      <div className="flex w-full flex-col gap-2">
        <label htmlFor={'number of tokens'} className="text-[16px]/[24px] uppercase">
          LISTING PRICE
        </label>
        <div className="flex w-full items-center gap-1 rounded-lg border border-caption bg-white px-4 py-2">
          <span>£</span>
          <NumberInput
            thousandSeparator=","
            allowNegative={false}
            placeholder="0.00"
            {...form.register('property_price')}
            className="w-full border-0 p-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor={'number of tokens'} className="text-[16px]/[24px] uppercase">
          estimated monthly rental income
        </label>
        <div className="flex w-full items-center gap-1 rounded-lg border border-caption bg-white px-4 py-2">
          <span>£</span>
          <NumberInput
            thousandSeparator=","
            allowNegative={false}
            placeholder="0.00"
            {...form.register('estimated_rental_income')}
            className="w-full border-0 p-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor={'number of tokens'}
          className="flex w-full items-center justify-between"
        >
          <span className="text-[16px]/[24px] uppercase"> ANNUAL SERVICE CHARGE</span>{' '}
          <span className="flex items-center gap-1">
            Paid{' '}
            <Checkbox
              checked={form.watch('isAnnualServiceChargePaid')}
              onCheckedChange={value => {
                form.setValue('isAnnualServiceChargePaid', value as boolean);
              }}
            />
          </span>
        </label>
        <div className="flex w-full items-center gap-1 rounded-lg border border-caption bg-white px-4 py-2">
          <span>£</span>
          <NumberInput
            thousandSeparator=","
            allowNegative={false}
            placeholder="0.00"
            {...form.register('annualServiceCharge')}
            className="w-full border-0 p-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
      </div>
      <div className=" flex w-full flex-col gap-2">
        <label
          htmlFor={'number of tokens'}
          className="flex w-full items-center justify-between"
        >
          <span className="text-[16px]/[24px] uppercase">STAMP DUTY TAX</span>{' '}
          <span className="flex items-center gap-1">
            Paid{' '}
            <Checkbox
              checked={form.watch('isStampDutyPaid')}
              onCheckedChange={value => {
                form.setValue('isStampDutyPaid', value as boolean);
              }}
            />
          </span>
        </label>
        <div className="flex w-full items-center gap-1 rounded-lg border border-caption bg-white px-4 py-2">
          <span>£</span>
          <NumberInput
            thousandSeparator=","
            allowNegative={false}
            placeholder="0.00"
            {...form.register('stampDutyTax')}
            className="w-full border-0 p-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  );
};

export const PropertyData = ({ form }: IForm) => (
  <>
    <div className="flex flex-col gap-5">
      <span className="font-mona text-[18px]/[24px] font-semibold">Property Features</span>
      <Separator className="mb-8 mt-4" />
      <div className="grid w-full grid-cols-3 gap-4">
        <Input
          type="text"
          label="INTERNAL AREA"
          placeholder=""
          {...form.register('area', { required: true })}
        />
        <Input
          type="text"
          label="FINISHING QUALITY"
          placeholder=""
          {...form.register('quality', { required: true })}
        />
        <Input
          type="date"
          label="CONSTRUCTION DATE"
          placeholder=""
          {...form.register('construction_date', { required: true })}
        />
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        <Input
          type="number"
          label="Number of Bedrooms"
          {...form.register('no_of_Bedrooms', { required: true })}
        />
        <Input
          type="number"
          label="Number of Bathrooms"
          {...form.register('no_of_bathrooms', { required: true })}
        />
        <Input
          type="text"
          label="Outdoor Space"
          {...form.register('outdoor_space', { required: true })}
        />
        <Input
          type="text"
          label="OFF STREET PARKING"
          placeholder=""
          {...form.register('Off_street_parking', { required: true })}
        />
      </div>
    </div>

    <div className="flex w-full flex-col">
      <span className="font-mona text-[18px]/[24px] font-semibold">Property Description</span>
      <Separator className="mb-8 mt-4" />
      <Textarea
        placeholder="description"
        className="min-h-[120px]"
        {...form.register('property_description', { required: true })}
      />
    </div>
    <div className="flex flex-col">
      <span className="font-mona text-[18px]/[24px] font-semibold">Property Images</span>
      <Separator className="mb-8 mt-4" />
      <div className="grid grid-cols-4 gap-2">
        <FileInput
          name="Upload Images"
          maxFiles={10}
          handleFileChange={files => {
            form.setValue('property_images', files);
            form.trigger(); // Trigger validation after setting the files
          }}
          isMultiple
        />
      </div>
    </div>
  </>
);
