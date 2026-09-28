# Niana website — design spec

Date: 2026-08-23
Status: Approved by user, proceeding to implementation plan.

## Goal

Build a production website for Niana (handmade crochet/leather/denim bags,
two-person studio between Slovakia and Belgium, sells via Instagram
@niana.bags), based on the "Brand guideline design system" imported from the
user's Claude Design project (project id `0eb67b49-e5bc-447b-8a69-193cc7bd91f5`),
with real product photography and GSAP-driven animation.

## Source material

- **Design kit** (`claude_design` MCP project, read via `DesignSync`): brand
  tokens (`tokens/*.css`), 20 React components across
  `components/{core,forms,navigation,feedback,commerce}`, four page
  compositions (`ui_kits/website/{Home,Collection,Product,About,Chrome}.jsx`),
  and `readme.md` (voice rules, palette, type, motion spec — see below).
- **Real assets** (already on disk, not part of the design kit):
  `niana/photos/` — 49 real product/lifestyle photos; `niana/niana-site.html`
  — a prior single-page teaser build (useful for a few already-vetted photo
    crops, superseded by this multi-page build); `niana/niana.txt` — Instagram
    handle `instagram.com/niana.bags`.

## Stack decisions

- **Vite + React**, plain JS/JSX (no TypeScript — the kit's `.d.ts` files are
  treated as documentation of prop shapes, not compiled types).
- **react-router-dom**, 4 routes: `/` (Home), `/collection` (Collection),
  `/collection/:slug` (Product), `/about` (About). `Chrome.jsx`'s `Header`/
  `Footer` become a persistent layout wrapping an `<Outlet>`.
- **GSAP** (`npm install gsap`) + `ScrollTrigger` + `SplitText` (all free as
  of the 2025 Webflow/GreenSock license change — no club membership needed).
- Scaffolded at the repo root (`C:\Users\jakub\Desktop\NinkaWebsite`); `niana/`
  keeps holding the raw source photos/brand files untouched.

## Design tokens

Ported verbatim into `src/styles/tokens/` from the kit's `tokens/colors.css`,
`typography.css`, `spacing.css`, `motion.css`, `surfaces.css`, `fonts.css`:

- Palette: `--ink #191714`, `--oat #E3DECE`, `--stone #CBC2BF`,
  `--umber #4B3230`, plus alpha tints and the semantic surface/text/control
  variables built from them. No fifth color.
- Type: Jost (300/400/500) for everything, WindSong for the monogram only,
  loaded from Google Fonts. Display/heading/body/label scale as defined in
  `typography.css`.
- Motion: one easing, `--ease-cloth` `cubic-bezier(0.22, 0.61, 0.36, 1)`;
  durations 160/280/520/900ms. Scroll reveals are fade + 12px rise over
  `--dur-reveal` — this becomes the default GSAP reveal, not just a CSS ideal.
- Radii 4/12/28/44/999, hairline borders, near-absent shadows
  (`--shadow-media` only, under photography/dialogs).
- `assets/running-stitch.png` (already pulled from the kit into
  `design-kit/assets/`) wired to `--stitch` for `StitchDivider`.

## Components

All 20 kit components ported as-is (they're inline-style React reading CSS
vars, already framework-portable) into `src/components/`:

- `core/`: Icon, Button, IconButton, Tag, Badge, Card, Logo, StitchDivider,
  SectionHeading
- `forms/`: Input, Select, Checkbox, Radio, Switch
- `navigation/`: NavList, Tabs
- `feedback/`: Dialog, Toast, Tooltip
- `commerce/`: MediaFrame, ProductCard

`Icon` keeps the kit's Lucide-via-CDN mask approach (`unpkg.com/lucide-static`)
— an intentional, already-documented substitution in the kit's own readme.

## Content model

### Product catalog (5 products, real photos, no invented prices)

The brand's own voice rule: *"Numbers are used only where they are real:
prices, step numbers, pagination."* No real price list exists anywhere in the
supplied files, so **no price is invented**. Every product's price slot reads
**"Made to order — message @niana.bags"**, linking to
`https://www.instagram.com/niana.bags/`. Real prices can be dropped in later
by editing one data file (`src/data/products.js`).

Products are named by color, matching how the brand itself tags them (visible
"NIANA" plate, no other name), not the kit's placeholder English names:

| Slug | Name | Material | Primary photo | Detail photos |
| --- | --- | --- | --- | --- |
| `bordova` | Bordová | Crochet | `image00013.jpeg` (hero crop, worn) | `image00006.jpeg` (beaded detail) |
| `malinova` | Malinová | Crochet | `image00101.jpeg` (lace outfit) | `image00100.jpeg` (graffiti wall) |
| `olivova` | Olivová | Crochet | `image00077.jpeg` (doorway, seated) | `image00090.jpeg` / `image00096.jpeg` (doorway, standing) |
| `modra` | Modrá | Leather | `image00002.jpeg` (crouching, lipstick) | — |
| `denim` | Denim tote | Denim | `Denim bag.jpg` | — |

Materials filter set: All / Crochet / Leather / Denim (matches Collection's
`Tabs`). "Made to order" checkbox stays functional (all 5 are, honestly, made
to order for this brand — filtering shows all 5).

### Copy

Pulled from the kit's `readme.md`, not invented:

- Tagline: "Made by hand, piece by piece."
- About lede: "Every Niana bag is made by hand in small batches — crochet,
  leather and denim, cut and finished one piece at a time."
- Product description: "Because each piece is worked by hand, no two are
  identical — the stitch, the settle and the shape are yours alone."
- Care (crochet default, from the kit's Product.jsx dialog): "Spot clean
  only. Reshape by hand and dry flat, away from direct sun." Leather gets the
  readme's added line ("...takes a clear balm twice a year"); denim gets a
  short cold-wash/no-tumble-dry line consistent in tone, since the kit didn't
  specify one.
- Process steps (About, verbatim): 01 Draft / 02 Work / 03 Finish.
- Empty state: "Nothing in this cut yet. Try another material."

### Footer (departs from the kit here, deliberately)

The kit's footer invents policy links (Shipping/Returns/Repairs/Terms) and a
Pinterest presence that don't exist for this brand yet. Replaced with:
- Shop column links into real Collection filters (Crochet/Leather/Denim/Made
  to order).
- Studio column: About, Journal (anchors into About's signup section),
  Contact → Instagram DM.
- Care column dropped to a single honest line pointing at each product's
  Care dialog, rather than fabricated policy pages.
- Social line: Instagram only (real handle), no Pinterest.

## Pages

- **Home** — hero: oversized Jost-Light display type ("made by hand" /
  "piece by piece") with a real product cutout image breaking the line
  (negative-margin overlap, per the kit). About strip. Stone "new arrivals"
  band: one product per material (Bordová / Modrá / Denim), `Tabs`-filtered.
  Editorial collage using real texture/detail crops. Closing giant outlined
  "NIANA" wordmark.
- **Collection** — material `Tabs` + "made to order" `Checkbox` + sort
  `Select` (by name, since there's no real price to sort by — kit's
  price-sort options are dropped), 5-item `ProductCard` grid, real
  client-side filter/sort, kit's empty-state copy when a filter yields
  nothing.
- **Product** (`/collection/:slug`) — media stack (primary + detail shots),
  strap/lining variant `Radio`/`Select` kept only where the real product
  photography shows the option (crochet pieces show a handle + optional
  crossbody strap; leather/denim get simplified variant lists), care
  `Dialog` with material-specific text, "Add to bag" → decorative `Toast`,
  "Message to order" → Instagram.
- **About** — studio narrative (real copy above), 3-step process band,
  journal signup `Input` + `Button` that shows a decorative confirmation
  `Toast` on submit (no backend — this is a lookbook, not a live mailing
  list, per the agreed commerce scope).

## Animation (GSAP)

- `ScrollTrigger`-driven reveal (fade + 12px rise, `--dur-reveal`/
  `--ease-cloth`) applied via one reusable hook/wrapper to every section,
  replacing the kit's implied-but-unimplemented CSS motion spec.
- `SplitText` line reveal on the Home hero's two display-type lines.
- Subtle scroll parallax (`ScrollTrigger` `scrub`) on the hero product cutout
  and the editorial collage images — restrained, no bounce/overshoot per the
  brand's one-easing rule.
- Soft crossfade on route change.
- Toast enter/exit animated with GSAP instead of the kit's implicit CSS.
- Everything gated behind `prefers-reduced-motion` (matches the kit's
  existing CSS rule; GSAP timelines check `matchMedia` and skip/shorten).

## Photography pipeline

Source photos run up to ~15MB (uncompressed camera originals). A one-time
Node script (using `sharp`, added as a devDependency) reproduces the prior
session's already-vetted crops plus the new leather/denim/about selections,
and writes optimized JPEGs into `public/images/`. Originals in `niana/photos`
are left untouched; nothing in the built site references a multi-MB source
file directly.

## Out of scope / open items

- No git repository exists yet in this folder — proceeding without version
  control for now; can `git init` later if wanted.
- No real backend: cart, checkout, and newsletter signup are all decorative,
  matching the "Lookbook + Instagram CTA" commerce decision.
- No real pricing — flagged above, trivial to add later.
- Design kit's TypeScript `.d.ts` files are not compiled; JS is used for
  speed. Can be migrated to TS later if the project wants it.
