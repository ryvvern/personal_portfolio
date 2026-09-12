import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export function ProjectsSection() {
  return (
    <section id="projects" className="container-shell section-space">
      <SectionHeading title="Projects" count={siteConfig.projects.length} />
      <div className="mt-10">
        {siteConfig.projects.map((project, index) => (
          <div
            key={project.title}
            className={
              index === 0
                ? "py-6"
                : "border-t border-border py-6"
            }
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-body font-medium">{project.title}</p>
              <p className="font-mono text-label text-muted-foreground">{project.year}</p>
            </div>
            <p className="mt-1 font-mono text-label text-muted-foreground">
              {project.category}
            </p>
            <p
              className="mt-3 text-supporting text-muted-foreground"
              style={{ maxWidth: "var(--container-prose)" }}
            >
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
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
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href={project.liveHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-label text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                Live site
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href={project.githubHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-label text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                GitHub
                <Github className="size-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
