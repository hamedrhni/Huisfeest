import type { Dictionary } from "./nl";

/**
 * English content dictionary. Must mirror the shape of content/nl.ts.
 * Option `value`/package `id` strings MUST stay identical to the Dutch file
 * (they are stored verbatim and used as stable keys).
 */
export const en: Dictionary = {
  meta: {
    title: "HuisFeest — Celebrate at home, stress-free",
    description:
      "HuisFeest creates intimate celebrations in your own home: private chef, grazing tables, styling, music and atmosphere. One team, one unforgettable evening. Maastricht & Limburg region.",
  },

  nav: {
    services: "Services",
    occasions: "Occasions",
    packages: "Packages",
    how: "How it works",
    gallery: "Atmosphere",
    faq: "FAQ",
    contact: "Plan your event",
    requestCta: "Request your evening",
    whatsappCta: "WhatsApp",
    menuLabel: "Menu",
    closeLabel: "Close",
  },

  hero: {
    loading: "Setting the evening…",
    enter: "Discover HuisFeest",
    scrollHint: "Scroll to experience the story",
    chapters: [
      {
        kicker: "chapter 01 · arrival",
        title: "Your evening begins before the first bite",
        body: "Candlelight, soft music and the scent of something lovely in the making. We set the mood — all you have to do is walk in.",
      },
      {
        kicker: "chapter 02 · the table",
        title: "Styled tables, fresh ingredients, thoughtful details",
        body: "From an abundant grazing table to a refined private-chef dinner — every detail placed with care, exactly as you imagined it.",
      },
      {
        kicker: "chapter 03 · together",
        title: "Food, music and moments that feel effortless",
        body: "Your guests laugh, taste and linger. No stress in the kitchen, no fuss — just the celebration itself.",
      },
      {
        kicker: "chapter 04 · hosting",
        title: "You host the memory, we handle the work",
        body: "We set up, cook, style and clean up again. You simply get to be a guest at your own party.",
      },
    ],
  },

  positioning: {
    kicker: "what we do",
    title: "One team for an evening that simply works",
    intro:
      "Most providers do one thing. HuisFeest brings it all together, so you never have to call five vendors for one celebration.",
    pillars: [
      {
        title: "Private chef",
        body: "A chef who cooks in your home — from intimate dinner to elaborate menu, tailored to your taste and dietary needs.",
      },
      {
        title: "Grazing & fruit tables",
        body: "Abundant tables of cheeses, charcuterie, fresh fruit and treats that look as good as they taste.",
      },
      {
        title: "Styling & decoration",
        body: "Flowers, linen, candles and colour — a table and space that feel like you, not a standard package.",
      },
      {
        title: "Music & atmosphere",
        body: "The right playlist or live sound, lighting that fits, and an ambiance that carries the evening.",
      },
      {
        title: "Coordination",
        body: "One point of contact who aligns everything, so on the night itself it all just flows.",
      },
    ],
  },

  occasions: {
    kicker: "for which moment",
    title: "Made for the moments that matter",
    intro: "Small or grand — every occasion deserves an evening that feels personal.",
    items: [
      { title: "Birthdays", body: "From an intimate thirtieth to a big round number — celebrated your way." },
      { title: "Anniversaries", body: "An evening as special as the years you're celebrating together." },
      { title: "Proposals", body: "The perfect, personal setting for the most important yes." },
      { title: "Baby showers", body: "Soft, warm and beautifully styled — a celebration of what's to come." },
      { title: "Eid & family", body: "Room for tradition, family and a table that invites everyone to stay." },
      { title: "Dinners at home", body: "Just because you can: great food with the people you love most." },
    ],
  },

  packages: {
    kicker: "packages",
    title: "Choose a starting point, we make it yours",
    intro:
      "Four levels to start from. No fixed price list — every celebration is different, so we tailor everything personally in your quote.",
    priceNote: "Pricing on request — tailored to guests, menu and wishes.",
    items: [
      {
        id: "intimate-table",
        name: "Intimate table",
        tagline: "For a small, warm gathering",
        audience: "2–6 guests",
        includes: [
          "Dinner or grazing for a small group",
          "Atmospheric base styling",
          "Personal menu consultation",
        ],
      },
      {
        id: "feast-table",
        name: "Feast table",
        tagline: "Abundance that makes an impression",
        audience: "6–14 guests",
        includes: [
          "Generous grazing or fruit table",
          "Styling with flowers and linen",
          "Optional private chef",
        ],
      },
      {
        id: "celebration-setup",
        name: "Celebration setup",
        tagline: "Food, decoration and atmosphere as one",
        audience: "10–25 guests",
        includes: [
          "Chef or generous table of your choice",
          "Full styling & decoration",
          "Music and atmosphere advice",
        ],
      },
      {
        id: "full-hosting",
        name: "Full hosting experience",
        tagline: "You're a guest at your own party",
        audience: "bespoke",
        includes: [
          "Private chef & service",
          "Complete styling, music and coordination",
          "Set-up and clean-up fully handled",
        ],
      },
    ],
    cta: "Discuss this package",
  },

  how: {
    kicker: "how it works",
    title: "From idea to evening in four calm steps",
    steps: [
      { step: "01", title: "Tell us your occasion", body: "Share what you're celebrating, with how many people and what you picture." },
      { step: "02", title: "Choose mood and menu direction", body: "Together we shape taste, style and the details that make it yours." },
      { step: "03", title: "Receive your plan", body: "You get a clear proposal with menu, styling and a tailored quote." },
      { step: "04", title: "Enjoy, we set it up", body: "We handle everything on the day. You welcome your guests." },
    ],
  },

  gallery: {
    kicker: "atmosphere",
    title: "A glimpse of what we create",
    intro: "Images say more than a menu. This is the atmosphere we aim for.",
    tiles: [
      { label: "Candlelight & place setting" },
      { label: "Grazing in detail" },
      { label: "Set feast table" },
      { label: "Flowers & linen" },
      { label: "Evening ambiance" },
      { label: "Fresh from the chef" },
    ],
  },

  testimonials: {
    kicker: "experiences",
    title: "What guests will tell you",
    placeholderNote:
      "Sample text — real reviews will appear once the first celebrations have been hosted.",
    items: [
      {
        quote:
          "Sample review — the story of a real host will appear here soon.",
        name: "Name to follow",
        context: "Birthday · Maastricht",
      },
      {
        quote:
          "Sample review — space for an authentic experience once the first bookings are complete.",
        name: "Name to follow",
        context: "Anniversary · Limburg",
      },
      {
        quote:
          "Sample review — to be replaced with real words from real guests, never fabricated.",
        name: "Name to follow",
        context: "Dinner at home · region",
      },
    ],
  },

  faq: {
    kicker: "good to know",
    title: "Frequently asked questions",
    items: [
      {
        q: "Which region do you serve?",
        a: "We start in Maastricht and the surrounding area (Limburg). Other places in the Netherlands can be arranged on request — just let us know in your inquiry.",
      },
      {
        q: "Do you accommodate dietary needs?",
        a: "Absolutely. Vegetarian, halal, allergies or other wishes — let us know and the chef tailors the menu accordingly.",
      },
      {
        q: "How many guests can you handle?",
        a: "From an intimate dinner for two to a celebration of several dozen guests. Tell us your number and we'll advise the right package.",
      },
      {
        q: "What does an event cost?",
        a: "Every celebration is bespoke, so we don't work with fixed prices. Based on your wishes we send a clear quote.",
      },
      {
        q: "How far in advance should I book?",
        a: "The earlier the better, especially at weekends. Do reach out for shorter notice too — we'll always see what's possible.",
      },
      {
        q: "Do you also clean up?",
        a: "Yes. Depending on your package we handle both set-up and clean-up, so you never have to worry about a thing.",
      },
    ],
  },

  inquiry: {
    kicker: "plan your event",
    title: "Tell us about your evening",
    intro:
      "Briefly share what you picture. No strings attached — we'll get in touch with a personal proposal.",
    success: {
      title: "Thank you — your request is in!",
      body: "We'll be in touch personally as soon as we can. Prefer to chat right away? Send us a message on WhatsApp.",
      whatsappCta: "Continue on WhatsApp",
      again: "Send another request",
    },
    form: {
      sectionContact: "Your details",
      sectionEvent: "About the event",
      name: "Name",
      namePlaceholder: "What may we call you?",
      email: "Email",
      emailPlaceholder: "you@example.com",
      phone: "Phone",
      phonePlaceholder: "06 12345678",
      whatsapp: "Reachable via WhatsApp",
      eventType: "Occasion",
      packageInterest: "Package (optional)",
      guestCount: "Number of guests",
      guestPlaceholder: "e.g. 12",
      eventDate: "Preferred date",
      city: "City",
      cityPlaceholder: "e.g. Maastricht",
      postcode: "Postcode",
      postcodePlaceholder: "e.g. 6211",
      dietary: "Dietary notes (optional)",
      dietaryPlaceholder: "vegetarian, halal, allergies…",
      message: "Tell us more",
      messagePlaceholder: "What are you celebrating and what would make it special?",
      required: "required",
      optional: "optional",
      submit: "Send request",
      submitting: "Sending…",
      choose: "Make a choice",
      eventTypeOptions: [
        { value: "birthday", label: "Birthday" },
        { value: "anniversary", label: "Anniversary" },
        { value: "proposal", label: "Proposal" },
        { value: "baby-shower", label: "Baby shower" },
        { value: "eid", label: "Eid / family" },
        { value: "private-dinner", label: "Dinner at home" },
        { value: "other", label: "Something else" },
      ],
      packageOptions: [
        { value: "intimate-table", label: "Intimate table" },
        { value: "feast-table", label: "Feast table" },
        { value: "celebration-setup", label: "Celebration setup" },
        { value: "full-hosting", label: "Full hosting experience" },
        { value: "not-sure", label: "Not sure yet" },
      ],
    },
    errors: {
      generic: "Something went wrong. Please try again or send us a WhatsApp.",
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      contact: "Leave an email or phone number so we can reach you.",
      eventType: "Please choose an occasion.",
    },
  },

  whatsapp: {
    fabLabel: "WhatsApp",
    defaultMessage:
      "Hi HuisFeest! I'm thinking about a celebration at home and would love to know more.",
    placeholderWarning:
      "Note: this is still a placeholder WhatsApp number (+31 6 00000000). Replace it before launch.",
  },

  footer: {
    tagline: "Celebrate at home, stress-free.",
    serviceAreaLine: "Active in Maastricht & Limburg — beyond that on request.",
    explore: "Explore",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    cookieSettings: "Cookie settings",
    placeholderTag: "V1 · placeholder content",
  },

  cookieBanner: {
    message:
      "We use cookies to make your visit work properly. We do not place tracking or advertising cookies.",
    accept: "Accept",
    decline: "Decline",
    privacyLabel: "More information",
  },

  privacyPage: {
    meta: {
      title: "Privacy policy — HuisFeest",
      description: "How HuisFeest handles your personal data.",
    },
    title: "Privacy policy",
    lastUpdated: "May 2026",
    intro:
      "HuisFeest respects your privacy. This policy explains what personal data we collect, how we use it and what your rights are.",
    sections: [
      {
        heading: "Who are we?",
        body: "HuisFeest is a Dutch company (BV in formation) providing intimate private celebrations and culinary experiences at home. Address: Dokter Nevenstraat 1, 6224 DD Maastricht, the Netherlands. Chamber of Commerce (KvK) number will be published once registration is complete. For questions, contact us at info@huisfeest.nl.",
      },
      {
        heading: "What data do we collect?",
        body: "Via the inquiry form we collect: name, email address, phone number, location (city / postcode), event date, guest count, event type and any special wishes. We do not collect special categories of personal data.",
      },
      {
        heading: "Why do we use your data?",
        body: "Solely to process your inquiry, prepare a quote and contact you about your celebration. We do not use your data for marketing without your explicit consent.",
      },
      {
        heading: "How long do we keep your data?",
        body: "We retain inquiry data for a maximum of 2 years after your last contact with us, or until you ask us to delete it.",
      },
      {
        heading: "Your rights",
        body: "You have the right to access, correct and delete your personal data. You can also object to processing or lodge a complaint with the Dutch Data Protection Authority (autoriteitpersoonsgegevens.nl). Send your request to the email address below.",
      },
      {
        heading: "Contact",
        body: "For privacy questions or to request access, correction, or deletion of your personal data, contact us at info@huisfeest.nl or in writing at Dokter Nevenstraat 1, 6224 DD Maastricht, the Netherlands. We will respond within 30 days.",
      },
    ],
  },

  termsPage: {
    meta: {
      title: "Terms and conditions — HuisFeest",
      description: "The terms that apply to HuisFeest services.",
    },
    title: "Terms and conditions",
    lastUpdated: "May 2026",
    intro:
      "These terms apply to all HuisFeest services. By submitting an inquiry you agree to these terms.",
    sections: [
      {
        heading: "About HuisFeest",
        body: "HuisFeest is a private limited company (BV in formation), registered at Dokter Nevenstraat 1, 6224 DD Maastricht, the Netherlands. Chamber of Commerce (KvK) number will be published once registration is complete. For questions about these terms: info@huisfeest.nl.",
      },
      {
        heading: "Inquiry and quote",
        body: "An inquiry via the form or WhatsApp is non-binding. A booking is only confirmed after written acceptance of the quote by both parties.",
      },
      {
        heading: "Cancellation",
        body: "Cancellation is free of charge up to 7 days before the scheduled event. Cancellations made within 7 days of the event will be charged 50% of the total amount. Cancellations made within 24 hours of the event or no-shows will be charged 100% of the total amount. Cancellations must be confirmed in writing via info@huisfeest.nl.",
      },
      {
        heading: "Liability",
        body: "HuisFeest endeavours to deliver a high-quality service. Our liability is limited to the invoice amount of the relevant assignment. We are not liable for consequential loss or force majeure.",
      },
      {
        heading: "Governing law",
        body: "All agreements are governed by Dutch law. Disputes are submitted to the competent court in the district of Limburg.",
      },
      {
        heading: "Contact",
        body: "For questions about these terms and conditions or your booking: info@huisfeest.nl or in writing at Dokter Nevenstraat 1, 6224 DD Maastricht, the Netherlands.",
      },
    ],
  },

  pricingPage: {
    meta: {
      title: "Pricing & packages — HuisFeest",
      description:
        "Indicative pricing for private celebrations at home. Every package is bespoke — request a personal quote.",
    },
    title: "Pricing & packages",
    intro:
      "Every celebration is different. Price depends on guest count, menu, styling and extras. The ranges below give you an honest sense of each package — your exact quote follows after your inquiry.",
    priceDisclaimer:
      "All amounts are indicative and include coordination. Ingredients are billed separately unless stated otherwise. Final prices are confirmed in your quote.",
    packages: [
      {
        id: "intimate-table",
        name: "Intimate table",
        tagline: "For a small, warm gathering",
        audience: "2–6 guests",
        range: "from € 195",
        includes: [
          "Dinner or grazing for a small group",
          "Atmospheric base styling",
          "Personal menu consultation",
        ],
        cta: "Request this package",
      },
      {
        id: "feast-table",
        name: "Feast table",
        tagline: "Abundance that makes an impression",
        audience: "6–14 guests",
        range: "from € 395",
        includes: [
          "Generous grazing or fruit table",
          "Styling with flowers and linen",
          "Optional private chef",
        ],
        cta: "Request this package",
      },
      {
        id: "celebration-setup",
        name: "Celebration setup",
        tagline: "Food, decoration and atmosphere as one",
        audience: "10–25 guests",
        range: "from € 695",
        includes: [
          "Chef or generous table of your choice",
          "Full styling & decoration",
          "Music and atmosphere advice",
        ],
        cta: "Request this package",
      },
      {
        id: "full-hosting",
        name: "Full hosting experience",
        tagline: "You're a guest at your own party",
        audience: "bespoke",
        range: "on request",
        includes: [
          "Private chef & service",
          "Complete styling, music and coordination",
          "Set-up and clean-up fully handled",
        ],
        cta: "Discuss this package",
      },
    ],
    faqTitle: "How does pricing work?",
    faq: [
      {
        q: "Why no fixed prices?",
        a: "Every celebration is bespoke. Two dinners for ten guests are rarely identical — menu, ingredients, location and extras all affect the price. A fixed price would either overcharge or underdeliver.",
      },
      {
        q: "When will I receive a quote?",
        a: "After your inquiry we'll be in touch for a short conversation. We then send a clear, itemised quote within 48 hours.",
      },
      {
        q: "Is a deposit required?",
        a: "A 30% deposit of the total amount is required upon booking confirmation. The remaining balance is due no later than 7 days before your event. Payment instructions will be sent by email after confirmation.",
      },
      {
        q: "Are ingredients included?",
        a: "For most packages, ingredient costs are calculated separately based on the menu and guest count. This is always clearly stated in the quote.",
      },
    ],
    ctaTitle: "Ready to plan your celebration?",
    ctaBody: "Fill in the inquiry form and receive a personalised quote.",
    ctaButton: "Request your quote",
  },

  comingSoon: {
    title: "Coming soon",
    tagline: "Celebrate at home, stress-free.",
    whatsappCta: "Send us a WhatsApp",
    metaTitle: "HuisFeest — Coming soon",
  },
};
