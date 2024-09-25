import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center gap-1 rounded-lg transition-all duration-500 uppercase disabled:bg-caption disabled:text-caption',
  {
    variants: {
      variant: {
        default:
          'bg-x-gradient hover:shadow-filled disabled:cursor-not-allowed capitalize disabled:text-white/80',
        outline: 'border-primary text-foreground border font-sans hover:shadow-outlined',
        filled: ' bg-primary text-white',
        text: 'text-primary bg-none rounded-none'
      },
      size: {
        default: 'lg:py-3 lg:px-7 py-2 px-4 text-[0.875rem]/[1.5rem] font-bold',
        lg: 'py-2 px-7 text-[ 0.875rem]/[1.5rem] font-bold',
        md: 'p-2',
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
