// Single source of truth for everything you need to fill in before launch.

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: 'Veil',
  title: 'Veil: Hide Apps & App Vault',
  tagline: 'Hide apps. Keep your peace.',
  description:
    'Hide apps behind a PIN or fingerprint, disguise them as a calculator, and keep a private app vault. Veil is the calm, beautiful app hider for Android.',

  /** Your public URL. On Vercel this is detected automatically. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000'),

  /** Must match android.package in the app's app.json. */
  packageName: 'com.veil.apphider',

  // ─── TODO: replace before submitting to Google Play ───────────────────────
  supportEmail: 'SUPPORT_EMAIL',
  /** Must match the name on your Google Play developer account. */
  developerName: 'DEVELOPER_NAME',
  privacyUpdated: 'November 18, 2026',
  copyrightYear: 2026,
} as const;

export const playUrl = `https://play.google.com/store/apps/details?id=${site.packageName}`;
