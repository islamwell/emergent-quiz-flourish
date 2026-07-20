import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Image as ImageIcon,
  Mail,
  Users,
  ClipboardList,
  ArrowUpRight,
  Plus,
  ExternalLink,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  adminGetStats,
  adminGetContacts,
  adminGetEnrollments,
  adminGetNewsletter,
} from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const fmt = (d) => {
  try {
    return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recentInbox, setRecentInbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    // Set time-of-day greeting
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Load stats and recent items concurrently
    Promise.all([
      adminGetStats(),
      adminGetContacts().catch(() => []),
      adminGetEnrollments().catch(() => []),
      adminGetNewsletter().catch(() => []),
    ])
      .then(([statsData, contacts, enrolls, news]) => {
        setStats(statsData);

        // Merge and sort recent activities chronologically
        const activities = [
          ...contacts.map((x) => ({ ...x, actType: "Message", icon: Mail, color: "text-amber-500 bg-amber-50" })),
          ...enrolls.map((x) => ({ ...x, actType: "Enrollment", icon: ClipboardList, color: "text-rose-500 bg-rose-50" })),
          ...news.map((x) => ({ ...x, actType: "Newsletter", icon: Users, color: "text-violet-500 bg-violet-50" })),
        ];
        
        activities.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        setRecentInbox(activities.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      key: "courses",
      label: "Active Courses",
      icon: GraduationCap,
      to: "/admin/courses",
      gradient: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
      iconColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400",
      sparkline: "M 0 30 Q 15 15, 30 25 T 60 10 T 90 20 T 120 5",
    },
    {
      key: "media",
      label: "Media Items",
      icon: ImageIcon,
      to: "/admin/media",
      gradient: "from-sky-500/10 to-blue-500/10 border-sky-500/20",
      iconColor: "text-sky-600 bg-sky-50 dark:bg-sky-950/30 dark:text-sky-400",
      sparkline: "M 0 20 Q 15 25, 30 10 T 60 25 T 90 15 T 120 18",
    },
    {
      key: "contacts",
      label: "Support Messages",
      icon: Mail,
      to: "/admin/inbox",
      gradient: "from-amber-500/10 to-orange-500/10 border-amber-500/20",
      iconColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400",
      sparkline: "M 0 30 Q 15 20, 30 35 T 60 15 T 90 10 T 120 5",
    },
    {
      key: "newsletter",
      label: "Newsletter Fans",
      icon: Users,
      to: "/admin/inbox",
      gradient: "from-violet-500/10 to-purple-500/10 border-violet-500/20",
      iconColor: "text-violet-600 bg-violet-50 dark:bg-violet-950/30 dark:text-violet-400",
      sparkline: "M 0 25 Q 15 15, 30 20 T 60 5 T 90 15 T 120 10",
    },
    {
      key: "enrollments",
      label: "Course Signups",
      icon: ClipboardList,
      to: "/admin/inbox",
      gradient: "from-rose-500/10 to-pink-500/10 border-rose-500/20",
      iconColor: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400",
      sparkline: "M 0 35 Q 15 20, 30 15 T 60 25 T 90 5 T 120 2",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Profile Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-emerald-950 text-primary-foreground p-8 shadow-xl shadow-emerald-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-wide">
              {greeting}, {user?.username || "Admin"}!
            </h1>
            <p className="text-emerald-100/80 text-sm mt-1.5 max-w-xl">
              Welcome back to your NurulQuran Management Portal. You can monitor course enrollments, respond to messages, and publish content update here.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="rounded-full bg-white/10 border-white/10 hover:bg-white/20 text-white gap-1.5" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                Preview Live Site <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 mb-4 flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-primary" /> Key Performance Indicators
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {statCards.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className={`group relative overflow-hidden rounded-2xl border bg-card p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${c.iconColor}`}>
                    <c.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 group-hover:text-foreground transition-all duration-300 transform translate-x-1 -translate-y-1" />
                </div>
                <div className="mt-5">
                  <p className="font-display text-3xl font-semibold tracking-tight text-foreground">
                    {loading ? (
                      <span className="inline-block h-8 w-12 bg-muted animate-pulse rounded-md" />
                    ) : (
                      stats[c.key] ?? 0
                    )}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">{c.label}</p>
                </div>
              </div>
              
              {/* Decorative Sparkline Chart */}
              <div className="mt-4 h-6 w-full opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 120 40" preserveAspectRatio="none">
                  <path
                    d={c.sparkline}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`${c.iconColor.split(" ")[0]} transition-all duration-500`}
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activities and Quick Actions Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Inbox Feed */}
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg text-foreground">Recent Inbox Activity</h3>
              <Link to="/admin/inbox" className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-0.5">
                View all inbox <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
                ))}
              </div>
            ) : recentInbox.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-sm">
                No recent activity received yet.
              </div>
            ) : (
              <div className="space-y-3.5">
                {recentInbox.map((act, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${act.color}`}>
                        <act.icon className="h-5 w-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {act.name || act.email}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {act.actType} • {act.subject || act.course_title || "Newsletter Subscriber"}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {fmt(act.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-5">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/admin/courses"
                className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-emerald-500/30 hover:bg-emerald-50/20 text-foreground transition-all group"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <GraduationCap className="h-5 w-5 text-emerald-600 bg-emerald-50 rounded-lg p-0.5" />
                  Add New Course
                </span>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
              </Link>
              <Link
                to="/admin/media"
                className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-sky-500/30 hover:bg-sky-50/20 text-foreground transition-all group"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <ImageIcon className="h-5 w-5 text-sky-600 bg-sky-50 rounded-lg p-0.5" />
                  Upload Media Links
                </span>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-sky-600 transition-colors" />
              </Link>
              <Link
                to="/admin/content"
                className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-amber-500/30 hover:bg-amber-50/20 text-foreground transition-all group"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <ClipboardList className="h-5 w-5 text-amber-600 bg-amber-50 rounded-lg p-0.5" />
                  Edit Homepage Text
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple inline button wrapper to match existing shadcn references
const Button = ({ children, variant, className, asChild, ...props }) => {
  const base = "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const cls = `${base} ${variants[variant || "primary"]} ${className || ""}`;
  
  if (asChild) {
    return React.cloneElement(children, { className: `${children.props.className || ""} ${cls}` });
  }
  return <button className={cls} {...props}>{children}</button>;
};

export default AdminDashboard;
