import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center gap-1 rounded-full uppercase transition-all duration-300 disabled:bg-primary/50 disabled:text-white',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-primary font-sans uppercase text-primary hover:bg-primary/10',
        filled: 'bg-primary uppercase text-white hover:bg-primary-300',
        text: 'rounded-none bg-none uppercase text-primary'
      },
      size: {
        default: 'px-4 py-2 text-[0.875rem]/[1.5rem] font-bold md:h-[50px]  lg:px-7 lg:py-3',
        lg: 'px-7 py-2 text-[0.875rem]/[1.5rem] font-bold',
        md: 'p-2 font-sans text-[1rem]/[1.5rem]',
        icon: 'p-[5px]'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    compoundVariants: [
      { variant: 'default', size: 'default', className: 'text-white' },
      { variant: 'default', size: 'lg', className: 'text-white' }
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, type = 'button', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
