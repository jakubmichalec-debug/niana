import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Slides an element up into place with an elastic overshoot as it scrolls
 * into view — a livelier arrival than the standard fade+rise reveal.
 * A deliberate exception to the brand's usual "no bounce/overshoot"
 * easing rule, reserved for the footer per direct request. No-ops
 * under prefers-reduced-motion.
 */
export function useBounceReveal(ref, { distance = 40 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 })
      return undefined
    }

    gsap.set(el, { opacity: 0, y: distance })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.6)' })
      },
    })

    return () => trigger.kill()
  }, [ref, distance])
}
