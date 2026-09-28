import { LegalPage, LegalSection } from '../components/layout/LegalPage.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { breadcrumbJsonLd } from '../components/navigation/Breadcrumbs.jsx'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { OPERATOR } from '../data/site.js'

const link = { color: 'var(--text-accent)' }

function TermsEn() {
  return (
    <>
      <LegalSection title="What this site is">
        <p>
          This website is a catalogue showing Niana's handmade pieces, it does not process payments or place
          orders itself. Every piece shown is already made, one of one, and sold as seen: what you see in the
          photos is the actual, specific item, not a sample or a customizable template.
        </p>
      </LegalSection>

      <LegalSection title="How a purchase works">
        <p>
          To ask about or buy a piece, you contact Niana directly, by Instagram DM (
          <a href={OPERATOR.instagram} target="_blank" rel="noopener noreferrer" style={link}>@niana.bags</a>
          ) or email. Any resulting sale, price, payment, shipping, and any right of withdrawal or return, is
          agreed directly between you and {OPERATOR.name} at that time, on whichever platform you use to arrange
          it; it is a separate agreement from, and isn't governed by, these website terms.
        </p>
      </LegalSection>

      <LegalSection title="Content and ownership">
        <p>
          The photos, text, and design on this site belong to {OPERATOR.name} unless stated otherwise. You're
          welcome to link to this site or share a page as-is; please don't reproduce the photos or copy the
          written content elsewhere without asking first.
        </p>
      </LegalSection>

      <LegalSection title="No guarantee the site is always up">
        <p>
          This site is provided as-is. Reasonable care is taken to keep it accurate and available, but there's no
          guarantee it will be online or error-free at every moment, and liability for its use is limited to what
          the law of Slovakia allows.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>These terms are governed by the law of Slovakia.</p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>
        </p>
      </LegalSection>
    </>
  )
}

function TermsSk() {
  return (
    <>
      <LegalSection title="Čo je táto stránka">
        <p>
          Táto webová stránka je katalóg, ktorý zobrazuje ručne robené kúsky značky Niana, nespracúva platby ani
          sama nezadáva objednávky. Každý zobrazený kúsok je už hotový, jedinečný, a predáva sa presne tak, ako je
          na fotke: to, čo vidíte na fotografiách, je skutočný, konkrétny kus, nie vzorka ani upraviteľná šablóna.
        </p>
      </LegalSection>

      <LegalSection title="Ako prebieha nákup">
        <p>
          Ak sa chcete na kúsok opýtať alebo si ho kúpiť, kontaktujete Nianu priamo, správou na Instagrame (
          <a href={OPERATOR.instagram} target="_blank" rel="noopener noreferrer" style={link}>@niana.bags</a>
          ) alebo e-mailom. Prípadný následný predaj, cena, platba, doprava a prípadné právo na odstúpenie alebo
          vrátenie, sa dohodne priamo medzi vami a {OPERATOR.name} v danom momente, na platforme, ktorú na to
          použijete; ide o samostatnú dohodu, ktorá sa neriadi týmito podmienkami používania.
        </p>
      </LegalSection>

      <LegalSection title="Obsah a vlastníctvo">
        <p>
          Fotografie, texty a dizajn tejto stránky patria {OPERATOR.name}, pokiaľ nie je uvedené inak. Na túto
          stránku môžete voľne odkazovať alebo zdieľať jej stránku v pôvodnej podobe; fotografie prosím
          nereprodukujte ani text nekopírujte inam bez toho, aby ste sa najprv opýtali.
        </p>
      </LegalSection>

      <LegalSection title="Bez záruky nepretržitej dostupnosti">
        <p>
          Táto stránka sa poskytuje tak, ako je. Vynakladá sa primeraná starostlivosť na jej presnosť a
          dostupnosť, no nezaručuje sa, že bude vždy dostupná online alebo bezchybná, a zodpovednosť za jej
          používanie je obmedzená v rozsahu, ktorý dovoľuje slovenské právo.
        </p>
      </LegalSection>

      <LegalSection title="Rozhodné právo">
        <p>Tieto podmienky sa riadia slovenským právom.</p>
      </LegalSection>

      <LegalSection title="Otázky">
        <p>
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>
        </p>
      </LegalSection>
    </>
  )
}

export default function Terms() {
  const { lang, t } = useLanguage()
  const crumbs = [{ label: t('nav.home'), to: '/' }, { label: t('legal.termsTitle') }]

  useSeo({
    title: t('legal.termsTitle'),
    description: t('legal.termsDesc'),
    path: '/terms',
    jsonLd: breadcrumbJsonLd(crumbs),
  })

  return (
    <LegalPage
      eyebrow={t('legal.eyebrow')}
      title={t('legal.termsTitle')}
      updated={t('legal.termsUpdated')}
      breadcrumbItems={crumbs}
    >
      {lang === 'sk' ? <TermsSk /> : <TermsEn />}
    </LegalPage>
  )
}
