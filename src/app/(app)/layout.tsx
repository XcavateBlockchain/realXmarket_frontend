import { AppSiteHeader } from '@/components/layouts/app-site-header';
import SiteFooter from '@/components/layouts/site-footer';
import SubstrateContextProvider from '@/context/polkadot-contex';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <SubstrateContextProvider>
      <div className="relative flex min-h-screen flex-col">
        <AppSiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </div>
    </SubstrateContextProvider>
  );
}
