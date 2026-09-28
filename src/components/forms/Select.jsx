import React from 'react'
import { Icon } from '../core/Icon.jsx'

const fieldStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--line-hairline)',
  padding: '12px 2px',
  font: 'var(--type-body)',
  color: 'var(--text-primary)',
  outline: 'none',
  borderRadius: 0,
}

/** Underlined native select with a chevron. */
export function Select({ label, options = [], value, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', opacity: disabled ? 0.4 : 1, ...style }}>
      {label ? (
        <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
      ) : null}
      <span style={{ position: 'relative', display: 'block' }}>
        <select
          value={value} onChange={onChange} disabled={disabled}
          style={{ ...fieldStyle, appearance: 'none', paddingRight: 28, cursor: 'pointer' }}
          {...rest}
        >
          {options.map((o) => (
            <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
              {typeof o === 'string' ? o : o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={16} style={{ position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </span>
    </label>
  )
}
