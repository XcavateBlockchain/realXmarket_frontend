import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import LandingCarousel from './components/landing-slide';

export default function Home() {
  return (
    <div>
      <div className="relative min-h-[60vh] md:min-h-screen">
        <Image
          src={'/images/bg_realxmarket_main.svg'}
          alt={'background'}
          width={1536}
          height={853}
          className="absolute left-0 top-0 size-full object-cover object-center"
          priority
        />
        <div className="absolute top-[30px] w-full bg-primary px-1 py-[7px] pt-[52px] text-left text-[8px] font-semibold text-white md:px-[15px] md:py-4 md:text-center md:text-[15px]">
          Don&apos;t invest unless you&apos;re prepared to lose all the money you invest. This
          is a high-risk investment and you should not expect to be protected if something goes
          wrong.{' '}
          <Link
            href="/risk-warning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-300"
          >
            Take 2 mins to learn more
          </Link>
        </div>
        <div className="container relative mx-auto w-full max-w-screen-2xl px-4 pt-[150px] md:mt-[52px] md:px-[107px] md:pt-[154px] lg:px-6 xl:px-[107px]">
          <h1 className="relative hidden max-w-[980px] text-wrap font-sans text-[24px]/[110%] font-bold text-primary md:block md:text-[48px]/[58px] md:font-black lg:text-[56px]/[66px] xl:text-[62px]/[72px]">
            A new way to invest in property. Start small. Think big.
          </h1>

          <h1 className="relative block font-sans text-[24px]/[100%] font-bold text-primary md:hidden  md:text-[62px]/[72px] md:font-black">
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
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-start gap-2.5 px-4 py-[23px] md:gap-6 md:px-6 md:py-[56px] xl:px-[107px]">
        <div className="text-left">
          <p className="font-sans text-[19px]/[100%] font-normal text-primary-300 sm:text-[32px]/[38px] md:text-[32px]/[38px] lg:text-[40px]/[48px] xl:text-[58px]/[68px]">
            Access fractional ownership with our app.
          </p>
          <p className="font-sans text-[19px]/[100%] font-normal text-primary-300 sm:text-[32px]/[38px] md:text-[32px]/[38px] lg:text-[40px]/[48px] xl:text-[58px]/[68px]">
            Join the real estate investment revolution.
          </p>
        </div>

        <p className="text-left font-sans text-[14px]/[100%] font-normal tracking-normal sm:text-[18px]/[26px] md:text-[24px]/[34px] lg:text-[28px]/[40px] xl:text-[32px]/[47px]">
          At realXmarket, Our mission is to give anyone aspiring to property ownership a
          starting point as a fractional landlord. Scan verified investment opportunities in
          the new-build rental market, start at a level you&apos;re comfortable with, and build
          up your portfolio. he system provides extra rewards for network participants, like
          real estate developers, who respect regional communities and the environment.
        </p>
      </div>
      <LandingCarousel slides={siteConfig.features} options={{ loop: true }} />
      <div className="container mx-auto flex w-full max-w-screen-2xl flex-col gap-[29px] px-4 py-[23px] pb-10 md:gap-[52px] md:px-6 md:py-[64px] lg:px-10 xl:px-[107px]">
        <h4 className="text-[20px] font-bold text-primary sm:text-[28px]/[40px] md:text-[32px]/[48px] lg:text-[36px]/[56px] xl:text-[40px]/[74px]">
          Why choose realXmarket
        </h4>

        <div className="grid grid-cols-3 justify-items-center gap-4 md:gap-10 lg:grid-cols-6 xl:grid-cols-6">
          {/* <div className="flex w-full flex-row flex-wrap justify-center gap-4 md:grid md:grid-cols-3 md:gap-10 lg:grid-cols-6 xl:grid-cols-6"> */}
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
                className={cn('h-[30px] w-[25px]  md:h-[100px] md:w-[75px]', {
                  'h-[30px] w-[30px] md:h-[100px] md:w-[100px]': index === 3,
                  'md:w-[94px]': index === 1 || index === 5,
                  'md:w-[84px]': index === 2,
                  'md:w-[89px]': index === 4
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
        <div className="container relative mx-auto flex w-full max-w-screen-2xl flex-col justify-between px-4 pb-2 pt-4 md:flex-row md:px-[107px] md:pb-[48px] md:pt-[72px]">
          <div className="max-w-[620px] space-x-2.5 md:space-y-20">
            <h4 className="text-[19px] font-normal text-white sm:text-[24px]/[32px] md:text-[32px]/[42px] lg:text-[42px]/[52px] xl:text-[50.98px]/[60px]">
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

      {/* <div className="relative bg-primary-300">
        <div className="container mx-auto flex w-full max-w-screen-2xl flex-col  justify-between px-4 py-8 md:flex-col md:px-6 md:pb-[48px] md:pt-[72px] lg:px-10 xl:flex-row xl:px-[107px]">
          <div className="max-w-[620px] space-y-6 md:space-y-20">
            <h4 className="text-[19px] font-normal text-white md:text-[50.98px]/[60px]">
              Download the realXmarket app and unlock the future of real estate today
            </h4>
            <div className="flex items-start gap-4">
              <Link href="" className="transition-transform hover:scale-105">
                <Image
                  src={'/svgs/realXmarket_AppStore-Button.png'}
                  alt="Download on App Store"
                  width={257}
                  height={76}
                  className="h-12 w-[160px] md:h-[76px] md:w-[257px]"
                />
              </Link>
              <Link href={'/'} className="transition-transform hover:scale-105">
                <Image
                  src={'/svgs/realXmarket_Google-Play-Button.png'}
                  alt="Get it on Google Play"
                  width={257}
                  height={76}
                  className="h-12 w-[160px] md:h-[76px] md:w-[257px]"
                />
              </Link>
            </div>
          </div>
          <div className="relative mt-8 flex  md:mt-10 lg:mt-10 lg:justify-center xl:mt-0 xl:justify-end">
            <Image
              src={'/images/realXmarket_marketplace_download.png'}
              height={434}
              width={746}
              alt="realXmarket app preview"
              className="h-[215px] w-[370px] md:w-full"
              priority
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}

{
  /* <div className="relative bg-primary-300">
<div className="container mx-auto flex w-full max-w-screen-2xl flex-col justify-between px-4 py-8 md:flex-row md:px-[107px] md:pb-[48px] md:pt-[72px]">
  <div className="max-w-[620px] space-y-6 md:space-y-20">
    <h4 className="text-[19px] font-normal text-white md:text-[50.98px]/[60px]">
      Download the realXmarket app and unlock the future of real estate today
    </h4>
    <div className="flex flex-col items-start gap-4 md:flex-row">
      <Link href="" className="transition-transform hover:scale-105">
        <Image
          src={'/images/realXmarket_app_store.svg'}
          alt="Download on App Store"
          width={257}
          height={76}
          className="h-12 w-[160px] md:h-[76px] md:w-[257px]"
        />
      </Link>
      <Link href={'/'} className="transition-transform hover:scale-105">
        <Image
          src={'/images/realXmarket_play_store.svg'}
          alt="Get it on Google Play"
          width={257}
          height={76}
          className="h-12 w-[160px] md:h-[76px] md:w-[257px]"
        />
      </Link>
    </div>
  </div>
  <div className="relative mt-8 flex justify-center md:mt-0 md:justify-end">
    <Image
      src={'/images/realXmarket_marketplace_download.png'}
      height={434}
      width={746}
      alt="realXmarket app preview"
      className="h-[250px] w-[400px] md:h-[434px] md:w-[746px]"
      priority
    />
  </div>
</div>
</div> */
}
