# Design — SEO ranking #1 per Gelateria Orso Bianco

**Data**: 2026-04-08
**Stato**: Approvato (in attesa review utente sullo spec)
**Owner**: ibob92
**Obiettivo**: portare il sito al primo risultato Google per le query local prioritarie ("gelateria Castiglione della Pescaia", "miglior gelato Maremma") e per le query branded ("Orso Bianco gelateria"), con il minimo effort manuale lato utente.

---

## Vincoli decisi in fase di brainstorming

- **Single page**: nessuna nuova pagina interna, nessun blog
- **Lingua**: solo italiano (no versione EN)
- **Modifiche visibili**: una sola — la nuova sezione "Orari & Come Trovarci"
- **Dominio**: migrazione a `gelateriaorsobianco.it` (registrato dall'utente)
- **Search Engine**: solo Google Search Console (no Bing Webmaster)
- **Google Business Profile**: checklist minimale 1 pagina per Carmine (5 azioni una tantum)
- **Effort utente totale**: ≤15 minuti
- **Approccio**: Approccio B "Single Page Density" potenziato con elementi minimal di Approccio C

---

## 1. Modifica visibile sul sito

### 1.1 Nuova sezione "Orari & Come Trovarci"

Posizionata fra la sezione contatti (Sanremo + Instagram + Map) e la rassegna stampa.

**Layout**: 2 colonne md+, stack mobile, coerente con il design system esistente.

**Colonna sinistra — Orari**:
- Eyebrow gold "Orari di apertura"
- Heading serif "Vieni a trovarci"
- Due tabelle affiancate o stacked: **Estate** (giugno-settembre) e **Inverno** (ottobre-maggio). Le tabelle in sé sono statiche (Server Component), così il contenuto è SEO-indicizzabile.
- **Componente client `<OpeningStatus />`** (unico Client Component nuovo) che gestisce:
  - Highlight del giorno corrente (background `accent-light` sulla riga della tabella giusta)
  - Badge "Aperto adesso" (verde) / "Chiuso ora" (grigio)
  - Calcolo via `Intl.DateTimeFormat` con `timeZone: "Europe/Rome"` al mount
  - Rendering condizionale: il contenuto statico degli orari resta SSR e SEO-visibile; gli elementi dinamici (badge + highlight) appaiono dopo l'hydration senza causare CLS (prenotano lo spazio con `opacity-0` → `opacity-100`).

**Colonna destra — Come trovarci**:
- Card minimale con:
  - Indirizzo completo: "Via Roma 10-12, 58043 Castiglione della Pescaia (GR)"
  - Telefono cliccabile: `tel:+390564934656`
  - 2 micro-indicazioni di reperibilità (es. "a 3 min a piedi dal porto", "sul lungomare")
  - Bottone "Indicazioni stradali" → link Google Maps esterno

### 1.2 Cosa NON cambia
- Hero, H1, copy esistenti
- Sezioni storia, gusti, Sanremo, press
- Palette, tipografia, layout generale
- Componenti `HeroSection`, `GustoCard`, `InstagramFeed`, `MapCard`, `Footer`, `Navbar`

### 1.3 Dato aperto: orari reali
Gli orari estivi/invernali esatti **non sono noti al momento**. Verranno richiesti all'utente in fase di implementazione (placeholder fino a quel momento). Default tentativo:
- Estate: tutti i giorni 10:00-24:00
- Inverno: ven-dom 14:00-19:00, lun-gio chiuso

---

## 2. Lavoro tecnico invisibile

### 2.1 Ottimizzazione immagini

**File coinvolti**:
- `public/gelato-hero.png` (2.3 MB)
- `public/gusto-pistacchio.png` (2.9 MB)
- `public/gusto-limone.png` (2.6 MB)
- `public/gusto-caramello.png` (2.8 MB)

**Strategia**:
- Conversione in WebP via `cwebp -q 85` (qualità visiva indistinguibile)
- Output stimato: 250-400 KB per file
- Risparmio totale: da 10.6 MB a ~1.2-1.5 MB (-87%)
- Aggiornamento di tutti i `src` nei componenti che le referenziano:
  - `components/HeroSection.tsx`
  - `app/page.tsx` (gustiData)
- Aggiunta di `priority` + `fetchPriority="high"` solo all'hero image (per migliorare LCP)
- Le altre immagini restano lazy loaded come oggi
- I file PNG originali vengono **rimossi** dal repo (Git ne conserva la storia, sono recuperabili)

**KPI atteso**: LCP da ~3.2s a ~1.4s su 4G mobile.

### 2.2 File SEO infrastructure

**Nuovi file da creare**:

#### `app/sitemap.ts`
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gelateriaorsobianco.it",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
```
Servito automaticamente da Next come `/sitemap.xml`.

#### `app/robots.ts`
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://gelateriaorsobianco.it/sitemap.xml",
    host: "https://gelateriaorsobianco.it",
  };
}
```
Servito come `/robots.txt`.

### 2.3 Espansione JSON-LD (in `app/page.tsx`)

Sostituire l'attuale singolo `IceCreamShop` con un grafo `@graph` strutturato che contiene 5 entità linkate via `@id`:

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://gelateriaorsobianco.it/#org",
      "name": "Gelateria Orso Bianco",
      "founder": [
        { "@id": "https://gelateriaorsobianco.it/#carmine" },
        { "@id": "https://gelateriaorsobianco.it/#sara" }
      ],
      "foundingDate": "1974",
      "logo": "https://gelateriaorsobianco.it/logo.png",
      "url": "https://gelateriaorsobianco.it"
    },
    {
      "@type": "Person",
      "@id": "https://gelateriaorsobianco.it/#carmine",
      "name": "Carmine Marsella",
      "jobTitle": "Titolare e gelatiere",
      "worksFor": { "@id": "https://gelateriaorsobianco.it/#org" }
    },
    {
      "@type": "Person",
      "@id": "https://gelateriaorsobianco.it/#sara",
      "name": "Sara Masci",
      "jobTitle": "Titolare",
      "worksFor": { "@id": "https://gelateriaorsobianco.it/#org" }
    },
    {
      "@type": "WebSite",
      "@id": "https://gelateriaorsobianco.it/#site",
      "url": "https://gelateriaorsobianco.it",
      "name": "Gelateria Orso Bianco",
      "publisher": { "@id": "https://gelateriaorsobianco.it/#org" },
      "inLanguage": "it-IT"
    },
    {
      "@type": "IceCreamShop",
      "@id": "https://gelateriaorsobianco.it/#shop",
      "name": "Gelateria Orso Bianco",
      "alternateName": "Orso Bianco Gelateria Artigianale",
      "description": "...",
      "url": "https://gelateriaorsobianco.it",
      "telephone": "+39 0564 934656",
      "priceRange": "€",
      "address": { /* PostalAddress */ },
      "geo": { /* GeoCoordinates */ },
      "image": [ /* ...webp images */ ],
      "sameAs": [ /* IG + TripAdvisor */ ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday",...],
          "opens": "10:00",
          "closes": "24:00",
          "validFrom": "2026-06-01",
          "validThrough": "2026-09-30"
        },
        { /* winter spec */ }
      ],
      "hasMenu": {
        "@type": "Menu",
        "name": "Gusti Signature",
        "hasMenuSection": {
          "@type": "MenuSection",
          "name": "Gusti del Gelato Artigianale",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "name": "Pistacchio di Bronte DOP",
              "description": "Tostato a legna e raffinato a pietra..."
            },
            { /* Limone Basilico Ananas */ },
            { /* Caramello al Burro Salato */ }
          ]
        }
      },
      "event": [
        {
          "@type": "Event",
          "name": "Casa Sanremo 2026",
          "startDate": "2026-02-04",
          "endDate": "2026-02-15",
          "location": { /* Casa Sanremo */ },
          "performer": { "@id": "https://gelateriaorsobianco.it/#shop" }
        },
        { /* 2025 */ },
        { /* 2024 */ }
      ],
      "founder": [
        { "@id": "https://gelateriaorsobianco.it/#carmine" },
        { "@id": "https://gelateriaorsobianco.it/#sara" }
      ],
      "foundingDate": "1974",
      "award": [ /* esistenti */ ]
    }
  ]
}
```

**Decisione**: rimuoviamo `aggregateRating` hardcoded (4.6/200). Lo riaggiungiamo solo se l'utente conferma il rating reale TripAdvisor attuale. Senza una fonte verificabile è un rischio (warning Search Console).

**Validazione**: prima di committare il JSON-LD verrà incollato in [validator.schema.org](https://validator.schema.org) per controllare assenza di errori.

### 2.4 Aggiornamento metadata + dominio

**File coinvolti**:
- `app/layout.tsx`
- `app/page.tsx` (jsonLd e metadata title/description)

**Modifiche in `layout.tsx`**:
```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://gelateriaorsobianco.it"),
  title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
  description: /* invariata */,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://gelateriaorsobianco.it",
    /* invariato resto */
  },
  twitter: {
    /* invariato */
  },
  verification: {
    google: "<TOKEN_DA_INSERIRE>",
  },
  /* keywords + robots invariati */
};
```

**Sostituzioni globali**: tutti gli URL hardcoded `https://orso-bianco.vercel.app` → `https://gelateriaorsobianco.it` (in `page.tsx`, `layout.tsx`, JSON-LD).

### 2.5 Performance / Core Web Vitals

**In `app/layout.tsx`**:
- Aggiungere `<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous">` se non già presente
- Verificare che i font Google (Noto Serif + Manrope) abbiano `display: 'swap'` (già configurato)

**In `components/HeroSection.tsx`**:
- Aggiungere `priority` (già presente) + `fetchPriority="high"` all'`<Image>` del hero
- Verificare `sizes` corretto per evitare download di immagini troppo grandi

**KPI target Lighthouse mobile**:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- LCP: <1.8s
- CLS: 0
- INP: <200ms

### 2.6 Security headers

**In `next.config.ts`**:
```ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};
```

---

## 3. Migrazione dominio (effort utente: ~5 min)

1. Su Vercel → progetto `orso-bianco` → Settings → Domains → "Add Domain"
2. Inserire `gelateriaorsobianco.it` E `www.gelateriaorsobianco.it` (entrambi)
3. Vercel mostra i record DNS richiesti:
   - **Apex** (gelateriaorsobianco.it): `A 76.76.21.21`
   - **WWW**: `CNAME cname.vercel-dns.com`
4. Sul registrar del dominio (Aruba/Namecheap/altro) → DNS Manager → aggiungere i due record
5. Attendere la propagazione (5-30 min). Vercel emette automaticamente il certificato HTTPS Let's Encrypt
6. Tornare su Vercel → Settings → Domains → impostare `gelateriaorsobianco.it` come **Primary Domain** (così `.vercel.app` reindirizza con 301)

**Risultato**: il dominio vecchio reindirizza al nuovo, l'autorità eventualmente accumulata viene consolidata.

---

## 4. Google Search Console (effort utente: ~3 min)

1. Aprire [search.google.com/search-console](https://search.google.com/search-console)
2. "Aggiungi proprietà" → tipo **Prefisso URL** → `https://gelateriaorsobianco.it`
3. Metodo di verifica: **Tag HTML** (più semplice del file)
4. Google fornisce un meta tag tipo `<meta name="google-site-verification" content="abc123...">`
5. L'utente copia il `content` (token ~40 char) e lo passa allo sviluppatore
6. Lo sviluppatore lo inserisce in `app/layout.tsx` → `metadata.verification.google`
7. Push → deploy automatico Vercel
8. Tornare su Search Console → click "Verifica" → check verde
9. Search Console → Sitemap → aggiungere `sitemap.xml` → click "Invia"

**Alternativa**: se l'utente preferisce usare il **file HTML**, scarica il file `google<hash>.html`, lo passa al dev che lo committa in `public/`, push, verifica.

---

## 5. Checklist GBP minimale per Carmine

**Output**: file `docs/gbp-checklist-orso-bianco.html` (renderizzabile in PDF via skill `html-report` o `pdf-document`).

**Contenuto** — 1 pagina, 5 azioni una tantum:

1. **Verifica scheda esistente**
   - URL: [business.google.com](https://business.google.com)
   - Cerca "Gelateria Orso Bianco"
   - Se non rivendicata → click "Rivendica questa attività"
   - Verifica: Google manda una cartolina all'indirizzo (~7 giorni)

2. **Imposta categorie corrette**
   - Primaria: **Gelateria**
   - Secondarie: **Bar**, **Caffetteria**

3. **Compila orari completi**
   - Estate (giugno-settembre): orario reale
   - Inverno (ottobre-maggio): orario reale
   - Usa la funzione "orari speciali" per festività

4. **Carica 20 foto in una sola sessione** (~30 min totali)
   - 5 foto esterno/insegna
   - 5 foto interno/banco gusti
   - 5 foto gusti in coppetta/cono (close-up)
   - 3 foto del team al lavoro
   - 2 foto eventi (Sanremo, premi Best in Maremma)

5. **Descrizione 750 caratteri** — testo già scritto pronto da copiare:
   > "Gelateria Orso Bianco — gelato artigianale dal 1974 nel cuore di Castiglione della Pescaia, in Maremma Toscana. Carmine e Sara conducono dal 2013 questa storica gelateria sul lungomare, scegliendo ogni materia prima con ossessione e creando ogni gusto nel loro laboratorio. Quattro premi Best in Maremma, gelateria ufficiale di Casa Sanremo 2024, 2025 e 2026. I nostri gusti signature: Pistacchio di Bronte DOP, Limone Basilico e Ananas, Caramello al Burro Salato, Pompelmo Rosa e Champagne. Vi aspettiamo in Via Roma 10-12, sul lungomare." [≤750 caratteri]

**Niente Google Posts settimanali, niente Q&A seeding, niente review solicitation strutturata**. Solo i fondamentali. Coprono ~70% dell'impatto local SEO della GBP.

---

## 6. Sequenza operativa di implementazione

L'implementazione vera e propria sarà dettagliata nel plan (writing-plans skill). Sequenza ad alto livello:

1. **Conversione immagini** (locale, no commit) → verifica visiva → commit
2. **Espansione JSON-LD** in `page.tsx` (validato su validator.schema.org) → commit
3. **`app/sitemap.ts` + `app/robots.ts`** → commit
4. **Sezione "Orari & Come Trovarci"** in `page.tsx` (placeholder orari) → commit
5. **Update metadata + dominio** in `layout.tsx` e `page.tsx` → commit
6. **Security headers** in `next.config.ts` → commit
7. **Generazione checklist GBP** HTML/PDF → commit in `docs/`
8. **Push tutto su main** → deploy Vercel automatico
9. **Stop: richiesta utente** per orari reali estate/inverno + token GSC + conferma rating TripAdvisor
10. **Update finale** con i dati reali → commit → push
11. **Utente esegue** collegamento dominio + verifica GSC + invio sitemap

---

## 7. Cosa resta esplicitamente fuori scope

- Bing Webmaster Tools
- Audit NAP esteso (>5 directory)
- Blog / nuove pagine interne
- Wikipedia entry
- Outreach link building
- Versione English
- Google Posts ricorrenti (parte di GBP "completa")
- Review solicitation flow strutturato

Queste cose sono **Fase 2**, da valutare dopo i primi risultati di ranking.

---

## 8. Risultati attesi

| Tempo | Risultato |
|---|---|
| Giorno 0 | Sito tecnicamente perfetto, schema ricco, performance top |
| Giorno 0-1 | Setup utente completato (dominio + GSC) |
| Giorno 3-14 | Indicizzazione Google iniziale, prime impression |
| Settimana 2-4 | Top 1 per query branded ("orso bianco gelateria") |
| Settimana 4-8 | Top 5 (no GBP) o top 3 (con GBP) per "gelateria castiglione della pescaia" |
| Mese 2-3 | Stabilizzazione long-tail |

**Per arrivare *davvero* al #1 su query local non branded**: il sito perfetto + GBP ottimizzata = ~80% del lavoro. Il restante 20% sono recensioni nuove ricorrenti e backlink organici (questi ultimi arrivano da soli grazie alla press Sanremo).

---

## 9. Decisioni aperte da chiudere durante l'implementazione

| # | Decisione | Quando |
|---|---|---|
| 1 | Orari estivi reali | Prima di scrivere la sezione + JSON-LD |
| 2 | Orari invernali reali | Stessa cosa |
| 3 | Mantenere o rimuovere `aggregateRating`? Se mantenere, qual è il valore reale TripAdvisor? | Prima del commit JSON-LD |
| 4 | Token Google Search Console | Dopo la creazione della proprietà |
| 5 | "Indicazioni stradali rapide" — quali 2 landmark scegliere per la card "Come trovarci"? | In fase di scrittura della sezione |

---

## 10. Definition of Done

- [ ] Tutte le immagini PNG sostituite con WebP, totale public/ <2 MB
- [ ] `app/sitemap.ts` e `app/robots.ts` esistono e ritornano dati corretti
- [ ] Schema JSON-LD valida senza errori su validator.schema.org
- [ ] Lighthouse mobile: Performance 95+, SEO 100, Best Practices 100, Accessibility 100
- [ ] Sezione "Orari & Come Trovarci" visibile, responsive, con badge stato dinamico
- [ ] Tutti gli URL hardcoded migrati a `gelateriaorsobianco.it`
- [ ] Security headers presenti (verifica via `curl -I`)
- [ ] Checklist GBP generata e committata in `docs/`
- [ ] Dominio collegato a Vercel come Primary
- [ ] Search Console verificata, sitemap inviata, prima impression ricevuta
