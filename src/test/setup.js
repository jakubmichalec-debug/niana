import '@testing-library/jest-dom'

// jsdom does not implement window.matchMedia. Both GSAP's ScrollTrigger
// (registered at module-load time) and this app's own
// prefers-reduced-motion checks (useScrollReveal, useParallax,
// PageTransition, the Home hero SplitText effect) call it, so every test
// that renders a component using those needs a working stub. Defaults to
// "no match" (matches: false) — i.e. reduced motion is NOT assumed on in
// tests, so GSAP's normal (non-reduced) code paths run and are exercised.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

// jsdom also does not implement window.scrollTo — GSAP's ScrollTrigger
// calls it internally when a trigger uses `pin: true`.
// Real browsers implement this natively; jsdom just needs a no-op so the
// "Not implemented" error doesn't spam test output.
if (typeof window !== 'undefined') {
  window.scrollTo = () => {}
}

// jsdom has no rAF. GSAP's ScrollTrigger schedules one from a timer, which
// can fire after a test's environment is torn down — surfacing as an
// unhandled ReferenceError that Vitest warns may cause false positives.
// setTimeout is close enough for a non-visual environment.
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0)
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
}

// jsdom does not implement IntersectionObserver either — used by
// Logo's reveal-on-view animation (and any future scroll-into-view
// effect). Stub reports every observed element as immediately and fully
// intersecting, so components render in their "already revealed" state
// rather than throwing or staying stuck permanently hidden.
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class IntersectionObserverStub {
    constructor(callback) {
      this.callback = callback
    }
    observe(target) {
      this.callback([{ isIntersecting: true, target }], this)
    }
    unobserve() {}
    disconnect() {}
    takeRecords() { return [] }
  }
  window.IntersectionObserver = IntersectionObserverStub
  globalThis.IntersectionObserver = IntersectionObserverStub
}
