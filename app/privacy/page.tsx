import type { Metadata } from 'next';

import { Footer, Nav } from '@/components/chrome';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.title} handles your data. Your PIN and hidden-app list never leave your phone.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  const mail = `mailto:${site.supportEmail}`;
  return (
    <>
      <Nav home={false} />
      <main className="legal">
        <div className="wrap">
          <article>
            <span className="kicker">Legal</span>
            <h1>Privacy Policy</h1>
            <p className="updated">Last updated: {site.privacyUpdated}</p>

            <div className="summary-box">
              <p>
                <strong>In short:</strong> your PIN and the list of apps you hide never leave your phone. Veil has no
                servers and no accounts. The only data that leaves your device is what Google’s ad service needs to
                show ads.
              </p>
            </div>

            <p>
              This policy explains how <strong>{site.title}</strong> (“Veil”, “the app”), developed by{' '}
              <strong>{site.developerName}</strong> (“we”, “us”), handles information.
            </p>

            <h2>Information that stays on your device</h2>
            <ul>
              <li>
                <strong>Your PIN</strong> is stored only as a salted, one-way hash, encrypted with the Android Keystore.
                We cannot read or recover it.
              </li>
              <li>
                <strong>Your list of hidden apps</strong>, theme and settings are stored encrypted on your device.
              </li>
              <li>
                <strong>The list of installed apps</strong> is read on your device so you can choose which ones to
                hide. It is never uploaded.
              </li>
            </ul>
            <p>We do not operate servers, do not require an account, and cannot see which apps you hide.</p>

            <h2>Advertising</h2>
            <p>
              Veil is free and shows ads through <strong>Google AdMob</strong>. To serve, measure and prevent fraud in
              ads, the Google Mobile Ads SDK may collect:
            </p>
            <ul>
              <li>Device identifiers, such as the Android Advertising ID</li>
              <li>IP address, from which approximate location may be derived</li>
              <li>Ad interaction and diagnostic data</li>
            </ul>
            <p>
              Google uses this data as described in{' '}
              <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">
                How Google uses information from sites or apps that use its services
              </a>
              .
            </p>
            <p>
              Where the law requires it (for example in the EEA, the UK and some US states), Veil asks for your consent
              before any ad is requested. You can change your choice at any time in{' '}
              <strong>Settings → Ad privacy choices</strong>. You can also reset or delete your Advertising ID in Android{' '}
              <strong>Settings → Privacy → Ads</strong>.
            </p>

            <h2>Biometrics</h2>
            <p>
              Fingerprint and face unlock are handled entirely by Android. Veil never receives your biometric data. It
              only receives a pass or fail result.
            </p>

            <h2>Permissions</h2>
            <ul>
              <li>
                <strong>Use biometric hardware</strong>: for optional fingerprint or face unlock.
              </li>
              <li>
                <strong>Internet and Advertising ID</strong>: used only by the ads SDK.
              </li>
              <li>
                <strong>App visibility (launcher apps)</strong>: to list apps you can choose to hide. Veil never
                modifies, disables or uninstalls other apps.
              </li>
            </ul>

            <h2>Data sharing and selling</h2>
            <p>
              We do not sell your personal information. Apart from the advertising data described above, which is
              processed by Google, we do not share any data with third parties.
            </p>

            <h2>Children</h2>
            <p>
              Veil is not directed at children under 13 (or under 16 in the EEA), and we do not knowingly collect their
              data.
            </p>

            <h2>Data retention and deletion</h2>
            <p>
              Everything Veil stores lives on your device. Uninstalling Veil deletes all of it. Data collected by Google
              for advertising is retained according to Google’s policies.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              If we change this policy, we will update the date above and, for significant changes, notify you in the
              app.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about privacy? Email <a href={mail}>{site.supportEmail}</a>.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
