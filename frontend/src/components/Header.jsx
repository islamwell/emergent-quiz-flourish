import React, { useEffect, useState } from "react";
import { Menu, X, Moon } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { navLinks } from "../mock";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On inner pages there is a colored banner, but we keep header solid for clarity.
  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/90 backdrop-blur-xl border-b border-border/70 shadow-[0_8px_30px_rgb(20,60,40,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Moon className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className={`font-display text-xl font-semibold tracking-tight transition-colors ${solid ? "text-primary" : "text-white"}`}>
              NurulQuran
            </span>
            <span className={`text-[10px] uppercase tracking-[0.22em] mt-0.5 transition-colors ${solid ? "text-muted-foreground" : "text-white/70"}`}>
              Light of the Quran
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full ${
                  isActive ? "after:w-full" : "after:w-0"
                } ${
                  solid
                    ? isActive
                      ? "text-primary"
                      : "text-foreground/75 hover:text-primary"
                    : "text-white/85 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button className={`rounded-full px-6 shadow-md transition-colors ${solid ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-accent hover:bg-accent/90 text-accent-foreground"}`} asChild>
            <Link to="/courses">Enroll Now</Link>
          </Button>
        </div>

        <button
          className={`lg:hidden p-2 transition-colors ${solid ? "text-primary" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/97 backdrop-blur-xl border-b border-border px-5 pb-6 pt-2 space-y-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 text-base font-medium ${isActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button className="w-full mt-3 rounded-full" asChild>
            <Link to="/courses" onClick={() => setOpen(false)}>Enroll Now</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
