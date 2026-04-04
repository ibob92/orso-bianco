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
  title: "Gelateria Orso Bianco | Il Miglior Gelato a Castiglione della Pescaia",
  description:
    "Vieni a provare il vero gelato artigianale alla Gelateria Orso Bianco in Via Roma 10, Castiglione della Pescaia. Gelateria ufficiale di Casa Sanremo.",
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
