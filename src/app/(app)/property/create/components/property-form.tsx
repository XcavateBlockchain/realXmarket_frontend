'use client';

import { Icons } from '@/components/icons';

import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import PropertyInformationForm from './property-informtion-form';
import PricingDetailsForm from './pricing-details-form';
import PropertyFeaturesForm from './property-features-form';
import { CircleCheckBig, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { STATE_STATUS } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PropertyForm() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id') ?? Date.now();
  const step = searchParams.get('page') ?? 'property-information';
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);

  const current: any = {
    'property-information': 0,
    'pricing-details': 1,
    'property-features': 2
  };

  const steps = [
    <PropertyInformationForm key={1} propertyId={Number(propertyId)} />,
    <PricingDetailsForm key={2} propertyId={Number(propertyId)} />,
    <PropertyFeaturesForm key={3} propertyId={Number(propertyId)} setSuccess={setStatus} />
  ];

  return (
    <>
      <section className="flex w-full items-center justify-between gap-2">
        <Link href={'/developer/properties'} className="flex items-center gap-2 ">
          <span className="size-10 rounded-lg border border-primary p-3.5">
            <Icons.back className="size-3" />
          </span>
          <span className="font-mona text-[18px]/[24px]"> Back</span>
        </Link>

        <div className="flex items-center">
          <Step
            current={current[step] === 0}
            passed={current[step] !== 0}
            step={1}
            title="Property information"
          />
          <Icons.arrowRight className="size-8" />
          <Step
            current={current[step] === 1}
            passed={current[step] > 1}
            step={2}
            title="Pricing details"
          />
          <Icons.arrowRight className="size-8" />
          <Step
            current={current[step] === 2}
            passed={current[step] > 2}
            step={3}
            title="Additional details"
          />
        </div>
      </section>
      {status === STATE_STATUS.LOADING || status === STATE_STATUS.SUCCESS ? (
        <SuccessDisplay status={status} />
      ) : (
        <section className="w-full bg-[#FAFAFA] px-[42px] py-10">
          {steps[current[step]]}
        </section>
      )}{' '}
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
  step: any;
  passed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {passed ? (
        <span className="flex size-7 items-center justify-center rounded-full bg-[#78B36E] text-white">
          <CircleCheckBig size={16} />
        </span>
      ) : (
        <span
          className={cn(
            'flex size-7 items-center justify-center rounded-full border border-[#9D9D9D] font-mona text-[14px]/[13.5px] font-semibold text-[#9D9D9D]',
            {
              'border-[#457461] text-[#457461]': current,
              'text-[#78B36E]': passed
            }
          )}
        >
          {step}
        </span>
      )}
      <span
        className={cn('font-sans text-[14px]/[24px]', {
          'border-[#457461] text-[#457461]': current,
          'text-[#78B36E]': passed
        })}
      >
        {title}
      </span>
    </div>
  );
}

function SuccessDisplay({ status }: { status: STATE_STATUS }) {
  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center bg-[#FAFAFA] bg-center px-[42px] py-10">
      <div className="flex w-full max-w-[518px] flex-col items-center justify-center gap-10 rounded-lg bg-white p-6 shadow-md">
        {status === STATE_STATUS.LOADING ? (
          <LoaderCircle size={112} className=" animate-spin" />
        ) : (
          <div className="size-[115px] overflow-hidden rounded-full bg-white/[0.86]">
            <Image
              src={'/icons/tick.svg'}
              alt="success"
              width={112}
              height={112}
              priority
              className=" pointer-events-none rounded-full"
            />
          </div>
        )}
        <h1 className="font-mona text-[18px]/[24px] font-semibold">
          {status === STATE_STATUS.LOADING
            ? 'Processing data'
            : 'Property Successfully Created!'}
        </h1>
        {status === STATE_STATUS.SUCCESS ? (
          <Button className="text-white" asChild>
            <Link href={'/developer/properties'}>Continue</Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
