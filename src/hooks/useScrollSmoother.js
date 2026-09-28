import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/**
 * Feeds every scroll input (mouse wheel, trackpad, scrollbar drag) through
 * one smoothed, inertial value — this is what actually makes wheel
 * scrolling feel like trackpad scrolling, rather than just synchronizing
 * event timing (which is all ScrollTrigger.normalizeScroll does, and
 * proved not enough). ScrollTrigger automatically reads from the smoothed
 * position once this is active, so every existing scroll-driven hook
 * (useScrollReveal, useStaggerReveal, useParallax,
 * useDirectionalHeader) keeps working unchanged. No-ops under
 * prefers-reduced-motion (native, unsmoothed scroll).
 *
 * Requires `#smooth-wrapper` > `#smooth-content` in the DOM — see
 * Layout.jsx. Call once; Layout persists across route changes so this
 * doesn't re-initialize on navigation.
 */
export function useScrollSmoother({ smooth = 1.1 } = {}) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth,
      normalizeScroll: true,
      ignoreMobileResize: true,
    })

    return () => smoother.kill()
  }, [smooth])
}
