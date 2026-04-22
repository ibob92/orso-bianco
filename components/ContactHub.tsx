import OpeningStatus, { SeasonHours } from "./OpeningStatus";

const HOURS: SeasonHours = {
  monday: [14, 20],
  tuesday: [14, 20],
  wednesday: [14, 20],
  thursday: [14, 20],
  friday: [14, 20],
  saturday: [13, 20],
  sunday: [13, 20],
};

// Canonical Google Maps URL (CID = unique business identifier).
// Opens the exact business card, survives rename/move.
const MAPS_PLACE_URL = "https://www.google.com/maps?cid=13152876127029996368";

const IG_POSTS = [
  { src: "/ig/post-0.jpg", alt: "Gelateria Orso Bianco a Casa Sanremo 2026 — Festival di Sanremo" },
  { src: "/ig/post-1.jpg", alt: "Il team Orso Bianco con Francesco Renga a Casa Sanremo" },
  { src: "/ig/post-2.jpg", alt: "Gelato artigianale Orso Bianco servito a Casa Sanremo" },
  { src: "/ig/post-3.jpg", alt: "Gelateria Orso Bianco al Teatro Ariston durante il Festival di Sanremo" },
  { src: "/ig/post-4.jpg", alt: "Cornetti artigianali e brioches della Gelateria Orso Bianco Castiglione della Pescaia" },
  { src: "/ig/post-5.jpg", alt: "Carmine Marsella e Sara Masci — titolari Gelateria Orso Bianco dal 2013" },
];

export default function ContactHub() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-8 lg:gap-10">
      {/* LEFT — info block */}
      <div className="bg-surface-lowest rounded-2xl p-7 md:p-8 shadow-ambient flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
            Vieni a trovarci
          </p>
          <OpeningStatus summerHours={HOURS} winterHours={HOURS} />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-6">
          Sul lungomare di <em>Castiglione</em>
        </h2>

        {/* Orari compatti */}
        <div className="mb-6 border border-surface-mid rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-surface-mid">
            <span className="text-sm font-medium text-on-surface">Lun – Ven</span>
            <span className="text-sm text-on-surface-variant">14:00 – 20:00</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-sm font-medium text-on-surface">Sab – Dom</span>
            <span className="text-sm text-on-surface-variant">13:00 – 20:00</span>
          </div>
        </div>

        {/* Indirizzo + telefono */}
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-1">
              Indirizzo
            </p>
            <address className="not-italic text-sm text-on-surface leading-relaxed">
              Via Roma 10-12<br />
              58043 Castiglione della Pescaia (GR)
            </address>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-1">
              Telefono
            </p>
            <a
              href="tel:+390564934656"
              className="text-sm text-on-surface hover:text-primary transition-colors"
            >
              +39 0564 934656
            </a>
          </div>
        </div>

        {/* CTA primaria */}
        <a
          href={MAPS_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-container transition-colors mb-5"
        >
          Apri su Google Maps
          <span>&#8594;</span>
        </a>

        {/* Rating strip */}
        <div className="mt-auto pt-5 border-t border-surface-mid flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-on-surface-variant">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-google-yellow">&#9733;</span>
            <strong className="text-on-surface">4.6</strong> Google
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#00AF87]">&#9679;&#9679;&#9679;&#9679;&#9679;</span>
            <strong className="text-on-surface">4.3</strong> TripAdvisor
          </span>
        </div>
      </div>

      {/* RIGHT — Instagram */}
      <div className="flex flex-col bg-surface-lowest rounded-2xl overflow-hidden shadow-ambient">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-mid">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
              <div className="w-[34px] h-[34px] rounded-full bg-surface-lowest flex items-center justify-center text-sm">
                &#128247;
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">@orsobianco_</p>
              <p className="text-xs text-on-surface-variant">6.085 follower</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/orsobianco_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-primary hover:text-gold transition-colors"
          >
            Seguici &#8594;
          </a>
        </div>

        {/* Grid 3x2 */}
        <div className="grid grid-cols-3 gap-[3px] p-[3px] flex-1">
          {IG_POSTS.map((post) => (
            <a
              key={post.src}
              href="https://www.instagram.com/orsobianco_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm bg-surface-mid"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.src}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-on-surface/0 group-hover:bg-on-surface/20 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
