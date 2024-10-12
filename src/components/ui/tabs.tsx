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
        'inline-flex border-b border-[#4E4E4E]/[0.10]  items-center w-full gap-6 justify-start'
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
        'flex items-center justify-center gap-2 border-b-2 px-2 pb-2 text-[0.75rem]/[1.5rem] uppercase border-transparent text-caption hover:text-primary transition-all data-[state=active]:border-primary-300 duration-300 lg:text-[1rem]/[1.5rem] data-[state=active]:text-primary-300 data-[state=active]:hover:text-primary-300/80',

      simple:
        'flex items-start gap-2 justify-center border-b-2 transition-all duration-200 ease-in border-transparent p-2 font-sans text-[1rem]/[1.5rem] text-[#A6A6A6] data-[state=active]:border-primary data-[state=active]:text-primary'
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
