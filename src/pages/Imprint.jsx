import { LegalPage, LegalSection } from '../components/layout/LegalPage.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { breadcrumbJsonLd } from '../components/navigation/Breadcrumbs.jsx'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { OPERATOR } from '../data/site.js'

const link = { color: 'var(--text-accent)' }

function ImprintEn() {
  return (
    <>
      <LegalSection title="Operator">
        <p style={{ margin: 0 }}>{OPERATOR.name}</p>
        <p style={{ margin: 0 }}>{OPERATOR.locality}, {OPERATOR.country}</p>
        <p style={{ margin: 0 }}>
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>
        </p>
      </LegalSection>

      <LegalSection title="Activity">
        <p>
          Niana is a small handmade-bags studio operated by {OPERATOR.name} as an individual, working between
          Slovakia and Belgium. Pieces are made by hand in small numbers; each one shown on this site is already
          made and sold as seen. Orders are arranged directly via Instagram or email, not through this website.
        </p>
      </LegalSection>

      <LegalSection title="Responsible for content">
        <p>{OPERATOR.name} is responsible for the content published on this website.</p>
      </LegalSection>
    </>
  )
}

function ImprintSk() {
  return (
    <>
      <LegalSection title="Prevádzkovateľ">
        <p style={{ margin: 0 }}>{OPERATOR.name}</p>
        <p style={{ margin: 0 }}>{OPERATOR.locality}, Slovensko</p>
        <p style={{ margin: 0 }}>
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>
        </p>
      </LegalSection>

      <LegalSection title="Činnosť">
        <p>
          Niana je malý ateliér ručne robených tašiek, ktorý ako fyzická osoba prevádzkuje {OPERATOR.name},
          pôsobiaci medzi Slovenskom a Belgickom. Kúsky sa vyrábajú ručne v malých počtoch; každý kúsok zobrazený
          na tejto stránke je už hotový a predáva sa presne tak, ako je na fotke. Objednávky sa dohadujú priamo
          cez Instagram alebo e-mail, nie prostredníctvom tejto webovej stránky.
        </p>
      </LegalSection>

      <LegalSection title="Zodpovednosť za obsah">
        <p>Za obsah zverejnený na tejto webovej stránke zodpovedá {OPERATOR.name}.</p>
      </LegalSection>
    </>
  )
}

export default function Imprint() {
  const { lang, t } = useLanguage()
  const crumbs = [{ label: t('nav.home'), to: '/' }, { label: t('legal.imprintTitle') }]

  useSeo({
    title: t('legal.imprintTitle'),
    description: `${t('legal.imprintDesc')} ${OPERATOR.name}, ${OPERATOR.locality}.`,
    path: '/imprint',
    jsonLd: breadcrumbJsonLd(crumbs),
  })

  return (
    <LegalPage eyebrow={t('legal.eyebrow')} title={t('legal.imprintTitle')} breadcrumbItems={crumbs}>
      {lang === 'sk' ? <ImprintSk /> : <ImprintEn />}
    </LegalPage>
  )
}
