import React from 'react'
import { Icon } from '../core/Icon.jsx'

/** Square checkbox, hairline border, Ink fill when checked. */
export function Checkbox({ label, checked = false, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 18, height: 18, borderRadius: 'var(--radius-sm)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${checked ? 'var(--ink)' : 'var(--control-ghost-border)'}`,
        background: checked ? 'var(--ink)' : 'transparent',
        color: 'var(--oat)',
        transition: 'background var(--dur-fast) var(--ease-cloth), border-color var(--dur-fast) var(--ease-cloth)',
      }}>
        {checked ? <Icon name="check" size={12} /> : null}
      </span>
      {label ? <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-primary)' }}>{label}</span> : null}
    </label>
  )
}
