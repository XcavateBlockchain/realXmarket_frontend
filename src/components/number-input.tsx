import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, NumericFormatProps, OnValueChange } from 'react-number-format';
import { cn } from '@/lib/utils';
import { FieldError } from './field-error';

interface NumberInputProps extends NumericFormatProps {
  name: string;
  label?: string;
  htmlFor?: string;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  { name, label, htmlFor, className, ...props },
  ref
) {
  const { control } = useFormContext();

  return (
    <div
      className={cn('', {
        'flex w-full flex-col gap-2': label
      })}
    >
      {label ? (
        <label htmlFor={htmlFor} className="text-[16px]/[24px] uppercase text-border">
          {label}
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <NumericFormat
            getInputRef={ref}
            className={cn(
              'flex w-full rounded-md border border-caption bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...field}
            name={name}
            {...props}
          />
        )}
      />
      <FieldError name={name} />
    </div>
  );
});

export default NumberInput;
