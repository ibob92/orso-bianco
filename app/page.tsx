import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GustoCard from "@/components/GustoCard";
import FidelityCard from "@/components/FidelityCard";
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Dove si trova la Gelateria Orso Bianco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Gelateria Orso Bianco si trova in Via Roma 10-12 a Castiglione della Pescaia (GR), sul lungomare della Maremma Toscana. È raggiungibile a piedi dal centro storico.",
      },
    },
    {
      "@type": "Question",
      name: "Quali sono i gusti più famosi della Gelateria Orso Bianco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I gusti signature includono il Pistacchio di Bronte DOP, il Limone Basilico e Ananas (il più citato nelle recensioni), il Caramello al Burro Salato, il Pompelmo Rosa e Champagne e il Croccante all'Amarena.",
      },
    },
    {
      "@type": "Question",
      name: "Perché la Gelateria Orso Bianco è famosa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orso Bianco è la gelateria ufficiale di Casa Sanremo dal 2024 al 2026, ha vinto il premio Best in Maremma per 4 anni consecutivi (2020-2023) e dal 1974 produce gelato artigianale con materie prime d'eccellenza.",
      },
    },
    {
      "@type": "Question",
      name: "La Gelateria Orso Bianco ha una fidelity card?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, Orso Bianco offre una Fidelity Card digitale tramite l'app BonusQR. Puoi accumulare punti ad ogni acquisto e ottenere sconti esclusivi e prodotti omaggio.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <main>
        <HeroSection />

        {/* La Nostra Storia — SEO content block */}
        <section className="bg-surface">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">
              Gelateria Artigianale dal 1974 a Castiglione della Pescaia
            </h2>
            <p className="text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              Da oltre 50 anni, la Gelateria Orso Bianco è un punto di riferimento per il gelato artigianale
              in Maremma Toscana. Ogni gusto viene creato ogni giorno nel nostro laboratorio sul lungomare
              di Castiglione della Pescaia, con ingredienti selezionati e senza coloranti artificiali.
              Premio Best in Maremma per 4 anni consecutivi e gelateria ufficiale di Casa Sanremo.
            </p>
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

        <FidelityCard />

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

        {/* FAQ — SEO featured snippet section */}
        <section className="bg-surface">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <h2 className="font-serif text-3xl md:text-4xl text-primary text-center mb-10">
              Domande Frequenti
            </h2>
            <div className="max-w-2xl mx-auto space-y-8">
              <div>
                <h3 className="font-serif text-lg text-primary mb-2">
                  Dove si trova la Gelateria Orso Bianco?
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  La Gelateria Orso Bianco si trova in Via Roma 10-12 a Castiglione della Pescaia (GR),
                  sul lungomare della Maremma Toscana. È raggiungibile a piedi dal centro storico.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-primary mb-2">
                  Quali sono i gusti più famosi della Gelateria Orso Bianco?
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  I gusti signature includono il Pistacchio di Bronte DOP, il Limone Basilico e Ananas
                  (il più citato nelle recensioni), il Caramello al Burro Salato, il Pompelmo Rosa e
                  Champagne e il Croccante all&apos;Amarena.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-primary mb-2">
                  Perché la Gelateria Orso Bianco è famosa?
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Orso Bianco è la gelateria ufficiale di Casa Sanremo dal 2024 al 2026, ha vinto il
                  premio Best in Maremma per 4 anni consecutivi (2020-2023) e dal 1974 produce gelato
                  artigianale con materie prime d&apos;eccellenza.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-primary mb-2">
                  La Gelateria Orso Bianco ha una fidelity card?
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Sì, Orso Bianco offre una Fidelity Card digitale tramite l&apos;app BonusQR. Puoi
                  accumulare punti ad ogni acquisto e ottenere sconti esclusivi e prodotti omaggio.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
