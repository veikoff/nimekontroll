import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18nContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Nimekontroll – Eesti ärinime kättesaadavuse kontrollija",
  description:
    "Kontrolli ärinime kättesaadavust korraga kõigist olulistest registritest: Eesti Äriregister, domeenid (.ee, .com, .eu, .io) ja sotsiaalmeedia. Tasuta ja kohene.",
  keywords: [
    "ärinime kontroll",
    "OÜ nimi kontroll",
    "vaba ärinimi Eesti",
    "e-residency company name check",
    "Estonian company name availability",
  ],
  openGraph: {
    title: "Nimekontroll – Eesti ärinime kättesaadavuse kontrollija",
    description:
      "Kontrolli ärinime kättesaadavust korraga kõigist olulistest registritest.",
    locale: "et_EE",
    type: "website",
  },
  robots: { index: true, follow: true },
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
