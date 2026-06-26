import React, { useEffect, useState } from "react";
import { Menu, X, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { navLinks } from "../mock";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/70 shadow-[0_8px_30px_rgb(20,60,40,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Moon className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className={`font-display text-xl font-semibold tracking-tight transition-colors ${scrolled ? "text-primary" : "text-white"}`}>
              NurulQuran
            </span>
            <span className={`text-[10px] uppercase tracking-[0.22em] mt-0.5 transition-colors ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>
              Light of the Quran
            </span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full ${
                scrolled ? "text-foreground/75 hover:text-primary" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button className={`rounded-full px-6 shadow-md transition-colors ${scrolled ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-accent hover:bg-accent/90 text-accent-foreground"}`} asChild>
            <a href="#courses">Enroll Now</a>
          </Button>
        </div>

        <button
          className={`lg:hidden p-2 transition-colors ${scrolled ? "text-primary" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border px-5 pb-6 pt-2 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-medium text-foreground/80 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <Button className="w-full mt-3 rounded-full" asChild>
            <a href="#courses" onClick={() => setOpen(false)}>Enroll Now</a>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
