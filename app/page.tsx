"use client";

import { SearchClient } from "@/components/SearchClient";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLang } from "@/lib/i18nContext";

export default function Home() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
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

      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {t.heading}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            {t.subheading}
          </p>
        </div>

        <SearchClient />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <FeatureCard
            icon="🏛️"
            title={t.feature_ariregister_title}
            desc={t.feature_ariregister_desc}
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
      </main>

      <footer className="border-t bg-white mt-16">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
