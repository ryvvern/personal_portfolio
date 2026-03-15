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
    <section id="projects" className="container-shell pb-16 pt-6 md:pb-20 md:pt-8">
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
            <Card className="glass-panel group h-full rounded-[1.5rem] border-border/80 bg-card py-0">
              <div className="overflow-hidden rounded-t-[1.5rem] border-b border-border/80 bg-background">
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
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                    {project.year}
                  </p>
                  <p className="text-xs text-muted-foreground">{project.category}</p>
                </div>
                <CardTitle className="text-xl tracking-tight">
                  {project.title}
                </CardTitle>
                <p className="text-sm leading-6 text-muted-foreground md:text-[0.95rem]">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="rounded-full border-border/80 px-2.5 py-1 text-[11px]"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto justify-between gap-3 border-t border-border/80 bg-muted/20 px-5 py-4">
                <Link
                  href={project.liveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  Live site
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href={project.githubHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
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
