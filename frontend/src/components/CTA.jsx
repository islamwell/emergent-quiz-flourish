import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { images } from "../mock";
import { subscribeNewsletter } from "../lib/api";
import { useToast } from "../hooks/use-toast";

const CTA = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await subscribeNewsletter(email);
      setDone(true);
      toast({
        title: "JazakAllah Khair!",
        description: "You're on the list. We'll reach out with the next intake details.",
      });
      setEmail("");
      setTimeout(() => setDone(false), 4000);
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden">
          <img src={images.greenStream} alt="Peaceful green stream" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d2f24]/95 via-[#0d2f24]/88 to-[#0d2f24]/80" />

          <div className="relative z-10 px-7 sm:px-16 py-16 sm:py-20 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white leading-[1.1] max-w-2xl mx-auto">
              Begin your journey towards the light
            </h2>
            <p className="mt-5 text-lg text-white/80 max-w-xl mx-auto">
              Join thousands of learners worldwide. Enter your email and we&apos;ll guide you to
              the right course for the upcoming intake.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 rounded-full bg-white/95 border-0 px-5 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
              />
              <Button type="submit" disabled={submitting} className="h-12 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-7 shrink-0 shadow-lg disabled:opacity-70">
                {done ? (
                  <>
                    <CheckCircle2 className="mr-1.5 h-5 w-5" /> Joined
                  </>
                ) : (
                  <>
                    {submitting ? "Sending..." : "Get Started"}
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
            <p className="mt-4 text-xs text-white/60">Free to enroll • No spam • Unsubscribe anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
