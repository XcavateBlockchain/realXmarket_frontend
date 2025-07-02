'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const tabListVariants = cva('', {
  variants: {
    variant: {
      default:
        'flex w-full items-center gap-[47px] border-b border-primary-foreground/[0.10] px-2 lg:justify-between lg:gap-0',
      simple:
        'inline-flex w-full items-center  justify-start gap-6 border-b border-[#4E4E4E]/[0.10]'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

const Tabs = TabsPrimitive.Root;

interface TabListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabListVariants> {}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabListProps>(
  ({ className, variant, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabListVariants({ variant }), className)}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const tabTriggerVariants = cva('disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default:
        'flex items-center justify-center gap-2 border-b-2 border-transparent px-2 pb-2 text-[0.75rem]/[1.5rem] uppercase text-caption transition-all duration-300 hover:text-primary data-[state=active]:border-primary-300 data-[state=active]:text-primary-300 data-[state=active]:hover:text-primary-300/80 lg:text-[1rem]/[1.5rem]',

      simple:
        'flex items-start justify-center gap-2 border-b-2 border-transparent p-2 font-sans text-[1rem]/[1.5rem] text-caption transition-all duration-200 ease-in data-[state=active]:border-primary data-[state=active]:text-primary'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface TabTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('w-full', className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
