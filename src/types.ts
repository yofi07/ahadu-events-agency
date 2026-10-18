export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  image: string;
}

export type PortfolioCategory =
  | "Weddings"
  | "Celebrations"
  | "Corporate Events"
  | "Photography"
  | "Cinematic Videos"
  | "Promotional";

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  kind: "photo" | "video";
  location: string;
  year: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface ValuePillar {
  title: string;
  description: string;
  metric: number;
  metricSuffix: string;
  metricLabel: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BookingInquiry {
  name: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string;
  guests: string;
  location: string;
  message: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    monogram: string;
    tagline: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    hours: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImage: string;
    stats: Stat[];
  };
  nav: NavLink[];
  socials: SocialLink[];
}