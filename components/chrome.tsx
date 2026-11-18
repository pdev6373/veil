import Link from 'next/link';

import { playUrl, site } from '@/lib/site';
import { Logo } from './brand';

export function Nav({ home = true }: { home?: boolean }) {
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="wordmark" href="/" aria-label="Veil home">
          <Logo />
          <span>Veil</span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {home ? (
            <>
              <a href="#features">Features</a>
              <a href="#privacy">Privacy</a>
              <a href="#faq">Questions</a>
              <a className="pill" href={playUrl}>
                Get the app
              </a>
            </>
          ) : (
            <Link className="pill" href="/">
              Back to Veil
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
      {/* eslint-disable-next-line @next/next/no-img-element -- official badge artwork, cropped via CSS */}
      <img src="/google-play-badge.png" alt="Get it on Google Play" width={202} height={78} />
    </a>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>
          © {site.copyrightYear} {site.name}
        </span>
        <nav aria-label="Footer">
          <Link href="/privacy">Privacy policy</Link>
          <a href={`mailto:${site.supportEmail}`}>Contact</a>
          <a href={playUrl}>Google Play</a>
        </nav>
      </div>
    </footer>
  );
}
