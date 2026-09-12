import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="container-shell flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-body font-medium transition-colors duration-150 hover:text-muted-foreground"
        >
          Ayush Thakur
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-label text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
