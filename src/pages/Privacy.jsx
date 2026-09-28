import { LegalPage, LegalSection } from '../components/layout/LegalPage.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { breadcrumbJsonLd } from '../components/navigation/Breadcrumbs.jsx'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { OPERATOR } from '../data/site.js'

const link = { color: 'var(--text-accent)' }
const listStyle = { margin: 0, paddingLeft: '1.2em', display: 'flex', flexDirection: 'column', gap: 6 }

function PrivacyEn() {
  return (
    <>
      <LegalSection title="Who this is">
        <p>
          Niana is run by {OPERATOR.name}, an individual maker based in {OPERATOR.locality}, {OPERATOR.country}.
          For anything to do with this policy or your personal data, contact{' '}
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="What this website does">
        <p>
          This site is a catalogue of handmade, one-of-one pieces. It does not have user accounts, an online
          checkout, or on-site payment processing. Every piece shown is sold as seen; to ask about or arrange a
          purchase, you contact Niana directly on Instagram (
          <a href={OPERATOR.instagram} target="_blank" rel="noopener noreferrer" style={link}>@niana.bags</a>
          ) or by email, a separate step, outside this website, where Instagram's or your email provider's own
          privacy terms apply to that conversation.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and analytics">
        <p>
          This site uses one optional thing: analytics cookies, to count visits so we know whether anyone is
          finding the site at all. Nothing else, no advertising cookies, no profiling, and nothing that follows
          you to other websites.
        </p>
        <p>
          They are strictly opt-in. When you first arrive you are asked, and until you choose <em>Accept</em> no
          analytics script is loaded and no analytics cookie is written. Choosing <em>Decline</em> keeps it that
          way, and the site works exactly the same either way.
        </p>
        <p>
          If you do accept, we use Google Analytics, which sets cookies to recognise a returning browser and
          records things like which pages were viewed, rough location by country, and the type of device and
          browser. IP addresses are anonymised. We never use it to identify you personally, and the data is not
          sold or shared for advertising.
        </p>
        <p>
          You can change your mind at any time, <strong>Cookie settings</strong> at the bottom of any page
          reopens the choice, and declining clears the analytics cookies this site can reach.
        </p>
      </LegalSection>

      <LegalSection title="Fonts and other assets">
        <p>
          The typefaces used on this site are hosted on this site's own server, not fetched from a third-party
          font service, so loading a page here does not send your IP address to a font provider.
        </p>
      </LegalSection>

      <LegalSection title="Technical logs">
        <p>
          Like effectively any website, the server or hosting platform that serves these pages keeps standard
          access logs (IP address, browser/device type, timestamp, requested page) for security and reliability,
          this is infrastructure-level logging by the hosting provider, not something this site collects,
          analyses, or uses for tracking or profiling.
        </p>
      </LegalSection>

      <LegalSection title="If you contact us">
        <p>
          If you email or message Niana, to ask about a piece, arrange a purchase, or anything else, the
          information you share (your name, contact details, delivery address if a sale goes ahead, and the
          content of your message) is used only to reply to you and, where relevant, to complete that order. It
          is not sold, and is not shared with anyone beyond what a sale itself requires (for example, a courier,
          if a piece is shipped). It is kept only for as long as needed to answer your inquiry or fulfil an order,
          plus any period Slovak law requires records of a sale to be kept.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>Under the GDPR, you can ask to:</p>
        <ul style={listStyle}>
          <li>see what personal data is held about you (access)</li>
          <li>have inaccurate data corrected (rectification)</li>
          <li>have your data deleted (erasure)</li>
          <li>have processing restricted, or object to it</li>
          <li>receive your data in a portable format</li>
        </ul>
        <p>
          To use any of these, email <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>.
          You can also lodge a complaint with Slovakia's data protection authority, the Úrad na ochranu osobných
          údajov Slovenskej republiky (dataprotection.gov.sk), or with the supervisory authority in your own
          country of residence.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If what this site collects or how it's used changes, this page will be updated and the date at the top
          revised accordingly.
        </p>
      </LegalSection>
    </>
  )
}

function PrivacySk() {
  return (
    <>
      <LegalSection title="Kto toto prevádzkuje">
        <p>
          Nianu vedie {OPERATOR.name}, individuálna tvorkyňa so sídlom v {OPERATOR.locality}, Slovensko.
          Ohľadom čohokoľvek, čo sa týka týchto zásad alebo vašich osobných údajov, napíšte na{' '}
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Čo táto webová stránka robí">
        <p>
          Táto stránka je katalóg ručne robených, jedinečných kúskov. Nemá používateľské účty, online pokladňu
          ani spracovanie platieb priamo na stránke. Každý zobrazený kúsok sa predáva presne tak, ako je na
          fotke; ak sa chcete na kúsok opýtať alebo dohodnúť kúpu, kontaktujete Nianu priamo cez Instagram (
          <a href={OPERATOR.instagram} target="_blank" rel="noopener noreferrer" style={link}>@niana.bags</a>
          ) alebo e-mailom, samostatný krok mimo tejto webovej stránky, na ktorý sa vzťahujú zásady ochrany
          súkromia Instagramu alebo vášho vlastného e-mailového poskytovateľa.
        </p>
      </LegalSection>

      <LegalSection title="Cookies a analytika">
        <p>
          Táto stránka používa jednu voliteľnú vec: analytické cookies, na počítanie návštev, aby sme vedeli, či
          stránku vôbec niekto nájde. Nič iné, žiadne reklamné cookies, žiadne profilovanie a nič, čo by vás
          sledovalo na iných webových stránkach.
        </p>
        <p>
          Sú prísne opt-in. Pri prvej návšteve sa vás na to opýtame, a kým nezvolíte <em>Prijať</em>, nenačíta sa
          žiadny analytický skript ani sa neuloží žiadny analytický cookie. Ak zvolíte <em>Odmietnuť</em>, ostane
          to tak, a stránka funguje v oboch prípadoch úplne rovnako.
        </p>
        <p>
          Ak prijmete, používame Google Analytics. Ten ukladá cookies na rozpoznanie opakovaného prehliadača a
          zaznamenáva veci ako to, ktoré stránky boli zobrazené, približnú polohu na úrovni krajiny a typ
          zariadenia a prehliadača. IP adresy sú anonymizované. Nikdy to nepoužívame na vašu osobnú identifikáciu
          a údaje sa nepredávajú ani nezdieľajú na reklamné účely.
        </p>
        <p>
          Svoje rozhodnutie môžete kedykoľvek zmeniť, <strong>Nastavenia cookies</strong> v päte každej stránky
          znovu otvorí voľbu, a odmietnutie vymaže analytické cookies, ku ktorým má táto stránka prístup.
        </p>
      </LegalSection>

      <LegalSection title="Písma a iné súbory">
        <p>
          Písma použité na tejto stránke sú uložené na vlastnom serveri stránky a nenačítavajú sa z externej
          služby na písma, načítanie stránky teda neposiela vašu IP adresu žiadnemu poskytovateľovi písiem.
        </p>
      </LegalSection>

      <LegalSection title="Technické záznamy">
        <p>
          Ako prakticky každá webová stránka, aj server alebo hostingová platforma, ktorá tieto stránky poskytuje,
          uchováva štandardné prístupové záznamy (IP adresa, typ prehliadača a zariadenia, čas, požadovaná
          stránka) kvôli bezpečnosti a spoľahlivosti. Ide o logovanie na úrovni infraštruktúry zo strany
          poskytovateľa hostingu, nie o niečo, čo táto stránka sama zbiera, analyzuje alebo používa na sledovanie
          či profilovanie.
        </p>
      </LegalSection>

      <LegalSection title="Ak nás kontaktujete">
        <p>
          Ak napíšete Niane e-mail alebo správu, aby ste sa opýtali na kúsok, dohodli kúpu alebo z iného dôvodu
         , informácie, ktoré nám poskytnete (vaše meno, kontaktné údaje, dodacia adresa, ak dôjde k predaju, a
          obsah vašej správy), sa použijú len na to, aby sme vám odpovedali a prípadne vybavili danú objednávku.
          Nepredávajú sa a nezdieľajú s nikým iným, než vyžaduje samotný predaj (napríklad s kuriérom, ak sa kúsok
          posiela). Neuchovávajú sa dlhšie, než je potrebné na zodpovedanie vašej otázky alebo vybavenie
          objednávky, plus obdobie, ktoré slovenský zákon vyžaduje pre evidenciu predaja.
        </p>
      </LegalSection>

      <LegalSection title="Vaše práva">
        <p>Na základe GDPR môžete požiadať o:</p>
        <ul style={listStyle}>
          <li>nahliadnutie do osobných údajov, ktoré o vás uchovávame (prístup)</li>
          <li>opravu nesprávnych údajov (oprava)</li>
          <li>vymazanie vašich údajov (výmaz)</li>
          <li>obmedzenie spracúvania, alebo vznesenie námietky voči nemu</li>
          <li>získanie vašich údajov v prenosnom formáte</li>
        </ul>
        <p>
          Ak chcete niektoré z týchto práv uplatniť, napíšte na{' '}
          <a href={`mailto:${OPERATOR.email}`} style={link}>{OPERATOR.email}</a>. Sťažnosť môžete podať aj na
          slovenský Úrad na ochranu osobných údajov Slovenskej republiky (dataprotection.gov.sk), alebo na dozorný
          orgán vo vašej vlastnej krajine, v Belgicku je to Gegevensbeschermingsautoriteit.
        </p>
      </LegalSection>

      <LegalSection title="Zmeny týchto zásad">
        <p>
          Ak sa zmení niečo v tom, čo táto stránka zhromažďuje alebo ako sa to používa, táto stránka sa
          aktualizuje a dátum hore sa príslušne upraví.
        </p>
      </LegalSection>
    </>
  )
}

export default function Privacy() {
  const { lang, t } = useLanguage()
  const crumbs = [{ label: t('nav.home'), to: '/' }, { label: t('legal.privacyTitle') }]

  useSeo({
    title: t('legal.privacyTitle'),
    description: t('legal.privacyDesc'),
    path: '/privacy',
    jsonLd: breadcrumbJsonLd(crumbs),
  })

  return (
    <LegalPage
      eyebrow={t('legal.eyebrow')}
      title={t('legal.privacyTitle')}
      updated={t('legal.privacyUpdated')}
      breadcrumbItems={crumbs}
    >
      {lang === 'sk' ? <PrivacySk /> : <PrivacyEn />}
    </LegalPage>
  )
}
