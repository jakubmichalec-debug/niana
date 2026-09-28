import React, { useEffect, useRef, useState } from 'react'

/**
 * Reveals its child with a left-to-right wipe (clip-path) once, on mount.
 * Respects prefers-reduced-motion by skipping straight to revealed.
 *
 * This deliberately does NOT wait for the element to scroll into view,
 * despite that being the obvious design. Gating it on IntersectionObserver
 * deadlocks: the reveal's own starting state is clip-path inset(0 100% 0 0),
 * and this engine factors clip-path into intersection geometry, so the
 * element reports an intersection area of zero — a threshold is never met,
 * the reveal never fires, and the mark stays invisible forever. Moving the
 * observer to an unclipped parent doesn't help either, because that parent's
 * only rendered content is the clipped child, so it measures zero too. That
 * failure is silent and intermittent (a stray reflow can knock it loose),
 * which makes it especially nasty. The logo is on screen at load anyway, so
 * scroll-gating bought nothing; the footer's copy simply arrives already
 * revealed, which nobody can tell apart from a wipe they never watched.
 */
function useRevealOnMount() {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setRevealed(true); return undefined }
    // Two frames, not one: the first lets the clipped starting state paint,
    // the second flips it. Setting both within a single frame would skip
    // the transition and pop straight to revealed.
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setRevealed(true))
    })
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second) }
  }, [])

  return [ref, revealed]
}

/**
 * The Niana identity. "mark" is the brand's logo mark: capital N and A
 * set in WindSong as two separate letters, A dropped slightly below the
 * baseline (wiped in left to right on its first appearance). "wordmark"
 * is NIANA in tracked caps, "lockup" stacks the two. Clear space =
 * height of the N on every side.
 */
export function Logo({ variant = 'wordmark', size = 20, color = 'currentColor', style, ...rest }) {
  const [revealRef, revealed] = useRevealOnMount()

  const caps = {
    font: `var(--weight-medium) ${size}px/1 var(--font-sans)`,
    letterSpacing: 'var(--track-caps)',
    textTransform: 'uppercase',
    color,
    paddingLeft: '0.2em',
  }
  const mark = {
    font: `400 ${size * 2.4}px/0.8 var(--font-mark)`,
    color,
    display: 'inline-block',
    padding: `${size * 0.8}px ${size}px`,
  }
  const wipe = {
    display: 'inline-block',
    clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
    transition: 'clip-path 0.9s cubic-bezier(.5,.05,.25,1)',
  }
  // The A: a separate letter, not tucked under the N's arm — just
  // dropped a touch below the baseline, no rotation.
  const dropA = { display: 'inline-block', transform: 'translateY(0.21em)' }

  if (variant === 'mark') {
    return (
      <span ref={revealRef} aria-label="Niana" style={{ display: 'inline-block', ...style }} {...rest}>
        <span style={wipe}>
          <span style={mark}>N<span style={dropA}>A</span></span>
        </span>
      </span>
    )
  }
  if (variant === 'wordmark') return <span aria-label="Niana" style={{ ...caps, ...style }} {...rest}>Niana</span>
  return (
    <span aria-label="Niana" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.35, ...style }} {...rest}>
      <span ref={revealRef} style={{ display: 'inline-block' }}>
        <span style={wipe}>
          <span style={mark}>N<span style={dropA}>A</span></span>
        </span>
      </span>
      <span style={{ ...caps, fontSize: size * 0.6 }}>Niana</span>
    </span>
  )
}
