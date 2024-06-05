import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';

export default function SiteFooter() {
  const date = new Date();

  return (
    <footer className="container mx-auto flex w-full flex-col justify-between gap-3 p-6">
      <div className="flex items-center justify-center gap-4">
        <Link href={'#'} className="text-[1.25rem] text-[#191A1B]/[0.85] hover:underline">
          About Us
        </Link>
        <Link href={'#'} className="text-[1.25rem] text-[#191A1B]/[0.85] hover:underline">
          FAQs
        </Link>
        <Link href={'#'} className="text-[1.25rem] text-[#191A1B]/[0.85] hover:underline">
          Team
        </Link>
        <Link href={'#'} className="text-[1.25rem] text-[#191A1B]/[0.85] hover:underline">
          Blog
        </Link>
      </div>
      <hr />
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <Image src={'/images/logo.svg'} alt="" width={157} height={56} priority />

          <span className="text-[1rem] text-[#191A1B]/[0.355]">
            © {date.getFullYear()} Xcavate. All rights reserved.
          </span>
          <span className="text-[1rem] text-[#191A1B]/[0.355]">
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
