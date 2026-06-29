import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "../../components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { getCourses, adminCreateCourse, adminUpdateCourse, adminDeleteCourse } from "../../lib/api";
import { images as imageMap } from "../../mock";
import { useToast } from "../../hooks/use-toast";

const resolveImg = (key) => (key?.startsWith("http") ? key : imageMap[key]);

const empty = {
  title: "", tag: "Course", level: "All Levels", language: "English", duration: "",
  start: "", image: "", desc: "", longDesc: "", instructor: "", days: "", time: "",
  fee: "", modules: "", outcomes: "", order: "",
};

const AdminCourses = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => getCourses().then(setCourses).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditingId(null); setForm(empty); setOpen(true); };
  const openEdit = (c) => {
    setEditingId(c.id);
    setForm({
      ...c,
      modules: (c.modules || []).join("\n"),
      outcomes: (c.outcomes || []).join("\n"),
      order: c.order ?? "",
    });
    setOpen(true);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    setSaving(true);
    const payload = {
      ...form,
      modules: form.modules.split("\n").map((s) => s.trim()).filter(Boolean),
      outcomes: form.outcomes.split("\n").map((s) => s.trim()).filter(Boolean),
      order: form.order === "" ? null : Number(form.order),
    };
    try {
      if (editingId) {
        await adminUpdateCourse(editingId, payload);
        toast({ title: "Course updated" });
      } else {
        await adminCreateCourse(payload);
        toast({ title: "Course created" });
      }
      setOpen(false);
      load();
    } catch (err) {
      toast({ title: "Save failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await adminDeleteCourse(deleteId);
      toast({ title: "Course deleted" });
      setDeleteId(null);
      load();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const field = (label, key, ph = "") => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={form[key]} onChange={set(key)} placeholder={ph} className="rounded-xl" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-1">{courses.length} courses</p>
        </div>
        <Button onClick={openNew} className="rounded-full bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-1.5" />New Course</Button>
      </div>

      <div className="mt-8 space-y-3">
        {courses.map((c) => (
          <div key={c.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <div className="h-16 w-20 rounded-xl overflow-hidden bg-secondary shrink-0">
              {resolveImg(c.image) && <img src={resolveImg(c.image)} alt={c.title} className="h-full w-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{c.title}</p>
              <p className="text-sm text-muted-foreground truncate">{c.tag} • {c.level} • {c.duration}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => openEdit(c)} className="rounded-lg"><Pencil className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => setDeleteId(c.id)} className="rounded-lg text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>

      {/* Editor dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{editingId ? "Edit Course" : "New Course"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={save} className="space-y-4">
            {field("Title", "title", "e.g. Sabeel Ul Jannah")}
            <div className="grid sm:grid-cols-2 gap-4">
              {field("Tag / Category", "tag", "Flagship, Tafseer, Kids...")}
              {field("Level", "level", "All Levels")}
              {field("Language", "language", "English")}
              {field("Duration", "duration", "2.5 Years")}
              {field("Start", "start", "Jun 2, 2025")}
              {field("Fee", "fee", "From $50 / semester")}
              {field("Instructor", "instructor", "Senior Faculty")}
              {field("Days", "days", "Tue • Thu")}
              {field("Time", "time", "Evening slot")}
              {field("Order", "order", "1")}
            </div>
            <div className="space-y-1.5">
              <Label>Image (paste a URL or a built-in key)</Label>
              <Input value={form.image} onChange={set("image")} placeholder="https://... or valley2" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>Short description</Label>
              <Textarea value={form.desc} onChange={set("desc")} className="rounded-xl min-h-[70px]" />
            </div>
            <div className="space-y-1.5">
              <Label>Long description</Label>
              <Textarea value={form.longDesc} onChange={set("longDesc")} className="rounded-xl min-h-[90px]" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Modules (one per line)</Label>
                <Textarea value={form.modules} onChange={set("modules")} className="rounded-xl min-h-[110px]" />
              </div>
              <div className="space-y-1.5">
                <Label>Outcomes (one per line)</Label>
                <Textarea value={form.outcomes} onChange={set("outcomes")} className="rounded-xl min-h-[110px]" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving} className="rounded-full bg-primary hover:bg-primary/90">{saving ? "Saving..." : "Save Course"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this course?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="rounded-full bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCourses;
