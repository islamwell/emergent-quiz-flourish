import React, { useEffect, useRef, useState } from "react";
import { images, stats } from "../mock";

const Stats = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.clouds2} alt="Soft clouds over the sky" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary-foreground">
            A growing community of light
          </h2>
          <p className="mt-3 text-primary-foreground/75">
            Hearts touched across the globe, one verse at a time.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <p className="font-display text-5xl sm:text-6xl font-semibold text-primary-foreground">
                {s.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-wider text-primary-foreground/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
