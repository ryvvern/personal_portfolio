import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", ...props }) => {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          {...props}
        />
      );
    }

    return (
      <Link
        href={href}
        className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
        {...props}
      />
    );
  },
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-primary/35 pl-5 text-foreground/90"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-md bg-muted px-1.5 py-1 font-mono text-[0.9em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="overflow-x-auto rounded-2xl border border-border/60 bg-card px-4 py-4"
      {...props}
    />
  ),
};
