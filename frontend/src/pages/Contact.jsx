import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import PageHero from "../components/PageHero";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { images, footer, faqs } from "../mock";
import { submitContact } from "../lib/api";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || !form.message) {
      toast({ title: "Please complete all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await submitContact(form);
      toast({
        title: "JazakAllah Khair!",
        description: "Your message has been received. We'll get back to you soon, inshaAllah.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: footer.email },
    { icon: Phone, label: "Phone", value: footer.phone },
    { icon: MapPin, label: "Office", value: "Oslo, Norway (Global online)" },
  ];

  return (
    <>
      <PageHero
        image={images.cloudsSky}
        eyebrow="Get in Touch"
        title="We'd love to hear from you"
        subtitle="Questions about a course, enrollment or anything else? Reach out and our team will be glad to help."
        crumb="Contact"
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-semibold text-foreground">Contact details</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team is here to guide you towards the right course and answer any questions
              you may have along the way.
            </p>
            <div className="mt-8 space-y-5">
              {contactItems.map((c) => (
                <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                    <p className="font-medium text-foreground">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-7 sm:p-10 shadow-xl shadow-emerald-900/5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={form.name} onChange={update("name")} placeholder="Your name" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" className="h-11 rounded-xl" />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={form.subject} onChange={update("subject")} placeholder="How can we help?" className="h-11 rounded-xl" />
              </div>
              <div className="mt-5 space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" value={form.message} onChange={update("message")} placeholder="Write your message..." className="min-h-[140px] rounded-xl resize-none" />
              </div>
              <Button type="submit" disabled={submitting} className="mt-6 rounded-full bg-primary hover:bg-primary/90 px-8 h-12 shadow-md disabled:opacity-70">
                {submitting ? "Sending..." : "Send Message"} <Send className="ml-1.5 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-secondary/40">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Questions</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mt-4">Frequently asked</h2>
          </div>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Contact;
