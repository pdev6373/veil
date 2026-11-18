import type { ReactNode } from 'react';

import { Footer, Header, PlayBadge } from '@/components/chrome';
import { TryCalculator } from '@/components/client';
import { Intro, Motion } from '@/components/motion';
import { site } from '@/lib/site';

// Muted, mineral app tones: the phone shows "apps", not a rainbow.
const TONES = [
  '#c98f7a', '#7d9bb8', '#93a98a', '#c9b27a',
  '#a08bc0', '#7fb0ab', '#b9879e', '#8a93b8',
  '#b8a07f', '#6f8f9e', '#a3a3b8', '#c7a2a2',
];

const FEATURES = [
  {
    title: 'A private vault',
    body: 'Choose the apps you want out of sight. They open from Veil, behind your PIN or fingerprint.',
  },
  {
    title: 'Gone from the drawer',
    body: 'Turn on Stealth Launcher and Veil becomes your home screen. Hidden apps simply never appear there.',
  },
  {
    title: 'Locks as you leave',
    body: 'The vault closes the moment you switch away, and shows a blank card in Recents.',
  },
];

const STEPS = [
  { title: 'Set a PIN', body: 'Four digits. Add your fingerprint for one-touch unlock.' },
  { title: 'Choose apps', body: 'Search, tap, save. They move into the vault at once.' },
  { title: 'Pick a disguise', body: 'Keep the Veil icon, or let it pass for a calculator.' },
];

const PRIVACY_STATEMENT =
  'What you hide stays on your phone. No account. No servers. Your PIN is kept only as a salted hash, and your list of hidden apps never leaves the device.';

const FACTS = [
  'Fingerprints are checked by Android; Veil never sees them',
  'Ads never appear on your home screen or lock screen',
  'Uninstalling Veil removes everything it stored',
];

const FAQ = [
  {
    q: 'Does Veil remove apps from my phone’s app drawer?',
    a: 'Android doesn’t let one app remove another from the stock launcher. Stealth Launcher solves this by making Veil your home screen, where hidden apps never appear. Without it, hidden apps live in the vault but still show in your phone’s own drawer.',
  },
  {
    q: 'How do I open Veil when it looks like a calculator?',
    a: 'Type your PIN and press =. Long-press = to use your fingerprint instead. Anyone else just gets a calculator that works.',
  },
  {
    q: 'What if I forget my PIN?',
    a: 'There is no back door, by design. Uninstall and reinstall Veil to start again. Your other apps are never touched.',
  },
  { q: 'Do I need to root my phone?', a: 'No. Veil works on Android 7 and newer, without root.' },
  { q: 'Is Veil free?', a: 'Yes. Ads in the vault and settings pay for it. Extra colour themes unlock with an optional short video.' },
];

const MARQUEE = ['Hide apps', 'Pass for a calculator', 'Unlock with a touch', 'Vanish from the drawer', 'Keep your peace'];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: site.title,
  operatingSystem: 'Android',
  applicationCategory: 'UtilitiesApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

/** Masked lines that slide up on reveal. */
function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className="line">
          <span className="line__inner">{l}</span>
        </span>
      ))}
    </>
  );
}

function ChapterHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="chapter-head" data-reveal="fade">
      <span className="chapter-head__num">{num}</span>
      <span className="chapter-head__title">{title}</span>
    </div>
  );
}

/** Each word becomes a span, so it can light up as it scrolls into view. */
const Words = ({ text }: { text: string }) => (
  <>
    {text.split(' ').map((w, i) => (
      <span key={i} className="w">
        {w}{' '}
      </span>
    ))}
  </>
);

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Intro />
      <Motion />
      <Header />

      <main id="top">
        {/* 00 · Hero: type first */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__meta" data-reveal="fade" data-hero>
            <p className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Private by design
            </p>
            <p className="eyebrow">Android 7+ · No root · No account</p>
          </div>

          <h1 className="hero__title" id="hero-title" data-reveal="lines" data-hero>
            <Lines lines={['Hide apps.', 'Keep your', <em key="p">peace.</em>]} />
          </h1>

          <div className="hero__bottom" data-reveal="fade" data-hero>
            <p className="hero__lede">
              Veil keeps your private apps behind a PIN or fingerprint, and can pass for a calculator. When someone
              borrows your phone, there is nothing to find.
            </p>
            <div className="hero__actions">
              <PlayBadge />
              <a href="#vault" className="hero__scroll">
                <span className="hero__scroll-line" aria-hidden="true" />
                <span>See how it works</span>
              </a>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="marquee__item">
                {i % 2 ? <em>{m}</em> : m}
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* 01 · The vault */}
        <section className="chapter" id="vault">
          <ChapterHead num="01" title="The vault" />
          <div className="vault">
            <div>
              <h2 className="display" data-reveal="lines">
                <Lines lines={['Out of sight,', <em key="n">never out of reach.</em>]} />
              </h2>
              <ol className="rows">
                {FEATURES.map((f, i) => (
                  <li key={f.title} className="row" data-reveal="fade">
                    <span className="row__num">0{i + 1}</span>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="phone-wrap" data-reveal="fade" aria-hidden="true">
              <div className="phone">
                <div className="screen">
                  <div className="island" />
                  <div className="screen__title">Vault</div>
                  <div className="screen__sub">{TONES.length} apps hidden</div>
                  <div className="apps">
                    {TONES.map((c) => (
                      <i key={c} style={{ background: c }} />
                    ))}
                  </div>
                  <div className="screen__add">Hide apps</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 · The disguise */}
        <section className="chapter chapter--raised" id="calculator">
          <ChapterHead num="02" title="The disguise" />
          <div className="disguise">
            <div>
              <h2 className="display" data-reveal="lines">
                <Lines lines={['It can pass for', <em key="c">a calculator.</em>]} />
              </h2>
              <p className="body" data-reveal="fade">
                Switch Veil’s icon and name to Calculator. It does real sums, so nobody thinks twice. Only your PIN,
                followed by =, opens the vault.
              </p>
              <p className="hint" data-reveal="fade">
                Try it here: type <kbd>1284</kbd>, then <kbd>=</kbd>
              </p>
            </div>
            <div data-reveal="fade">
              <TryCalculator />
            </div>
          </div>
        </section>

        {/* 03 · Setup */}
        <section className="chapter" id="setup">
          <ChapterHead num="03" title="Setup" />
          <h2 className="display" data-reveal="lines">
            <Lines lines={['Private in', <em key="m">under a minute.</em>]} />
          </h2>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step" data-reveal="fade">
                <span className="step__num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 04 · Privacy */}
        <section className="chapter" id="privacy">
          <ChapterHead num="04" title="Privacy" />
          <p className="statement" data-reveal="words">
            <Words text={PRIVACY_STATEMENT} />
          </p>
          <div className="privacy__foot">
            <ul className="facts">
              {FACTS.map((f) => (
                <li key={f} data-reveal="fade">
                  {f}
                </li>
              ))}
            </ul>
            <a className="header__link privacy__link" href="/privacy" data-reveal="fade">
              Read the privacy policy
            </a>
          </div>
        </section>

        {/* 05 · Questions */}
        <section className="chapter" id="faq">
          <ChapterHead num="05" title="Questions" />
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q} data-reveal="fade">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="closing" id="get">
          <h2 className="closing__title" data-reveal="lines">
            <Lines lines={['Draw', <em key="v">the veil.</em>]} />
          </h2>
          <div className="closing__cta" data-reveal="fade">
            <p>Free on Google Play. Private in under a minute.</p>
            <PlayBadge />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
