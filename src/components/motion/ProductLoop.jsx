import { useCallback, useEffect, useRef, useState } from 'react'
import { ProductCard } from '../commerce/ProductCard.jsx'

/**
 * Coverflow-style strip of product cards, position driven by the range
 * slider underneath rather than a continuous auto-scroll: whichever card
 * sits at the current slider position renders large, flat and fully
 * opaque; cards further from it shrink, dim, and rotate away in 3D like a
 * stack fanned out from the middle one — the same pose idea the old
 * auto-looping version used, just keyed off `position` (an index into
 * `items`) instead of a per-frame scroll offset measured from the DOM, so
 * the whole thing is plain state + a CSS transition rather than a GSAP
 * ticker.
 *
 * The tilt itself is toned down on phones (see `isMobile`): at a card
 * width of up to 82.3vw there's barely room for a neighbor to peek out
 * from behind, so the full desktop rotateY just looks like a lopsided
 * skew rather than a stack of cards — a shallower angle and shorter z
 * throw reads as "there's more behind this one" without the skew.
 *
 * Each card also scales up further on its own hover via the
 * `.arrivals-card-inner` CSS rule (global.css) — that lives on a nested
 * element specifically so it can layer its own `transform` on top of the
 * coverflow pose set here on the outer `.arrivals-card`, rather than the
 * two fighting over the same property. Freezes to a flat row with no pose
 * or transition under prefers-reduced-motion.
 */
const MOBILE_QUERY = '(max-width: 780px)'
const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'

export function ProductLoop({ items, onSelect }) {
  const scrollerRef = useRef(null)
  const cardRefs = useRef([])
  const [position, setPosition] = useState(0)
  const [trackX, setTrackX] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY)
    const reduceQuery = window.matchMedia(REDUCE_QUERY)
    const syncMobile = () => setIsMobile(mobileQuery.matches)
    const syncReduce = () => setReduce(reduceQuery.matches)
    syncMobile()
    syncReduce()
    mobileQuery.addEventListener('change', syncMobile)
    reduceQuery.addEventListener('change', syncReduce)
    return () => {
      mobileQuery.removeEventListener('change', syncMobile)
      reduceQuery.removeEventListener('change', syncReduce)
    }
  }, [])

  // Slides the track so `position`'s card sits centered in the scroller —
  // measured off the actual rendered card (its responsive clamp() width
  // makes the step a moving target), not computed algebraically.
  const recenter = useCallback(() => {
    const scroller = scrollerRef.current
    const card = cardRefs.current[0]
    if (!scroller || !card) return
    const step = card.offsetWidth + 12 // the card's own `margin: 0 6px`, both sides
    const cardCenter = position * step + card.offsetWidth / 2
    setTrackX(scroller.clientWidth / 2 - cardCenter)
  }, [position])

  useEffect(() => {
    recenter()
    window.addEventListener('resize', recenter)
    return () => window.removeEventListener('resize', recenter)
  }, [recenter])

  const poseFor = (index) => {
    if (reduce) return {}
    const delta = index - position
    const fall = Math.min(Math.abs(delta), 2) // pose keeps deepening up to 2 cards out
    const tilt = Math.max(-1, Math.min(1, delta)) // rotation itself maxes out 1 card out
    const rotateDeg = isMobile ? -14 : -32
    const zPeak = isMobile ? 70 : 160
    return {
      transform: `translateZ(${-fall * zPeak}px) rotateY(${tilt * rotateDeg}deg) scale(${1 - 0.3 * Math.min(fall, 1)})`,
      opacity: 1 - 0.35 * Math.min(fall, 1),
      zIndex: Math.round((2 - fall) * 10),
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingBottom: 'var(--space-7)' }}>
      <div ref={scrollerRef} style={{ overflow: 'hidden', width: '100%', padding: '32px 0', perspective: isMobile ? '900px' : '1400px' }}>
        <div
          style={{
            display: 'flex', width: 'fit-content',
            transform: `translateX(${trackX}px)`,
            transition: reduce ? 'none' : 'transform var(--dur-slow) var(--ease-cloth)',
          }}
        >
          {items.map((p, i) => (
            <div
              key={p.name}
              ref={(el) => { cardRefs.current[i] = el }}
              className="arrivals-card"
              style={{
                width: 'clamp(266px, 82.3vw, 472px)', flex: '0 0 auto', margin: '0 6px',
                backfaceVisibility: 'hidden',
                transition: reduce ? 'none' : 'transform var(--dur-slow) var(--ease-cloth), opacity var(--dur-slow) var(--ease-cloth)',
                ...poseFor(i),
              }}
            >
              <div className="arrivals-card-inner">
                <ProductCard
                  name={p.name} material={p.material} image={p.image}
                  imageLabel={p.imageLabel} mediaTone="oat" inverse mediaBackdrop
                  onSelect={() => onSelect(p)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <input
        type="range" min={0} max={items.length - 1} step={1} value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Scroll through new arrivals"
        className="arrivals-slider"
        style={{ width: 'min(420px, 86%)', alignSelf: 'center' }}
      />
    </div>
  )
}
