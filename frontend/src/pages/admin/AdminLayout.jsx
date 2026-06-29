import React from "react";
import { NavLink, Outlet, Navigate, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Image as ImageIcon,
  FileText,
  Inbox,
  LogOut,
  Moon,
  ExternalLink,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/courses", label: "Courses", icon: GraduationCap },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/content", label: "Site Content", icon: FileText },
  { to: "/admin/inbox", label: "Inbox", icon: Inbox },
];

const AdminLayout = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-primary text-primary-foreground">
        <div className="px-6 py-6 flex items-center gap-2.5 border-b border-primary-foreground/10">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/10">
            <Moon className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold">NurulQuran</span>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-foreground/15 text-primary-foreground"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`
              }
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-primary-foreground/10 space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors">
            <ExternalLink className="h-4.5 w-4.5" /> View Site
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors">
            <LogOut className="h-4.5 w-4.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-64">
        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-primary text-primary-foreground px-4 h-14">
          <Link to="/admin" className="flex items-center gap-2 font-display font-semibold">
            <Moon className="h-5 w-5" /> Admin
          </Link>
          <Button size="sm" variant="ghost" onClick={handleLogout} className="text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex gap-1.5 overflow-x-auto px-4 py-3 bg-card border-b border-border">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <main className="p-5 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
