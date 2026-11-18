import { Footer, Nav, PlayBadge } from '@/components/chrome';
import { TryCalculator } from '@/components/client';
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

const FACTS = [
  'No account, and no servers of ours',
  'Your PIN is stored only as a salted hash',
  'The list of hidden apps is encrypted on your phone',
  'Fingerprints are checked by Android; Veil never sees them',
  'Ads never appear on your home screen or lock screen',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: site.title,
  operatingSystem: 'Android',
  applicationCategory: 'UtilitiesApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <main>
        <section className="hero">
          <div className="wrap">
            <div>
              <h1>
                Hide apps.
                <br />
                Keep your peace.
              </h1>
              <p className="lede">
                Veil keeps your private apps behind a PIN or fingerprint, and can pass for a calculator. Free on
                Android.
              </p>
              <div className="actions">
                <PlayBadge />
                <a className="text-link" href="#calculator">
                  Try the calculator
                </a>
              </div>
            </div>

            <div className="stage" aria-hidden="true">
              <div className="phone">
                <div className="screen">
                  <div className="island" />
                  <div className="title">Vault</div>
                  <div className="sub">{TONES.length} apps hidden</div>
                  <div className="apps">
                    {TONES.map((c) => (
                      <i key={c} style={{ background: c }} />
                    ))}
                  </div>
                  <div className="add">Hide apps</div>
                </div>
              </div>
              <div className="sheer" />
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="wrap">
            <h2 className="section-title">Out of sight, never out of reach.</h2>
            <div className="index">
              {FEATURES.map((f) => (
                <div key={f.title} className="index-row">
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section band" id="calculator">
          <div className="wrap">
            <div>
              <h2>It can pass for a calculator.</h2>
              <p>
                Switch Veil’s icon and name to Calculator. It does real sums, so nobody thinks twice. Only your PIN,
                followed by =, opens the vault.
              </p>
              <p className="hint">
                Try it: type <kbd>1284</kbd>, then <kbd>=</kbd>.
              </p>
            </div>
            <TryCalculator />
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <h2 className="section-title">Private in under a minute.</h2>
            <ol className="steps">
              {STEPS.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section quiet" id="privacy">
          <div className="wrap privacy">
            <div>
              <h2>What you hide stays on your phone.</h2>
              <p className="lede">
                Veil has no accounts and nothing to sync, so there is nothing of yours for us to see.{' '}
                <a href="/privacy">Read the privacy policy</a>.
              </p>
            </div>
            <ul className="facts">
              {FACTS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap">
            <h2 className="section-title">Questions</h2>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section closing">
          <div className="wrap">
            <h2>Draw the veil.</h2>
            <PlayBadge />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
