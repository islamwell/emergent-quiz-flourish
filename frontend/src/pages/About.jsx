import React from "react";
import { Link } from "react-router-dom";
import { Compass, Heart, Sparkles, Leaf, ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import { Button } from "../components/ui/button";
import { images, aboutValues, milestones } from "../mock";

const valueIcons = [Compass, Heart, Leaf, Sparkles];

const About = () => {
  return (
    <>
      <PageHero
        image={images.valley2}
        eyebrow="Our Story"
        title="A light that keeps on growing"
        subtitle="NurulQuran is a non-profit institute devoted to making authentic Islamic knowledge beautiful, accessible and transformative for hearts everywhere."
        crumb="About"
      />

      {/* Mission */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/15 aspect-[4/5]">
              <img src={images.waterfall1} alt="Forest waterfall" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-primary text-primary-foreground px-6 py-5 shadow-xl">
              <p className="font-display text-3xl font-semibold">250K+</p>
              <p className="text-xs text-primary-foreground/80">Students enlightened</p>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our Mission</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4 leading-[1.1]">
              Reconnecting humanity with their Creator
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We believe the Quran is meant to be understood, lived and loved — not merely recited.
              Through structured, heart-centered programs, we help students of all ages build a
              lasting, meaningful connection with the words of Allah.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Every course is rooted in the Quran and authentic Sunnah, taught with sincerity,
              patience and beauty — encouraging goodness in our learners and the world around them.
            </p>
            <Button className="mt-8 rounded-full bg-primary hover:bg-primary/90 px-7 h-12 shadow-md" asChild>
              <Link to="/courses">Explore our courses <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">What We Stand For</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4">Our values</h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutValues.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div key={v.title} className="rounded-3xl bg-card border border-border p-8 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our Journey</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4">Milestones of light</h2>
          </div>
          <div className="mt-14 space-y-2">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 sm:gap-10">
                <div className="flex flex-col items-center">
                  <span className="font-display text-xl font-semibold text-accent w-14 text-center">{m.year}</span>
                  {i < milestones.length - 1 && <span className="w-px flex-1 bg-border my-2" />}
                </div>
                <div className="pb-10">
                  <h3 className="font-semibold text-lg text-foreground">{m.title}</h3>
                  <p className="mt-1 text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
