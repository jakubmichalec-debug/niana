import React from 'react'

/** Numeric or one-word status marker; smaller and quieter than Tag. */
export function Badge({ children, tone = 'ink', style, ...rest }) {
  const tones = {
    ink: { background: 'var(--ink)', color: 'var(--oat)' },
    umber: { background: 'var(--umber)', color: 'var(--oat)' },
    quiet: { background: 'var(--ink-08)', color: 'var(--text-primary)' },
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 20, height: 20, padding: '0 7px', borderRadius: 'var(--radius-pill)',
      font: 'var(--type-label)', letterSpacing: '0.06em', ...tones[tone], ...style,
    }} {...rest}>{children}</span>
  )
}
