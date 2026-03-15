import {
  siClaude,
  siCursor,
  siFigma,
  siGit,
  siJavascript,
  siNextdotjs,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

type StackItem = {
  label: (typeof siteConfig.stack)[number];
  hex: string;
  path?: string;
  viewBox?: string;
  custom?: boolean;
};

const stackIcons: Record<(typeof siteConfig.stack)[number], StackItem> = {
  React: {
    label: "React",
    hex: `#${siReact.hex}`,
    path: siReact.path,
  },
  Cursor: {
    label: "Cursor",
    hex: `#${siCursor.hex}`,
    path: siCursor.path,
  },
  Claude: {
    label: "Claude",
    hex: `#${siClaude.hex}`,
    path: siClaude.path,
  },
  ChatGPT: {
    label: "ChatGPT",
    hex: "#101010",
    custom: true,
    viewBox: "0 0 48 48",
  },
  Figma: {
    label: "Figma",
    hex: `#${siFigma.hex}`,
    path: siFigma.path,
  },
  TypeScript: {
    label: "TypeScript",
    hex: `#${siTypescript.hex}`,
    path: siTypescript.path,
  },
  Git: {
    label: "Git",
    hex: `#${siGit.hex}`,
    path: siGit.path,
  },
  JavaScript: {
    label: "JavaScript",
    hex: `#${siJavascript.hex}`,
    path: siJavascript.path,
  },
  Python: {
    label: "Python",
    hex: `#${siPython.hex}`,
    path: siPython.path,
  },
  "Next.js": {
    label: "Next.js",
    hex: `#${siNextdotjs.hex}`,
    path: siNextdotjs.path,
  },
};

function ChatGptIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <path d="M24 8.5c4 0 7.3 3.2 7.3 7.2v3.2l2.8-1.6a7.2 7.2 0 0 1 7.2 12.5l-2.8 1.6 2.8 1.6a7.2 7.2 0 0 1-7.2 12.5l-2.8-1.6v3.2A7.2 7.2 0 0 1 17 47.1v-3.2l-2.8 1.6A7.2 7.2 0 0 1 7 33l2.8-1.6L7 29.8a7.2 7.2 0 0 1 7.2-12.5l2.8 1.6v-3.2A7.2 7.2 0 0 1 24 8.5Z" />
        <path d="M24 13.2a5 5 0 0 1 5 5v5.1l4.4 2.5a5 5 0 0 1 0 8.7L29 37v5a5 5 0 0 1-10 0v-5l-4.4-2.5a5 5 0 0 1 0-8.7l4.4-2.5v-5.1a5 5 0 0 1 5-5Z" />
        <path d="M24 18.3 29 21v6l-5 2.8-5-2.8v-6l5-2.7Z" />
      </g>
    </svg>
  );
}

function StackIcon({ item }: { item: StackItem }) {
  return (
    <div
      title={item.label}
      aria-label={item.label}
      className="flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
      style={{ color: item.hex }}
    >
      {item.custom ? (
        <ChatGptIcon />
      ) : (
        <svg viewBox={item.viewBox ?? "0 0 24 24"} aria-hidden="true" className="h-11 w-11 fill-current">
          <path d={item.path} />
        </svg>
      )}
    </div>
  );
}

export function StackSection() {
  return (
    <section id="stack" className="container-shell pb-10 pt-6 md:pb-12 md:pt-8">
      <Reveal>
        <SectionHeading
          eyebrow="Stack"
          title="Tools I use to design, build, and ship."
          description="A focused set of tools for frontend development, design work, and AI-assisted product building."
        />
      </Reveal>
      <Reveal delay={0.05} className="mt-8">
        <div className="rounded-[1.5rem] border border-border bg-card px-5 py-6 md:px-7">
          <div className="grid grid-cols-3 gap-x-6 gap-y-7 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10">
            {siteConfig.stack.map((label) => (
              <StackIcon key={label} item={stackIcons[label]} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
