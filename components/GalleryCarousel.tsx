"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    eyebrow: "Placeholder 01",
    title: "Foto del locale",
    description: "Slot riservato a uno scatto orizzontale dell'interno o dell'esterno.",
  },
  {
    id: 2,
    eyebrow: "Placeholder 02",
    title: "Momento al banco",
    description: "Slot per una scena viva del servizio o dell'atmosfera del negozio.",
  },
  {
    id: 3,
    eyebrow: "Placeholder 03",
    title: "Dettaglio atmosfera",
    description: "Slot per un dettaglio che racconti materiali, luci, insegna o bancone.",
  },
  {
    id: 4,
    eyebrow: "Placeholder 04",
    title: "Team o fondatori",
    description: "Slot per una foto di Carmine, Sara o del team nel contesto del locale.",
  },
  {
    id: 5,
    eyebrow: "Placeholder 05",
    title: "Scatto hero del locale",
    description: "Slot per l'immagine finale più forte, pronta a sostituire il placeholder.",
  },
];

export default function GalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-gold/15 bg-surface-lowest shadow-elevated">
      <div className="relative min-h-[360px] md:min-h-[460px]">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.18),transparent_35%),linear-gradient(135deg,#141a22_0%,#0d1117_45%,#161d28_100%)]" />
              <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,transparent_0%,transparent_35%,rgba(201,184,150,0.14)_35%,rgba(201,184,150,0.14)_36%,transparent_36%,transparent_60%,rgba(201,184,150,0.08)_60%,rgba(201,184,150,0.08)_61%,transparent_61%)]" />

              <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-gold text-xs uppercase tracking-[0.28em] font-semibold mb-3">
                      {slide.eyebrow}
                    </p>
                    <h3 className="font-serif text-3xl md:text-5xl text-primary leading-tight max-w-2xl">
                      {slide.title}
                    </h3>
                  </div>
                  <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 text-primary/70 font-serif text-xl">
                    {String(slide.id).padStart(2, "0")}
                  </div>
                </div>

                <div className="max-w-2xl">
                  <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-6">
                    {slide.description}
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-surface/40 px-4 py-2 text-sm text-on-surface-variant">
                    <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                    Placeholder pronto da sostituire con la foto finale
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4 border-t border-gold/10 px-6 py-4 md:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
          Scorrimento automatico
        </p>
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Vai al placeholder ${slide.id}`}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-gold" : "w-2.5 bg-on-surface-variant/35"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
