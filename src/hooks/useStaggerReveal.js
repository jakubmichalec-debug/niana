import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Staggered scale+fade entrance for a grid of items, triggered once as the
 * container scrolls into view (ScrollTrigger, ease back.out per the grid
 * stagger preset). No-ops (items stay visible) under prefers-reduced-motion.
 */
export function useStaggerReveal(containerRef, itemSelector = ':scope > *') {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined
    const items = container.querySelectorAll(itemSelector)
    if (!items.length) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(items, { opacity: 1, scale: 1, y: 0 })
      return undefined
    }

    gsap.set(items, { opacity: 0, scale: 0.92, y: 16 })
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: { each: 0.06, from: 'start', grid: 'auto' },
          ease: 'back.out(1.4)',
        })
      },
    })

    return () => trigger.kill()
  }, [containerRef, itemSelector])
}
