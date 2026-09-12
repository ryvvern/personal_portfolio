import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export function ProjectsSection() {
  return (
    <section id="projects" className="container-shell section-space border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Projects"
          title="Selected projects that reflect how I build."
          description="A small selection of frontend and product-focused work with an emphasis on clean implementation, strong interface structure, and thoughtful presentation."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {siteConfig.projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08}>
            <Card className="glass-panel group h-full bg-transparent ring-0 py-0">
              <div className="overflow-hidden border-b border-border">
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  width={900}
                  height={680}
                  className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <CardHeader className="px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-label uppercase tracking-[0.22em] text-muted-foreground">
                    {project.year}
                  </p>
                  <p className="text-label text-muted-foreground">{project.category}</p>
                </div>
                <CardTitle className="text-heading tracking-tight">
                  {project.title}
                </CardTitle>
                <p className="text-secondary leading-6 text-muted-foreground">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
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
              </CardContent>
              <CardFooter className="mt-auto justify-between gap-3 border-t border-border bg-transparent px-5 py-4">
                <Link
                  href={project.liveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-label font-medium transition-colors hover:text-foreground"
                >
                  Live site
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href={project.githubHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-label font-medium transition-colors hover:text-foreground"
                >
                  GitHub
                  <Github className="size-4" />
                </Link>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
