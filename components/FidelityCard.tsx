export default function FidelityCard() {
  return (
    <section id="fidelity" className="px-6 md:px-12 py-16 md:py-24 max-w-screen-xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container p-10 md:p-14">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/[0.04]" />
        <div className="absolute -bottom-12 left-1/3 w-32 h-32 rounded-full bg-white/[0.03]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <p className="text-on-primary/50 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              Programma Fedeltà
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-on-primary mb-3">
              Fidelity Card
            </h2>
            <p className="text-on-primary/70 leading-relaxed max-w-md mb-6">
              Accumula punti ad ogni acquisto. Sconti esclusivi e prodotti omaggio ti aspettano.
              Chiedi la tua carta in gelateria.
            </p>
            <button className="bg-white text-primary px-7 py-3 rounded-full text-sm font-bold hover:bg-surface transition-colors cursor-pointer">
              Scopri i Vantaggi
            </button>
          </div>

          <div className="hidden md:flex w-44 h-28 bg-gradient-to-br from-gold to-gold-light rounded-xl items-center justify-center shadow-elevated">
            <div className="text-center text-primary">
              <p className="font-serif text-base font-bold">Orso Bianco</p>
              <p className="text-[9px] uppercase tracking-[0.2em] mt-0.5">Fidelity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
