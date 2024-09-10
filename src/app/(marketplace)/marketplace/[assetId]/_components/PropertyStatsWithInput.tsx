'use client';
import { useState } from 'react';

export const PropertyStatsWithInput = ({
  title,
  min,
  max,
  start,
  end,
  mid
}: {
  title: string;
  min: number;
  max: number;
  start: string;
  end: string;
  mid: string;
}) => {
  const [value, setValue] = useState(200000);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="col-span-2 flex w-full flex-col items-start gap-2 border-t border-gray-200 pt-3.5 text-[14px]/[24px]">
      <span className="text-[#4E4E4E]">{title}</span>
      <div className="relative mb-6 w-full">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => setValue(parseInt(e.target.value))}
          step="1"
          style={{
            background: `linear-gradient(90.26deg, #ECB278 -25.47%, #DC7DA6 35.16%, #3B4F74 69.39%, #57A0C5 103.47%)`,
            backgroundSize: `${percentage}% 100%`,
            backgroundRepeat: 'no-repeat'
          }}
          className="h-1 w-full cursor-pointer appearance-none rounded-md"
        />
        <span className="absolute -bottom-6 start-0 text-xs text-gray-500">{start}</span>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform text-xs text-gray-500">
          {mid}
        </span>
        <span className="absolute -bottom-6 end-0 text-xs text-gray-500">{end}</span>
      </div>
    </div>
  );
};
