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

import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

type StackToolLabel = (typeof siteConfig.stack)[number]["items"][number];

type StackItem = {
  label: StackToolLabel;
  hex: string;
  path?: string;
  icon?: IconDefinition;
  monochrome?: boolean;
};

const stackIcons: Record<StackToolLabel, StackItem> = {
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
      className="flex items-center justify-center text-muted-foreground"
    >
      {item.icon ? (
        <FontAwesomeIcon icon={item.icon} className="size-4" />
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
          <path d={item.path} />
        </svg>
      )}
    </div>
  );
}

export function StackSection() {
  return (
    <section id="stack" className="container-shell section-space border-t border-border">
      <SectionHeading title="Stack" />
      <div className="mt-8">
        {siteConfig.stack.map((group, index) => (
          <div
            key={group.group}
            className={
              index === 0
                ? "flex flex-col gap-2 py-4 md:flex-row md:items-center"
                : "flex flex-col gap-2 border-t border-border py-4 md:flex-row md:items-center"
            }
          >
            <div className="flex items-center gap-2 md:w-40 md:shrink-0">
              <span className="text-label text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-label text-muted-foreground">
                {group.group}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {group.items.map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <StackIcon item={stackIcons[label]} />
                  <span className="text-body">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
