import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};

export function ContactSection() {
  return (
    <section id="contact" className="container-shell section-space border-t border-border">
      <div className="glass-panel rounded-[1.75rem] p-6 md:p-8">
        <SectionHeading eyebrow="Contact Me" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="p-5">
              <p className="font-mono text-label uppercase tracking-[0.24em] text-muted-foreground">
                Reach out
              </p>
              <div className="mt-4 space-y-3">
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="block text-heading font-semibold tracking-tight transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </Link>
                <p className="text-supporting leading-6 text-muted-foreground">
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
                    className="group flex items-center justify-between px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4.5" />
                      <span className="text-label font-medium">{item.label}</span>
                    </span>
                    <ArrowUpRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="p-5 md:p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
