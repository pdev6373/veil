import Link from 'next/link';

import { playUrl, site } from '@/lib/site';
import { Logo } from './brand';
import { MobileMenu } from './client';

/** Pill with a rolling label on hover. */
export function Pill({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <a className="btn btn--pill" href={href} {...(external ? { rel: 'noopener' } : {})}>
      <span className="btn__dot" aria-hidden="true" />
      <span className="btn__text">
        <span className="btn__roll" data-text={label}>
          {label}
        </span>
      </span>
    </a>
  );
}

export function Header({ home = true }: { home?: boolean }) {
  return (
    <header className="header">
      <Link className="logo" href="/" aria-label="Veil home">
        <Logo className="logo__mark" />
        <span>Veil</span>
      </Link>
      <p className="header__status">
        <span className="dot" aria-hidden="true" />
        Free on Android
      </p>
      <nav className="header__nav" aria-label="Main">
        {home ? (
          <>
            <a className="header__link wide-only" href="#vault">
              Features
            </a>
            <a className="header__link wide-only" href="#privacy">
              Privacy
            </a>
            <a className="header__link wide-only" href="#faq">
              Questions
            </a>
            <Pill href={playUrl} label="Get the app" external />
            <MobileMenu>
              <PlayBadge />
            </MobileMenu>
          </>
        ) : (
          <Pill href="/" label="Back to Veil" />
        )}
      </nav>
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
    <footer className="footer">
      <div className="footer__row">
        <nav aria-label="Footer">
          <Link className="header__link" href="/privacy">
            Privacy policy
          </Link>
          <a className="header__link" href={`mailto:${site.supportEmail}`}>
            Contact
          </a>
          <a className="header__link" href={playUrl}>
            Google Play
          </a>
        </nav>
        <p className="eyebrow">
          © {site.copyrightYear} {site.name} · Made for Android
        </p>
      </div>
      <p className="footer__word" aria-hidden="true">
        Veil
      </p>
    </footer>
  );
}
