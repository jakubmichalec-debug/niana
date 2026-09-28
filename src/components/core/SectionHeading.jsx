import React from 'react'

/**
 * Eyebrow + title pair that opens every section ("About us" / "What we
 * do"). Renders an `<h2>` by default — pass `as="h1"` for the one heading
 * per page that should actually be that page's single h1 (Collection and
 * About's top-of-page headings; Home and Product set their own h1 rather
 * than using this component).
 */
export function SectionHeading({ eyebrow, title, align = 'left', size = 'md', inverse = false, as: Tag = 'h2', style, titleStyle, ...rest }) {
  const titleFont = size === 'lg' ? 'var(--type-display-2)' : size === 'sm' ? 'var(--type-heading-2)' : 'var(--type-heading-1)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', textAlign: align, ...style }} {...rest}>
      {eyebrow ? (
        <span style={{
          font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase',
          color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)',
        }}>{eyebrow}</span>
      ) : null}
      <Tag style={{
        margin: 0, font: titleFont, letterSpacing: 'var(--track-display)',
        color: inverse ? 'var(--text-on-inverse)' : 'var(--text-primary)', textWrap: 'pretty',
        ...titleStyle,
      }}>{title}</Tag>
    </div>
  )
}
