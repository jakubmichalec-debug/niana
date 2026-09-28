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
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' })
      },
    })

    return () => trigger.kill()
  }, [ref])
}
