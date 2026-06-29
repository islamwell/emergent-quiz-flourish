import React, { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { getSiteContent, adminUpdateSiteContent } from "../../lib/api";
import { useToast } from "../../hooks/use-toast";

const Lbl = ({ label, value, onChange, area }) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    {area ? (
      <Textarea value={value || ""} onChange={(e) => onChange(e.target.value)} className="rounded-xl min-h-[80px]" />
    ) : (
      <Input value={value || ""} onChange={(e) => onChange(e.target.value)} className="rounded-xl" />
    )}
  </div>
);

const AdminSiteContent = () => {
  const { toast } = useToast();
  const [c, setC] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { getSiteContent().then(setC).catch(() => {}); }, []);

  if (!c) return <div className="py-20 text-center text-muted-foreground">Loading...</div>;

  const setHero = (k, v) => setC({ ...c, hero: { ...c.hero, [k]: v } });
  const setMission = (k, v) => setC({ ...c, mission: { ...c.mission, [k]: v } });
  const setContact = (k, v) => setC({ ...c, contact: { ...c.contact, [k]: v } });
  const setArrItem = (arr, i, k, v) => {
    const next = [...(c[arr] || [])];
    next[i] = { ...next[i], [k]: v };
    setC({ ...c, [arr]: next });
  };
  const addArrItem = (arr, blank) => setC({ ...c, [arr]: [...(c[arr] || []), blank] });
  const removeArrItem = (arr, i) => setC({ ...c, [arr]: c[arr].filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    try {
      await adminUpdateSiteContent(c);
      toast({ title: "Site content saved", description: "Changes are now live on the site." });
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between sticky top-0 z-10 bg-secondary/30 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 backdrop-blur">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Site Content</h1>
          <p className="text-muted-foreground text-sm">Edit the text shown across your public site.</p>
        </div>
        <Button onClick={save} disabled={saving} className="rounded-full bg-primary hover:bg-primary/90"><Save className="h-4 w-4 mr-1.5" />{saving ? "Saving..." : "Save Changes"}</Button>
      </div>

      <Tabs defaultValue="hero" className="mt-6">
        <TabsList className="bg-secondary flex-wrap h-auto">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-5 space-y-4 max-w-2xl">
          <Lbl label="Badge text" value={c.hero?.badge} onChange={(v) => setHero("badge", v)} />
          <div className="grid sm:grid-cols-3 gap-4">
            <Lbl label="Title lead" value={c.hero?.titleLead} onChange={(v) => setHero("titleLead", v)} />
            <Lbl label="Highlight word" value={c.hero?.titleHighlight} onChange={(v) => setHero("titleHighlight", v)} />
            <Lbl label="Title end" value={c.hero?.titleEnd} onChange={(v) => setHero("titleEnd", v)} />
          </div>
          <Lbl label="Subtitle" value={c.hero?.subtitle} onChange={(v) => setHero("subtitle", v)} area />
          <Lbl label="Ayah (Arabic)" value={c.hero?.ayahArabic} onChange={(v) => setHero("ayahArabic", v)} />
          <Lbl label="Ayah translation" value={c.hero?.ayahTranslation} onChange={(v) => setHero("ayahTranslation", v)} />
          <Lbl label="Ayah reference" value={c.hero?.ayahReference} onChange={(v) => setHero("ayahReference", v)} />
        </TabsContent>

        <TabsContent value="mission" className="mt-5 space-y-4 max-w-2xl">
          <Lbl label="Eyebrow" value={c.mission?.eyebrow} onChange={(v) => setMission("eyebrow", v)} />
          <Lbl label="Title" value={c.mission?.title} onChange={(v) => setMission("title", v)} />
          <Lbl label="Paragraph 1" value={c.mission?.paragraph1} onChange={(v) => setMission("paragraph1", v)} area />
          <Lbl label="Paragraph 2" value={c.mission?.paragraph2} onChange={(v) => setMission("paragraph2", v)} area />
        </TabsContent>

        <TabsContent value="stats" className="mt-5 space-y-3 max-w-2xl">
          {(c.stats || []).map((s, i) => (
            <div key={i} className="flex gap-3 items-end rounded-2xl border border-border bg-card p-4">
              <div className="flex-1"><Lbl label="Value" value={s.value} onChange={(v) => setArrItem("stats", i, "value", v)} /></div>
              <div className="flex-1"><Lbl label="Label" value={s.label} onChange={(v) => setArrItem("stats", i, "label", v)} /></div>
              <Button variant="ghost" size="sm" onClick={() => removeArrItem("stats", i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrItem("stats", { value: "", label: "" })} className="rounded-full"><Plus className="h-4 w-4 mr-1.5" />Add stat</Button>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-5 space-y-3 max-w-2xl">
          {(c.testimonials || []).map((t, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <div className="grid sm:grid-cols-3 gap-3">
                <Lbl label="Name" value={t.name} onChange={(v) => setArrItem("testimonials", i, "name", v)} />
                <Lbl label="Location" value={t.location} onChange={(v) => setArrItem("testimonials", i, "location", v)} />
                <Lbl label="Initials" value={t.initials} onChange={(v) => setArrItem("testimonials", i, "initials", v)} />
              </div>
              <Lbl label="Quote" value={t.quote} onChange={(v) => setArrItem("testimonials", i, "quote", v)} area />
              <Button variant="ghost" size="sm" onClick={() => removeArrItem("testimonials", i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4 mr-1" />Remove</Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrItem("testimonials", { name: "", location: "", initials: "", quote: "" })} className="rounded-full"><Plus className="h-4 w-4 mr-1.5" />Add testimonial</Button>
        </TabsContent>

        <TabsContent value="faqs" className="mt-5 space-y-3 max-w-2xl">
          {(c.faqs || []).map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <Lbl label="Question" value={f.q} onChange={(v) => setArrItem("faqs", i, "q", v)} />
              <Lbl label="Answer" value={f.a} onChange={(v) => setArrItem("faqs", i, "a", v)} area />
              <Button variant="ghost" size="sm" onClick={() => removeArrItem("faqs", i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4 mr-1" />Remove</Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrItem("faqs", { q: "", a: "" })} className="rounded-full"><Plus className="h-4 w-4 mr-1.5" />Add FAQ</Button>
        </TabsContent>

        <TabsContent value="contact" className="mt-5 space-y-4 max-w-2xl">
          <Lbl label="Email" value={c.contact?.email} onChange={(v) => setContact("email", v)} />
          <Lbl label="Phone" value={c.contact?.phone} onChange={(v) => setContact("phone", v)} />
          <Lbl label="Office" value={c.contact?.office} onChange={(v) => setContact("office", v)} />
          <Lbl label="Footer tagline" value={c.contact?.tagline} onChange={(v) => setContact("tagline", v)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSiteContent;
