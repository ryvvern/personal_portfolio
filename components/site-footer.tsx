import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="container-shell pb-8 pt-2">
      <div className="flex flex-col gap-4 border-t border-border/80 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Ayush Thakur.</p>
        <div className="flex flex-wrap gap-4">
          {siteConfig.socials.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="animated-underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
