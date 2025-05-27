import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center gap-1 rounded-lg uppercase transition-all duration-300 disabled:text-opacity-55 disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'disabled:cursor-not-allowe bg-x-gradient uppercase hover:shadow-filled disabled:text-white/80',
        outline:
          'border border-primary font-sans uppercase text-foreground hover:shadow-outlined',
        filled: ' bg-primary uppercase text-white hover:bg-primary-300',
        text: 'rounded-none bg-none uppercase text-primary'
      },
      size: {
        default: 'px-4 py-2 text-[0.875rem]/[1.5rem] font-bold lg:px-7 lg:py-3',
        lg: 'text-[ 0.875rem]/[1.5rem] px-7 py-2 font-bold',
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
