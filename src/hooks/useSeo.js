import { useEffect } from 'react'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, DEFAULT_OG_IMAGE } from '../data/site.js'

function upsertMeta(attr, key, content) {
  if (!content) return null
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

/**
 * Sets this page's title, meta description, canonical URL, Open Graph /
 * Twitter card tags, and (optionally) one or more JSON-LD structured-data
 * blocks — the per-route half of the site's SEO setup (the sitewide
 * Organization schema lives as a static <script> in index.html instead,
 * since that doesn't change with the route).
 *
 * Title/description/canonical/OG tags are upserted in place rather than
 * removed on unmount, so a route change never leaves a flash of empty
 * <head> tags between the old page's cleanup and the new page's effect
 * running — the next page's useSeo call simply overwrites them. Only the
 * JSON-LD <script> is actually removed on cleanup, because leaving a
 * stale Product schema behind on whatever page loads next would be
 * actively wrong (structured data that describes content no longer on
 * the page), where a stale title for a few milliseconds is not.
 */
export function useSeo({ title, description, path, image = DEFAULT_OG_IMAGE, type = 'website', jsonLd }) {
  // Cheap to recompute every render; used as the effect dependency (in
  // place of the jsonLd object/array itself) so passing a fresh literal
  // on every render doesn't re-run the effect — only an actual content
  // change does.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = title ? `${title}, ${SITE_NAME}` : `${SITE_NAME}, ${SITE_TAGLINE}`
    document.title = fullTitle
    const url = `${SITE_URL}${path || ''}`
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)
    upsertCanonical(url)

    const list = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []
    const scripts = list.map((doc) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(doc)
      document.head.appendChild(script)
      return script
    })

    return () => {
      scripts.forEach((s) => s.remove())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, jsonLdKey])
}
