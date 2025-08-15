'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Spinner() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative size-40">
      {/* Spinner background (light color) */}
      <div className="absolute inset-0 rounded-full border-[6px] border-primary/20" />

      {/* Spinner foreground (filled color) */}
      <div
        className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent"
        style={{ transform: `rotate(${rotation}deg)` }}
      />

      {/* Logo in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full">
          <Image
            src="/images/realXmarket_logo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="size-20"
          />
        </div>
      </div>
    </div>
  );
}
