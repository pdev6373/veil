# Veil website

The landing page, privacy policy and `app-ads.txt` for **Veil: Hide Apps & App Vault**. Built with Next.js 16 (App Router), and every page is prerendered as static.

| URL | Use it for |
|---|---|
| `/` | Play Console → Store listing → **Website** |
| `/privacy` | Play Console → App content → **Privacy policy**, and `PRIVACY_POLICY_URL` in the app's `src/config.ts` |
| `/app-ads.txt` | AdMob app verification |
| `/sitemap.xml`, `/robots.txt` | Search engines (generated) |

## Before deploying
1. In **`lib/site.ts`**, set `supportEmail` and `developerName`. The developer name must match your Play developer account. If you changed the app's package name, update `packageName` too.
2. In **`public/app-ads.txt`**, replace `pub-XXXXXXXXXXXXXXXX` with your AdMob publisher ID.

On Vercel the site URL is detected automatically. Elsewhere, set the `NEXT_PUBLIC_SITE_URL` environment variable.

## Develop
```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Deploy to Vercel
```bash
npx vercel --prod
```
Or push this repo to GitHub and import it at vercel.com/new. Add your custom domain later in Project → Settings → Domains. No code changes are needed.

## Structure
```
app/            layout (font, metadata), page (landing), privacy/, sitemap, robots, icons, OG image
components/     brand (logo sprite), chrome (nav, footer, Play badge), client (scroll effects, calculator), icons
lib/site.ts     every value to fill in before launch
public/         app-ads.txt, Google Play badge
```
