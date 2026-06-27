import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PageHero = ({ image, eyebrow, title, subtitle, crumb }) => {
  return (
    <section className="relative min-h-[58vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2f24]/95 via-[#0d2f24]/70 to-[#0d2f24]/45" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pb-14 pt-32">
        <nav className="flex items-center gap-1.5 text-sm text-white/70 fade-up">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white/90">{crumb || title}</span>
        </nav>
        {eyebrow && (
          <span className="mt-5 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent fade-up">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-white mt-3 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/85 max-w-2xl fade-up">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
