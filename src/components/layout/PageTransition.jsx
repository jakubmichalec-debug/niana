import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

/** Soft crossfade between routes — one easing, no overshoot. */
export function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { opacity: 1 })
      return undefined
    }

    const tween = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.52, ease: 'power1.out' })
    return () => tween.kill()
  }, [location.pathname])

  useEffect(() => {
    // Navigating from, say, a footer link left you part-way down the new
    // page, wherever the old one happened to be scrolled to. Go back to
    // the top on every route change — including a query-string-only one
    // (the footer's material links are all /collection?material=X: from
    // the collection page itself that's a same-pathname navigation, which
    // would otherwise never re-run this effect and leave you stranded
    // wherever you'd scrolled to on the old filter).
    //
    // It has to go through ScrollSmoother: it owns the scroll position
    // (it transforms #smooth-content rather than scrolling the document),
    // so window.scrollTo would desync the two. ScrollSmoother.get()
    // returns the instance Layout created; when it's absent — reduced
    // motion, where the smoother never initializes — fall back to the
    // native scroll. A hash link is left alone so it can reach its anchor.
    if (location.hash) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const smoother = ScrollSmoother.get()
    if (smoother) {
      if (reduce) smoother.scrollTop(0)
      else smoother.scrollTo(0, true)
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    // Route content just swapped (a taller or shorter page than before).
    // ScrollSmoother/ScrollTrigger cache the page's scrollable height and
    // don't automatically know it changed, so without this, stale bounds
    // could make things like the footer briefly snap into or out of view
    // as the smoother tries to reconcile against the new real height. rAF
    // so the swap has actually painted before measuring.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return <div ref={containerRef}>{outlet}</div>
}
