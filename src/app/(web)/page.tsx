import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import LandingCarousel from './components/landing-slide';

export default function Home() {
  return (
    <div>
      <div className="container relative mx-auto min-h-[60vh] w-full max-w-screen-2xl md:mt-[52px] md:min-h-[95vh]">
        <Image
          src={'/images/bg_realxmarket_main.svg'}
          alt={'background'}
          width={1536}
          height={853}
          className="absolute left-0 top-0 size-full object-cover object-center"
          priority
        />

        <div className="absolute top-[30px] w-full text-wrap bg-primary px-1 py-[7px] pt-[52px] text-center text-[8px] font-semibold text-white md:px-[15px] md:py-4 md:text-[15px]">
          Don&apos;t invest unless you&apos;re prepared to lose all the money you invest. This
          is a high-risk investment and you should not expect to be protected if something goes
          wrong. Take 2 mins to learn more
        </div>
        <h1 className="relative hidden px-4 pt-[150px] font-sans text-[24px]/[110%] font-bold text-primary md:block md:px-[107px] md:pt-[180px] md:text-[62px]/[72px] md:font-black">
          A new way to invest in property. Start small. Think big.
        </h1>

        <h1 className="relative block px-4 pt-[150px] font-sans text-[24px]/[100%] font-bold text-primary md:hidden md:px-[107px] md:pt-[180px] md:text-[62px]/[72px] md:font-black">
          A new way to invest in property. Start small.
          <br /> Think big.
        </h1>

        <Image
          src={'/svgs/powerd_by_xcavate.svg'}
          alt="powered by xcavate"
          width={447}
          height={71}
          className="absolute left-0 top-[245px] h-6 w-[134px] md:top-[396px] md:h-[71px] md:w-[447px]"
        />
        {/* <div className="bg-primary px-1 py-[7px] text-[8px] font-semibold text-white md:px-[15px] md:py-4 md:text-[15px]">
          Don&apos;t invest unless you&apos;re prepared to lose all the money you invest. This
          is a high-risk investment and you should not expect to be protected if something goes
          wrong. Take 2 mins to learn more
        </div> */}
        {/* <div className="mt:pt-[52px] relative min-h-[238px] bg-[url('/images/mobile_realXmarket_background.svg')] bg-cover bg-no-repeat px-4 pt-3 tracking-normal md:min-h-screen md:px-[107px] lg:bg-[url('/images/bg_realXmarket.svg')]">
          <Image
            src={'/images/realXmarket_main_bg.jpg'}
            alt={'background'}
            fill
            className="object-cover object-center"
            priority
          />
          <h1 className=" max-w-5xl font-sans text-[24px]/[110%] font-bold text-primary md:text-[62px]/[72px] md:font-black">
            A new way to invest in property. Start small.{' '}
            <br className="block pt-1 md:hidden" /> Think big.
          </h1>
          <Image
            src={'/svgs/powerd_by_xcavate.svg'}
            alt="powered by xcavate"
            width={447}
            height={71}
            className="absolute left-0 top-[235px] h-6 w-[134px] md:top-[396px] md:h-[71px] md:w-[447px]"
          />
        </div> */}
      </div>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-start gap-2.5 px-4 py-[23px] md:gap-6 md:px-[127px] md:py-[56px]">
        <div>
          <p className="font-sans text-[19px]/[100%] font-normal text-primary-300 md:text-[62px]/[72px]">
            Access fractional ownership with our app.
          </p>
          <p className="font-sans text-[19px]/[100%] font-normal text-primary-300 md:text-[62px]/[72px]">
            Join the real estate investment revolution.
          </p>
        </div>

        <p className="font-sans text-[14px]/[100%] font-normal tracking-normal md:text-[32px]/[47px]">
          At realXmarket, Our mission is to give anyone aspiring to property ownership a
          starting point as a fractional landlord. Scan verified investment opportunities in
          the new-build rental market, start at a level you’re comfortable with, and build up
          your portfolio. The system rewards property developers who respect regional
          communities and the environment.
        </p>
      </div>
      <LandingCarousel slides={siteConfig.features} options={{ loop: true }} />
      <div className="container mx-auto flex w-full max-w-screen-2xl flex-col gap-[29px] px-4 py-[23px] md:gap-[52px] md:px-[107px] md:py-[64px]">
        <h4 className="text-[20px] font-bold text-primary md:text-[40px]/[74px]">
          Why choose realXmarket
        </h4>

        <div className="flex w-full flex-row flex-wrap justify-center gap-4 md:grid md:grid-cols-6 md:gap-10">
          {siteConfig.whyChoose.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'mt-4 flex h-[64px] max-w-[71px] flex-col items-center gap-6 text-center md:mt-0 md:h-[176px] md:max-w-[141px]',
                {
                  'max-w-[81px] md:max-w-[161px]': index === 3
                }
              )}
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={100}
                height={100}
                className={cn('h-[30px] w-[25px]  md:h-[100px] md:w-[84px]', {
                  'h-[30px] w-[30px] md:h-[100px] md:w-[100px]': index === 3
                })}
              />
              <p className="text-[10px] font-bold text-primary md:text-[20px]/[100%]">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative bg-primary-300">
        <div className="container mx-auto flex w-full max-w-screen-2xl flex-col justify-between px-4 pb-2 pt-4 md:flex-row md:px-[107px] md:pb-[48px] md:pt-[72px]">
          <div className="max-w-[620px] space-x-2.5 md:space-y-20">
            <h4 className="text-[19px] font-normal text-white md:text-[50.98px]/[60px]">
              Download the realXmarket app and unlock the future of real estate today
            </h4>
            <div className="flex items-center gap-4">
              <Link href="">
                <Image
                  src={'/images/realXmarket_app_store.svg'}
                  alt="app_store"
                  width={257}
                  height={76}
                  className="h-10 w-[135px] md:h-[76px] md:w-[257px]"
                />
              </Link>
              <Link href={'/'}>
                <Image
                  src={'/images/realXmarket_play_store.svg'}
                  alt="app_store"
                  width={257}
                  height={76}
                  className="h-10 w-[135px] md:h-[76px] md:w-[257px]"
                />
              </Link>
            </div>
          </div>
          <Image
            src={'/images/realXmarket_marketplace_download.png'}
            height={434}
            width={746}
            alt=""
            className="mt-5 h-[215px] w-[370px] md:absolute md:right-0 md:top-[62px] md:mt-0 md:h-[434px] md:w-[746px]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
