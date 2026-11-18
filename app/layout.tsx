import type { Metadata, Viewport } from 'next';
import { Sora } from 'next/font/google';

import { LogoDefs } from '@/components/brand';
import { site } from '@/lib/site';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
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
    description: 'The calm, beautiful app hider for Android. PIN and fingerprint lock, calculator disguise, and a private app vault.',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0A0A12',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={sora.variable}>
      <head>
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body>
        <div className="glow" aria-hidden="true" />
        <div className="glow two" aria-hidden="true" />
        <LogoDefs />
        {children}
      </body>
    </html>
  );
}
