// Single source of truth for the site's public identity — SEO tags,
// sitemap.xml, robots.txt and structured data all read from here so there
// is exactly one place to update once real values exist.
//
// SITE_URL is a placeholder. Swap it for the real production domain the
// moment one is registered, and regenerate public/sitemap.xml (the slugs
// list mirrors PRODUCTS from ./products.js, so re-run scripts/generate-
// sitemap style logic — or just hand-edit — if that constant changes).
export const SITE_URL = 'https://niana.bags'
export const SITE_NAME = 'Niana'
export const SITE_TAGLINE = 'Handmade bags, Slovakia & Belgium'
export const DEFAULT_OG_IMAGE = '/images/hero.png'

// Where the About page's email signup POSTs to. Empty means "not wired
// up yet": the form then tells people to email instead of pretending to
// subscribe them (it used to silently discard the address and show a
// thank-you). Paste the form action URL from whichever provider is used
// — Buttondown, Mailchimp, EmailOctopus all give you one.
//
// IMPORTANT: the moment this is non-empty the site starts collecting
// personal data, which makes the Privacy Policy's "does not currently
// collect personal data through forms" line untrue. Update
// src/pages/Privacy.jsx in the same change.
export const NEWSLETTER_ENDPOINT = ''

// Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX". Empty (the
// committed default) means analytics is off entirely: no script is
// fetched and no cookie is ever set.
//
// GA4 is cookie-based, and this studio is EU-based and EU-facing, so
// under GDPR/ePrivacy it must not run until the visitor actively opts
// in — consent is handled by the banner and nothing loads before it.
// Switching this on also requires:
//   - allowing googletagmanager/google-analytics in script-src,
//     connect-src and img-src (public/_headers and vercel.json),
//   - keeping the Privacy Policy's cookie section truthful.
export const ANALYTICS_ID = ''

export const OPERATOR = {
  name: 'Nina Hajdíková',
  locality: 'Považská Bystrica',
  country: 'Slovakia',
  countryCode: 'SK',
  email: 'hajdikovanina@gmail.com',
  instagram: 'https://www.instagram.com/niana.bags/',
}
