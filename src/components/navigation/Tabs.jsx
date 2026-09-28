import React from 'react'

/** Inline filter row. Inactive labels drop to 40% — used above product grids. */
export function Tabs({ items = [], active, onSelect, inverse = false, size = 'md', style, ...rest }) {
  const font = size === 'lg' ? 'var(--type-heading-2)' : 'var(--type-heading-3)'
  return (
    <div role="tablist" style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-7)', flexWrap: 'wrap', ...style }} {...rest}>
      {items.map((label) => {
        const isActive = label === active
        return (
          <button
            key={label} role="tab" aria-selected={isActive}
            onClick={() => onSelect && onSelect(label)}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              font, letterSpacing: 'var(--track-display)',
              textTransform: size === 'lg' ? 'uppercase' : 'none',
              color: inverse ? 'var(--oat)' : 'var(--text-primary)',
              opacity: isActive ? 1 : 0.4,
              transition: 'opacity var(--dur-base) var(--ease-cloth)',
            }}
          >{label}</button>
        )
      })}
    </div>
  )
}
