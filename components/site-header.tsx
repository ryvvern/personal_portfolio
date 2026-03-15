import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/lib/button-styles";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell py-3">
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-2.5">
          <Link href="/#about" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
              AT
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-tight">Ayush Thakur</p>
              <p className="text-xs text-muted-foreground">Portfolio</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="animated-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hidden rounded-full border-border/80 bg-background px-4 text-sm font-medium sm:inline-flex"
              )}
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
