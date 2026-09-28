import React from 'react'

const labelStyle = {
  font: 'var(--type-label)', letterSpacing: 'var(--track-caps)',
  textTransform: 'uppercase', color: 'var(--text-muted)',
}

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

/** Underlined text field. Niana forms are rules, not boxes. */
export function Input({ label, hint, error, value, onChange, type = 'text', placeholder, disabled, style, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', opacity: disabled ? 0.4 : 1, ...style }}>
      {label ? <span style={labelStyle}>{label}</span> : null}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          ...fieldStyle,
          borderBottomColor: error ? 'var(--umber)' : focus ? 'var(--line-strong)' : 'var(--line-hairline)',
          transition: 'border-color var(--dur-base) var(--ease-cloth)',
        }}
        {...rest}
      />
      {error || hint ? (
        <span style={{ font: 'var(--type-body-sm)', color: error ? 'var(--umber)' : 'var(--text-muted)' }}>{error || hint}</span>
      ) : null}
    </label>
  )
}
