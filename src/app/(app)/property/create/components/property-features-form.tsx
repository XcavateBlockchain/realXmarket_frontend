import FileInput from '@/components/file-input';
import { Button } from '@/components/ui/button';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { getCookieStorage } from '@/lib/cookie-storage';
import { addFileToProperty, upsertProperty } from '@/lib/dynamo';
import { uploadFileToS3 } from '@/lib/s3';
import { IPropertyFeatures, propertyFeaturesSchema } from '@/lib/validations/property-schema';
import { STATE_STATUS } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PropertyFeaturesForm({
  propertyId,
  setSuccess
}: {
  propertyId: number;
  setSuccess: (value: STATE_STATUS) => void;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const [uploadStatus, setUploadStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const form = useZodForm({
    schema: propertyFeaturesSchema
  });

  // console.log(form.watch('property_images'));

  async function onSubmit(data: IPropertyFeatures) {
    setStatus(STATE_STATUS.LOADING);
    setUploadStatus(STATE_STATUS.LOADING);
    setSuccess(STATE_STATUS.LOADING);
    console.log('Submitting...');
    // console.log(data);
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
      // Process images sequentially
      for (const file of data.property_images) {
        const formData = new FormData(); // <-- Move inside the loop
        formData.append('property_image', file);
        const fileKey = await uploadFileToS3(
          address,
          propertyId,
          'property_image',
          file.name,
          file.type,
          formData
        );
        await addFileToProperty(address, propertyId, fileKey);
      }
      setUploadStatus(STATE_STATUS.SUCCESS);
      toast.success('Files  ');
      const { property_images, ...newData } = data;
      await upsertProperty(address, propertyId, newData);
      setStatus(STATE_STATUS.SUCCESS);
      setSuccess(STATE_STATUS.SUCCESS);
      // router.push(`/developer/properties`);
    } catch (error) {
      toast.error('An error occurred while uploading images');
      console.log(error);
    } finally {
      setStatus(STATE_STATUS.SUCCESS);
      setSuccess(STATE_STATUS.SUCCESS);
    }
  }

  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="gap-[60px]">
      <div className="flex flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Property Features</span>
        <Separator className="mb-8 mt-4" />
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
      {/* orthers */}
      <div className="flex flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Extra</span>
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
            type="text"
            label="CONSTRUCTION DATE"
            placeholder=""
            {...form.register('construction_date', { required: true })}
          />

          <Input
            type="text"
            label="PROPERTY Development code"
            placeholder=""
            {...form.register('property_development_Code', { required: true })}
          />
          <Input
            type="text"
            label="Land registration code"
            placeholder="e.g"
            {...form.register('title_deed_number')}
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
      <div className="flex w-full items-center justify-center gap-4">
        <Button variant={'outline'}>Cancel</Button>
        <Button
          type="submit"
          className="text-white"
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            status === STATE_STATUS.LOADING
          }
        >
          Continue
        </Button>
      </div>
    </Form>
  );
}
