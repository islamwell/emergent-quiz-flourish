import React from "react";
import { ArrowUpRight, Clock, CalendarDays, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { courses, images } from "../mock";

const FeaturedCourses = () => {
  return (
    <section id="courses" className="relative py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Our Programs
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4 leading-[1.1]">
              Courses to enlighten every journey
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm sm:text-right">
            From flagship Tafseer programs to joyful kids&apos; classes — there is a path here for you.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {courses.map((c) => (
            <article
              key={c.id}
              className="group rounded-3xl overflow-hidden bg-card border border-border hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 transition-all duration-400"
            >
              <Link to={`/courses/${c.id}`} className="block relative h-52 overflow-hidden">
                <img
                  src={images[c.image]}
                  alt={c.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground hover:bg-accent border-0 rounded-full px-3">
                  {c.tag}
                </Badge>
                <span className="absolute bottom-4 left-4 text-white text-xs font-medium bg-white/15 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                  {c.level}
                </span>
              </Link>

              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {c.desc}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" />{c.duration}</span>
                  <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-primary" />{c.language}</span>
                  <span className="inline-flex items-center gap-1.5 col-span-2"><CalendarDays className="h-3.5 w-3.5 text-primary" />Starts {c.start}</span>
                </div>

                <Button variant="ghost" className="mt-5 w-full justify-between rounded-xl border border-border group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                  <Link to={`/courses/${c.id}`}>
                    View Course
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
