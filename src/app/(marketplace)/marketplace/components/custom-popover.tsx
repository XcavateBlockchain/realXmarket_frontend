'use client';

import { cn } from '@/lib/utils';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function CustomPopover({ align = 'center', children, trigger }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Trigger element */}
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            'absolute z-50 mt-2 min-w-[200px] rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5',
            {
              'left-0': align === 'start',
              'right-0': align === 'end',
              'left-1/2 -translate-x-1/2': align === 'center'
            }
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
