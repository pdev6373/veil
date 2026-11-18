import Link from 'next/link';

import { playUrl, site } from '@/lib/site';
import { Logo } from './brand';

export function Nav({ home = true }: { home?: boolean }) {
  return (
    <header className={`nav${home ? '' : ' scrolled'}`} id="nav">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Veil home">
          <Logo />
          Veil
        </Link>
        <nav className="nav-links" aria-label="Main">
          {home ? (
            <>
              <a href="#features">Features</a>
              <a href="#how">How it works</a>
              <a href="#privacy">Privacy</a>
              <a href="#faq">FAQ</a>
              <a className="btn" href="#get">
                Get Veil
              </a>
            </>
          ) : (
            <Link className="btn ghost" href="/">
              ← Back to home
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export function PlayBadge() {
  return (
    <a className="play-badge" href={playUrl} aria-label="Get it on Google Play">
      {/* eslint-disable-next-line @next/next/no-img-element -- official badge, cropped via CSS */}
      <img src="/google-play-badge.png" alt="Get it on Google Play" width={217} height={84} />
    </a>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <Link className="brand" href="/">
          <Logo />
          Veil
        </Link>
        <nav aria-label="Footer">
          <Link href="/privacy">Privacy Policy</Link>
          <a href={`mailto:${site.supportEmail}`}>Contact</a>
          <a href={playUrl}>Google Play</a>
        </nav>
        <span>© {site.copyrightYear} Veil</span>
      </div>
    </footer>
  );
}
