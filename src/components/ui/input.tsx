import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, htmlFor, className, type, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2">
        {label ? (
          <label htmlFor={htmlFor} className="text-[16px]/[24px] font-medium uppercase">
            {label}
          </label>
        ) : null}

        <input
          type={type}
          className={cn(
            'focus-visible:ring-ring flex h-10 w-full rounded-md border border-[#A6A6A6] bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
