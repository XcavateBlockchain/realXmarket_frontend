'use client';

import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { DotButton, useDotButton } from './landing-button';
import { cn } from '@/lib/utils';

type Feature = {
  title: string;
  description: string;
  image: string;
  text: string;
};

type PropType = {
  slides: Feature[];
  options?: EmblaOptionsType;
};

const LandingCarousel: React.FC<PropType> = props => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 }),
    Fade()
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className="relative h-[300px] w-full bg-primary sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-screen">
      <div className="size-full overflow-hidden" ref={emblaRef}>
        <div className="flex size-full touch-pan-y touch-pinch-zoom">
          {slides.map((item, index) => (
            <SlideItem key={index} {...item} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-4 flex items-center gap-2 sm:bottom-4 sm:left-6 sm:gap-3 md:bottom-6 md:left-8 md:gap-4 lg:bottom-8 lg:left-12 lg:gap-5 xl:bottom-16 xl:left-[107px] xl:gap-6">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              'rounded-full border-2 border-primary-300 transition-all duration-200 hover:scale-110 xl:cursor-pointer',
              {
                'bg-primary-300': index === selectedIndex,
                'size-2 sm:size-3 md:size-4 lg:size-5 xl:size-7': true
              }
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default LandingCarousel;

function SlideItem({ ...item }: Feature) {
  return (
    <div className="relative h-[300px] w-full shrink-0 sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-full">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover object-center xl:object-cover xl:object-center"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      />
      {/* Subtle overlay for better text readability on desktop */}
      <div className="absolute inset-0 bg-black/20 xl:bg-black/30" />
      <div className="container relative z-10 mx-auto flex size-full flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 md:p-12 lg:p-16 xl:px-[107px] xl:py-20">
        <div className="flex max-w-[280px] flex-col gap-3 sm:max-w-[350px] sm:gap-4 md:max-w-[450px] md:gap-6 lg:max-w-[600px] lg:gap-8 xl:max-w-3xl xl:gap-10">
          <h4 className="text-[20px] font-bold leading-tight text-white sm:text-[24px] md:text-[32px] lg:text-[42px] xl:text-[56px] xl:leading-[1.1] xl:drop-shadow-lg">
            {item.title}
          </h4>
          <p className="text-[12px] leading-relaxed text-white sm:text-[14px] md:text-[18px] lg:text-[24px] xl:text-[28px] xl:leading-[1.4] xl:drop-shadow-md">
            {item.description}
          </p>
          <div className="flex max-w-[220px] items-center gap-3 sm:max-w-[280px] sm:gap-4 md:max-w-[350px] md:gap-5 lg:max-w-[450px] lg:gap-6 xl:max-w-2xl xl:gap-8">
            <Image
              src={'/svgs/ready_to_icon.svg'}
              alt="ready_to_icon"
              width={101}
              height={101}
              className="size-[24px] shrink-0 sm:size-[28px] md:size-[36px] lg:size-[48px] xl:size-[80px]"
            />
            <span className="text-[10px] font-bold leading-tight text-white sm:text-[12px] md:text-[16px] lg:text-[18px] xl:text-[22px] xl:leading-[1.3] xl:drop-shadow-md">
              {item.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
