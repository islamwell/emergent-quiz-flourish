import React, { useEffect, useState, useRef } from "react";
import {
  Menu,
  X,
  Moon,
  Search,
  ChevronDown,
  BookOpen,
  Sparkles,
  Users,
  Gamepad2,
  Phone,
  Mail,
  ArrowRight,
  GraduationCap,
  Layers,
  MessageCircle,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import QuickSearch from "./QuickSearch";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const dropdownTimerRef = useRef(null);

  const location = useLocation();
  const isHome = location.pathname === "/";

  // Check scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Handle escape key to close drawer or dropdowns
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setCoursesDropdown(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setCoursesDropdown(false);
  }, [location.pathname]);

  // Dropdown hover helpers with debounce to prevent glitchy closing
  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setCoursesDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setCoursesDropdown(false);
    }, 150);
  };

  const solid = scrolled || !isHome;
  const isCoursesActive = location.pathname.startsWith("/courses");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-background/90 backdrop-blur-xl border-b border-emerald-500/10 shadow-[0_8px_30px_rgb(20,60,40,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav
          className={`max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo with Ambient Glow */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-800 text-primary-foreground shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Moon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.2} />
              <span className="absolute inset-0 rounded-2xl bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xs" />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={`font-display text-xl sm:text-2xl font-semibold tracking-tight transition-colors ${
                  solid ? "text-primary" : "text-white"
                }`}
              >
                Nurul<span className="text-accent font-bold">Quran</span>
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.24em] font-medium mt-0.5 transition-colors ${
                  solid ? "text-muted-foreground" : "text-white/80"
                }`}
              >
                Light of the Quran
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? solid
                      ? "bg-primary/10 text-primary font-semibold"
                      : "bg-white/20 text-white font-semibold shadow-xs"
                    : solid
                    ? "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`
              }
            >
              Home
            </NavLink>

            {/* Courses with Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/courses"
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  isCoursesActive
                    ? solid
                      ? "bg-primary/10 text-primary font-semibold"
                      : "bg-white/20 text-white font-semibold shadow-xs"
                    : solid
                    ? "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                Courses
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    coursesDropdown ? "rotate-180 text-primary" : "opacity-70"
                  }`}
                />
              </NavLink>

              {/* Courses Mega-Menu Dropdown */}
              {coursesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-[480px] rounded-3xl border border-border/80 bg-background/98 backdrop-blur-2xl p-4 shadow-2xl shadow-emerald-950/15 animate-in fade-in-50 zoom-in-95 duration-200 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/courses"
                      className="group flex flex-col gap-1 p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/15 transition-all"
                    >
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-0.5 transition-transform">
                        <BookOpen className="h-4 w-4" />
                        Translation & Tafseer
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        In-depth word-by-word Quran understanding and reflection.
                      </p>
                    </Link>

                    <Link
                      to="/courses"
                      className="group flex flex-col gap-1 p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/15 transition-all"
                    >
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-0.5 transition-transform">
                        <GraduationCap className="h-4 w-4" />
                        Sabeel Ul Jannah
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Flagship 2.5-year journey through Tafseer & Seerah.
                      </p>
                    </Link>

                    <Link
                      to="/kids"
                      className="group flex flex-col gap-1 p-3 rounded-2xl hover:bg-accent/5 border border-transparent hover:border-accent/20 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-foreground font-semibold text-sm group-hover:text-accent transition-colors">
                          <Users className="h-4 w-4 text-accent" />
                          Kids & Youth
                        </div>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent">
                          Youth
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Summer camp, duas, and character building for young minds.
                      </p>
                    </Link>

                    <Link
                      to="/quiz"
                      className="group flex flex-col gap-1 p-3 rounded-2xl hover:bg-emerald-500/5 border border-transparent hover:border-emerald-500/20 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-foreground font-semibold text-sm group-hover:text-emerald-600 transition-colors">
                          <Gamepad2 className="h-4 w-4 text-emerald-600" />
                          Arabic Quiz
                        </div>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                          Interactive
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Test vocabulary with 9 question types & live timer.
                      </p>
                    </Link>
                  </div>

                  {/* Dropdown Footer CTA */}
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between px-2 text-xs">
                    <span className="text-muted-foreground font-medium">
                      Over 7 structured courses available
                    </span>
                    <Link
                      to="/courses"
                      className="text-primary font-semibold hover:underline flex items-center gap-1"
                    >
                      All Courses <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Kids Corner with Badge */}
            <NavLink
              to="/kids"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? solid
                      ? "bg-primary/10 text-primary font-semibold"
                      : "bg-white/20 text-white font-semibold shadow-xs"
                    : solid
                    ? "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`
              }
            >
              <span>Kids</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                ⭐ Kids
              </span>
            </NavLink>

            {/* Arabic Quiz with Animated Pulse Badge */}
            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? solid
                      ? "bg-primary/10 text-primary font-semibold"
                      : "bg-white/20 text-white font-semibold shadow-xs"
                    : solid
                    ? "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`
              }
            >
              <span>Arabic Quiz</span>
              <span className="relative flex items-center">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  NEW
                </span>
              </span>
            </NavLink>

            {/* Resources */}
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? solid
                      ? "bg-primary/10 text-primary font-semibold"
                      : "bg-white/20 text-white font-semibold shadow-xs"
                    : solid
                    ? "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`
              }
            >
              Resources
            </NavLink>

            {/* About */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? solid
                      ? "bg-primary/10 text-primary font-semibold"
                      : "bg-white/20 text-white font-semibold shadow-xs"
                    : solid
                    ? "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`
              }
            >
              About
            </NavLink>

            {/* Contact */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? solid
                      ? "bg-primary/10 text-primary font-semibold"
                      : "bg-white/20 text-white font-semibold shadow-xs"
                    : solid
                    ? "text-foreground/75 hover:text-primary hover:bg-secondary/60"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Right Action Tools: Search & Enroll Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                solid
                  ? "bg-secondary/60 border-border/80 text-foreground/80 hover:bg-secondary hover:border-primary/40 hover:text-foreground"
                  : "bg-white/15 border-white/25 text-white hover:bg-white/25"
              }`}
              aria-label="Search courses and pages"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block ml-1 text-[10px] font-mono opacity-60 bg-foreground/10 px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Enroll Now CTA Button */}
            <div className="hidden lg:block">
              <Button
                className={`rounded-full px-6 shadow-md transition-all duration-300 hover:scale-105 ${
                  solid
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
                    : "bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent/20"
                }`}
                asChild
              >
                <Link to="/courses">Enroll Now</Link>
              </Button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                solid ? "text-primary hover:bg-secondary" : "text-white hover:bg-white/15"
              }`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Slide-over Drawer (Sheet) ─────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer sheet container */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border shadow-2xl flex flex-col justify-between p-6 z-50 animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <Moon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-lg font-semibold text-primary">
                    Nurul<span className="text-accent">Quran</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-secondary/70 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-left"
              >
                <span className="flex items-center gap-2.5">
                  <Search className="h-4 w-4 text-primary" />
                  Search courses & pages...
                </span>
                <kbd className="text-[10px] font-mono bg-background px-1.5 py-0.5 rounded border border-border">
                  ⌘K
                </kbd>
              </button>

              {/* Navigation Links */}
              <div className="space-y-1">
                {/* Home */}
                <NavLink
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  Home
                </NavLink>

                {/* Collapsible Courses Section */}
                <div className="rounded-2xl bg-secondary/30 border border-border/60 overflow-hidden">
                  <button
                    onClick={() => setMobileCoursesOpen((p) => !p)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-foreground hover:bg-secondary/60 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Courses
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                        mobileCoursesOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {mobileCoursesOpen && (
                    <div className="px-4 pb-3 pt-1 space-y-1.5 border-t border-border/40">
                      <Link
                        to="/courses"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-background transition-colors"
                      >
                        All 7 Courses Catalog →
                      </Link>
                      <Link
                        to="/courses/sabeel-ul-jannah"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-background transition-colors"
                      >
                        • Sabeel Ul Jannah (Flagship)
                      </Link>
                      <Link
                        to="/courses/nurun-ala-nur"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-background transition-colors"
                      >
                        • NurunAlaNur (Tafseer)
                      </Link>
                      <Link
                        to="/courses/doors-of-jannah"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-background transition-colors"
                      >
                        • Doors of Jannah (Summer Camp)
                      </Link>
                    </div>
                  )}
                </div>

                {/* Kids with Badge */}
                <NavLink
                  to="/kids"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-amber-500" />
                    Kids & Youth
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 border border-amber-500/20">
                    ⭐ Kids
                  </span>
                </NavLink>

                {/* Arabic Quiz with Badge */}
                <NavLink
                  to="/quiz"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-emerald-600" />
                    Arabic Quiz
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    NEW
                  </span>
                </NavLink>

                {/* Resources */}
                <NavLink
                  to="/resources"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  Resources & Audios
                </NavLink>

                {/* About */}
                <NavLink
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  About NurulQuran
                </NavLink>

                {/* Contact */}
                <NavLink
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  Contact Us
                </NavLink>
              </div>

              {/* Enroll CTA in Drawer */}
              <Button className="w-full h-12 rounded-2xl text-base font-semibold shadow-md mt-2" asChild>
                <Link to="/courses" onClick={() => setMobileOpen(false)}>
                  Enroll in a Course →
                </Link>
              </Button>
            </div>

            {/* Quick Contact & WhatsApp Bottom Strip in Drawer */}
            <div className="pt-6 border-t border-border space-y-2 mt-6">
              <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                Direct Inquiries
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/4740000000?text=Salam%20NurulQuran,%20I%20would%20like%20to%20inquire%20about%20your%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                <a
                  href="mailto:info@nurulquran.com"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-secondary hover:bg-primary/10 text-foreground hover:text-primary font-semibold text-xs transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Command Modal */}
      <QuickSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;
