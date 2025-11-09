'use client';
import { Button } from '@/components/ui/button';
import { useZodForm } from '@/components/ui/form';
import {
  propertyMetadataFormSchema,
  PropertyMetadataFormInput,
  propertyMetadataSchema,
  PropertyMetadataInput
} from '@/lib/validations/property-schema';
import { PropertyStatus, PropertyType } from '@/lib/property-model';
import { useState } from 'react';
import { PropertyData, PropertyDetails, PropertyPricing } from './property-forms';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import Form from '@/components/ui/form';
import { getCookieStorage } from '@/lib/cookie-storage';
import { useWalletContext } from '@/context/wallet-context';
import { STATE_STATUS } from '@/types';
import { uploadFileToS3 } from '@/lib/s3';
import { createProperty, addFileToProperty } from '@/lib/properties.service';
import Image from 'next/image';
import { developers, findDeveloperByPartnerAddress } from '@/config/white-list';

export default function CreatePropertyForm() {
  const { setModalOpen, selectedAccount } = useWalletContext();
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const [imageUploadStatus, setImageUploadStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const [floorPlanUploadStatus, setFloorPlanUploadStatus] = useState<STATE_STATUS>(
    STATE_STATUS.IDLE
  );
  const [salesAgreementUploadStatus, setSalesAgreementUploadStatus] = useState<STATE_STATUS>(
    STATE_STATUS.IDLE
  );

  const address = selectedAccount?.[0]?.address;
  const developer = findDeveloperByPartnerAddress(address!) || developers[0];

  const company = {
    name: developer.name,
    logo: developer.logo
  };

  const form = useZodForm({
    schema: propertyMetadataFormSchema,
    defaultValues: {
      financials: {
        numberOfTokens: '100'
      }
    }
  });

  const propertyPrice = parseInt(
    form.watch('financials.propertyPrice')?.replace(/,/g, '') || '0'
  );
  const numberOfTokens = parseInt(
    form.watch('financials.numberOfTokens')?.replace(/,/g, '') || '0'
  );

  const tokenPrice = propertyPrice / numberOfTokens;

  const {
    formState: { errors },
    trigger
  } = form;

  // Define field groups for each page
  const pageFields = {
    0: [
      'propertyName',
      'address.street',
      'address.townCity',
      'address.postCode',
      'propertyType',
      'address.flatOrUnit',
      'address.localAuthority',
      'planningCode',
      'map',
      'floorPlan',
      'salesAgreement',
      'buildingControlCode',
      'legalRepresentative'
    ] as const,
    1: [
      'financials.numberOfTokens',
      'financials.propertyPrice',
      'financials.estimatedRentalIncome',
      'financials.annualServiceCharge',
      'financials.stampDutyTax'
    ] as const,
    2: [
      'attributes.area',
      'attributes.quality',
      'attributes.outdoorSpace',
      'attributes.numberOfBedrooms',
      'attributes.constructionDate',
      'attributes.numberOfBathrooms',
      'attributes.offStreetParking',
      'propertyDescription',
      'propertyImages'
    ] as const
  };

  const getCurrentPageProgress = () => {
    const currentPageFields = pageFields[page as keyof typeof pageFields];
    const filledFields = currentPageFields.filter(field => {
      const value = form.getValues(field);
      return value !== undefined && value !== null && value !== '';
    });

    return {
      total: currentPageFields.length,
      filled: filledFields.length,
      percentage: Math.round((filledFields.length / currentPageFields.length) * 100)
    };
  };

  const canSubmitCurrentPage = () => {
    const currentPageFields = pageFields[page as keyof typeof pageFields];

    // Check if all required fields for the current page are filled and valid
    const allFieldsFilled = currentPageFields.every(field => {
      const value = form.getValues(field);
      return value !== undefined && value !== null && value !== '';
    });

    const noErrors = currentPageFields.every(field => !errors[field as keyof typeof errors]);

    return allFieldsFilled && noErrors;
  };

  //   const isCurrentPageValidAndDirty = () => {
  //     const currentPageFields = pageFields[page as keyof typeof pageFields];

  //     // Check if any required fields are dirty (user has interacted with the form)
  //     const hasRequiredDirtyFields = currentPageFields.some(
  //       field => dirtyFields[field as keyof typeof dirtyFields]
  //     );

  //     // Check if there are any validation errors on current page
  //     const hasPageErrors = currentPageFields.some(
  //       field => errors[field as keyof typeof errors]
  //     );

  //     // For the first page, we need at least some basic fields to be filled
  //     if (page === 0) {
  //       const essentialFields = ['property_name', 'address_street', 'property_type'] as const;
  //       const hasEssentialFields = essentialFields.some(field => dirtyFields[field]);
  //       return hasEssentialFields && !hasPageErrors;
  //     }

  //     // For other pages, require at least one field to be dirty and no errors
  //     return hasRequiredDirtyFields && !hasPageErrors;
  //   };

  const handleNext = async () => {
    const currentPageFields = pageFields[page as keyof typeof pageFields];

    // Validate current page fields
    const isValid = await trigger(currentPageFields);

    if (isValid) {
      setPage(page + 1);
    } else {
      // If validation fails, scroll to the first error
      const firstErrorField = currentPageFields.find(
        field => errors[field as keyof typeof errors]
      );
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  const pages = {
    0: <PropertyDetails form={form} />,
    1: <PropertyPricing form={form} pricePerToken={tokenPrice} />,
    2: <PropertyData form={form} />
  };

  //   const handlePrevious = () => {
  //     setPage(page - 1);
  //   };

  // Helper function to map form property type string to PropertyType enum
  const mapPropertyType = (formType: string): PropertyType => {
    const typeMap: Record<string, PropertyType> = {
      Apartment: PropertyType.Apartment,
      Flat: PropertyType.Apartment, // Map Flat to Apartment
      Bungalow: PropertyType.House, // Map Bungalow to House
      Detached: PropertyType.House, // Map Detached to House
      'Semi-Detached': PropertyType.House, // Map Semi-Detached to House
      Terraced: PropertyType.Townhouse, // Map Terraced to Townhouse
      House: PropertyType.House,
      Townhouse: PropertyType.Townhouse,
      Land: PropertyType.Land,
      Commercial: PropertyType.Commercial
    };
    return typeMap[formType] || PropertyType.Apartment; // Default to Apartment if not found
  };

  const onSubmit = async (data: PropertyMetadataFormInput) => {
    setStatus(STATE_STATUS.LOADING);

    try {
      // Check if user is connected
      const address = await getCookieStorage('accountKey');
      if (!address) {
        setModalOpen(true);
        setImageUploadStatus(STATE_STATUS.IDLE);
        setFloorPlanUploadStatus(STATE_STATUS.IDLE);
        setSalesAgreementUploadStatus(STATE_STATUS.IDLE);
        setStatus(STATE_STATUS.IDLE);
        return;
      }

      // Transform form data to PropertyMetadata structure
      const propertyPriceNum = parseFloat(data.financials.propertyPrice.replace(/,/g, ''));
      const numberOfTokensNum = parseInt(data.financials.numberOfTokens.replace(/,/g, ''));
      const pricePerTokenNum = propertyPriceNum / numberOfTokensNum;
      const estimatedRentalIncomeNum = parseFloat(
        data.financials.estimatedRentalIncome.replace(/,/g, '')
      );
      const annualServiceChargeNum = parseFloat(
        data.financials.annualServiceCharge.replace(/,/g, '')
      );
      const stampDutyTaxNum = parseFloat(data.financials.stampDutyTax.replace(/,/g, ''));

      const now = new Date().toISOString();
      const propertyId = crypto.randomUUID();

      // Build PropertyMetadata object
      const propertyMetadata: PropertyMetadataInput = {
        id: propertyId,
        status: PropertyStatus.Draft,
        developerAddress: address,
        propertyName: data.propertyName,
        propertyType: mapPropertyType(data.propertyType),
        address: data.address,
        planningCode: data.planningCode,
        buildingControlCode: data.buildingControlCode,
        legalRepresentative: data.legalRepresentative,
        map: data.map || undefined, // Convert empty string to undefined for optional field
        financials: {
          propertyPrice: propertyPriceNum,
          numberOfTokens: numberOfTokensNum,
          pricePerToken: pricePerTokenNum,
          estimatedRentalIncome: estimatedRentalIncomeNum,
          annualServiceCharge: annualServiceChargeNum,
          stampDutyTax: stampDutyTaxNum,
          isStampDutyPaid: data.financials.isStampDutyPaid || false,
          isAnnualServiceChargePaid: data.financials.isAnnualServiceChargePaid || false
        },
        attributes: {
          area: data.attributes.area,
          quality: data.attributes.quality,
          outdoorSpace: data.attributes.outdoorSpace,
          numberOfBedrooms: parseInt(data.attributes.numberOfBedrooms),
          numberOfBathrooms: parseInt(data.attributes.numberOfBathrooms),
          constructionDate: data.attributes.constructionDate,
          offStreetParking: data.attributes.offStreetParking
        },
        propertyDescription: data.propertyDescription,
        company: {
          name: company.name,
          logo: company.logo
        },
        createdAt: now,
        updatedAt: now
      };

      // Validate against propertyMetadataSchema
      const validationResult = propertyMetadataSchema.safeParse(propertyMetadata);
      if (!validationResult.success) {
        throw new Error(
          `Validation failed: ${validationResult.error.errors.map(e => e.message).join(', ')}`
        );
      }

      // Create property first - transform back to flat structure for API compatibility
      const { floorPlan, salesAgreement, propertyImages } = data;

      const newData = {
        // property_name: propertyMetadata.propertyName,
        // address_street: propertyMetadata.address.street,
        // address_town_city: propertyMetadata.address.townCity,
        // post_code: propertyMetadata.address.postCode,
        // property_type: propertyMetadata.propertyType,
        // property_number: propertyMetadata.address.flatOrUnit,
        // local_authority: propertyMetadata.address.localAuthority,
        // planning_permission_Code: propertyMetadata.planningCode,
        // map: propertyMetadata.map,
        // building_control_code: propertyMetadata.buildingControlCode,
        // legal_representative: propertyMetadata.legalRepresentative,
        // number_of_tokens: propertyMetadata.financials.numberOfTokens,
        // price_per_token: propertyMetadata.financials.pricePerToken,
        // property_price: propertyMetadata.financials.propertyPrice,
        // estimated_rental_income: propertyMetadata.financials.estimatedRentalIncome || 0,
        // annualServiceCharge: propertyMetadata.financials.annualServiceCharge || 0,
        // stampDutyTax: propertyMetadata.financials.stampDutyTax || 0,
        // isStampDutyPaid: propertyMetadata.financials.isStampDutyPaid || false,
        // isAnnualServiceChargePaid:
        //   propertyMetadata.financials.isAnnualServiceChargePaid || false,
        // area: propertyMetadata.attributes?.area || '',
        // quality: propertyMetadata.attributes?.quality || '',
        // outdoor_space: propertyMetadata.attributes?.outdoorSpace || '',
        // no_of_Bedrooms: String(propertyMetadata.attributes?.numberOfBedrooms || ''),
        // no_of_bathrooms: String(propertyMetadata.attributes?.numberOfBathrooms || ''),
        // construction_date: propertyMetadata.attributes?.constructionDate || '',
        // Off_street_parking: propertyMetadata.attributes?.offStreetParking || '',
        // property_description: propertyMetadata.propertyDescription || '',
        ...propertyMetadata,
        company
      };

      const property = await createProperty(address, newData);
      if (!property) {
        throw new Error('Failed to create property');
      }

      // Upload documents
      const uploadPromises: Promise<{ type: string; result: string | null }>[] = [];

      // Upload floor plan if provided
      if (floorPlan) {
        setFloorPlanUploadStatus(STATE_STATUS.LOADING);
        const floorPlanFormData = new FormData();
        floorPlanFormData.append('floor_plan', floorPlan);

        uploadPromises.push(
          uploadFileToS3(
            address,
            property.propertyId,
            'floor_plan',
            floorPlan.name,
            floorPlan.type,
            floorPlanFormData
          ).then(result => ({ type: 'floor_plan', result }))
        );
      }

      // Upload sales agreement if provided
      if (salesAgreement) {
        setSalesAgreementUploadStatus(STATE_STATUS.LOADING);
        const salesFormData = new FormData();
        salesFormData.append('sales_agreement', salesAgreement);

        uploadPromises.push(
          uploadFileToS3(
            address,
            property.propertyId,
            'sales_agreement',
            salesAgreement.name,
            salesAgreement.type,
            salesFormData
          ).then(result => ({ type: 'sales_agreement', result }))
        );
      }

      // Upload property images
      for (const file of propertyImages) {
        setImageUploadStatus(STATE_STATUS.LOADING);
        const formData = new FormData();
        formData.append('property_image', file);

        uploadPromises.push(
          uploadFileToS3(
            address,
            property.propertyId,
            'property_image',
            file.name,
            file.type,
            formData
          ).then(result => ({ type: 'property_image', result }))
        );
      }

      // Wait for all uploads to complete
      const uploadResults = await Promise.all(uploadPromises);

      // Update individual upload statuses
      const floorPlanResult = uploadResults.find(r => r.type === 'floor_plan');
      if (floorPlanResult) {
        setFloorPlanUploadStatus(
          floorPlanResult.result ? STATE_STATUS.SUCCESS : STATE_STATUS.ERROR
        );
      }

      const salesAgreementResult = uploadResults.find(r => r.type === 'sales_agreement');
      if (salesAgreementResult) {
        setSalesAgreementUploadStatus(
          salesAgreementResult.result ? STATE_STATUS.SUCCESS : STATE_STATUS.ERROR
        );
      }

      const imageResults = uploadResults.filter(r => r.type === 'property_image');

      const successfulImageUploads = imageResults.filter(r => r.result !== null);
      if (imageResults.length > 0) {
        setImageUploadStatus(
          successfulImageUploads.length === imageResults.length
            ? STATE_STATUS.SUCCESS
            : STATE_STATUS.ERROR
        );
      }

      const successfulUploads = uploadResults.filter(result => result.result !== null);

      if (successfulUploads.length === 0) {
        throw new Error('Failed to upload any documents. Please try again.');
      }

      // Add all successful uploads to the property
      await Promise.all(
        successfulUploads.map(uploadResult =>
          addFileToProperty(address, property.propertyId, uploadResult.result!)
        )
      );

      setStatus(STATE_STATUS.SUCCESS);
      // You might want to redirect or show success message here
    } catch (error) {
      setStatus(STATE_STATUS.ERROR);

      // Provide more specific error messages
      let errorMessage = 'Error creating property. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('Failed to create property')) {
          errorMessage = 'Failed to create property. Please check your input and try again.';
        } else if (error.message.includes('Failed to upload')) {
          errorMessage =
            'Property created but failed to upload documents. Please try uploading documents again.';
        } else {
          errorMessage = error.message;
        }
      }

      alert(errorMessage);
    }
  };

  return (
    <>
      <section className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            href={'/developer/properties'}
            className="flex size-10 items-center justify-center rounded-full bg-foreground/10 transition-all duration-300 hover:bg-foreground/25"
          >
            <Icons.arroWBack className="size-7 text-foreground" />
          </Link>
          <span className="text-[18px]/[24px]">Add property</span>
        </div>

        <div className="flex items-center">
          <Step
            current={page === 0}
            passed={page !== 0}
            step={1}
            title="Property information"
          />
          <Icons.arrowRight className="size-8" />
          <Step current={page === 1} passed={page > 1} step={2} title="Pricing details" />
          <Icons.arrowRight className="size-8" />
          <Step current={page === 2} passed={page > 2} step={3} title="Additional details" />
        </div>
      </section>
      <section
        className={cn('w-full bg-[#FAFAFA] px-[42px] py-10', {
          'max-w-[574px]': page === 1
        })}
      >
        <Form form={form} onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Page {page + 1} of 3:{' '}
                {page === 0
                  ? 'Property Details'
                  : page === 1
                    ? 'Pricing Details'
                    : 'Property Features'}
              </span>
              <span className="text-sm text-gray-600">
                {getCurrentPageProgress().filled} of {getCurrentPageProgress().total} fields
                completed
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${getCurrentPageProgress().percentage}%` }}
              />
            </div>
          </div>

          {pages[page as keyof typeof pages]}

          <div className="mt-10 flex w-full items-center justify-center gap-4">
            <Button
              type="button"
              className=" md:h-[50px] md:w-[208px]"
              variant={'outline'}
              asChild
            >
              <Link href={'/developer'}>Cancel</Link>
            </Button>

            {page !== 2 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="text-white  md:h-[50px] md:w-[208px]"
                disabled={!canSubmitCurrentPage()}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                className="text-white md:h-[50px] md:w-[208px]"
                disabled={!canSubmitCurrentPage() || status === STATE_STATUS.LOADING}
              >
                {status === STATE_STATUS.LOADING ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Creating Property...
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            )}
          </div>
        </Form>
      </section>

      {(status === STATE_STATUS.LOADING || status === STATE_STATUS.SUCCESS) && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/[0.50] backdrop-blur-sm">
          <div className="flex min-h-[382px] w-full max-w-[518px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-6">
            {status === STATE_STATUS.SUCCESS ? (
              <>
                <div className="size-[100px] rounded-full border-2 border-primary">
                  <Image
                    src={'/icons/verify_your_identity.svg'}
                    width={100}
                    height={100}
                    alt="success"
                  />
                </div>
                <div className="space-y-4 text-center">
                  <h1 className="text-[18px]/[24px] font-bold">
                    Property Created Successfully
                  </h1>
                  <p className="text-[14px]/[24px] ">
                    Your property token has been created, and the information you supplied is
                    now under review by our compliance team. You can view it anytime in your
                    Draft. Once it passes review, it will move to your Approved section, where
                    you can list it on the <span className="font-bold">RealXMarket</span> for
                    investors.
                  </p>
                </div>

                <Button asChild>
                  <Link href={'/developer'}>View Draft</Link>
                </Button>
              </>
            ) : (
              <>
                <h1 className="text-center text-[18px]/[24px] font-bold">
                  Creating Property for {developer.name} <br /> on RealXMarket
                </h1>
                <div className="flex w-full flex-col gap-6">
                  <StatusDisplay
                    step={1}
                    title="Uploading Floor Plan Document"
                    status={floorPlanUploadStatus}
                  />
                  <StatusDisplay
                    step={2}
                    title="Uploading Sales Agreement Document"
                    status={salesAgreementUploadStatus}
                  />
                  <StatusDisplay
                    step={3}
                    title="Uploading Property Images"
                    status={imageUploadStatus}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Step({
  current,
  passed,
  step,
  title
}: {
  current: boolean;
  title: string;
  step: number;
  passed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'flex size-7 items-center justify-center rounded-full border border-[#9D9D9D] font-mona text-[14px]/[13.5px] font-semibold text-[#9D9D9D]',
          {
            'border-[#457461] text-[#457461]': current,
            'bg-primary text-white': passed
          }
        )}
      >
        {step}
      </span>
      <span
        className={cn('font-sans text-[14px]/[24px]', {
          'border-[#457461] text-[#457461]': current,
          'text-primary': passed
        })}
      >
        {title}
      </span>
    </div>
  );
}

function StatusDisplay({
  step,
  title,
  status
}: {
  step: number;
  title: string;
  status: STATE_STATUS;
}) {
  return (
    <div className="flex w-full items-center justify-between rounded-lg bg-[#E9EBEC] px-4 py-2">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'flex size-6 items-center justify-center rounded-full border border-[#9D9D9D] font-mona text-[14px]/[13.5px] font-semibold text-[#9D9D9D]',
            {
              'border-primary-400': status === STATE_STATUS.LOADING,
              'bg-primary': status === STATE_STATUS.SUCCESS,
              'border-red-400 text-red-400': status === STATE_STATUS.ERROR
            }
          )}
        >
          {step}
        </span>
        <span
          className={cn('font-sans text-[14px]/[24px] font-bold', {
            'text-primary': status === STATE_STATUS.SUCCESS,
            'text-red-400': status === STATE_STATUS.ERROR,
            'text-primary-400': status === STATE_STATUS.LOADING
          })}
        >
          {title}
        </span>
      </div>
      <UploadStatusIndicator status={status} />
    </div>
  );
}

function UploadStatusIndicator({ status }: { status: STATE_STATUS }) {
  switch (status) {
    case STATE_STATUS.LOADING:
      return (
        <div className="flex items-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
          <span className="text-xs text-gray-500">Uploading...</span>
        </div>
      );
    case STATE_STATUS.SUCCESS:
      return (
        <div className="flex items-center gap-2">
          <div className="flex size-4 items-center justify-center rounded-full bg-green-500">
            <svg className="size-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xs text-green-600">Uploaded</span>
        </div>
      );
    case STATE_STATUS.ERROR:
      return (
        <div className="flex items-center gap-2">
          <div className="flex size-4 items-center justify-center rounded-full bg-red-500">
            <svg className="size-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xs text-red-600">Failed</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full border-2 border-gray-300"></div>
          <span className="text-xs text-gray-400">Pending</span>
        </div>
      );
  }
}
