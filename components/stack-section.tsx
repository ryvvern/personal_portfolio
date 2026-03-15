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
  monochrome?: boolean;
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
    monochrome: true,
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
    monochrome: true,
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
    monochrome: true,
  },
};

function ChatGptIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.9">
        <path d="M24 7.7c3.7 0 6.8 3 6.8 6.8v3.4h3.3c3.7 0 6.8 3 6.8 6.8s-3 6.8-6.8 6.8h-2.8l1.4 2.4c1.9 3.2.8 7.4-2.4 9.2-3.2 1.9-7.4.8-9.2-2.4L20 38.3l-1.4 2.4c-1.9 3.2-6 4.3-9.2 2.4-3.2-1.9-4.3-6-2.4-9.2l1.4-2.4H5.8C2 31.5-1 28.5-1 24.7s3-6.8 6.8-6.8H9v-3.4c0-3.7 3-6.8 6.8-6.8 2.2 0 4.3 1.1 5.6 2.9L24 15l2.6-4.4A6.53 6.53 0 0 1 24 7.7Z" transform="translate(4 0)" />
        <path d="M24 12.5 29.2 15.5 29.2 21.4 34.3 24.4 34.3 30.3 29.2 33.3 24 30.3 18.8 33.3 13.7 30.3 13.7 24.4 18.8 21.4 18.8 15.5Z" />
        <path d="M24 12.5 29.2 15.5 34.3 24.4 29.2 33.3 18.8 33.3 13.7 24.4 18.8 15.5Z" />
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
      style={item.monochrome ? undefined : { color: item.hex }}
    >
      {item.custom ? (
        <span className="text-foreground">
          <ChatGptIcon />
        </span>
      ) : (
        <svg
          viewBox={item.viewBox ?? "0 0 24 24"}
          aria-hidden="true"
          className={`h-11 w-11 fill-current ${item.monochrome ? "text-foreground" : ""}`}
        >
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
