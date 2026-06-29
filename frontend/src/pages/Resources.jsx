import React, { useEffect, useState } from "react";
import { Library, Moon, Headphones, GalleryHorizontalEnd, BookMarked, ArrowRight, Music } from "lucide-react";
import PageHero from "../components/PageHero";
import { images, resources, readingMaterial } from "../mock";
import { getMedia } from "../lib/api";
import { useToast } from "../hooks/use-toast";

const iconMap = { Library, Moon, Headphones, GalleryHorizontalEnd };

const Resources = () => {
  const { toast } = useToast();
  const [audio, setAudio] = useState([]);
  const notify = (title) =>
    toast({ title, description: "This section is part of the preview — full content coming soon, inshaAllah." });

  useEffect(() => {
    getMedia("audio").then(setAudio).catch(() => {});
  }, []);

  return (
    <>
      <PageHero
        image={images.greenForest}
        eyebrow="Free Resources"
        title="Keep learning, anytime"
        subtitle="Explore our growing library of reading material, duas, lectures and student work — freely available to all."
        crumb="Resources"
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((r) => {
              const Icon = iconMap[r.icon];
              return (
                <button key={r.title} onClick={() => notify(r.title)} className="group text-left rounded-3xl bg-card border border-border p-7 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {Icon && <Icon className="h-6 w-6" />}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">{r.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Reading Material</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4">Books &amp; companions</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {readingMaterial.map((b) => (
              <button key={b.title} onClick={() => notify(b.title)} className="group flex gap-5 text-left rounded-3xl bg-card border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <BookMarked className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lectures / Audio */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Lectures &amp; Recitations</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4">Listen &amp; reflect</h2>
          </div>
          {audio.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-border bg-secondary/30 p-12 text-center">
              <Music className="h-8 w-8 text-primary/50 mx-auto" />
              <p className="mt-3 text-muted-foreground">New lectures and recitations will appear here soon, inshaAllah.</p>
            </div>
          ) : (
            <div className="mt-10 space-y-4">
              {audio.map((a) => (
                <div key={a.id} className="rounded-3xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Music className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{a.title}</h3>
                      {a.description && <p className="text-sm text-muted-foreground truncate">{a.description}</p>}
                    </div>
                  </div>
                  <audio controls src={a.url} className="mt-4 w-full" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Resources;
