import React from "react";
import {
  BookOpen,
  AudioLines,
  Brain,
  Sparkles,
  Languages,
  HeartHandshake,
} from "lucide-react";
import { subjects } from "../mock";

const iconMap = { BookOpen, AudioLines, Brain, Sparkles, Languages, HeartHandshake };

const Subjects = () => {
  return (
    <section id="subjects" className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            What We Teach
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4 leading-[1.1]">
            A complete path of sacred learning
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Every subject is carefully designed to deepen your understanding and bring the
            teachings of the Quran into everyday life.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <div
                key={s.title}
                className="group relative rounded-3xl bg-card border border-border p-8 hover:border-primary/30 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 transition-all duration-400 overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md group-hover:scale-110 transition-transform duration-300">
                  {Icon && <Icon className="h-6 w-6" />}
                </span>
                <h3 className="relative mt-6 font-display text-2xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="relative mt-5 inline-block text-xs font-semibold tracking-wider text-accent">
                  0{i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Subjects;
