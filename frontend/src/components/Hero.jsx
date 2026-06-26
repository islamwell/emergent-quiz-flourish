import React from "react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { images, ayah } from "../mock";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={images.heroValley}
          alt="Serene misty green valley"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2f24]/90 via-[#0d2f24]/65 to-[#0d2f24]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute top-32 right-[12%] h-24 w-24 rounded-full bg-accent/25 blur-2xl floaty" />
      <div className="absolute bottom-40 right-[28%] h-16 w-16 rounded-full bg-emerald-200/30 blur-xl floaty" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pt-24">
        <div className="max-w-2xl fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-sm text-white/90">
            <Sparkles className="h-4 w-4 text-accent" />
            Learning that nurtures the soul
          </span>

          <h1 className="font-display text-white mt-6 text-[2.7rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-tight">
            Enlighten your life with the{" "}
            <span className="italic text-accent">Nur</span> of Al Quran
          </h1>

          <p className="mt-6 text-lg text-white/85 leading-relaxed max-w-xl">
            Authentic, heart-centered Quran &amp; Islamic education for every age —
            guiding hearts back to their Creator through knowledge, beauty and goodness.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-7 h-13 text-base shadow-lg group" asChild>
              <a href="#courses">
                Explore Courses
                <ArrowRight className="ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white px-7 h-13 text-base backdrop-blur-md" asChild>
              <a href="#about">
                <PlayCircle className="mr-1.5 h-5 w-5" />
                Our Story
              </a>
            </Button>
          </div>

          {/* Ayah card */}
          <div className="mt-12 inline-flex flex-col gap-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-6 py-4 max-w-md">
            <p className="font-arabic text-2xl text-white text-right leading-loose" dir="rtl">
              {ayah.arabic}
            </p>
            <p className="text-white/85 text-sm italic">“{ayah.translation}”</p>
            <p className="text-accent text-xs font-medium tracking-wide">{ayah.reference}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
