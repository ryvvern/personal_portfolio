import { faOpenai } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  icon?: IconDefinition;
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
    icon: faOpenai,
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
}

function StackIcon({ item }: { item: StackItem }) {
  return (
    <div
      title={item.label}
      aria-label={item.label}
      className="flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
      style={item.monochrome ? undefined : { color: item.hex }}
    >
      {item.icon ? (
        <FontAwesomeIcon
          icon={item.icon}
          className={`h-11 w-11 ${item.monochrome ? "text-foreground" : ""}`}
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
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
          title="Tools I use to design and build."
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
