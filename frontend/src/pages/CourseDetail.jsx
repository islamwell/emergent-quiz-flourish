import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Clock, CalendarDays, Globe, User, BadgeCheck, ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { images, resolveImage } from "../mock";
import { getCourse, createEnrollment } from "../lib/api";
import { useToast } from "../hooks/use-toast";

const CourseDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getCourse(id)
      .then((data) => setCourse(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
        <h1 className="font-display text-4xl font-semibold text-foreground">Course not found</h1>
        <p className="mt-3 text-muted-foreground">The course you're looking for doesn't exist.</p>
        <Button className="mt-6 rounded-full" asChild><Link to="/courses">Back to Courses</Link></Button>
      </div>
    );
  }

  const handleEnroll = async () => {
    try {
      await createEnrollment({ course_id: course.id, course_title: course.title });
      toast({
        title: `Interest registered for ${course.title}`,
        description: "JazakAllah Khair! Our team will reach out with joining details soon, inshaAllah.",
      });
    } catch (e) {
      toast({ title: "Something went wrong", description: "Please try again in a moment.", variant: "destructive" });
    }
  };

  return (
    <>
      <PageHero
        image={resolveImage(course.image)}
        eyebrow={course.tag}
        title={course.title}
        subtitle={course.desc}
        crumb={course.title}
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors">
              <ArrowLeft className="h-4 w-4" /> All courses
            </Link>

            <h2 className="font-display text-3xl font-semibold text-foreground mt-6">About this course</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{course.longDesc || course.desc}</p>

            <h3 className="font-display text-2xl font-semibold text-foreground mt-12">What you'll study</h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {(course.modules || []).map((m, i) => (
                <div key={i} className="flex gap-3 rounded-2xl bg-secondary/50 border border-border p-4">
                  <span className="font-display text-lg font-semibold text-accent shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm text-foreground/85">{m}</p>
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl font-semibold text-foreground mt-12">By the end, you will</h3>
            <ul className="mt-5 space-y-3">
              {(course.outcomes || []).map((o, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl border border-border bg-card shadow-xl shadow-emerald-900/5 overflow-hidden">
              <div className="relative h-40">
                <img src={resolveImage(course.image)} alt={course.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0 rounded-full">{course.level}</Badge>
              </div>
              <div className="p-6">
                <p className="font-display text-2xl font-semibold text-primary">{course.fee || "Contact for fee"}</p>
                <ul className="mt-5 space-y-3.5 text-sm">
                  <li className="flex items-center gap-3 text-foreground/80"><Clock className="h-4 w-4 text-primary" />Duration: {course.duration}</li>
                  <li className="flex items-center gap-3 text-foreground/80"><CalendarDays className="h-4 w-4 text-primary" />Starts: {course.start}</li>
                  <li className="flex items-center gap-3 text-foreground/80"><Globe className="h-4 w-4 text-primary" />Language: {course.language}</li>
                  <li className="flex items-center gap-3 text-foreground/80"><User className="h-4 w-4 text-primary" />{course.instructor || "NurulQuran Faculty"}</li>
                  <li className="flex items-center gap-3 text-foreground/80"><BadgeCheck className="h-4 w-4 text-primary" />{course.days} • {course.time}</li>
                </ul>
                <Button onClick={handleEnroll} className="mt-6 w-full rounded-full bg-primary hover:bg-primary/90 h-12 shadow-md">
                  Enroll Now <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Button variant="outline" className="mt-3 w-full rounded-full h-11" asChild>
                  <Link to="/contact">Ask a Question</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default CourseDetail;
