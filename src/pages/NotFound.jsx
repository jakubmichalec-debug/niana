import { useNavigate } from 'react-router-dom'
import { Button } from '../components/core/Button.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function NotFound() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  useSeo({
    title: 'Page not found',
    description: "The page you're looking for doesn't exist, it may have moved or the link may be wrong.",
    path: '/404',
  })

  return (
    <main style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 'var(--space-5)', padding: 'var(--space-7) var(--gutter)', textAlign: 'center',
    }}>
      <span style={{ font: '400 clamp(64px, 12vw, 140px)/1 var(--font-arrivals)', color: 'var(--rose)', letterSpacing: 'var(--track-display)' }}>404</span>
      <h1 style={{ margin: 0, font: 'var(--type-heading-1)', fontFamily: 'var(--font-arrivals)', letterSpacing: 'var(--track-display)', color: 'var(--rose)' }}>{t('notFound.title')}</h1>
      <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', maxWidth: '42ch' }}>
        {t('notFound.body')}
      </p>
      {/* wrap + center: two lg buttons side by side are wider than a phone
          screen, and the parent's alignItems:center would otherwise bleed
          the overflow evenly past both edges rather than wrapping it */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
        <Button variant="primary" size="lg" arrow onClick={() => navigate('/')}>{t('notFound.backHome')}</Button>
        <Button variant="secondary" size="lg" onClick={() => navigate('/collection')}>{t('notFound.seeCollection')}</Button>
      </div>
    </main>
  )
}
