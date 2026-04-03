"use client";

import { SearchClient } from "@/components/SearchClient";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLang } from "@/lib/i18nContext";

const FAQ_ET = [
  {
    q: "Mis on Nimekontroll?",
    a: "Nimekontroll on tasuta tööriist, mis kontrollib ärinime kättesaadavust korraga neljast allikast: Eesti äriregistrist, EPA kaubamärgiregistrist, domeeniregistritest (.ee, .com, .eu, .io) ja sotsiaalmeediast (Facebook, Instagram, LinkedIn).",
  },
  {
    q: "Kas kontroll on tasuta?",
    a: "Jah, põhifunktsioonid on täiesti tasuta ja piiramata kasutusega.",
  },
  {
    q: "Kui kiiresti tulemused ilmuvad?",
    a: "Kõik neli kontrolli käivituvad paralleelselt ja tulemused ilmuvad reaalajas – tavaliselt 2–5 sekundi jooksul.",
  },
  {
    q: "Kas nimekontroll.eu sobib e-residentidele?",
    a: "Jah. Leht on saadaval nii eesti kui inglise keeles ja sobib ideaalselt e-residentidele, kes soovivad Eestis ettevõtet asutada.",
  },
  {
    q: "Mida tähendab kaubamärgi kontroll?",
    a: "Kontrollime Eesti Patendiameti (EPA) kaubamärgiregistrist, kas sarnase nimega kaubamärk on juba registreeritud. Täpsemaks analüüsiks soovitame pöörduda patendivoliniku poole.",
  },
];

const FAQ_EN = [
  {
    q: "What is Namechecker?",
    a: "Namechecker is a free tool that checks business name availability from four sources simultaneously: the Estonian Business Registry, EPA trademark register, domain registries (.ee, .com, .eu, .io) and social media (Facebook, Instagram, LinkedIn).",
  },
  {
    q: "Is it free to use?",
    a: "Yes, the core features are completely free with unlimited searches.",
  },
  {
    q: "How fast are the results?",
    a: "All four checks run in parallel and results appear in real time – typically within 2–5 seconds.",
  },
  {
    q: "Is nimekontroll.eu suitable for e-residents?",
    a: "Yes. The site is available in both Estonian and English and is ideal for e-residents looking to set up a company in Estonia.",
  },
  {
    q: "What does the trademark check cover?",
    a: "We check the Estonian Patent Office (EPA) trademark register to see if a similar trademark is already registered. For a thorough analysis we recommend consulting a patent attorney.",
  },
];

export default function Home() {
  const { t, lang } = useLang();
  const faq = lang === "et" ? FAQ_ET : FAQ_EN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#065F46] font-bold text-lg">nime</span>
            <span className="bg-[#065F46] text-white font-bold text-lg px-1.5 py-0.5 rounded">
              kontroll
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {t.tagline}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {t.heading}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </div>

        <SearchClient />

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <FeatureCard
            icon="🏛️"
            title={t.feature_ariregister_title}
            desc={t.feature_ariregister_desc}
          />
          <FeatureCard
            icon="™"
            title={t.feature_kaubamargid_title}
            desc={t.feature_kaubamargid_desc}
          />
          <FeatureCard
            icon="🌐"
            title={t.feature_domains_title}
            desc={t.feature_domains_desc}
          />
          <FeatureCard
            icon="📱"
            title={t.feature_social_title}
            desc={t.feature_social_desc}
          />
        </div>

        <section className="mt-16 prose prose-sm max-w-none text-muted-foreground">
          <h2 className="text-gray-700 text-lg font-semibold not-prose mb-3">
            {t.how_title}
          </h2>
          <p>{t.how_p1}</p>
          <p className="mt-2">
            {t.how_p2_prefix}
            <strong>{t.how_p2_bold}</strong>
            {t.how_p2_suffix}
          </p>
        </section>

        <section className="mt-12 space-y-4">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group border border-gray-100 rounded-lg bg-white px-5 py-4 cursor-pointer"
            >
              <summary className="font-semibold text-sm text-gray-800 list-none flex justify-between items-center">
                {item.q}
                <span className="text-[#065F46] group-open:rotate-45 transition-transform text-lg leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </section>
      </main>

      <footer className="border-t bg-white mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>{t.footer_copyright}</p>
          <p>
            {t.footer_domain_links}{" "}
            <a
              href="https://www.zone.ee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#065F46]"
            >
              Zone.ee
            </a>{" "}
            &amp;{" "}
            <a
              href="https://www.namecheap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#065F46]"
            >
              Namecheap
            </a>
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {t.footer_disclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-800 text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
    </div>
  );
}
