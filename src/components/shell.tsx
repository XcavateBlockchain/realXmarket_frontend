import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const shellVariants = cva('grid items-center gap-10', {
  variants: {
    variant: {
      default: 'max-w-screen-[1440px] mx-auto p-[47px] grid gap-8'
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
