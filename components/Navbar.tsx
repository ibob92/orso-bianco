const navLinks = [
  { label: "La Storia", href: "#storia" },
  { label: "I Gusti", href: "#gusti" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-screen-2xl mx-auto">
        <a href="#" className="font-serif text-2xl tracking-tight text-primary">
          Orso Bianco
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-serif text-lg tracking-tight text-primary/50 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contatti"
          className="hidden md:inline-flex bg-primary text-on-primary px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-container transition-colors"
        >
          Dove Siamo
        </a>

        <button className="md:hidden text-primary" aria-label="Menu">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
