import SiteFooter from '@/components/layouts/site-footer';
import { SiteHeader } from '@/components/layouts/site-header';
import SubstrateContextProvider from '@/context/polkadot-contex';

export default function PageLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubstrateContextProvider>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="container mx-auto flex min-h-screen max-w-screen-2xl flex-col items-start justify-start gap-10 px-4 mt-[140px] mb-[80px] md:px-6 lg:gap-16 lg:px-[50px]">
            {children}
          </div>
        </main>
        <SiteFooter />
      </div>
    </SubstrateContextProvider>
  );
}
