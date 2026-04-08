import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text */}
        <div className="z-10">
          <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-5">
            dal 1974 · Castiglione della Pescaia
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-primary leading-[1.08] tracking-tight mb-6">
            L&apos;Arte del{" "}
            <em className="block">Gelato Artigianale</em>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mb-8">
            Dal 1974 nel cuore di Castiglione della Pescaia, in Maremma Toscana.
            Gelato artigianale con materie prime d&apos;eccellenza.
            Gelateria ufficiale di Casa Sanremo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#gusti"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3.5 rounded-full font-semibold hover:scale-[1.02] transition-transform"
            >
              Scopri i Gusti
              <span className="text-lg">&#8594;</span>
            </a>
            <a
              href="https://www.instagram.com/orsobianco_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-surface-lowest text-primary px-8 py-3.5 rounded-full font-semibold shadow-ambient hover:shadow-elevated transition-shadow"
            >
              Seguici su Instagram
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-secondary-container/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gold/10 rounded-full blur-[60px]" />
          <div className="relative z-10 rounded-2xl overflow-hidden bg-surface-low">
            <Image
              src="/gelato-hero.webp"
              alt="Cono gelato artigianale Gelateria Orso Bianco a Castiglione della Pescaia con cialda logo e sfondo borgo medievale"
              width={800}
              height={1067}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
