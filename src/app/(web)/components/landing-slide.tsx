'use client';

import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
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
    Autoplay({ playOnInit: true, delay: 3000 })
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className="relative w-full md:h-screen">
      <div className="size-full overflow-hidden" ref={emblaRef}>
        <div className="flex size-full touch-pan-y touch-pinch-zoom">
          {slides.map((item, index) => (
            <SlideItem key={index} {...item} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-[13px] left-4 flex items-center gap-2.5 md:bottom-20 md:left-[160px]">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn('size-[7px] rounded-full border-2 border-primary-300 md:size-7', {
              'bg-primary-300': index === selectedIndex
            })}
          />
        ))}
      </div>
    </section>
  );
};

export default LandingCarousel;

function SlideItem({ ...item }: Feature) {
  return (
    <div className="relative h-[238px] w-full shrink-0 md:size-full">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="container relative z-10 mx-auto flex size-full flex-col justify-center px-4 pb-[40px] pt-[21px] md:px-[107px] md:pb-[176px] md:pt-[76px]">
        <div className="flex max-w-[210px] flex-col gap-4 md:max-w-2xl md:gap-[42px]">
          <h4 className="text-[18px] font-bold text-white md:text-[62px]">{item.title}</h4>
          <p className="text-[10px] text-white md:text-[32px]">{item.description}</p>
          <div className="flex max-w-[189px] items-center gap-2.5 md:max-w-xl md:gap-6">
            <Image
              src={'/svgs/ready_to_icon.svg'}
              alt="ready_to_icon"
              width={101}
              height={101}
              className="size-[31px] md:size-[101px]"
            />
            <span className="text-[8px] font-bold text-white md:text-[20px]">{item.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
