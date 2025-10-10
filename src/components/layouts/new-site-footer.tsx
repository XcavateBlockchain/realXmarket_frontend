import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';

export default function SiteFooter() {
  const date = new Date();

  return (
    <footer className="container mx-auto flex w-full flex-col justify-between gap-6 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-center gap-2.5 md:justify-start md:gap-4">
        <FooterLink href="/privacy" title="Privacy" />
        <FooterLink href="/agreement" title="Agreement" />
        <FooterLink href="/terms" title="Terms" />
        <FooterLink href="risk-warning" title="Risk Warning" />
        <FooterLink href="property-info-fees" title=" Property Info & Fees " />
      </div>
      <hr />
      <div className="flex w-full flex-col items-center justify-between gap-5 md:flex-row md:gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[19px]/[100%] font-normal tracking-normal text-primary md:text-[32px]/[100%]">
            Powered by
          </span>
          <Image
            src={'/images/xcavate_logo.svg'}
            alt="logo"
            width={100}
            height={32}
            priority
          />
        </div>

        <div className="flex flex-col gap-6 md:gap-1">
          <div className="flex items-center justify-center gap-6 md:justify-end">
            <Link href={'#'} className="text-primary hover:text-primary-300">
              <Icons.xTwitter className="size-8" />
            </Link>
            <Link href={'#'} className="text-primary hover:text-primary-300">
              <Icons.discord className="size-8" />
            </Link>
            {/* <Link href={'#'} className="text-primary hover:text-transparent hover:text-clip hover:bg-x-gradient">
            <Icons.linkedin className="size-8" />
          </Link> */}
            <Link href={'#'} className="text-primary hover:text-primary-300">
              <Icons.youtube className="size-8" />
            </Link>
          </div>
          <span className="mt-2 text-[1rem] text-primary">
            © {date.getFullYear()} Xcavate. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ title, href }: { title: string; href: string }) => (
  <Link
    href={href}
    className="font-sans text-[14px]/[18px] text-[#191A1B]/[0.85] underline-offset-4 hover:underline lg:text-[1.125rem]"
  >
    {title}
  </Link>
);
