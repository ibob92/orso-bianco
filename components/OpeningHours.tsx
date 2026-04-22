import OpeningStatus, { SeasonHours } from "./OpeningStatus";

// Summer: placeholder seasonal schedule, da confermare
// Current / winter-spring schedule: aggiornato da screenshot attività
const SUMMER_HOURS: SeasonHours = {
  monday: [14, 19],
  tuesday: [14, 19],
  wednesday: [14, 19],
  thursday: [14, 19],
  friday: [13.5, 19],
  saturday: [13, 20],
  sunday: [13.5, 20],
};

const WINTER_HOURS: SeasonHours = {
  monday: [14, 19],
  tuesday: [14, 19],
  wednesday: [14, 19],
  thursday: [14, 19],
  friday: [13.5, 19],
  saturday: [13, 20],
  sunday: [13.5, 20],
};

type DayRow = {
  label: string;
  hours: [number, number] | null;
};

const DAY_LABELS: Record<keyof SeasonHours, string> = {
  monday: "Lunedì",
  tuesday: "Martedì",
  wednesday: "Mercoledì",
  thursday: "Giovedì",
  friday: "Venerdì",
  saturday: "Sabato",
  sunday: "Domenica",
};

function formatHours(hours: [number, number] | null): string {
  if (!hours) return "Chiuso";
  const [open, close] = hours;
  const formatHour = (h: number) => {
    if (h === 24) return "24:00";
    const whole = Math.floor(h);
    const minutes = Math.round((h - whole) * 60);
    return `${whole.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };
  return `${formatHour(open)} – ${formatHour(close)}`;
}

function buildRows(season: SeasonHours): DayRow[] {
  return (Object.keys(DAY_LABELS) as Array<keyof SeasonHours>).map((key) => ({
    label: DAY_LABELS[key],
    hours: season[key],
  }));
}

function HoursTable({ title, rows }: { title: string; rows: DayRow[] }) {
  return (
    <div className="bg-surface-lowest rounded-xl p-5 md:p-6 shadow-ambient">
      <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-4">
        {title}
      </p>
      <ul className="space-y-2 text-sm">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex justify-between items-center py-1.5 border-b border-surface-mid last:border-b-0"
          >
            <span className="text-on-surface font-medium">{row.label}</span>
            <span
              className={`${
                row.hours ? "text-on-surface-variant" : "text-outline-variant italic"
              }`}
            >
              {formatHours(row.hours)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OpeningHours() {
  const winterRows = buildRows(WINTER_HOURS);

  return (
    <section id="orari" className="bg-surface">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Orari */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
                Orari di apertura
              </p>
              <OpeningStatus
                summerHours={SUMMER_HOURS}
                winterHours={WINTER_HOURS}
              />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-6">
              Vieni a <em>trovarci</em>
            </h2>
            <div className="max-w-md">
              <HoursTable title="Orari attuali" rows={winterRows} />
            </div>
          </div>

          {/* Come trovarci */}
          <div>
            <p className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              Come trovarci
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-6">
              Sul lungomare di <em>Castiglione</em>
            </h2>
            <div className="bg-surface-lowest rounded-xl p-6 md:p-8 shadow-ambient space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-2">
                  Indirizzo
                </p>
                <address className="not-italic text-on-surface leading-relaxed">
                  Via Roma 10-12<br />
                  58043 Castiglione della Pescaia (GR)
                </address>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-2">
                  Telefono
                </p>
                <a
                  href="tel:+390564934656"
                  className="text-on-surface hover:text-primary transition-colors"
                >
                  +39 0564 934656
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-gold mb-2">
                  In breve
                </p>
                <ul className="text-sm text-on-surface-variant space-y-1.5">
                  <li>Sul lungomare di Castiglione della Pescaia</li>
                  <li>A pochi passi dal porto turistico</li>
                  <li>Raggiungibile a piedi dal centro storico</li>
                </ul>
              </div>

              <a
                href="https://www.google.com/maps/place/Gelateria+Orso+Bianco/@42.7636,10.8826,17z/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-container transition-colors"
              >
                Apri su Google Maps
                <span className="ml-2">&#8594;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
