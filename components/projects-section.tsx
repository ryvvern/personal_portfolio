"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Folder, Github } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export function ProjectsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="projects" className="container-shell pb-8">
      <SectionHeading title="Projects" count={siteConfig.projects.length} />
      <div className="-mx-6 border-t border-border">
        {siteConfig.projects.map((project, index) => {
          const isExpanded = expandedIndex === index;
          const contentId = `project-content-${index}`;

          return (
            <div
              key={project.title}
              className={index === 0 ? "" : "border-t border-border"}
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={contentId}
                onClick={() =>
                  setExpandedIndex(isExpanded ? null : index)
                }
                className="flex w-full items-center gap-3 px-6 py-4 text-left transition-colors duration-150 hover:bg-muted"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-border">
                  <Folder className="size-4 text-muted-foreground" />
                </span>
                <span className="flex-1">
                  <span className="block text-body font-medium">
                    {project.title}
                  </span>
                  <span className="block font-mono text-label text-muted-foreground">
                    {project.year}
                  </span>
                </span>
                <ChevronDown
                  className={
                    isExpanded
                      ? "size-4 shrink-0 rotate-180 text-muted-foreground transition-transform duration-150"
                      : "size-4 shrink-0 text-muted-foreground transition-transform duration-150"
                  }
                />
              </button>
              {isExpanded && (
                <div
                  id={contentId}
                  className="pb-6 pr-6"
                  style={{ paddingLeft: "calc(1.5rem + 2rem + 0.75rem)" }}
                >
                  <p className="font-mono text-label text-muted-foreground">
                    {project.category}
                  </p>
                  <p
                    className="mt-2 text-supporting text-muted-foreground"
                    style={{ maxWidth: "var(--container-prose)" }}
                  >
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="rounded-full border-border px-2.5 py-1 text-label text-muted-foreground"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <Link
                      href={project.liveHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-2 text-label text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    >
                      Live site
                      <ArrowUpRight className="size-4" />
                    </Link>
                    <Link
                      href={project.githubHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-2 text-label text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    >
                      GitHub
                      <Github className="size-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
