import React from "react";
import { approachSteps, images } from "../mock";

const Approach = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              How It Works
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4 leading-[1.1]">
              A gentle path, beautifully guided
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              We make learning the Quran accessible and joyful — step by step, at a pace that
              fits your life.
            </p>

            <div className="mt-10 space-y-3">
              {approachSteps.map((s) => (
                <div
                  key={s.step}
                  className="group flex gap-5 rounded-2xl bg-card border border-border p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <span className="font-display text-2xl font-semibold text-accent shrink-0 w-10">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:sticky lg:top-28">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/15 aspect-[4/5]">
              <img src={images.valley3} alt="Misty green mountains" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-background/90 backdrop-blur-md border border-border p-6 shadow-xl">
              <p className="font-arabic text-xl text-primary text-right leading-loose" dir="rtl">
                وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
              </p>
              <p className="mt-2 text-sm text-muted-foreground italic">
                “Whoever is mindful of Allah, He will make a way out for them.”
              </p>
              <p className="mt-1 text-xs font-medium text-accent">Surah At-Talaq, 65:2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
