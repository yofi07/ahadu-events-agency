import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, WhatsappLogo } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesAndAbout from "@/components/ServicesAndAbout";
import PortfolioAndProcess from "@/components/PortfolioAndProcess";
import ContactAndFooter from "@/components/ContactAndFooter";
import { navLinks, siteConfig } from "@/data/siteConfig";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] font-sans text-white antialiased selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <ServicesAndAbout />
        <PortfolioAndProcess />
        <ContactAndFooter />
      </main>

      {/* Floating WhatsApp */}
      <motion.a
        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="fixed bottom-5 left-5 z-40 inline-flex h-13 w-13 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#0D0D0F]/90 p-3.5 text-[#D4AF37] shadow-lg shadow-black/50 backdrop-blur-md transition-transform hover:-translate-y-0.5"
      >
        <WhatsappLogo weight="fill" className="h-6 w-6" />
      </motion.a>

      {/* Back to top */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#0D0D0F]/90 px-4 py-3 text-xs uppercase tracking-wider text-white/70 backdrop-blur-md transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        >
          Top
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}

      <Toaster
        position="bottom-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "#111113",
            border: "1px solid rgba(212,175,55,0.35)",
            color: "#F5E6BE",
          },
        }}
      />
    </div>
  );
}

export default App;