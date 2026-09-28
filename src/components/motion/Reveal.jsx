import React, { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export function Reveal({ as: Tag = 'div', children, style, ...rest }) {
  const ref = useRef(null)
  useScrollReveal(ref)
  return (
    <Tag ref={ref} style={style} {...rest}>
      {children}
    </Tag>
  )
}
