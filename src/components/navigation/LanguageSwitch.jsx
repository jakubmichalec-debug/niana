import React from 'react'
import { LANGUAGES } from '../../data/translations.js'
import { useLanguage } from '../../hooks/useLanguage.jsx'

/**
 * EN / NL toggle. Rendered as buttons rather than a select so the current
 * language is visible at a glance instead of hidden behind a control, and
 * each option carries its full name for screen readers while showing the
 * two-letter label.
 */
export function LanguageSwitch({ inverse = false, style, ...rest }) {
  const { lang, setLanguage } = useLanguage()
  const idle = inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)'
  const active = inverse ? 'var(--oat)' : 'var(--text-accent)'

  // ...rest so callers can pass className — the header relies on
  // .header-nav-desktop to hide this copy on phones, where the switch
  // lives inside the mobile menu instead. Without it both would show.
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...style }} {...rest}>
      {LANGUAGES.map((l, i) => {
        const current = l.code === lang
        return (
          <React.Fragment key={l.code}>
            {i > 0 ? <span aria-hidden="true" style={{ color: idle, opacity: 0.5 }}>/</span> : null}
            <button
              type="button"
              lang={l.code}
              aria-label={l.name}
              aria-current={current}
              onClick={() => setLanguage(l.code)}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase',
                color: current ? active : idle,
                transition: 'color var(--dur-base) var(--ease-cloth)',
              }}
            >
              {l.label}
            </button>
          </React.Fragment>
        )
      })}
    </div>
  )
}
