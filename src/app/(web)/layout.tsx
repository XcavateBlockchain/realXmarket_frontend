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
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </SubstrateContextProvider>
  );
}
