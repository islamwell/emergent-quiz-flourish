import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Image as ImageIcon, Mail, Users, ClipboardList, ArrowUpRight } from "lucide-react";
import { adminGetStats } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const cards = [
  { key: "courses", label: "Courses", icon: GraduationCap, to: "/admin/courses", color: "bg-emerald-50 text-emerald-700" },
  { key: "media", label: "Media Items", icon: ImageIcon, to: "/admin/media", color: "bg-sky-50 text-sky-700" },
  { key: "contacts", label: "Messages", icon: Mail, to: "/admin/inbox", color: "bg-amber-50 text-amber-700" },
  { key: "newsletter", label: "Subscribers", icon: Users, to: "/admin/inbox", color: "bg-violet-50 text-violet-700" },
  { key: "enrollments", label: "Enrollments", icon: ClipboardList, to: "/admin/inbox", color: "bg-rose-50 text-rose-700" },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetStats().then(setStats).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-foreground">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Welcome back, {user?.username}. Here's an overview of your site.</p>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="group rounded-2xl border border-border bg-card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.color}`}>
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-3xl font-semibold text-foreground">
              {loading ? "—" : stats[c.key] ?? 0}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {c.label}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-5">
        <Link to="/admin/courses" className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-semibold text-foreground">Manage Courses</h3>
          <p className="text-sm text-muted-foreground mt-1">Add, edit or remove courses and their details.</p>
        </Link>
        <Link to="/admin/media" className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all">
          <ImageIcon className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-semibold text-foreground">Media Library</h3>
          <p className="text-sm text-muted-foreground mt-1">Add image &amp; audio links for the site.</p>
        </Link>
        <Link to="/admin/content" className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all">
          <ClipboardList className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-semibold text-foreground">Edit Site Text</h3>
          <p className="text-sm text-muted-foreground mt-1">Update hero, mission, stats, testimonials &amp; FAQs.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
