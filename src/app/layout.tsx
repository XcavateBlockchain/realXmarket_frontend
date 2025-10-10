import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { fontMonaSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { NodeSocketProvider, WalletProvider } from '@/context';
import { Toaster } from 'sonner';
import { ApolloWrapper } from '@/providers/appolo-client-provider';
// import XcavateProvider from '@/providers/xcavate-provider';
// import XcavateProvider from '@/providers/xcavate-provider';

const dm_sans = DM_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ['latin'],
  variable: '--font-dm-sans'
});

export const metadata: Metadata = {
  title: 'realXmarket',
  description: 'All properties are independently verified prior to listing on the marketplace',
  applicationName: 'realXmarket',
  openGraph: {
    title: 'realXmarket',
    description:
      'All properties are independently verified prior to listing on the marketplace',
    url: 'https://app.realxmarket.i0',
    type: 'website',
    images: [
      {
        url: 'https://app.realxmarket.io/realXmarket_preview.png',
        width: 1200,
        height: 630
      }
    ],
    siteName: 'app.realxmarket.io'
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://app.realxmarket.io',
    title: 'realXmarket',
    description:
      'All properties are independently verified prior to listing on the marketplace',
    images: [
      {
        url: 'https://app.realxmarket.io/realXmarket_preview.png',
        width: 1200,
        height: 630
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloWrapper>
      <NodeSocketProvider>
        <WalletProvider>
          {/* <XcavateProvider> */}
          <html lang="en">
            <body
              className={cn(
                'min-h-screen bg-background font-sans text-foreground antialiased',
                dm_sans.variable,
                fontMonaSans.variable
              )}
            >
              {children}
              <Toaster position="top-center" richColors />
            </body>
          </html>
          {/* </XcavateProvider> */}
        </WalletProvider>
      </NodeSocketProvider>
    </ApolloWrapper>
  );
}
