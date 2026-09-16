export const siteConfig = {
  name: "Ayush Thakur — Software Developer & Design Engineer",
  description:
    "A minimal personal portfolio for Ayush Thakur with a clean developer-focused design system.",
  url: "https://ayushthakur.dev",
  email: "ayushth199@gmail.com",
  intro:
    "I'm a software developer based in Delhi, working mainly with React, Next.js and TypeScript. I care about building things that are actually useful rather than technically impressive, and I pay attention to how interfaces feel to use.",
  tagline: "Building things people actually use.",
  detailColumns: {
    left: [
      { icon: "Code", label: "Software Developer" },
      { icon: "MapPin", label: "Delhi, India" },
      { icon: "Link", label: "github.com/ryvvern", href: "https://github.com/ryvvern" },
    ],
    right: [
      { icon: "Clock", label: "time" as const },
      { icon: "Mail", label: "ayushth199@gmail.com", href: "mailto:ayushth199@gmail.com" },
    ],
  },
  aboutBullets: [
    "I am Ayush, a software developer who builds things instead of just planning them.",
    "I work with React, Next.js and TypeScript, and I'd rather ship something useful than something clever.",
    "Right now I'm building a webhook delivery service and a subscription reminder app, both open source.",
  ],
  navigation: [
    { label: "About", href: "/#about" },
    { label: "Stack", href: "/#stack" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact Me", href: "/#contact" },
  ],
  aboutHighlights: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "UI Engineering",
  ],
  primarySkills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI Engineering",
    "Animation",
    "API Integration",
    "Design Systems",
  ],
  stack: [
    {
      group: "Languages",
      items: ["TypeScript", "JavaScript", "Python"],
    },
    {
      group: "Frontend",
      items: ["React", "Next.js"],
    },
    {
      group: "Tools",
      items: ["Git", "Figma"],
    },
    {
      group: "AI",
      items: ["Claude", "Cursor", "ChatGPT"],
    },
  ],
  projects: [
    {
      title: "World Lore",
      category: "Interactive Country Atlas",
      year: "2026",
      description:
        "A map-based history app where clicking a country reveals summaries, timelines, facts, and comparisons, all powered by structured JSON data with no backend.",
      tech: ["React", "TypeScript", "Tailwind", "MapLibre GL"],
      image: "/projects/world-lore.svg",
      liveHref: "https://project-worldlore.vercel.app",
      githubHref: "https://github.com/ryvvern/project_worldlore",
    },
    {
      title: "Northstar Commerce",
      category: "Headless Storefront",
      year: "2025",
      description:
        "A conversion-focused ecommerce experience with editorial product storytelling, modular blocks, and responsive merchandising.",
      tech: ["React", "Shopify", "Tailwind", "Contentful"],
      image: "/projects/northstar-commerce.svg",
      liveHref: "https://example.com/northstar-commerce",
      githubHref: "https://github.com/ayushthakur/northstar-commerce",
    },
    {
      title: "MotionKit",
      category: "Component Library",
      year: "2025",
      description:
        "A design engineering playground for production-ready UI primitives, hover treatments, reveal patterns, and motion tokens.",
      tech: ["Next.js", "shadcn/ui", "Framer Motion", "MDX"],
      image: "/projects/motion-kit.svg",
      liveHref: "https://example.com/motion-kit",
      githubHref: "https://github.com/ayushthakur/motion-kit",
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/ryvvern" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush--thakur" },
    { label: "Twitter", href: "https://x.com/ryvvern_x" },
  ],
} as const;
