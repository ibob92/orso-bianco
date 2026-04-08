import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gelateriaorsobianco.it"),
  title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
  description:
    "Gelateria Orso Bianco: il miglior gelato artigianale a Castiglione della Pescaia, Maremma Toscana. Dal 1974 in Via Roma 10. Gelateria ufficiale di Casa Sanremo 2024-2025-2026. Pistacchio di Bronte, limone basilico ananas e gusti unici.",
  keywords: [
    "gelateria Castiglione della Pescaia",
    "gelato artigianale Castiglione della Pescaia",
    "gelateria Maremma",
    "gelato artigianale Toscana",
    "miglior gelateria Grosseto",
    "Orso Bianco gelateria",
    "gelato Casa Sanremo",
    "gelateria lungomare Castiglione",
    "pistacchio di Bronte gelato",
    "gelato artigianale dal 1974",
    "Best in Maremma gelateria",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
    description:
      "Dal 1974 il vero gelato artigianale nel cuore della Maremma. Gelateria ufficiale di Casa Sanremo. Vieni a trovarci in Via Roma 10, Castiglione della Pescaia.",
    url: "https://gelateriaorsobianco.it",
    siteName: "Gelateria Orso Bianco",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/gelato-hero.webp",
        width: 800,
        height: 1067,
        alt: "Cono gelato artigianale Gelateria Orso Bianco con cialda personalizzata e sfondo Castiglione della Pescaia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelateria Orso Bianco | Gelato Artigianale a Castiglione della Pescaia",
    description:
      "Dal 1974 il vero gelato artigianale nel cuore della Maremma Toscana. Gelateria ufficiale di Casa Sanremo.",
    images: ["/gelato-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
