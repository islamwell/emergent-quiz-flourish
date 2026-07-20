import React from "react";
import { Moon, Mail, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from "../mock";
import { useSiteContent } from "../context/SiteContentContext";

const Footer = () => {
  const { contact } = useSiteContent();
  const footer = { tagline: contact.tagline, email: contact.email, phone: contact.phone };
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10">
                <Moon className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-semibold">NurulQuran</span>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              {footer.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/90">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/90">Programs</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
              <li>Sabeel Ul Jannah</li>
              <li>NurunAlaNur Tafseer</li>
              <li>Ramadan Special</li>
              <li>Kids Course</li>
              <li>Seerah &amp; Hadith</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/90">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent" />
                {footer.email}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent" />
                {footer.phone}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} NurulQuran. A redesign concept — made with light.
          </p>
          <p className="text-xs text-primary-foreground/40">
            v1.0.1 (updated 2026-07-20 16:16)
          </p>
          <p className="text-sm text-primary-foreground/60">
            Enlightening lives, one verse at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
