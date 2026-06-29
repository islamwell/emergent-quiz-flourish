import React from "react";
import { Quote } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";

const Testimonials = () => {
  const { testimonials } = useSiteContent();
  return (
    <section className="relative py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Voices of Light
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4 leading-[1.1]">
            Stories from our students
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-7">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-3xl bg-secondary/40 border border-border p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="h-9 w-9 text-accent/40" />
              <blockquote className="mt-4 text-lg text-foreground/90 leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {t.initials}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
