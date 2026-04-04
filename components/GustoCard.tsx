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

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
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

      <div className="bg-surface-lowest rounded-xl p-4 shadow-ambient mt-2">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-on-primary text-xs font-bold shrink-0"
            style={{ backgroundColor: review.color }}
          >
            {review.initial}
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface">{review.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-google-yellow text-xs">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-outline-variant text-[10px] ml-1">{review.date}</span>
            </div>
          </div>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed italic">
          &ldquo;{review.text}&rdquo;
        </p>
        <div className="flex items-center gap-1.5 mt-2">
          <GoogleLogo />
          <span className="text-outline-variant text-[9px] tracking-wide">Recensione Google</span>
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
