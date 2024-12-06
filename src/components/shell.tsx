import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const shellVariants = cva('grid gap-10', {
  variants: {
    variant: {
      default:
        'container mx-auto w-full max-w-screen-2xl px-4 py-[100px]  md:py-[140px]  md:px-6 lg:px-[100px]',
      basic: 'container mx-auto w-full max-w-screen-2xl gap-0 px-0 pt-[100px]'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

// const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 lg:py-6", {
//   variants: {
//     variant: {
//       default: "container",
//       centered: "container flex h-dvh max-w-2xl flex-col justify-center",
//     },
//   },
//   defaultVariants: {
//     variant: "default",
//   },
// })

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

function Shell({ className, as: Comp = 'div', variant, ...props }: ShellProps) {
  return <Comp className={cn(shellVariants({ variant }), className)} {...props} />;
}

export { Shell, shellVariants };
