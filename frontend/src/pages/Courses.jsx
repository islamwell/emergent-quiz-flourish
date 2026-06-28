import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, CalendarDays, Globe } from "lucide-react";
import PageHero from "../components/PageHero";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { images } from "../mock";
import { getCourses } from "../lib/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.tag)))];
  const filtered = active === "All" ? courses : courses.filter((c) => c.tag === active);

  return (
    <>
      <PageHero
        image={images.valley4}
        eyebrow="Our Programs"
        title="Courses to enlighten every journey"
        subtitle="From flagship Tafseer programs to joyful kids' classes — explore authentic, structured learning for every age and stage."
        crumb="Courses"
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium border transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-3xl border border-border bg-secondary/40 h-[420px] animate-pulse" />
                ))
              : filtered.map((c) => (
              <article
                key={c.id}
                className="group rounded-3xl overflow-hidden bg-card border border-border hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 transition-all duration-400"
              >
                <Link to={`/courses/${c.id}`} className="block relative h-52 overflow-hidden">
                  <img src={images[c.image]} alt={c.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground hover:bg-accent border-0 rounded-full px-3">{c.tag}</Badge>
                  <span className="absolute bottom-4 left-4 text-white text-xs font-medium bg-white/15 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">{c.level}</span>
                </Link>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">{c.desc}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" />{c.duration}</span>
                    <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-primary" />{c.language}</span>
                    <span className="inline-flex items-center gap-1.5 col-span-2"><CalendarDays className="h-3.5 w-3.5 text-primary" />Starts {c.start}</span>
                  </div>
                  <Button variant="ghost" className="mt-5 w-full justify-between rounded-xl border border-border group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                    <Link to={`/courses/${c.id}`}>View Course<ArrowUpRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
