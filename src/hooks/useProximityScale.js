import { useEffect } from 'react'
import gsap from 'gsap'

/**
 * Scales an element based on how close the pointer is to its center.
 * gsap.quickTo continuously eases toward whatever target proximity produces
 * next, in both directions — approaching eases the scale up, leaving eases
 * it back down along the same curve reversed, with no separate "on leave"
 * tween needed. No-ops under prefers-reduced-motion.
 *
 * Animates scaleX/scaleY separately rather than the shorthand `scale` —
 * GSAP warns ("scale not eligible for reset. Try splitting into individual
 * properties") when a quickTo-driven `scale` tween is killed mid-flight,
 * which happens routinely here on unmount/React StrictMode's double effect
 * invoke.
 */
export function useProximityScale(ref, { radius = 140, maxScale = 1.06, duration = 0.35, ease = 'power2.out' } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const scaleXTo = gsap.quickTo(el, 'scaleX', { duration, ease })
    const scaleYTo = gsap.quickTo(el, 'scaleY', { duration, ease })
    const setScale = (value) => {
      scaleXTo(value)
      scaleYTo(value)
    }

    const onPointerMove = (event) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(event.clientX - cx, event.clientY - cy)
      const proximity = Math.max(0, 1 - dist / radius)
      setScale(1 + proximity * (maxScale - 1))
    }

    const onPointerLeaveWindow = () => setScale(1)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeaveWindow)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeaveWindow)
      gsap.killTweensOf(el)
    }
  }, [ref, radius, maxScale, duration, ease])
}
