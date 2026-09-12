import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

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
    <section id="contact" className="container-shell section-space">
      <SectionHeading title="Contact" />
      <div className="mt-8">
        <Link
          href={`mailto:${siteConfig.email}`}
          className="text-body hover:underline"
        >
          {siteConfig.email}
        </Link>
        <p className="mt-2 text-supporting text-muted-foreground">
          Based in Delhi, India — open to remote work
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          {siteConfig.socials.map((item) => {
            const Icon = socialIcons[item.label];

            return (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-label text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
