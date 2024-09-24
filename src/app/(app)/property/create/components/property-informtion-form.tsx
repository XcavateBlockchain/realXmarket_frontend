import FileInput, { MimeTypes } from '@/components/file-input';
import SelectInput from '@/components/select-input';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { propertyInformationSchema } from '@/lib/validations/property-schema';
import { Option } from '@/types';

const propertyTypes: Option[] = [
  {
    label: 'Apartment',
    value: 'Apartment'
  },
  {
    label: 'Flat',
    value: 'Flat'
  }
];

export default function PropertyInformationForm() {
  const form = useZodForm({
    schema: propertyInformationSchema
  });
  return (
    <Form form={form}>
      <Input label="Property name" />
      <div className="grid w-full grid-cols-2 gap-2">
        <SelectInput
          label="Region"
          placeholder="select"
          options={propertyTypes}
          {...form.register('property_type')}
        />
        <SelectInput
          label="Property Type"
          placeholder="select"
          options={propertyTypes}
          {...form.register('property_type')}
        />
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        <Input label="Property Address" placeholder="Street" />
        <Input label="Town / City" placeholder="Town/City" />
        <Input label="Postal Code" placeholder="Postal code" />
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        <Input label="local authority" placeholder="e.g" />
        <Input label="title deed number" placeholder="e.g" />
        <Input label="google map link" placeholder="e.g" />
      </div>
      <div className="flex w-full flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Document</span>
        <Separator className="mb-8 mt-4" />
        <FileInput name="Upload documents" types={[MimeTypes.PDF]} />
      </div>
    </Form>
  );
}
