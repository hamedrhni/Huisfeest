/**
 * Dutch content dictionary — SOURCE OF TRUTH for the bilingual schema.
 * Tone: warm, informal (je/jij), intimate. Never hardcode UI strings in components;
 * add them here and to content/en.ts.
 *
 * The `Dictionary` type is derived from this object; content/en.ts must match its shape.
 */
export const nl = {
  meta: {
    title: "HuisFeest — Vier thuis, zonder zorgen",
    description:
      "HuisFeest verzorgt intieme feesten bij jou thuis: private chef, grazing tables, styling, muziek en sfeer. Eén team, één avond om nooit te vergeten. Regio Maastricht & Limburg.",
  },

  nav: {
    services: "Diensten",
    occasions: "Gelegenheden",
    packages: "Arrangementen",
    how: "Hoe het werkt",
    gallery: "Sfeer",
    faq: "Veelgestelde vragen",
    contact: "Plan jouw feest",
    requestCta: "Vraag jouw avond aan",
    whatsappCta: "WhatsApp",
    menuLabel: "Menu",
    closeLabel: "Sluiten",
  },

  hero: {
    loading: "De avond wordt klaargezet…",
    enter: "Ontdek HuisFeest",
    scrollHint: "Scroll om het verhaal te beleven",
    chapters: [
      {
        kicker: "hoofdstuk 01 · aankomst",
        title: "Jouw avond begint nog vóór de eerste hap",
        body: "Kaarslicht, zachte muziek en de geur van iets moois dat staat te wachten. Wij zorgen voor de sfeer, jij hoeft alleen maar binnen te lopen.",
      },
      {
        kicker: "hoofdstuk 02 · de tafel",
        title: "Gestylede tafels, verse ingrediënten, alle aandacht voor detail",
        body: "Van een overvloedige grazing table tot een verfijnd diner door een private chef — alles met zorg geplaatst, precies zoals jij het voor je zag.",
      },
      {
        kicker: "hoofdstuk 03 · samen",
        title: "Eten, muziek en momenten die vanzelf lijken te gaan",
        body: "Je gasten lachen, proeven en blijven hangen. Geen gestress in de keuken, geen gedoe — alleen het feest zelf.",
      },
      {
        kicker: "hoofdstuk 04 · gastvrij",
        title: "Jij viert de herinnering, wij regelen het werk",
        body: "Wij dekken op, koken, stylen en ruimen weer op. Jij bent gewoon gast op je eigen feest.",
      },
    ],
  },

  positioning: {
    kicker: "wat we doen",
    title: "Eén team voor een avond die volledig klopt",
    intro:
      "De meeste aanbieders doen één ding. HuisFeest brengt alles samen, zodat jij niet met vijf leveranciers hoeft te bellen voor één feest.",
    pillars: [
      {
        title: "Private chef",
        body: "Een chef die bij je thuis kookt — van intiem diner tot uitgebreid menu, afgestemd op jouw smaak en dieetwensen.",
      },
      {
        title: "Grazing & fruittafels",
        body: "Overvloedige tafels vol kazen, charcuterie, vers fruit en lekkernijen die er net zo mooi uitzien als ze smaken.",
      },
      {
        title: "Styling & decoratie",
        body: "Bloemen, linnen, kaarsen en kleur — een tafel en ruimte die voelen als jou, niet als een standaardpakket.",
      },
      {
        title: "Muziek & sfeer",
        body: "De juiste playlist of live geluid, licht dat klopt en een ambiance die de avond draagt.",
      },
      {
        title: "Coördinatie",
        body: "Eén aanspreekpunt dat alles op elkaar afstemt, zodat het op de avond zelf vanzelf lijkt te lopen.",
      },
    ],
  },

  occasions: {
    kicker: "voor welk moment",
    title: "Gemaakt voor de momenten die ertoe doen",
    intro: "Klein of uitbundig — elke gelegenheid verdient een avond die persoonlijk voelt.",
    items: [
      { title: "Verjaardagen", body: "Van intieme dertigste tot een groot rond getal — gevierd op jouw manier." },
      { title: "Jubilea", body: "Een avond die net zo bijzonder is als de jaren die je samen viert." },
      { title: "Aanzoeken", body: "Het perfecte, persoonlijke decor voor het allerbelangrijkste ja-woord." },
      { title: "Babyshowers", body: "Zacht, warm en mooi gestyled — een viering voor wat komen gaat." },
      { title: "Eid & familie", body: "Ruimte voor traditie, familie en een tafel die uitnodigt om te blijven." },
      { title: "Diners thuis", body: "Gewoon omdat het kan: goed eten met de mensen die je het liefst ziet." },
    ],
  },

  packages: {
    kicker: "arrangementen",
    title: "Kies het vertrekpunt, wij maken het van jou",
    intro:
      "Vier niveaus om vanuit te starten. Geen vaste prijslijst — elk feest is anders, dus we stemmen alles persoonlijk af in je offerte.",
    priceNote: "Prijzen op aanvraag — afgestemd op gasten, menu en wensen.",
    items: [
      {
        id: "intimate-table",
        name: "Intieme tafel",
        tagline: "Voor een klein, warm samenzijn",
        audience: "2–6 gasten",
        includes: [
          "Diner of grazing voor een kleine groep",
          "Sfeervolle basisstyling",
          "Persoonlijk menuoverleg",
        ],
      },
      {
        id: "feast-table",
        name: "Feesttafel",
        tagline: "Overvloed die indruk maakt",
        audience: "6–14 gasten",
        includes: [
          "Uitgebreide grazing- of fruittafel",
          "Styling met bloemen en linnen",
          "Optionele private chef",
        ],
      },
      {
        id: "celebration-setup",
        name: "Feestopstelling",
        tagline: "Eten, decoratie en sfeer als één geheel",
        audience: "10–25 gasten",
        includes: [
          "Chef of uitgebreide tafel naar keuze",
          "Volledige styling & decoratie",
          "Muziek- en sfeeradvies",
        ],
      },
      {
        id: "full-hosting",
        name: "Volledig gastheerschap",
        tagline: "Jij bent gast op je eigen feest",
        audience: "op maat",
        includes: [
          "Private chef & service",
          "Complete styling, muziek en coördinatie",
          "Opbouw en opruimen volledig verzorgd",
        ],
      },
    ],
    cta: "Bespreek dit arrangement",
  },

  how: {
    kicker: "hoe het werkt",
    title: "Van idee naar avond in vier rustige stappen",
    steps: [
      { step: "01", title: "Vertel ons je gelegenheid", body: "Deel wat je viert, met hoeveel mensen en wat je voor je ziet." },
      { step: "02", title: "Kies sfeer en menurichting", body: "Samen bepalen we smaak, stijl en de details die het van jou maken." },
      { step: "03", title: "Ontvang je plan", body: "Je krijgt een helder voorstel met menu, styling en een offerte op maat." },
      { step: "04", title: "Geniet, wij bouwen op", body: "Wij regelen alles op de dag zelf. Jij verwelkomt je gasten." },
    ],
  },

  gallery: {
    kicker: "sfeer",
    title: "Een indruk van wat we maken",
    intro: "Beelden zeggen meer dan een menukaart. Dit is de sfeer waar we naar streven.",
    placeholderNote: "Voorbeeldsfeer — echte HuisFeest-fotografie volgt vóór de lancering.",
    tiles: [
      { label: "Kaarslicht & couvert" },
      { label: "Grazing in detail" },
      { label: "Gedekte feesttafel" },
      { label: "Bloemen & linnen" },
      { label: "Avondsfeer" },
      { label: "Vers van de chef" },
    ],
  },

  testimonials: {
    kicker: "ervaringen",
    title: "Wat gasten straks vertellen",
    placeholderNote:
      "Voorbeeldteksten — echte reviews verschijnen zodra de eerste feesten zijn gevierd.",
    items: [
      {
        quote:
          "Voorbeeldreview — hier komt straks het verhaal van een echte gastheer of gastvrouw te staan.",
        name: "Naam volgt",
        context: "Verjaardag · Maastricht",
      },
      {
        quote:
          "Voorbeeldreview — plek voor een authentieke ervaring zodra de eerste boekingen achter de rug zijn.",
        name: "Naam volgt",
        context: "Jubileum · Limburg",
      },
      {
        quote:
          "Voorbeeldreview — wordt vervangen door echte woorden van echte gasten, nooit verzonnen.",
        name: "Naam volgt",
        context: "Diner thuis · regio",
      },
    ],
  },

  faq: {
    kicker: "goed om te weten",
    title: "Veelgestelde vragen",
    items: [
      {
        q: "In welke regio zijn jullie actief?",
        a: "We starten in Maastricht en omgeving (Limburg). Andere plaatsen in Nederland kunnen we in overleg verzorgen — laat het ons gewoon weten in je aanvraag.",
      },
      {
        q: "Houden jullie rekening met dieetwensen?",
        a: "Zeker. Vegetarisch, halal, allergieën of andere wensen — geef het aan en de chef stemt het menu erop af.",
      },
      {
        q: "Hoeveel gasten kunnen jullie aan?",
        a: "Van een intiem diner voor twee tot een feest van enkele tientallen gasten. Vertel ons je aantal en we adviseren het juiste arrangement.",
      },
      {
        q: "Wat kost een feest?",
        a: "Elk feest is maatwerk, dus we werken niet met vaste prijzen. Op basis van je wensen sturen we een heldere offerte.",
      },
      {
        q: "Hoe ver van tevoren moet ik boeken?",
        a: "Hoe eerder hoe beter, zeker in het weekend. Neem gerust contact op, ook voor iets op kortere termijn — we kijken altijd wat mogelijk is.",
      },
      {
        q: "Ruimen jullie ook op?",
        a: "Ja. Afhankelijk van je arrangement verzorgen we opbouw én opruimen, zodat jij nergens naar om hoeft te kijken.",
      },
    ],
  },

  inquiry: {
    kicker: "plan jouw feest",
    title: "Vertel ons over jouw avond",
    intro:
      "Vul kort in wat je voor je ziet. Je zit nergens aan vast — we nemen contact op met een persoonlijk voorstel.",
    success: {
      title: "Dankjewel — je aanvraag is binnen!",
      body: "We nemen zo snel mogelijk persoonlijk contact met je op. Liever direct schakelen? Stuur ons een berichtje via WhatsApp.",
      whatsappCta: "Verder via WhatsApp",
      again: "Nog een aanvraag versturen",
    },
    form: {
      sectionContact: "Jouw gegevens",
      sectionEvent: "Over het feest",
      name: "Naam",
      namePlaceholder: "Hoe mogen we je noemen?",
      email: "E-mail",
      emailPlaceholder: "jij@voorbeeld.nl",
      phone: "Telefoon",
      phonePlaceholder: "06 12345678",
      whatsapp: "Bereikbaar via WhatsApp",
      eventType: "Gelegenheid",
      packageInterest: "Arrangement (optioneel)",
      guestCount: "Aantal gasten",
      guestPlaceholder: "bijv. 12",
      eventDate: "Gewenste datum",
      city: "Plaats",
      cityPlaceholder: "bijv. Maastricht",
      postcode: "Postcode",
      postcodePlaceholder: "bijv. 6211",
      dietary: "Dieetwensen (optioneel)",
      dietaryPlaceholder: "vegetarisch, halal, allergieën…",
      message: "Vertel ons meer",
      messagePlaceholder: "Wat vier je en wat zou het bijzonder maken?",
      required: "verplicht",
      optional: "optioneel",
      submit: "Verstuur aanvraag",
      submitting: "Versturen…",
      choose: "Maak een keuze",
      eventTypeOptions: [
        { value: "birthday", label: "Verjaardag" },
        { value: "anniversary", label: "Jubileum" },
        { value: "proposal", label: "Aanzoek" },
        { value: "baby-shower", label: "Babyshower" },
        { value: "eid", label: "Eid / familie" },
        { value: "private-dinner", label: "Diner thuis" },
        { value: "other", label: "Iets anders" },
      ],
      packageOptions: [
        { value: "intimate-table", label: "Intieme tafel" },
        { value: "feast-table", label: "Feesttafel" },
        { value: "celebration-setup", label: "Feestopstelling" },
        { value: "full-hosting", label: "Volledig gastheerschap" },
        { value: "not-sure", label: "Weet ik nog niet" },
      ],
    },
    errors: {
      generic: "Er ging iets mis. Probeer het opnieuw of stuur ons een WhatsApp.",
      name: "Vul je naam in.",
      email: "Vul een geldig e-mailadres in.",
      contact: "Laat een e-mail of telefoonnummer achter zodat we je kunnen bereiken.",
      eventType: "Kies een gelegenheid.",
    },
  },

  whatsapp: {
    fabLabel: "WhatsApp",
    defaultMessage:
      "Hoi HuisFeest! Ik denk na over een feest thuis en wil graag wat meer weten.",
    placeholderWarning:
      "Let op: dit is nog een tijdelijk WhatsApp-nummer (+31 6 00000000). Vervang het vóór de lancering.",
  },

  footer: {
    tagline: "Vier thuis, zonder zorgen.",
    serviceAreaLine: "Actief in Maastricht & Limburg — daarbuiten in overleg.",
    explore: "Ontdek",
    contactTitle: "Contact",
    rights: "Alle rechten voorbehouden.",
    privacy: "Privacy",
    terms: "Voorwaarden",
    cookieSettings: "Cookie-instellingen",
    placeholderTag: "V1 · voorbeeldinhoud",
  },

  cookieBanner: {
    message:
      "Wij gebruiken cookies om jouw bezoek goed te laten werken. We plaatsen geen tracking- of reclamecookies.",
    accept: "Akkoord",
    decline: "Weigeren",
    privacyLabel: "Meer informatie",
  },

  privacyPage: {
    meta: {
      title: "Privacybeleid — HuisFeest",
      description: "Hoe HuisFeest omgaat met jouw persoonsgegevens.",
    },
    title: "Privacybeleid",
    lastUpdated: "Mei 2026",
    intro:
      "HuisFeest respecteert jouw privacy. In dit privacybeleid leggen we uit welke persoonsgegevens we verzamelen, hoe we ze gebruiken en wat jouw rechten zijn.",
    sections: [
      {
        heading: "Wie zijn wij?",
        body: "HuisFeest is een Nederlands bedrijf (BV in oprichting) dat intieme privéfeesten en culinaire ervaringen verzorgt bij mensen thuis. Adres: Dokter Nevenstraat 1, 6224 DD Maastricht. KvK-nummer wordt gepubliceerd zodra de inschrijving is afgerond. Voor vragen kun je contact opnemen via info@huisfeest.nl.",
      },
      {
        heading: "Welke gegevens verzamelen we?",
        body: "Via het aanvraagformulier verzamelen we: naam, e-mailadres, telefoonnummer, locatie (stad/postcode), datum van het evenement, aantal gasten, evenementtype en eventuele bijzondere wensen. We verzamelen geen bijzondere categorieën persoonsgegevens.",
      },
      {
        heading: "Waarvoor gebruiken we je gegevens?",
        body: "Uitsluitend om je aanvraag te verwerken, een offerte op te stellen en contact met je op te nemen over je feest. We gebruiken je gegevens niet voor marketing zonder jouw uitdrukkelijke toestemming.",
      },
      {
        heading: "Hoe lang bewaren we je gegevens?",
        body: "We bewaren je aanvraaggegevens maximaal 2 jaar na je laatste contact met ons, of tot je ons vraagt ze te verwijderen.",
      },
      {
        heading: "Jouw rechten",
        body: "Je hebt recht op inzage, correctie en verwijdering van je persoonsgegevens. Je kunt ook bezwaar maken tegen de verwerking of een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl). Stuur je verzoek naar het e-mailadres hieronder.",
      },
      {
        heading: "Contact",
        body: "Voor vragen over privacy, een verzoek tot inzage, correctie of verwijdering van jouw gegevens, kun je contact opnemen via info@huisfeest.nl of schriftelijk via Dokter Nevenstraat 1, 6224 DD Maastricht. We reageren binnen 30 dagen.",
      },
    ],
  },

  termsPage: {
    meta: {
      title: "Algemene voorwaarden — HuisFeest",
      description: "De voorwaarden die gelden voor diensten van HuisFeest.",
    },
    title: "Algemene voorwaarden",
    lastUpdated: "Mei 2026",
    intro:
      "Deze voorwaarden zijn van toepassing op alle diensten van HuisFeest. Door een aanvraag in te dienen ga je akkoord met deze voorwaarden.",
    sections: [
      {
        heading: "Over HuisFeest",
        body: "HuisFeest is een besloten vennootschap (BV in oprichting), gevestigd aan Dokter Nevenstraat 1, 6224 DD Maastricht. KvK-nummer wordt gepubliceerd zodra de inschrijving is afgerond. Voor vragen over deze voorwaarden: info@huisfeest.nl.",
      },
      {
        heading: "Aanvraag en offerte",
        body: "Een aanvraag via het formulier of WhatsApp is vrijblijvend. Een boeking is pas definitief na schriftelijke bevestiging van de offerte door beide partijen.",
      },
      {
        heading: "Annulering",
        body: "Annulering is kosteloos tot 7 dagen voor de geplande datum. Bij annulering binnen 7 dagen voor het event wordt 50% van het totaalbedrag in rekening gebracht. Bij annulering binnen 24 uur voor het event of bij niet-verschijnen wordt 100% van het totaalbedrag in rekening gebracht. Annulering dient schriftelijk te worden bevestigd via info@huisfeest.nl.",
      },
      {
        heading: "Aansprakelijkheid",
        body: "HuisFeest spant zich in voor een kwalitatieve uitvoering. Onze aansprakelijkheid is beperkt tot het factuurbedrag van de betreffende opdracht. Wij zijn niet aansprakelijk voor gevolgschade of schade door overmacht.",
      },
      {
        heading: "Toepasselijk recht",
        body: "Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in de rechtbank Limburg.",
      },
      {
        heading: "Contact",
        body: "Voor vragen over deze algemene voorwaarden of jouw boeking: info@huisfeest.nl of schriftelijk via Dokter Nevenstraat 1, 6224 DD Maastricht.",
      },
    ],
  },

  pricingPage: {
    meta: {
      title: "Prijzen & arrangementen — HuisFeest",
      description:
        "Indicatieve richtprijzen voor privéfeesten thuis. Elk arrangement is maatwerk — vraag een persoonlijke offerte aan.",
    },
    title: "Prijzen & arrangementen",
    intro:
      "Elk feest is anders. De prijs hangt af van het aantal gasten, het menu, de styling en de extras. De onderstaande richtprijzen geven je een eerlijk beeld van de bandbreedte per arrangement — de exacte offerte ontvang je na je aanvraag.",
    priceDisclaimer:
      "Alle bedragen zijn indicatief en inclusief coördinatie. Exclusief ingrediëntenkosten tenzij anders vermeld. Definitieve prijzen worden opgenomen in de offerte.",
    packages: [
      {
        id: "intimate-table",
        name: "Intieme tafel",
        tagline: "Voor een klein, warm samenzijn",
        audience: "2–6 gasten",
        range: "vanaf € 195",
        includes: [
          "Diner of grazing voor een kleine groep",
          "Sfeervolle basisstyling",
          "Persoonlijk menuoverleg",
        ],
        cta: "Vraag dit arrangement aan",
      },
      {
        id: "feast-table",
        name: "Feesttafel",
        tagline: "Overvloed die indruk maakt",
        audience: "6–14 gasten",
        range: "vanaf € 395",
        includes: [
          "Uitgebreide grazing- of fruittafel",
          "Styling met bloemen en linnen",
          "Optionele private chef",
        ],
        cta: "Vraag dit arrangement aan",
      },
      {
        id: "celebration-setup",
        name: "Feestopstelling",
        tagline: "Eten, decoratie en sfeer als één geheel",
        audience: "10–25 gasten",
        range: "vanaf € 695",
        includes: [
          "Chef of uitgebreide tafel naar keuze",
          "Volledige styling & decoratie",
          "Muziek- en sfeeradvies",
        ],
        cta: "Vraag dit arrangement aan",
      },
      {
        id: "full-hosting",
        name: "Volledig gastheerschap",
        tagline: "Jij bent gast op je eigen feest",
        audience: "op maat",
        range: "op aanvraag",
        includes: [
          "Private chef & service",
          "Complete styling, muziek en coördinatie",
          "Opbouw en opruimen volledig verzorgd",
        ],
        cta: "Bespreek dit arrangement",
      },
    ],
    faqTitle: "Hoe werkt de prijsbepaling?",
    faq: [
      {
        q: "Waarom geen vaste prijzen?",
        a: "Elk feest is maatwerk. Twee diners voor tien personen zijn zelden identiek — menu, ingrediënten, locatie en extras beïnvloeden de prijs. Een vaste prijs zou je ofwel te veel of te weinig laten betalen.",
      },
      {
        q: "Wanneer ontvang ik een offerte?",
        a: "Na je aanvraag nemen we contact op voor een kort gesprek. Op basis daarvan sturen we binnen 48 uur een duidelijke, gespecificeerde offerte.",
      },
      {
        q: "Is er een aanbetaling vereist?",
        a: "Bij bevestiging van jouw boeking vragen wij een aanbetaling van 30% van het totaalbedrag. Het resterende bedrag dient uiterlijk 7 dagen voor het event te worden voldaan. Betalingsinstructies ontvang je per e-mail na bevestiging.",
      },
      {
        q: "Zijn ingrediënten inbegrepen?",
        a: "Bij de meeste arrangementen worden ingrediëntenkosten apart berekend op basis van het menu en het aantal personen. Dit staat altijd duidelijk in de offerte vermeld.",
      },
    ],
    ctaTitle: "Klaar om jouw feest te plannen?",
    ctaBody: "Vul het aanvraagformulier in en ontvang een persoonlijke offerte op maat.",
    ctaButton: "Vraag jouw offerte aan",
  },

  comingSoon: {
    title: "Binnenkort beschikbaar",
    tagline: "Vier thuis, zonder zorgen.",
    whatsappCta: "Stuur ons een WhatsApp",
    metaTitle: "HuisFeest — Binnenkort beschikbaar",
  },
};

export type Dictionary = typeof nl;
