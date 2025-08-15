import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { fontMonaSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { NodeSocketProvider, WalletProvider } from '@/context';
import { Toaster } from 'sonner';
import { ApolloWrapper } from '@/providers/appolo-client-provider';
import XcavateProvider from '@/providers/xcavate-provider';

const dm_sans = DM_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans'
});

export const metadata: Metadata = {
  title: 'RealXMarket',
  description: 'All properties are independently verified prior to listing on the marketplace'
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
          <XcavateProvider>
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
          </XcavateProvider>
        </WalletProvider>
      </NodeSocketProvider>
    </ApolloWrapper>
  );
}
