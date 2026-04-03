import type { Metadata } from "next";
import Link from "next/link";
import { SearchClient } from "@/components/SearchClient";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Estonian Company Name Check for e-Residents – Free & Instant",
  description:
    "Check if your Estonian OÜ company name is available before you register. Instantly searches the Business Registry, trademark register, domains (.ee, .com) and social media. Free tool for e-residents.",
  keywords: [
    "Estonian company name check",
    "OÜ name availability Estonia",
    "e-residency company name",
    "Estonia business registry search English",
    "Estonian trademark check",
    "check company name Estonia e-resident",
    "Estonian OÜ requirements",
    "e-residency OÜ registration",
    "Estonia company formation name",
    "namechecker Estonia",
  ],
  openGraph: {
    title: "Estonian Company Name Check for e-Residents – Free & Instant",
    description:
      "Check Business Registry, trademarks, domains and social media before registering your Estonian OÜ. Free tool for e-residents.",
    locale: "en_US",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Can I register an Estonian company as an e-resident?",
    a: "Yes. Estonian e-residency gives you access to the EU's digital business environment. You can register and fully manage an OÜ (private limited company) remotely without ever visiting Estonia.",
  },
  {
    q: "What are the naming rules for an Estonian OÜ?",
    a: "Your company name must be unique and sufficiently distinct from existing names in the Business Registry. It cannot be misleading, offensive, or identical to a registered trademark. It can be in any language, including English.",
  },
  {
    q: "What happens if my name is rejected?",
    a: "If the Estonian Business Registry rejects your name, you must choose a new one and resubmit. This costs time and potentially money. Checking availability first avoids this entirely.",
  },
  {
    q: "Do I need to be in Estonia to register a company?",
    a: "No. With an e-resident digital ID, you can register and manage your OÜ entirely online from anywhere in the world. Estonia's business environment is designed for remote entrepreneurs.",
  },
  {
    q: "Can my company name be in English?",
    a: "Yes. Estonian law allows company names in any language, including English. However, the name must still be unique in the Estonian Business Registry.",
  },
  {
    q: "What does 'sufficiently distinct' mean?",
    a: "The Business Registry may reject a name that is too similar to an existing one – even if it is not identical. For example, 'Nordic Tech OÜ' may be rejected if 'NordicTech OÜ' already exists. Our tool flags similar names so you can decide before applying.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to check your Estonian company name as an e-resident",
  step: [
    {
      "@type": "HowToStep",
      name: "Check name availability",
      text: "Enter your desired company name above. We simultaneously check the Estonian Business Registry, EPA trademark register, domains (.ee, .com, .eu, .io) and social media handles.",
    },
    {
      "@type": "HowToStep",
      name: "Register your domain",
      text: "If your preferred domain is available, register it immediately. A matching domain strengthens your brand and is essential for most businesses.",
    },
    {
      "@type": "HowToStep",
      name: "Apply for e-residency",
      text: "Apply for your Estonian e-resident digital ID at e-resident.gov.ee. Processing typically takes 3–8 weeks. You pick up the card at a police station or Estonian embassy.",
    },
    {
      "@type": "HowToStep",
      name: "Register your OÜ",
      text: "Use the Estonian Business Registry portal (ettevõtjaportaal.ee) to register your OÜ online. With a verified name and e-resident digital ID, the process takes under one hour.",
    },
  ],
};

export default function EResidentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#065F46] font-bold text-lg">nime</span>
            <span className="bg-[#065F46] text-white font-bold text-lg px-1.5 py-0.5 rounded">
              kontroll
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">
              Estonian company name checker for e-residents
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">

        {/* Hero */}
        <section className="py-12 sm:py-20 text-center">
          <div className="inline-block bg-[#065F46]/10 text-[#065F46] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            For e-Residents & International Founders
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Check Your Estonian Company Name<br className="hidden sm:block" /> Before You Register
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
            A taken name means a rejected application. One free search checks the{" "}
            <strong className="text-gray-700">Business Registry</strong>,{" "}
            <strong className="text-gray-700">trademark register</strong>,{" "}
            <strong className="text-gray-700">domains</strong> and{" "}
            <strong className="text-gray-700">social media</strong> — instantly.
          </p>
          <SearchClient />
        </section>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground border-y py-4 mb-16">
          <span className="font-medium text-gray-500">Official sources:</span>
          <span>🏛️ ariregister.rik.ee</span>
          <span>™ Eesti Patendiamet (EPA)</span>
          <span>🌐 Zone.ee · Namecheap</span>
          <span>📱 Facebook · Instagram · LinkedIn</span>
        </div>

        {/* Why check first */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Why Check Before Registering?
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Skipping this step is the most common (and most avoidable) mistake when forming an Estonian company.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "❌",
                title: "Application rejected",
                desc: "The Business Registry rejects names already taken or too similar to existing ones. You lose time and potentially the registration fee.",
              },
              {
                icon: "⚖️",
                title: "Trademark conflict",
                desc: "A name that clears the Business Registry can still infringe on a registered trademark. The Estonian Patent Office (EPA) register is a separate check.",
              },
              {
                icon: "🌐",
                title: "Domain already taken",
                desc: "Someone else owns yourcompany.ee or yourcompany.com. Your brand is split across different names online and offline.",
              },
              {
                icon: "📱",
                title: "Social handles unavailable",
                desc: "Your Instagram, LinkedIn and Facebook pages have different names from your company. Looks unprofessional and hurts discoverability.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we check */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            What We Check
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Four official sources, one search, results in seconds.
          </p>
          <div className="space-y-4">
            {[
              {
                icon: "🏛️",
                title: "Estonian Business Registry",
                source: "ariregister.rik.ee",
                desc: 'The authoritative source for company name availability in Estonia. We check for exact matches and similar names. "Sufficiently distinct" is the legal standard — we flag borderline cases so you can decide.',
              },
              {
                icon: "™",
                title: "Trademark Register (EPA)",
                source: "andmebaas.epa.ee",
                desc: "The Estonian Patent Office maintains the national trademark register. A name free in the Business Registry can still conflict with a registered trademark. We check both active exact matches and similar trademarks.",
              },
              {
                icon: "🌐",
                title: "Domains (.ee, .com, .eu, .io)",
                source: "Zone.ee · Namecheap",
                desc: "We check four key domain extensions simultaneously. Available domains show a direct registration link. Securing your domain on day one is strongly recommended — domain squatters monitor new company registrations.",
              },
              {
                icon: "📱",
                title: "Social Media Handles",
                source: "Facebook · Instagram · LinkedIn",
                desc: "We check whether your company name is available as a username on the major platforms. A consistent handle across all channels is essential for a professional brand presence.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex gap-4"
              >
                <div className="text-3xl shrink-0">{item.icon}</div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded">
                      {item.source}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Naming rules */}
        <section className="mb-16 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Estonian OÜ Naming Rules
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              An Estonian <strong className="text-gray-700">OÜ (osaühing)</strong> is a private limited company — the most popular structure for e-residents. The name must meet these requirements:
            </p>
            <ul className="space-y-2 list-none pl-0">
              {[
                "Must be unique and sufficiently distinct from all names already in the Business Registry",
                "Cannot be misleading about the company's activities or legal form",
                "Cannot be identical or confusingly similar to a registered trademark",
                "Can be in any language — English names are fully accepted",
                "Maximum length is not fixed by law, but very long names may be rejected on practical grounds",
                "Must include the legal form designator OÜ (can be at the start or end)",
              ].map((rule) => (
                <li key={rule} className="flex items-start gap-2 text-sm">
                  <span className="text-[#065F46] mt-0.5 shrink-0">✓</span>
                  {rule}
                </li>
              ))}
            </ul>
            <p className="text-sm">
              The registrar applies a <strong className="text-gray-700">&ldquo;sufficiently distinct&rdquo;</strong> standard — not just identical names are rejected. If &ldquo;Nordic Consulting OÜ&rdquo; exists, &ldquo;Nordic Consultants OÜ&rdquo; may also be refused. Our tool flags similar names so you can assess the risk before applying.
            </p>
          </div>
        </section>

        {/* Step by step */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            From Name to Registered Company
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            The full path from idea to a registered Estonian OÜ.
          </p>
          <div className="relative">
            <div className="hidden sm:block absolute left-6 top-8 bottom-8 w-0.5 bg-gray-100" />
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Check name availability",
                  desc: "Use the search above. Check the Business Registry, trademarks, domains and social media in one go. Confirm your name is free on all fronts before committing.",
                  cta: null,
                },
                {
                  step: "2",
                  title: "Register your domain",
                  desc: "As soon as your name is confirmed available, register the domain. Domain squatters monitor new company registrations — don't wait.",
                  cta: null,
                },
                {
                  step: "3",
                  title: "Apply for e-residency",
                  desc: "Apply at e-resident.gov.ee. You'll need a passport photo and a government-issued ID. Processing takes 3–8 weeks. Pick up your card at an Estonian embassy or police station.",
                  cta: { label: "Apply for e-residency →", href: "https://e-resident.gov.ee" },
                },
                {
                  step: "4",
                  title: "Register your OÜ",
                  desc: "Use the Estonian Business Registry portal (ettevõtjaportaal.ee) to register your OÜ online with your e-resident digital ID. State fee is €265. The process takes under one hour.",
                  cta: { label: "Business Registry portal →", href: "https://ettevõtjaportaal.rik.ee" },
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 sm:gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#065F46] text-white font-bold text-lg flex items-center justify-center z-10">
                    {item.step}
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex-1 mb-0">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    {item.cta && (
                      <a
                        href={item.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs font-medium text-[#065F46] hover:underline"
                      >
                        {item.cta.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
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
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mb-16 bg-[#065F46] rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Ready to Check Your Name?
          </h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            It takes 5 seconds. No signup, no cost. Check the Business Registry, trademarks, domains and social media in one go.
          </p>
          <Link
            href="/e-resident"
            className="inline-block bg-white text-[#065F46] font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Check name availability ↑
          </Link>
        </section>

      </main>

      <footer className="border-t bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>© 2025 nimekontroll.eu – Free Estonian business name checker</p>
          <Link href="/" className="hover:text-[#065F46] transition-colors">
            ← Back to main page
          </Link>
        </div>
      </footer>
    </div>
  );
}
