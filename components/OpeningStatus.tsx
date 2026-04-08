"use client";

import { useEffect, useState } from "react";

// Opening hours for a season. Each day: null = closed, [openHour, closeHour] in 24h format
export type DayHours = [number, number] | null;

export type SeasonHours = {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
};

type Props = {
  summerHours: SeasonHours;
  winterHours: SeasonHours;
};

// Returns day name in lowercase English matching SeasonHours keys
function getDayName(date: Date): keyof SeasonHours {
  const days: (keyof SeasonHours)[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[date.getDay()];
}

// Summer season: June (5) through September (8), inclusive
function isSummerSeason(date: Date): boolean {
  const month = date.getMonth();
  return month >= 5 && month <= 8;
}

function isOpenNow(hours: SeasonHours, date: Date): boolean {
  const day = getDayName(date);
  const dayHours = hours[day];
  if (!dayHours) return false;
  const [open, close] = dayHours;
  const currentHour = date.getHours() + date.getMinutes() / 60;
  return currentHour >= open && currentHour < close;
}

export default function OpeningStatus({ summerHours, winterHours }: Props) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Compute current date in Europe/Rome timezone
    const romeTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
    );
    const hours = isSummerSeason(romeTime) ? summerHours : winterHours;
    setOpen(isOpenNow(hours, romeTime));
    setMounted(true);
  }, [summerHours, winterHours]);

  if (!mounted) {
    // Reserve space to avoid CLS (same dimensions as badge)
    return <span className="inline-block h-7 w-28" aria-hidden="true" />;
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-opacity duration-300 ${
        open
          ? "bg-[#e8f5e9] text-[#2e7d32]"
          : "bg-surface-mid text-on-surface-variant"
      }`}
      role="status"
      aria-label={open ? "Gelateria aperta adesso" : "Gelateria chiusa ora"}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          open ? "bg-[#2e7d32]" : "bg-on-surface-variant"
        }`}
        aria-hidden="true"
      />
      {open ? "Aperto adesso" : "Chiuso ora"}
    </span>
  );
}
