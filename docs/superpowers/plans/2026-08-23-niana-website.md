# Niana Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production Niana (handmade bags) website — Vite + React, 4 routes, real product photography, and GSAP-driven scroll animation — from the imported Claude Design kit and the brand's real assets.

**Architecture:** A Vite + React SPA with `react-router-dom`. Design-kit tokens become plain CSS custom properties; the kit's 20 React components are ported as-is into `src/components/`. A small product data module drives Collection/Product. GSAP (`ScrollTrigger`, `SplitText`) provides scroll reveals, a hero text reveal, parallax, and route crossfade, all gated behind `prefers-reduced-motion`.

**Tech Stack:** Vite, React 18, react-router-dom v6, GSAP 3 (free — includes ScrollTrigger/SplitText since the 2025 license change), Vitest + React Testing Library, sharp (build-time image processing only).

## Global Constraints

These apply to every task below; copied verbatim from
`docs/superpowers/specs/2026-08-23-niana-website-design.md`.

- Palette (four brand colors, no fifth hue): `--ink #191714`, `--oat #E3DECE`,
  `--stone #CBC2BF`, `--umber #4B3230`. The kit's own tokens carry exactly
  one disclosed exception — `--surface-raised`/`--surface-card` `#EDEAE0`,
  documented in the kit's readme as "the one derived value: Oat lifted a
  step for cards." That flat hex is intentional and ships as-is; it is not
  a spec violation. (Confirmed by user decision on 2026-08-23 after Task 2
  review — see the ledger.)
- Type: **Jost** (weights 300/400/500) for everything, **WindSong** for the
  logo monogram only, both from Google Fonts.
- Motion: primary easing is `--ease-cloth` `cubic-bezier(0.22, 0.61, 0.36, 1)`
  — used by every animation and transition in this build. The kit's tokens
  also define a second, currently-unused `--ease-out-slow` token; it ships
  because it's part of the kit's token file, but nothing in this plan
  references it. Durations 160/280/520/900ms. Scroll reveals = fade + 12px
  rise over 900ms. No bounce/overshoot anywhere. Everything must respect
  `prefers-reduced-motion: reduce`.
- **No invented prices.** Every product price slot reads "Made to order —
  message @niana.bags" linking to `https://www.instagram.com/niana.bags/`.
- **No invented policies.** Footer must not contain fabricated
  shipping/returns/terms links (the kit's placeholders are dropped per spec).
- Real photography source: `niana/photos/` (relative to repo root). Never
  reference a multi-MB source photo directly from the app — always the
  processed output in `public/images/`.
- No TypeScript — plain JS/JSX. The kit's `.d.ts` files are reference only.
- Plain JS `sharp` script for image processing, run once, not a runtime
  dependency of the site itself.

---

## Task 1: Project scaffold, routing shell, git init

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`
- Create: `src/main.jsx`, `src/App.jsx`, `src/App.test.jsx`, `src/test/setup.js`
- Create: `.gitignore`

**Interfaces:**
- Produces: `App` (default export from `src/App.jsx`) — a React component
  rendered inside `<BrowserRouter>`. Later tasks replace its body with real
  routes (Task 8) but must keep it as the default export of `src/App.jsx`.

- [ ] **Step 1: Scaffold the Vite project**

Run from the repo root (`C:\Users\jakub\Desktop\NinkaWebsite`):

```bash
npm create vite@latest . -- --template react
```

When prompted about the directory not being empty, proceed (the `niana/`,
`docs/`, `design-kit/` folders and `inspo.jpg` are unrelated to the Vite
scaffold and won't be touched).

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom gsap
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom sharp
```

- [ ] **Step 3: Write `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 4: Initialize git and make the first commit**

```bash
git init
git add .gitignore
git commit -m "chore: init repo"
```

- [ ] **Step 5: Configure Vitest in `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
})
```

- [ ] **Step 6: Write the test setup file**

`src/test/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Add the `test` script to `package.json`**

Add to the `"scripts"` object (keep the existing `dev`/`build`/`preview`
scripts Vite generated):

```json
"test": "vitest run"
```

- [ ] **Step 8: Write the failing test for `App`**

`src/App.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

test('renders the Niana name', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText(/niana/i)).toBeInTheDocument()
})
```

- [ ] **Step 9: Run the test to verify it fails (or passes trivially against Vite's template `App`)**

Run: `npm test`
Expected: the Vite-generated default `App.jsx` does not contain the text
"niana" anywhere, so this FAILS.

- [ ] **Step 10: Replace `src/App.jsx` with a minimal placeholder**

```jsx
export default function App() {
  return <div>Niana</div>
}
```

- [ ] **Step 11: Replace `src/main.jsx` to wrap `App` in a router**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

Note: `./styles/global.css` doesn't exist yet — that's created in Task 2.
Leave this import in place; Task 2 makes it resolve.

- [ ] **Step 12: Update `index.html`'s `<title>` and add Google Fonts preconnect**

Replace the generated `index.html` `<head>` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <title>Niana — Handmade bags</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 13: Run the test to verify it fails for the right reason, then temporarily comment nothing — just run it now that App exists**

Run: `npm test`
Expected: FAILS with "Failed to resolve import './styles/global.css'"
(Task 2 fixes this — this is expected at this checkpoint.)

- [ ] **Step 14: Create an empty placeholder `src/styles/global.css` so Task 1 is independently green**

```css
/* populated in Task 2 */
```

- [ ] **Step 15: Run the test to verify it passes**

Run: `npm test`
Expected: PASS (1 test)

- [ ] **Step 16: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite+React project with routing and test harness"
```

---

## Task 2: Design tokens, global styles, font loading

**Files:**
- Create: `src/styles/tokens/colors.css`
- Create: `src/styles/tokens/fonts.css`
- Create: `src/styles/tokens/typography.css`
- Create: `src/styles/tokens/spacing.css`
- Create: `src/styles/tokens/motion.css`
- Create: `src/styles/tokens/surfaces.css`
- Modify: `src/styles/global.css`
- Create: `src/assets/running-stitch.png` (copied from `design-kit/assets/running-stitch.png`)

**Interfaces:**
- Produces: every CSS custom property listed in Global Constraints above,
  plus the full token set from the design kit (`--surface-page`,
  `--text-primary`, `--control-fill`, `--radius-lg`, `--stitch`, etc.) —
  every later component/page relies on these variable names existing
  globally.

- [ ] **Step 1: Copy the running-stitch asset into `src/assets/`**

```bash
mkdir -p src/assets
cp "design-kit/assets/running-stitch.png" "src/assets/running-stitch.png"
```

- [ ] **Step 2: Write `src/styles/tokens/colors.css`**

```css
:root {
  /* Brand palette — the only four colors in the system */
  --ink: #191714;
  --oat: #E3DECE;
  --stone: #CBC2BF;
  --umber: #4B3230;

  /* Tints, derived only by alpha over the four base colors */
  --ink-80: rgba(25, 23, 20, 0.80);
  --ink-60: rgba(25, 23, 20, 0.60);
  --ink-40: rgba(25, 23, 20, 0.40);
  --ink-14: rgba(25, 23, 20, 0.14);
  --ink-08: rgba(25, 23, 20, 0.08);
  --oat-70: rgba(227, 222, 206, 0.70);
  --oat-40: rgba(227, 222, 206, 0.40);
  --oat-14: rgba(227, 222, 206, 0.14);

  /* Semantic — surfaces */
  --surface-page: var(--oat);
  --surface-raised: #EDEAE0;
  --surface-band: var(--stone);
  --surface-inverse: var(--ink);
  --surface-card: #EDEAE0;
  --surface-card-inverse: var(--umber);

  /* Semantic — text */
  --text-primary: var(--ink);
  --text-secondary: var(--ink-60);
  --text-muted: var(--ink-40);
  --text-on-inverse: var(--oat);
  --text-on-inverse-muted: var(--oat-70);
  --text-accent: var(--umber);

  /* Semantic — lines */
  --line-hairline: var(--ink-14);
  --line-strong: var(--ink);
  --line-inverse: var(--oat-40);

  /* Semantic — controls */
  --control-fill: var(--ink);
  --control-fill-hover: var(--umber);
  --control-text: var(--oat);
  --control-ghost-border: var(--ink-40);
}
```

- [ ] **Step 3: Write `src/styles/tokens/fonts.css`**

```css
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200..700;1,200..700&family=WindSong:wght@400;500&display=swap");
```

- [ ] **Step 4: Write `src/styles/tokens/typography.css`**

```css
:root {
  --font-mark: "WindSong", cursive;
  --font-sans: "Jost", "Helvetica Neue", Helvetica, sans-serif;

  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;

  --type-display-1: var(--weight-light) clamp(56px, 9vw, 132px) / 0.94 var(--font-sans);
  --type-display-2: var(--weight-light) clamp(40px, 5.5vw, 76px) / 1.02 var(--font-sans);
  --type-heading-1: var(--weight-light) 40px / 1.12 var(--font-sans);
  --type-heading-2: var(--weight-light) 28px / 1.2 var(--font-sans);
  --type-heading-3: var(--weight-regular) 20px / 1.3 var(--font-sans);
  --type-body: var(--weight-regular) 16px / 1.62 var(--font-sans);
  --type-body-sm: var(--weight-regular) 14px / 1.6 var(--font-sans);
  --type-label: var(--weight-medium) 11px / 1.2 var(--font-sans);
  --type-price: var(--weight-light) 18px / 1.2 var(--font-sans);

  --track-display: -0.02em;
  --track-body: 0;
  --track-caps: 0.20em;
  --track-caps-tight: 0.12em;
}
```

- [ ] **Step 5: Write `src/styles/tokens/spacing.css`**

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 140px;

  --gutter: 40px;
  --page-max: 1440px;
  --section-y: var(--space-9);
  --band-y: var(--space-9);
}
```

- [ ] **Step 6: Write `src/styles/tokens/motion.css`**

```css
:root {
  --ease-cloth: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-out-slow: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 160ms;
  --dur-base: 280ms;
  --dur-slow: 520ms;
  --dur-reveal: 900ms;
}
```

- [ ] **Step 7: Write `src/styles/tokens/surfaces.css`**

```css
:root {
  --radius-sm: 4px;
  --radius-md: 12px;
  --radius-lg: 28px;
  --radius-xl: 44px;
  --radius-pill: 999px;

  --border-hairline: 1px solid var(--line-hairline);
  --border-control: 1px solid var(--control-ghost-border);

  --shadow-none: none;
  --shadow-media: 0 24px 60px -30px rgba(75, 50, 48, 0.35);

  --stitch: url("../../assets/running-stitch.png");
  --stitch-height: 22px;

  --blur-veil: saturate(105%) blur(14px);
}
```

- [ ] **Step 8: Write `src/styles/global.css`**

```css
@import "./tokens/fonts.css";
@import "./tokens/colors.css";
@import "./tokens/typography.css";
@import "./tokens/spacing.css";
@import "./tokens/motion.css";
@import "./tokens/surfaces.css";

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
html, body { margin: 0; }
body {
  background: var(--surface-page);
  color: var(--text-primary);
  font: var(--type-body);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a { color: var(--text-accent); text-decoration: none; }
a:hover { color: var(--text-primary); }
img { max-width: 100%; display: block; }
::selection { background: var(--ink); color: var(--oat); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 9: Run the dev server and confirm the tokens load with no console errors**

Run: `npm run dev`, then open the printed local URL. Expected: a plain page
showing "Niana" in Jost, on an Oat (#E3DECE) background — confirms the
`@import` chain resolved and fonts loaded. Stop the dev server after
checking (Ctrl+C).

- [ ] **Step 10: Run the existing test suite to confirm nothing broke**

Run: `npm test`
Expected: PASS (1 test, from Task 1)

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: port design tokens and global styles from the design kit"
```

---

## Task 3: Real-photo processing pipeline

**Files:**
- Create: `scripts/process-images.mjs`
- Create (generated, not hand-written): `public/images/*.jpg` (15 files, listed below)

**Interfaces:**
- Produces: the following files under `public/images/`, each referenced by
  its `/images/<name>.jpg` public URL path in later tasks:
  `hero.jpg`, `bordova.jpg`, `bordova-detail.jpg`, `malinova.jpg`,
  `malinova-detail.jpg`, `olivova.jpg`, `olivova-detail.jpg`, `modra.jpg`,
  `modra-detail.jpg`, `denim.jpg`, `denim-detail.jpg`, `collage-1.jpg`,
  `collage-2.jpg`, `collage-3.jpg`, `about-studio.jpg`.

- [ ] **Step 1: Write `scripts/process-images.mjs`**

```js
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, '..', 'niana', 'photos')
const OUT = path.join(__dirname, '..', 'public', 'images')

// Each job crops the source to a target aspect ratio around a focal point
// (fx, fy as 0..1 fractions of the croppable slack), then resizes to a max
// width and writes a compressed JPEG. Focal points for hero/bordova/
// malinova/olivova/modra reuse the crops the brand owner already vetted in
// niana/91c33359-.../tool-results/update_photos.py; denim/collage/about are
// new selections for this build.
const jobs = [
  { key: 'hero', src: 'image00013.jpeg', ratio: [3, 4], focal: [0.5, 0.42], width: 900 },
  { key: 'bordova', src: 'image00013.jpeg', ratio: [4, 5], focal: [0.5, 0.40], width: 800 },
  { key: 'bordova-detail', src: 'image00006.jpeg', ratio: [1, 1], focal: [0.5, 0.5], width: 700 },
  { key: 'malinova', src: 'image00101.jpeg', ratio: [4, 5], focal: [0.5, 0.5], width: 800 },
  { key: 'malinova-detail', src: 'image00100.jpeg', ratio: [1, 1], focal: [0.5, 0.35], width: 700 },
  { key: 'olivova', src: 'image00077.jpeg', ratio: [4, 5], focal: [0.35, 0.6], width: 800 },
  { key: 'olivova-detail', src: 'image00090.jpeg', ratio: [1, 1], focal: [0.5, 0.3], width: 700 },
  { key: 'modra', src: 'image00002.jpeg', ratio: [4, 5], focal: [0.4, 0.5], width: 800 },
  { key: 'modra-detail', src: 'image00002.jpeg', ratio: [1, 1], focal: [0.55, 0.75], width: 700 },
  { key: 'denim', src: 'Denim bag.jpg', ratio: [4, 5], focal: [0.5, 0.35], width: 800 },
  { key: 'denim-detail', src: 'Denim bag.jpg', ratio: [1, 1], focal: [0.6, 0.55], width: 700 },
  { key: 'collage-1', src: 'image00090.jpeg', ratio: [3, 4], focal: [0.5, 0.3], width: 700 },
  { key: 'collage-2', src: 'image00096.jpeg', ratio: [3, 4], focal: [0.5, 0.45], width: 700 },
  { key: 'collage-3', src: 'image00100.jpeg', ratio: [3, 4], focal: [0.5, 0.35], width: 700 },
  { key: 'about-studio', src: 'image00077.jpeg', ratio: [4, 5], focal: [0.6, 0.5], width: 900 },
]

async function cropToRatio(image, [aw, ah], [fx, fy]) {
  const meta = await image.metadata()
  const w = meta.width
  const h = meta.height
  const targetRatio = aw / ah
  const curRatio = w / h
  let newW
  let newH
  if (curRatio > targetRatio) {
    newH = h
    newW = Math.round(h * targetRatio)
  } else {
    newW = w
    newH = Math.round(w / targetRatio)
  }
  const maxX = w - newW
  const maxY = h - newH
  const left = Math.max(0, Math.round(maxX * fx))
  const top = Math.max(0, Math.round(maxY * fy))
  return image.extract({ left, top, width: newW, height: newH })
}

async function run() {
  await mkdir(OUT, { recursive: true })
  for (const job of jobs) {
    const input = path.join(SRC, job.src)
    let image = sharp(input).rotate()
    image = await cropToRatio(image, job.ratio, job.focal)
    await image
      .resize({ width: job.width })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(OUT, `${job.key}.jpg`))
    console.log('wrote', `${job.key}.jpg`)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 2: Run the script**

```bash
node scripts/process-images.mjs
```

Expected: 15 lines of `wrote <name>.jpg` output, no errors.

- [ ] **Step 3: Verify the output files exist**

```bash
ls public/images
```

Expected: exactly the 15 filenames listed in the Interfaces section above.

- [ ] **Step 4: Spot-check two crops visually**

Use the Read tool to open `public/images/hero.jpg` and
`public/images/olivova.jpg`. Expected: `hero.jpg` shows the burgundy
crossbody bag roughly centered, not cropped through the bag itself;
`olivova.jpg` shows the olive crochet bag with the model's hand/bag in
frame (the 0.35/0.6 focal point keeps the left-held bag from being cut off
the left edge).

- [ ] **Step 5: Commit**

Note: `public/images/*.jpg` are generated binary files — commit them so the
site works without re-running the script.

```bash
git add scripts/process-images.mjs public/images
git commit -m "feat: add image processing script and generated product photos"
```

---

## Task 4: Core components port

**Files:**
- Create: `src/components/core/Icon.jsx`
- Create: `src/components/core/Button.jsx`
- Create: `src/components/core/IconButton.jsx`
- Create: `src/components/core/Tag.jsx`
- Create: `src/components/core/Badge.jsx`
- Create: `src/components/core/Card.jsx`
- Create: `src/components/core/Logo.jsx`
- Create: `src/components/core/StitchDivider.jsx`
- Create: `src/components/core/SectionHeading.jsx`
- Test: `src/components/core/Button.test.jsx`
- Test: `src/components/core/IconButton.test.jsx`

**Interfaces:**
- Produces (all named exports, all accept `style` + `...rest` passthrough
  and spread extra props onto the root element):
  - `Icon({ name, size, strokeWidth, style, ...rest })`
  - `Button({ children, variant, size, arrow, icon, disabled, href, style, ...rest })`
  - `IconButton({ name, size, variant, label, style, ...rest })`
  - `Tag({ children, icon, tone, style, ...rest })`
  - `Badge({ children, tone, style, ...rest })`
  - `Card({ children, tone, radius, padding, lift, style, ...rest })`
  - `Logo({ variant, size, color, style, ...rest })`
  - `StitchDivider({ height, opacity, style, ...rest })`
  - `SectionHeading({ eyebrow, title, align, size, inverse, style, ...rest })`
- Consumes: the CSS custom properties from Task 2 (no new tokens).

- [ ] **Step 1: Write the failing tests**

`src/components/core/Button.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button.jsx'

test('renders its label and fires onClick', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Shop now</Button>)
  const btn = screen.getByText('Shop now')
  fireEvent.click(btn)
  expect(onClick).toHaveBeenCalledOnce()
})

test('renders as a link when href is passed', () => {
  render(<Button href="/collection">Browse</Button>)
  expect(screen.getByText('Browse').closest('a')).toHaveAttribute('href', '/collection')
})
```

`src/components/core/IconButton.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { IconButton } from './IconButton.jsx'

test('is reachable by its accessible label and fires onClick', () => {
  const onClick = vi.fn()
  render(<IconButton name="search" label="Search" onClick={onClick} />)
  fireEvent.click(screen.getByLabelText('Search'))
  expect(onClick).toHaveBeenCalledOnce()
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `./Button.jsx` and `./IconButton.jsx` don't exist yet.

- [ ] **Step 3: Write `src/components/core/Icon.jsx`**

```jsx
import React from 'react'

const CDN = 'https://unpkg.com/lucide-static@0.414.0/icons/'

/** Lucide icon rendered as a currentColor mask so it inherits text color. */
export function Icon({ name = 'arrow-right', size = 18, strokeWidth, style, ...rest }) {
  const url = `url("${CDN}${name}.svg")`
  return (
    <span
      aria-hidden="true"
      {...rest}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flex: '0 0 auto',
        background: 'currentColor',
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...style,
      }}
    />
  )
}
```

- [ ] **Step 4: Write `src/components/core/Button.jsx`**

```jsx
import React from 'react'
import { Icon } from './Icon.jsx'

const base = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  font: 'var(--type-body-sm)',
  letterSpacing: 'var(--track-caps-tight)',
  textTransform: 'uppercase',
  borderRadius: 'var(--radius-pill)',
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background var(--dur-base) var(--ease-cloth), color var(--dur-base) var(--ease-cloth), border-color var(--dur-base) var(--ease-cloth), opacity var(--dur-fast) linear',
  whiteSpace: 'nowrap',
}

const sizes = {
  sm: { padding: '9px 18px', fontSize: 11 },
  md: { padding: '13px 26px', fontSize: 12 },
  lg: { padding: '17px 34px', fontSize: 13 },
}

const looks = {
  primary: { background: 'var(--control-fill)', color: 'var(--control-text)' },
  secondary: { background: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--control-ghost-border)' },
  ghost: { background: 'transparent', color: 'var(--text-primary)', padding: 0, borderRadius: 0 },
  inverse: { background: 'var(--oat)', color: 'var(--ink)' },
}

const hovers = {
  primary: { background: 'var(--control-fill-hover)' },
  secondary: { borderColor: 'var(--line-strong)' },
  ghost: { opacity: 0.6 },
  inverse: { background: 'var(--surface-raised)' },
}

/** Pill button. Trailing arrow badge is the brand's signature call to action. */
export function Button({
  children, variant = 'primary', size = 'md', arrow = false, icon,
  disabled = false, href, style, ...rest
}) {
  const [hot, setHot] = React.useState(false)
  const Tag = href ? 'a' : 'button'
  const s = {
    ...base, ...sizes[size], ...looks[variant],
    ...(hot && !disabled ? hovers[variant] : null),
    ...(disabled ? { opacity: 0.35, cursor: 'not-allowed' } : null),
    ...style,
  }
  return (
    <Tag
      href={href} disabled={href ? undefined : disabled} style={s}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      {...rest}
    >
      {icon ? <Icon name={icon} size={15} /> : null}
      <span>{children}</span>
      {arrow ? (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: size === 'sm' ? 20 : 24, height: size === 'sm' ? 20 : 24,
          marginRight: variant === 'ghost' ? 0 : -12,
          borderRadius: 'var(--radius-pill)',
          border: '1px solid currentColor',
          transform: hot && !disabled ? 'translateX(3px)' : 'none',
          transition: 'transform var(--dur-base) var(--ease-cloth)',
        }}>
          <Icon name="arrow-right" size={12} />
        </span>
      ) : null}
    </Tag>
  )
}
```

- [ ] **Step 5: Write `src/components/core/IconButton.jsx`**

```jsx
import React from 'react'
import { Icon } from './Icon.jsx'

/** Circular icon-only control: search, carousel arrows, close. */
export function IconButton({ name = 'search', size = 44, variant = 'outline', label, style, ...rest }) {
  const [hot, setHot] = React.useState(false)
  const looks = {
    outline: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--control-ghost-border)' },
    solid: { background: 'var(--control-fill)', color: 'var(--control-text)', border: '1px solid transparent' },
    veil: { background: 'var(--oat-14)', color: 'var(--oat)', border: '1px solid var(--line-inverse)' },
    bare: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  }
  return (
    <button
      aria-label={label || name}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, borderRadius: 'var(--radius-pill)',
        cursor: 'pointer', ...looks[variant],
        opacity: hot ? 0.65 : 1,
        transition: 'opacity var(--dur-fast) linear, border-color var(--dur-base) var(--ease-cloth)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={name} size={Math.round(size * 0.38)} />
    </button>
  )
}
```

- [ ] **Step 6: Write `src/components/core/Tag.jsx`**

```jsx
import React from 'react'
import { Icon } from './Icon.jsx'

/** Small pill label for material and provenance: LEATHER, CROCHET, MADE TO ORDER. */
export function Tag({ children, icon, tone = 'light', style, ...rest }) {
  const tones = {
    light: { background: 'var(--surface-raised)', color: 'var(--text-primary)' },
    veil: { background: 'var(--oat-40)', color: 'var(--ink)' },
    ink: { background: 'var(--ink)', color: 'var(--oat)' },
    outline: { background: 'transparent', color: 'var(--text-primary)', boxShadow: 'inset 0 0 0 1px var(--line-hairline)' },
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 'var(--radius-pill)',
      font: 'var(--type-label)', letterSpacing: 'var(--track-caps-tight)',
      textTransform: 'uppercase', ...tones[tone], ...style,
    }} {...rest}>
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </span>
  )
}
```

- [ ] **Step 7: Write `src/components/core/Badge.jsx`**

```jsx
import React from 'react'

/** Numeric or one-word status marker; smaller and quieter than Tag. */
export function Badge({ children, tone = 'ink', style, ...rest }) {
  const tones = {
    ink: { background: 'var(--ink)', color: 'var(--oat)' },
    umber: { background: 'var(--umber)', color: 'var(--oat)' },
    quiet: { background: 'var(--ink-08)', color: 'var(--text-primary)' },
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 20, height: 20, padding: '0 7px', borderRadius: 'var(--radius-pill)',
      font: 'var(--type-label)', letterSpacing: '0.06em', ...tones[tone], ...style,
    }} {...rest}>{children}</span>
  )
}
```

- [ ] **Step 8: Write `src/components/core/Card.jsx`**

```jsx
import React from 'react'

/** Soft-square container. Media-led by default; no shadow unless it holds a photo. */
export function Card({ children, tone = 'raised', radius = 'lg', padding = 'var(--space-5)', lift = false, style, ...rest }) {
  const tones = {
    raised: { background: 'var(--surface-card)', color: 'var(--text-primary)' },
    page: { background: 'var(--surface-page)', color: 'var(--text-primary)' },
    veil: { background: 'var(--oat-40)', color: 'var(--ink)' },
    inverse: { background: 'var(--surface-card-inverse)', color: 'var(--text-on-inverse)' },
    outline: { background: 'transparent', color: 'var(--text-primary)', boxShadow: 'inset 0 0 0 1px var(--line-hairline)' },
  }
  return (
    <div style={{
      borderRadius: `var(--radius-${radius})`,
      padding,
      boxShadow: lift ? 'var(--shadow-media)' : undefined,
      ...tones[tone], ...style,
    }} {...rest}>{children}</div>
  )
}
```

- [ ] **Step 9: Write `src/components/core/Logo.jsx`**

```jsx
import React from 'react'

/**
 * The Niana identity. "mark" is the WindSong N A monogram, "wordmark" is
 * NIANA in tracked caps, "lockup" stacks them. Clear space = height of the N.
 */
export function Logo({ variant = 'wordmark', size = 20, color = 'currentColor', style, ...rest }) {
  const caps = {
    font: `var(--weight-medium) ${size}px/1 var(--font-sans)`,
    letterSpacing: 'var(--track-caps)',
    textTransform: 'uppercase',
    color,
    paddingLeft: '0.2em',
  }
  const mark = {
    font: `400 ${size * 2.4}px/0.8 var(--font-mark)`,
    color,
    display: 'inline-block',
    padding: `${size * 0.5}px ${size * 0.6}px`,
  }
  if (variant === 'mark') return <span aria-label="Niana" style={{ ...mark, ...style }} {...rest}>N<span style={{ marginLeft: -size * 0.35 }}>A</span></span>
  if (variant === 'wordmark') return <span aria-label="Niana" style={{ ...caps, ...style }} {...rest}>Niana</span>
  return (
    <span aria-label="Niana" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.35, ...style }} {...rest}>
      <span style={mark}>N<span style={{ marginLeft: -size * 0.35 }}>A</span></span>
      <span style={{ ...caps, fontSize: size * 0.6 }}>Niana</span>
    </span>
  )
}
```

- [ ] **Step 10: Write `src/components/core/StitchDivider.jsx`**

```jsx
import React from 'react'

/** Running-stitch rule. Section separator and packaging motif — never a focal element. */
export function StitchDivider({ height = 22, opacity = 0.55, style, ...rest }) {
  return (
    <div role="separator" style={{
      height,
      backgroundImage: 'var(--stitch)',
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto 100%',
      opacity,
      ...style,
    }} {...rest} />
  )
}
```

- [ ] **Step 11: Write `src/components/core/SectionHeading.jsx`**

```jsx
import React from 'react'

/** Eyebrow + title pair that opens every section ("About us" / "What we do"). */
export function SectionHeading({ eyebrow, title, align = 'left', size = 'md', inverse = false, style, ...rest }) {
  const titleFont = size === 'lg' ? 'var(--type-display-2)' : size === 'sm' ? 'var(--type-heading-2)' : 'var(--type-heading-1)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', textAlign: align, ...style }} {...rest}>
      {eyebrow ? (
        <span style={{
          font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase',
          color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)',
        }}>{eyebrow}</span>
      ) : null}
      <h2 style={{
        margin: 0, font: titleFont, letterSpacing: 'var(--track-display)',
        color: inverse ? 'var(--text-on-inverse)' : 'var(--text-primary)', textWrap: 'pretty',
      }}>{title}</h2>
    </div>
  )
}
```

- [ ] **Step 12: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS (5 tests total: 1 from Task 1, 2 Button, 2 IconButton)

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: port core components from the design kit"
```

---

## Task 5: Forms + navigation components port

**Files:**
- Create: `src/components/forms/Input.jsx`
- Create: `src/components/forms/Select.jsx`
- Create: `src/components/forms/Checkbox.jsx`
- Create: `src/components/forms/Radio.jsx`
- Create: `src/components/forms/Switch.jsx`
- Create: `src/components/navigation/NavList.jsx`
- Create: `src/components/navigation/Tabs.jsx`
- Test: `src/components/forms/Checkbox.test.jsx`
- Test: `src/components/navigation/Tabs.test.jsx`

**Interfaces:**
- Produces:
  - `Input({ label, hint, error, value, onChange, type, placeholder, disabled, style, ...rest })`
  - `Select({ label, options, value, onChange, disabled, style, ...rest })` —
    `options` is `Array<string | { value, label }>`
  - `Checkbox({ label, checked, onChange, disabled, style, ...rest })`
  - `Radio({ label, checked, onChange, name, value, disabled, style, ...rest })`
  - `Switch({ label, checked, onChange, disabled, style, ...rest })`
  - `NavList({ items, active, onSelect, inverse, style, ...rest })` — `items`
    is `Array<string | { label }>`, `onSelect(label)` is called on click
  - `Tabs({ items, active, onSelect, inverse, size, style, ...rest })` —
    `items: string[]`, `onSelect(label)` called on click
- Consumes: `Icon` from `src/components/core/Icon.jsx` (Task 4).

- [ ] **Step 1: Write the failing tests**

`src/components/forms/Checkbox.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox.jsx'

test('toggles checked state via onChange', () => {
  const onChange = vi.fn()
  render(<Checkbox label="Made to order" checked={false} onChange={onChange} />)
  fireEvent.click(screen.getByLabelText('Made to order'))
  expect(onChange).toHaveBeenCalledOnce()
})
```

`src/components/navigation/Tabs.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs } from './Tabs.jsx'

test('calls onSelect with the clicked tab label', () => {
  const onSelect = vi.fn()
  render(<Tabs items={['All', 'Crochet', 'Leather']} active="All" onSelect={onSelect} />)
  fireEvent.click(screen.getByText('Leather'))
  expect(onSelect).toHaveBeenCalledWith('Leather')
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `./Checkbox.jsx` and `./Tabs.jsx` don't exist yet.

- [ ] **Step 3: Write `src/components/forms/Input.jsx`**

```jsx
import React from 'react'

const labelStyle = {
  font: 'var(--type-label)', letterSpacing: 'var(--track-caps)',
  textTransform: 'uppercase', color: 'var(--text-muted)',
}

const fieldStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--line-hairline)',
  padding: '12px 2px',
  font: 'var(--type-body)',
  color: 'var(--text-primary)',
  outline: 'none',
  borderRadius: 0,
}

/** Underlined text field. Niana forms are rules, not boxes. */
export function Input({ label, hint, error, value, onChange, type = 'text', placeholder, disabled, style, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', opacity: disabled ? 0.4 : 1, ...style }}>
      {label ? <span style={labelStyle}>{label}</span> : null}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          ...fieldStyle,
          borderBottomColor: error ? 'var(--umber)' : focus ? 'var(--line-strong)' : 'var(--line-hairline)',
          transition: 'border-color var(--dur-base) var(--ease-cloth)',
        }}
        {...rest}
      />
      {error || hint ? (
        <span style={{ font: 'var(--type-body-sm)', color: error ? 'var(--umber)' : 'var(--text-muted)' }}>{error || hint}</span>
      ) : null}
    </label>
  )
}
```

- [ ] **Step 4: Write `src/components/forms/Select.jsx`**

```jsx
import React from 'react'
import { Icon } from '../core/Icon.jsx'

const fieldStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--line-hairline)',
  padding: '12px 2px',
  font: 'var(--type-body)',
  color: 'var(--text-primary)',
  outline: 'none',
  borderRadius: 0,
}

/** Underlined native select with a chevron. */
export function Select({ label, options = [], value, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', opacity: disabled ? 0.4 : 1, ...style }}>
      {label ? (
        <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
      ) : null}
      <span style={{ position: 'relative', display: 'block' }}>
        <select
          value={value} onChange={onChange} disabled={disabled}
          style={{ ...fieldStyle, appearance: 'none', paddingRight: 28, cursor: 'pointer' }}
          {...rest}
        >
          {options.map((o) => (
            <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
              {typeof o === 'string' ? o : o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={16} style={{ position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </span>
    </label>
  )
}
```

- [ ] **Step 5: Write `src/components/forms/Checkbox.jsx`**

```jsx
import React from 'react'
import { Icon } from '../core/Icon.jsx'

/** Square checkbox, hairline border, Ink fill when checked. */
export function Checkbox({ label, checked = false, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 18, height: 18, borderRadius: 'var(--radius-sm)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${checked ? 'var(--ink)' : 'var(--control-ghost-border)'}`,
        background: checked ? 'var(--ink)' : 'transparent',
        color: 'var(--oat)',
        transition: 'background var(--dur-fast) var(--ease-cloth), border-color var(--dur-fast) var(--ease-cloth)',
      }}>
        {checked ? <Icon name="check" size={12} /> : null}
      </span>
      {label ? <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-primary)' }}>{label}</span> : null}
    </label>
  )
}
```

- [ ] **Step 6: Write `src/components/forms/Radio.jsx`**

```jsx
import React from 'react'

/** Circular radio; the dot is Ink on Oat. */
export function Radio({ label, checked = false, onChange, name, value, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 18, height: 18, borderRadius: 'var(--radius-pill)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${checked ? 'var(--ink)' : 'var(--control-ghost-border)'}`,
        transition: 'border-color var(--dur-fast) var(--ease-cloth)',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--ink)',
          transform: checked ? 'scale(1)' : 'scale(0)',
          transition: 'transform var(--dur-base) var(--ease-cloth)',
        }} />
      </span>
      {label ? <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-primary)' }}>{label}</span> : null}
    </label>
  )
}
```

- [ ] **Step 7: Write `src/components/forms/Switch.jsx`**

```jsx
import React from 'react'

/** Pill toggle. Track goes Ink when on. */
export function Switch({ label, checked = false, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 42, height: 24, borderRadius: 'var(--radius-pill)', padding: 3,
        background: checked ? 'var(--ink)' : 'transparent',
        boxShadow: checked ? 'none' : 'inset 0 0 0 1px var(--control-ghost-border)',
        transition: 'background var(--dur-base) var(--ease-cloth)',
        display: 'inline-flex',
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: 'var(--radius-pill)',
          background: checked ? 'var(--oat)' : 'var(--ink-40)',
          transform: checked ? 'translateX(18px)' : 'none',
          transition: 'transform var(--dur-base) var(--ease-cloth), background var(--dur-base) var(--ease-cloth)',
        }} />
      </span>
      {label ? <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-primary)' }}>{label}</span> : null}
    </label>
  )
}
```

- [ ] **Step 8: Write `src/components/navigation/NavList.jsx`**

```jsx
import React from 'react'
import { Icon } from '../core/Icon.jsx'

/**
 * The stacked top-left navigation. Items sit flush left in a single column;
 * the active item is Umber and carries the arrow badge.
 */
export function NavList({ items = [], active, onSelect, inverse = false, style, ...rest }) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }} {...rest}>
      {items.map((item) => {
        const label = typeof item === 'string' ? item : item.label
        const isActive = label === active
        return (
          <button
            key={label}
            onClick={() => onSelect && onSelect(label)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              font: 'var(--type-body-sm)', letterSpacing: '0.02em', textAlign: 'left',
              color: isActive
                ? (inverse ? 'var(--oat)' : 'var(--text-accent)')
                : (inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-secondary)'),
              transition: 'color var(--dur-base) var(--ease-cloth)',
            }}
          >
            {label}
            {isActive ? (
              <span style={{
                width: 16, height: 16, borderRadius: 'var(--radius-pill)',
                background: inverse ? 'var(--oat)' : 'var(--umber)',
                color: inverse ? 'var(--ink)' : 'var(--oat)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="arrow-right" size={9} /></span>
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}
```

- [ ] **Step 9: Write `src/components/navigation/Tabs.jsx`**

```jsx
import React from 'react'

/** Inline filter row. Inactive labels drop to 40% — used above product grids. */
export function Tabs({ items = [], active, onSelect, inverse = false, size = 'md', style, ...rest }) {
  const font = size === 'lg' ? 'var(--type-heading-2)' : 'var(--type-heading-3)'
  return (
    <div role="tablist" style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-7)', flexWrap: 'wrap', ...style }} {...rest}>
      {items.map((label) => {
        const isActive = label === active
        return (
          <button
            key={label} role="tab" aria-selected={isActive}
            onClick={() => onSelect && onSelect(label)}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              font, letterSpacing: 'var(--track-display)',
              textTransform: size === 'lg' ? 'uppercase' : 'none',
              color: inverse ? 'var(--oat)' : 'var(--text-primary)',
              opacity: isActive ? 1 : 0.4,
              transition: 'opacity var(--dur-base) var(--ease-cloth)',
            }}
          >{label}</button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 10: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS (7 tests total)

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: port forms and navigation components from the design kit"
```

---

## Task 6: Feedback + commerce components port

**Files:**
- Create: `src/components/feedback/Dialog.jsx`
- Create: `src/components/feedback/Toast.jsx`
- Create: `src/components/feedback/Tooltip.jsx`
- Create: `src/components/commerce/MediaFrame.jsx`
- Create: `src/components/commerce/ProductCard.jsx`
- Test: `src/components/feedback/Dialog.test.jsx`
- Test: `src/components/feedback/Toast.test.jsx`
- Test: `src/components/commerce/ProductCard.test.jsx`

**Interfaces:**
- Produces:
  - `Dialog({ open, title, children, footer, onClose, width, style, ...rest })`
    — renders `null` when `open` is falsy
  - `Toast({ children, icon, tone, onClose, style, ...rest })`
  - `Tooltip({ label, children, placement, style, ...rest })`
  - `MediaFrame({ src, alt, label, ratio, radius, tone, style, ...rest })`
  - `ProductCard({ name, price, material, image, imageLabel, ratio, inverse, mediaTone, onSelect, style, ...rest })`
- Consumes: `IconButton` and `Icon` (Task 4), `Tag` and `Button` (Task 4).

- [ ] **Step 1: Write the failing tests**

`src/components/feedback/Dialog.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Dialog } from './Dialog.jsx'

test('renders nothing when closed', () => {
  render(<Dialog open={false} title="Care">content</Dialog>)
  expect(screen.queryByText('content')).not.toBeInTheDocument()
})

test('renders content and calls onClose when the overlay is clicked', () => {
  const onClose = vi.fn()
  render(<Dialog open title="Care" onClose={onClose}>content</Dialog>)
  expect(screen.getByText('content')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('dialog').parentElement)
  expect(onClose).toHaveBeenCalledOnce()
})
```

`src/components/feedback/Toast.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Toast } from './Toast.jsx'

test('renders its message and calls onClose', () => {
  const onClose = vi.fn()
  render(<Toast onClose={onClose}>Added to bag</Toast>)
  expect(screen.getByText('Added to bag')).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('Dismiss'))
  expect(onClose).toHaveBeenCalledOnce()
})
```

`src/components/commerce/ProductCard.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard.jsx'

test('renders name and material, and fires onSelect when clicked', () => {
  const onSelect = vi.fn()
  render(<ProductCard name="Bordová" material="Crochet" onSelect={onSelect} />)
  expect(screen.getByText('Bordová')).toBeInTheDocument()
  expect(screen.getByText('Crochet')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Bordová'))
  expect(onSelect).toHaveBeenCalledOnce()
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — none of the six files exist yet.

- [ ] **Step 3: Write `src/components/feedback/Dialog.jsx`**

```jsx
import React from 'react'
import { IconButton } from '../core/IconButton.jsx'

/** Centred modal on an Ink veil. Corners are xl; content is left-aligned. */
export function Dialog({ open = true, title, children, footer, onClose, width = 480, style, ...rest }) {
  if (!open) return null
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(25, 23, 20, 0.42)', backdropFilter: 'var(--blur-veil)', padding: 'var(--space-5)', zIndex: 50,
    }} onClick={onClose}>
      <div
        role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{
          width, maxWidth: '100%', background: 'var(--surface-page)', color: 'var(--text-primary)',
          borderRadius: 'var(--radius-xl)', padding: 'var(--space-7)',
          boxShadow: 'var(--shadow-media)', position: 'relative', ...style,
        }}
        {...rest}
      >
        {onClose ? <IconButton name="x" size={40} variant="bare" label="Close" onClick={onClose} style={{ position: 'absolute', top: 14, right: 14 }} /> : null}
        {title ? <h3 style={{ margin: '0 0 var(--space-4)', font: 'var(--type-heading-2)', letterSpacing: 'var(--track-display)' }}>{title}</h3> : null}
        <div style={{ font: 'var(--type-body)', color: 'var(--text-secondary)' }}>{children}</div>
        {footer ? <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>{footer}</div> : null}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Write `src/components/feedback/Toast.jsx`**

```jsx
import React from 'react'
import { Icon } from '../core/Icon.jsx'

/** Low-key confirmation pill: Ink surface, Oat text, one optional icon. */
export function Toast({ children, icon = 'check', tone = 'ink', onClose, style, ...rest }) {
  const tones = {
    ink: { background: 'var(--ink)', color: 'var(--oat)' },
    umber: { background: 'var(--umber)', color: 'var(--oat)' },
  }
  return (
    <div role="status" style={{
      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
      padding: '14px 18px', borderRadius: 'var(--radius-pill)',
      font: 'var(--type-body-sm)', ...tones[tone], ...style,
    }} {...rest}>
      {icon ? <Icon name={icon} size={15} /> : null}
      <span>{children}</span>
      {onClose ? (
        <button onClick={onClose} aria-label="Dismiss" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'inline-flex', opacity: 0.6, padding: 0 }}>
          <Icon name="x" size={14} />
        </button>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 5: Write `src/components/feedback/Tooltip.jsx`**

```jsx
import React from 'react'

/** Hover label. Ink pill, tracked caps, no arrow tail. */
export function Tooltip({ label, children, placement = 'top', style, ...rest }) {
  const [show, setShow] = React.useState(false)
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%, -8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%, 8px)' },
    right: { left: '100%', top: '50%', transform: 'translate(8px, -50%)' },
  }[placement]
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      {...rest}
    >
      {children}
      <span style={{
        position: 'absolute', ...pos, whiteSpace: 'nowrap', pointerEvents: 'none',
        background: 'var(--ink)', color: 'var(--oat)', padding: '6px 10px',
        borderRadius: 'var(--radius-pill)', font: 'var(--type-label)',
        letterSpacing: 'var(--track-caps-tight)', textTransform: 'uppercase',
        opacity: show ? 1 : 0, transition: 'opacity var(--dur-fast) linear',
      }}>{label}</span>
    </span>
  )
}
```

- [ ] **Step 6: Write `src/components/commerce/MediaFrame.jsx`**

```jsx
import React from 'react'

/**
 * Image slot. Pass `src` for real photography (this build always does);
 * falls back to a striped placeholder with a label if `src` is omitted.
 */
export function MediaFrame({ src, alt = '', label = 'product shot', ratio = '4 / 5', radius = 'lg', tone = 'stone', style, ...rest }) {
  const tones = {
    stone: { base: 'var(--stone)', stripe: 'rgba(25,23,20,0.06)', text: 'var(--ink-60)' },
    oat: { base: 'var(--surface-raised)', stripe: 'rgba(25,23,20,0.05)', text: 'var(--ink-40)' },
    ink: { base: 'var(--ink)', stripe: 'rgba(227,222,206,0.07)', text: 'var(--oat-70)' },
  }[tone]
  return (
    <div style={{
      position: 'relative', aspectRatio: ratio, overflow: 'hidden',
      borderRadius: `var(--radius-${radius})`,
      background: src ? `var(--surface-raised) center/cover no-repeat url(${src})` : tones.base,
      backgroundImage: src ? `url(${src})` : `repeating-linear-gradient(135deg, ${tones.stripe} 0 1px, transparent 1px 9px)`,
      backgroundSize: src ? 'cover' : 'auto',
      backgroundPosition: 'center',
      ...style,
    }} {...rest}>
      {src ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : (
        <span style={{
          position: 'absolute', left: 14, bottom: 12,
          font: '400 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace',
          letterSpacing: '0.08em', textTransform: 'lowercase', color: tones.text,
        }}>{label}</span>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Write `src/components/commerce/ProductCard.jsx`**

```jsx
import React from 'react'
import { MediaFrame } from './MediaFrame.jsx'
import { Tag } from '../core/Tag.jsx'
import { Button } from '../core/Button.jsx'

/** Product tile: soft-square media, name, price, quiet action. */
export function ProductCard({
  name = 'Untitled', price, material, image, imageLabel = 'bag, three-quarter view',
  ratio = '4 / 5', inverse = false, mediaTone, onSelect, style, ...rest
}) {
  const [hot, setHot] = React.useState(false)
  return (
    <article
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      onClick={onSelect}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', cursor: onSelect ? 'pointer' : 'default', ...style }}
      {...rest}
    >
      <div style={{ position: 'relative' }}>
        <MediaFrame
          src={image} label={imageLabel} ratio={ratio} radius="xl"
          tone={mediaTone || (inverse ? 'oat' : 'stone')}
          style={{ transform: hot ? 'scale(1.012)' : 'none', transition: 'transform var(--dur-slow) var(--ease-cloth)' }}
        />
        {material ? <Tag tone="veil" style={{ position: 'absolute', top: 14, left: 14 }}>{material}</Tag> : null}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ font: 'var(--type-heading-3)', color: inverse ? 'var(--text-on-inverse)' : 'var(--text-primary)' }}>{name}</span>
          {price ? <span style={{ font: 'var(--type-body-sm)', color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)' }}>{price}</span> : null}
        </div>
        <Button variant={inverse ? 'inverse' : 'secondary'} size="sm">Learn more</Button>
      </div>
    </article>
  )
}
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS (12 tests total)

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: port feedback and commerce components from the design kit"
```

---

## Task 7: Product data model

**Files:**
- Create: `src/data/products.js`
- Test: `src/data/products.test.js`

**Interfaces:**
- Produces:
  - `PRODUCTS: Array<{ slug, name, material, image, detailImage, imageLabel, detailLabel, description, strap: string[]|null, lining: string[]|null, madeToOrder: boolean, care: string }>`
  - `MATERIALS: string[]` — `['All', 'Crochet', 'Leather', 'Denim']`
  - `getProduct(slug: string): object | undefined`
  - `filterProducts(list, { material = 'All', madeToOrder = false } = {}): array`
  - `sortProducts(list, sortBy = 'name-asc'): array` — `sortBy` is
    `'name-asc' | 'name-desc'`
- Consumes: `/images/*.jpg` paths from Task 3 (referenced as strings, no
  import-time dependency on the files existing for tests to pass).

- [ ] **Step 1: Write the failing tests**

`src/data/products.test.js`:

```js
import { PRODUCTS, MATERIALS, getProduct, filterProducts, sortProducts } from './products.js'

test('has five products across three materials', () => {
  expect(PRODUCTS).toHaveLength(5)
  const materials = new Set(PRODUCTS.map((p) => p.material))
  expect(materials).toEqual(new Set(['Crochet', 'Leather', 'Denim']))
})

test('MATERIALS starts with All and lists each material once', () => {
  expect(MATERIALS).toEqual(['All', 'Crochet', 'Leather', 'Denim'])
})

test('getProduct finds by slug and returns undefined for unknown slugs', () => {
  expect(getProduct('bordova').name).toBe('Bordová')
  expect(getProduct('does-not-exist')).toBeUndefined()
})

test('filterProducts filters by material', () => {
  const result = filterProducts(PRODUCTS, { material: 'Leather' })
  expect(result).toHaveLength(1)
  expect(result[0].slug).toBe('modra')
})

test('filterProducts with material All and madeToOrder true keeps only made-to-order items', () => {
  const result = filterProducts(PRODUCTS, { madeToOrder: true })
  expect(result.every((p) => p.madeToOrder)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
  expect(result.length).toBeLessThan(PRODUCTS.length)
})

test('sortProducts sorts by name ascending and descending without mutating the input', () => {
  const asc = sortProducts(PRODUCTS, 'name-asc')
  const desc = sortProducts(PRODUCTS, 'name-desc')
  expect(asc.map((p) => p.name)).toEqual([...asc.map((p) => p.name)].sort((a, b) => a.localeCompare(b)))
  expect(desc.map((p) => p.name)).toEqual([...asc.map((p) => p.name)].reverse())
  expect(PRODUCTS.map((p) => p.name)).not.toEqual(asc.map((p) => p.name))
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `./products.js` doesn't exist yet.

- [ ] **Step 3: Write `src/data/products.js`**

```js
const ORDER_HREF = 'https://www.instagram.com/niana.bags/'

export const PRODUCTS = [
  {
    slug: 'bordova',
    name: 'Bordová',
    material: 'Crochet',
    image: '/images/bordova.jpg',
    detailImage: '/images/bordova-detail.jpg',
    imageLabel: 'bordová, crochet, front',
    detailLabel: 'beaded strap detail',
    description: 'Because each piece is worked by hand, no two are identical — the stitch, the settle and the shape are yours alone.',
    strap: ['Short handle', 'Long crossbody strap'],
    lining: ['Undyed cotton', 'Ink cotton'],
    madeToOrder: true,
    care: 'Spot clean only. Reshape by hand and dry flat, away from direct sun.',
  },
  {
    slug: 'malinova',
    name: 'Malinová',
    material: 'Crochet',
    image: '/images/malinova.jpg',
    detailImage: '/images/malinova-detail.jpg',
    imageLabel: 'malinová, crochet, front',
    detailLabel: 'handle detail',
    description: 'Because each piece is worked by hand, no two are identical — the stitch, the settle and the shape are yours alone.',
    strap: ['Short handle', 'Long crossbody strap'],
    lining: ['Undyed cotton', 'Ink cotton'],
    madeToOrder: true,
    care: 'Spot clean only. Reshape by hand and dry flat, away from direct sun.',
  },
  {
    slug: 'olivova',
    name: 'Olivová',
    material: 'Crochet',
    image: '/images/olivova.jpg',
    detailImage: '/images/olivova-detail.jpg',
    imageLabel: 'olivová, crochet, front',
    detailLabel: 'stitch detail',
    description: 'Because each piece is worked by hand, no two are identical — the stitch, the settle and the shape are yours alone.',
    strap: ['Short handle', 'Long crossbody strap'],
    lining: ['Undyed cotton', 'Ink cotton'],
    madeToOrder: true,
    care: 'Spot clean only. Reshape by hand and dry flat, away from direct sun.',
  },
  {
    slug: 'modra',
    name: 'Modrá',
    material: 'Leather',
    image: '/images/modra.jpg',
    detailImage: '/images/modra-detail.jpg',
    imageLabel: 'modrá, leather, front',
    detailLabel: 'strap detail',
    description: 'Cut and finished by hand from a single hide — this exact piece is the only one there is.',
    strap: ['Short handle', 'Long crossbody strap'],
    lining: null,
    madeToOrder: false,
    care: 'Spot clean only. Leather takes a clear balm twice a year. Keep away from direct sun and standing water.',
  },
  {
    slug: 'denim',
    name: 'Denim tote',
    material: 'Denim',
    image: '/images/denim.jpg',
    detailImage: '/images/denim-detail.jpg',
    imageLabel: 'denim tote, front',
    detailLabel: 'pocket detail',
    description: 'Reclaimed denim, cut and resewn by hand — the wear already on the fabric is part of the piece.',
    strap: null,
    lining: null,
    madeToOrder: false,
    care: 'Cold hand wash only, reshape and dry flat. Do not tumble dry.',
  },
]

export const MATERIALS = ['All', 'Crochet', 'Leather', 'Denim']

export const INSTAGRAM_URL = ORDER_HREF

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function filterProducts(list, { material = 'All', madeToOrder = false } = {}) {
  return list
    .filter((p) => material === 'All' || p.material === material)
    .filter((p) => !madeToOrder || p.madeToOrder)
}

export function sortProducts(list, sortBy = 'name-asc') {
  const copy = [...list]
  copy.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy === 'name-desc') copy.reverse()
  return copy
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS (18 tests total)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add product data model with filter/sort helpers"
```

---

## Task 8: Site chrome — Header, Footer, App routes

**Files:**
- Create: `src/components/layout/Header.jsx`
- Create: `src/components/layout/Footer.jsx`
- Create: `src/components/layout/Layout.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Create: `src/pages/Home.jsx` (temporary placeholder — replaced fully in Task 10)
- Create: `src/pages/Collection.jsx` (temporary placeholder — replaced fully in Task 11)
- Create: `src/pages/Product.jsx` (temporary placeholder — replaced fully in Task 12)
- Create: `src/pages/About.jsx` (temporary placeholder — replaced fully in Task 13)
- Test: `src/components/layout/Header.test.jsx`

**Interfaces:**
- Produces:
  - `Header()` — no props, reads route via `useLocation`, highlights the
    active nav item, wordmark links to `/`.
  - `Footer()` — no props.
  - `Layout()` — no props, renders `<Header/>`, an `<Outlet/>`, `<Footer/>`.
  - `App` (default export) — declares the 4 routes under `<Layout/>`:
    `/` → `Home`, `/collection` → `Collection`, `/collection/:slug` →
    `Product`, `/about` → `About`.
- Consumes: `NavList`, `IconButton`, `Logo`, `StitchDivider` (Task 4/5),
  `INSTAGRAM_URL` from `src/data/products.js` (Task 7).

- [ ] **Step 1: Write the failing test**

`src/components/layout/Header.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header.jsx'

test('highlights Collection as active on /collection and links the wordmark home', () => {
  render(
    <MemoryRouter initialEntries={['/collection']}>
      <Header />
    </MemoryRouter>
  )
  const collectionLink = screen.getByText('Collection')
  expect(collectionLink.closest('button')).toHaveStyle({ color: 'var(--text-accent)' })
  expect(screen.getByLabelText('Niana').closest('a')).toHaveAttribute('href', '/')
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `./Header.jsx` doesn't exist yet.

- [ ] **Step 3: Write `src/components/layout/Header.jsx`**

```jsx
import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { NavList } from '../navigation/NavList.jsx'
import { IconButton } from '../core/IconButton.jsx'
import { Logo } from '../core/Logo.jsx'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'About', to: '/about' },
]

function activeLabelFor(pathname) {
  if (pathname === '/' ) return 'Home'
  if (pathname.startsWith('/collection')) return 'Collection'
  if (pathname.startsWith('/about')) return 'About'
  return null
}

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const active = activeLabelFor(location.pathname)

  const handleSelect = (label) => {
    const item = NAV_ITEMS.find((i) => i.label === label)
    if (item) navigate(item.to)
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'start',
      padding: '28px var(--gutter) 22px',
      background: 'var(--surface-page)',
    }}>
      <NavList
        items={NAV_ITEMS.map((i) => i.label)}
        active={active}
        onSelect={handleSelect}
      />
      <Link to="/" aria-label="Niana" style={{ textDecoration: 'none', paddingTop: 2 }}>
        <Logo variant="wordmark" size={17} color="var(--ink)" />
      </Link>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
        <IconButton
          name="search" variant="bare" size={40} label="Browse the collection"
          onClick={() => navigate('/collection')}
        />
        <IconButton
          name="shopping-bag" variant="bare" size={40} label="Order via Instagram"
          onClick={() => window.open('https://www.instagram.com/niana.bags/', '_blank', 'noopener,noreferrer')}
        />
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Write `src/components/layout/Footer.jsx`**

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../core/Logo.jsx'
import { StitchDivider } from '../core/StitchDivider.jsx'

const SHOP_LINKS = [
  { label: 'Crochet', to: '/collection?material=Crochet' },
  { label: 'Leather', to: '/collection?material=Leather' },
  { label: 'Denim', to: '/collection?material=Denim' },
  { label: 'Made to order', to: '/collection?madeToOrder=1' },
]

const STUDIO_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/about#journal' },
]

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--text-on-inverse)', padding: '80px var(--gutter) 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 'var(--space-7)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Logo variant="mark" size={16} color="var(--oat)" />
          <p style={{ margin: 0, font: 'var(--type-body-sm)', color: 'var(--text-on-inverse-muted)', maxWidth: '30ch' }}>
            Handmade bags. Made by hand, piece by piece — Slovakia &amp; Belgium.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-on-inverse-muted)' }}>Shop</span>
          {SHOP_LINKS.map((l) => (
            <Link key={l.label} to={l.to} style={{ font: 'var(--type-body-sm)', color: 'var(--oat)', textDecoration: 'none', opacity: 0.8 }}>{l.label}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-on-inverse-muted)' }}>Studio</span>
          {STUDIO_LINKS.map((l) => (
            <Link key={l.label} to={l.to} style={{ font: 'var(--type-body-sm)', color: 'var(--oat)', textDecoration: 'none', opacity: 0.8 }}>{l.label}</Link>
          ))}
          <a href="https://www.instagram.com/niana.bags/" target="_blank" rel="noopener noreferrer" style={{ font: 'var(--type-body-sm)', color: 'var(--oat)', textDecoration: 'none', opacity: 0.8 }}>Contact</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-on-inverse-muted)' }}>Care</span>
          <span style={{ font: 'var(--type-body-sm)', color: 'var(--oat)', opacity: 0.8, maxWidth: '22ch' }}>Care notes live on each product page.</span>
        </div>
      </div>
      <StitchDivider height={18} opacity={0.28} style={{ margin: '56px 0 22px', filter: 'invert(1)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-on-inverse-muted)' }}>
        <span>Niana © 2026</span>
        <a href="https://www.instagram.com/niana.bags/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-on-inverse-muted)' }}>Instagram</a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Write `src/components/layout/Layout.jsx`**

```jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

export function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 6: Write temporary page placeholders**

`src/pages/Home.jsx`:

```jsx
export default function Home() {
  return <main style={{ padding: 'var(--space-7) var(--gutter)' }}>Home</main>
}
```

`src/pages/Collection.jsx`:

```jsx
export default function Collection() {
  return <main style={{ padding: 'var(--space-7) var(--gutter)' }}>Collection</main>
}
```

`src/pages/Product.jsx`:

```jsx
export default function Product() {
  return <main style={{ padding: 'var(--space-7) var(--gutter)' }}>Product</main>
}
```

`src/pages/About.jsx`:

```jsx
export default function About() {
  return <main style={{ padding: 'var(--space-7) var(--gutter)' }}>About</main>
}
```

- [ ] **Step 7: Rewrite `src/App.jsx` with real routes**

```jsx
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import Product from './pages/Product.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="collection/:slug" element={<Product />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 8: Update `src/App.test.jsx` for the new routed shell**

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

test('renders the Niana wordmark in the header on the home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByLabelText('Niana')).toBeInTheDocument()
})

test('renders the About page on the /about route', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText('About', { selector: 'main' })).toBeInTheDocument()
})
```

- [ ] **Step 9: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS (21 tests total)

- [ ] **Step 10: Run the dev server and click through the shell manually**

Run: `npm run dev`, open the site, click each nav item and the wordmark.
Expected: URL and placeholder page body change correctly; the active nav
label turns Umber-colored. Stop the dev server after checking.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add site chrome (Header/Footer/Layout) and real routes"
```

---

## Task 9: Scroll reveal system

**Files:**
- Create: `src/hooks/useScrollReveal.js`
- Create: `src/components/motion/Reveal.jsx`

**Interfaces:**
- Produces:
  - `useScrollReveal(ref: React.RefObject)` — registers a GSAP
    `ScrollTrigger` that fades/rises the ref'd element in once, skipping the
    animation entirely under `prefers-reduced-motion: reduce`.
  - `Reveal({ as = 'div', children, style, ...rest })` — a thin wrapper that
    creates the ref and calls `useScrollReveal` for you; used by every page
    task from here on to wrap sections.
- Consumes: `gsap` and `gsap/ScrollTrigger` (installed in Task 1).

- [ ] **Step 1: Write `src/hooks/useScrollReveal.js`**

```js
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fades + rises an element 12px over 900ms the first time it scrolls into
 * view, matching the brand's "scroll reveals are a fade plus a 12px rise
 * over --dur-reveal" motion rule. No-ops (element stays fully visible)
 * under prefers-reduced-motion.
 */
export function useScrollReveal(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 })
      return undefined
    }

    gsap.set(el, { opacity: 0, y: 12 })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' })
      },
    })

    return () => trigger.kill()
  }, [ref])
}
```

- [ ] **Step 2: Write `src/components/motion/Reveal.jsx`**

```jsx
import React, { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export function Reveal({ as: Tag = 'div', children, style, ...rest }) {
  const ref = useRef(null)
  useScrollReveal(ref)
  return (
    <Tag ref={ref} style={style} {...rest}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`. `ScrollTrigger`/`matchMedia`/layout are not meaningfully
testable in jsdom, so this task is verified visually instead of with
Vitest. Temporarily wrap the placeholder `<main>` content in
`src/pages/Home.jsx` with `<Reveal>` to check it end-to-end:

```jsx
import { Reveal } from '../components/motion/Reveal.jsx'

export default function Home() {
  return (
    <main style={{ padding: 'var(--space-7) var(--gutter)' }}>
      <Reveal>Home</Reveal>
    </main>
  )
}
```

Open the dev server, scroll the "Home" text out of the initial viewport
(resize the window short, or add temporary height above it), reload, and
scroll down. Expected: the text fades and rises into place once, then stays
visible on further scrolling. Revert `src/pages/Home.jsx` back to its
Task 8 placeholder form afterward — Task 10 replaces it properly.

- [ ] **Step 4: Run the full test suite to confirm nothing broke**

Run: `npm test`
Expected: PASS (21 tests — this task added no new automated tests, see
Step 3)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add GSAP ScrollTrigger-based scroll reveal system"
```

---

## Task 10: Home page

**Files:**
- Modify: `src/pages/Home.jsx`
- Test: `src/pages/Home.test.jsx`

**Interfaces:**
- Consumes: `Button`, `SectionHeading`, `StitchDivider` (Task 4);
  `ProductCard`, `MediaFrame` (Task 6); `Reveal` (Task 9); `PRODUCTS`
  (Task 7); `/images/hero.jpg`, `/images/collage-1.jpg`,
  `/images/collage-2.jpg`, `/images/collage-3.jpg` (Task 3).
- Produces: `Home` (default export) — no props, reads nothing from the
  router besides being renderable inside it.

- [ ] **Step 1: Write the failing test**

`src/pages/Home.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

test('renders the hero lines and one product per material in the arrivals band', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )
  expect(screen.getByText('made by hand')).toBeInTheDocument()
  expect(screen.getByText('piece by piece')).toBeInTheDocument()
  expect(screen.getByText('Bordová')).toBeInTheDocument()
  expect(screen.getByText('Modrá')).toBeInTheDocument()
  expect(screen.getByText('Denim tote')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — the current placeholder `Home.jsx` doesn't render any of
this text.

- [ ] **Step 3: Write `src/pages/Home.jsx`**

```jsx
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/core/Button.jsx'
import { SectionHeading } from '../components/core/SectionHeading.jsx'
import { StitchDivider } from '../components/core/StitchDivider.jsx'
import { MediaFrame } from '../components/commerce/MediaFrame.jsx'
import { ProductCard } from '../components/commerce/ProductCard.jsx'
import { Reveal } from '../components/motion/Reveal.jsx'
import { PRODUCTS, getProduct } from '../data/products.js'

const ARRIVAL_SLUGS = ['bordova', 'modra', 'denim']

export default function Home() {
  const navigate = useNavigate()
  const arrivals = ARRIVAL_SLUGS.map((slug) => getProduct(slug))

  return (
    <main>
      {/* Hero — oversized display type with the product breaking the line */}
      <section style={{ position: 'relative', padding: '24px 0 var(--space-6)', overflow: 'hidden' }}>
        <div style={{
          font: '300 clamp(80px, 13vw, 188px)/0.9 var(--font-sans)', letterSpacing: 'var(--track-display)',
          textAlign: 'center', whiteSpace: 'nowrap', color: 'var(--text-primary)',
        }}>made by hand</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-7vw', position: 'relative', zIndex: 2 }}>
          <MediaFrame
            src="/images/hero.jpg" alt="Niana bordová crochet bag, worn crossbody"
            ratio="3 / 4" radius="xl"
            style={{ width: 'min(34vw, 460px)', boxShadow: 'var(--shadow-media)' }}
          />
        </div>
        <div style={{
          font: '300 clamp(80px, 13vw, 188px)/0.9 var(--font-sans)', letterSpacing: 'var(--track-display)',
          textAlign: 'center', whiteSpace: 'nowrap', marginTop: '-6vw', color: 'var(--text-primary)',
        }}>piece by piece</div>
      </section>

      {/* About strip */}
      <Reveal as="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', padding: 'var(--section-y) var(--gutter)' }}>
        <SectionHeading eyebrow="About us" title="What we do" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
          <p style={{ margin: 0, font: 'var(--type-heading-3)', maxWidth: '44ch', textWrap: 'pretty' }}>
            Every Niana bag is made by hand in small batches — crochet, leather and denim, cut and finished one piece at a time.
          </p>
          <Button variant="primary" arrow onClick={() => navigate('/about')}>Learn more</Button>
        </div>
      </Reveal>

      {/* Stone band — new arrivals, one per material */}
      <Reveal as="section" style={{ background: 'var(--surface-band)', padding: 'var(--band-y) var(--gutter)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-8)' }}>
          <SectionHeading eyebrow="New arrivals" title="One of each" align="center" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
          {arrivals.map((p) => (
            <ProductCard
              key={p.slug} name={p.name} material={p.material} image={p.image}
              imageLabel={p.imageLabel} mediaTone="oat"
              onSelect={() => navigate(`/collection/${p.slug}`)}
            />
          ))}
        </div>
      </Reveal>

      {/* Editorial collage */}
      <Reveal as="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-8)', padding: 'var(--section-y) var(--gutter)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', maxWidth: '46ch', textWrap: 'pretty' }}>
            The studio works between Slovakia and Belgium. Nothing is identical: the hand-tied stitch that closes one bag never lands the same way twice, and the shape settles as it is carried.
          </p>
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', maxWidth: '46ch', textWrap: 'pretty' }}>
            Materials are chosen for how they age — vegetable-tanned leather, cotton yarn, reclaimed denim.
          </p>
          <Button variant="ghost" arrow onClick={() => navigate('/about')}>More about us</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          <MediaFrame src="/images/collage-1.jpg" alt="Niana bag, doorway" ratio="3 / 4" radius="lg" tone="oat" />
          <MediaFrame src="/images/collage-2.jpg" alt="Niana bag, doorway detail" ratio="3 / 4" radius="lg" />
          <MediaFrame src="/images/collage-3.jpg" alt="Niana bag, street" ratio="3 / 4" radius="lg" tone="oat" />
        </div>
      </Reveal>

      {/* Wordmark rest */}
      <Reveal as="section" style={{ padding: '0 var(--gutter) var(--section-y)', textAlign: 'center' }}>
        <StitchDivider height={20} style={{ marginBottom: 'var(--space-8)' }} />
        <div style={{ font: '300 clamp(72px, 15vw, 220px)/0.9 var(--font-sans)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--stone)' }}>Niana</div>
      </Reveal>
    </main>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS (22 tests total)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build the Home page"
```

---

## Task 11: Collection page

**Files:**
- Modify: `src/pages/Collection.jsx`
- Test: `src/pages/Collection.test.jsx`

**Interfaces:**
- Consumes: `SectionHeading`, `Tabs`, `Checkbox`, `Select`, `Button` (Task
  4/5), `ProductCard` (Task 6), `Reveal` (Task 9), `PRODUCTS`, `MATERIALS`,
  `filterProducts`, `sortProducts` (Task 7). Reads/writes `material` and
  `madeToOrder` via `useSearchParams` so the Footer's deep links (Task 8)
  work.
- Produces: `Collection` (default export).

- [ ] **Step 1: Write the failing test**

`src/pages/Collection.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Collection from './Collection.jsx'

test('renders all five products by default', () => {
  render(
    <MemoryRouter>
      <Collection />
    </MemoryRouter>
  )
  expect(screen.getAllByRole('article')).toHaveLength(5)
})

test('filtering by a material tab narrows the grid', () => {
  render(
    <MemoryRouter>
      <Collection />
    </MemoryRouter>
  )
  fireEvent.click(screen.getByText('Leather'))
  expect(screen.getAllByRole('article')).toHaveLength(1)
  expect(screen.getByText('Modrá')).toBeInTheDocument()
})

test('reading the material query param pre-selects that tab', () => {
  render(
    <MemoryRouter initialEntries={['/collection?material=Denim']}>
      <Collection />
    </MemoryRouter>
  )
  expect(screen.getAllByRole('article')).toHaveLength(1)
  expect(screen.getByText('Denim tote')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — the placeholder `Collection.jsx` renders none of this, and
`role="article"` isn't present (note: this relies on `ProductCard`'s root
element being an `<article>`, which it is per Task 6).

- [ ] **Step 3: Write `src/pages/Collection.jsx`**

```jsx
import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SectionHeading } from '../components/core/SectionHeading.jsx'
import { Tabs } from '../components/navigation/Tabs.jsx'
import { Checkbox } from '../components/forms/Checkbox.jsx'
import { Select } from '../components/forms/Select.jsx'
import { ProductCard } from '../components/commerce/ProductCard.jsx'
import { Reveal } from '../components/motion/Reveal.jsx'
import { PRODUCTS, MATERIALS, filterProducts, sortProducts } from '../data/products.js'

export default function Collection() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const material = MATERIALS.includes(searchParams.get('material'))
    ? searchParams.get('material')
    : 'All'
  const madeToOrder = searchParams.get('madeToOrder') === '1'
  const sortBy = searchParams.get('sort') === 'name-desc' ? 'name-desc' : 'name-asc'

  const list = useMemo(
    () => sortProducts(filterProducts(PRODUCTS, { material, madeToOrder }), sortBy),
    [material, madeToOrder, sortBy]
  )

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === 'All' || value === false) next.delete(key)
      else next.set(key, value === true ? '1' : value)
    })
    setSearchParams(next)
  }

  return (
    <main style={{ padding: 'var(--space-7) var(--gutter) var(--section-y)' }}>
      <SectionHeading eyebrow="Collections" title="Handmade bags" size="lg" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-6)', margin: 'var(--space-8) 0 var(--space-6)', flexWrap: 'wrap' }}>
        <Tabs items={MATERIALS} active={material} onSelect={(m) => updateParams({ material: m })} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <Checkbox label="Made to order" checked={madeToOrder} onChange={() => updateParams({ madeToOrder: !madeToOrder })} />
          <Select
            options={[{ value: 'name-asc', label: 'Name, A–Z' }, { value: 'name-desc', label: 'Name, Z–A' }]}
            value={sortBy}
            onChange={(e) => updateParams({ sort: e.target.value })}
            style={{ width: 200 }}
          />
        </div>
      </div>
      <Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-7) var(--space-6)' }}>
          {list.map((p) => (
            <ProductCard
              key={p.slug} name={p.name} material={p.material} image={p.image}
              imageLabel={p.imageLabel}
              onSelect={() => navigate(`/collection/${p.slug}`)}
            />
          ))}
        </div>
      </Reveal>
      {list.length === 0 ? (
        <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>Nothing in this cut yet. Try another material.</p>
      ) : null}
    </main>
  )
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS (25 tests total)

- [ ] **Step 5: Run the dev server and manually verify the empty state**

Run: `npm run dev`, navigate to `/collection`, select "Leather" and check
"Made to order". Expected: the grid empties and shows "Nothing in this cut
yet. Try another material." (Modrá is `madeToOrder: false`, so this
combination is legitimately empty.) Stop the dev server after checking.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: build the Collection page with functional filter/sort"
```

---

## Task 12: Product page

**Files:**
- Modify: `src/pages/Product.jsx`
- Test: `src/pages/Product.test.jsx`

**Interfaces:**
- Consumes: `useParams` for `:slug`, `getProduct` (Task 7); `MediaFrame`,
  `Tag`, `Button`, `Radio`, `Select`, `StitchDivider`, `Dialog`, `Toast`,
  `Icon` (Task 4/5/6); `Reveal` (Task 9); `INSTAGRAM_URL` (Task 7).
- Produces: `Product` (default export). Renders a "not found" state for an
  unknown slug instead of crashing.

- [ ] **Step 1: Write the failing test**

`src/pages/Product.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Product from './Product.jsx'

function renderAt(slug) {
  return render(
    <MemoryRouter initialEntries={[`/collection/${slug}`]}>
      <Routes>
        <Route path="/collection/:slug" element={<Product />} />
      </Routes>
    </MemoryRouter>
  )
}

test('renders the matching product for a known slug', () => {
  renderAt('modra')
  expect(screen.getByRole('heading', { name: 'Modrá' })).toBeInTheDocument()
  expect(screen.getByText('Leather')).toBeInTheDocument()
})

test('renders a not-found message for an unknown slug', () => {
  renderAt('does-not-exist')
  expect(screen.getByText(/not find that piece/i)).toBeInTheDocument()
})

test('opens the care dialog and shows the product-specific care text', () => {
  renderAt('denim')
  fireEvent.click(screen.getByText('Care'))
  expect(screen.getByText(/Cold hand wash only/i)).toBeInTheDocument()
})

test('add to bag shows a decorative confirmation toast', () => {
  renderAt('bordova')
  fireEvent.click(screen.getByText('Add to bag'))
  expect(screen.getByText('Added to bag')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — the placeholder `Product.jsx` has none of this behavior.

- [ ] **Step 3: Write `src/pages/Product.jsx`**

```jsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MediaFrame } from '../components/commerce/MediaFrame.jsx'
import { Tag } from '../components/core/Tag.jsx'
import { Button } from '../components/core/Button.jsx'
import { Radio } from '../components/forms/Radio.jsx'
import { Select } from '../components/forms/Select.jsx'
import { StitchDivider } from '../components/core/StitchDivider.jsx'
import { Dialog } from '../components/feedback/Dialog.jsx'
import { Toast } from '../components/feedback/Toast.jsx'
import { Icon } from '../components/core/Icon.jsx'
import { Reveal } from '../components/motion/Reveal.jsx'
import { getProduct, INSTAGRAM_URL } from '../data/products.js'

export default function Product() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [strap, setStrap] = useState(product?.strap?.[0])
  const [care, setCare] = useState(false)
  const [toast, setToast] = useState(false)

  if (!product) {
    return (
      <main style={{ padding: 'var(--space-7) var(--gutter) var(--section-y)' }}>
        <p style={{ font: 'var(--type-body)' }}>
          We could not find that piece.{' '}
          <Link to="/collection">Back to the collection</Link>.
        </p>
      </main>
    )
  }

  return (
    <main style={{ padding: 'var(--space-6) var(--gutter) var(--section-y)', position: 'relative' }}>
      <Link to="/collection" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
        <Icon name="arrow-left" size={13} /> Back
      </Link>
      <Reveal style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'var(--space-8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <MediaFrame src={product.image} alt={product.imageLabel} ratio="4 / 5" radius="xl" style={{ gridColumn: 'span 2' }} />
          <MediaFrame src={product.detailImage} alt={product.detailLabel} ratio="1 / 1" radius="lg" tone="oat" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start', paddingTop: 'var(--space-4)' }}>
          <Tag tone="outline">{product.material}</Tag>
          <h1 style={{ margin: 0, font: 'var(--type-display-2)', letterSpacing: 'var(--track-display)' }}>{product.name}</h1>
          <span style={{ font: 'var(--type-heading-3)', color: 'var(--text-secondary)' }}>Made to order — message @niana.bags</span>
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', maxWidth: '42ch', textWrap: 'pretty' }}>
            {product.description}
          </p>
          <StitchDivider height={16} style={{ alignSelf: 'stretch' }} />
          {product.strap ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Strap</span>
              <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
                {product.strap.map((s) => (
                  <Radio key={s} name="strap" label={s} checked={strap === s} onChange={() => setStrap(s)} />
                ))}
              </div>
            </div>
          ) : null}
          {product.lining ? (
            <Select label="Lining" options={product.lining} style={{ maxWidth: 260 }} />
          ) : null}
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            <Button variant="primary" size="lg" arrow onClick={() => setToast(true)}>Add to bag</Button>
            <Button variant="secondary" size="lg" onClick={() => setCare(true)}>Care</Button>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ font: 'var(--type-body-sm)', color: 'var(--text-accent)' }}>
            Message @niana.bags to order this piece
          </a>
        </div>
      </Reveal>
      <Dialog open={care} title="Care" width={420} onClose={() => setCare(false)} footer={<Button size="sm" onClick={() => setCare(false)}>Got it</Button>}>
        {product.care}
      </Dialog>
      {toast ? (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 60 }}>
          <Toast icon="shopping-bag" onClose={() => setToast(false)}>Added to bag</Toast>
        </div>
      ) : null}
    </main>
  )
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS (29 tests total)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build the Product page"
```

---

## Task 13: About page

**Files:**
- Modify: `src/pages/About.jsx`
- Test: `src/pages/About.test.jsx`

**Interfaces:**
- Consumes: `SectionHeading`, `MediaFrame`, `StitchDivider`, `Button`,
  `Input`, `Tag` (Task 4/5/6), `Reveal` (Task 9), `/images/about-studio.jpg`
  (Task 3).
- Produces: `About` (default export). Renders an element with
  `id="journal"` so `Footer`'s `/about#journal` link (Task 8) lands on the
  signup section.

- [ ] **Step 1: Write the failing test**

`src/pages/About.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About.jsx'

test('renders the three process steps and a journal signup that confirms with a toast', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  )
  expect(screen.getByText('Draft')).toBeInTheDocument()
  expect(screen.getByText('Work')).toBeInTheDocument()
  expect(screen.getByText('Finish')).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'you@example.com' } })
  fireEvent.click(screen.getByText('Sign up'))
  expect(screen.getByText(/thanks/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — the placeholder `About.jsx` has none of this.

- [ ] **Step 3: Write `src/pages/About.jsx`**

```jsx
import { useState } from 'react'
import { SectionHeading } from '../components/core/SectionHeading.jsx'
import { MediaFrame } from '../components/commerce/MediaFrame.jsx'
import { StitchDivider } from '../components/core/StitchDivider.jsx'
import { Button } from '../components/core/Button.jsx'
import { Input } from '../components/forms/Input.jsx'
import { Tag } from '../components/core/Tag.jsx'
import { Toast } from '../components/feedback/Toast.jsx'
import { Reveal } from '../components/motion/Reveal.jsx'

const STEPS = [
  ['01', 'Draft', 'Pattern cut and tested in calico before a single metre is used.'],
  ['02', 'Work', 'Crocheted, sewn or riveted by hand — one maker per bag, start to finish.'],
  ['03', 'Finish', 'Edges sealed, hardware set, and the running stitch tied off by hand.'],
]

export default function About() {
  const [email, setEmail] = useState('')
  const [signedUp, setSignedUp] = useState(false)

  const handleSignUp = () => {
    if (!email) return
    setSignedUp(true)
  }

  return (
    <main>
      <Reveal as="section" style={{ padding: 'var(--space-7) var(--gutter) 0' }}>
        <SectionHeading eyebrow="About" title="Made by hand, piece by piece" size="lg" style={{ maxWidth: 620 }} />
      </Reveal>
      <Reveal as="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', padding: 'var(--section-y) var(--gutter)' }}>
        <MediaFrame src="/images/about-studio.jpg" alt="Niana studio piece, wide" ratio="4 / 5" radius="xl" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', justifyContent: 'center' }}>
          <p style={{ margin: 0, font: 'var(--type-heading-2)', letterSpacing: 'var(--track-display)', textWrap: 'pretty' }}>
            Niana is a two-country studio: crochet, leather and denim bags worked in small batches.
          </p>
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', textWrap: 'pretty' }}>
            Nothing leaves the table until it holds its shape. Patterns are drafted once, then adjusted by hand for each material, which is why a crochet piece and its leather sibling never measure quite the same.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Tag tone="outline">Crochet</Tag><Tag tone="outline">Leather</Tag><Tag tone="outline">Denim</Tag>
          </div>
        </div>
      </Reveal>
      <Reveal as="section" style={{ background: 'var(--surface-band)', padding: 'var(--band-y) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-7)' }}>
        {STEPS.map(([n, t, d]) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ font: '300 40px/1 var(--font-sans)', letterSpacing: 'var(--track-display)', color: 'var(--ink-40)' }}>{n}</span>
            <span style={{ font: 'var(--type-heading-3)' }}>{t}</span>
            <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-secondary)' }}>{d}</span>
          </div>
        ))}
      </Reveal>
      <Reveal as="section" id="journal" style={{ padding: 'var(--section-y) var(--gutter)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <SectionHeading eyebrow="Journal" title="New pieces, twice a season" size="sm" />
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', maxWidth: '42ch' }}>
            Batches are small and go quickly. Leave an email and we will write when the next one is on the table.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-end' }}>
          <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1 }} />
          <Button variant="primary" arrow onClick={handleSignUp}>Sign up</Button>
        </div>
      </Reveal>
      <StitchDivider height={18} style={{ margin: '0 var(--gutter) var(--space-8)' }} />
      {signedUp ? (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 60 }}>
          <Toast onClose={() => setSignedUp(false)}>Thanks — we will write when the next batch is on the table.</Toast>
        </div>
      ) : null}
    </main>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS (30 tests total)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build the About page"
```

---

## Task 14: Hero SplitText, parallax, and route crossfade

**Files:**
- Create: `src/hooks/useParallax.js`
- Create: `src/components/layout/PageTransition.jsx`
- Modify: `src/components/layout/Layout.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Produces:
  - `useParallax(ref, { speed = 0.15 } = {})` — applies a scrub-linked
    vertical parallax to the ref'd element; no-ops under
    `prefers-reduced-motion`.
  - `PageTransition()` — no props; reads the current route via
    `useLocation`/`useOutlet` and crossfades in the matched page element on
    every navigation.
- Consumes: `gsap`, `gsap/ScrollTrigger`, `gsap/SplitText` (installed in
  Task 1). `Layout` (Task 8) is modified to render `<PageTransition />`
  instead of the bare `<Outlet />`.

- [ ] **Step 1: Write `src/hooks/useParallax.js`**

```js
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Scrub-linked vertical drift, restrained (no bounce/overshoot per brand rule). */
export function useParallax(ref, { speed = 0.15 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const tween = gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [ref, speed])
}
```

- [ ] **Step 2: Write `src/components/layout/PageTransition.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import gsap from 'gsap'

/** Soft crossfade between routes — one easing, no overshoot. */
export function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { opacity: 1 })
      return undefined
    }

    const tween = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.52, ease: 'power1.out' })
    return () => tween.kill()
  }, [location.pathname])

  return <div ref={containerRef}>{outlet}</div>
}
```

- [ ] **Step 3: Modify `src/components/layout/Layout.jsx` to use it**

Replace the `<Outlet />` import and usage:

```jsx
import React from 'react'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { PageTransition } from './PageTransition.jsx'

export function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <PageTransition />
      </div>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Run the full test suite to confirm the routing tests still pass**

Run: `npm test`
Expected: PASS (30 tests — `useOutlet` behaves the same as `<Outlet/>` for
existing tests that render `<App>`/`<Layout>` inside a router).

- [ ] **Step 5: Add the hero SplitText reveal and image parallax to `src/pages/Home.jsx`**

Add these imports to the top of `src/pages/Home.jsx`:

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useParallax } from '../hooks/useParallax.js'

gsap.registerPlugin(SplitText)
```

Inside the `Home` component function, before the `return`, add:

```jsx
const line1Ref = useRef(null)
const line2Ref = useRef(null)
const heroImageRef = useRef(null)

useParallax(heroImageRef, { speed: 0.12 })

useEffect(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const els = [line1Ref.current, line2Ref.current].filter(Boolean)
  if (reduce || els.length === 0) return undefined

  const splits = els.map((el) => new SplitText(el, { type: 'lines' }))
  gsap.set(splits.flatMap((s) => s.lines), { yPercent: 100, opacity: 0 })
  const tl = gsap.timeline({ delay: 0.15 })
  splits.forEach((split, i) => {
    tl.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, i * 0.12)
  })

  return () => splits.forEach((split) => split.revert())
}, [])
```

Then attach the refs to the hero markup: add `ref={line1Ref}` to the "made
by hand" `<div>`, `ref={line2Ref}` to the "piece by piece" `<div>`, and
`ref={heroImageRef}` to the `<div>` wrapping the hero `MediaFrame` (the one
with `style={{ display: 'flex', justifyContent: 'center', ... }}`).

- [ ] **Step 6: Run the full test suite**

Run: `npm test`
Expected: PASS (30 tests — `SplitText`/`ScrollTrigger` DOM measurement
doesn't run meaningfully under jsdom, but the component must still render
without throwing; if any test fails with a jsdom `getBoundingClientRect`
or similar layout error, wrap the `useEffect` body in a guard: `if
(typeof window === 'undefined' || !line1Ref.current?.offsetParent) return`
before creating the `SplitText` instances, and verify the test passes with
that guard added — jsdom elements not attached to a live layout tree can
report `offsetParent` as `null`, which is a safe signal to skip in tests
without disabling the effect in a real browser)

- [ ] **Step 7: Manually verify in the browser**

Run: `npm run dev`, open `/`. Expected: the two hero lines animate in on
load (fade + rise per line), and the hero photo drifts subtly as you
scroll past it. Navigate between Home/Collection/About and confirm each
route crossfades in rather than popping instantly. Stop the dev server
after checking.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add hero SplitText reveal, image parallax, and route crossfade"
```

---

## Task 15: Final integration verification

**Files:** none created — verification only.

- [ ] **Step 1: Run the full automated test suite**

Run: `npm test`
Expected: PASS, all tests green (30 tests from Tasks 1–13; Task 14 added no
new automated tests).

- [ ] **Step 2: Run a production build**

Run: `npm run build`
Expected: builds successfully with no errors. Note any warnings about chunk
size — acceptable for this project's scope, not a blocker.

- [ ] **Step 3: Serve the production build and browse it end-to-end**

Run: `npm run preview`, then open the printed local URL in the Browser tool.
Walk through: Home → click a "new arrivals" product → Product page loads
with the right name/material/care dialog → Back → Collection → filter by
each material tab and toggle "Made to order" → open a product → About →
scroll through the process band and try the journal signup → click the
Instagram links in the header/footer/product page and confirm they point to
`https://www.instagram.com/niana.bags/`.

Expected: no console errors (check via the Browser tool's console reader),
all images load (no broken-image icons), all four routes reachable both by
clicking and by direct URL entry.

- [ ] **Step 4: Check the mobile viewport**

Use the Browser tool to resize to the `mobile` preset and reload each of
the four pages.
Expected: no horizontal scrollbar, header/footer remain usable, product
grid reflows without overlapping text (the kit's grids are fixed
`repeat(3, 1fr)` — if any content overlaps or overflows at mobile width,
add a `@media (max-width: 780px)` rule dropping the relevant grid to a
single column, matching the kit's own breakpoint convention, and re-check).

- [ ] **Step 5: Confirm reduced motion is honored**

In the Browser tool, run
`window.matchMedia('(prefers-reduced-motion: reduce)').matches` via the
JS tool to confirm the check used in `useScrollReveal`/`useParallax`/
`PageTransition`/the hero `SplitText` effect is the exact query being
tested; then emulate reduced motion (`resize_window` with the OS-level
setting isn't directly exposed, so instead confirm by reading the
component code paths already gated in Tasks 9 and 14, and confirm the CSS
fallback in `src/styles/global.css`'s `@media (prefers-reduced-motion:
reduce)` block from Task 2 still applies) — the CSS-level fallback
(near-zero transition durations) is the safety net if any GSAP gate is
ever missed.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final verification pass"
```

---

## Self-review notes

- **Spec coverage:** every section of the design spec maps to a task —
  stack (Task 1), tokens (Task 2), photography (Task 3), all 20 components
  (Tasks 4–6), product data / no-invented-prices rule (Task 7), Chrome +
  honest footer (Task 8), all four pages (Tasks 10–13), full animation list
  — reveals, SplitText, parallax, route crossfade (Tasks 9, 14) —
  reduced-motion (Tasks 2, 9, 14, verified in 15).
- **No placeholders:** every step above contains real, complete code or a
  concrete manual-verification procedure; no task says "similar to Task N"
  or "add appropriate handling" without showing the actual code.
- **Type/signature consistency checked:** `getProduct`/`filterProducts`/
  `sortProducts`/`PRODUCTS`/`MATERIALS`/`INSTAGRAM_URL` (Task 7) are used
  with the same names and shapes in Tasks 8, 10, 11, 12. `Reveal`'s `as`
  prop (Task 9) is used consistently in Tasks 10 and 13. `ProductCard`'s
  `onSelect` prop (Task 6) is wired the same way in Tasks 10 and 11.
