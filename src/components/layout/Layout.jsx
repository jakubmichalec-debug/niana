import React, { useEffect, useState } from 'react'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { PageTransition } from './PageTransition.jsx'
import { CookieConsent } from '../feedback/CookieConsent.jsx'
import { useScrollSmoother } from '../../hooks/useScrollSmoother.js'
import { useCookieConsent } from '../../hooks/useCookieConsent.js'
import { useAnalytics } from '../../hooks/useAnalytics.js'

// Matches Header's typical rendered height (28px top pad + 22px bottom pad
// + ~40px tallest inner content) — used only until the ResizeObserver below
// reports the real measured height, to avoid a layout jump on first paint.
const FALLBACK_HEADER_HEIGHT = 97

export function Layout() {
  const [headerHeight, setHeaderHeight] = useState(FALLBACK_HEADER_HEIGHT)

  // Consent lives here, in the one component that persists across routes,
  // so there is a single answer to "may analytics run" rather than one
  // copy per component. useAnalytics loads nothing until it is 'granted'.
  const { consent, decide } = useCookieConsent()
  useAnalytics(consent)

  // Applied once here (Layout persists across route changes, unlike the
  // page content inside PageTransition) so smoothing stays active across
  // the whole app, not re-initialized per navigation.
  useScrollSmoother()

  useEffect(() => {
    const header = document.querySelector('header')
    if (!header || typeof ResizeObserver === 'undefined') return undefined

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
      if (!height) return
      setHeaderHeight(height)
      // Also published as a CSS variable so stylesheets can subtract the
      // header without hardcoding its height. A full-height section that
      // uses plain 100vh sits *below* the fixed header and therefore runs
      // past the fold by exactly this much, pushing its centred contents
      // off-centre — see the hero in pages/Home.jsx.
      document.documentElement.style.setProperty('--header-h', `${height}px`)
    })
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      {/* ScrollSmoother takes over #smooth-wrapper (position: fixed,
          covers the viewport) and transforms #smooth-content to simulate
          inertial scrolling — see useScrollSmoother. paddingTop clears the
          fixed header, which lives outside this structure. */}
      <div id="smooth-wrapper">
        <div id="smooth-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: headerHeight }}>
          <div id="main-content" style={{ flex: 1 }}>
            <PageTransition />
          </div>
          <Footer />
        </div>
      </div>
      {consent === null ? <CookieConsent onDecide={decide} /> : null}
    </>
  )
}
