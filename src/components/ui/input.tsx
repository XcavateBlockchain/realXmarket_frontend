import * as React from 'react';

import { cn } from '@/lib/utils';
import { FieldError } from '../field-error';
import { VariantProps, cva } from 'class-variance-authority';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  htmlFor?: string;
}

export const inputVariants = cva('flex w-full flex-col gap-2', {
  variants: {
    variant: {
      default:
        'focus-visible:ring-ring flex h-10 w-full rounded-md border border-[#A6A6A6] bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface InputStyles extends InputProps, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, htmlFor, className, type, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2">
        {label ? (
          <label htmlFor={htmlFor} className="text-[16px]/[24px] font-medium uppercase">
            {label}
          </label>
        ) : null}

        <input
          type={type}
          name={name}
          className={cn(
            'focus-visible:ring-ring flex h-10 w-full rounded-md border border-[#A6A6A6] bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <FieldError name={name} />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
