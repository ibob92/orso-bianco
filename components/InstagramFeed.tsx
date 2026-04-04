const posts = [
  { src: "/ig/post-0.jpg", alt: "Gelateria Orso Bianco a Casa Sanremo 2026 — Festival di Sanremo" },
  { src: "/ig/post-1.jpg", alt: "Il team Orso Bianco con Francesco Renga a Casa Sanremo" },
  { src: "/ig/post-2.jpg", alt: "Gelato artigianale Orso Bianco servito a Casa Sanremo" },
  { src: "/ig/post-3.jpg", alt: "Gelateria Orso Bianco al Teatro Ariston durante il Festival di Sanremo" },
  { src: "/ig/post-4.jpg", alt: "Cornetti artigianali e brioches della Gelateria Orso Bianco Castiglione della Pescaia" },
  { src: "/ig/post-5.jpg", alt: "Carmine Marsella e Sara Masci — titolari Gelateria Orso Bianco dal 2013" },
];

export default function InstagramFeed() {
  return (
    <div className="bg-surface-lowest rounded-xl overflow-hidden shadow-ambient">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
          <div className="w-[31px] h-[31px] rounded-full bg-white flex items-center justify-center text-sm">
            &#128247;
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-on-surface">@orsobianco_</p>
          <p className="text-xs text-on-surface-variant">6.085 follower</p>
        </div>
      </div>

      {/* Grid 3x2 with real photos */}
      <div className="grid grid-cols-3 gap-[3px] px-[3px]">
        {posts.map((post, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={post.src}
            alt={post.alt}
            className="aspect-square object-cover rounded-sm"
            loading="lazy"
          />
        ))}
      </div>

      {/* CTA */}
      <div className="p-4 text-center">
        <a
          href="https://www.instagram.com/orsobianco_/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-on-surface text-surface px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-primary transition-colors"
        >
          Seguici su Instagram
        </a>
      </div>
    </div>
  );
}
