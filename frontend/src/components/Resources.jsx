import React from "react";
import {
  Library,
  Moon,
  Headphones,
  GalleryHorizontalEnd,
  ArrowRight,
} from "lucide-react";
import { resources } from "../mock";
import { useToast } from "../hooks/use-toast";

const iconMap = { Library, Moon, Headphones, GalleryHorizontalEnd };

const Resources = () => {
  const { toast } = useToast();

  const handleClick = (title) => {
    toast({
      title: `${title}`,
      description: "This section is part of the preview — full content coming soon, inshaAllAh.",
    });
  };

  return (
    <section id="resources" className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Free Resources
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4 leading-[1.1]">
            Keep learning, anytime
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((r) => {
            const Icon = iconMap[r.icon];
            return (
              <button
                key={r.title}
                onClick={() => handleClick(r.title)}
                className="group text-left rounded-3xl bg-card border border-border p-7 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {Icon && <Icon className="h-6 w-6" />}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {r.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Resources;
