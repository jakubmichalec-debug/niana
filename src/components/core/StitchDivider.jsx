import React from 'react'

/** Running-stitch rule. Section separator and packaging motif — never a focal element. */
export function StitchDivider({ height = 22, opacity = 0.55, style, ...rest }) {
  return (
    <div role="separator" style={{
      height,
      backgroundImage: 'var(--stitch)',
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto 100%',
      opacity,
      ...style,
    }} {...rest} />
  )
}
