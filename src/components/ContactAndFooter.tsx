import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUp,
  CalendarBlank,
  CaretDown,
  Check,
  Clock,
  Copy,
  EnvelopeSimple,
  FacebookLogo,
  Gear,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  PaperPlaneRight,
  Phone,
  Sparkle,
  TiktokLogo,
  Users,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import {
  deploymentGuide,
  faqs,
  services,
  siteConfig,
} from "@/data/siteConfig";
import type { BookingInquiry } from "@/types";

const SOCIAL_ICONS: Record<string, Icon> = {
  whatsapp: WhatsappLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  tiktok: TiktokLogo,
  linkedin: LinkedinLogo,
};

const EMPTY: BookingInquiry = {
  name: "",
  email: "",
  phone: "",
  service: "",
  eventDate: "",
  guests: "",
  location: "",
  message: "",
};

const fieldBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#D4AF37]/70 focus:bg-white/[0.06]";

function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/8 rounded-2xl border border-white/8 bg-white/[0.02]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
              aria-expanded={isOpen}
            >
              <span
                className={`font-serif text-lg transition-colors ${
                  isOpen ? "text-[#F5E6BE]" : "text-white/85"
                }`}
              >
                {item.question}
              </span>
              <CaretDown
                className={`h-4 w-4 shrink-0 text-[#D4AF37] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-white/55 md:px-6">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function GuideDialog({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(text);
        toast.success("Copied to clipboard");
        window.setTimeout(() => setCopied(null), 1800);
      })
      .catch(() => toast.error("Copy is unavailable in this browser"));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#D4AF37]/25 bg-[#0D0D0F] p-7 md:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
              Owner Guide
            </span>
            <h3 className="mt-2 font-serif text-3xl leading-tight text-white">
              Customise This Website
            </h3>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-[#D4AF37] hover:text-[#0A0A0B]"
            aria-label="Close guide"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/55">
          No coding experience needed. All content for this site is stored in one beginner-friendly
          file, so you can update text and images in minutes.
        </p>

        <div className="mt-7 space-y-4">
          {deploymentGuide.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
            >
              <h4 className="text-sm font-medium text-[#F5E6BE]">{g.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{g.body}</p>
            </div>
          ))}
        </div>

        {[
          "bun install",
          "bun run dev",
          "bun run build",
        ].map((cmd) => (
          <div key={cmd} className="mt-3">
            <button
              onClick={() => copy(cmd)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#D4AF37]/25 bg-[#111113] px-4 py-3 text-left font-mono text-xs text-[#F5E6BE] transition-colors hover:border-[#D4AF37]/60"
            >
              <span>{cmd}</span>
              {copied === cmd ? (
                <Check weight="bold" className="h-4 w-4 text-[#D4AF37]" />
              ) : (
                <Copy className="h-4 w-4 text-white/40" />
              )}
            </button>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function ContactAndFooter() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<BookingInquiry>(EMPTY);
  const [guide, setGuide] = useState(false);
  const [sending, setSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const { contact, brand, nav, socials } = siteConfig;

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string") {
        setForm((f) => ({ ...f, service: detail }));
        toast.success("Service added to your enquiry");
      }
    };
    window.addEventListener("ahadu:select-service", handler);
    return () => window.removeEventListener("ahadu:select-service", handler);
  }, []);

  const update = (key: keyof BookingInquiry, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please add your name and email so we can reply.");
      nameRef.current?.focus();
      return;
    }
    setSending(true);

    const lines = [
      `New enquiry for ${brand.name}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.service && `Service: ${form.service}`,
      form.eventDate && `Event date: ${form.eventDate}`,
      form.guests && `Guests: ${form.guests}`,
      form.location && `Location: ${form.location}`,
      form.message && `Details: ${form.message}`,
    ].filter(Boolean);

    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
      lines.join(String.fromCharCode(10))
    )}`;

    window.setTimeout(() => {
      setSending(false);
      toast.success("Enquiry ready. Opening WhatsApp to send it.");
      window.open(url, "_blank", "noopener,noreferrer");
      setForm(EMPTY);
    }, 400);
  };

  return (
    <>
      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="relative overflow-hidden bg-[#0A0A0B] py-24 md:py-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
          {/* Info */}
          <div className="lg:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
              Let&apos;s Talk
            </span>
            <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.08] tracking-tight text-white">
              Book Your Consultation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Tell us a little about your celebration and we will come back with a tailored
              proposal, availability and a transparent quote.
            </p>

            <div className="mt-9 space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-[#D4AF37]/40"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#0A0A0B]">
                  <EnvelopeSimple className="h-5 w-5 text-[#D4AF37]" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-white/40">
                    Email us
                  </span>
                  <span className="block text-sm text-white/85">{contact.email}</span>
                </span>
              </a>

              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-[#D4AF37]/40"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#0A0A0B]">
                  <Phone className="h-5 w-5 text-[#D4AF37]" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-white/40">
                    Call the studio
                  </span>
                  <span className="block text-sm text-white/85">{contact.phone}</span>
                </span>
              </a>

              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/8 p-4 transition-colors hover:border-[#D4AF37]/60"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#D4AF37]">
                  <WhatsappLogo weight="fill" className="h-5 w-5 text-[#0A0A0B]" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-white/50">
                    Fastest reply
                  </span>
                  <span className="block text-sm text-white/90">
                    Chat on WhatsApp
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#0A0A0B]">
                  <MapPin className="h-5 w-5 text-[#D4AF37]" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-white/40">
                    Studio
                  </span>
                  <span className="block text-sm text-white/85">{contact.location}</span>
                </span>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#0A0A0B]">
                  <Clock className="h-5 w-5 text-[#D4AF37]" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-white/40">
                    Opening hours
                  </span>
                  <span className="block text-sm text-white/85">{contact.hours}</span>
                </span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {socials.map((s) => {
                const IconCmp = SOCIAL_ICONS[s.icon] ?? Sparkle;
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                  >
                    <IconCmp className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={submit}
              className="rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-white/[0.05] to-transparent p-6 backdrop-blur-sm md:p-9"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-wider text-white/45">
                    Full name *
                  </label>
                  <input
                    ref={nameRef}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    className={fieldBase}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-wider text-white/45">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className={fieldBase}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-wider text-white/45">
                    Phone
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+251 900 000 000"
                    className={fieldBase}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-wider text-white/45">
                    Service
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={`${fieldBase} appearance-none`}
                  >
                    <option value="" className="bg-[#111113]">
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title} className="bg-[#111113]">
                        {s.title}
                      </option>
                    ))}
                    <option value="Something else" className="bg-[#111113]">
                      Something else
                    </option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-wider text-white/45">
                    Event date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => update("eventDate", e.target.value)}
                      className={`${fieldBase} pr-11`}
                    />
                    <CalendarBlank className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/70" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-wider text-white/45">
                    Guest count
                  </label>
                  <div className="relative">
                    <input
                      value={form.guests}
                      onChange={(e) => update("guests", e.target.value)}
                      placeholder="e.g. 180"
                      className={`${fieldBase} pr-11`}
                    />
                    <Users className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/70" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[11px] uppercase tracking-wider text-white/45">
                    Event location
                  </label>
                  <input
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="Venue, city"
                    className={fieldBase}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[11px] uppercase tracking-wider text-white/45">
                    Tell us about your celebration
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Share the vision, the mood and anything you already have planned."
                    className={`${fieldBase} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6BE] px-7 py-3.5 text-sm font-medium text-[#0A0A0B] transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <PaperPlaneRight weight="fill" className="h-4 w-4" />
                {sending ? "Preparing enquiry..." : "Send Enquiry"}
              </button>
              <p className="mt-3 text-center text-[11px] text-white/40">
                We reply within 24 hours. Your details are never shared.
              </p>
            </form>

            <div className="mt-14">
              <h3 className="font-serif text-2xl text-white">Questions, Answered</h3>
              <div className="mt-5">
                <Faq items={faqs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-white/8 bg-[#0D0D0F] pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#D4AF37]/20 to-transparent">
                  <span className="font-serif text-sm text-[#F5E6BE]">
                    {brand.monogram}
                  </span>
                </span>
                <span className="font-serif text-2xl text-white">{brand.name}</span>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                {brand.tagline}. Designing and documenting celebrations across Ethiopia since 2013.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {socials.map((s) => {
                  const IconCmp = SOCIAL_ICONS[s.icon] ?? Sparkle;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/55 transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                    >
                      <IconCmp className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">
                Explore
              </h4>
              <ul className="mt-5 space-y-2.5">
                {nav.map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.href}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">
                Studio
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/55">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]/80" />
                  {contact.location}
                </li>
                <li className="flex items-start gap-3">
                  <EnvelopeSimple className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]/80" />
                  <a className="hover:text-white" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]/80" />
                  <a className="hover:text-white" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                    {contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]/80" />
                  {contact.hours}
                </li>
              </ul>

              <button
                onClick={() => setGuide(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 px-5 py-2.5 text-xs uppercase tracking-wider text-[#F5E6BE] transition-colors hover:bg-[#D4AF37]/10"
              >
                <Gear className="h-4 w-4" />
                Owner Guide
              </button>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 md:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <p className="text-xs text-white/30">
              Crafted in Addis Ababa · Luxury Events Studio
            </p>
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
              }
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 transition-colors hover:text-[#D4AF37]"
            >
              Back to top
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>{guide && <GuideDialog onClose={() => setGuide(false)} />}</AnimatePresence>
    </>
  );
}