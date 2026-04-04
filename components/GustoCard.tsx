type Review = {
  name: string;
  initial: string;
  color: string;
  date: string;
  text: string;
};

type GustoCardProps = {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  review: Review;
  reverse?: boolean;
};

function TripAdvisorLogo() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#34E0A1" />
      <circle cx="8.5" cy="12.5" r="3" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
      <circle cx="15.5" cy="12.5" r="3" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
      <circle cx="8.5" cy="12.5" r="1" fill="#1A1A1A" />
      <circle cx="15.5" cy="12.5" r="1" fill="#1A1A1A" />
      <path d="M6 9.5 L12 6 L18 9.5" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function GustoCard({
  name,
  description,
  imageSrc,
  imageAlt,
  review,
  reverse = false,
}: GustoCardProps) {
  const imageBlock = (
    <div className="bg-surface-mid rounded-xl aspect-[4/3] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );

  const textBlock = (
    <div className="flex flex-col gap-4 justify-center">
      <h3 className="font-serif text-2xl md:text-3xl text-primary">{name}</h3>
      <p className="text-on-surface-variant leading-relaxed">{description}</p>

      <div className="bg-surface-lowest rounded-xl p-5 shadow-ambient mt-2">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-primary text-sm font-bold shrink-0"
            style={{ backgroundColor: review.color }}
          >
            {review.initial}
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface">{review.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-[#00AF87] text-sm">&#9679;&#9679;&#9679;&#9679;&#9679;</span>
              <span className="text-outline-variant text-xs ml-1">{review.date}</span>
            </div>
          </div>
        </div>
        <p className="text-on-surface-variant text-base leading-relaxed italic">
          &ldquo;{review.text}&rdquo;
        </p>
        <div className="flex items-center gap-1.5 mt-3">
          <TripAdvisorLogo />
          <span className="text-outline-variant text-[10px] tracking-wide">Recensione Tripadvisor</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
      {reverse ? (
        <>
          <div className="order-2 md:order-1">{textBlock}</div>
          <div className="order-1 md:order-2">{imageBlock}</div>
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </div>
  );
}
