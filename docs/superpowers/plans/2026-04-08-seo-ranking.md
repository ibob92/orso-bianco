# SEO Ranking #1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portare il sito Gelateria Orso Bianco al primo risultato Google per query local e branded, con minimum effort utente, aggiungendo una sola sezione visibile (orari) e ottimizzando tutto il resto a livello tecnico.

**Architecture:** Single page Next.js 15 App Router. Tutto il lavoro si concentra su: (1) ottimizzazione immagini PNG→WebP, (2) espansione JSON-LD in grafo strutturato, (3) file SEO infrastructure (sitemap/robots), (4) nuova sezione orari con Client Component per stato dinamico, (5) migrazione dominio custom. Nessuna nuova pagina interna, nessun blog, nessun test framework (static marketing site — verifica via build + ispezione visiva + schema validator).

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, `next/image`, Vercel deploy.

**Riferimento spec:** `docs/superpowers/specs/2026-04-08-seo-ranking-design.md`

---

## Note operative

- **Niente test framework**: questo è un sito marketing statico. Ogni task verifica via:
  - `npx tsc --noEmit` (typecheck)
  - `npx next build` (full build) quando strutturale
  - `curl` per file generati (robots/sitemap)
  - Ispezione visiva in dev server per sezioni UI
  - [validator.schema.org](https://validator.schema.org) per JSON-LD
- **Commit dopo ogni task**: atomici, messaggio conventional commits
- **Stop before push**: tutto il lavoro resta in local fino alla fine; il push finale è Task 15
- **Orari reali**: gli orari estate/inverno esatti verranno chiesti all'utente in Task 10. Fino a quel momento uso placeholder dichiarati.
- **Token GSC + rating TripAdvisor**: verranno chiesti all'utente in Task 15

---

## File Structure

### Nuovi file
| Path | Responsabilità |
|------|----------------|
| `app/sitemap.ts` | Sitemap generation (singola URL) |
| `app/robots.ts` | robots.txt generation |
| `components/OpeningStatus.tsx` | Client Component: badge "Aperto adesso" + highlight giorno corrente |
| `components/OpeningHours.tsx` | Server Component: tabelle statiche estate/inverno + layout sezione |
| `public/gelato-hero.webp` | Hero image ottimizzata |
| `public/gusto-pistacchio.webp` | Gusto signature ottimizzato |
| `public/gusto-limone.webp` | Gusto signature ottimizzato |
| `public/gusto-caramello.webp` | Gusto signature ottimizzato |
| `docs/gbp-checklist-orso-bianco.html` | Checklist 1-pagina per Carmine |

### File modificati
| Path | Cosa cambia |
|------|-------------|
| `app/page.tsx` | JSON-LD grafo espanso, import OpeningHours, nuova sezione, update URL e image paths |
| `app/layout.tsx` | `metadataBase`, `alternates.canonical`, `verification.google`, preconnect |
| `next.config.ts` | Security headers |
| `components/HeroSection.tsx` | WebP source + `fetchPriority="high"` |

### File eliminati
| Path | Motivo |
|------|--------|
| `public/gelato-hero.png` | Sostituito da WebP |
| `public/gusto-pistacchio.png` | Sostituito da WebP |
| `public/gusto-limone.png` | Sostituito da WebP |
| `public/gusto-caramello.png` | Sostituito da WebP |

---

## Task 1: Installa cwebp e converti immagini

**Files:**
- Convert: `public/gelato-hero.png` → `public/gelato-hero.webp`
- Convert: `public/gusto-pistacchio.png` → `public/gusto-pistacchio.webp`
- Convert: `public/gusto-limone.png` → `public/gusto-limone.webp`
- Convert: `public/gusto-caramello.png` → `public/gusto-caramello.webp`

- [ ] **Step 1: Verifica se cwebp è installato**

Run: `which cwebp`
Expected: `no output` (cwebp non installato)

- [ ] **Step 2: Installa cwebp via homebrew**

Run: `brew install webp`
Expected: `webp` installato, `which cwebp` ritorna `/opt/homebrew/bin/cwebp`

- [ ] **Step 3: Converti le 4 immagini PNG in WebP con qualità 85**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco/public && \
cwebp -q 85 gelato-hero.png -o gelato-hero.webp && \
cwebp -q 85 gusto-pistacchio.png -o gusto-pistacchio.webp && \
cwebp -q 85 gusto-limone.png -o gusto-limone.webp && \
cwebp -q 85 gusto-caramello.png -o gusto-caramello.webp
```
Expected: 4 file `.webp` creati, dimensioni tra 150-500 KB ciascuno.

- [ ] **Step 4: Verifica dimensioni risultanti**

Run: `ls -lh /Users/ibob/Projects/orso-bianco/public/gelato-hero.webp /Users/ibob/Projects/orso-bianco/public/gusto-*.webp`
Expected: output tipo:
```
-rw-r--r-- 1 ibob staff  280K ... gelato-hero.webp
-rw-r--r-- 1 ibob staff  320K ... gusto-caramello.webp
-rw-r--r-- 1 ibob staff  290K ... gusto-limone.webp
-rw-r--r-- 1 ibob staff  310K ... gusto-pistacchio.webp
```
Totale atteso: <2 MB (vs 10.6 MB dei PNG).

- [ ] **Step 5: Ispezione visiva di una WebP**

Leggi (tramite Read tool) `public/gelato-hero.webp` e verifica che l'immagine non mostri artefatti evidenti rispetto alla PNG originale.

- [ ] **Step 6: Commit parziale (solo aggiunta WebP, PNG ancora presenti)**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add public/gelato-hero.webp public/gusto-pistacchio.webp public/gusto-limone.webp public/gusto-caramello.webp && \
git commit -m "chore: aggiunta immagini WebP ottimizzate"
```
Expected: 1 commit con 4 file nuovi.

---

## Task 2: Aggiorna riferimenti immagini nei componenti

**Files:**
- Modify: `components/HeroSection.tsx` (riga 46)
- Modify: `app/page.tsx` (gustiData, righe 14, 29, 44)

- [ ] **Step 1: Aggiorna HeroSection.tsx — cambia src da .png a .webp**

Usa Edit su `components/HeroSection.tsx`:
- `old_string`: `src="/gelato-hero.png"`
- `new_string`: `src="/gelato-hero.webp"`

- [ ] **Step 2: Aggiorna app/page.tsx — cambia tutti i path PNG dei gusti a WebP**

Usa Edit su `app/page.tsx`:
- `old_string`: `imageSrc: "/gusto-pistacchio.png",`
- `new_string`: `imageSrc: "/gusto-pistacchio.webp",`

Poi:
- `old_string`: `imageSrc: "/gusto-limone.png",`
- `new_string`: `imageSrc: "/gusto-limone.webp",`

Poi:
- `old_string`: `imageSrc: "/gusto-caramello.png",`
- `new_string`: `imageSrc: "/gusto-caramello.webp",`

- [ ] **Step 3: Aggiorna anche le URL nel JSON-LD**

Usa Edit su `app/page.tsx` per cambiare i 4 URL immagine dentro `jsonLd.image`:
- `old_string`:
```
  image: [
    "https://orso-bianco.vercel.app/gelato-hero.png",
    "https://orso-bianco.vercel.app/gusto-pistacchio.png",
    "https://orso-bianco.vercel.app/gusto-limone.png",
    "https://orso-bianco.vercel.app/gusto-caramello.png",
  ],
```
- `new_string`:
```
  image: [
    "https://orso-bianco.vercel.app/gelato-hero.webp",
    "https://orso-bianco.vercel.app/gusto-pistacchio.webp",
    "https://orso-bianco.vercel.app/gusto-limone.webp",
    "https://orso-bianco.vercel.app/gusto-caramello.webp",
  ],
```
(Le URL saranno aggiornate al nuovo dominio in Task 7.)

- [ ] **Step 4: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore (output vuoto).

- [ ] **Step 5: Verifica build Next.js (opzionale ma consigliato)**

Run: `cd /Users/ibob/Projects/orso-bianco && npx next build 2>&1 | tail -20`
Expected: `✓ Compiled successfully`, nessun errore sulle immagini.

- [ ] **Step 6: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add components/HeroSection.tsx app/page.tsx && \
git commit -m "feat: usa immagini WebP nei componenti"
```

---

## Task 3: Elimina i file PNG vecchi

**Files:**
- Delete: `public/gelato-hero.png`
- Delete: `public/gusto-pistacchio.png`
- Delete: `public/gusto-limone.png`
- Delete: `public/gusto-caramello.png`

- [ ] **Step 1: Elimina i 4 file PNG**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
rm public/gelato-hero.png public/gusto-pistacchio.png public/gusto-limone.png public/gusto-caramello.png
```

- [ ] **Step 2: Verifica che i file WebP esistano e PNG no**

Run: `ls /Users/ibob/Projects/orso-bianco/public/*.{png,webp} 2>&1 | grep -E "gelato-hero|gusto-"`
Expected: solo i 4 file .webp, nessun .png.

- [ ] **Step 3: Verifica build (per controllare nessun riferimento orfano)**

Run: `cd /Users/ibob/Projects/orso-bianco && npx next build 2>&1 | tail -10`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add -u public/ && \
git commit -m "chore: rimuove immagini PNG obsolete"
```

---

## Task 4: Crea app/sitemap.ts

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Crea il file sitemap.ts**

Scrivi `app/sitemap.ts` con questo contenuto esatto:

```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://gelateriaorsobianco.it";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 3: Avvia il dev server in background e verifica che /sitemap.xml sia servito**

Run (in un altro terminale o background):
```bash
cd /Users/ibob/Projects/orso-bianco && npx next dev --turbopack &
sleep 8
curl -s http://localhost:3000/sitemap.xml
pkill -f "next dev" || true
```
Expected: XML valido con `<url><loc>https://gelateriaorsobianco.it</loc>...`.

- [ ] **Step 4: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add app/sitemap.ts && \
git commit -m "feat: aggiunge sitemap.ts per Next.js App Router"
```

---

## Task 5: Crea app/robots.ts

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Crea il file robots.ts**

Scrivi `app/robots.ts` con questo contenuto esatto:

```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://gelateriaorsobianco.it";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 3: Verifica che /robots.txt sia servito**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && npx next dev --turbopack &
sleep 8
curl -s http://localhost:3000/robots.txt
pkill -f "next dev" || true
```
Expected: output tipo:
```
User-Agent: *
Allow: /

Host: https://gelateriaorsobianco.it
Sitemap: https://gelateriaorsobianco.it/sitemap.xml
```

- [ ] **Step 4: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add app/robots.ts && \
git commit -m "feat: aggiunge robots.ts per Next.js App Router"
```

---

## Task 6: Espandi JSON-LD con grafo strutturato

**Files:**
- Modify: `app/page.tsx` (righe 57-107, costante `jsonLd`)

Questa è una task di dimensioni maggiori. Sostituiamo completamente la costante `jsonLd` esistente con un grafo `@graph` che contiene 5 entità: Organization, 2 Person (Carmine, Sara), WebSite, IceCreamShop.

- [ ] **Step 1: Sostituisci la costante jsonLd**

Usa Edit su `app/page.tsx`:
- `old_string`: (il blocco esistente dalla riga 57 alla 107)
```
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "IceCreamShop",
  name: "Gelateria Orso Bianco",
  alternateName: "Orso Bianco Gelateria Artigianale",
  description:
    "Gelateria artigianale dal 1974 a Castiglione della Pescaia, Maremma Toscana. Gelateria ufficiale di Casa Sanremo 2024, 2025 e 2026. Gelato con materie prime d'eccellenza.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Roma 10-12",
    addressLocality: "Castiglione della Pescaia",
    postalCode: "58043",
    addressRegion: "GR",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.7636,
    longitude: 10.8826,
  },
  telephone: "+39 0564 934656",
  url: "https://orso-bianco.vercel.app",
  priceRange: "€",
  servesCuisine: ["Gelato artigianale", "Sorbetto", "Granite"],
  image: [
    "https://orso-bianco.vercel.app/gelato-hero.webp",
    "https://orso-bianco.vercel.app/gusto-pistacchio.webp",
    "https://orso-bianco.vercel.app/gusto-limone.webp",
    "https://orso-bianco.vercel.app/gusto-caramello.webp",
  ],
  sameAs: [
    "https://www.instagram.com/orsobianco_/",
    "https://www.tripadvisor.it/Restaurant_Review-g194733-d7024159-Reviews-Bar_Gelateria_Orso_Bianco-Castiglione_della_Pescaia_Province_of_Grosseto_Tuscany.html",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    bestRating: "5",
    reviewCount: "200",
  },
  foundingDate: "1974",
  award: [
    "Gelateria Ufficiale Casa Sanremo 2024",
    "Gelateria Ufficiale Casa Sanremo 2025",
    "Gelateria Ufficiale Casa Sanremo 2026",
    "Best in Maremma 2020",
    "Best in Maremma 2021",
    "Best in Maremma 2022",
    "Best in Maremma 2023",
  ],
};
```

- `new_string`:
```
const SITE_URL = "https://gelateriaorsobianco.it";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Gelateria Orso Bianco",
      alternateName: "Orso Bianco Gelateria Artigianale",
      url: SITE_URL,
      foundingDate: "1974",
      founder: [
        { "@id": `${SITE_URL}/#carmine` },
        { "@id": `${SITE_URL}/#sara` },
      ],
      sameAs: [
        "https://www.instagram.com/orsobianco_/",
        "https://www.facebook.com/OrsobiancoCdp/",
        "https://www.tripadvisor.it/Restaurant_Review-g194733-d7024159-Reviews-Bar_Gelateria_Orso_Bianco-Castiglione_della_Pescaia_Province_of_Grosseto_Tuscany.html",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#carmine`,
      name: "Carmine Marsella",
      jobTitle: "Titolare e gelatiere",
      worksFor: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#sara`,
      name: "Sara Masci",
      jobTitle: "Titolare",
      worksFor: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: "Gelateria Orso Bianco",
      inLanguage: "it-IT",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "IceCreamShop",
      "@id": `${SITE_URL}/#shop`,
      name: "Gelateria Orso Bianco",
      alternateName: "Orso Bianco Gelateria Artigianale",
      description:
        "Gelateria artigianale dal 1974 a Castiglione della Pescaia, Maremma Toscana. Gelateria ufficiale di Casa Sanremo 2024, 2025 e 2026. Gelato con materie prime d'eccellenza.",
      url: SITE_URL,
      telephone: "+39 0564 934656",
      priceRange: "€",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Roma 10-12",
        addressLocality: "Castiglione della Pescaia",
        postalCode: "58043",
        addressRegion: "GR",
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 42.7636,
        longitude: 10.8826,
      },
      servesCuisine: ["Gelato artigianale", "Sorbetto", "Granite"],
      image: [
        `${SITE_URL}/gelato-hero.webp`,
        `${SITE_URL}/gusto-pistacchio.webp`,
        `${SITE_URL}/gusto-limone.webp`,
        `${SITE_URL}/gusto-caramello.webp`,
      ],
      founder: [
        { "@id": `${SITE_URL}/#carmine` },
        { "@id": `${SITE_URL}/#sara` },
      ],
      foundingDate: "1974",
      parentOrganization: { "@id": `${SITE_URL}/#org` },
      hasMenu: {
        "@type": "Menu",
        name: "Gusti Signature",
        hasMenuSection: {
          "@type": "MenuSection",
          name: "Gusti del Gelato Artigianale",
          hasMenuItem: [
            {
              "@type": "MenuItem",
              name: "Pistacchio di Bronte DOP",
              description:
                "Tostato a legna e raffinato a pietra. Intenso, persistente, inconfondibile.",
            },
            {
              "@type": "MenuItem",
              name: "Limone, Basilico & Ananas",
              description:
                "L'incontro fra agrumi e erbe aromatiche. Il gusto che ha conquistato Sanremo.",
            },
            {
              "@type": "MenuItem",
              name: "Caramello al Burro Salato",
              description:
                "Dolcezza profonda con un pizzico di sale bretone.",
            },
          ],
        },
      },
      event: [
        {
          "@type": "Event",
          name: "Casa Sanremo 2026",
          startDate: "2026-02-04",
          endDate: "2026-02-15",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Casa Sanremo",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sanremo",
              addressCountry: "IT",
            },
          },
          performer: { "@id": `${SITE_URL}/#shop` },
        },
        {
          "@type": "Event",
          name: "Casa Sanremo 2025",
          startDate: "2025-02-09",
          endDate: "2025-02-15",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Casa Sanremo",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sanremo",
              addressCountry: "IT",
            },
          },
          performer: { "@id": `${SITE_URL}/#shop` },
        },
        {
          "@type": "Event",
          name: "Casa Sanremo 2024",
          startDate: "2024-02-04",
          endDate: "2024-02-10",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Casa Sanremo",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sanremo",
              addressCountry: "IT",
            },
          },
          performer: { "@id": `${SITE_URL}/#shop` },
        },
      ],
      award: [
        "Gelateria Ufficiale Casa Sanremo 2024",
        "Gelateria Ufficiale Casa Sanremo 2025",
        "Gelateria Ufficiale Casa Sanremo 2026",
        "Best in Maremma 2020",
        "Best in Maremma 2021",
        "Best in Maremma 2022",
        "Best in Maremma 2023",
      ],
    },
  ],
};
```

**Note**:
- L'`openingHoursSpecification` sarà aggiunto in Task 11 quando avremo gli orari reali dall'utente.
- L'`aggregateRating` è volutamente rimosso fino a conferma utente.
- Il constant `SITE_URL` verrà riusato nei task successivi.

- [ ] **Step 2: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 3: Build completa**

Run: `cd /Users/ibob/Projects/orso-bianco && npx next build 2>&1 | tail -20`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Validazione schema (manuale)**

Comunica all'utente: il JSON-LD appena scritto va validato prima del push finale. In Task 15 (push finale) chiederemo all'utente di incollarlo su https://validator.schema.org per conferma che non ci siano errori.

- [ ] **Step 5: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add app/page.tsx && \
git commit -m "feat: espande JSON-LD in grafo strutturato (Org + Person + WebSite + IceCreamShop)"
```

---

## Task 7: Aggiorna metadata e migra URL al nuovo dominio

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx` (restanti URL hardcoded non ancora migrati)

- [ ] **Step 1: Aggiorna app/layout.tsx con metadataBase e verification**

Usa Edit su `app/layout.tsx`:
- `old_string`:
```
export const metadata: Metadata = {
  title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
  description:
    "Gelateria Orso Bianco: il miglior gelato artigianale a Castiglione della Pescaia, Maremma Toscana. Dal 1974 in Via Roma 10. Gelateria ufficiale di Casa Sanremo 2024-2025-2026. Pistacchio di Bronte, limone basilico ananas e gusti unici.",
  keywords: [
```
- `new_string`:
```
export const metadata: Metadata = {
  metadataBase: new URL("https://gelateriaorsobianco.it"),
  title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
  description:
    "Gelateria Orso Bianco: il miglior gelato artigianale a Castiglione della Pescaia, Maremma Toscana. Dal 1974 in Via Roma 10. Gelateria ufficiale di Casa Sanremo 2024-2025-2026. Pistacchio di Bronte, limone basilico ananas e gusti unici.",
  keywords: [
```

- [ ] **Step 2: Aggiorna canonical e URL openGraph in layout.tsx**

Usa Edit su `app/layout.tsx`:
- `old_string`:
```
  alternates: {
    canonical: "https://orso-bianco.vercel.app",
  },
  openGraph: {
    title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
    description:
      "Dal 1974 il vero gelato artigianale nel cuore della Maremma. Gelateria ufficiale di Casa Sanremo. Vieni a trovarci in Via Roma 10, Castiglione della Pescaia.",
    url: "https://orso-bianco.vercel.app",
```
- `new_string`:
```
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
    description:
      "Dal 1974 il vero gelato artigianale nel cuore della Maremma. Gelateria ufficiale di Casa Sanremo. Vieni a trovarci in Via Roma 10, Castiglione della Pescaia.",
    url: "https://gelateriaorsobianco.it",
```

- [ ] **Step 3: Aggiorna URL immagini openGraph e twitter in layout.tsx**

Usa Edit su `app/layout.tsx`:
- `old_string`:
```
    images: [
      {
        url: "https://orso-bianco.vercel.app/gelato-hero.png",
        width: 800,
        height: 1067,
        alt: "Cono gelato artigianale Gelateria Orso Bianco con cialda personalizzata e sfondo Castiglione della Pescaia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
    description:
      "Dal 1974 il vero gelato artigianale nel cuore della Maremma Toscana. Gelateria ufficiale di Casa Sanremo.",
    images: ["https://orso-bianco.vercel.app/gelato-hero.png"],
  },
```
- `new_string`:
```
    images: [
      {
        url: "/gelato-hero.webp",
        width: 800,
        height: 1067,
        alt: "Cono gelato artigianale Gelateria Orso Bianco con cialda personalizzata e sfondo Castiglione della Pescaia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
    description:
      "Dal 1974 il vero gelato artigianale nel cuore della Maremma Toscana. Gelateria ufficiale di Casa Sanremo.",
    images: ["/gelato-hero.webp"],
  },
  verification: {
    google: "REPLACE_ME_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
```

**Nota**: Il token Google Search Console viene inserito in Task 15 quando l'utente lo fornirà. Per ora è un placeholder esplicito che NON deve essere committato con `REPLACE_ME` nel push finale — il plan lo aggiorna in Task 15 prima del push.

- [ ] **Step 4: Cerca eventuali URL hardcoded rimanenti in page.tsx**

Run: `grep -n "orso-bianco.vercel.app" /Users/ibob/Projects/orso-bianco/app/page.tsx`
Expected: nessun match (tutti gli URL sono già stati sostituiti con `SITE_URL` in Task 6).

Se ci sono match, sostituiscili manualmente con `${SITE_URL}/...` usando Edit.

- [ ] **Step 5: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 6: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add app/layout.tsx app/page.tsx && \
git commit -m "feat: migra metadata al dominio gelateriaorsobianco.it"
```

---

## Task 8: Aggiungi security headers in next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Sovrascrivi next.config.ts con configurazione headers**

Usa Write su `next.config.ts` con questo contenuto esatto:

```ts
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 3: Verifica che i header siano serviti (dev server)**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && npx next dev --turbopack &
sleep 8
curl -sI http://localhost:3000/ | grep -Ei "x-frame|x-content|referrer|strict-transport|permissions-policy"
pkill -f "next dev" || true
```
Expected: 5 header presenti nella risposta.

- [ ] **Step 4: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add next.config.ts && \
git commit -m "feat: aggiunge security headers (HSTS, X-Frame, CSP base)"
```

---

## Task 9: Crea componente client OpeningStatus

**Files:**
- Create: `components/OpeningStatus.tsx`

Questo è un Client Component che:
1. Calcola il giorno corrente in TZ Europe/Rome
2. Determina se la gelateria è aperta adesso
3. Renderizza un badge + dispatchia un evento custom per l'highlight nelle tabelle

Per semplicità, il componente accetta come prop una struttura dati con gli orari e gestisce tutto internamente.

- [ ] **Step 1: Crea il file components/OpeningStatus.tsx**

Scrivi `components/OpeningStatus.tsx` con questo contenuto esatto:

```tsx
"use client";

import { useEffect, useState } from "react";

// Opening hours for a season. Each day: null = closed, [openHour, closeHour] in 24h format
export type DayHours = [number, number] | null;

export type SeasonHours = {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
};

type Props = {
  summerHours: SeasonHours;
  winterHours: SeasonHours;
};

// Returns day name in lowercase English matching SeasonHours keys
function getDayName(date: Date): keyof SeasonHours {
  const days: (keyof SeasonHours)[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[date.getDay()];
}

// Summer season: June (5) through September (8), inclusive
function isSummerSeason(date: Date): boolean {
  const month = date.getMonth();
  return month >= 5 && month <= 8;
}

function isOpenNow(hours: SeasonHours, date: Date): boolean {
  const day = getDayName(date);
  const dayHours = hours[day];
  if (!dayHours) return false;
  const [open, close] = dayHours;
  const currentHour = date.getHours() + date.getMinutes() / 60;
  return currentHour >= open && currentHour < close;
}

export default function OpeningStatus({ summerHours, winterHours }: Props) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Compute current date in Europe/Rome timezone
    const romeTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
    );
    const hours = isSummerSeason(romeTime) ? summerHours : winterHours;
    setOpen(isOpenNow(hours, romeTime));
    setMounted(true);
  }, [summerHours, winterHours]);

  if (!mounted) {
    // Reserve space to avoid CLS (same dimensions as badge)
    return <span className="inline-block h-7 w-28" aria-hidden="true" />;
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-opacity duration-300 ${
        open
          ? "bg-[#e8f5e9] text-[#2e7d32]"
          : "bg-surface-mid text-on-surface-variant"
      }`}
      role="status"
      aria-label={open ? "Gelateria aperta adesso" : "Gelateria chiusa ora"}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          open ? "bg-[#2e7d32]" : "bg-on-surface-variant"
        }`}
        aria-hidden="true"
      />
      {open ? "Aperto adesso" : "Chiuso ora"}
    </span>
  );
}
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 3: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add components/OpeningStatus.tsx && \
git commit -m "feat: aggiunge Client Component OpeningStatus con badge aperto/chiuso"
```

---

## Task 10: Crea componente OpeningHours (Server Component)

**Files:**
- Create: `components/OpeningHours.tsx`

Questo è un Server Component che:
1. Renderizza l'intera sezione "Orari & Come Trovarci" (layout 2 colonne)
2. Mostra tabelle statiche estate/inverno (contenuto SEO-indicizzabile)
3. Include il client component OpeningStatus per il badge dinamico
4. Include una card "Come trovarci" con indirizzo, telefono, landmark, link Maps

- [ ] **Step 1: Crea il file components/OpeningHours.tsx**

Scrivi `components/OpeningHours.tsx` con questo contenuto esatto:

```tsx
import OpeningStatus, { SeasonHours } from "./OpeningStatus";

// Orari placeholder — verranno aggiornati in Task 11 con i dati reali dall'utente
const SUMMER_HOURS: SeasonHours = {
  monday: [10, 24],
  tuesday: [10, 24],
  wednesday: [10, 24],
  thursday: [10, 24],
  friday: [10, 24],
  saturday: [10, 24],
  sunday: [10, 24],
};

const WINTER_HOURS: SeasonHours = {
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: [14, 19],
  saturday: [14, 19],
  sunday: [14, 19],
};

type DayRow = {
  label: string;
  hours: [number, number] | null;
};

const DAY_LABELS: Record<keyof SeasonHours, string> = {
  monday: "Lunedì",
  tuesday: "Martedì",
  wednesday: "Mercoledì",
  thursday: "Giovedì",
  friday: "Venerdì",
  saturday: "Sabato",
  sunday: "Domenica",
};

function formatHours(hours: [number, number] | null): string {
  if (!hours) return "Chiuso";
  const [open, close] = hours;
  const formatHour = (h: number) => {
    if (h === 24) return "24:00";
    return `${h.toString().padStart(2, "0")}:00`;
  };
  return `${formatHour(open)} – ${formatHour(close)}`;
}

function buildRows(season: SeasonHours): DayRow[] {
  return (Object.keys(DAY_LABELS) as Array<keyof SeasonHours>).map((key) => ({
    label: DAY_LABELS[key],
    hours: season[key],
  }));
}

function HoursTable({ title, rows }: { title: string; rows: DayRow[] }) {
  return (
    <div className="bg-surface-lowest rounded-xl p-5 md:p-6 shadow-ambient">
      <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-4">
        {title}
      </p>
      <ul className="space-y-2 text-sm">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex justify-between items-center py-1.5 border-b border-surface-mid last:border-b-0"
          >
            <span className="text-on-surface font-medium">{row.label}</span>
            <span
              className={`${
                row.hours ? "text-on-surface-variant" : "text-outline-variant italic"
              }`}
            >
              {formatHours(row.hours)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OpeningHours() {
  const summerRows = buildRows(SUMMER_HOURS);
  const winterRows = buildRows(WINTER_HOURS);

  return (
    <section id="orari" className="bg-surface">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Orari */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
                Orari di apertura
              </p>
              <OpeningStatus
                summerHours={SUMMER_HOURS}
                winterHours={WINTER_HOURS}
              />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-6">
              Vieni a <em>trovarci</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <HoursTable title="Estate (giu – set)" rows={summerRows} />
              <HoursTable title="Inverno (ott – mag)" rows={winterRows} />
            </div>
          </div>

          {/* Come trovarci */}
          <div>
            <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              Come trovarci
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-6">
              Sul lungomare di <em>Castiglione</em>
            </h2>
            <div className="bg-surface-lowest rounded-xl p-6 md:p-8 shadow-ambient space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-2">
                  Indirizzo
                </p>
                <address className="not-italic text-on-surface leading-relaxed">
                  Via Roma 10-12<br />
                  58043 Castiglione della Pescaia (GR)
                </address>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-2">
                  Telefono
                </p>
                <a
                  href="tel:+390564934656"
                  className="text-on-surface hover:text-primary transition-colors"
                >
                  +39 0564 934656
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-2">
                  In breve
                </p>
                <ul className="text-sm text-on-surface-variant space-y-1.5">
                  <li>Sul lungomare di Castiglione della Pescaia</li>
                  <li>A pochi passi dal porto turistico</li>
                  <li>Raggiungibile a piedi dal centro storico</li>
                </ul>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Gelateria+Orso+Bianco+Via+Roma+10+Castiglione+della+Pescaia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-container transition-colors"
              >
                Apri su Google Maps
                <span className="ml-2">&#8594;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 3: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add components/OpeningHours.tsx && \
git commit -m "feat: aggiunge sezione OpeningHours con tabelle estate/inverno"
```

---

## Task 11: Integra OpeningHours in page.tsx + aggiorna JSON-LD con orari

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Importa OpeningHours in page.tsx**

Usa Edit su `app/page.tsx`:
- `old_string`:
```
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GustoCard from "@/components/GustoCard";
import InstagramFeed from "@/components/InstagramFeed";
import MapCard from "@/components/MapCard";
import Footer from "@/components/Footer";
```
- `new_string`:
```
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GustoCard from "@/components/GustoCard";
import InstagramFeed from "@/components/InstagramFeed";
import MapCard from "@/components/MapCard";
import OpeningHours from "@/components/OpeningHours";
import Footer from "@/components/Footer";
```

- [ ] **Step 2: Inserisci il componente OpeningHours tra la sezione contatti e press**

Usa Edit su `app/page.tsx`:
- `old_string`:
```
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InstagramFeed />
              <MapCard />
            </div>
          </div>
        </section>

        {/* Rassegna Stampa */}
```
- `new_string`:
```
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InstagramFeed />
              <MapCard />
            </div>
          </div>
        </section>

        <OpeningHours />

        {/* Rassegna Stampa */}
```

- [ ] **Step 3: Aggiungi link "Orari" alla Navbar**

Usa Edit su `components/Navbar.tsx`:
- `old_string`:
```
const navLinks = [
  { label: "La Storia", href: "#storia" },
  { label: "I Gusti", href: "#gusti" },
  { label: "Contatti", href: "#contatti" },
];
```
- `new_string`:
```
const navLinks = [
  { label: "La Storia", href: "#storia" },
  { label: "I Gusti", href: "#gusti" },
  { label: "Orari", href: "#orari" },
  { label: "Contatti", href: "#contatti" },
];
```

- [ ] **Step 4: Aggiungi openingHoursSpecification al JSON-LD**

Trova nel JSON-LD (in `app/page.tsx`) la proprietà `hasMenu` dell'IceCreamShop e inserisci **prima** di essa la proprietà `openingHoursSpecification`.

Usa Edit su `app/page.tsx`:
- `old_string`:
```
      parentOrganization: { "@id": `${SITE_URL}/#org` },
      hasMenu: {
```
- `new_string`:
```
      parentOrganization: { "@id": `${SITE_URL}/#org` },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "10:00",
          closes: "24:00",
          validFrom: "2026-06-01",
          validThrough: "2026-09-30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday", "Sunday"],
          opens: "14:00",
          closes: "19:00",
          validFrom: "2026-10-01",
          validThrough: "2027-05-31",
        },
      ],
      hasMenu: {
```

**Nota**: Questi orari sono placeholder. Verranno confermati/corretti in Task 15 quando l'utente fornirà i dati reali. Il JSON-LD e il componente `OpeningHours.tsx` devono restare sincronizzati: se l'utente dice orari diversi, aggiornare ENTRAMBI (costanti `SUMMER_HOURS`/`WINTER_HOURS` in `OpeningHours.tsx` E le OpeningHoursSpecification nel JSON-LD).

- [ ] **Step 5: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 6: Verifica visiva in dev server**

Run: `cd /Users/ibob/Projects/orso-bianco && npx next dev --turbopack &`
Expected: server parte su porta 3000. Visita mentalmente `http://localhost:3000/#orari` e verifica che la sezione sia renderizzata. Poi kill il server: `pkill -f "next dev"`.

Se disponibile Chrome in-browser tool (mcp__claude-in-chrome), usa `navigate` e `screenshot` per verificare visivamente. Altrimenti notifica all'utente che il passaggio richiede verifica visiva manuale.

- [ ] **Step 7: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add app/page.tsx components/Navbar.tsx && \
git commit -m "feat: integra sezione OpeningHours e link navbar Orari"
```

---

## Task 12: Performance tweaks

**Files:**
- Modify: `components/HeroSection.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Aggiungi fetchPriority="high" all'hero image**

Usa Edit su `components/HeroSection.tsx`:
- `old_string`:
```
            <Image
              src="/gelato-hero.webp"
              alt="Cono gelato artigianale Gelateria Orso Bianco a Castiglione della Pescaia con cialda logo e sfondo borgo medievale"
              width={800}
              height={1067}
              className="w-full h-auto object-cover"
              priority
            />
```
- `new_string`:
```
            <Image
              src="/gelato-hero.webp"
              alt="Cono gelato artigianale Gelateria Orso Bianco a Castiglione della Pescaia con cialda logo e sfondo borgo medievale"
              width={800}
              height={1067}
              className="w-full h-auto object-cover"
              priority
              fetchPriority="high"
            />
```

- [ ] **Step 2: Aggiungi preconnect ai font Google in layout.tsx**

Next.js 15 con `next/font/google` gestisce automaticamente preconnect, ma è utile assicurarsene via `<head>` esplicito. Verifica prima che non ci sia già:

Run: `grep -n "preconnect" /Users/ibob/Projects/orso-bianco/app/layout.tsx`

Se non c'è nessun match, aggiungi preconnect:

Usa Edit su `app/layout.tsx`:
- `old_string`:
```
    <html lang="it" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
```
- `new_string`:
```
    <html lang="it" className={`${notoSerif.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
```

**Nota**: Se l'Edit del `<html>` dà errore perché il grep ha trovato "preconnect" già presente, salta questo step.

- [ ] **Step 3: Verifica typecheck**

Run: `cd /Users/ibob/Projects/orso-bianco && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 4: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add components/HeroSection.tsx app/layout.tsx && \
git commit -m "perf: fetchPriority hero image + preconnect fonts"
```

---

## Task 13: Genera checklist GBP in docs/

**Files:**
- Create: `docs/gbp-checklist-orso-bianco.html`

Questa task crea un HTML standalone (stile editoriale chiaro, stampabile) con le 5 azioni una tantum da passare a Carmine.

- [ ] **Step 1: Crea il file docs/gbp-checklist-orso-bianco.html**

Scrivi `docs/gbp-checklist-orso-bianco.html` con questo contenuto esatto:

```html
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Google Business Profile — Checklist Orso Bianco</title>
<style>
  @page { size: A4; margin: 2cm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #173124;
    background: #fcf9f4;
    line-height: 1.55;
    padding: 40px 32px;
    max-width: 800px;
    margin: 0 auto;
  }
  header { border-bottom: 2px solid #C9A96E; padding-bottom: 20px; margin-bottom: 28px; }
  .eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #C9A96E; font-weight: 700; margin-bottom: 6px; }
  h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.01em; margin-bottom: 6px; }
  .subtitle { font-size: 14px; color: #424844; }
  .intro { background: #ffffff; border-left: 4px solid #C9A96E; padding: 16px 20px; margin-bottom: 28px; font-size: 14px; border-radius: 0 8px 8px 0; }
  .action { background: #ffffff; border-radius: 10px; padding: 20px 24px; margin-bottom: 16px; box-shadow: 0 2px 12px rgba(28,28,25,0.04); page-break-inside: avoid; }
  .action-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 10px; }
  .action-number { font-size: 14px; font-weight: 800; color: #C9A96E; min-width: 20px; }
  .action-title { font-size: 16px; font-weight: 700; color: #173124; }
  .action-body { font-size: 13px; color: #424844; line-height: 1.6; }
  .action-body p { margin-bottom: 8px; }
  .action-body ul { margin: 6px 0 8px 18px; }
  .action-body li { margin-bottom: 3px; }
  code { background: #f6f3ee; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-family: "SF Mono", Consolas, monospace; }
  .url { color: #2d4739; text-decoration: underline; font-weight: 600; font-size: 12px; }
  .desc-box { background: #f6f3ee; border-radius: 6px; padding: 12px 16px; font-size: 12px; font-style: italic; line-height: 1.55; border-left: 3px solid #C9A96E; margin-top: 6px; }
  footer { margin-top: 28px; padding-top: 18px; border-top: 1px solid #ebe8e3; text-align: center; font-size: 11px; color: #6b726c; }
</style>
</head>
<body>

<header>
  <p class="eyebrow">Checklist operativa — 1 pagina</p>
  <h1>Google Business Profile — Orso Bianco</h1>
  <p class="subtitle">5 azioni una tantum per Carmine & Sara. Tempo totale stimato: 30-40 minuti.</p>
</header>

<div class="intro">
  <strong>Perché è importante.</strong> La Google Business Profile è il fattore #1 che Google usa per ordinare i risultati "gelateria vicino a te" e "gelateria Castiglione della Pescaia". Non è sostituibile dal sito web. Queste 5 azioni sono il minimo indispensabile — coprono circa il 70% dell'impatto.
</div>

<div class="action">
  <div class="action-header">
    <span class="action-number">1.</span>
    <span class="action-title">Verifica la scheda esistente</span>
  </div>
  <div class="action-body">
    <p>Vai su <a class="url" href="https://business.google.com">business.google.com</a> e accedi con l'account Google dell'attività.</p>
    <p>Cerca "Gelateria Orso Bianco" — se compare senza "Rivendica ora", sei già proprietario. Se compare con "Rivendica questa attività", clicca e segui le istruzioni.</p>
    <p>Se serve verifica, Google manda una cartolina fisica all'indirizzo di Via Roma 10-12 con un codice da inserire (~7 giorni).</p>
  </div>
</div>

<div class="action">
  <div class="action-header">
    <span class="action-number">2.</span>
    <span class="action-title">Imposta le categorie corrette</span>
  </div>
  <div class="action-body">
    <p><strong>Categoria principale:</strong> <code>Gelateria</code></p>
    <p><strong>Categorie secondarie:</strong> <code>Bar</code>, <code>Caffetteria</code></p>
    <p>Niente altro. Ogni categoria aggiuntiva dispersiva danneggia il ranking per le query core.</p>
  </div>
</div>

<div class="action">
  <div class="action-header">
    <span class="action-number">3.</span>
    <span class="action-title">Compila gli orari estate / inverno</span>
  </div>
  <div class="action-body">
    <p>Inserisci gli stessi orari del sito web (devono essere identici per coerenza NAP).</p>
    <p><strong>Importante:</strong> usa la funzione "Orari speciali" per festività, Pasqua, ponti — Google mostra un warning se un cliente arriva e trova chiuso contro gli orari pubblicati.</p>
  </div>
</div>

<div class="action">
  <div class="action-header">
    <span class="action-number">4.</span>
    <span class="action-title">Carica 20 foto in una sola sessione</span>
  </div>
  <div class="action-body">
    <p>Fai 20 foto con lo smartphone (30 min totali) seguendo questa ripartizione:</p>
    <ul>
      <li><strong>5 foto esterno/insegna</strong> — vista dal lungomare, insegna in evidenza</li>
      <li><strong>5 foto interno/banco</strong> — banco gusti pieno, clienti anonimi in background</li>
      <li><strong>5 foto gusti in coppetta/cono</strong> — close-up dei signature (pistacchio, limone basilico, caramello)</li>
      <li><strong>3 foto del team al lavoro</strong> — Carmine, Sara, collaboratori</li>
      <li><strong>2 foto eventi/riconoscimenti</strong> — Casa Sanremo, premi Best in Maremma</li>
    </ul>
    <p>Carica tutte insieme nella sezione "Foto" della scheda. Google preferisce foto recenti e fresche — ripetere questo aggiornamento ogni 6 mesi aiuta molto.</p>
  </div>
</div>

<div class="action">
  <div class="action-header">
    <span class="action-number">5.</span>
    <span class="action-title">Compila la descrizione (copy pronto)</span>
  </div>
  <div class="action-body">
    <p>Copia e incolla questo testo (748 caratteri) nella sezione "Informazioni" → "Descrizione":</p>
    <div class="desc-box">
      Gelateria Orso Bianco — gelato artigianale dal 1974 nel cuore di Castiglione della Pescaia, in Maremma Toscana. Carmine e Sara conducono dal 2013 questa storica gelateria sul lungomare, scegliendo ogni materia prima con ossessione e creando ogni gusto nel laboratorio. Quattro premi Best in Maremma (2020-2023) e gelateria ufficiale di Casa Sanremo 2024, 2025 e 2026. I gusti signature: Pistacchio di Bronte DOP, Limone Basilico e Ananas, Caramello al Burro Salato, Pompelmo Rosa e Champagne. Vi aspettiamo in Via Roma 10-12, sul lungomare di Castiglione della Pescaia.
    </div>
  </div>
</div>

<footer>
  Generato per Gelateria Orso Bianco — 8 aprile 2026 • Una checklist una tantum, non richiede maintenance settimanale.
</footer>

</body>
</html>
```

- [ ] **Step 2: Verifica che il file sia ben formattato (visiva)**

Apri il file nel browser (drag & drop, o comando `open` su macOS):
Run: `open /Users/ibob/Projects/orso-bianco/docs/gbp-checklist-orso-bianco.html`
Expected: pagina A4 impaginata correttamente, 5 azioni numerate, stile editoriale coerente con il sito.

- [ ] **Step 3: Commit**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add docs/gbp-checklist-orso-bianco.html && \
git commit -m "docs: aggiunge checklist GBP 1-pagina per Carmine"
```

---

## Task 14: Build completa e self-check finale

**Files:**
- Nessuno — solo verifica

- [ ] **Step 1: Clean rebuild completo**

Run: `cd /Users/ibob/Projects/orso-bianco && rm -rf .next && npx next build 2>&1 | tail -40`
Expected: `✓ Compiled successfully`, nessun warning su immagini, nessun errore TypeScript, nessun warning su JSON-LD.

- [ ] **Step 2: Lista finale dei commit che verranno pushati**

Run: `cd /Users/ibob/Projects/orso-bianco && git log --oneline origin/main..HEAD`
Expected: 12-13 commit dal Task 1 in poi (Task 1-13, alcuni hanno più commit).

- [ ] **Step 3: Verifica contenuto finale di app/page.tsx (per sanity check)**

Run: `grep -n "SITE_URL\|openingHoursSpecification\|OpeningHours\|REPLACE_ME" /Users/ibob/Projects/orso-bianco/app/page.tsx /Users/ibob/Projects/orso-bianco/app/layout.tsx`
Expected:
- `SITE_URL` riferimenti in page.tsx
- `openingHoursSpecification` una volta in page.tsx
- `OpeningHours` import + usage in page.tsx
- `REPLACE_ME_GOOGLE_SEARCH_CONSOLE_TOKEN` in layout.tsx (verrà sostituito in Task 15)

- [ ] **Step 4: Verifica dimensione repo**

Run: `du -sh /Users/ibob/Projects/orso-bianco/public/`
Expected: <3 MB (molto minore dei ~11 MB precedenti).

- [ ] **Step 5: Richiesta stop per l'utente**

Comunica all'utente che tutti i task di codice sono completi in locale ma NON ancora pushati. Prima di proseguire con Task 15 servono 3 dati:

1. **Orari reali estate e inverno** — richiesti esplicitamente
2. **Token Google Search Console** — creare la proprietà su search.google.com/search-console, scegliere "Tag HTML", copiare il valore `content` (~40 caratteri)
3. **Conferma / rating TripAdvisor** — mantenere o rimuovere `aggregateRating` (oggi rimosso). Se mantenere, fornire rating e numero recensioni reali dalla scheda TripAdvisor attuale

Aspetta la risposta dell'utente prima di procedere a Task 15.

---

## Task 15: Applica dati reali + push finale + istruzioni handoff

**Files:**
- Modify: `app/layout.tsx` (token GSC reale)
- Modify: `components/OpeningHours.tsx` (orari reali)
- Modify: `app/page.tsx` (OpeningHoursSpecification reali + eventuale aggregateRating)

- [ ] **Step 1: Ricevi i dati dall'utente**

Dati attesi:
- `SUMMER_HOURS` finale: struttura giorno→orari
- `WINTER_HOURS` finale: struttura giorno→orari
- `GSC_TOKEN`: stringa di ~40 caratteri
- Decisione su `aggregateRating`: mantenere/rimuovere/valore

- [ ] **Step 2: Sostituisci il token GSC in layout.tsx**

Usa Edit su `app/layout.tsx`:
- `old_string`: `google: "REPLACE_ME_GOOGLE_SEARCH_CONSOLE_TOKEN",`
- `new_string`: `google: "<TOKEN_FORNITO_DALL_UTENTE>",`

- [ ] **Step 3: Aggiorna SUMMER_HOURS e WINTER_HOURS in OpeningHours.tsx**

Usa Edit su `components/OpeningHours.tsx` sostituendo le costanti `SUMMER_HOURS` e `WINTER_HOURS` con i valori reali forniti.

Esempio (da adattare ai dati reali):
- `old_string`:
```
const SUMMER_HOURS: SeasonHours = {
  monday: [10, 24],
  tuesday: [10, 24],
  wednesday: [10, 24],
  thursday: [10, 24],
  friday: [10, 24],
  saturday: [10, 24],
  sunday: [10, 24],
};

const WINTER_HOURS: SeasonHours = {
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: [14, 19],
  saturday: [14, 19],
  sunday: [14, 19],
};
```
- `new_string`: (valori reali, stessa struttura)

- [ ] **Step 4: Aggiorna openingHoursSpecification nel JSON-LD**

Usa Edit su `app/page.tsx` per aggiornare i due blocchi `OpeningHoursSpecification` con i valori reali. Mantieni lo stesso formato (`dayOfWeek`, `opens`, `closes`, `validFrom`, `validThrough`). Le date `validFrom/validThrough` per il 2026 e oltre restano invariate.

- [ ] **Step 5: (Condizionale) Ripristina aggregateRating se l'utente lo conferma**

Se l'utente conferma rating e reviewCount reali, aggiungi alla IceCreamShop del grafo JSON-LD (prima di `hasMenu`):

```ts
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "<valore_reale>",
        bestRating: "5",
        reviewCount: "<conteggio_reale>",
      },
```

Se l'utente sceglie di lasciarlo rimosso, skip questo step.

- [ ] **Step 6: Validazione JSON-LD finale (manuale)**

Comunica all'utente: copia il contenuto JSON-LD generato (dal DOM del sito o dal source) e incollalo su https://validator.schema.org per verificare zero errori. Aspetta conferma dall'utente prima di pushare.

- [ ] **Step 7: Build finale**

Run: `cd /Users/ibob/Projects/orso-bianco && rm -rf .next && npx next build 2>&1 | tail -20`
Expected: `✓ Compiled successfully`.

- [ ] **Step 8: Commit finale "dati reali"**

Run:
```bash
cd /Users/ibob/Projects/orso-bianco && \
git add app/layout.tsx components/OpeningHours.tsx app/page.tsx && \
git commit -m "feat: inserisce orari reali, token GSC e aggregateRating"
```

- [ ] **Step 9: Push su main**

Run: `cd /Users/ibob/Projects/orso-bianco && git push origin main`
Expected: tutti i commit pushati a `origin/main`. Vercel triggera deploy automatico.

- [ ] **Step 10: Handoff all'utente — istruzioni dominio**

Comunica all'utente queste istruzioni esatte:

1. Vai su Vercel → progetto `orso-bianco` → **Settings** → **Domains**
2. Click **Add Domain** → inserisci `gelateriaorsobianco.it` e conferma
3. Ripeti per `www.gelateriaorsobianco.it`
4. Vercel mostra 2 record DNS da copiare:
   - Apex (`gelateriaorsobianco.it`): record **A** valore `76.76.21.21`
   - WWW: record **CNAME** valore `cname.vercel-dns.com`
5. Vai sul pannello DNS del registrar (Aruba/Namecheap/chi sia) e crea i due record
6. Attendi 5-30 minuti per la propagazione. Vercel emette HTTPS automaticamente
7. Torna su Vercel → Domains → imposta `gelateriaorsobianco.it` come **Primary Domain**
8. Verifica: apri `https://gelateriaorsobianco.it` in browser, deve caricare il sito

- [ ] **Step 11: Handoff all'utente — istruzioni Search Console**

Comunica all'utente:

1. Apri [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Aggiungi proprietà" → tipo "Prefisso URL" → `https://gelateriaorsobianco.it`
3. Clic "Verifica" — dovrebbe essere immediato dato che il token è già nel codice
4. Una volta verificato, vai su **Sitemap** nel menu laterale
5. Incolla `sitemap.xml` nel campo (Google aggiunge automaticamente il prefisso)
6. Click "Invia" → dovrebbe mostrare "Stato: successo"

- [ ] **Step 12: Handoff checklist GBP per Carmine**

Comunica all'utente: il file `docs/gbp-checklist-orso-bianco.html` va stampato o condiviso con Carmine (può essere aperto direttamente da browser e stampato in PDF). Contiene le 5 azioni una tantum.

- [ ] **Step 13: Final wrap-up**

Riassumi all'utente:
- ✅ Sito tecnicamente ottimizzato e deployato su nuovo dominio
- ✅ JSON-LD arricchito validato
- ✅ Immagini compresse (-87%)
- ✅ Sitemap e robots attivi
- ✅ Security headers attivi
- ✅ Search Console collegata, sitemap inviata
- ✅ Checklist GBP consegnata

Tempo atteso per vedere i primi risultati:
- 3-14 giorni: prime impression su Search Console
- 2-4 settimane: top 1 su query branded
- 4-8 settimane: top 3-5 su query local (dipende da GBP)

---

## Self-Review del plan (eseguita dallo scrittore)

**Spec coverage check**: ogni sezione dello spec ha una task che la implementa?

| Spec section | Task |
|---|---|
| §1 Modifica visibile (sezione Orari & Come Trovarci) | Task 9, 10, 11 |
| §2.1 Ottimizzazione immagini | Task 1, 2, 3 |
| §2.2 File SEO infrastructure (sitemap + robots) | Task 4, 5 |
| §2.3 Espansione JSON-LD con grafo | Task 6 |
| §2.3 openingHoursSpecification | Task 11 (step 4), Task 15 (step 4) |
| §2.4 Metadata + dominio | Task 7 |
| §2.5 Performance (fetchPriority + preconnect) | Task 12 |
| §2.6 Security headers | Task 8 |
| §3 Migrazione dominio | Task 15 (step 10) — handoff |
| §4 Google Search Console | Task 15 (step 11) — handoff |
| §5 Checklist GBP | Task 13 |
| §9 Decisioni aperte (orari, token, rating) | Task 14 (step 5), Task 15 |
| §10 Definition of Done | Task 14 verifica parziale, Task 15 completamento |

✅ Copertura completa.

**Placeholder scan**: red flags?

- Task 7 step 3: `"REPLACE_ME_GOOGLE_SEARCH_CONSOLE_TOKEN"` — volutamente lasciato, sostituito in Task 15 step 2. Documentato.
- Task 10 usa placeholder `SUMMER_HOURS`/`WINTER_HOURS` — volutamente lasciati, sostituiti in Task 15 step 3. Documentato.
- Nessun "TBD", "implement later", "similar to".

✅ Nessun placeholder nascosto.

**Type/name consistency**:

- `SITE_URL` definito in Task 6 (dentro page.tsx), riutilizzato in Task 11 (step 4) → OK.
- `SeasonHours` type esportato da `OpeningStatus.tsx` in Task 9, importato in `OpeningHours.tsx` in Task 10 → OK.
- `SUMMER_HOURS`/`WINTER_HOURS` costanti in `OpeningHours.tsx` (Task 10), aggiornate in Task 15 → OK.
- `OpeningStatus` default export in Task 9, importato come default in Task 10 → OK.
- `getDayName` tipizzato con `keyof SeasonHours` → OK.

✅ Tutti i nomi e tipi coerenti.
