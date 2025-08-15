import NumberInput from '@/components/number-input';
import { Button } from '@/components/ui/button';
import Form, { useZodForm } from '@/components/ui/form';
import { getCookieStorage } from '@/lib/cookie-storage';
import { upsertProperty } from '@/lib/dynamo';
import { IPricingDetails, propertyPricingSchema } from '@/lib/validations/property-schema';
import { STATE_STATUS } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function PricingDetailsForm({ propertyId }: { propertyId: number }) {
  const router = useRouter();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);

  const form = useZodForm({
    schema: propertyPricingSchema
  });
  // const [priceInUSD, setPriceInUSD] = useState(0.0);
  async function onSubmit(data: IPricingDetails) {
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
      const newData = {
        number_of_tokens: parseInt(data.number_of_tokens.replace(/,/g, '')),
        price_per_token: parseFloat(data.price_per_token.replace(/,/g, '')),
        property_price: parseFloat(data.property_price.replace(/,/g, '')),
        estimated_rental_income: parseFloat(data.estimated_rental_income.replace(/,/g, ''))
      };
      await upsertProperty(address, propertyId, newData);
      toast.success('Success!, Price set');
      router.push(`/property/create?id=${propertyId}&page=property-features`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-center gap-2">
        <NumberInput
          label="NUMBER OF TOKENS"
          {...form.register('number_of_tokens')}
          max={100}
          thousandSeparator=","
          allowNegative={false}
          placeholder="0"
        />
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor={'number of tokens'}
            className="text-[16px]/[24px] font-medium uppercase"
          >
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
        </div>
        {/* </div> */}
        {/* <div className="flex w-full items-center gap-2"> */}
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor={'number of tokens'}
            className="text-[16px]/[24px] font-medium uppercase"
          >
            Price
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
          <label
            htmlFor={'number of tokens'}
            className="text-[16px]/[24px] font-medium uppercase"
          >
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
      </div>
      <div className="mt-10 flex w-full items-center justify-center gap-4">
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
