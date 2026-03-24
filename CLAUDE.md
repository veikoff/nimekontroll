# Nimekontroll – Eesti Ärinime Kättesaadavuse Kontrollija

## Projekti ülevaade
Tööriist mis kontrollib ärinime kättesaadavust korraga
kõigist olulistest registritest ja platvormidest.
Sihtrühm: OÜ asutajad, FIE-d, e-residendid, startup asutajad.

Domeen: nimekontroll.ee (registreeritakse hiljem)
Hosting: Vercel (tasuta)
Eesmärk: passiivne tulu domeeni affiliate linkidest +
         premium funktsioonid

## Tehniline stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui komponendid
- Vercel (hosting, tasuta)
- Upstash Redis (rate limiting, tasuta tier)

## Ärimudel
### Tasuta:
- Piiramatu kontrollid
- Kõik allikad

### Tulu allikad (PASSIIVNE):
1. Domeeni affiliate: Zone.ee, Name.ee, Namecheap
   Kasutaja klõpsab ".ee domeen on vaba" ->
   läheb Zone.ee affiliate lingile ->
   sina saad €3-8 komisjoni
2. Reklaam: Google AdSense (sidebar)
3. Premium €5/kuus: bulk kontroll (kuni 10 nime korraga),
   ajalugu, eksport CSV

## Kontrollitavad allikad

### 1. Eesti Äriregister
- API: https://ariregister.rik.ee/est/api
- Kontrolli: kas täpne nimi on registreeritud
- Näita: registreeritud ettevõtete arv sarnase nimega

### 2. Domeenid (kõige tähtsam affiliate allikas!)
Kontrolli järgmisi domeeni laiendeid:
- .ee (Zone.ee API või WHOIS)
- .com (Namecheap API)
- .eu
- .io
- .co
Iga vaba domeeni kõrval: [Registreeri €X/a] affiliate nupp

### 3. Eesti Kaubamärgiregister
- URL: https://www.epa.ee/et/kaubamargid
- Kontrolli: kas sarnane kaubamärk on registreeritud
- Kui täpset API-t pole: scraped otsing või
  suuna kasutaja otse koos eeltäidetud otsinguga

### 4. Sotsiaalmeedia
Kontrolli kasutajanime kättesaadavust:
- Facebook (facebook.com/NIMI)
- Instagram (instagram.com/NIMI)
- LinkedIn (linkedin.com/company/NIMI)
- X/Twitter (x.com/NIMI)
Meetod: HTTP HEAD request -> 404 = vaba, 200 = võetud

## Lehekülje struktuur

### / – Pealeht (kõik ühel lehel!)
- Suur otsinguväli keskel: "Sisesta ärinimi..."
- Nupp: "Kontrolli kättesaadavust"
- Allpool: tulemused reaalajas (iga allikas laadib eraldi)
- Näidistulemused lehe allosas (SEO jaoks)

### /tulemused/[nimi] – Tulemuste leht
- Shareable URL (kasutaja saab jagada)
- Kõigi allikate tulemused
- Affiliate lingid domeenide juures
- "Kontrolli uut nime" nupp

### /kuidas-toimib – Selgitusleht (SEO!)
### /e-residendile – Ingliskeelne landing page

## UI/UX Disain
- Modernne, puhas, minimaalne
- Peamine värv: tumeroheline (#065F46)
- Iga kontrollitav allikas:
  Roheline linnuke = VABA
  Punane X = VÕETUD
  Kollane = SARNANE OLEMAS
  Spinner = kontrollimine käib...
- Tulemused laadivad PARALLEELSELT (mitte järjest)
- Mobile-first

## Tehniline implementatsioon

### Paralleelne kontroll (TÄHTIS!)
Kõik kontrollid käivituvad KORRAGA:
```typescript
const results = await Promise.allSettled([
  checkAriregister(name),
  checkDomains(name),
  checkKaubamargid(name),
  checkSocialMedia(name),
])
```

### Rate limiting
- Upstash Redis: max 10 kontrolli minutis per IP

### Caching
- Tulemused cache'ita 24h (Redis)
- Sama nimi -> kohene vastus ilma uue API päringuta

### API Route struktuur
- /api/check/ariregister
- /api/check/domains
- /api/check/kaubamargid
- /api/check/social

## SEO Nõuded
Sihitud märksõnad:
- "ärinime kontroll"
- "OÜ nimi kontroll"
- "vaba ärinimi Eesti"
- "e-residency company name check"
- "Estonian company name availability"

Iga leht sisaldab:
- Struktureeritud FAQ (JSON-LD)
- Selgitav tekst (200+ sõna)
- Meta description eesti + inglise keeles

## LLM-sõbralikkus
- /public/llms.txt
- /public/robots.txt (luba kõik AI crawlerid)
- Automaatne sitemap.xml (next-sitemap)

## Turvalisus
- Rate limiting (Upstash Redis)
- Input sanitization (ainult tähed, numbrid, sidekriipsud)
- Max nime pikkus: 100 tähemärki

## Faasid

### Faas 1 – MVP (1 nädalavahetus):
- Äriregister kontroll
- Domeenid (.ee, .com, .eu, .io)
- Sotsiaalmeedia (Facebook, Instagram, LinkedIn)
- Affiliate lingid domeenidele
- Lihtne ühe-lehe disain

### Faas 2 (2. nädalavahetus):
- Kaubamärgiregister
- Tulemuste shareable URL (/tulemused/[nimi])
- Google AdSense
- Ingliskeelne versioon e-residendile

### Faas 3 (hiljem):
- Bulk kontroll (Premium €5/kuus)
- Email alert kui nimi vabaneb
- API ligipääs arendajatele

## Käivitamine
npm run dev    -> localhost:3000
npm run build  -> production build
vercel deploy  -> live

## Keskkonnamuutujad (.env.local)
NAMECHEAP_API_KEY=
NAMECHEAP_API_USER=
ZONE_AFFILIATE_ID=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
