// English and Slovak copy for everything the site renders.
//
// Two deliberate exclusions:
//   - The hero marquee line ("made by hand piece by piece") stays in
//     English everywhere. It reads as part of the artwork behind the bag
//     rather than as a sentence, and swapping it mid-animation would
//     change the composition.
//   - Product names (Bordová, Malinová, Olivová, Modrá) are proper
//     names, not words. They are never translated in any language —
//     including into Slovak, even though that's their language of
//     origin: a product name doesn't get a second translated name just
//     because the catalogue itself is now bilingual.
//
// Keys are grouped by where they appear. Anything missing from `sk`
// falls back to `en` rather than rendering an empty string, so a partial
// translation degrades to English instead of to blanks.
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'sk', label: 'SK', name: 'Slovenčina' },
]

export const translations = {
  en: {
    nav: {
      home: 'Home',
      collection: 'Collection',
      about: 'About',
      contact: 'Contact',
      menu: 'Menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      orderViaInstagram: 'Order via Instagram',
      skipToContent: 'Skip to content',
    },
    home: {
      srHeading: 'Niana, handmade bags, made by hand, piece by piece',
      heroAlt: 'Niana crochet bag in pink, with pearl strands and a charm',
      heroLearnMore: 'Learn more',
      newArrivals: 'New Arrivals',
      exploreTitle: 'Explore the bags',
      viewCollection: 'View collection',
    },
    collection: {
      eyebrow: 'Collections',
      title: 'Handmade bags',
      sortAsc: 'Name, A–Z',
      sortDesc: 'Name, Z–A',
      empty: 'Nothing in this cut yet. Try another material.',
      all: 'All',
      crochet: 'Crochet',
      leather: 'Leather',
      denim: 'Denim',
      custom: 'Custom',
    },
    product: {
      onePiece: 'One piece, sold as seen',
      interested: 'Interested? Ask us',
      care: 'Care',
      gotIt: 'Got it',
      notFound: 'We could not find that piece.',
      backToCollection: 'Back to the collection',
      previousPhoto: 'Previous photo',
      nextPhoto: 'Next photo',
    },
    about: {
      eyebrow: 'About',
      title: 'Made by hand, piece by piece',
      lead: 'Niana is a two-country studio: crochet, leather and denim bags worked in small batches.',
      body: 'Nothing leaves the table until it holds its shape. Patterns are drafted once, then adjusted by hand for each material, which is why a crochet piece and its leather sibling never measure quite the same.',
      steps: [
        ['01', 'Draft', 'Pattern cut and tested in calico before a single metre is used.'],
        ['02', 'Work', 'Crocheted, sewn or riveted by hand, one maker per bag, start to finish.'],
        ['03', 'Finish', 'Edges sealed, hardware set, and the running stitch tied off by hand.'],
      ],
      newsletterEyebrow: 'Newsletter',
      newsletterTitle: 'New pieces, twice a season',
      newsletterBody: 'Batches are small and go quickly. Leave an email and we will write when the next one is on the table.',
      newsletterOff: 'The list is not running yet, email',
      newsletterOffTail: 'and you will be on it the moment it is.',
      emailLabel: 'Email',
      signUp: 'Sign up',
      sending: 'Sending',
      signupThanks: 'Thanks, we will write when the next batch is on the table.',
      signupError: 'That did not go through. Please try again, or email us instead.',
    },
    footer: {
      blurb: 'Handmade bags. Made by hand, piece by piece, Slovakia & Belgium.',
      shop: 'Shop',
      studio: 'Studio',
      care: 'Care',
      careNote: 'Care notes live on each product page.',
      madeToOrder: 'Made to order',
      privacy: 'Privacy',
      imprint: 'Imprint',
      terms: 'Terms',
      cookieSettings: 'Cookie settings',
    },
    cookies: {
      body: 'We would like to use analytics cookies to count visits, so we know whether anyone is finding the site. They are not used for advertising, and nothing is loaded unless you say yes.',
      privacyPolicy: 'Privacy Policy',
      accept: 'Accept',
      decline: 'Decline',
      dialogLabel: 'Cookie choices',
    },
    // Short strings only. The legal pages' body prose stays as per-language
    // JSX in each page file, because it carries links, emphasis and lists
    // that would have to be escaped into strings to live here.
    legal: {
      eyebrow: 'Legal',
      lastUpdated: 'Last updated',
      privacyTitle: 'Privacy Policy',
      privacyUpdated: '12 September 2026',
      privacyDesc: 'What personal data this site processes, why, and the rights you have over it under GDPR.',
      imprintTitle: 'Imprint',
      imprintDesc: 'Who operates this website.',
      termsTitle: 'Terms of Use',
      termsUpdated: '12 September 2026',
      termsDesc: 'The terms for using this website, a catalogue of handmade pieces, not an online store.',
      contactEyebrow: 'Contact',
      contactTitle: 'Get in touch',
      contactDesc: 'Ask about a piece, a commission, or anything else, by email or Instagram DM.',
    },
    notFound: {
      title: "This page isn't here",
      body: "The piece or page you're looking for may have moved, sold, or the link might just be off. Here's the way back.",
      backHome: 'Back home',
      seeCollection: 'See the collection',
    },
  },

  sk: {
    nav: {
      home: 'Domov',
      collection: 'Kolekcia',
      about: 'O nás',
      contact: 'Kontakt',
      menu: 'Menu',
      openMenu: 'Otvoriť menu',
      closeMenu: 'Zavrieť menu',
      orderViaInstagram: 'Objednať cez Instagram',
      skipToContent: 'Preskočiť na obsah',
    },
    home: {
      srHeading: 'Niana, ručne robené tašky, kúsok po kúsku',
      heroAlt: 'Ružová háčkovaná taška Niana s perličkovými retiazkami a príveskom',
      heroLearnMore: 'Zistiť viac',
      newArrivals: 'Novinky',
      exploreTitle: 'Objavte tašky',
      viewCollection: 'Zobraziť kolekciu',
    },
    collection: {
      eyebrow: 'Kolekcie',
      title: 'Ručne robené tašky',
      sortAsc: 'Názov, A–Z',
      sortDesc: 'Názov, Z–A',
      empty: 'V tomto výbere zatiaľ nič nie je. Skúste iný materiál.',
      all: 'Všetko',
      crochet: 'Háčkované',
      leather: 'Kožené',
      denim: 'Denim',
      custom: 'Na želanie',
    },
    product: {
      onePiece: 'Jeden kus, predáva sa presne tak, ako je na fotke',
      interested: 'Máte záujem? Napíšte nám',
      care: 'Údržba',
      gotIt: 'Rozumiem',
      notFound: 'Tento kúsok sa nám nepodarilo nájsť.',
      backToCollection: 'Späť na kolekciu',
      previousPhoto: 'Predchádzajúca fotka',
      nextPhoto: 'Ďalšia fotka',
    },
    about: {
      eyebrow: 'O nás',
      title: 'Ručná práca, kúsok po kúsku',
      lead: 'Niana je ateliér v dvoch krajinách: háčkované, kožené a denimové tašky, vyrábané v malých sériách.',
      body: 'Nič neopustí stôl, kým nedrží tvar. Strihy sa navrhnú raz a potom ručne upravia pre každý materiál, preto sa háčkovaný kúsok a jeho kožený súrodenec nikdy nemerajú úplne rovnako.',
      steps: [
        ['01', 'Návrh', 'Strih vystrihnutý a otestovaný na plátne, skôr než sa použije čo i len meter materiálu.'],
        ['02', 'Práca', 'Háčkované, šité alebo nitované ručne, jedna tvorkyňa na tašku, od začiatku do konca.'],
        ['03', 'Dokončenie', 'Okraje zapracované, kovanie osadené a ozdobný steh dotiahnutý ručne.'],
      ],
      newsletterEyebrow: 'Novinky e-mailom',
      newsletterTitle: 'Nové kúsky, dvakrát za sezónu',
      newsletterBody: 'Série sú malé a rýchlo sa minú. Nechajte nám e-mail a napíšeme, keď bude na stole ďalšia.',
      newsletterOff: 'Zoznam ešte nebeží, napíšte na',
      newsletterOffTail: 'a budete naň zapísaní hneď, ako to bude možné.',
      emailLabel: 'E-mail',
      signUp: 'Prihlásiť sa',
      sending: 'Odosielanie',
      signupThanks: 'Ďakujeme, napíšeme, keď bude na stole ďalšia séria.',
      signupError: 'Nepodarilo sa to odoslať. Skúste to znova, alebo nám napíšte e-mail.',
    },
    footer: {
      blurb: 'Ručne robené tašky. Kúsok po kúsku, Slovensko a Belgicko.',
      shop: 'Nákup',
      studio: 'Ateliér',
      care: 'Údržba',
      careNote: 'Pokyny na údržbu nájdete na stránke každého produktu.',
      madeToOrder: 'Na objednávku',
      privacy: 'Ochrana súkromia',
      imprint: 'Impresum',
      terms: 'Podmienky',
      cookieSettings: 'Nastavenia cookies',
    },
    cookies: {
      body: 'Radi by sme používali analytické cookies na počítanie návštev, aby sme vedeli, či stránku niekto vôbec nájde. Nepoužívajú sa na reklamu a nič sa nenačíta, kým nepoviete áno.',
      privacyPolicy: 'Zásady ochrany súkromia',
      accept: 'Prijať',
      decline: 'Odmietnuť',
      dialogLabel: 'Voľby ohľadom cookies',
    },
    legal: {
      eyebrow: 'Právne informácie',
      lastUpdated: 'Naposledy aktualizované',
      privacyTitle: 'Zásady ochrany súkromia',
      privacyUpdated: '12. septembra 2026',
      privacyDesc: 'Aké osobné údaje táto stránka spracúva, prečo, a aké práva máte podľa GDPR.',
      imprintTitle: 'Impresum',
      imprintDesc: 'Kto prevádzkuje túto webovú stránku.',
      termsTitle: 'Podmienky používania',
      termsUpdated: '12. septembra 2026',
      termsDesc: 'Podmienky používania tejto webovej stránky, katalógu ručne robených kúskov, nie internetového obchodu.',
      contactEyebrow: 'Kontakt',
      contactTitle: 'Ozvite sa nám',
      contactDesc: 'Spýtajte sa na kúsok, na zákazku alebo čokoľvek iné, e-mailom alebo cez Instagram DM.',
    },
    notFound: {
      title: 'Táto stránka tu nie je',
      body: 'Kúsok alebo stránka, ktorú hľadáte, sa možno presunuli, predali, alebo je odkaz jednoducho chybný. Tu je cesta späť.',
      backHome: 'Späť domov',
      seeCollection: 'Pozrieť kolekciu',
    },
  },
}
