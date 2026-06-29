import React, { createContext, useContext, useEffect, useState } from "react";
import { getSiteContent } from "../lib/api";
import {
  ayah as defaultAyah,
  stats as defaultStats,
  testimonials as defaultTestimonials,
  faqs as defaultFaqs,
  footer as defaultFooter,
} from "../mock";

// Default content mirrors mock.js so the site always renders even before fetch.
const DEFAULTS = {
  hero: {
    badge: "Learning that nurtures the soul",
    titleLead: "Enlighten your life with the",
    titleHighlight: "Nur",
    titleEnd: "of Al Quran",
    subtitle:
      "Authentic, heart-centered Quran & Islamic education for every age — guiding hearts back to their Creator through knowledge, beauty and goodness.",
    ayahArabic: defaultAyah.arabic,
    ayahTranslation: defaultAyah.translation,
    ayahReference: defaultAyah.reference,
  },
  mission: {
    eyebrow: "Our Mission",
    title: "Reconnecting hearts with their Creator",
    paragraph1:
      "NurulQuran is a non-profit institute dedicated to making authentic Islamic knowledge accessible, beautiful and transformative. We teach the Quran with understanding — not just recitation — so that every verse becomes a source of light, peace and goodness in your daily life.",
    paragraph2:
      "From the youngest learners to lifelong students, our serene, structured programs encourage goodness, gratitude and a deeper connection to the divine.",
  },
  stats: defaultStats,
  testimonials: defaultTestimonials,
  faqs: defaultFaqs,
  contact: {
    email: defaultFooter.email,
    phone: defaultFooter.phone,
    office: "Oslo, Norway (Global online)",
    tagline: defaultFooter.tagline,
  },
};

const SiteContentContext = createContext(DEFAULTS);

export const SiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    getSiteContent()
      .then((data) => {
        if (data && typeof data === "object") {
          setContent({ ...DEFAULTS, ...data });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
