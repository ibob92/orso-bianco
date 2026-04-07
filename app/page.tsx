import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GustoCard from "@/components/GustoCard";
import InstagramFeed from "@/components/InstagramFeed";
import MapCard from "@/components/MapCard";
import Footer from "@/components/Footer";

const gustiData = [
  {
    name: "Pistacchio di Bronte DOP",
    description:
      "Tostato a legna e raffinato a pietra. Intenso, persistente, inconfondibile. Dal terreno vulcanico dell'Etna alla nostra mantecatrice.",
    imageSrc: "/gusto-pistacchio.png",
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
    imageSrc: "/gusto-limone.png",
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
    imageSrc: "/gusto-caramello.png",
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
    "https://orso-bianco.vercel.app/gelato-hero.png",
    "https://orso-bianco.vercel.app/gusto-pistacchio.png",
    "https://orso-bianco.vercel.app/gusto-limone.png",
    "https://orso-bianco.vercel.app/gusto-caramello.png",
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Photo */}
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-[60px]" />
                <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                  <Image
                    src="/fondatori-casa-sanremo.jpg"
                    alt="Carmine Marsella e Sara Masci, titolari della Gelateria Orso Bianco, a Casa Sanremo"
                    width={960}
                    height={1280}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                  La nostra storia
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-6">
                  Un pit stop che è durato <em>una vita</em>
                </h2>
                <div className="space-y-4 text-on-surface-variant leading-relaxed">
                  <p>
                    Carmine e Sara avevano diciotto e diciassette anni. Tornavano da Torino
                    verso Frosinone e decisero di fare un pit stop per strada. Si fermarono
                    a Castiglione della Pescaia, e quel posto li folgorò. Si promisero che
                    un giorno sarebbero tornati per restare.
                  </p>
                  <p>
                    L&apos;hanno fatto davvero. Nel 2013 hanno rilevato una gelateria storica
                    sul lungomare, partendo da zero — nessun corso, nessuna scorciatoia.
                    Hanno imparato da autodidatti, cercando la loro ricetta fra latte, zucchero
                    e panna. Ci sono voluti cinque anni per trovarla. Oggi l&apos;Orso Bianco
                    è la loro casa.
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
