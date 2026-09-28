import React, { useRef } from 'react'
import { Icon } from './Icon.jsx'
import { useProximityScale } from '../../hooks/useProximityScale.js'

const base = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  font: 'var(--type-body-sm)',
  letterSpacing: 'var(--track-caps-tight)',
  textTransform: 'uppercase',
  borderRadius: 'var(--radius-pill)',
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background var(--dur-base) var(--ease-cloth), color var(--dur-base) var(--ease-cloth), border-color var(--dur-base) var(--ease-cloth), opacity var(--dur-fast) linear',
  whiteSpace: 'nowrap',
}

const sizes = {
  sm: { padding: '9px 18px', fontSize: 11 },
  md: { padding: '13px 26px', fontSize: 12 },
  lg: { padding: '17px 34px', fontSize: 13 },
}

const looks = {
  primary: { background: 'var(--control-fill)', color: 'var(--control-text)' },
  secondary: { background: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--control-ghost-border)' },
  ghost: { background: 'transparent', color: 'var(--text-primary)', padding: 0, borderRadius: 0 },
  // Outline in cream, for use on a colored/dark card (ProductCard's own
  // `inverse` prop) — not used anywhere before this, so redefining it
  // here (rather than adding yet another variant name) doesn't change
  // any existing button's look.
  inverse: { background: 'transparent', color: 'var(--oat)', borderColor: 'var(--oat)' },
}

const hovers = {
  primary: { background: 'var(--control-fill-hover)' },
  // Border-only before; now fills pink and flips the text/arrow to a
  // light color to stay legible against it. The arrow's own slide and
  // the whole button's proximity-scale (useProximityScale, below) are
  // separate effects on separate properties, so they keep animating
  // exactly as before — only the color hover is new.
  secondary: { background: 'var(--rose)', color: 'var(--oat)', borderColor: 'var(--rose)' },
  ghost: { opacity: 0.6 },
  // Fills cream, text flips to the brand pink — the reverse of
  // secondary's hover, for a button that starts outlined-in-cream.
  inverse: { background: 'var(--oat)', color: 'var(--rose)', borderColor: 'var(--oat)' },
}

/** Pill button. Trailing arrow badge is the brand's signature call to action. */
export function Button({
  children, variant = 'primary', size = 'md', arrow = false, icon,
  disabled = false, href, style, ...rest
}) {
  const [hot, setHot] = React.useState(false)
  const ref = useRef(null)
  useProximityScale(ref, { radius: 130, maxScale: 1.05 })
  const Tag = href ? 'a' : 'button'
  // A caller's own `style` customizes the button's *default* look (e.g.
  // Home.jsx's pink-outlined Explore buttons) — it has to be merged in
  // before the hover/disabled overrides, not after, or a caller setting
  // `color`/`background` would also freeze those properties through
  // hover, since hovers[variant] wouldn't be able to win against
  // whatever came later in this object.
  const s = {
    ...base, ...sizes[size], ...looks[variant], ...style,
    ...(hot && !disabled ? hovers[variant] : null),
    ...(disabled ? { opacity: 0.35, cursor: 'not-allowed' } : null),
  }
  return (
    <Tag
      ref={ref}
      href={href} disabled={href ? undefined : disabled} style={s}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      {...rest}
    >
      {icon ? <Icon name={icon} size={15} /> : null}
      <span>{children}</span>
      {arrow ? (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: size === 'sm' ? 20 : 24, height: size === 'sm' ? 20 : 24,
          marginRight: variant === 'ghost' ? 0 : -12,
          borderRadius: 'var(--radius-pill)',
          border: '1px solid currentColor',
          transform: hot && !disabled ? 'translateX(3px)' : 'none',
          transition: 'transform var(--dur-base) var(--ease-cloth)',
        }}>
          <Icon name="arrow-right" size={12} />
        </span>
      ) : null}
    </Tag>
  )
}
