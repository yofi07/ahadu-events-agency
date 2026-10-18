import { motion, useReducedMotion } from "framer-motion";
import {
  Buildings,
  Camera,
  Check,
  FilmStrip,
  HeartStraight,
  PaintBrush,
  Palette,
  Quotes,
  Sparkle,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { aboutContent, services, siteConfig, testimonials } from "@/data/siteConfig";

const SERVICE_ICONS: Record<string, Icon> = {
  camera: Camera,
  brush: PaintBrush,
  heart: HeartStraight,
  buildings: Buildings,
  film: FilmStrip,
  palette: Palette,
};

function scrollTo(href: string, reduce: boolean) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.08] tracking-tight text-white">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-white/60">{intro}</p>
      )}
    </div>
  );
}

export default function ServicesAndAbout() {
  const reduce = useReducedMotion();

  const enquire = (title: string) => {
    window.dispatchEvent(new CustomEvent("ahadu:select-service", { detail: title }));
    scrollTo("#contact", !!reduce);
  };

  return (
    <>
      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="relative overflow-hidden bg-[#0A0A0B] py-24 md:py-32">
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#D4AF37]/8 blur-3xl" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <SectionHeading eyebrow={aboutContent.eyebrow} title={aboutContent.title} />
              <div className="mt-6 space-y-5">
                {aboutContent.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-base leading-relaxed text-white/60">
                    {p}
                  </p>
                ))}
              </div>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {aboutContent.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-white/70">
                    <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-white/[0.05] to-transparent p-8 backdrop-blur-sm md:p-10">
              <Sparkle weight="fill" className="h-7 w-7 text-[#D4AF37]" />
              <h3 className="mt-5 font-serif text-2xl leading-tight text-white md:text-3xl">
                {aboutContent.visionTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {aboutContent.visionText}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {siteConfig.hero.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-2xl text-[#F5E6BE]">
                      {s.value}
                      {s.suffix}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-white/45">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="relative bg-[#0D0D0F] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="What We Do"
            title="Six Ways We Make It Unforgettable"
            intro="Choose a single service or let us handle the whole experience, from the first concept sketch to the final delivered album."
          />

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const IconCmp = SERVICE_ICONS[service.icon] ?? Sparkle;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: "easeOut" }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#111113] transition-colors duration-300 hover:border-[#D4AF37]/40"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/40 to-transparent" />
                    <span className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#0A0A0B]/70 backdrop-blur-sm">
                      <IconCmp className="h-5 w-5 text-[#D4AF37]" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl leading-snug text-white">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]/90">
                      {service.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/55">
                      {service.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => enquire(service.title)}
                      className="mt-6 self-start text-sm font-medium text-[#F5E6BE] underline decoration-[#D4AF37]/40 underline-offset-4 transition-colors hover:text-[#D4AF37]"
                    >
                      Enquire about this service
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="relative overflow-hidden bg-[#0A0A0B] py-24 md:py-32">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#F5E6BE]/8 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Kind Words"
            title="Stories Our Clients Still Tell"
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-sm"
              >
                <Quotes weight="fill" className="h-6 w-6 text-[#D4AF37]/70" />
                <p className="mt-5 flex-1 text-sm leading-relaxed text-white/70">
                  {t.quote}
                </p>
                <footer className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-serif text-lg text-[#F5E6BE]">{t.name}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/45">
                    {t.role}
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}