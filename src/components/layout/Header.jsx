import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { NavList } from '../navigation/NavList.jsx'
import { IconButton } from '../core/IconButton.jsx'
import { Logo } from '../core/Logo.jsx'
import { LanguageSwitch } from '../navigation/LanguageSwitch.jsx'
import { useDirectionalHeader } from '../../hooks/useDirectionalHeader.js'
import { useLanguage } from '../../hooks/useLanguage.jsx'

// Routes are matched by key, not by label — the visible label changes with
// the language, so matching on it would break the active state in Slovak.
const NAV_ITEMS = [
  { key: 'home', to: '/' },
  { key: 'collection', to: '/collection' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
]

function activeKeyFor(pathname) {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/collection')) return 'collection'
  if (pathname.startsWith('/about')) return 'about'
  if (pathname.startsWith('/contact')) return 'contact'
  return null
}

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const activeKey = activeKeyFor(location.pathname)
  const navItems = NAV_ITEMS.map((i) => ({ ...i, label: t(`nav.${i.key}`) }))
  const active = activeKey ? t(`nav.${activeKey}`) : null
  const ref = useRef(null)
  useDirectionalHeader(ref)
  const [menuOpen, setMenuOpen] = useState(false)

  // Route change (including a tap on a link inside the mobile menu itself)
  // always closes it — otherwise it would still be open, covering the new
  // page, the moment navigation finishes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    // Lock background scroll while the full-screen panel is open.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  const handleSelect = (label) => {
    const item = navItems.find((i) => i.label === label)
    if (item) navigate(item.to)
  }

  return (
    <>
      {/* First focusable element on every page — invisible until it
          receives keyboard focus, so a sighted mouse user never sees it
          but a keyboard/screen-reader user can jump straight past the nav
          instead of tabbing through it on every single page load. Target
          is #main-content, set in Layout.jsx on the actual page-content
          wrapper (not the footer). */}
      <a href="#main-content" className="skip-link">{t('nav.skipToContent')}</a>
      <header ref={ref} style={{
        position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 20,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        padding: '28px var(--gutter) 22px',
        // Back to the plain cream page background — the pink now lives
        // only in the nav pill itself, not the whole bar.
        background: 'var(--surface-page)',
      }}>
        <Link to="/" aria-label="Niana" style={{ textDecoration: 'none', justifySelf: 'start' }}>
          <Logo variant="mark" size={16} color="var(--rose)" />
        </Link>
        <NavList
          items={navItems.map((i) => i.label)}
          active={active}
          onSelect={handleSelect}
          inverse uppercase
          className="header-nav-desktop"
          style={{
            flexDirection: 'row', gap: 'var(--space-6)',
            // A solid --rose pill on the cream header, matching the
            // brand kit's own nav reference — `inverse` (above) is what
            // gives the label text its light/oat color against it.
            background: 'var(--rose)', padding: '10px 24px', borderRadius: 'var(--radius-pill)',
          }}
        />
        {/* Right column holds only the mobile toggle (hidden on desktop).
            It stays in the grid even when empty so the 1fr/auto/1fr
            columns keep the nav optically centered. The old search and
            shopping-bag icons lived here and were removed: neither did
            what its icon implied — search jumped to the collection, and
            the bag opened Instagram rather than holding anything. */}
        {/* gridColumn: 3 is load-bearing. The columns are 1fr/auto/1fr, and
            on mobile the nav in the middle track is display:none — which
            removes it from grid flow entirely, so without an explicit
            column this div would slide up into the middle track and the
            toggle would sit dead centre instead of on the right. */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 'var(--space-5)', gridColumn: 3 }}>
          <LanguageSwitch className="header-nav-desktop" />
          <div className="header-menu-toggle" style={{ alignItems: 'center', gap: 10, background: 'var(--rose)', padding: '8px 8px 8px 18px', borderRadius: 'var(--radius-pill)' }}>
            <span style={{
              font: 'var(--type-label)', letterSpacing: 'var(--track-caps)',
              textTransform: 'uppercase', color: 'var(--oat)',
            }}>{t('nav.menu')}</span>
            <IconButton
              name="menu" variant="bare" size={40} label={t('nav.openMenu')} style={{ color: 'var(--oat)' }}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          role="dialog" aria-modal="true" aria-label="Menu"
          style={{
            position: 'fixed', inset: 0, zIndex: 30, background: 'var(--surface-page)',
            display: 'flex', flexDirection: 'column', padding: '28px var(--gutter)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <LanguageSwitch />
            <IconButton name="x" variant="bare" size={40} label={t('nav.closeMenu')} onClick={() => setMenuOpen(false)} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-7)' }}>
            <NavList
              items={navItems.map((i) => i.label)}
              active={active}
              onSelect={handleSelect}
              style={{ gap: 'var(--space-5)', font: 'var(--type-heading-2)' }}
            />
            <a
              href="https://www.instagram.com/niana.bags/" target="_blank" rel="noopener noreferrer"
              style={{ font: 'var(--type-body)', color: 'var(--text-secondary)', textDecoration: 'none', alignSelf: 'center', textAlign: 'center' }}
            >
              {t('nav.orderViaInstagram')}
            </a>
          </div>
        </div>
      ) : null}
    </>
  )
}
