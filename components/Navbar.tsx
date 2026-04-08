"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "La Storia", href: "#storia" },
  { label: "I Gusti", href: "#gusti" },
  { label: "Orari", href: "#orari" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-screen-2xl mx-auto">
          <a
            href="#"
            onClick={closeMenu}
            className="font-serif text-2xl tracking-tight text-primary relative z-[60]"
          >
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

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden text-primary relative z-[60]"
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden bg-surface transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="font-serif text-3xl tracking-tight text-primary hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contatti"
            onClick={closeMenu}
            className="mt-4 bg-primary text-on-primary px-8 py-3 rounded-full text-base font-semibold hover:bg-primary-container transition-colors"
          >
            Dove Siamo
          </a>
        </div>
      </div>
    </>
  );
}
