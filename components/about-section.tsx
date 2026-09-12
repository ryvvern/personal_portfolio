import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-styles";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function AboutSection() {
  return (
    <section id="about" className="container-shell section-space">
      <h1 className="text-display font-semibold tracking-[-0.055em] text-balance">
        Ayush Thakur
      </h1>
      <p className="mt-1 font-mono text-body text-muted-foreground">
        Software Developer
      </p>
      <p className="mt-6 text-body text-foreground">
        {siteConfig.intro}
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
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
      <div className="mt-8 flex flex-wrap gap-3">
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
    </section>
  );
}
