import { Mark, Logo } from '@/components/brand';
import { Footer, Nav, PlayBadge } from '@/components/chrome';
import { CalcTyping, PageEffects } from '@/components/client';
import { CalculatorIcon, CheckIcon, EyeOffIcon, HomeIcon, LockIcon, PaletteIcon } from '@/components/icons';
import { site } from '@/lib/site';

const TILES = [
  ['#FF8A65', '#FF5277'], ['#4DD0E1', '#3D7BFF'], ['#9CCC65', '#26A69A'], ['#FFD54F', '#FF8F00'],
  ['#BA68C8', '#7C4DFF'], ['#4FC3F7', '#5C6BC0'], ['#F06292', '#BA68C8'], ['#81C784', '#3EE6C4'],
  ['#FFB74D', '#FF7043'], ['#7986CB', '#3F51B5'], ['#4DB6AC', '#00897B'], ['#E57373', '#C2185B'],
];

const FEATURES = [
  { icon: <EyeOffIcon />, title: 'Hide any app', body: 'Pick the apps you want to keep private and Veil moves them into your vault, ready to open in a tap.' },
  { icon: <HomeIcon />, title: 'Truly invisible', body: 'Stealth Launcher makes Veil your home screen, so hidden apps never show up in your app drawer.' },
  { icon: <LockIcon />, title: 'Locked tight', body: 'PIN with brute-force lockout, fingerprint and face unlock, and an instant re-lock whenever you leave.' },
];

const STEPS = [
  { title: 'Create your PIN', body: 'Four digits you’ll remember. Add your fingerprint for one-touch unlock.' },
  { title: 'Choose apps to hide', body: 'Search, tap, save. Your apps move into the vault instantly.' },
  { title: 'Go invisible', body: 'Turn on the calculator disguise or Stealth Launcher, and no one will ever know.' },
];

const PRIVACY = [
  'PIN stored only as a salted hash, encrypted with Android Keystore',
  'Hidden-app list encrypted on your phone, never uploaded',
  'Blank in Recents, with screenshots of the vault blocked',
  'Biometrics handled by Android. Veil never sees them.',
  'Never modifies, disables or uninstalls your other apps',
  'Uninstalling Veil removes everything it stored',
];

const FAQ = [
  {
    q: 'Does Veil remove apps from my phone’s app drawer?',
    a: 'Android doesn’t allow one app to remove another from the stock launcher. Veil’s Stealth Launcher solves this by becoming your home screen. Hidden apps simply never appear there. Without it, hidden apps live in your vault but still appear in your phone’s own drawer.',
  },
  {
    q: 'How do I open Veil when it’s disguised as a calculator?',
    a: 'Type your 4-digit PIN and press =. Or long-press = to use your fingerprint. Anyone else just gets a normal working calculator.',
  },
  {
    q: 'What if I forget my PIN?',
    a: 'For your security there’s no back door. Uninstall and reinstall Veil to start fresh. Your hidden apps are untouched and will reappear normally.',
  },
  { q: 'Do I need to root my phone?', a: 'No. Veil works on any phone running Android 7 or newer, without root.' },
  {
    q: 'Is Veil free?',
    a: 'Yes. Veil is supported by ads in the vault and settings. You can unlock extra themes by watching an optional short video.',
  },
];

const OPS = ['÷', '×', '−', '='];
const FNS = ['AC', '±', '%'];
const KEYS = ['AC', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '='];

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
      <PageEffects />
      <Nav />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="wrap">
            <div>
              <span className="eyebrow reveal">
                <span className="dot" />
                Free on Android
              </span>
              <h1 className="reveal">
                Hide apps.
                <br />
                <span className="soft">Keep your peace.</span>
              </h1>
              <p className="lede reveal">
                Veil tucks your private apps behind a PIN or fingerprint. It can even pass for a calculator. When
                someone borrows your phone, they see nothing at all.
              </p>
              <div className="cta reveal" id="get">
                <PlayBadge />
                <a className="btn ghost" href="#features">
                  See how it works
                </a>
              </div>
              <div className="trust reveal">
                {['No account', 'Nothing uploaded', 'No root needed'].map((t) => (
                  <span key={t}>
                    <CheckIcon strokeWidth={2.4} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="stage" aria-hidden="true">
              <div className="phone">
                <div className="screen">
                  <div className="app-title">Vault</div>
                  <div className="app-sub">{TILES.length} apps hidden</div>
                  <div className="grid">
                    {TILES.map(([a, b], i) => (
                      <div key={a + b} className="tile" style={{ animationDelay: `${300 + i * 70}ms` }}>
                        <i style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} />
                        <b />
                      </div>
                    ))}
                  </div>
                  <div className="fab">+ Hide apps</div>
                  <div className="curtain">
                    <Mark />
                  </div>
                </div>
              </div>
              <div className="chip a">
                <span className="ic" style={{ background: 'rgba(62,230,196,.15)', color: '#3EE6C4' }}>
                  <LockIcon />
                </span>
                <span>
                  Locked instantly<small>the moment you leave</small>
                </span>
              </div>
              <div className="chip b">
                <span className="ic" style={{ background: 'rgba(255,159,28,.15)', color: '#FF9F1C' }}>
                  <CalculatorIcon />
                </span>
                <span>
                  Looks like a calculator<small>PIN + = to get in</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="kicker">Features</span>
              <h2>
                Privacy that feels
                <br />
                effortless.
              </h2>
              <p>Everything you need to keep apps out of sight, and nothing that gets in your way.</p>
            </div>
            <div className="features">
              {FEATURES.map((f) => (
                <article key={f.title} className="card reveal">
                  <div className="icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              ))}
              <article className="card wide reveal">
                <div>
                  <div className="icon">
                    <CalculatorIcon />
                  </div>
                  <h3>Hidden in plain sight</h3>
                  <p>
                    Switch Veil’s icon and name to “Calculator”. It really works, so nobody suspects a thing. Type your
                    PIN and press <strong style={{ color: '#FF9F1C' }}>=</strong> to slip inside.
                  </p>
                </div>
                <div className="calc" aria-hidden="true">
                  <div className="display">
                    <CalcTyping />
                    <span className="caret" />
                  </div>
                  <div className="keys">
                    {KEYS.map((k) => (
                      <span key={k} className={OPS.includes(k) ? 'op' : FNS.includes(k) ? 'fn' : undefined}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
              <article className="card reveal">
                <div className="icon">
                  <PaletteIcon />
                </div>
                <h3>Five themes</h3>
                <p>Violet, Aurora, Ember, Ocean and Graphite, with smooth animations and gentle haptics.</p>
              </article>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="kicker">How it works</span>
              <h2>Private in under a minute.</h2>
            </div>
            <div className="steps">
              {STEPS.map((s) => (
                <div key={s.title} className="step reveal">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy">
          <div className="wrap">
            <div className="band reveal">
              <div>
                <span className="kicker">Privacy first</span>
                <h2>What you hide stays yours.</h2>
                <p>
                  Veil has no servers and no accounts, so we can’t see which apps you hide. Veil is free thanks to ads,
                  and they never appear on your home screen or lock screen.
                </p>
              </div>
              <ul className="checks">
                {PRIVACY.map((p) => (
                  <li key={p}>
                    <CheckIcon strokeWidth={3} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="kicker">FAQ</span>
              <h2>Questions, answered.</h2>
            </div>
            <div className="faq reveal">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final">
          <div className="wrap reveal">
            <Logo className="mark" />
            <h2>Ready to disappear?</h2>
            <p>Download Veil free on Google Play and take back your privacy in under a minute.</p>
            <div className="cta">
              <PlayBadge />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
