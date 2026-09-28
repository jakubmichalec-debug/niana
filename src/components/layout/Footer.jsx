import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../core/Logo.jsx'
import { StitchDivider } from '../core/StitchDivider.jsx'
import { LanguageSwitch } from '../navigation/LanguageSwitch.jsx'
import { useBounceReveal } from '../../hooks/useBounceReveal.js'
import { CONSENT_EVENT } from '../../hooks/useCookieConsent.js'
import { useLanguage } from '../../hooks/useLanguage.jsx'

// Keyed, not labelled: the query param must stay the English material
// name the data uses, while the visible text follows the language.
const SHOP_LINKS = [
  { key: 'crochet', to: '/collection?material=Crochet' },
  { key: 'leather', to: '/collection?material=Leather' },
  { key: 'denim', to: '/collection?material=Denim' },
  { key: 'custom', to: '/collection?material=Custom' },
]

// "Journal" used to live here, pointing at the newsletter block on the
// About page — there is no journal, so the link is gone until there is.
const STUDIO_LINKS = [
  { key: 'nav.about', to: '/about' },
  { key: 'nav.contact', to: '/contact' },
]

const LEGAL_LINKS = [
  { key: 'footer.privacy', to: '/privacy' },
  { key: 'footer.imprint', to: '/imprint' },
  { key: 'footer.terms', to: '/terms' },
]

export function Footer() {
  const ref = useRef(null)
  const { t } = useLanguage()
  useBounceReveal(ref)

  return (
    <footer ref={ref} style={{ background: 'var(--mauve)', color: '#fff', padding: '80px var(--gutter) 40px' }}>
      <div className="stack-on-mobile" style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 'var(--space-7)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Logo variant="mark" size={16} color="#fff" />
          <p style={{ margin: 0, font: 'var(--type-body-sm)', color: '#fff', maxWidth: '30ch' }}>
            {t('footer.blurb')}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: '#fff' }}>{t('footer.shop')}</span>
          {SHOP_LINKS.map((l) => (
            <Link key={l.key} to={l.to} style={{ font: 'var(--type-body-sm)', color: '#fff', textDecoration: 'none', opacity: 0.8 }}>{t(`collection.${l.key}`)}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: '#fff' }}>{t('footer.studio')}</span>
          {STUDIO_LINKS.map((l) => (
            <Link key={l.key} to={l.to} style={{ font: 'var(--type-body-sm)', color: '#fff', textDecoration: 'none', opacity: 0.8 }}>{t(l.key)}</Link>
          ))}
          <a href="https://www.instagram.com/niana.bags/" target="_blank" rel="noopener noreferrer" style={{ font: 'var(--type-body-sm)', color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Instagram</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: '#fff' }}>{t('footer.care')}</span>
          <span style={{ font: 'var(--type-body-sm)', color: '#fff', opacity: 0.8, maxWidth: '22ch' }}>{t('footer.careNote')}</span>
        </div>
      </div>
      <StitchDivider height={18} opacity={0.28} style={{ margin: '56px 0 22px', filter: 'invert(1)' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', font: 'var(--type-label)', letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: '#fff' }}>
        <span>Niana © 2026</span>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', alignItems: 'center' }}>
          {LEGAL_LINKS.map((l) => (
            <Link key={l.key} to={l.to} style={{ color: '#fff' }}>{t(l.key)}</Link>
          ))}
          {/* Withdrawing consent has to be as easy as giving it
              (GDPR art. 7(3)), so this reopens the banner from any page.
              An event rather than shared state: Layout owns the decision,
              and the footer is nowhere near it in the tree. */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit',
              color: '#fff',
            }}
          >
            {t('footer.cookieSettings')}
          </button>
          <LanguageSwitch inverse />
        </nav>
        <a href="https://www.instagram.com/niana.bags/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>Instagram</a>
      </div>
    </footer>
  )
}
