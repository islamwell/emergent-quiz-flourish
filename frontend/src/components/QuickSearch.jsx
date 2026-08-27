import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import {
  BookOpen,
  Sparkles,
  Gamepad2,
  Users,
  AudioLines,
  HeartHandshake,
  Mail,
  Home,
  GraduationCap,
  Layers,
  HelpCircle,
  FileText,
} from "lucide-react";

const searchItems = {
  courses: [
    {
      title: "Sabeel Ul Jannah",
      desc: "Flagship comprehensive journey: Tafseer, Seerah & character building",
      path: "/courses/sabeel-ul-jannah",
      icon: GraduationCap,
      badge: "Flagship",
    },
    {
      title: "NurunAlaNur",
      desc: "In-depth Tafseer of Makki and Madani Surahs",
      path: "/courses/nurun-ala-nur",
      icon: BookOpen,
      badge: "Tafseer",
    },
    {
      title: "Doors of Jannah (Kids Camp)",
      desc: "Interactive 4-week Quran & Islamic Summer Camp for kids",
      path: "/courses/doors-of-jannah",
      icon: Sparkles,
      badge: "Kids",
    },
    {
      title: "Kids Course — Semester III",
      desc: "Quran basics, beautiful duas and Seerah for ages 5–12",
      path: "/courses/kids-course",
      icon: Users,
      badge: "Kids",
    },
    {
      title: "Ramadan Special 2026",
      desc: "Daily worship checklist, duas and focused lessons for Ramadan",
      path: "/courses/ramadan-2026",
      icon: Sparkles,
      badge: "Seasonal",
    },
    {
      title: "Seerah Course 2026",
      desc: "Timeless lessons from the blessed biography of the Prophet (ﷺ)",
      path: "/courses/seerah-2026",
      icon: HeartHandshake,
      badge: "Seerah",
    },
    {
      title: "Al Lulu Wal Marjaan",
      desc: "Authentic Hadith studies and spiritual traditions",
      path: "/courses/al-lulu-wal-marjaan",
      icon: FileText,
      badge: "Hadith",
    },
  ],
  interactive: [
    {
      title: "Arabic Language Quiz",
      desc: "Test your Arabic with 9 question types, auto-advancing timer & history",
      path: "/quiz",
      icon: Gamepad2,
      badge: "Interactive",
    },
    {
      title: "Kids & Youth Corner",
      desc: "Stories of Prophets, games, summer camp, and youth programs",
      path: "/kids",
      icon: Users,
      badge: "Youth",
    },
    {
      title: "Audio Recitations & Tafseer MP3s",
      desc: "Listen to high quality audio lessons, lectures, and supplications",
      path: "/resources",
      icon: AudioLines,
      badge: "Media",
    },
  ],
  pages: [
    {
      title: "Home",
      desc: "Main portal, featured programs and latest updates",
      path: "/",
      icon: Home,
    },
    {
      title: "All Courses Catalog",
      desc: "Explore full curriculum, filter by subject, level & schedule",
      path: "/courses",
      icon: Layers,
    },
    {
      title: "About NurulQuran",
      desc: "Our mission, teaching methodology, instructors, and vision",
      path: "/about",
      icon: HelpCircle,
    },
    {
      title: "Contact & Inquiries",
      desc: "Reach out for course admissions, questions, or support",
      path: "/contact",
      icon: Mail,
    },
  ],
};

const QuickSearch = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  const handleSelect = (path) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search courses, quiz, resources, subjects... (e.g. Tafseer, Kids, Quiz)" />
      <CommandList className="max-h-[380px] p-2">
        <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
          No matching courses or pages found.
        </CommandEmpty>

        <CommandGroup heading="Courses & Programs">
          {searchItems.courses.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.path}
                value={`${item.title} ${item.desc} ${item.badge}`}
                onSelect={() => handleSelect(item.path)}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-sm text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                  </div>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-secondary text-primary shrink-0">
                    {item.badge}
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator className="my-1.5" />

        <CommandGroup heading="Interactive & Learning">
          {searchItems.interactive.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.path}
                value={`${item.title} ${item.desc} ${item.badge}`}
                onSelect={() => handleSelect(item.path)}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-sm text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                  </div>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent shrink-0">
                    {item.badge}
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator className="my-1.5" />

        <CommandGroup heading="Site Navigation">
          {searchItems.pages.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.path}
                value={`${item.title} ${item.desc}`}
                onSelect={() => handleSelect(item.path)}
                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <p className="font-semibold text-sm text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default QuickSearch;
