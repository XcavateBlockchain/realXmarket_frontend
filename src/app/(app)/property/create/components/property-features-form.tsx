import FileInput from '@/components/file-input';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { getCookieStorage } from '@/lib/cookie-storage';
import {
  IPropertyInformationInput,
  propertyFeaturesSchema,
  propertySchema
} from '@/lib/validations/property-schema';
import { STATE_STATUS } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PropertyFeaturesForm() {
  const form = useZodForm({
    schema: propertyFeaturesSchema
  });

  async function onSubmit(data: IPropertyInformationInput) {
    const router = useRouter();
    const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
    const [uploadStatus, setUploadStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
    } catch (error) {}
  }

  return (
    <Form form={form} className="gap-[60px]">
      <div className="flex flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Property Features</span>
        <Separator className="mb-8 mt-4" />
        <div className="grid w-full grid-cols-3 gap-4">
          <Input type="text" label="Number of Bedrooms" {...form.register('no_of_Bedrooms')} />
          <Input
            type="text"
            label="Number of Bathrooms"
            {...form.register('number_of_bathrooms')}
          />
          <Input type="text" label="Outdoor Space" {...form.register('outdoor_space')} />
          <Input type="text" label="Outdoor Space" {...form.register('outdoor_space')} />
          <Input
            type="text"
            label="OFF STREET PARKING"
            placeholder=""
            {...form.register('Off_street_parking')}
          />
        </div>
      </div>
      {/* orthers */}
      <div className="flex flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Extra</span>
        <Separator className="mb-8 mt-4" />
        <div className="grid w-full grid-cols-3 gap-4">
          <Input type="text" label="INTERNAL AREA" placeholder="" {...form.register('area')} />
          <Input
            type="text"
            label="FINISHING QUALITY"
            placeholder=""
            {...form.register('quality')}
          />
          <Input
            type="date"
            label="CONSTRUCTION DATE"
            placeholder=""
            {...form.register('construction_date')}
          />

          <Input
            type="text"
            label="PROPERTY Development code"
            placeholder=""
            {...form.register('property_development_Code')}
          />
          <Input
            type="text"
            label="Planing permission code"
            placeholder=""
            {...form.register('planning_permission_Code')}
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">
          Property Description
        </span>
        <Separator className="mb-8 mt-4" />
        <Textarea
          placeholder="description"
          className="min-h-[120px]"
          {...form.register('property_description')}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Property Images</span>
        <Separator className="mb-8 mt-4" />
        <FileInput
          name="Upload Images"
          handleFileChange={files => form.setValue('property_images', files)}
          isMultiple
        />
      </div>
    </Form>
  );
}
