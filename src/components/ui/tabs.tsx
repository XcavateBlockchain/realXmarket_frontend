'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const tabTriggerVariants = cva('disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default:
        'flex w-full items-center gap-[47px] border-b border-primary-foreground/[0.10] px-2 lg:justify-between lg:gap-0'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

const tabListVariants = cva('', {
  variants: {
    variant: {
      default:
        'flex items-center justify-center gap-2 border-b-2 px-2 pb-2 text-[0.75rem]/[1.5rem] uppercase border-transparent text-caption hover:text-primary transition-all data-[state=active]:border-primary-300 duration-300 lg:text-[1rem]/[1.5rem] data-[state=active]:text-primary-300 data-[state=active]:hover:text-primary-300/80'
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
