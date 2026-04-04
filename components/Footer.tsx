const footerLinks = [
  { label: "Instagram", href: "https://www.instagram.com/orsobianco_/" },
  { label: "Privacy", href: "#" },
  { label: "Contatti", href: "#contatti" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-mid">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="font-serif italic text-lg text-primary">Orso Bianco</p>
          <p className="text-outline-variant text-[10px] uppercase tracking-[0.15em] mt-1">
            © 2026 · dal 1974 nel cuore della Maremma
          </p>
        </div>
        <div className="flex gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-outline-variant text-[11px] uppercase tracking-[0.1em] hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
