import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18nContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Nimekontroll – Ärinime kontrollija | Äriregister · Kaubamärgid · Domeenid",
  description:
    "Kontrolli ärinime kättesaadavust tasuta – ühe otsinguga kontrollime Eesti äriregistrit, EPA kaubamärgiregistrit, domeene (.ee, .com, .eu, .io) ja sotsiaalmeediat. Ideaalne OÜ asutajatele, FIE-dele ja e-residentidele.",
  keywords: [
    "ärinime kontroll",
    "OÜ nimi kontroll",
    "vaba ärinimi Eesti",
    "kaubamärgi kontroll Eesti",
    "EPA kaubamärgiregister",
    "domeen .ee vaba",
    "äriregistri kontroll",
    "e-residency company name check",
    "Estonian company name availability",
    "trademark check Estonia",
    "Estonian business name checker",
    "check company name Estonia",
  ],
  openGraph: {
    title: "Nimekontroll – Ärinime kontrollija | Äriregister · Kaubamärgid · Domeenid",
    description:
      "Kontrolli ärinime kättesaadavust tasuta. Ühe otsinguga: äriregister, kaubamärgid (EPA), domeenid ja sotsiaalmeedia.",
    locale: "et_EE",
    type: "website",
  },
  alternates: {
    languages: {
      "et-EE": "https://nimekontroll.ee",
      "en-US": "https://nimekontroll.ee",
    },
  },
  robots: { index: true, follow: true },
  other: {
    "Impact-Site-Verification": "1769d722-e977-4e3c-ad5f-8e1850d14906",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="et" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
