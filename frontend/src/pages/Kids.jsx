import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Clock, HeartHandshake, Smile, ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import { Button } from "../components/ui/button";
import { images, kidsFeatures, kidsLevels } from "../mock";

const featureIcons = [Sparkles, Clock, HeartHandshake, Smile];

const Kids = () => {
  return (
    <>
      <PageHero
        image={images.leaves1}
        eyebrow="For Young Hearts"
        title="A joyful start to a lifelong love"
        subtitle="Gentle, story-filled classes that help children ages 5–12 fall in love with the Quran, beautiful duas and good manners."
        crumb="Kids"
      />

      {/* Features */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Why Kids Love It</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4">Learning that feels like play</h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kidsFeatures.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <div key={f.title} className="rounded-3xl bg-secondary/50 border border-border p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-20 sm:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Age Groups</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4">A path for every age</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-7">
            {kidsLevels.map((lvl, i) => (
              <div key={lvl.name} className="group relative rounded-3xl overflow-hidden bg-card border border-border hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="h-40 overflow-hidden">
                  <img src={[images.leaves2, images.greenForest, images.greenStream][i]} alt={lvl.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-7">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{lvl.age}</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">{lvl.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lvl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden">
            <img src={images.valley3} alt="Misty green valley" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d2f24]/95 to-[#0d2f24]/82" />
            <div className="relative z-10 px-7 sm:px-14 py-14 text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">Give your child the gift of light</h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto">Enrollment for the new kids' term is open. Reserve a place for your little one today.</p>
              <Button className="mt-7 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 h-12 shadow-lg" asChild>
                <Link to="/courses/kids-course">Enroll Your Child <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kids;
