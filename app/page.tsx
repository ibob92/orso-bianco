import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GustoCard from "@/components/GustoCard";
import InstagramFeed from "@/components/InstagramFeed";
import MapCard from "@/components/MapCard";
import OpeningHours from "@/components/OpeningHours";
import Footer from "@/components/Footer";
import GalleryCarousel from "@/components/GalleryCarousel";

const gustiData = [
  {
    name: "Pistacchio di Bronte DOP",
    description:
      "Tostato a legna e raffinato a pietra. Intenso, persistente, inconfondibile. Dal terreno vulcanico dell'Etna alla nostra mantecatrice.",
    imageSrc: "/gusto-pistacchio.webp",
    imageAlt: "Gelato al pistacchio di Bronte DOP — gusto signature della Gelateria Orso Bianco a Castiglione della Pescaia",
    review: {
      name: "Sciass",
      initial: "S",
      color: "#00AF87",
      date: "agosto 2022",
      text: "Degno di nota è il gusto mandorlato al pistacchio. Interessante anche il pompelmo rosa e champagne. Insomma, accoppiate vincenti!",
    },
    reverse: false,
  },
  {
    name: "Limone, Basilico & Ananas",
    description:
      "L'incontro fra agrumi e erbe aromatiche. Fresco, audace, indimenticabile. Il gusto che ha conquistato Sanremo.",
    imageSrc: "/gusto-limone.webp",
    imageAlt: "Gelato limone basilico e ananas — creazione originale Gelateria Orso Bianco, Maremma Toscana",
    review: {
      name: "Alfonso P.",
      initial: "A",
      color: "#00AF87",
      date: "settembre 2017",
      text: "Consiglio vivamente limone ananas e basilico.. un gusto unico ma che esprime quanta passione ci mette il proprietario per distinguersi. Straconsigliato!",
    },
    reverse: true,
  },
  {
    name: "Caramello al Burro Salato",
    description:
      "Dolcezza profonda con un pizzico di sale bretone. Il comfort food elevato ad arte.",
    imageSrc: "/gusto-caramello.webp",
    imageAlt: "Gelato al caramello e burro salato con fiocchi di sale — best seller Gelateria Orso Bianco",
    review: {
      name: "cosimo m.",
      initial: "C",
      color: "#00AF87",
      date: "agosto 2021",
      text: "Quei pochi gusti il gusto è speciale, in particolare il caramello salato e il cremino. Mia figlia non dico tutte le sere ma quasi!",
    },
    reverse: false,
  },
];

const altriProdotti = [
  {
    name: "Yogurt soft",
    description: "Cremoso, fresco, leggero. Servito con frutta di stagione e topping a scelta.",
    imageSrc: "/prodotti/yogurt-soft.webp",
    imageAlt: "Yogurt soft cremoso con frutti di bosco — Gelateria Orso Bianco Castiglione della Pescaia",
  },
  {
    name: "Crepes",
    description: "Sottili, dorate, farcite al momento. Dal cioccolato alla Nutella fino a creazioni stagionali.",
    imageSrc: "/prodotti/crepes.webp",
    imageAlt: "Crepe dorata con cioccolato e zucchero a velo — Gelateria Orso Bianco",
  },
  {
    name: "Granite di yogurt",
    description: "La freschezza della granita incontra la cremosità dello yogurt. Perfetta fronte mare.",
    imageSrc: "/prodotti/granita-yogurt.webp",
    imageAlt: "Granita di yogurt con fragola — Gelateria Orso Bianco Maremma",
  },
  {
    name: "Caffetteria",
    description: "Miscela selezionata, espresso italiano. Per una pausa breve o l'inizio della giornata.",
    imageSrc: "/prodotti/caffetteria.webp",
    imageAlt: "Espresso italiano con biscottino amaretto — Gelateria Orso Bianco",
  },
  {
    name: "Macedonie fresche",
    description: "Solo frutta di stagione, tagliata al momento. Il gusto dell'estate in una coppetta.",
    imageSrc: "/prodotti/macedonia.webp",
    imageAlt: "Macedonia di frutta fresca con menta — Gelateria Orso Bianco Castiglione della Pescaia",
  },
  {
    name: "Frappè",
    description: "Cremoso, goloso, al gusto del giorno. Una coccola veloce da portare in passeggiata.",
    imageSrc: "/prodotti/frappe.webp",
    imageAlt: "Frappè alla vaniglia con panna e caramello — Gelateria Orso Bianco",
  },
];

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
      logo: `${SITE_URL}/logo.jpg`,
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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.3",
        bestRating: "5",
        reviewCount: "275",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "14:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday"],
          opens: "13:30",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "13:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday"],
          opens: "13:30",
          closes: "20:00",
        },
      ],
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

const pressArticles = [
  {
    source: "Il Giunco",
    date: "5 febbraio 2025",
    title: "A Sanremo il gelato che arriva dalla Maremma",
    excerpt:
      "L'Orso Bianco torna protagonista al Festival, portando l'artigianalità maremmana a Casa Sanremo per il secondo anno consecutivo.",
    image: "/press/ilgiunco-sanremo-2025.jpg",
    url: "https://www.ilgiunco.net/2025/02/05/a-sanremo-il-gelato-che-arriva-dalla-maremma-lorso-bianco-protagonista-al-festival/",
  },
  {
    source: "La Nazione",
    date: "3 settembre 2024",
    title: "Orso Bianco, mezzo secolo di storia. E sempre per tutti i gusti",
    excerpt:
      "Cinquant'anni di gelato artigianale a Castiglione della Pescaia, raccontati attraverso le tre generazioni che ne hanno scritto la storia.",
    image: "/press/la-nazione-mezzo-secolo.webp",
    url: "https://www.lanazione.it/grosseto/cronaca/orso-bianco-mezzo-secolo-di-storia-e-sempre-per-tutti-i-gusti-853811e6",
  },
  {
    source: "Il Giunco",
    date: "2 febbraio 2024",
    title: "Il gelato maremmano conquista Sanremo",
    excerpt:
      "Carmine e Sara protagonisti al Festival: la gelateria di Castiglione porta le sue creazioni a Casa Sanremo.",
    image: "/press/ilgiunco-sanremo-2024.jpg",
    url: "https://www.ilgiunco.net/2024/02/02/il-gelato-maremmano-conquista-sanremo-lorso-bianco-protagonista-del-festival/",
  },
];


export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main>
        <HeroSection />

        {/* La Nostra Storia — SEO content block */}
        <section id="storia" className="bg-surface">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center mb-12 md:mb-16">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated min-h-[260px] md:min-h-[420px] md:w-[420px] order-2 md:order-1">
                <Image
                  src="/fondatori-casa-sanremo.jpg"
                  alt="Carmine Marsella e Sara Masci, titolari della Gelateria Orso Bianco, a Casa Sanremo"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
              </div>

              <div className="text-center md:text-left px-2 md:px-4 py-4 md:py-0 order-1 md:order-2">
                <h2 className="font-serif text-3xl md:text-4xl xl:text-5xl text-primary leading-tight max-w-xl">
                  Doveva essere solo una sosta.
                  <em className="block mt-2">È diventata una vita intera.</em>
                </h2>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-5 text-center">
                La nostra storia
              </p>

              <div className="space-y-6 text-on-surface-variant leading-relaxed text-base md:text-lg">
                <p>
                  Carmine e Sara scoprono <strong>Castiglione della Pescaia</strong> quasi
                  per caso, durante un viaggio. Una passeggiata, il mare, e una promessa:
                  <strong> tornare. Per restare.</strong>
                </p>

                <p>
                  Prima, però, il mondo. L&apos;esperienza all&apos;estero, il lavoro,
                  i sacrifici: Carmine inseguendo la sua passione per il <strong>calcio</strong>,
                  Sara coltivando il suo sogno da <strong>estetista</strong>. Poi il ritorno
                  in Italia, il primo progetto, e l&apos;incontro con la gelateria. Da lì
                  nasce tutto: prima un lavoro, poi una passione, infine una scelta.
                </p>

                <p>
                  Nel <strong>2013</strong>, dopo l&apos;esperienza da dipendenti,
                  decisero di acquistare la storica gelateria sul lungomare di Castiglione
                  della Pescaia.
                </p>

                <p className="font-serif text-primary text-xl md:text-2xl leading-snug py-2">
                  Partirono da zero. Senza scorciatoie.
                </p>

                <p>
                  Anni intensi, fatti di sacrificio, errori e ripartenze. Ma anche di
                  crescita, identità e visione.
                </p>

                <p className="font-serif text-primary text-xl md:text-2xl leading-snug py-2">
                  Oggi Orso Bianco è molto più di una gelateria.
                  <em className="block mt-1">È una promessa mantenuta.</em>
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-gold/20 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center sm:text-left">
                <div>
                  <p className="text-gold text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">
                    Casa Sanremo
                  </p>
                  <p className="text-on-surface font-medium">
                    Gelateria ufficiale <strong>2024 · 2025 · 2026</strong>
                  </p>
                </div>
                <div>
                  <p className="text-gold text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">
                    Best in Maremma
                  </p>
                  <p className="text-on-surface font-medium">
                    <strong>2020 · 2021 · 2022 · 2023</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gusti Signature */}
        <section id="gusti" className="bg-surface-low">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                I nostri gusti
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                I Gusti del <em>Gelato Artigianale</em> Orso Bianco
              </h2>
            </div>

            {gustiData.map((gusto) => (
              <GustoCard key={gusto.name} {...gusto} />
            ))}
          </div>
        </section>

        {/* Altri prodotti */}
        <section id="prodotti" className="bg-surface">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                Oltre il gelato
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
                Il nostro mondo non si ferma <em>al gelato</em>
              </h2>
              <p className="text-on-surface-variant max-w-xl mx-auto mt-4 leading-relaxed">
                Ogni giorno prepariamo una selezione di prodotti pensati
                per essere gustati fronte mare.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
              {altriProdotti.map((prodotto) => (
                <div
                  key={prodotto.name}
                  className="flex flex-col gap-3 bg-surface-lowest rounded-xl overflow-hidden shadow-ambient"
                >
                  <div className="bg-surface-mid aspect-square overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prodotto.imageSrc}
                      alt={prodotto.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-4 pb-4 pt-1 md:px-5 md:pb-5">
                    <h3 className="font-serif text-lg md:text-xl text-primary mb-1">
                      {prodotto.name}
                    </h3>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                      {prodotto.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* La nostra filosofia */}
        <section id="filosofia" className="bg-surface-low">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                La nostra filosofia
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-8">
                La qualità <em>non ha confini</em>
              </h2>
              <div className="space-y-5 text-on-surface-variant text-base md:text-lg leading-relaxed text-left md:text-center">
                <p>
                  Dopo più di dieci anni di esperienza, la nostra idea di gelato nasce da
                  una <strong>ricerca attenta delle materie prime</strong>. Selezioniamo
                  ingredienti di qualità, con cura e rispetto.
                </p>
                <p>
                  Non ci siamo mai fermati solo al territorio. Siamo curiosi, appassionati
                  di viaggi, alla ricerca di sapori, prodotti e ispirazioni da ogni parte.
                  Perché crediamo che <strong>la qualità non abbia confini</strong>, e che
                  ogni ingrediente possa raccontare una storia.
                </p>
                <p className="font-serif text-primary text-xl md:text-2xl leading-snug pt-2">
                  Ogni giorno prendono forma i nostri gusti:
                  <em className="block mt-1">tra tradizione, ricerca e identità.</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-surface">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
              <div>
                <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                  Gallery
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
                  Uno spazio pronto per i nuovi <em>scatti</em>
                </h2>
              </div>
              <p className="text-on-surface-variant max-w-2xl leading-relaxed">
                Per ora qui non mettiamo immagini definitive. Ho predisposto un carosello
                automatico con placeholder ordinati, così quando arrivano le nuove foto
                basta sostituire gli slot senza toccare la struttura.
              </p>
            </div>

            <GalleryCarousel />
          </div>
        </section>

        {/* Casa Sanremo + Contatti */}
        <section id="contatti" className="bg-surface-low">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                Un palco nazionale
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                La Gelateria di <em>Casa Sanremo</em>
              </h2>
              <p className="text-on-surface-variant mt-3">
                Fieri di essere la gelateria ufficiale di Casa Sanremo nel 2024, 2025 e 2026.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InstagramFeed />
              <MapCard />
            </div>
          </div>
        </section>

        <OpeningHours />

        {/* Rassegna Stampa */}
        <section id="press" className="bg-surface">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                Rassegna Stampa
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                Hanno <em>raccontato</em> di noi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {pressArticles.map((article) => (
                <a
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-surface-lowest rounded-2xl overflow-hidden shadow-ambient hover:shadow-elevated transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-low">
                    <Image
                      src={article.image}
                      alt={`Anteprima articolo: ${article.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-[0.15em] font-bold text-primary">
                        {article.source}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg md:text-xl text-primary leading-snug mb-3 group-hover:text-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed flex-1 mb-4">
                      {article.excerpt}
                    </p>
                    <span className="text-xs font-semibold text-gold inline-flex items-center gap-1 mt-auto">
                      Leggi l&apos;articolo
                      <span className="group-hover:translate-x-1 transition-transform">&#8594;</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
