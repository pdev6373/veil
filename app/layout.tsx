import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Geist, Geist_Mono } from 'next/font/google';

import { LogoDefs } from '@/components/brand';
import { site } from '@/lib/site';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const serif = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.title} for Android`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: 'Keep private apps behind a PIN or fingerprint, and let Veil pass for a calculator. Free on Android.',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0B0912',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

/**
 * Runs before first paint: marks JS as available (so reveal styles never flash) and
 * remembers returning visitors so the intro veil plays once per session.
 */
const prePaint = `(function(d){d.classList.add('js');try{if(sessionStorage.getItem('veil-seen'))d.classList.add('seen')}catch(e){}})(document.documentElement)`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>
        <LogoDefs />
        <div className="ambient" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
