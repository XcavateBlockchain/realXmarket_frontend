import FileInput from '@/components/file-input';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { propertySchema } from '@/lib/validations/property-schema';

export default function PropertyFeaturesForm() {
  const form = useZodForm({
    schema: propertySchema
  });
  return (
    <Form form={form} className="gap-[60px]">
      <div className="flex flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Property Images</span>
        <Separator className="mb-8 mt-4" />
        <div className="grid w-full grid-cols-3 gap-4">
          <Input label="INTERNAL AREA" placeholder="" {...form.register('area')} />
          <Input label="FINISHING QUALITY" placeholder="" {...form.register('area')} />
          <Input label="CONSTRUCTION DATE" placeholder="" {...form.register('area')} />
          <Input label="OFF STREET PARKING" placeholder="" {...form.register('area')} />
          <Input label="PROPERTY TYPE" placeholder="" {...form.register('area')} />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">
          Property Description
        </span>
        <Separator className="mb-8 mt-4" />
        <Textarea placeholder="description" />
      </div>
      <div className="flex flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Property Images</span>
        <Separator className="mb-8 mt-4" />
        <FileInput
          name="Upload Images"
          handleFileChange={files => console.log(files)}
          isMultiple
        />
      </div>
    </Form>
  );
}
