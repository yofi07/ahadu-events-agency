import type {
  FaqItem,
  NavLink,
  PortfolioItem,
  ProcessStep,
  ServiceItem,
  SiteConfig,
  SocialLink,
  Testimonial,
  ValuePillar,
} from "@/types";

/* ------------------------------------------------------------------
 *  AHADU EVENTS - MASTER CONFIG
 *  Edit the values below to customise the whole website.
 *  Everything (text, phone, WhatsApp, images, socials) lives here.
 * ------------------------------------------------------------------ */

const IMAGES = {
  hero: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/b074e696-d14e-43bc-96a0-61e61a7620f3/hero-luxury-gala-5a5de33f-1792318808895.webp",
  wedding:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/b074e696-d14e-43bc-96a0-61e61a7620f3/portfolio-wedding-881d6471-1792318808278.webp",
  corporate:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/b074e696-d14e-43bc-96a0-61e61a7620f3/portfolio-corporate-85524db9-1792318808481.webp",
  decoration:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/b074e696-d14e-43bc-96a0-61e61a7620f3/portfolio-decoration-943c8e4b-1792318809181.webp",
  cinematic:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/b074e696-d14e-43bc-96a0-61e61a7620f3/portfolio-cinematic-c47c25ce-1792318808176.webp",
  birthday:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/b074e696-d14e-43bc-96a0-61e61a7620f3/portfolio-birthday-862bc7a9-1792318813106.webp",
  portrait:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/b074e696-d14e-43bc-96a0-61e61a7620f3/portfolio-portrait-07966c11-1792318812424.webp",
  brand:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/b074e696-d14e-43bc-96a0-61e61a7620f3/portfolio-brand-8fca82e7-1792318812633.webp",
};

export const GOLD = "#D4AF37";

export const siteConfig: SiteConfig = {
  brand: {
    name: "Ahadu Events",
    monogram: "AE",
    tagline: "Luxury Event Design, Photography & Cinematic Storytelling",
  },
  contact: {
    email: "hello@ahaduevents.com",
    phone: "+251 911 234 567",
    whatsapp: "251911234567",
    location: "22 NB Business Center 5th Floor, Addis Ababa, Ethiopia",
    hours: "Mon to Sat, 9:00 AM to 7:00 PM",
  },
  hero: {
    eyebrow: "Luxury Events Studio",
    title: "Every Moment.",
    highlight: "Beautifully Told.",
    subtitle:
      "We design unforgettable celebrations and capture timeless imagery that lives far beyond the day itself.",
    primaryCta: "Explore Our Work",
    secondaryCta: "Book Our Services",
    backgroundImage: IMAGES.hero,
    stats: [
      { value: 480, suffix: "+", label: "Events Produced" },
      { value: 12, suffix: " yrs", label: "Crafting Stories" },
      { value: 98, suffix: "%", label: "Client Return Rate" },
    ],
  },
  nav: [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "services", label: "Services", href: "#services" },
    { id: "portfolio", label: "Portfolio", href: "#portfolio" },
    { id: "process", label: "Process", href: "#process" },
    { id: "why-us", label: "Why Us", href: "#why-us" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "WhatsApp", url: "https://wa.me/251911234567", icon: "whatsapp" },
    { label: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { label: "Facebook", url: "https://facebook.com", icon: "facebook" },
    { label: "TikTok", url: "https://tiktok.com", icon: "tiktok" },
    { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  ],
};

export const navLinks: NavLink[] = siteConfig.nav;
export const socialLinks: SocialLink[] = siteConfig.socials;

export const aboutContent = {
  eyebrow: "Who We Are",
  title: "Where Every Great Story Begins",
  paragraphs: [
    "Ahadu Events was born from a simple conviction: a celebration should feel as extraordinary as the people at its centre. What started as a small photography passion has grown into a full-service studio for design, production and storytelling.",
    "From intimate vows to grand corporate galas, we blend meticulous planning with a cinematic eye. Every arrangement, every frame and every cut is composed with intention, so nothing beautiful slips past unnoticed.",
  ],
  visionTitle: "Born from Vision. Built to Shine.",
  visionText:
    "We believe luxury lives in the details: the warmth of the light, the weight of the cutlery, the pause before a first look. Our team obsesses over those details so you can simply be present.",
  highlights: [
    "Dedicated lead designer for every event",
    "Cinematic 4K film crew and fine art photographers",
    "In-house floral, lighting and stage fabrication",
    "Fully managed timelines and vendor coordination",
  ],
};

export const services: ServiceItem[] = [
  {
    id: "photography",
    title: "Photography & Videography",
    tagline: "Timeless frames, editorial polish",
    description:
      "Fine art photography and cinematic film captured by a crew that anticipates the moment before it happens.",
    features: ["Fine art albums", "4K cinematic film", "Second shooter included"],
    icon: "camera",
    image: IMAGES.portrait,
  },
  {
    id: "decoration",
    title: "Event Decoration",
    tagline: "Design that transforms space",
    description:
      "Floral installations, bespoke stages and layered lighting that turn a venue into a world of its own.",
    features: ["Custom floral design", "Ambient lighting rigs", "Stage and backdrop build"],
    icon: "brush",
    image: IMAGES.decoration,
  },
  {
    id: "weddings",
    title: "Weddings & Celebrations",
    tagline: "From vows to grand galas",
    description:
      "Full planning and on-the-day management for weddings, engagements, birthdays and anniversaries.",
    features: ["Full planning", "Vendor sourcing", "Day-of coordination"],
    icon: "heart",
    image: IMAGES.wedding,
  },
  {
    id: "corporate",
    title: "Corporate Events",
    tagline: "Brand moments with presence",
    description:
      "Launches, award nights and conferences delivered with precision, polish and a strong visual identity.",
    features: ["Product launches", "Award ceremonies", "Conference production"],
    icon: "buildings",
    image: IMAGES.corporate,
  },
  {
    id: "video-editing",
    title: "Video Editing",
    tagline: "Stories shaped in the edit",
    description:
      "Colour grading, sound design and narrative pacing that turn raw footage into an emotional experience.",
    features: ["Cinematic colour grade", "Sound design", "Social media cutdowns"],
    icon: "film",
    image: IMAGES.cinematic,
  },
  {
    id: "creative",
    title: "Creative Solutions",
    tagline: "Concepts made to be remembered",
    description:
      "Concept development, brand activations and promotional campaigns tailored to your audience.",
    features: ["Concept development", "Brand activations", "Promotional campaigns"],
    icon: "palette",
    image: IMAGES.brand,
  },
];

export const portfolio: PortfolioItem[] = [
  {
    id: "golden-hour-vows",
    title: "Golden Hour Vows",
    category: "Weddings",
    image: IMAGES.wedding,
    kind: "photo",
    location: "Sheraton, Addis Ababa",
    year: "2024",
    description:
      "An outdoor ceremony wrapped in warm string light, composed as a fine art editorial with a golden palette.",
    tags: ["Ceremony", "Fine Art", "Outdoor"],
  },
  {
    id: "a-grand-affair",
    title: "A Grand Affair",
    category: "Weddings",
    image: IMAGES.decoration,
    kind: "photo",
    location: "Skylight Hotel",
    year: "2024",
    description:
      "A cascading orchid installation and layered uplighting transformed a ballroom into a golden sanctuary.",
    tags: ["Floral Design", "Ballroom", "Lighting"],
  },
  {
    id: "midnight-gala",
    title: "Midnight Gala",
    category: "Corporate Events",
    image: IMAGES.corporate,
    kind: "video",
    location: "Millennium Hall",
    year: "2023",
    description:
      "A black tie awards night produced end to end, from stage fabrication to a cinematic highlight film.",
    tags: ["Awards", "Stage Build", "Highlight Film"],
  },
  {
    id: "bloom-and-gold",
    title: "Bloom & Gold",
    category: "Celebrations",
    image: IMAGES.decoration,
    kind: "photo",
    location: "Hyatt Regency",
    year: "2024",
    description:
      "A golden anniversary dinner styled with candle clusters, brass accents and an overflowing floral runway.",
    tags: ["Anniversary", "Tablescape", "Candlelight"],
  },
  {
    id: "cinematic-union",
    title: "Cinematic Union",
    category: "Cinematic Videos",
    image: IMAGES.cinematic,
    kind: "video",
    location: "Bishoftu",
    year: "2023",
    description:
      "A two day lakeside wedding captured on cinema glass and shaped into a seven minute love letter.",
    tags: ["Wedding Film", "4K", "Lakeside"],
  },
  {
    id: "gilded-birthday",
    title: "Gilded Birthday",
    category: "Celebrations",
    image: IMAGES.birthday,
    kind: "photo",
    location: "Addis Ababa",
    year: "2024",
    description:
      "A milestone birthday designed around black, gold and candlelight with a sculptural tiered cake centrepiece.",
    tags: ["Birthday", "Cake Design", "Gold Theme"],
  },
  {
    id: "signature-portrait",
    title: "Signature Portrait",
    category: "Photography",
    image: IMAGES.portrait,
    kind: "photo",
    location: "Studio Ahadu",
    year: "2024",
    description:
      "An editorial portrait session with dramatic rim light, crafted for a luxury fashion house campaign.",
    tags: ["Portrait", "Editorial", "Studio"],
  },
  {
    id: "brand-spotlight",
    title: "Brand Spotlight",
    category: "Promotional",
    image: IMAGES.brand,
    kind: "video",
    location: "Bole",
    year: "2023",
    description:
      "A launch activation and promotional film that placed a new product line at the heart of the evening.",
    tags: ["Launch", "Activation", "Promo Film"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We listen first. A relaxed conversation to understand your story, guests and the feeling you want in the room.",
    icon: "compass",
  },
  {
    step: "02",
    title: "Vision & Design",
    description:
      "Mood boards, 3D layouts and a transparent budget so every detail is agreed long before the day arrives.",
    icon: "brush",
  },
  {
    step: "03",
    title: "Production & Capture",
    description:
      "Our crew builds, styles and films with quiet precision, keeping the timeline calm from setup to send off.",
    icon: "camera",
  },
  {
    step: "04",
    title: "Timeless Delivery",
    description:
      "A curated gallery, cinematic film and fine art album delivered ready to share and to keep for a lifetime.",
    icon: "package",
  },
];

export const valuePillars: ValuePillar[] = [
  {
    title: "Award Winning Craft",
    description:
      "Recognised for editorial photography and event design across East Africa.",
    metric: 14,
    metricSuffix: "",
    metricLabel: "Design awards",
    icon: "trophy",
  },
  {
    title: "One Dedicated Team",
    description:
      "A single lead designer and crew stay with your event from first call to final delivery.",
    metric: 26,
    metricSuffix: "",
    metricLabel: "Specialists on call",
    icon: "users",
  },
  {
    title: "Obsessive Detail",
    description:
      "Every table, frame and cut is reviewed against the agreed design before it reaches you.",
    metric: 320,
    metricSuffix: "+",
    metricLabel: "Details checked nightly",
    icon: "diamond",
  },
  {
    title: "Always On Your Side",
    description:
      "Transparent quotes, no hidden costs, and a team that answers when you need them.",
    metric: 24,
    metricSuffix: "h",
    metricLabel: "Response window",
    icon: "heart",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "They understood the feeling we wanted before we could explain it. The room looked like a dream and the film still makes us cry.",
    name: "Hanna & Yonas",
    role: "Wedding, Addis Ababa",
  },
  {
    quote:
      "Flawless execution from setup to send off. Our awards night ran to the minute and the highlight film was stunning.",
    name: "Selam Bekele",
    role: "Head of Brand, Corporate Client",
  },
  {
    quote:
      "Every frame felt intentional. They turned a family dinner into a golden editorial without ever being intrusive.",
    name: "Mekdes A.",
    role: "Golden Anniversary",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "How far in advance should we book?",
    answer:
      "For full weddings and galas we recommend six to nine months. That said, we hold a few express slots each quarter, so reach out even for shorter timelines.",
  },
  {
    question: "Do you travel outside Addis Ababa?",
    answer:
      "Yes. We regularly produce events across Ethiopia and will quote travel and accommodation transparently as a separate line item.",
  },
  {
    question: "Can we book photography without full planning?",
    answer:
      "Absolutely. Photography, videography and decoration can each be booked on their own, and many clients combine two or three services.",
  },
  {
    question: "How do deposits and payments work?",
    answer:
      "A 30 percent deposit secures your date. The balance is split into a design milestone and a final payment due one week before the event.",
  },
];

/* Beginner-friendly deployment notes shown inside the in-app guide dialog. */
export const deploymentGuide: { title: string; body: string }[] = [
  {
    title: "1. Edit your content",
    body: "Open src/data/siteConfig.ts. Change the brand name, phone number, WhatsApp ID, services, portfolio items and social links. Every section of the site reads from this one file.",
  },
  {
    title: "2. Swap the images",
    body: "Replace the URLs in the IMAGES object near the top of siteConfig.ts with your own hosted photo links, or drop files into public/ and reference them as /my-photo.jpg.",
  },
  {
    title: "3. Publish on GitHub Pages",
    body: "Run bun run build, then push the project to GitHub. In Settings, open Pages and choose GitHub Actions as the source so the built site deploys on every push.",
  },
  {
    title: "4. Add a base path",
    body: 'If your site lives at username.github.io/ahadu-events, add base: "/ahadu-events/" to vite.config.ts so asset links resolve correctly.',
  },
];

export const customizationGuide = deploymentGuide;