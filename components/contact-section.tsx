import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};

export function ContactSection() {
  return (
    <section id="contact" className="container-shell section-space">
      <div className="glass-panel rounded-[1.75rem] p-6 md:p-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact Me"
            title="Let&apos;s build something clean and useful."
            description="If you have a product idea, freelance opportunity, or frontend role in mind, feel free to reach out."
          />
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal delay={0.05}>
            <div className="space-y-6">
              <div className="rounded-[1.4rem] border border-border/80 bg-background p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  Reach out
                </p>
                <div className="mt-4 space-y-3">
                  <Link
                    href={`mailto:${siteConfig.email}`}
                    className="block text-xl font-semibold tracking-tight transition-colors hover:text-primary md:text-2xl"
                  >
                    {siteConfig.email}
                  </Link>
                  <p className="text-sm leading-6 text-muted-foreground md:text-[0.95rem]">
                    Based in India, collaborating remotely across product, design,
                    and engineering teams.
                  </p>
                </div>
              </div>
              <div className="grid gap-3">
                {siteConfig.socials.map((item) => {
                  const Icon = socialIcons[item.label];

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-[1.25rem] border border-border/80 bg-background px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="size-4.5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </span>
                      <ArrowUpRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[1.4rem] border border-border/80 bg-background p-5 md:p-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
