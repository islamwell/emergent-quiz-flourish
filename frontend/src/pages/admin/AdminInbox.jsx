import React, { useEffect, useState } from "react";
import { Mail, Users, ClipboardList, Trash2, Clock } from "lucide-react";
import {
  adminGetContacts,
  adminGetNewsletter,
  adminGetEnrollments,
  adminDeleteItem,
} from "../../lib/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { useToast } from "../../hooks/use-toast";

const fmt = (d) => {
  try {
    return new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return d;
  }
};

const EmptyState = ({ label }) => (
  <div className="text-center py-16 text-muted-foreground">No {label} yet.</div>
);

const AdminInbox = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [news, setNews] = useState([]);
  const [enrolls, setEnrolls] = useState([]);

  const load = () => {
    adminGetContacts().then(setContacts).catch(() => {});
    adminGetNewsletter().then(setNews).catch(() => {});
    adminGetEnrollments().then(setEnrolls).catch(() => {});
  };
  useEffect(load, []);

  const remove = async (collection, id, setter, list) => {
    try {
      await adminDeleteItem(collection, id);
      setter(list.filter((x) => x.id !== id));
      toast({ title: "Deleted" });
    } catch {
      toast({ title: "Could not delete", variant: "destructive" });
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-foreground">Inbox</h1>
      <p className="text-muted-foreground mt-1">Messages, subscribers and enrollment interest from your visitors.</p>

      <Tabs defaultValue="contacts" className="mt-8">
        <TabsList className="bg-secondary">
          <TabsTrigger value="contacts"><Mail className="h-4 w-4 mr-1.5" />Messages ({contacts.length})</TabsTrigger>
          <TabsTrigger value="newsletter"><Users className="h-4 w-4 mr-1.5" />Subscribers ({news.length})</TabsTrigger>
          <TabsTrigger value="enrollments"><ClipboardList className="h-4 w-4 mr-1.5" />Enrollments ({enrolls.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="mt-5 space-y-3">
          {contacts.length === 0 ? <EmptyState label="messages" /> : contacts.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{c.name} <span className="font-normal text-muted-foreground">• {c.email}</span></p>
                  {c.subject && <p className="text-sm font-medium text-primary mt-0.5">{c.subject}</p>}
                  <p className="text-sm text-foreground/80 mt-2">{c.message}</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1"><Clock className="h-3 w-3" />{fmt(c.created_at)}</p>
                </div>
                <button onClick={() => remove("contacts", c.id, setContacts, contacts)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="newsletter" className="mt-5 space-y-3">
          {news.length === 0 ? <EmptyState label="subscribers" /> : news.map((n) => (
            <div key={n.id} className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{n.email}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" />{fmt(n.created_at)}</p>
              </div>
              <button onClick={() => remove("newsletter", n.id, setNews, news)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="enrollments" className="mt-5 space-y-3">
          {enrolls.length === 0 ? <EmptyState label="enrollments" /> : enrolls.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{e.course_title}</p>
                {(e.name || e.email) && <p className="text-sm text-muted-foreground">{e.name} {e.email && `• ${e.email}`}</p>}
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" />{fmt(e.created_at)}</p>
              </div>
              <button onClick={() => remove("enrollments", e.id, setEnrolls, enrolls)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminInbox;
