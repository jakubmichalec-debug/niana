import React from 'react'
import { SectionHeading } from '../core/SectionHeading.jsx'
import { useLanguage } from '../../hooks/useLanguage.jsx'

/** Shared shell for Privacy/Imprint/Terms — a plain, readable text page. */
export function LegalPage({ eyebrow, title, updated, breadcrumbItems, children }) {
  const { t } = useLanguage()
  return (
    <main style={{ padding: 'var(--space-7) var(--gutter) var(--section-y)' }}>
      <SectionHeading
        as="h1" eyebrow={eyebrow} title={title} size="sm"
        style={{ maxWidth: 640, marginBottom: 'var(--space-3)' }}
        titleStyle={{ fontFamily: 'var(--font-arrivals)', color: 'var(--rose)' }}
      />
      {updated ? (
        <p style={{ margin: '0 0 var(--space-7)', font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}>
          {t('legal.lastUpdated')} {updated}
        </p>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 680, font: 'var(--type-body)', color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </main>
  )
}

/** A titled block of body copy inside a LegalPage. */
export function LegalSection({ title, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <h2 style={{ margin: 0, font: 'var(--type-heading-3)', color: 'var(--text-primary)' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>{children}</div>
    </section>
  )
}
