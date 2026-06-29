import React, { useEffect, useState } from "react";
import { Plus, Trash2, Music, Image as ImageIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "../../components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../components/ui/select";
import { getMedia, adminCreateMedia, adminDeleteMedia } from "../../lib/api";
import { useToast } from "../../hooks/use-toast";

const AdminMedia = () => {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "image", title: "", url: "", description: "" });
  const [saving, setSaving] = useState(false);

  const load = () => getMedia().then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) {
      toast({ title: "Title and URL are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await adminCreateMedia(form);
      toast({ title: "Media added" });
      setForm({ type: "image", title: "", url: "", description: "" });
      setOpen(false);
      load();
    } catch {
      toast({ title: "Could not add media", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await adminDeleteMedia(id);
      setItems(items.filter((m) => m.id !== id));
      toast({ title: "Deleted" });
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const imagesList = items.filter((m) => m.type === "image");
  const audioList = items.filter((m) => m.type === "audio");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Media Library</h1>
          <p className="text-muted-foreground mt-1">Add image &amp; audio links. Audio appears on the public Lectures section.</p>
        </div>
        <Button onClick={() => setOpen(true)} className="rounded-full bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-1.5" />Add Media</Button>
      </div>

      <h2 className="mt-8 font-semibold text-foreground flex items-center gap-2"><ImageIcon className="h-4 w-4 text-primary" />Images ({imagesList.length})</h2>
      {imagesList.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-2">No images yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagesList.map((m) => (
            <div key={m.id} className="group relative rounded-2xl overflow-hidden border border-border bg-card">
              <div className="h-32 bg-secondary"><img src={m.url} alt={m.title} className="h-full w-full object-cover" /></div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground truncate">{m.title}</p>
              </div>
              <button onClick={() => remove(m.id)} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-destructive opacity-0 group-hover:opacity-100 transition-opacity shadow"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 font-semibold text-foreground flex items-center gap-2"><Music className="h-4 w-4 text-primary" />Audio ({audioList.length})</h2>
      {audioList.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-2">No audio yet.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {audioList.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{m.title}</p>
                  {m.description && <p className="text-sm text-muted-foreground truncate">{m.description}</p>}
                </div>
                <button onClick={() => remove(m.id)} className="text-muted-foreground hover:text-destructive shrink-0"><Trash2 className="h-4 w-4" /></button>
              </div>
              <audio controls src={m.url} className="mt-3 w-full" />
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-display text-2xl">Add Media</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={form.title} onChange={set("title")} placeholder="e.g. Surah Al-Fatiha recitation" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>URL (paste a link)</Label>
              <Input value={form.url} onChange={set("url")} placeholder="https://..." className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>Description (optional)</Label>
              <Textarea value={form.description} onChange={set("description")} className="rounded-xl min-h-[70px]" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving} className="rounded-full bg-primary hover:bg-primary/90">{saving ? "Adding..." : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMedia;
