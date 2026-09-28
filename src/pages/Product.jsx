import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ProductGallery } from '../components/commerce/ProductGallery.jsx'
import { Tag } from '../components/core/Tag.jsx'
import { Button } from '../components/core/Button.jsx'
import { StitchDivider } from '../components/core/StitchDivider.jsx'
import { Dialog } from '../components/feedback/Dialog.jsx'
import { Reveal } from '../components/motion/Reveal.jsx'
import { breadcrumbJsonLd } from '../components/navigation/Breadcrumbs.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { SITE_URL, SITE_NAME } from '../data/site.js'
import { getProduct, getProductText, INSTAGRAM_URL } from '../data/products.js'

export default function Product() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { t, lang } = useLanguage()
  const [care, setCare] = useState(false)
  const description = product ? getProductText(product.description, lang) : ''
  const careText = product ? getProductText(product.care, lang) : ''

  useSeo(
    product
      ? {
        title: product.name,
        description: `${description} One of one, ${product.material.toLowerCase()}, sold as seen, message @niana.bags to ask about it.`,
        path: `/collection/${product.slug}`,
        image: product.images[0]?.src,
        type: 'product',
        jsonLd: [
          breadcrumbJsonLd([{ label: 'Home', to: '/' }, { label: 'Collection', to: '/collection' }, { label: product.name }]),
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description,
            image: `${SITE_URL}${product.images[0]?.src}`,
            sku: product.slug,
            category: product.material,
            brand: { '@type': 'Brand', name: SITE_NAME },
          },
        ],
      }
      : { title: 'Piece not found', description: 'This piece could not be found, it may have sold or moved.', path: `/collection/${slug || ''}` }
  )

  if (!product) {
    return (
      <main style={{ padding: 'var(--space-7) var(--gutter) var(--section-y)' }}>
        <p style={{ font: 'var(--type-body)' }}>
          {t('product.notFound')}{' '}
          <Link to="/collection">{t('product.backToCollection')}</Link>.
        </p>
      </main>
    )
  }

  const images = product.images

  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Collection', to: '/collection' }, { label: product.name }]

  return (
    <main style={{ padding: 'var(--space-6) var(--gutter) var(--section-y)', position: 'relative' }}>
      <Reveal className="stack-on-mobile" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'var(--space-8)' }}>
        <ProductGallery images={images} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start', paddingTop: 'var(--space-4)' }}>
          <Tag tone="outline">{product.material}</Tag>
          <h1 style={{ margin: 0, font: 'var(--type-display-2)', fontFamily: 'var(--font-arrivals)', letterSpacing: 'var(--track-display)', color: 'var(--rose)' }}>{product.name}</h1>
          <span style={{ font: 'var(--type-heading-3)', color: 'var(--text-secondary)' }}>{t('product.onePiece')}</span>
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-secondary)', maxWidth: '42ch', textWrap: 'pretty' }}>
            {description}
          </p>
          <StitchDivider height={16} style={{ alignSelf: 'stretch' }} />
          {/* wrap: two lg buttons (the Slovak label especially — "Máte
              záujem? Napíšte nám" is long) are wider than a narrow phone
              screen; this column isn't centered like NotFound's is, so it
              wouldn't bleed evenly past both edges, but it would still
              force the page wider than the viewport without a wrap. */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            <Button
              variant="primary" size="lg" arrow
              onClick={() => window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer')}
            >
              {t('product.interested')}
            </Button>
            <Button variant="secondary" size="lg" onClick={() => setCare(true)}>{t('product.care')}</Button>
          </div>
        </div>
      </Reveal>
      <Dialog open={care} title={t('product.care')} width={420} onClose={() => setCare(false)} footer={<Button size="sm" onClick={() => setCare(false)}>{t('product.gotIt')}</Button>}>
        {careText}
      </Dialog>
    </main>
  )
}
