import { useState } from 'react'
import { SectionHeading } from '../components/core/SectionHeading.jsx'
import { MediaFrame } from '../components/commerce/MediaFrame.jsx'
import { StitchDivider } from '../components/core/StitchDivider.jsx'
import { Button } from '../components/core/Button.jsx'
import { Input } from '../components/forms/Input.jsx'
import { Tag } from '../components/core/Tag.jsx'
import { Toast } from '../components/feedback/Toast.jsx'
import { Reveal } from '../components/motion/Reveal.jsx'
import { breadcrumbJsonLd } from '../components/navigation/Breadcrumbs.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { NEWSLETTER_ENDPOINT, OPERATOR } from '../data/site.js'

const CRUMBS = [{ label: 'Home', to: '/' }, { label: 'About' }]

// The three process steps moved into data/translations.js (about.steps)
// so they exist in both languages; nothing reads a local copy any more.

export default function About() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  // Only runs when a provider is actually configured (see
  // NEWSLETTER_ENDPOINT in data/site.js) — this used to accept an address,
  // throw it away, and thank you for it.
  //
  // NOTE when wiring this up: the CSP in public/_headers and vercel.json
  // sets connect-src 'self', which will block this POST to a third-party
  // provider. Add that provider's origin to connect-src at the same time.
  const handleSignUp = async () => {
    if (!email || !NEWSLETTER_ENDPOINT) return
    setStatus('sending')
    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email }),
      })
      if (!response.ok) throw new Error(`Signup failed: ${response.status}`)
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  useSeo({
    title: 'About',
    description: 'Niana is a two-country studio, crochet, leather, and denim bags worked by hand in small batches between Slovakia and Belgium.',
    path: '/about',
    jsonLd: breadcrumbJsonLd(CRUMBS),
  })

  return (
    <main>
      <Reveal as="section" style={{ padding: 'var(--space-7) var(--gutter) 0' }}>
        <SectionHeading
          as="h1" eyebrow={t('about.eyebrow')} title={t('about.title')} size="lg"
          style={{ maxWidth: 620 }}
          titleStyle={{ fontFamily: 'var(--font-arrivals)', color: 'var(--rose)' }}
        />
      </Reveal>
      <Reveal as="section" className="stack-on-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', padding: 'var(--section-y) var(--gutter)' }}>
        <MediaFrame className="about-studio-photo" src="/images/about-studio.jpg" alt="Niana denim piece, wide" ratio="4 / 5" radius="xl" style={{ width: '80%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', justifyContent: 'center' }}>
          <p style={{ margin: 0, font: 'var(--type-heading-2)', letterSpacing: 'var(--track-display)', textWrap: 'pretty' }}>
            {t('about.lead')}
          </p>
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', textWrap: 'pretty' }}>
            {t('about.body')}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Tag tone="outline">Crochet</Tag><Tag tone="outline">Leather</Tag><Tag tone="outline">Denim</Tag>
          </div>
        </div>
      </Reveal>
      <Reveal as="section" className="stack-on-mobile" style={{ background: 'var(--surface-band)', padding: 'var(--band-y) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-7)' }}>
        {t('about.steps').map(([n, title, d]) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ font: '300 40px/1 var(--font-sans)', letterSpacing: 'var(--track-display)', color: 'var(--ink-40)' }}>{n}</span>
            <span style={{ font: 'var(--type-heading-3)' }}>{title}</span>
            <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-secondary)' }}>{d}</span>
          </div>
        ))}
      </Reveal>
      <Reveal as="section" id="newsletter" className="stack-on-mobile" style={{ padding: 'var(--section-y) var(--gutter)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <SectionHeading
            eyebrow={t('about.newsletterEyebrow')} title={t('about.newsletterTitle')} size="sm"
            titleStyle={{ fontFamily: 'var(--font-arrivals)', color: 'var(--rose)' }}
          />
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', maxWidth: '42ch' }}>
            {t('about.newsletterBody')}
          </p>
        </div>
        {NEWSLETTER_ENDPOINT ? (
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-end' }}>
            <Input label={t('about.emailLabel')} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1 }} />
            <Button variant="primary" arrow onClick={handleSignUp} disabled={status === 'sending'}>
              {status === 'sending' ? t('about.sending') : t('about.signUp')}
            </Button>
          </div>
        ) : (
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', maxWidth: '42ch' }}>
            {t('about.newsletterOff')}{' '}
            <a href={`mailto:${OPERATOR.email}`} style={{ color: 'var(--text-accent)' }}>{OPERATOR.email}</a>
            {' '}{t('about.newsletterOffTail')}
          </p>
        )}
      </Reveal>
      <StitchDivider height={18} style={{ margin: '0 var(--gutter) var(--space-8)' }} />
      {status === 'done' || status === 'error' ? (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 60 }}>
          <Toast onClose={() => setStatus('idle')}>
            {status === 'done' ? t('about.signupThanks') : t('about.signupError')}
          </Toast>
        </div>
      ) : null}
    </main>
  )
}
