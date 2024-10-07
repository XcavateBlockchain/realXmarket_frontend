import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { fontMonaSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { NodeSocketProvider, WalletProvider } from '@/context';
import { Toaster } from 'sonner';

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
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          dm_sans.variable,
          fontMonaSans.variable
        )}
      >
        <NodeSocketProvider>
          <WalletProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </WalletProvider>
        </NodeSocketProvider>
      </body>
    </html>
  );
}
