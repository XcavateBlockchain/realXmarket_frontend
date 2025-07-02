'use client';

import Image from 'next/image';
import { use, useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DashButton, useDashButton } from './slide-dash-button';
import { cn } from '@/lib/utils';

const slides = [
  {
    image: '/images/frame_1.png',
    title: 'Browse And Buy'
  },
  {
    image: '/images/frame_2.png',
    title: 'Property Management'
  },
  {
    image: '/images/frame_3.png',
    title: 'Relist & Sell'
  }
];

type PropType = {
  options?: EmblaOptionsType;
};

export default function FeatureSlide({ options }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ stopOnInteraction: false, stopOnMouseEnter: true })
  ]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDashButton(
    emblaApi,
    onNavButtonClick
  );

  return (
    <section className="mx-auto w-full space-y-4 lg:hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className="ml-0 flex touch-pan-y touch-pinch-zoom lg:ml-4"
          style={{
            backfaceVisibility: 'hidden'
          }}
        >
          {slides.map((item, index) => (
            <div
              className="relative min-w-0 flex-[0_0_100%] px-0 lg:px-4"
              style={{ transform: 'translate3d(0, 0, 0)' }}
              key={index}
            >
              <FeatureCard {...item} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DashButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              'flex h-[4px] w-[11px] items-center justify-center rounded-lg bg-caption p-0',
              {
                'w-8 bg-primary': index === selectedIndex
              }
            )}
          />
        ))}
      </div>
    </section>
  );
}

const FeatureCard = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <Image src={image} alt="hero" width={283} height={227} />
      <p className="text-center font-sans text-[18px]/[24px] font-medium">{title}</p>
    </div>
  );
};
