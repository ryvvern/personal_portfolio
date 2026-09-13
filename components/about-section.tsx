"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Code,
  Github,
  Linkedin,
  Link as LinkIcon,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";

import coverImage from "@/app/cover_photo.jpg";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-styles";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const detailIcons = {
  Code,
  MapPin,
  Link: LinkIcon,
  Clock,
  Mail,
} as const;

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};

function LiveTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function updateTime() {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    }
    updateTime();
    const id = setInterval(updateTime, 60000);
    return () => clearInterval(id);
  }, []);

  return <span>{time ?? "--:-- --"}</span>;
}

function Greeting() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <h2 className="text-heading font-semibold text-foreground">
      {greeting ?? "Hello"}
    </h2>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="container-shell section-space">
      <div className="relative">
        <div className="relative h-40 w-full overflow-hidden rounded-sm border border-border">
          <Image
            src={coverImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-0 left-6 size-24 translate-y-1/2 rounded-full bg-foreground ring-4 ring-background" />
      </div>

      <div className="mt-16">
        <h1 className="text-display font-semibold tracking-[-0.055em] text-balance">
          Ayush Thakur
        </h1>
        <p className="mt-1 font-mono text-body text-muted-foreground">
          {siteConfig.tagline}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-0">
        <div className="flex flex-col gap-3 md:border-r md:border-border md:pr-6">
          {siteConfig.detailColumns.left.map((item) => {
            const Icon = detailIcons[item.icon as keyof typeof detailIcons];
            const content = (
              <span className="flex items-center gap-3">
                <Icon className="size-4 text-muted-foreground" />
                <span className="font-mono text-body">{item.label}</span>
              </span>
            );
            return "href" in item && item.href ? (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-150 hover:text-foreground"
              >
                {content}
              </Link>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 md:pl-6">
          {siteConfig.detailColumns.right.map((item) => {
            const Icon = detailIcons[item.icon as keyof typeof detailIcons];
            if (item.label === "time") {
              return (
                <div key={item.icon} className="flex items-center gap-3">
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="font-mono text-body">
                    <LiveTime />
                  </span>
                </div>
              );
            }
            const content = (
              <span className="flex items-center gap-3">
                <Icon className="size-4 text-muted-foreground" />
                <span className="font-mono text-body">{item.label}</span>
              </span>
            );
            return "href" in item && item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-150 hover:text-foreground"
              >
                {content}
              </Link>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {siteConfig.socials.map((item) => {
          const Icon = socialIcons[item.label];
          return (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="flex size-8 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              <Icon className="size-4" />
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        <Greeting />
        <ul className="mt-4 flex flex-col gap-3 text-body">
          {siteConfig.aboutBullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="text-muted-foreground">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

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
