import React from 'react'

/** Circular radio; the dot is Ink on Oat. */
export function Radio({ label, checked = false, onChange, name, value, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 18, height: 18, borderRadius: 'var(--radius-pill)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${checked ? 'var(--ink)' : 'var(--control-ghost-border)'}`,
        transition: 'border-color var(--dur-fast) var(--ease-cloth)',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--ink)',
          transform: checked ? 'scale(1)' : 'scale(0)',
          transition: 'transform var(--dur-base) var(--ease-cloth)',
        }} />
      </span>
      {label ? <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-primary)' }}>{label}</span> : null}
    </label>
  )
}
