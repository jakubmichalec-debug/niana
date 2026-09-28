import React from 'react'
import { Icon } from '../core/Icon.jsx'

/** Low-key confirmation pill: Ink surface, Oat text, one optional icon. */
export function Toast({ children, icon = 'check', tone = 'ink', onClose, style, ...rest }) {
  const tones = {
    ink: { background: 'var(--ink)', color: 'var(--oat)' },
    umber: { background: 'var(--umber)', color: 'var(--oat)' },
  }
  return (
    <div role="status" style={{
      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
      padding: '14px 18px', borderRadius: 'var(--radius-pill)',
      font: 'var(--type-body-sm)', ...tones[tone], ...style,
    }} {...rest}>
      {icon ? <Icon name={icon} size={15} /> : null}
      <span>{children}</span>
      {onClose ? (
        <button onClick={onClose} aria-label="Dismiss" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'inline-flex', opacity: 0.6, padding: 0 }}>
          <Icon name="x" size={14} />
        </button>
      ) : null}
    </div>
  )
}
