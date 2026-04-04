import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Privaatsuspoliitika – nimekontroll.eu",
  description:
    "Nimekontroll.eu privaatsuspoliitika. Selgitame, milliseid andmeid kogume, kuidas neid kasutame ja millised on sinu õigused.",
  robots: { index: true, follow: true },
};

export default function PrivaatsusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo href="/" />
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-[#065F46] transition-colors"
          >
            ← Tagasi avalehele
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privaatsuspoliitika</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Viimati uuendatud: aprill 2026
        </p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Üldine</h2>
            <p>
              Nimekontroll.eu (&ldquo;meie&rdquo;, &ldquo;teenus&rdquo;) on tasuta ärinime
              kättesaadavuse kontrollimise tööriist. Käesolev privaatsuspoliitika selgitab, milliseid
              andmeid me kogume, kuidas neid kasutame ning millised on sinu õigused vastavalt Euroopa
              Liidu isikuandmete kaitse üldmäärusele (GDPR, määrus 2016/679).
            </p>
            <p className="mt-2">
              Teenuse kasutamisega nõustud käesoleva poliitikaga. Kui sul on küsimusi, võta meiega
              ühendust: <strong>info@nimekontroll.eu</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Milliseid andmeid kogume?</h2>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.1 Andmed, mida me EI salvesta</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Otsingupäringuid (ärinimesid, mida kontrollid) ei salvestata meie andmebaasi</li>
              <li>Kasutajakontosid ei ole — me ei kogu nimesid, e-posti ega muid isikuandmeid tavakasutuses</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.2 Andmed, mida töötleme automaatselt</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>IP-aadress</strong> — salvestatakse ajutiselt (kuni 60 sekundit) Upstash
                Redis teenuses ainult päringulimiidi (rate limiting) jõustamiseks. Maksimaalselt 10
                otsingut minutis IP-aadressi kohta. Andmeid ei analüüsita ega seostata kasutajaga.
              </li>
              <li>
                <strong>Keeleseadistus</strong> — salvestatakse sinu brauseri localStorage&apos;is
                (mitte meie serverites). See on tehniline valik, mis jääb sinu seadmesse.
              </li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.3 Kolmandad osapooled</h3>
            <p>Teenuse toimimiseks teeme päringuid järgmistele ametlikele allikatele:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Registrite ja Infosüsteemide Keskus (RIK) — äriregistri andmed</li>
              <li>Eesti Patendiamet (EPA) — kaubamärgiregistri andmed</li>
              <li>Zone.ee ja Namecheap — domeenide kättesaadavus</li>
              <li>Facebook, Instagram, LinkedIn — sotsiaalmeedia kasutajanimede kontroll</li>
            </ul>
            <p className="mt-2">
              Need päringud tehakse sinu otsingu alusel, kuid me ei edasta neile sinu isikuandmeid.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Küpsised (cookies)</h2>
            <p>
              Nimekontroll.eu ei kasuta jälgimisküpsiseid. Keeleseadistus salvestatakse brauseri{" "}
              <strong>localStorage</strong>&apos;is — see ei ole küpsis ega saadeta meie serveritele.
            </p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">3.1 Google AdSense</h3>
            <p>
              Kasutame Google AdSense&apos;i reklaami kuvamiseks. Google võib kasutada küpsiseid ja
              sarnaseid tehnoloogiaid reklaamide isikupärastamiseks. Google&apos;i privaatsuspoliitika
              kehtib Google&apos;i teenuste kohta:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#065F46] hover:underline"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
            <p className="mt-2">
              Saad Google&apos;i reklaamiküpsiseid hallata:{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#065F46] hover:underline"
              >
                adssettings.google.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Affiliate lingid</h2>
            <p>
              Domeenide registreerimise lingid on affiliate lingid — kui registreerid domeeni meie
              lingi kaudu, saame väikese komisjonitasu. Sinu jaoks hind ei muutu.
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Namecheap</strong> — affiliate programmi haldab Impact.com. Klõpsu
                jälgimiseks võib Impact.com salvestada küpsise. Impact.com privaatsuspoliitika:{" "}
                <a
                  href="https://impact.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#065F46] hover:underline"
                >
                  impact.com/privacy-policy
                </a>
              </li>
              <li>
                <strong>Zone.ee</strong> — Zone.ee affiliate programm. Zone.ee privaatsuspoliitika
                kehtib nende teenuste kohta.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Andmete säilitamine ja turvalisus
            </h2>
            <p>
              IP-aadressid kustutatakse Upstash Redis&apos;est automaatselt 60 sekundi jooksul pärast
              salvestamist. Upstash töötleb andmeid EU piirkonnas ja on GDPR-iga kooskõlas.
            </p>
            <p className="mt-2">
              Teenus töötab Vercel platvormil, mis on samuti GDPR-iga kooskõlas ja kasutab EU
              andmekeskusi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Sinu õigused (GDPR)</h2>
            <p>
              Kuna me ei salvesta isikuandmeid tavakasutuses, puudub meil andmesubjektide register.
              Kui sul on siiski küsimusi oma andmete kohta, on sul GDPR alusel õigus:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Saada teavet, milliseid andmeid me sinu kohta omame</li>
              <li>Nõuda andmete parandamist või kustutamist</li>
              <li>Esitada kaebus Andmekaitse Inspektsioonile (aki.ee)</li>
            </ul>
            <p className="mt-2">
              Kontakt: <strong>info@nimekontroll.eu</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Muudatused</h2>
            <p>
              Jätame endale õiguse käesolevat privaatsuspoliitikat uuendada. Oluliste muudatuste
              korral uuendame lehe allosas kuupäeva. Soovitame poliitikat aeg-ajalt üle vaadata.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 nimekontroll.eu</p>
          <Link href="/" className="hover:text-[#065F46] transition-colors">
            ← Tagasi avalehele
          </Link>
        </div>
      </footer>
    </div>
  );
}
