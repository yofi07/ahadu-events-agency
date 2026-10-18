import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkle } from "@phosphor-icons/react";
import { siteConfig } from "@/data/siteConfig";

function scrollTo(href: string, reduce: boolean) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const words = (text: string) => text.split(" ");

export default function Hero() {
  const reduce = useReducedMotion();
  const { hero } = siteConfig;

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#0A0A0B] pt-24 pb-16 md:pt-28"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={hero.backgroundImage}
          alt="Luxury event reception hall lit with golden candlelight"
          className="h-full w-full object-cover opacity-45"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/85 via-[#0A0A0B]/75 to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(212,175,55,0.18),transparent_55%)]" />
      </div>

      {/* Ambient gold blobs */}
      {!reduce && (
        <>
          <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#D4AF37]/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#F5E6BE]/10 blur-3xl" />
        </>
      )}

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-[#F5E6BE] backdrop-blur-sm"
          >
            <Sparkle weight="fill" className="h-3.5 w-3.5 text-[#D4AF37]" />
            {hero.eyebrow}
          </motion.span>

          <h1 className="mt-7 font-serif text-[clamp(2.6rem,8vw,5.4rem)] font-light leading-[1.02] tracking-tight text-white">
            <span className="block">
              {words(hero.title).map((w, i) => (
                <motion.span
                  key={`t-${i}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: "easeOut" }}
                  className="mr-3 inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#D4AF37] bg-clip-text italic text-transparent">
              {words(hero.highlight).map((w, i) => (
                <motion.span
                  key={`h-${i}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 + i * 0.08, duration: 0.7, ease: "easeOut" }}
                  className="mr-3 inline-block pb-2"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-7 max-w-[52ch] text-base leading-relaxed text-white/65 md:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => scrollTo("#portfolio", !!reduce)}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6BE] px-7 py-3.5 text-sm font-medium text-[#0A0A0B] transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
            >
              {hero.primaryCta}
              <ArrowRight
                weight="bold"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollTo("#contact", !!reduce)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/45 px-7 py-3.5 text-sm font-medium text-[#F5E6BE] backdrop-blur-sm transition-colors hover:bg-[#D4AF37]/10"
            >
              <PlayCircle className="h-5 w-5" />
              {hero.secondaryCta}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="lg:col-span-4"
        >
          <div className="rounded-2xl border border-[#D4AF37]/20 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-4">
              {hero.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-serif text-2xl text-[#F5E6BE] md:text-3xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-1 text-[11px] uppercase leading-tight tracking-wider text-white/50">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Full service design, photography and cinematic film, delivered by one dedicated team.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-[#D4AF37] to-transparent"
        />
      </div>
    </section>
  );
}