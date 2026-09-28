import React from 'react'
import { MediaFrame } from './MediaFrame.jsx'
import { Tag } from '../core/Tag.jsx'
import { Button } from '../core/Button.jsx'

/** Product tile: soft-square media, name, price, quiet action. */
export function ProductCard({
  name = 'Untitled', price, material, image, imageLabel = 'bag, three-quarter view',
  ratio = '4 / 5', inverse = false, mediaTone, mediaFit = 'cover', mediaBackdrop = false, onSelect, style, ...rest
}) {
  const [hot, setHot] = React.useState(false)
  return (
    <article
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      onClick={onSelect}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', cursor: onSelect ? 'pointer' : 'default', ...style }}
      {...rest}
    >
      <div style={{
        position: 'relative',
        // Only the photo gets matted — the name/button row below stays on
        // whatever the card is sitting on (the New Arrivals strip uses
        // `inverse` text specifically because it expects to sit on the
        // pink band, not a cream square, so the backdrop can't extend
        // down to cover that row too).
        ...(mediaBackdrop ? { background: 'var(--oat)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' } : null),
      }}>
        <MediaFrame
          src={image} alt={imageLabel} label={imageLabel} ratio={ratio} radius="xl"
          tone={mediaTone || (inverse ? 'oat' : 'stone')}
          fit={mediaFit}
          style={{ transform: hot ? 'scale(1.012)' : 'none', transition: 'transform var(--dur-slow) var(--ease-cloth)' }}
        />
        {material ? <Tag tone="veil" style={{ position: 'absolute', top: 14, left: 14 }}>{material}</Tag> : null}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ font: 'var(--type-heading-3)', color: inverse ? 'var(--text-on-inverse)' : 'var(--text-primary)' }}>{name}</span>
          {price ? <span style={{ font: 'var(--type-body-sm)', color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)' }}>{price}</span> : null}
        </div>
        <Button variant={inverse ? 'inverse' : 'secondary'} size="sm">Learn more</Button>
      </div>
    </article>
  )
}
