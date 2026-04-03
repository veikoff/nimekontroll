import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kuidas toimib ärinime kontroll? – nimekontroll.eu",
  description:
    "Nimekontroll kontrollib ärinime kättesaadavust korraga neljast allikast: Eesti äriregistrist, EPA kaubamärgiregistrist, domeeniregistritest ja sotsiaalmeediast. Tasuta ja kohene tulemus.",
  keywords: [
    "ärinime kontroll",
    "OÜ nimi kontroll",
    "vaba ärinimi Eesti",
    "äriregistri otsing",
    "kaubamärgi kontroll Eesti",
    "domeeni kontroll Eesti",
    "OÜ asutamine nimi",
    "ärinime kättesaadavus",
    "äriregistri nime kontroll",
    "kuidas kontrollida ärinime",
  ],
  openGraph: {
    title: "Kuidas toimib ärinime kontroll? – nimekontroll.eu",
    description:
      "Kontrolli ärinime kättesaadavust korraga äriregistrist, kaubamärgiregistrist, domeeniregistritest ja sotsiaalmeediast. Tasuta.",
    locale: "et_EE",
    type: "website",
  },
  alternates: {
    canonical: "https://nimekontroll.eu/kuidas-toimib",
  },
};

const FAQ = [
  {
    q: "Mida tähendab, et nimi on 'sarnane'?",
    a: "Äriregister nõuab, et nimi oleks piisavalt eristuv kõigist juba registreeritud nimedest. Näiteks kui registris on 'Nordic Consulting OÜ', võidakse tagasi lükata ka 'Nordic Consultants OÜ'. Nimekontroll märgib sarnased nimed kollase hoiatusega.",
  },
  {
    q: "Miks on domeeni kontroll oluline?",
    a: "Pärast OÜ asutamist on keerukas muuta oma brändi nime, kui sobiv domeen on juba kellegi teise käes. Domeenispekulandid jälgivad uusi äriregistreeringuid ja registreerivad vabu domeene kiiresti. Kontrolli ja registreeri domeen enne ettevõtte asutamist.",
  },
  {
    q: "Mida tähendab kaubamärgi kontroll?",
    a: "Äriregistrist läbi saanud nimi võib siiski rikkuda registreeritud kaubamärki. Eesti Patendiamet (EPA) peab eraldi kaubamärgiregistrit. Nimekontroll otsib sealt nii täpseid vastet kui sarnaseid kaubamärke.",
  },
  {
    q: "Kas tulemused on alati 100% täpsed?",
    a: "Äriregistri ja EPA andmed on reaalajas ning usaldusväärsed. Sotsiaalmeedia kontroll põhineb avalikele profiililehtedele tehtud päringutel – mõni platvorm võib tulemuse blokeerida. Domeenide puhul kasutame ametlikke RDAP ja DNS protokolle.",
  },
  {
    q: "Kas kasutamine on tasuta?",
    a: "Jah, kõik põhifunktsioonid on täiesti tasuta ja piiramatu kasutusega. Tulu teenime domeeni affiliate linkidest – kui registreerid domeeni meie lingi kaudu, saame väikese komisjonitasu, sinu jaoks hind ei muutu.",
  },
  {
    q: "Kas tulemused salvestatakse?",
    a: "Nimekontroll ei salvesta isikuandmeid ega otsinguid. Tulemused arvutatakse iga kord reaalajas pärast otsingu käivitamist. Shareable URL töötab parameetrina – leht ise andmeid ei hoia.",
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
  name: "Kuidas kontrollida ärinime kättesaadavust",
  description:
    "Nimekontroll kontrollib ärinime korraga neljast allikast: äriregister, kaubamärgiregister, domeenid ja sotsiaalmeedia.",
  step: [
    {
      "@type": "HowToStep",
      name: "Sisesta ärinimi",
      text: "Sisesta soovitud ärinimi otsinguväljale. Nimi võib olla eesti või inglise keeles.",
    },
    {
      "@type": "HowToStep",
      name: "Kontrollimine käivitub automaatselt",
      text: "Kõik neli kontrolli käivituvad paralleelselt: äriregister, EPA kaubamärgiregister, domeenid (.ee, .com, .eu, .io) ja sotsiaalmeedia (Facebook, Instagram, LinkedIn).",
    },
    {
      "@type": "HowToStep",
      name: "Vaata tulemusi reaalajas",
      text: "Tulemused ilmuvad ükshaaval, tavaliselt 2–5 sekundi jooksul. Roheline linnuke tähendab vaba, punane X tähendab võetud, kollane hoiatus tähendab sarnane olemas.",
    },
    {
      "@type": "HowToStep",
      name: "Registreeri domeen",
      text: "Kui domeen on vaba, registreeri see kohe Zone.ee või Namecheap kaudu. Domeenispekulandid on kiired.",
    },
  ],
};

export default function KuidasToimbPage() {
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
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-[#065F46] transition-colors"
          >
            ← Kontrolli nime
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">

        {/* Hero */}
        <section className="py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Kuidas toimib ärinime kontroll?
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Nimekontroll kontrollib sinu ärinime kättesaadavust korraga{" "}
            <strong className="text-gray-700">neljast ametlikust allikast</strong> — äriregistrist,
            kaubamärgiregistrist, domeeniregistritest ja sotsiaalmeediast. Tasuta, kohene, ilma
            registreerimiseta.
          </p>
        </section>

        {/* How it works – 4 steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Neli sammu tulemuseni
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Kogu protsess võtab alla 5 sekundi.
          </p>
          <div className="relative">
            <div className="hidden sm:block absolute left-6 top-8 bottom-8 w-0.5 bg-gray-100" />
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Sisesta ärinimi",
                  desc: "Kirjuta otsinguväljale nimi, mida kaalud. Nimi võib olla eesti või inglise keeles – Eesti äriregistris on ingliskeelsed nimed lubatud.",
                },
                {
                  step: "2",
                  title: "Kõik kontrollid käivituvad korraga",
                  desc: "Nimekontroll saadab paralleelselt päringud äriregistrile, EPA kaubamärgiregistrile, domeeniregistritele ja sotsiaalmeedia platvormidele. Sa ei pea ootama ühe kontrolli lõppu, et järgmine algaks.",
                },
                {
                  step: "3",
                  title: "Tulemused ilmuvad reaalajas",
                  desc: "Iga allikas kuvab tulemuse kohe, kui vastus saabub. Roheline linnuke = vaba. Punane X = võetud. Kollane hoiatus = sarnane nimi olemas, kaaluda tasub hoolikalt.",
                },
                {
                  step: "4",
                  title: "Tegutse kohe",
                  desc: "Kui nimi on vaba, registreeri domeen viivitamatult. Äriregistri kanne võtab aega, kuid domeen võib tundide jooksul ära minna. Kaubamärgi konflikti korral soovitame pöörduda patendivoliniku poole.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 sm:gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#065F46] text-white font-bold text-lg flex items-center justify-center z-10">
                    {item.step}
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sources detail */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Millistest allikatest kontrollime?
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Kõik neli allikat on ametlikud ja ajakohased.
          </p>
          <div className="space-y-4">
            {[
              {
                icon: "🏛️",
                title: "Eesti äriregister",
                source: "ariregister.rik.ee",
                desc: "Kontrollime Registrite ja Infosüsteemide Keskuse (RIK) äriregistri API kaudu, kas sobitotuv nimi on juba registreeritud. Näitame nii täpseid vasteid kui sarnaseid nimesid – äriregister nõuab, et nimi oleks piisavalt eristuv kõigist olemasolevatest.",
              },
              {
                icon: "™",
                title: "Kaubamärgiregister (EPA)",
                source: "andmebaas.epa.ee",
                desc: "Eesti Patendiamet (EPA) haldab kaubamärgiregistrit eraldi äriregistrist. Nimi, mis on äriregistris vaba, võib olla kaubamärgina kaitstud. Kontrollime mõlemaid – aktiivseid täpseid vasteid ja sarnaseid kaubamärke, mis on veel menetluses.",
              },
              {
                icon: "🌐",
                title: "Domeenid (.ee · .com · .eu · .io)",
                source: "Zone.ee · Namecheap",
                desc: "Kontrollime nelja levinumat domeenitsooni paralleelselt. .ee domeenid Zone.ee kaudu, rahvusvahelised Namecheap kaudu. Vaba domeeni kõrval näitame otselinki registreerimiseks. Hind kuvatakse .ee domeeni puhul Zone.ee tegelike hindadega.",
              },
              {
                icon: "📱",
                title: "Sotsiaalmeedia kasutajanimed",
                source: "Facebook · Instagram · LinkedIn",
                desc: "Kontrollime, kas sinu ärinimi on kättesaadav kasutajanimena kolmel peamisel platvormil. Ühtne kasutajanimi kõigil kanalitel on professionaalse brändi alus. Kontroll põhineb avalike profiililehtede HTTP vastusekoodidel.",
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

        {/* Why check */}
        <section className="mb-16 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Miks kontrollida enne ettevõtte asutamist?
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Eesti äriregistris registreeritakse igal aastal üle{" "}
              <strong className="text-gray-700">20 000 uue ettevõtte</strong>. Märkimisväärne osa
              taotlustest lükatakse tagasi nimega seotud probleemide tõttu – nimi on juba võetud,
              liiga sarnane olemasolevaga või vastuolus registreeritud kaubamärgiga.
            </p>
            <p>
              Tagasilükatud taotlus tähendab ajakadu ja riigilõivu kaotust. Kuid suurem oht on
              brändi lõhestatus:{" "}
              <strong className="text-gray-700">
                ärinimi, millele ei saa sobivat domeeni ega sotsiaalmeedia kasutajanime
              </strong>
              , kahjustab ettevõtte usaldusväärsust kohe alguses.
            </p>
            <p>
              Nimekontroll lahendab kõik neli kontrolli ühe otsinguga, alla 5 sekundiga – ilma
              registreerimiseta ja tasuta.
            </p>
          </div>
        </section>

        {/* Technical note */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tehniline lahendus lühidalt
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: "⚡",
                title: "Paralleelne töötlus",
                desc: "Kõik neli kontrolli käivituvad samaaegselt. Tulemus ilmub kohe, kui vastus saabub – ei pea ootama kõigi lõppu.",
              },
              {
                icon: "🔄",
                title: "Reaalajas andmed",
                desc: "Päringud tehakse otse ametlikele registritele igal otsingul. Andmed on alati ajakohased.",
              },
              {
                icon: "🔗",
                title: "Jagatav link",
                desc: "Iga otsing genereerib unikaalse URL-i. Saad tulemused kolleegile jagada – ta näeb täpselt samu andmeid.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Korduma kippuvad küsimused
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

        {/* CTA */}
        <section className="mb-16 bg-[#065F46] rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Proovi ise – alla 5 sekundi
          </h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            Sisesta ärinimi ja kontrolli korraga äriregistrit, kaubamärke, domeene ja sotsiaalmeediakontosid.
            Tasuta, kohene, ilma registreerimiseta.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#065F46] font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Kontrolli ärinime →
          </Link>
        </section>

      </main>

      <footer className="border-t bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>© 2025 nimekontroll.eu – Tasuta ärinime kättesaadavuse kontrollija</p>
          <div className="flex items-center gap-4">
            <Link href="/e-resident" className="hover:text-[#065F46] transition-colors text-xs">
              For e-residents →
            </Link>
            <Link href="/" className="hover:text-[#065F46] transition-colors">
              ← Tagasi avalehele
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
