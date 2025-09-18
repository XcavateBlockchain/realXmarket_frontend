'use client';

import * as React from 'react';

import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function PropertyVote() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full space-y-2.5">
      <Progress value={progress} className="w-full" />
      <div className="flex items-center justify-between">
        <span />
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-1">
            <span className="text-[14px]/[100%] text-[#78B36E]">Approve 78%</span>
            <button className="rounded-full bg-[#78B36E] px-3.5 py-1 font-sans text-[14px]/[100%] font-bold text-white">
              Accept
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[14px]/[100%] text-[#DF8985]">Reject 22%</span>
            <button className="rounded-full bg-[#DF8985] px-3.5 py-1 font-sans text-[14px]/[100%] font-bold text-white">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
