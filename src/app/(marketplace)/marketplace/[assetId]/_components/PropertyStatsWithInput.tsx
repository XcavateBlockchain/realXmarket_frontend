'use client';
import { useState } from 'react';

export const PropertyStatsWithInput = ({
  title,
  start,
  end,
  mid
}: {
  title: string;
  start: string;
  end: string;
  mid: string;
}) => {
  const [value, setValue] = useState(200000);

  return (
    <div className="col-span-2 flex w-full flex-col items-start gap-2 border-t border-gray-200 pt-3.5 text-[14px]/[24px]">
      <span className="text-[#4E4E4E]">{title}</span>
      <div className="relative mb-6 w-full">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-200">
          <div
            className="h-2 rounded-full "
            style={{
              background: `linear-gradient(90.26deg, #ECB278 -25.47%, #DC7DA6 35.16%, #3B4F74 69.39%, #57A0C5 103.47%)`,
              backgroundRepeat: 'no-repeat',
              width: '45%'
            }}
          ></div>
        </div>
        <span className="absolute -bottom-6 start-0 text-xs text-gray-500">{start}</span>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform text-xs text-gray-500">
          {mid}
        </span>
        <span className="absolute -bottom-6 end-0 text-xs text-gray-500">{end}</span>
      </div>
    </div>
  );
};
