import React from 'react'

const CDN = 'https://unpkg.com/lucide-static@0.414.0/icons/'

/** Lucide icon rendered as a currentColor mask so it inherits text color. */
export function Icon({ name = 'arrow-right', size = 18, strokeWidth, style, ...rest }) {
  const url = `url("${CDN}${name}.svg")`
  return (
    <span
      aria-hidden="true"
      {...rest}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flex: '0 0 auto',
        background: 'currentColor',
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...style,
      }}
    />
  )
}
