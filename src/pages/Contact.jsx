import { LegalPage, LegalSection } from '../components/layout/LegalPage.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { breadcrumbJsonLd } from '../components/navigation/Breadcrumbs.jsx'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { OPERATOR } from '../data/site.js'

const link = { color: 'var(--text-accent)' }

function ContactEn() {
  return (
    <>
      <LegalSection title="Ask about a piece">
        <p>
          Every bag on this site is one of one and already made, so the quickest way to claim one is simply to
          say which piece you mean. Instagram DM is usually fastest; email works just as well if you'd rather not
          use Instagram.
        </p>
      </LegalSection>

      <LegalSection title="Email">
        <p style={{ margin: 0 }}>
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>
        </p>
      </LegalSection>

      <LegalSection title="Instagram">
        <p style={{ margin: 0 }}>
          <a href={OPERATOR.instagram} target="_blank" rel="noopener noreferrer" style={link}>@niana.bags</a>
        </p>
      </LegalSection>

      <LegalSection title="Where we are">
        <p style={{ margin: 0 }}>
          {OPERATOR.locality}, {OPERATOR.country}, the studio works between Slovakia and Belgium.
        </p>
      </LegalSection>
    </>
  )
}

function ContactSk() {
  return (
    <>
      <LegalSection title="Spýtajte sa na kúsok">
        <p>
          Každá taška na tejto stránke je jedinečná a už hotová, najrýchlejší spôsob, ako si ju zabezpečiť, je
          jednoducho napísať, o ktorý kúsok máte záujem. Najrýchlejšia je zvyčajne správa na Instagrame; rovnako
          dobre funguje aj e-mail, ak Instagram nechcete používať.
        </p>
      </LegalSection>

      <LegalSection title="E-mail">
        <p style={{ margin: 0 }}>
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>
        </p>
      </LegalSection>

      <LegalSection title="Instagram">
        <p style={{ margin: 0 }}>
          <a href={OPERATOR.instagram} target="_blank" rel="noopener noreferrer" style={link}>@niana.bags</a>
        </p>
      </LegalSection>

      <LegalSection title="Kde nás nájdete">
        <p style={{ margin: 0 }}>
          {OPERATOR.locality}, Slovensko, ateliér pôsobí medzi Slovenskom a Belgickom.
        </p>
      </LegalSection>
    </>
  )
}

export default function Contact() {
  const { lang, t } = useLanguage()
  const crumbs = [{ label: t('nav.home'), to: '/' }, { label: t('nav.contact') }]

  useSeo({
    title: t('legal.contactTitle'),
    description: t('legal.contactDesc'),
    path: '/contact',
    jsonLd: breadcrumbJsonLd(crumbs),
  })

  return (
    <LegalPage eyebrow={t('legal.contactEyebrow')} title={t('legal.contactTitle')} breadcrumbItems={crumbs}>
      {lang === 'sk' ? <ContactSk /> : <ContactEn />}
    </LegalPage>
  )
}
