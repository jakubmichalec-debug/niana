import React from 'react'
import { Icon } from './Icon.jsx'

/** Small pill label for material and provenance: LEATHER, CROCHET, MADE TO ORDER. */
export function Tag({ children, icon, tone = 'light', style, ...rest }) {
  const tones = {
    light: { background: 'var(--surface-raised)', color: 'var(--text-primary)' },
    veil: { background: 'var(--oat-40)', color: 'var(--ink)' },
    ink: { background: 'var(--ink)', color: 'var(--oat)' },
    outline: { background: 'transparent', color: 'var(--text-primary)', boxShadow: 'inset 0 0 0 1px var(--line-hairline)' },
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 'var(--radius-pill)',
      font: 'var(--type-label)', letterSpacing: 'var(--track-caps-tight)',
      textTransform: 'uppercase', ...tones[tone], ...style,
    }} {...rest}>
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </span>
  )
}
