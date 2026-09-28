import React from 'react'

/**
 * Image slot. Pass `src` for real photography (this build always does);
 * falls back to a striped placeholder with a label if `src` is omitted.
 * Pass `fit="contain"` for a cutout on a transparent background (the
 * product photos are full-bleed lifestyle shots, `cover` fills the frame
 * as usual; a cutout has no background to crop into, so `cover` chops the
 * bag itself at the frame's edges — `contain` letterboxes it in the tone
 * color instead, showing the whole piece).
 * Pass `priority` for above-the-fold usage (the hero) to load eagerly;
 * everything else lazy-loads — real lazy-loading, not just the attribute:
 * a photo's `src` used to also be set as this div's CSS background-image
 * as a belt-and-suspenders fallback, but a CSS background-image always
 * loads immediately regardless of viewport, which was quietly forcing
 * every photo on the page to fetch eagerly no matter what the <img>
 * below it said. Only the placeholder (no `src`) still uses a CSS
 * background — for a real photo, the tone color shows through briefly
 * until the lazy <img> itself loads in.
 */
export function MediaFrame({ src, alt = '', label = 'product shot', ratio = '4 / 5', radius = 'lg', tone = 'stone', priority = false, fit = 'cover', style, ...rest }) {
  const tones = {
    stone: { base: 'var(--stone)', stripe: 'rgba(25,23,20,0.06)', text: 'var(--ink-60)' },
    oat: { base: 'var(--surface-raised)', stripe: 'rgba(25,23,20,0.05)', text: 'var(--ink-40)' },
    ink: { base: 'var(--ink)', stripe: 'rgba(227,222,206,0.07)', text: 'var(--oat-70)' },
  }[tone]
  return (
    <div style={{
      position: 'relative', aspectRatio: ratio, overflow: 'hidden',
      borderRadius: `var(--radius-${radius})`,
      background: tones.base,
      backgroundImage: src ? 'none' : `repeating-linear-gradient(135deg, ${tones.stripe} 0 1px, transparent 1px 9px)`,
      backgroundSize: src ? undefined : 'auto',
      backgroundPosition: 'center',
      ...style,
    }} {...rest}>
      {src ? (
        <img
          src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async"
          style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }}
        />
      ) : (
        <span style={{
          position: 'absolute', left: 14, bottom: 12,
          font: '400 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace',
          letterSpacing: '0.08em', textTransform: 'lowercase', color: tones.text,
        }}>{label}</span>
      )}
    </div>
  )
}
