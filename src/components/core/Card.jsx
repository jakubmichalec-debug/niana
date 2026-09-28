import React from 'react'

/** Soft-square container. Media-led by default; no shadow unless it holds a photo. */
export function Card({ children, tone = 'raised', radius = 'lg', padding = 'var(--space-5)', lift = false, style, ...rest }) {
  const tones = {
    raised: { background: 'var(--surface-card)', color: 'var(--text-primary)' },
    page: { background: 'var(--surface-page)', color: 'var(--text-primary)' },
    veil: { background: 'var(--oat-40)', color: 'var(--ink)' },
    inverse: { background: 'var(--surface-card-inverse)', color: 'var(--text-on-inverse)' },
    outline: { background: 'transparent', color: 'var(--text-primary)', boxShadow: 'inset 0 0 0 1px var(--line-hairline)' },
  }
  return (
    <div style={{
      borderRadius: `var(--radius-${radius})`,
      padding,
      boxShadow: lift ? 'var(--shadow-media)' : undefined,
      ...tones[tone], ...style,
    }} {...rest}>{children}</div>
  )
}
