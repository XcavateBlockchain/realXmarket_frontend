import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';

export default function SiteFooter() {
  const date = new Date();

  return (
    <footer className="container mx-auto flex w-full flex-col justify-between gap-3 p-6">
      <div className="flex items-center justify-center gap-4">
        <Link
          href={'#'}
          className="text-[14px]/[18px] text-[#191A1B]/[0.85] underline-offset-4 hover:underline lg:text-[18px]/[23px]"
        >
          About Us
        </Link>
        <Link
          href={'#'}
          className="text-[14px]/[18px] text-[#191A1B]/[0.85] underline-offset-4 hover:underline lg:text-[18px]/[23px]"
        >
          FAQs
        </Link>
        <Link
          href={'#'}
          className="text-[14px]/[18px] text-[#191A1B]/[0.85] underline-offset-4 hover:underline lg:text-[18px]/[23px]"
        >
          Team
        </Link>
        <Link
          href={'#'}
          className="text-[14px]/[18px] text-[#191A1B]/[0.85] underline-offset-4 hover:underline lg:text-[18px]/[23px]"
        >
          Blog
        </Link>
      </div>
      <hr />
      <div className="flex w-[100%] flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center justify-items-center gap-3 md:flex-row">
          <Image
            src={'/images/Real_Market_logo.svg'}
            alt="logo"
            width={175}
            height={48}
            priority
          />

          <span className="mt-2 text-[1rem] text-[#191A1B]/[0.355]">
            © {date.getFullYear()} Xcavate. All rights reserved.
          </span>
          <span className="mt-2 text-[1rem] text-[#191A1B]/[0.355]">
            | Terms of service and privacy policy
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href={'#'} className="text-black hover:text-primary-300">
            <Icons.xTwitter className="size-6" />
          </Link>
          <Link href={'#'} className="text-black hover:text-primary-300">
            <Icons.discord className="size-6" />
          </Link>
          {/* <Link href={'#'} className="text-black hover:text-transparent hover:text-clip hover:bg-x-gradient">
            <Icons.linkedin className="size-6" />
          </Link> */}
          <Link href={'#'} className="text-black hover:text-primary-300">
            <Icons.youtube className="size-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
