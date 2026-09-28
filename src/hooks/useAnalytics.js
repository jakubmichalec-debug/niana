import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ANALYTICS_ID } from '../data/site.js'

const GA_COOKIE_PREFIXES = ['_ga', '_gid', '_gat']

function clearAnalyticsCookies() {
  // Best effort: cookies set for the bare host can be expired from here.
  // Anything GA scoped to a parent domain is out of reach of client JS,
  // which is a limitation worth knowing rather than pretending otherwise.
  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0].trim()
    if (!GA_COOKIE_PREFIXES.some((p) => name.startsWith(p))) return
    document.cookie = `${name}=; Max-Age=0; path=/`
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}`
  })
}

/**
 * Loads GA4 — but only once the visitor has actively opted in, and only
 * if a measurement ID is configured. With consent 'denied' or still
 * unanswered, no script is requested and no cookie is written, which is
 * what makes the EU consent requirement actually hold rather than just
 * being claimed in the policy.
 *
 * Route changes are reported manually: gtag's automatic page_view fires
 * once at config time, and a single-page app never reloads afterwards,
 * so without this every visit would look like one page.
 */
export function useAnalytics(consent) {
  const location = useLocation()
  const enabled = Boolean(ANALYTICS_ID) && consent === 'granted'

  useEffect(() => {
    if (!enabled) {
      if (consent === 'denied') clearAnalyticsCookies()
      return undefined
    }
    if (window.gtag) return undefined

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() { window.dataLayer.push(arguments) }
    window.gtag = gtag
    gtag('js', new Date())
    // send_page_view false: the effect below reports every view, including
    // this first one, so letting config fire its own would double-count.
    gtag('config', ANALYTICS_ID, { anonymize_ip: true, send_page_view: false })

    return undefined
  }, [enabled, consent])

  useEffect(() => {
    if (!enabled || !window.gtag) return
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    })
  }, [enabled, location.pathname, location.search])
}
