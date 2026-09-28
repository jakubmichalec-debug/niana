import React from 'react'
import { Link } from 'react-router-dom'
import { SITE_URL } from '../../data/site.js'

/**
 * Visible trail (Home / Collection / Bordová) plus the matching
 * BreadcrumbList JSON-LD for the same trail — call breadcrumbJsonLd(items)
 * and pass the result into useSeo's `jsonLd` so the two never drift apart.
 * `items` is [{ label, to }], the current/last page first-in-last-out —
 * the last entry has no `to` (it's not a link, it's "you are here").
 */
export function Breadcrumbs({ items, style }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-6)', ...style }}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, margin: 0, padding: 0, listStyle: 'none', font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {items.map((item, i) => (
          <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {item.to ? (
              <Link to={item.to} style={{ color: 'var(--text-muted)' }}>{item.label}</Link>
            ) : (
              <span aria-current="page" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.to ? `${SITE_URL}${item.to}` : undefined,
    })),
  }
}
