import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Slides the header out of view when the reader scrolls down past a small
 * threshold, and slides it back in the moment they scroll up (or return
 * near the top). Works with `position: sticky` — the transform offsets it
 * visually without disturbing sticky's own layout position. No-ops under
 * prefers-reduced-motion (header stays put).
 */
export function useDirectionalHeader(ref, { threshold = 80 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const yTo = gsap.quickTo(el, 'yPercent', { duration: 0.35, ease: 'power2.out' })
    let hidden = false

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const goingDown = self.direction === 1
        const pastThreshold = self.scroll() > threshold
        const shouldHide = goingDown && pastThreshold
        if (shouldHide !== hidden) {
          hidden = shouldHide
          yTo(hidden ? -100 : 0)
        }
      },
    })

    return () => trigger.kill()
  }, [ref, threshold])
}
