import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  CaretDown,
  Compass,
  Diamond,
  HeartStraight,
  MapPin,
  Package,
  PaintBrush,
  PlayCircle,
  Trophy,
  Users,
  X,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import {
  portfolio,
  processSteps as process,
  valuePillars,
} from "@/data/siteConfig";
import type { PortfolioItem } from "@/types";

const PROCESS_ICONS: Record<string, Icon> = {
  compass: Compass,
  brush: PaintBrush,
  camera: Camera,
  package: Package,
};

const VALUE_ICONS: Record<string, Icon> = {
  trophy: Trophy,
  users: Users,
  diamond: Diamond,
  heart: HeartStraight,
};

function scrollTo(href: string, reduce: boolean) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export default function PortfolioAndProcess() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set(portfolio.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const items = useMemo(
    () => (filter === "All" ? portfolio : portfolio.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      {/* ---------------- PORTFOLIO ---------------- */}
      <section id="portfolio" className="relative bg-[#0D0D0F] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
                Selected Work
              </span>
              <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.08] tracking-tight text-white">
                A Portfolio Worth Framing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Browse weddings, celebrations, corporate nights and cinema. Tap any piece to open
                the full story.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                  filter === c
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5E6BE]"
                    : "border-white/12 text-white/55 hover:border-white/30 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: "easeOut" }}
                  onClick={() => setActive(item)}
                  className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-[#111113] text-left transition-colors hover:border-[#D4AF37]/40 ${
                    i % 5 === 0 ? "lg:row-span-2" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${i % 5 === 0 ? "h-72 lg:h-[26rem]" : "h-64"}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/30 to-transparent" />
                    {item.kind === "video" && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#0A0A0B]/70 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#F5E6BE] backdrop-blur-sm">
                        <PlayCircle weight="fill" className="h-3.5 w-3.5" />
                        Film
                      </span>
                    )}
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#0A0A0B]/60 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-xl leading-tight text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/50">
                          <MapPin className="h-3.5 w-3.5 text-[#D4AF37]/80" />
                          {item.location} · {item.year}
                        </p>
                      </div>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#0A0A0B]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section id="process" className="relative overflow-hidden bg-[#0A0A0B] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
              How It Works
            </span>
            <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.08] tracking-tight text-white">
              A Calm Four Step Journey
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => {
              const IconCmp = PROCESS_ICONS[step.icon] ?? Compass;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl text-[#D4AF37]/50">
                      {step.step}
                    </span>
                    <IconCmp className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- WHY US ---------------- */}
      <section id="why-us" className="relative bg-[#0D0D0F] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
                Why Choose Us
              </span>
              <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-[1.08] tracking-tight text-white">
                Four Reasons Clients Stay With Us
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                We are measured not by the number of events we produce, but by how many clients
                come back for the next chapter of their story.
              </p>
              <button
                onClick={() => scrollTo("#contact", !!reduce)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6BE] px-6 py-3 text-sm font-medium text-[#0A0A0B] transition-transform hover:-translate-y-[1px] active:scale-[0.98]"
              >
                Start Your Planning
                <ArrowUpRight weight="bold" className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
              {valuePillars.map((v, i) => {
                const IconCmp = VALUE_ICONS[v.icon] ?? Diamond;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                    className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.05] to-transparent p-7"
                  >
                    <IconCmp className="h-6 w-6 text-[#D4AF37]" />
                    <div className="mt-5 font-serif text-3xl text-[#F5E6BE]">
                      {v.metric}
                      {v.metricSuffix}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                      {v.metricLabel}
                    </div>
                    <h3 className="mt-5 text-base font-medium text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {v.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- LIGHTBOX ---------------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setActive(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 grid max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-[#0D0D0F] lg:grid-cols-2"
            >
              <div className="relative h-56 lg:h-full">
                <img
                  src={active.image}
                  alt={active.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] to-transparent lg:bg-gradient-to-r" />
                {active.kind === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#0A0A0B]/60 backdrop-blur-sm">
                      <PlayCircle weight="fill" className="h-8 w-8 text-[#F5E6BE]" />
                    </span>
                  </span>
                )}
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-7 md:p-9">
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">
                  {active.category}
                </span>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-white">
                  {active.title}
                </h3>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-white/50">
                  <MapPin className="h-4 w-4 text-[#D4AF37]/80" />
                  {active.location} · {active.year}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-white/60">
                  {active.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const title = active.title;
                    setActive(null);
                    window.dispatchEvent(
                      new CustomEvent("ahadu:select-service", { detail: title })
                    );
                    scrollTo("#contact", !!reduce);
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6BE] px-6 py-3 text-sm font-medium text-[#0A0A0B] transition-transform hover:-translate-y-[1px] active:scale-[0.98]"
                >
                  Book Something Like This
                  <ArrowUpRight weight="bold" className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0B]/70 text-white backdrop-blur-sm transition-colors hover:bg-[#D4AF37] hover:text-[#0A0A0B]"
                aria-label="Close project"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CaretDown className="hidden" aria-hidden />
    </>
  );
}