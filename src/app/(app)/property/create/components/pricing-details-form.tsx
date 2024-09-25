import NumberInput from '@/components/number-input';
import { Button } from '@/components/ui/button';
import Form, { useZodForm } from '@/components/ui/form';
import { IPricingDetails, propertyPricingSchema } from '@/lib/validations/property-schema';
import { STATE_STATUS } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PricingDetailsForm({ propertyId }: { propertyId: number }) {
  const router = useRouter();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);

  const form = useZodForm({
    schema: propertyPricingSchema
  });

  const [priceInUSD, setPriceInUSD] = useState(0.0);
  // const price = form.watch('property_price');
  // console.log(price);
  // function onChange() {
  //   if (price) {
  //     console.log(price);
  //     const formattedAmount = parseFloat(price.replace(/,/g, ''));
  //     setPriceInUSD(formattedAmount * 1.2);
  //   }
  // }

  // useEffect(() => {
  //   onChange();
  // }, [price]);

  async function onSubmit(data: IPricingDetails) {
    console.log(data);
    console.log(propertyId);
    router.push(`/property/create?id=${propertyId}&page=property-features`);
  }

  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <NumberInput
        label="NUMBER OF TOKENS"
        {...form.register('number_of_tokens')}
        thousandSeparator=","
        allowNegative={false}
        placeholder="0.00"
      />
      <div className="flex w-full items-end gap-2">
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor={'number of tokens'}
            className="text-[16px]/[24px] font-medium uppercase"
          >
            Price
          </label>
          <div className="flex w-full items-center gap-1 rounded-lg border border-[#A6A6A6] bg-white px-4 py-2">
            <span>£</span>
            <NumberInput
              thousandSeparator=","
              allowNegative={false}
              placeholder="0.00"
              {...form.register('price_per_token')}
              className="border-0 p-0 focus:outline-none focus-visible:ring-0"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-1 rounded-lg border border-[#A6A6A6] bg-white px-4 py-2">
          <span>USD</span>
          <span>{priceInUSD}</span>
        </div>
      </div>
      <NumberInput
        label="estimated monthly rental income"
        {...form.register('estimated_rental_income')}
      />
      <NumberInput label="Price per token" {...form.register('price_per_token')} />
      <div className="flex w-full items-center justify-end gap-4">
        <Button variant={'outline'} size={'md'}>
          Cancel
        </Button>
        <Button
          type="submit"
          size={'md'}
          className="text-white"
          disabled={
            !form.formState || !form.formState.isValid || status === STATE_STATUS.LOADING
          }
        >
          Continue
        </Button>
      </div>
    </Form>
  );
}
