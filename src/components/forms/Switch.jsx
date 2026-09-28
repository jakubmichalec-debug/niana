import React from 'react'

/** Pill toggle. Track goes Ink when on. */
export function Switch({ label, checked = false, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 42, height: 24, borderRadius: 'var(--radius-pill)', padding: 3,
        background: checked ? 'var(--ink)' : 'transparent',
        boxShadow: checked ? 'none' : 'inset 0 0 0 1px var(--control-ghost-border)',
        transition: 'background var(--dur-base) var(--ease-cloth)',
        display: 'inline-flex',
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: 'var(--radius-pill)',
          background: checked ? 'var(--oat)' : 'var(--ink-40)',
          transform: checked ? 'translateX(18px)' : 'none',
          transition: 'transform var(--dur-base) var(--ease-cloth), background var(--dur-base) var(--ease-cloth)',
        }} />
      </span>
      {label ? <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-primary)' }}>{label}</span> : null}
    </label>
  )
}
