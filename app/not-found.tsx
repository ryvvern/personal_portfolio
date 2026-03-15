import Link from "next/link";

import { buttonVariants } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-32">
      <p className="font-mono text-sm uppercase tracking-[0.28em] text-muted-foreground">
        404 / Not Found
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-balance md:text-6xl">
        This page drifted out of the interface.
      </h1>
      <p className="max-w-xl text-lg leading-8 text-muted-foreground">
        The route you tried to open does not exist. Head back to the portfolio
        and we&apos;ll get you somewhere useful.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "rounded-full px-6 text-sm font-semibold"
        )}
      >
        Return home
      </Link>
    </main>
  );
}
