import React, { useRef } from 'react'
import { Icon } from './Icon.jsx'
import { useProximityScale } from '../../hooks/useProximityScale.js'

/** Circular icon-only control: search, carousel arrows, close. */
export function IconButton({ name = 'search', size = 44, variant = 'outline', label, style, ...rest }) {
  const [hot, setHot] = React.useState(false)
  const ref = useRef(null)
  useProximityScale(ref, { radius: 100, maxScale: 1.08 })
  const looks = {
    outline: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--control-ghost-border)' },
    solid: { background: 'var(--control-fill)', color: 'var(--control-text)', border: '1px solid transparent' },
    veil: { background: 'var(--oat-14)', color: 'var(--oat)', border: '1px solid var(--line-inverse)' },
    bare: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  }
  return (
    <button
      ref={ref}
      aria-label={label || name}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, borderRadius: 'var(--radius-pill)',
        cursor: 'pointer', ...looks[variant],
        opacity: hot ? 0.65 : 1,
        transition: 'opacity var(--dur-fast) linear, border-color var(--dur-base) var(--ease-cloth)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={name} size={Math.round(size * 0.38)} />
    </button>
  )
}
