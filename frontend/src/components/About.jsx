import React from "react";
import { Leaf, Heart, Compass } from "lucide-react";
import { images } from "../mock";
import { useSiteContent } from "../context/SiteContentContext";

const pillars = [
  { icon: Compass, title: "Authentic Guidance", desc: "Pure knowledge from Quran & Sunnah." },
  { icon: Heart, title: "Heart-Centered", desc: "Education that nurtures faith and character." },
  { icon: Leaf, title: "For Everyone", desc: "Kids, sisters, mothers — all are welcome." },
];

const About = () => {
  const { mission } = useSiteContent();
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/15 aspect-[4/5]">
              <img src={images.waterfall2} alt="Peaceful waterfall in forest" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-56 rounded-2xl overflow-hidden shadow-xl border-4 border-background aspect-square">
              <img src={images.leaves2} alt="Sunlit green leaves" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -top-6 -left-4 rounded-2xl bg-primary text-primary-foreground px-6 py-5 shadow-xl">
              <p className="font-display text-3xl font-semibold">Since 2008</p>
              <p className="text-xs text-primary-foreground/80 tracking-wide">Spreading the light</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {mission.eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4 leading-[1.1]">
              {mission.title}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {mission.paragraph1}
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {mission.paragraph2}
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-5">
              {pillars.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-secondary/40 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
