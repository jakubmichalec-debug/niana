import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/core/Button.jsx'
import { MediaFrame } from '../components/commerce/MediaFrame.jsx'
import { SectionHeading } from '../components/core/SectionHeading.jsx'
import { Reveal } from '../components/motion/Reveal.jsx'
import { Marquee } from '../components/motion/Marquee.jsx'
import { ProductLoop } from '../components/motion/ProductLoop.jsx'
import { useParallax } from '../hooks/useParallax.js'
import { useStaggerReveal } from '../hooks/useStaggerReveal.js'
import { useBounceReveal } from '../hooks/useBounceReveal.js'
import { NEW_ARRIVALS } from '../data/newArrivals.js'
import { INSTAGRAM_URL } from '../data/products.js'
import { useSeo } from '../hooks/useSeo.js'
import { useLanguage } from '../hooks/useLanguage.jsx'

const srOnly = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0,
}

// One already-shot piece per material, for the "Explore" band only — not
// a data-model concept (a product can't belong to more than one of these),
// so it lives here rather than in data/products.js. Chosen for the photo,
// not for any other significance.
const EXPLORE_MATERIALS = [
  { material: 'Crochet', image: '/images/malinova.jpg', alt: 'Niana crochet bag, malinová' },
  { material: 'Leather', image: '/images/modra.jpg', alt: 'Niana leather bag, modrá' },
  { material: 'Denim', image: '/images/denim.jpg', alt: 'Niana denim tote' },
]

export default function Home() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  useSeo({
    description: 'Handmade crochet, leather, and denim bags, worked by hand between Slovakia and Belgium. Every piece one of one.',
    path: '/',
  })

  const mainRef = useRef(null)
  const heroImageRef = useRef(null)
  const arrivalsHeadingRef = useRef(null)
  const exploreGridRef = useRef(null)

  useParallax(heroImageRef, { speed: 0.12 })
  useStaggerReveal(exploreGridRef)
  // A deliberate exception to the site's usual restrained-easing rule —
  // same elastic pop already used for the footer — because this heading
  // is explicitly meant to catch the eye, not sit quietly.
  useBounceReveal(arrivalsHeadingRef, { distance: 30 })
  // Every section below is minHeight:100vh, so each one still fills the
  // screen as you scroll to it — but scroll is no longer forced/snapped
  // to section boundaries (a prior useSectionSnap hook did that and was
  // removed: it was pulling scroll back to the top unpredictably).

  return (
    <main ref={mainRef}>
      {/* Hero — one infinite-loop display line, centered on the product photo */}
      {/* minHeight subtracts the fixed header (--header-h, published by
          Layout's ResizeObserver): this section is rendered below the
          header, so a plain 100vh would overshoot the fold by the header's
          height and drag the vertically-centred bag down with it. */}
      <section style={{
        // No overflow:hidden here (on purpose) — the bag photo is taller
        // than this section on shorter viewports, and the point is for
        // it to bleed down into the New Arrivals band below rather than
        // get clipped at the fold. The marquee text still clips cleanly
        // on its own: Marquee.jsx wraps itself in its own
        // overflow:hidden div, independent of this section's.
        // height, not minHeight: a flex container only ever grows past
        // minHeight to fit taller content, which meant the section was
        // quietly stretching itself to fully contain the photo instead
        // of ever actually letting it spill into New Arrivals — the
        // bleed only happens with a height the photo can genuinely
        // exceed.
        position: 'relative',
        height: 'calc(100vh - var(--header-h, 97px))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-6) 0',
      }}>
        <h1 style={srOnly}>{t('home.srHeading')}</h1>
        {/* Marquee centers on THIS wrapper's own height (i.e. the bag's
            height), not the section's — so it stays locked to the photo
            regardless of how tall the 100vh section is. */}
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Back to a single plain-colored copy — the masked second
              layer (bag photo as the text's "ink", clipped to a window
              over the picture) kept leaving stray fragments of the
              pattern visible past the bag's actual silhouette: real
              crochet has small gaps between stitches, and the hardware
              rings have an actual hole in them, so a plain rectangular
              clip window was never going to line up with the photo's
              true (very irregular) opaque area everywhere the text
              band crossed it. Not worth chasing further for a
              decorative effect — this was the pre-approved fallback. */}
          <Marquee
            text="made by hand piece by piece"
            speed={90}
            direction="rtl"
            style={{
              position: 'absolute', top: '35%', left: 0,
              transform: 'translateY(-50%)',
              // Lateef ExtraLight (weight 200) — a real named weight the
              // font ships, not a synthetic thin-out of a bolder one.
              font: '200 clamp(48px, 13vw, 200px)/0.9 var(--font-marquee)',
              letterSpacing: 'var(--track-display)', color: 'var(--rose)',
            }}
          />
          <div ref={heroImageRef} style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2, marginTop: '-32px' }}>
            {/* WebP, not PNG: this is a photograph, but it has a cut-out
                transparent background so it can float over the marquee
                line — which rules out JPEG. WebP keeps the alpha at a
                fraction of the PNG's weight. hero.png (the earlier,
                white-bag photo) stays on disk only because og:image
                feeds link-preview scrapers, whose WebP support is still
                patchy — DEFAULT_OG_IMAGE in data/site.js was left
                pointing at it deliberately, not missed. fetchpriority +
                the preload in index.html make this the first thing
                fetched. Full photo, uncropped (0.618 width/height,
                including the crossbody strap's full drop) — it renders
                taller than the hero section on shorter windows, which
                is deliberate; see the height/overflow notes on the
                section and this element below. */}
            <img
              src="/images/hero-pink.webp" alt={t('home.heroAlt')}
              fetchpriority="high"
              /* The 400px cap is what governs desktop; the 86vw side of
                 the min() is kept so narrow phones still scale the
                 image down instead of it overflowing the viewport
                 width at a flat 400px. No maxHeight (deliberately): full
                 natural size, even where that's taller than the hero
                 section's own box on a shorter window — it's meant to
                 spread across the fold into New Arrivals rather than
                 shrink to avoid it. Nothing clips it: this section has
                 no overflow:hidden, and neither does New Arrivals' own
                 background stop it from painting over — the image
                 wrapper's zIndex:2 (below) keeps it above New Arrivals'
                 plain (z-index:auto) background regardless of which one
                 the fold happens to land in. */
              style={{ display: 'block', width: 'min(86vw, 400px)', transform: 'rotate(0deg)' }}
            />
          </div>
        </div>
        {/* Hero CTA — bottom-right, same pill treatment as the header nav
            (solid --rose, uppercase, light text) so the two read as one
            styling language rather than two different buttons. */}
        <Button
          variant="primary" arrow
          onClick={() => navigate('/collection')}
          style={{ position: 'absolute', right: 'var(--gutter)', bottom: 'var(--space-6)', background: 'var(--rose)', color: 'var(--oat)', zIndex: 4 }}
        >
          {t('home.heroLearnMore')}
        </Button>
      </section>

      {/* Blush band — new arrivals: one bold heading, then a continuous
          side-to-side loop of the 5 photos from niana/photos/NewArrivals,
          each cropped to the same 4:5 ratio so the cards read as genuinely
          uniform. Full-bleed both ways — no side gutter, and no vertical
          padding either (per request) — so the strip runs edge to edge
          and the heading/cards sit as close to the band's own top/bottom
          as minHeight and justifyContent:center allow. In --blush (a
          lighter, less saturated pink than the header's --rose) rather
          than the shared --surface-band stone (which About's steps
          section still uses — this band alone gets the pink). */}
      <section style={{ minHeight: '90vh', background: 'var(--blush)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0, overflow: 'hidden' }}>
        <div
          ref={arrivalsHeadingRef}
          style={{
            // Lalezar, 96px cap (was Jost at a 76px cap) — scaled down
            // proportionally below that so it still fits small screens.
            font: '400 clamp(50px, 8vw, 96px)/1 var(--font-arrivals)',
            letterSpacing: '0.02em', textTransform: 'uppercase',
            color: 'var(--oat)', textAlign: 'center',
            margin: 'clamp(43px, 7vh, 86px) var(--gutter) 0',
          }}
        >
          {t('home.newArrivals')}
        </div>
        <ProductLoop
          items={NEW_ARRIVALS}
          onSelect={() => window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer')}
        />
      </section>

      {/* Explore by material — one piece per material the studio actually
          works in, each linking straight into the Collection pre-filtered
          to it. Replaces the earlier about-teaser/collage that lived in
          this slot; About is still one tap away from the header nav. */}
      <Reveal as="section" className="home-explore-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(40px, 6vh, 72px)', padding: 'var(--space-9) var(--gutter)' }}>
        <SectionHeading
          title={t('home.exploreTitle')}
          align="center" style={{ alignItems: 'center' }}
          titleStyle={{ font: '400 clamp(50px, 8vw, 96px)/1 var(--font-arrivals)', textTransform: 'uppercase', color: 'var(--rose)' }}
        />
        <div ref={exploreGridRef} className="stack-on-mobile home-explore-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
          {EXPLORE_MATERIALS.map((entry) => (
            <div key={entry.material} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', textAlign: 'center' }}>
              <MediaFrame src={entry.image} alt={entry.alt} ratio="4 / 5" radius="xl" style={{ width: '100%' }} />
              <span style={{ font: 'var(--type-heading-3)', color: 'var(--ink)' }}>
                {t(`collection.${entry.material.toLowerCase()}`)}
              </span>
              <Button
                variant="secondary" arrow onClick={() => navigate(`/collection?material=${entry.material}`)}
                style={{ color: 'var(--mauve)', borderColor: 'var(--mauve)' }}
              >
                {t('home.viewCollection')}
              </Button>
            </div>
          ))}
        </div>
      </Reveal>
    </main>
  )
}
