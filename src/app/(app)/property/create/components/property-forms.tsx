import FileInput, { MimeTypes } from '@/components/file-input';
import NumberInput from '@/components/number-input';
import SelectInput from '@/components/select-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  legalRepresentatives,
  localAuthorities,
  PropertyMetadataFormInput,
  propertyTypes
} from '@/lib/validations/property-schema';
import { UseFormReturn } from 'react-hook-form';

interface IForm {
  form: UseFormReturn<PropertyMetadataFormInput>;
}

export const PropertyDetails = ({ form }: IForm) => (
  <>
    <Input type="text" label="Property name" {...form.register('propertyName')} />
    <div className="grid w-full grid-cols-3 gap-2">
      <Input
        type="text"
        label="Property Address"
        placeholder="Street"
        {...form.register('address.street')}
      />
      <Input
        type="text"
        label="Town / City"
        placeholder="Town/City"
        {...form.register('address.townCity')}
      />
      <Input
        type="text"
        label="Postal Code"
        placeholder="Postal code"
        {...form.register('address.postCode')}
      />
    </div>
    <div className="grid w-full grid-cols-2 gap-2">
      <Input
        type="text"
        label="Flat or Unit"
        placeholder=""
        {...form.register('address.flatOrUnit')}
      />
      <SelectInput
        label="Property Type"
        placeholder="select"
        options={propertyTypes}
        {...form.register('propertyType')}
      />
    </div>
    <div className="grid w-full grid-cols-3 gap-2">
      <SelectInput
        label="Local Authority"
        placeholder="select"
        options={localAuthorities}
        {...form.register('address.localAuthority')}
      />
      <Input
        type="text"
        label="Planning code"
        placeholder=""
        {...form.register('planningCode', { required: true })}
      />
      <Input type="text" label="google map link" placeholder="" {...form.register('map')} />
    </div>
    <div className="grid w-full grid-cols-3 gap-2">
      <Input
        type="text"
        label="BUILDING CONTROL CODE"
        placeholder=""
        {...form.register('buildingControlCode')}
      />
      <SelectInput
        label="ADD A LEGAL REPRESENTATIVE"
        placeholder="select"
        options={legalRepresentatives}
        {...form.register('legalRepresentative')}
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
            form.setValue('floorPlan', files[0], {
              shouldValidate: true,
              shouldDirty: true
            });
          }}
        />

        <FileInput
          name="Upload Floor plan"
          types={[MimeTypes.PDF]}
          handleFileChange={files =>
            form.setValue('salesAgreement', files[0], {
              shouldValidate: true,
              shouldDirty: true
            })
          }
        />
        <FileInput
          name="Other"
          types={[MimeTypes.PDF]}
          handleFileChange={files => form.setValue('otherDocuments', files)}
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
  form: UseFormReturn<PropertyMetadataFormInput>;
  pricePerToken: number;
}) => {
  return (
    <div className=" flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col gap-1">
        <NumberInput
          label="NUMBER OF TOKENS"
          {...form.register('financials.numberOfTokens')}
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
            {...form.register('financials.propertyPrice')}
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
            {...form.register('financials.estimatedRentalIncome')}
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
              checked={form.watch('financials.isAnnualServiceChargePaid')}
              onCheckedChange={value => {
                form.setValue('financials.isAnnualServiceChargePaid', value as boolean);
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
            {...form.register('financials.annualServiceCharge')}
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
              checked={form.watch('financials.isStampDutyPaid')}
              onCheckedChange={value => {
                form.setValue('financials.isStampDutyPaid', value as boolean);
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
            {...form.register('financials.stampDutyTax')}
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
          {...form.register('attributes.area', { required: true })}
        />
        <Input
          type="text"
          label="FINISHING QUALITY"
          placeholder=""
          {...form.register('attributes.quality', { required: true })}
        />
        <Input
          type="date"
          label="CONSTRUCTION DATE"
          placeholder=""
          {...form.register('attributes.constructionDate', { required: true })}
        />
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        <Input
          type="number"
          label="Number of Bedrooms"
          {...form.register('attributes.numberOfBedrooms', { required: true })}
        />
        <Input
          type="number"
          label="Number of Bathrooms"
          {...form.register('attributes.numberOfBathrooms', { required: true })}
        />
        <Input
          type="text"
          label="Outdoor Space"
          {...form.register('attributes.outdoorSpace', { required: true })}
        />
        <Input
          type="text"
          label="OFF STREET PARKING"
          placeholder=""
          {...form.register('attributes.offStreetParking', { required: true })}
        />
      </div>
    </div>

    <div className="flex w-full flex-col">
      <span className="font-mona text-[18px]/[24px] font-semibold">Property Description</span>
      <Separator className="mb-8 mt-4" />
      <Textarea
        placeholder="description"
        className="min-h-[120px]"
        {...form.register('propertyDescription', { required: true })}
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
            form.setValue('propertyImages', files);
            form.trigger(); // Trigger validation after setting the files
          }}
          isMultiple
        />
      </div>
    </div>
  </>
);
