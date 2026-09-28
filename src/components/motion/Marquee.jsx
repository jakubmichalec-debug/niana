import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Infinite horizontal loop. `direction="ltr"` (default) moves content left
 * to right; `direction="rtl"` moves it right to left. The content is
 * duplicated once so the loop point is seamless (the duplicate is
 * identical, so the instant reset at the end of each cycle is
 * imperceptible). Freezes to a single static copy under
 * prefers-reduced-motion.
 */
export function Marquee({ text, repeat = 6, speed = 90, direction = 'ltr', style, ...rest }) {
  const trackRef = useRef(null)
  const items = Array.from({ length: repeat })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const width = track.scrollWidth / 2
    if (!width) return undefined

    const rtl = direction === 'rtl'
    gsap.set(track, { xPercent: rtl ? 0 : -50 })
    const tween = gsap.to(track, {
      xPercent: rtl ? -50 : 0,
      duration: Math.max(width / speed, 8),
      ease: 'none',
      repeat: -1,
    })

    return () => tween.kill()
  }, [speed, repeat, text, direction])

  return (
    <div aria-hidden="true" style={{ overflow: 'hidden', width: '100%', ...style }} {...rest}>
      <div ref={trackRef} style={{ display: 'inline-flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {[0, 1].map((copy) => (
          <span key={copy} style={{ display: 'inline-flex' }}>
            {items.map((_, i) => (
              <span key={i} style={{ display: 'inline-block', paddingRight: '0.5em' }}>{text}</span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
