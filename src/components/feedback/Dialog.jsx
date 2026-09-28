import React from 'react'
import { IconButton } from '../core/IconButton.jsx'

/** Centred modal on an Ink veil. Corners are xl; content is left-aligned. */
export function Dialog({ open = true, title, children, footer, onClose, width = 480, style, ...rest }) {
  if (!open) return null
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(25, 23, 20, 0.42)', backdropFilter: 'var(--blur-veil)', padding: 'var(--space-5)', zIndex: 50,
    }} onClick={onClose}>
      <div
        role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{
          width, maxWidth: '100%', background: 'var(--surface-page)', color: 'var(--text-primary)',
          borderRadius: 'var(--radius-xl)', padding: 'var(--space-7)',
          boxShadow: 'var(--shadow-media)', position: 'relative', ...style,
        }}
        {...rest}
      >
        {onClose ? <IconButton name="x" size={40} variant="bare" label="Close" onClick={onClose} style={{ position: 'absolute', top: 14, right: 14 }} /> : null}
        {title ? <h3 style={{ margin: '0 0 var(--space-4)', font: 'var(--type-heading-2)', letterSpacing: 'var(--track-display)' }}>{title}</h3> : null}
        <div style={{ font: 'var(--type-body)', color: 'var(--text-secondary)' }}>{children}</div>
        {footer ? <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>{footer}</div> : null}
      </div>
    </div>
  )
}
