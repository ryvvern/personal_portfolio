"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import homeIcon from "@/app/home.svg";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleHomeClick(event: React.MouseEvent<HTMLAnchorElement>) {
    setMenuOpen(false);
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const hash = href.split("#")[1];
    if (!hash) return;
    event.preventDefault();
    setMenuOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(hash);
        if (!target) return;
        const targetRect = target.getBoundingClientRect();
        const targetCenter = targetRect.top + targetRect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const scrollDelta = targetCenter - viewportCenter;
        window.scrollTo({ top: window.scrollY + scrollDelta, behavior: "smooth" });
        history.pushState(null, "", href);
      });
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 inset-x-0 hidden md:block"
      >
        <div
          className="absolute inset-y-0 w-px bg-border"
          style={{ left: "calc(50% - var(--container-content) / 2)" }}
        />
        <div
          className="absolute inset-y-0 w-px bg-border"
          style={{ right: "calc(50% - var(--container-content) / 2)" }}
        />
      </div>
      <div className="container-shell flex items-center justify-between py-4">
        <Link
          href="/"
          aria-label="Home"
          onClick={handleHomeClick}
          className="hidden items-center transition-opacity duration-150 hover:opacity-70 md:flex"
        >
          <Image src={homeIcon} alt="" className="size-6 dark:invert" />
        </Link>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex size-8 items-center justify-center text-foreground md:hidden"
        >
          {menuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="text-body font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
      {menuOpen && (
        <nav className="border-t border-border md:hidden">
          <div className="container-shell flex flex-col py-2">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="py-3 text-body font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              Home
            </Link>
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="py-3 text-body font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
