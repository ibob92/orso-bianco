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
    imageAlt: "Gelato al pistacchio di Bronte DOP in coppetta ceramica",
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
    imageAlt: "Gelato limone basilico e ananas con foglie di basilico fresco",
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
    imageAlt: "Gelato al caramello e burro salato con fiocchi di sale Maldon",
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Roma 10-12",
    addressLocality: "Castiglione della Pescaia",
    postalCode: "58043",
    addressRegion: "GR",
    addressCountry: "IT",
  },
  telephone: "+39 0564 934656",
  url: "https://www.instagram.com/orsobianco_/",
  priceRange: "€",
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
    "Best in Maremma 2020-2023",
  ],
};

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

        {/* Gusti Signature */}
        <section id="gusti" className="bg-surface-low">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                I nostri gusti
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                <em>Creazioni</em> che Parlano da Sole
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
      </main>

      <Footer />
    </>
  );
}
