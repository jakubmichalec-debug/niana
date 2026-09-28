import { useMemo, useRef, useLayoutEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/core/SectionHeading.jsx'
import { Tabs } from '../components/navigation/Tabs.jsx'
import { Select } from '../components/forms/Select.jsx'
import { ProductCard } from '../components/commerce/ProductCard.jsx'
import { Reveal } from '../components/motion/Reveal.jsx'
import { breadcrumbJsonLd } from '../components/navigation/Breadcrumbs.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { SITE_URL } from '../data/site.js'
import { PRODUCTS, MATERIALS, sortProducts } from '../data/products.js'

gsap.registerPlugin(Flip, ScrollTrigger)

const CRUMBS = [{ label: 'Home', to: '/' }, { label: 'Collection' }]

/**
 * Rebuilt to match GSAP's own "Smooth Flexbox Filtering with Flip" demo
 * (https://codepen.io/GreenSock/pen/NWRxarv) as closely as this data set
 * allows — pulled the demo's actual source directly rather than guessing.
 * The one thing that matters most: every card stays mounted in the DOM at
 * all times. Filtering only ever toggles a card's CSS `display` between
 * 'none' and 'flex' — it is never added to or removed from the DOM by
 * React. That's what makes Flip.getState()/Flip.from() reliable here;
 * an earlier version conditionally rendered only the matching cards,
 * which meant Flip had to rediscover "new" DOM nodes after every filter
 * change and never worked consistently.
 */
export default function Collection() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const gridRef = useRef(null)
  const flipStateRef = useRef(null)

  const material = MATERIALS.includes(searchParams.get('material'))
    ? searchParams.get('material')
    : 'All'
  const sortBy = searchParams.get('sort') === 'name-desc' ? 'name-desc' : 'name-asc'

  // Always all 5 products, just reordered by sort — never filtered out of
  // this array. Visibility is a per-card style, not array membership.
  const sortedProducts = useMemo(() => sortProducts(PRODUCTS, sortBy), [sortBy])

  const isVisible = (p) => material === 'All' || p.material === material

  const visibleCount = sortedProducts.filter(isVisible).length

  // Capture the grid's DOM state synchronously, before the filter/sort
  // change is even applied to React state (see captureFlipState, called
  // at the top of updateParams) — NOT inside a useLayoutEffect cleanup.
  // React commits a re-render's DOM mutations *before* running any
  // layout-effect cleanup/setup for that commit, so a cleanup-based
  // capture actually reads the DOM *after* it already reflects the new
  // filter — Flip then has nothing to animate the position change from,
  // so cards snap instead of sliding. Capturing in the event handler
  // guarantees the DOM still shows the old state.
  const captureFlipState = () => {
    if (gridRef.current) {
      flipStateRef.current = Flip.getState(Array.from(gridRef.current.children))
    }
  }

  useLayoutEffect(() => {
    const state = flipStateRef.current
    const grid = gridRef.current
    if (!state || !grid) return
    flipStateRef.current = null

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Lock the grid's own pixel height for the transition. absolute:true
    // (below) pulls every card out of normal flow so they can move
    // freely, which would otherwise collapse the grid to 0 height for a
    // frame and yank whatever comes after it (the footer) into view then
    // back out. The demo doesn't need this — its container has a fixed
    // CSS height; ours doesn't, since row count varies with the filter.
    const startHeight = grid.getBoundingClientRect().height
    grid.style.height = `${startHeight}px`

    Flip.from(state, {
      duration: 0.7,
      scale: true,
      ease: 'power1.inOut',
      stagger: 0.05,
      absolute: true,
      onEnter: (elements) => gsap.fromTo(
        elements,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6 }
      ),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.4 }),
      onComplete: () => {
        grid.style.height = ''
        // Visible row count likely just changed — let ScrollSmoother/
        // ScrollTrigger re-measure so the page's scrollable range stays
        // accurate.
        ScrollTrigger.refresh()
      },
    })
  }, [material, sortBy])

  const updateParams = (patch) => {
    captureFlipState()
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === 'All' || value === false) next.delete(key)
      else next.set(key, value === true ? '1' : value)
    })
    setSearchParams(next)
  }

  useSeo({
    title: 'Collection',
    description: 'Handmade crochet, leather, and denim bags, every piece one of one, already made, and sold as seen.',
    path: '/collection',
    jsonLd: [
      breadcrumbJsonLd(CRUMBS),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: PRODUCTS.map((p, i) => ({
          '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/collection/${p.slug}`, name: p.name,
        })),
      },
    ],
  })

  return (
    <main style={{ padding: 'var(--space-7) var(--gutter) var(--section-y)' }}>
      <SectionHeading
        as="h1" eyebrow={t('collection.eyebrow')} title={t('collection.title')} size="lg"
        titleStyle={{ fontFamily: 'var(--font-arrivals)', color: 'var(--rose)' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-6)', margin: 'var(--space-8) 0 var(--space-6)', flexWrap: 'wrap' }}>
        {/* Tab labels are translated for display, but the value sent back
            to updateParams stays the English material name the product
            data and the ?material= query param are keyed on. */}
        <Tabs
          className="collection-tabs"
          items={MATERIALS.map((m) => t(`collection.${m.toLowerCase()}`))}
          active={t(`collection.${material.toLowerCase()}`)}
          onSelect={(label) => {
            const match = MATERIALS.find((m) => t(`collection.${m.toLowerCase()}`) === label)
            updateParams({ material: match || 'All' })
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <Select
            options={[{ value: 'name-asc', label: t('collection.sortAsc') }, { value: 'name-desc', label: t('collection.sortDesc') }]}
            value={sortBy}
            onChange={(e) => updateParams({ sort: e.target.value })}
            style={{ width: 200 }}
          />
        </div>
      </div>
      <Reveal>
        <div ref={gridRef} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-7) var(--space-6)' }}>
          {sortedProducts.map((p) => (
            <div
              key={p.slug}
              style={{ display: isVisible(p) ? 'flex' : 'none', flex: '0 1 300px', maxWidth: 360 }}
            >
              <ProductCard
                name={p.name} material={p.material} image={p.images[0]?.src}
                imageLabel={p.images[0]?.label}
                // The grid tile is always the cutout-on-transparent cover
                // shot (see products.js) — contain, not cover, so the crop
                // never chops the bag at the frame's edge.
                mediaFit="contain"
                onSelect={() => navigate(`/collection/${p.slug}`)}
              />
            </div>
          ))}
        </div>
      </Reveal>
      {visibleCount === 0 ? (
        <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>{t('collection.empty')}</p>
      ) : null}
    </main>
  )
}
