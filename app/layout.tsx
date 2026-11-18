import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Sora } from 'next/font/google';

import { LogoDefs } from '@/components/brand';
import { site } from '@/lib/site';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.title} for Android`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: 'Keep private apps behind a PIN or fingerprint, and let Veil pass for a calculator. Free on Android.',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#EEEBF3',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${sora.variable}`}>
      <body>
        <LogoDefs />
        {children}
      </body>
    </html>
  );
}
