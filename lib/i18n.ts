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
    tagline: "Tasuta ärinime kättesaadavuse kontrollija",
    heading: "Kontrolli ärinime kättesaadavust",
    subheading:
      "Ühe otsinguga kontrollime äriregistrit, domeene ja sotsiaalmeediat – kõik korraga, sekunditega.",
    feature_ariregister_title: "Äriregister",
    feature_ariregister_desc: "Eesti äriregistri reaalajas kontroll",
    feature_domains_title: "Domeenid",
    feature_domains_desc: ".ee, .com, .eu, .io – otselink registreerimiseks",
    feature_social_title: "Sotsiaalmeedia",
    feature_social_desc: "Facebook, Instagram, LinkedIn kasutajanimed",
    how_title: "Kuidas see töötab?",
    how_p1:
      "Nimekontroll.ee on tasuta tööriist OÜ asutajatele, FIE-dele ja e-residentidele, kes soovivad kiiresti kontrollida, kas nende soovitud ärinimi on kättesaadav. Sisesta ärinimi otsinguväljale ja me kontrollime korraga Eesti äriregistrit (ariregister.rik.ee), domeene (.ee, .com, .eu, .io) ning populaarseid sotsiaalmeedia platvorme (Facebook, Instagram, LinkedIn).",
    how_p2_prefix: "Kõik kontrollid toimuvad ",
    how_p2_bold: "paralleelselt",
    how_p2_suffix:
      " – sa ei pea ootama, kuni üks kontroll lõpeb, et järgmine algaks. Tulemused kuvatakse reaalajas. Vabade domeenide kõrval kuvatakse otselingid registreerimiseks.",
    footer_copyright: "© 2024 nimekontroll.ee – Tasuta ärinime kontrollija",
    footer_domain_links: "Domeenihinnad viitelingid:",
    footer_disclaimer:
      "Domeenihinnad Zone.ee ja Namecheap hinnakirja põhjal – muutused võimalikud.",
    search_placeholder: "Sisesta ärinimi... (nt. TartuTech OÜ)",
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
    badge_available: "VABA",
    badge_taken: "VÕETUD",
    badge_unknown: "TEADMATA",
    badge_conflict: "KONFLIKT",
    badge_similar: "SARNANE",
    badge_error: "VIGA",
  },
  en: {
    tagline: "Free business name availability checker",
    heading: "Check business name availability",
    subheading:
      "One search checks the business registry, domains and social media – all at once, in seconds.",
    feature_ariregister_title: "Business Registry",
    feature_ariregister_desc: "Real-time check of the Estonian Business Registry",
    feature_domains_title: "Domains",
    feature_domains_desc: ".ee, .com, .eu, .io – direct link to register",
    feature_social_title: "Social Media",
    feature_social_desc: "Facebook, Instagram, LinkedIn usernames",
    how_title: "How does it work?",
    how_p1:
      "Nimekontroll.ee is a free tool for OÜ founders, sole traders (FIE) and e-residents who want to quickly check whether their desired business name is available. Enter a business name in the search box and we simultaneously check the Estonian Business Registry (ariregister.rik.ee), domains (.ee, .com, .eu, .io) and popular social media platforms (Facebook, Instagram, LinkedIn).",
    how_p2_prefix: "All checks run ",
    how_p2_bold: "in parallel",
    how_p2_suffix:
      " – you don't have to wait for one check to finish before the next one starts. Results are shown in real time. Direct registration links are shown next to available domains.",
    footer_copyright: "© 2024 nimekontroll.ee – Free business name checker",
    footer_domain_links: "Domain price affiliate links:",
    footer_disclaimer:
      "Domain prices based on Zone.ee and Namecheap pricing – subject to change.",
    search_placeholder: "Enter business name... (e.g. TartuTech OÜ)",
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
    badge_available: "AVAILABLE",
    badge_taken: "TAKEN",
    badge_unknown: "UNKNOWN",
    badge_conflict: "CONFLICT",
    badge_similar: "SIMILAR",
    badge_error: "ERROR",
  },
};
