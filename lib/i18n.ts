export type Lang = "et" | "en";

export type Translations = {
  // Header
  tagline: string;
  // Hero
  heading: string;
  subheading: string;
  // Feature cards
  feature_ariregister_title: string;
  feature_ariregister_desc: string;
  feature_kaubamargid_title: string;
  feature_kaubamargid_desc: string;
  feature_domains_title: string;
  feature_domains_desc: string;
  feature_social_title: string;
  feature_social_desc: string;
  // How it works
  how_title: string;
  how_p1: string;
  how_p2_prefix: string;
  how_p2_bold: string;
  how_p2_suffix: string;
  // Footer
  footer_copyright: string;
  footer_domain_links: string;
  footer_disclaimer: string;
  // Search form
  search_placeholder: string;
  search_checking: string;
  search_btn: string;
  search_checking_name: string;
  // Ariregister section
  ariregister_title: string;
  ariregister_loading: string;
  ariregister_registered: string;
  ariregister_msg_available: string;
  ariregister_msg_taken: string;
  ariregister_msg_conflict: string;
  ariregister_msg_similar: (n: number) => string;
  ariregister_similar_count: (n: number) => string;
  // Domains section
  domains_title: string;
  domains_loading: string;
  domain_register: string;
  // Social section
  social_title: string;
  social_loading: string;
  // Kaubamärgid section
  kaubamargid_title: string;
  kaubamargid_loading: string;
  kaubamargid_available: string;
  kaubamargid_taken: string;
  kaubamargid_similar: (n: number) => string;
  kaubamargid_check_epa: string;
  kaubamargid_status_label: string;
  kaubamargid_owner_label: string;
  // Status badges
  badge_available: string;
  badge_taken: string;
  badge_unknown: string;
  badge_conflict: string;
  badge_similar: string;
  badge_error: string;
};

export const translations: Record<Lang, Translations> = {
  et: {
    tagline: "Äriregister · Kaubamärgid · Domeenid · Sotsiaalmeedia",
    heading: "Kas sinu ärinimi on vaba?",
    subheading:
      "Ühe otsinguga kontrollime Eesti äriregistrit, EPA kaubamärgiregistrit, domeene (.ee .com .eu .io) ja sotsiaalmeediat – kõik korraga, sekunditega.",

    feature_ariregister_title: "Äriregister",
    feature_ariregister_desc:
      "Reaalajas kontroll – kas nimi on juba registreeritud OÜ, AS või MTÜ-na Eesti äriregistris",
    feature_kaubamargid_title: "Kaubamärgid",
    feature_kaubamargid_desc:
      "Eesti Patendiameti (EPA) register – kas sarnane kaubamärk on juba kaitstud",
    feature_domains_title: "Domeenid",
    feature_domains_desc:
      ".ee, .com, .eu, .io – näed kohe hinda ja saad otse registreerida",
    feature_social_title: "Sotsiaalmeedia",
    feature_social_desc:
      "Facebook, Instagram, LinkedIn – kas kasutajanimi on sinu nimega vaba",

    how_title: "Kuidas see töötab?",
    how_p1:
      "Nimekontroll.ee on tasuta tööriist OÜ asutajatele, FIE-dele, e-residentidele ja startup-asutajatele, kes soovivad ühest kohast kiiresti kontrollida, kas nende soovitud ärinimi on kättesaadav. Sisesta ärinimi ja me kontrollime korraga nelja allikat: Eesti äriregistrit (ariregister.rik.ee), Eesti Patendiameti kaubamärgiregistrit (EPA), domeene (.ee, .com, .eu, .io) ning populaarseid sotsiaalmeedia platvorme (Facebook, Instagram, LinkedIn).",
    how_p2_prefix: "Kõik neli kontrolli toimuvad ",
    how_p2_bold: "paralleelselt",
    how_p2_suffix:
      " – tulemused ilmuvad reaalajas ja sekunditega näed, kas nimi on kõikidel olulistel platvormidel vaba. Vabade domeenide kõrval kuvatakse otselingid registreerimiseks Zone.ee ja Namecheap kaudu.",

    footer_copyright: "© 2025 nimekontroll.ee – Tasuta ärinime kontrollija",
    footer_domain_links: "Domeenihinnad viitelingid:",
    footer_disclaimer:
      "Domeenihinnad Zone.ee ja Namecheap hinnakirja põhjal – muutused võimalikud.",

    search_placeholder: "Sisesta ärinimi... (nt. TartuTech, Põhjavalgus OÜ)",
    search_checking: "Kontrollin...",
    search_btn: "Kontrolli kättesaadavust",
    search_checking_name: "Kontrollitakse nime:",

    ariregister_title: "Eesti Äriregister",
    ariregister_loading: "Kontrollin äriregistrit...",
    ariregister_registered: "Registris:",
    ariregister_msg_available: "Nimi on äriregistris vaba",
    ariregister_msg_taken: "Nimi on juba registreeritud äriregistris",
    ariregister_msg_conflict:
      "Nimi ei ole selgesti eristatav registrisse kantud nimedest",
    ariregister_msg_similar: (n) =>
      `Täpne nimi on vaba, kuid leidub ${n} sarnast nime`,
    ariregister_similar_count: (n) => `${n} sarnast nime äriregistris`,

    domains_title: "Domeenid",
    domains_loading: "Kontrollin domeene...",
    domain_register: "Registreeri",

    social_title: "Sotsiaalmeedia kasutajanimed",
    social_loading: "Kontrollin sotsiaalmeediat...",

    kaubamargid_title: "Kaubamärgid (EPA)",
    kaubamargid_loading: "Kontrollin kaubamärgiregistrit...",
    kaubamargid_available:
      "Täpset kaubamärki ei leitud – nimi on registreerimiseks vaba",
    kaubamargid_taken: "Sarnane kaubamärk on juba registreeritud",
    kaubamargid_similar: (n) => `Leiti ${n} sarnast kaubamärki`,
    kaubamargid_check_epa: "Vaata EPA registrist",
    kaubamargid_status_label: "Staatus:",
    kaubamargid_owner_label: "Omanik:",

    badge_available: "VABA",
    badge_taken: "VÕETUD",
    badge_unknown: "TEADMATA",
    badge_conflict: "KONFLIKT",
    badge_similar: "SARNANE",
    badge_error: "VIGA",
  },

  en: {
    tagline: "Business Registry · Trademarks · Domains · Social Media",
    heading: "Is your business name available?",
    subheading:
      "One search checks the Estonian business registry, EPA trademark register, domains (.ee .com .eu .io) and social media – all in parallel, in seconds.",

    feature_ariregister_title: "Business Registry",
    feature_ariregister_desc:
      "Real-time check – is the name already registered as an OÜ, AS or NGO in the Estonian Business Registry",
    feature_kaubamargid_title: "Trademarks",
    feature_kaubamargid_desc:
      "Estonian Patent Office (EPA) register – check if a similar trademark is already protected",
    feature_domains_title: "Domains",
    feature_domains_desc:
      ".ee, .com, .eu, .io – see prices instantly and register directly",
    feature_social_title: "Social Media",
    feature_social_desc:
      "Facebook, Instagram, LinkedIn – check if the username is available",

    how_title: "How does it work?",
    how_p1:
      "Nimekontroll.ee is a free tool for OÜ founders, sole traders (FIE), e-residents and startup founders who want to quickly check from one place whether their desired business name is available. Enter a name and we simultaneously check four sources: the Estonian Business Registry (ariregister.rik.ee), the Estonian Patent Office (EPA) trademark register, domains (.ee, .com, .eu, .io) and popular social media platforms (Facebook, Instagram, LinkedIn).",
    how_p2_prefix: "All four checks run ",
    how_p2_bold: "in parallel",
    how_p2_suffix:
      " – results appear in real time and within seconds you can see if your name is free across all key platforms. Direct registration links are shown next to available domains via Zone.ee and Namecheap.",

    footer_copyright: "© 2025 nimekontroll.ee – Free business name checker",
    footer_domain_links: "Domain price affiliate links:",
    footer_disclaimer:
      "Domain prices based on Zone.ee and Namecheap pricing – subject to change.",

    search_placeholder: "Enter business name... (e.g. TartuTech, NorthLight OÜ)",
    search_checking: "Checking...",
    search_btn: "Check availability",
    search_checking_name: "Checking name:",

    ariregister_title: "Estonian Business Registry",
    ariregister_loading: "Checking business registry...",
    ariregister_registered: "Registered:",
    ariregister_msg_available: "Name is available in the business registry",
    ariregister_msg_taken:
      "Name is already registered in the business registry",
    ariregister_msg_conflict:
      "Name is not sufficiently distinct from registered names",
    ariregister_msg_similar: (n) =>
      `Name is available, but ${n} similar name${n === 1 ? "" : "s"} found`,
    ariregister_similar_count: (n) =>
      `${n} similar name${n === 1 ? "" : "s"} in the business registry`,

    domains_title: "Domains",
    domains_loading: "Checking domains...",
    domain_register: "Register",

    social_title: "Social media usernames",
    social_loading: "Checking social media...",

    kaubamargid_title: "Trademarks (EPA)",
    kaubamargid_loading: "Checking trademark registry...",
    kaubamargid_available:
      "No conflicting trademark found – name appears free to register",
    kaubamargid_taken: "A similar trademark is already registered",
    kaubamargid_similar: (n) =>
      `${n} similar trademark${n === 1 ? "" : "s"} found`,
    kaubamargid_check_epa: "View in EPA registry",
    kaubamargid_status_label: "Status:",
    kaubamargid_owner_label: "Owner:",

    badge_available: "AVAILABLE",
    badge_taken: "TAKEN",
    badge_unknown: "UNKNOWN",
    badge_conflict: "CONFLICT",
    badge_similar: "SIMILAR",
    badge_error: "ERROR",
  },
};
