export default function FidelityCard() {
  return (
    <section id="fidelity" className="px-6 md:px-12 py-16 md:py-24 max-w-screen-xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container p-10 md:p-14">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/[0.04]" />
        <div className="absolute -bottom-12 left-1/3 w-32 h-32 rounded-full bg-white/[0.03]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <p className="text-on-primary/50 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              Programma Fedeltà Digitale
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-on-primary mb-3">
              Fidelity Card
            </h2>
            <p className="text-on-primary/70 leading-relaxed max-w-md mb-6">
              Scarica l&apos;app, iscriviti e inizia ad accumulare punti ad ogni acquisto.
              Sconti esclusivi e prodotti omaggio direttamente sul tuo smartphone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://apps.apple.com/us/app/bonusqr/id6532628050"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-7 py-3 rounded-full text-sm font-bold hover:bg-surface transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Scarica per iPhone
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.bonusqr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 text-on-primary px-7 py-3 rounded-full text-sm font-bold hover:bg-white/30 transition-colors cursor-pointer inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.5 1.448a1 1 0 0 1 0 1.49l-2.5 1.448-2.54-2.54 2.54-2.846zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Scarica per Android
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 h-56 bg-on-surface rounded-2xl flex flex-col items-center justify-center shadow-elevated relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-6 bg-on-surface flex items-center justify-center">
                <div className="w-12 h-3 bg-white/10 rounded-full" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bonusqr-logo.png" alt="BonusQR" className="w-16 h-16 rounded-xl mb-2" />
              <p className="text-white text-[8px] font-semibold">320 punti</p>
              <div className="mt-2 w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="w-3/5 h-full bg-gold rounded-full" />
              </div>
              <p className="text-white/40 text-[6px] mt-1">Prossimo premio: 500</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
