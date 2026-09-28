import React from 'react'
import { Icon } from '../core/Icon.jsx'

/**
 * The stacked top-left navigation. Items sit flush left in a single column;
 * the active item is Umber and carries the arrow badge.
 */
export function NavList({ items = [], active, onSelect, inverse = false, uppercase = false, style, ...rest }) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }} {...rest}>
      {items.map((item) => {
        const label = typeof item === 'string' ? item : item.label
        const isActive = label === active
        return (
          <button
            key={label}
            onClick={() => onSelect && onSelect(label)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              font: 'var(--type-body-sm)', letterSpacing: '0.02em', textAlign: 'left',
              // Buttons don't inherit text-transform from an ancestor's
              // style prop the way plain elements would (the browser's
              // own button reset sets it directly) — has to be set here.
              textTransform: uppercase ? 'uppercase' : 'none',
              color: isActive
                ? (inverse ? 'var(--oat)' : 'var(--text-accent)')
                : (inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-secondary)'),
              transition: 'color var(--dur-base) var(--ease-cloth)',
            }}
          >
            {label}
            {isActive ? (
              <span style={{
                width: 16, height: 16, borderRadius: 'var(--radius-pill)',
                background: inverse ? 'var(--oat)' : 'var(--umber)',
                color: inverse ? 'var(--ink)' : 'var(--oat)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="arrow-right" size={9} /></span>
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}
