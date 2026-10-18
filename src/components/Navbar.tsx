import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { List, X, ArrowUpRight, WhatsappLogo, Sparkle } from "@phosphor-icons/react";
import { navLinks, siteConfig } from "@/data/siteConfig";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#D4AF37]/15 bg-[#0A0A0B]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          <button
            onClick={() => handleNav("#home")}
            className="group flex items-center gap-3"
            aria-label="Go to top"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#D4AF37]/20 to-transparent">
              <span className="font-serif text-sm tracking-tight text-[#F5E6BE]">
                {siteConfig.brand.monogram}
              </span>
            </span>
            <span className="flex flex-col text-left leading-none">
              <span className="font-serif text-lg tracking-tight text-white md:text-xl">
                {siteConfig.brand.name}
              </span>
              <span className="mt-0.5 hidden text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] md:block">
                Events
              </span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                      active
                        ? "text-[#F5E6BE]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-[#D4AF37]"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-[#D4AF37]/40 px-4 py-2 text-sm text-[#F5E6BE] transition-colors hover:bg-[#D4AF37]/10 md:inline-flex"
            >
              <WhatsappLogo weight="fill" className="h-4 w-4" />
              Chat
            </a>
            <button
              onClick={() => handleNav("#contact")}
              className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6BE] px-5 py-2.5 text-sm font-medium text-[#0A0A0B] transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98] md:inline-flex"
            >
              <Sparkle weight="fill" className="h-4 w-4" />
              Book Consultation
            </button>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
              aria-label="Open menu"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col border-l border-[#D4AF37]/20 bg-[#0D0D0F] px-7 py-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl text-white">
                  {siteConfig.brand.name}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <button
                      onClick={() => handleNav(link.href)}
                      className={`flex w-full items-center justify-between border-b border-white/5 py-4 text-left font-serif text-2xl transition-colors ${
                        activeSection === link.id
                          ? "text-[#D4AF37]"
                          : "text-white/80"
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight className="h-5 w-5 opacity-40" />
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <button
                  onClick={() => handleNav("#contact")}
                  className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6BE] px-5 py-3 text-sm font-medium text-[#0A0A0B]"
                >
                  Book Consultation
                </button>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/40 px-5 py-3 text-sm text-[#F5E6BE]"
                >
                  <WhatsappLogo weight="fill" className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}