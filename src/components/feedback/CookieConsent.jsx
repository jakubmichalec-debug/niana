import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../core/Button.jsx'
import { useLanguage } from '../../hooks/useLanguage.jsx'

/**
 * Opt-in cookie banner. Shown only while no decision is on record.
 *
 * Two things here are compliance, not styling, and shouldn't be "tidied"
 * away: Accept and Decline are given equal visual weight (nudging people
 * toward Accept with a loud button and a whispered link is a dark
 * pattern and invalidates the consent), and there is no dismiss X —
 * closing a banner is not consent, so the only ways out are an explicit
 * yes or an explicit no. Analytics stays unloaded until "Accept".
 */
export function CookieConsent({ onDecide }) {
  const { t } = useLanguage()
  return (
    <div
      role="dialog" aria-modal="false" aria-label={t('cookies.dialogLabel')}
      style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 80,
        background: 'var(--ink)', color: 'var(--text-on-inverse)',
        padding: 'var(--space-5) var(--gutter)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: 'var(--space-5)',
      }}
    >
      <p style={{ margin: 0, font: 'var(--type-body-sm)', color: 'var(--oat)', maxWidth: '60ch', textWrap: 'pretty' }}>
        {t('cookies.body')}{' '}
        <Link to="/privacy" style={{ color: 'var(--oat)', textDecoration: 'underline' }}>{t('cookies.privacyPolicy')}</Link>
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0 }}>
        <Button variant="inverse" size="sm" onClick={() => onDecide('granted')}>{t('cookies.accept')}</Button>
        <Button variant="inverse" size="sm" onClick={() => onDecide('denied')}>{t('cookies.decline')}</Button>
      </div>
    </div>
  )
}
