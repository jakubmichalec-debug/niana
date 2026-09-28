import React from 'react'

/** Hover label. Ink pill, tracked caps, no arrow tail. */
export function Tooltip({ label, children, placement = 'top', style, ...rest }) {
  const [show, setShow] = React.useState(false)
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%, -8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%, 8px)' },
    right: { left: '100%', top: '50%', transform: 'translate(8px, -50%)' },
  }[placement]
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      {...rest}
    >
      {children}
      <span style={{
        position: 'absolute', ...pos, whiteSpace: 'nowrap', pointerEvents: 'none',
        background: 'var(--ink)', color: 'var(--oat)', padding: '6px 10px',
        borderRadius: 'var(--radius-pill)', font: 'var(--type-label)',
        letterSpacing: 'var(--track-caps-tight)', textTransform: 'uppercase',
        opacity: show ? 1 : 0, transition: 'opacity var(--dur-fast) linear',
      }}>{label}</span>
    </span>
  )
}
