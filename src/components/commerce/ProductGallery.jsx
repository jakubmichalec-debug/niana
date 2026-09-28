import React, { useState } from 'react'
import { MediaFrame } from './MediaFrame.jsx'
import { Icon } from '../core/Icon.jsx'
import { useLanguage } from '../../hooks/useLanguage.jsx'

/** Prev/next arrow over the photo — quiet until you reach for it. */
function GalleryArrow({ side, onClick, label }) {
  const [hot, setHot] = useState(false)
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      style={{
        position: 'absolute', top: '50%', [side]: 14, transform: 'translateY(-50%)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, borderRadius: 'var(--radius-pill)',
        background: 'var(--surface-page)', color: 'var(--text-primary)',
        border: 'none', padding: 0, cursor: 'pointer',
        opacity: hot ? 1 : 0.4,
        transition: 'opacity var(--dur-fast) linear',
      }}
    >
      <Icon name={side === 'left' ? 'chevron-left' : 'chevron-right'} size={18} />
    </button>
  )
}

/**
 * Single large photo with prev/next arrows and a thumbnail strip — for a
 * one-of-one piece sold as seen, every angle of the actual item matters
 * more than a swatch grid of purchase options ever would.
 */
export function ProductGallery({ images, ratio = '4 / 5' }) {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const count = images.length
  const go = (delta) => setIndex((i) => (i + delta + count) % count)
  const current = images[index]
  // Same "never taller than ~67vh" cap as before, re-expressed as an
  // equivalent WIDTH (this ratio's width-per-unit-height, times the old
  // height cap) — see the box's own comment below for why.
  const [ratioW, ratioH] = ratio.split('/').map((n) => parseFloat(n))
  const widthPerHeight = ratioW / ratioH

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* Width-first, not height-first. This used to set an explicit
          height (min(67.2vh,672px)) and let aspect-ratio derive width
          from it, with maxWidth:100% meant to re-clamp that back down —
          but a definite height always wins the aspect-ratio calculation,
          so on a tall-but-narrow phone (large vh, small real width) the
          derived width routinely came out WIDER than the actual screen,
          and maxWidth:100% never got a real chance to shrink it back:
          the box measurably rendered wider than <main> itself. Putting
          the container's real width (100%) in the same min() as the
          vh-equivalent and px caps — as peers, not a fixed height's
          loser — means it can never exceed the screen, on any phone. */}
      <div style={{
        position: 'relative', display: 'inline-block', alignSelf: 'center',
        width: `min(100%, ${widthPerHeight * 67.2}vh, ${widthPerHeight * 672}px)`,
        aspectRatio: ratio,
      }}>
        <MediaFrame
          src={current.src} alt={current.label} ratio={ratio} radius="xl"
          // Image 0 is always the cutout-on-transparent cover shot (see
          // products.js) — contain, not cover, so the crop never chops the
          // bag at the frame's edge; the real photos after it fill the
          // frame as usual.
          fit={index === 0 ? 'contain' : 'cover'}
          style={{ width: '100%', height: '100%' }}
        />
        {count > 1 ? (
          <>
            <GalleryArrow side="left" label={t('product.previousPhoto')} onClick={() => go(-1)} />
            <GalleryArrow side="right" label={t('product.nextPhoto')} onClick={() => go(1)} />
          </>
        ) : null}
      </div>
      {count > 1 ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${count}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              style={{
                width: 56, height: 56, flex: '0 0 auto', padding: 0, cursor: 'pointer',
                borderRadius: 'var(--radius-md)', overflow: 'hidden',
                border: i === index ? '2px solid var(--ink)' : '2px solid transparent',
                opacity: i === index ? 1 : 0.55,
                transition: 'opacity var(--dur-fast) linear, border-color var(--dur-base) var(--ease-cloth)',
              }}
            >
              <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: i === 0 ? 'contain' : 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
