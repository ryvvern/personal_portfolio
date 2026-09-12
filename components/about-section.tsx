import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import portraitImage from "@/app/AT.png";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-styles";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function AboutSection() {
  return (
    <section id="about" className="container-shell section-space">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
        <Reveal delay={0.05} className="max-w-3xl lg:max-w-[760px]">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="font-mono text-label uppercase tracking-[0.28em] text-muted-foreground">
                About
              </p>
              <h1 className="max-w-3xl text-display font-semibold tracking-[-0.055em] text-balance">
                Ayush Thakur
              </h1>
              <p className="max-w-2xl text-secondary text-foreground">
                Software Developer &amp; Design Engineer
              </p>
              <ul className="max-w-[46rem] list-disc space-y-0.5 pl-5 text-body leading-5.5 text-muted-foreground md:space-y-1 md:leading-6.5">
                <li>I build AI-integrated apps with the intention of making them genuinely useful for people.</li>
                <li>I care more about practical products than adding AI just for hype.</li>
                <li>I mainly work with React, Next.js, TypeScript, and modern web tools.</li>
                <li>Design is one of my core interests, especially clean and simple interfaces.</li>
                <li>I like combining engineering, product thinking, and design in one workflow.</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {siteConfig.aboutHighlights.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="rounded-full border-border bg-transparent px-3 py-1 text-label text-muted-foreground tracking-[0.02em]"
                >
                  {item}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full px-5 font-medium"
                )}
              >
                View Projects
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-border bg-transparent px-5 text-label font-medium"
                )}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-[300px] lg:justify-self-end xl:max-w-[320px]"
        >
          <div className="glass-panel w-full overflow-hidden p-3">
            <div className="overflow-hidden">
              <Image
                src={portraitImage}
                alt="Portrait of Ayush Thakur"
                width={720}
                height={920}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="mt-4 px-4 py-3">
              <p className="font-mono text-label uppercase tracking-[0.24em] text-muted-foreground">
                Core skills
              </p>
              <p className="mt-2 text-body leading-6 text-muted-foreground">
                {siteConfig.primarySkills.join(" / ")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
