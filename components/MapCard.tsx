const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d741.5!2d10.8826!3d42.7636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132870dca1c1e6e5%3A0x5e5b5e5b5e5b5e5b!2sGelateria%20Orso%20Bianco!5e0!3m2!1sit!2sit";

const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/place/Gelateria+Orso+Bianco/@42.7636,10.8826,17z/";

export default function MapCard() {
  return (
    <div className="bg-surface-lowest rounded-xl overflow-hidden shadow-ambient flex flex-col">
      {/* Map Embed — larger */}
      <div className="relative flex-1 min-h-[280px] bg-surface-high">
        <iframe
          src={MAPS_EMBED_URL}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Gelateria Orso Bianco - Google Maps"
        />
      </div>

      {/* Info — larger text */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-google-yellow text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span className="text-lg font-bold text-on-surface">4.6</span>
          <span className="text-sm text-outline-variant">su Google</span>
        </div>
        <p className="text-base font-bold text-on-surface mb-1">Gelateria Orso Bianco</p>
        <p className="text-sm text-on-surface-variant mb-1">
          Via Roma 10-12, Castiglione della Pescaia (GR)
        </p>
        <p className="text-sm text-on-surface-variant mb-5">+39 0564 934656</p>
        <a
          href={MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-on-primary px-7 py-3 rounded-full text-sm font-semibold hover:bg-primary-container transition-colors"
        >
          Indicazioni Stradali &#8599;
        </a>
      </div>
    </div>
  );
}
