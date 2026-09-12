# Redesign Audit

Factual inventory of the codebase as of the current `redesign` branch. No recommendations, no quality commentary.

## 1. Framework and versions

Read from [package.json](../package.json):

- **Next.js**: `16.1.6`
- **Router**: App Router (`app/` directory with `layout.tsx`, `page.tsx`, `template.tsx`, nested route folders)
- **React**: `19.2.3` (react-dom `19.2.3`)
- **Tailwind CSS**: `^4` (major version 4), with `@tailwindcss/postcss": "^4"` as the PostCSS plugin
- **TypeScript**: used — `typescript: ^5` in devDependencies, `tsconfig.json` present, all source files are `.ts`/`.tsx`

Other notable dependencies present in `package.json`:
- `@base-ui/react ^1.3.0`
- `@fortawesome/fontawesome-svg-core ^7.2.0`, `@fortawesome/free-brands-svg-icons ^7.2.0`, `@fortawesome/react-fontawesome ^3.2.0`
- `@tailwindcss/typography ^0.5.19`
- `class-variance-authority ^0.7.1`
- `clsx ^2.1.1`
- `framer-motion ^12.36.0`
- `gray-matter ^4.0.3`
- `lucide-react ^0.577.0`
- `next-mdx-remote ^6.0.0`
- `next-themes ^0.4.6`
- `shadcn ^4.0.8`
- `simple-icons ^16.12.0`
- `tailwind-merge ^3.5.0`
- `tw-animate-css ^1.4.0`

## 2. File tree

Grouped by folder. Only files containing page markup, layout, or component code are listed.

### `app/`
- [app/layout.tsx](../app/layout.tsx) — root HTML layout; loads fonts (Manrope, IBM Plex Mono), sets metadata, wraps children in `ThemeProvider`, renders `SiteHeader` + `{children}` + `SiteFooter`
- [app/page.tsx](../app/page.tsx) — homepage; renders `AboutSection`, `StackSection`, `ProjectsSection`, `ContactSection` inside a `<main>`
- [app/template.tsx](../app/template.tsx) — client-side route transition wrapper using `framer-motion` (fade/slide-in on route change)
- [app/not-found.tsx](../app/not-found.tsx) — 404 page with a heading, message, and "Return home" button
- [app/robots.ts](../app/robots.ts) — generates `robots.txt` rules and sitemap URL
- [app/sitemap.ts](../app/sitemap.ts) — generates the sitemap, including all blog post URLs
- `app/AT.png` — profile portrait image (not markup/component, listed for completeness since it's imported by `about-section.tsx`)

### `app/blog/`
- [app/blog/page.tsx](../app/blog/page.tsx) — blog index page; lists all posts as cards (title, date, read time, tags, description) via `getAllPosts`
- [app/blog/[slug]/page.tsx](../app/blog/[slug]/page.tsx) — individual blog post page; renders post header (date, read time, title, description, tags) and MDX `content` body

### `components/`
- [components/about-section.tsx](../components/about-section.tsx) — homepage "About" hero section: name, tagline, bullet list, skill badges, CTA buttons, portrait image, "Core skills" panel
- [components/contact-form.tsx](../components/contact-form.tsx) — client component; name/email/message form that builds a `mailto:` link on submit
- [components/contact-section.tsx](../components/contact-section.tsx) — homepage "Contact" section: heading, email link, social links list, embeds `ContactForm`
- [components/mdx-components.tsx](../components/mdx-components.tsx) — custom MDX renderers for `a`, `blockquote`, `code`, `pre` tags used when compiling blog MDX
- [components/projects-section.tsx](../components/projects-section.tsx) — homepage "Projects" section: grid of project cards (image, year, category, title, description, tech badges, live/GitHub links)
- [components/reveal.tsx](../components/reveal.tsx) — client component; generic scroll-triggered fade/slide-in wrapper using `framer-motion`
- [components/section-heading.tsx](../components/section-heading.tsx) — reusable eyebrow/title/description heading block used by multiple sections
- [components/site-footer.tsx](../components/site-footer.tsx) — global footer: copyright line and social links
- [components/site-header.tsx](../components/site-header.tsx) — global fixed header: logo/name, nav links, contact button, theme toggle
- [components/stack-section.tsx](../components/stack-section.tsx) — homepage "Stack" section: grid of tool/tech icons (React, Cursor, Claude, ChatGPT, Figma, TypeScript, Git, JavaScript, Python, Next.js)
- [components/theme-provider.tsx](../components/theme-provider.tsx) — client component; wraps `next-themes`' `ThemeProvider`
- [components/theme-toggle.tsx](../components/theme-toggle.tsx) — client component; light/dark toggle button with an audio click effect and animated icon swap

### `components/ui/`
- [components/ui/badge.tsx](../components/ui/badge.tsx) — badge primitive built on `@base-ui/react` render/mergeProps with `cva` variants (default, secondary, destructive, outline, ghost, link)
- [components/ui/button.tsx](../components/ui/button.tsx) — button primitive wrapping `@base-ui/react/button` with variants/sizes from `lib/button-styles.ts`
- [components/ui/card.tsx](../components/ui/card.tsx) — plain `div`-based card primitives: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`
- [components/ui/input.tsx](../components/ui/input.tsx) — text input wrapping `@base-ui/react/input`
- [components/ui/separator.tsx](../components/ui/separator.tsx) — separator wrapping `@base-ui/react/separator`
- [components/ui/textarea.tsx](../components/ui/textarea.tsx) — plain `textarea` element with styling

### `lib/`
- [lib/blog.ts](../lib/blog.ts) — reads and compiles MDX files from `content/blog/`, exposes `getAllPosts`, `getPostBySlug`, `formatDate`
- [lib/button-styles.ts](../lib/button-styles.ts) — `cva` variant definitions (`buttonVariants`) shared by `Button` and plain `<Link>`-as-button usages
- [lib/site-config.ts](../lib/site-config.ts) — static site content/config object: name, description, nav items, about highlights, primary skills, stack list, projects array, socials array, email
- [lib/utils.ts](../lib/utils.ts) — `cn()` helper combining `clsx` + `tailwind-merge`

### `content/blog/` (data, not components)
- [content/blog/building-motion-systems-for-the-web.mdx](../content/blog/building-motion-systems-for-the-web.mdx)
- [content/blog/designing-interfaces-with-intent.mdx](../content/blog/designing-interfaces-with-intent.mdx)

## 3. Styling setup

- **Global CSS file**: [styles/globals.css](../styles/globals.css) — imported in `app/layout.tsx` via `import "@/styles/globals.css";`
- **Tailwind config file**: not present. There is no `tailwind.config.ts` or `tailwind.config.js` in the repo. Tailwind v4 is configured CSS-first inside `styles/globals.css`.
- **Discrepancy note**: [components.json](../components.json) declares `"tailwind": { "css": "app/globals.css", ... }`, but no `app/globals.css` file exists in the repo — the actual global stylesheet is at `styles/globals.css`.
- **Tailwind v4 CSS-first `@theme` block**: yes, used. `styles/globals.css` contains an `@theme inline { ... }` block (lines 8–35) mapping custom properties to Tailwind theme tokens (colors, radii, fonts).

### CSS custom properties defined in `styles/globals.css`

`@theme inline` block (token mappings, not raw values):
```
--color-background: var(--background)
--color-foreground: var(--foreground)
--color-card: var(--card)
--color-card-foreground: var(--card-foreground)
--color-popover: var(--popover)
--color-popover-foreground: var(--popover-foreground)
--color-primary: var(--primary)
--color-primary-foreground: var(--primary-foreground)
--color-secondary: var(--secondary)
--color-secondary-foreground: var(--secondary-foreground)
--color-muted: var(--muted)
--color-muted-foreground: var(--muted-foreground)
--color-accent: var(--accent)
--color-accent-foreground: var(--accent-foreground)
--color-destructive: var(--destructive)
--color-border: var(--border)
--color-input: var(--input)
--color-ring: var(--ring)
--radius-sm: calc(var(--radius) * 0.75)
--radius-md: calc(var(--radius) * 0.9)
--radius-lg: var(--radius)
--radius-xl: calc(var(--radius) * 1.35)
--radius-2xl: calc(var(--radius) * 1.7)
--font-sans: var(--font-manrope)
--font-mono: var(--font-ibm-plex-mono)
--font-display: var(--font-manrope)
```

`:root` (light theme) values:
```
--background: oklch(0.975 0.0015 106)
--foreground: oklch(0.235 0.004 260)
--card: oklch(0.995 0.001 106)
--card-foreground: oklch(0.235 0.004 260)
--popover: oklch(0.998 0 0)
--popover-foreground: oklch(0.235 0.004 260)
--primary: oklch(0.34 0.01 260)
--primary-foreground: oklch(0.985 0.001 106)
--secondary: oklch(0.958 0.001 106)
--secondary-foreground: oklch(0.26 0.004 260)
--muted: oklch(0.952 0.001 106)
--muted-foreground: oklch(0.52 0.006 260)
--accent: oklch(0.948 0.001 106)
--accent-foreground: oklch(0.26 0.004 260)
--destructive: oklch(0.62 0.23 27.2)
--border: oklch(0.88 0.001 106)
--input: oklch(0.93 0.001 106)
--ring: oklch(0.38 0.01 260 / 0.16)
--radius: 0.9rem
```

`.dark` (dark theme) values:
```
--background: oklch(0.145 0.003 260)
--foreground: oklch(0.915 0.002 106)
--card: oklch(0.18 0.003 260)
--card-foreground: oklch(0.915 0.002 106)
--popover: oklch(0.18 0.003 260)
--popover-foreground: oklch(0.915 0.002 106)
--primary: oklch(0.9 0.002 106)
--primary-foreground: oklch(0.16 0.003 260)
--secondary: oklch(0.215 0.003 260)
--secondary-foreground: oklch(0.915 0.002 106)
--muted: oklch(0.22 0.003 260)
--muted-foreground: oklch(0.64 0.003 106)
--accent: oklch(0.23 0.003 260)
--accent-foreground: oklch(0.915 0.002 106)
--destructive: oklch(0.66 0.22 27.2)
--border: oklch(1 0 0 / 0.08)
--input: oklch(1 0 0 / 0.06)
--ring: oklch(1 0 0 / 0.12)
```

Note: `.dark` does not redefine `--radius`; it inherits the `:root` value.

### Other CSS imports/declarations in `styles/globals.css`
- `@import "tailwindcss";`
- `@plugin "@tailwindcss/typography";`
- `@import "tw-animate-css";`
- `@import "shadcn/tailwind.css";`
- `@custom-variant dark (&:is(.dark *));`
- `@layer base` — border/outline defaults, `html` scroll-smooth, `body` background/font/text, `::selection` color, `h1–h4` font-display
- `@layer components` — custom utility classes: `.container-shell`, `.section-space`, `.glass-panel`, `.animated-underline` (+ `::after`, `:hover`/`:focus-visible` states), `.text-balance`
- `@layer utilities` — `.prose` (typography plugin prose customizations)

## 4. Section inventory (homepage)

Homepage composition is defined in [app/page.tsx](../app/page.tsx).

| Section | Component file | Data file(s) read |
|---|---|---|
| Header/nav | [components/site-header.tsx](../components/site-header.tsx) | [lib/site-config.ts](../lib/site-config.ts) (`navigation`) |
| Hero/About | [components/about-section.tsx](../components/about-section.tsx) | [lib/site-config.ts](../lib/site-config.ts) (`aboutHighlights`, `primarySkills`); image `app/AT.png` |
| Stack | [components/stack-section.tsx](../components/stack-section.tsx) | [lib/site-config.ts](../lib/site-config.ts) (`stack`) |
| Projects | [components/projects-section.tsx](../components/projects-section.tsx) | [lib/site-config.ts](../lib/site-config.ts) (`projects`) |
| Contact | [components/contact-section.tsx](../components/contact-section.tsx) | [lib/site-config.ts](../lib/site-config.ts) (`email`, `socials`) |
| Footer | [components/site-footer.tsx](../components/site-footer.tsx) | [lib/site-config.ts](../lib/site-config.ts) (`socials`) |

Note: there is no separate "About" and "Hero" split — `AboutSection` serves as the hero/about combined section. There is no dedicated "header/nav" data file beyond `site-config.ts`.

## 5. Existing UI/animation/icon dependencies actually imported in source

| Library | Import path(s) used | Found in |
|---|---|---|
| `framer-motion` | `"framer-motion"` (named import `motion`) | [app/template.tsx](../app/template.tsx), [components/reveal.tsx](../components/reveal.tsx), [components/theme-toggle.tsx](../components/theme-toggle.tsx) |
| `lucide-react` | `"lucide-react"` (named imports: `ArrowRight`, `ArrowUpRight`, `Github`, `Linkedin`, `Twitter`, `MoonStar`, `SunMedium`) | [components/about-section.tsx](../components/about-section.tsx), [components/projects-section.tsx](../components/projects-section.tsx), [components/contact-section.tsx](../components/contact-section.tsx), [components/contact-form.tsx](../components/contact-form.tsx), [components/theme-toggle.tsx](../components/theme-toggle.tsx) |
| `next-themes` | `"next-themes"` (named imports: `ThemeProvider`, `useTheme`) | [components/theme-provider.tsx](../components/theme-provider.tsx), [components/theme-toggle.tsx](../components/theme-toggle.tsx) |
| `@fortawesome/free-brands-svg-icons` | `"@fortawesome/free-brands-svg-icons"` (`faOpenai`) | [components/stack-section.tsx](../components/stack-section.tsx) |
| `@fortawesome/fontawesome-svg-core` | `"@fortawesome/fontawesome-svg-core"` (type `IconDefinition`) | [components/stack-section.tsx](../components/stack-section.tsx) |
| `@fortawesome/react-fontawesome` | `"@fortawesome/react-fontawesome"` (`FontAwesomeIcon`) | [components/stack-section.tsx](../components/stack-section.tsx) |
| `simple-icons` | `"simple-icons"` (named imports: `siClaude`, `siCursor`, `siFigma`, `siGit`, `siJavascript`, `siNextdotjs`, `siPython`, `siReact`, `siTypescript`) | [components/stack-section.tsx](../components/stack-section.tsx) |
| `@base-ui/react` | `"@base-ui/react/button"`, `"@base-ui/react/input"`, `"@base-ui/react/separator"`, `"@base-ui/react/merge-props"`, `"@base-ui/react/use-render"` | [components/ui/button.tsx](../components/ui/button.tsx), [components/ui/input.tsx](../components/ui/input.tsx), [components/ui/separator.tsx](../components/ui/separator.tsx), [components/ui/badge.tsx](../components/ui/badge.tsx) |
| `class-variance-authority` | `"class-variance-authority"` (`cva`, `VariantProps`) | [components/ui/badge.tsx](../components/ui/badge.tsx), [components/ui/button.tsx](../components/ui/button.tsx), [lib/button-styles.ts](../lib/button-styles.ts) |
| `clsx` | `"clsx"` (`clsx`, `ClassValue`) | [lib/utils.ts](../lib/utils.ts) |
| `tailwind-merge` | `"tailwind-merge"` (`twMerge`) | [lib/utils.ts](../lib/utils.ts) |
| `gray-matter` | `"gray-matter"` (`matter`) | [lib/blog.ts](../lib/blog.ts) |
| `next-mdx-remote/rsc` | `"next-mdx-remote/rsc"` (`compileMDX`) | [lib/blog.ts](../lib/blog.ts) |

Not found imported anywhere in source: `@tailwindcss/typography` (referenced only via CSS `@plugin` directive, not a JS/TS import), `tw-animate-css` (CSS `@import` only), `shadcn` package (CSS `@import` only, referenced as a CLI/CSS source, not imported in `.ts`/`.tsx`).

## 6. Current spacing and type utility usage

Scanned all `.ts`/`.tsx` files under `app/`, `components/`, and `lib/`.

### Spacing utilities (padding/margin/gap/space-y, static values only — arbitrary-bracket spacing values not present)

| Utility | Count |
|---|---|
| px-4 | 10 |
| gap-3 | 10 |
| px-5 | 7 |
| gap-2 | 7 |
| py-1 | 6 |
| px-2.5 | 6 |
| px-3 | 5 |
| py-3 | 4 |
| gap-4 | 4 |
| gap-1 | 4 |
| py-4 | 3 |
| px-6 | 3 |
| pt-32 | 3 |
| pr-1.5 | 3 |
| pl-1.5 | 3 |
| gap-8 | 3 |
| space-y-6 | 2 |
| space-y-4 | 2 |
| space-y-3 | 2 |
| py-6 | 2 |
| py-5 | 2 |
| py-0 | 2 |
| px-2 | 2 |
| pt-8 | 2 |
| pt-6 | 2 |
| pl-5 | 2 |
| pb-6 | 2 |
| pb-4 | 2 |
| pb-0 | 2 |
| p-6 | 2 |
| p-5 | 2 |
| p-3 | 2 |
| mt-8 | 2 |
| mt-4 | 2 |
| mt-12 | 2 |
| mt-10 | 2 |
| gap-6 | 2 |
| gap-5 | 2 |
| gap-1.5 | 2 |
| space-y-5 | 1 |
| space-y-1 | 1 |
| space-y-0.5 | 1 |
| py-3.5 | 1 |
| py-2.5 | 1 |
| py-2 | 1 |
| py-0.5 | 1 |
| px-7 | 1 |
| px-1.5 | 1 |
| pt-28 | 1 |
| pt-24 | 1 |
| pt-2 | 1 |
| pt-0 | 1 |
| pr-3 | 1 |
| pr-2 | 1 |
| pl-3 | 1 |
| pl-2 | 1 |
| pb-8 | 1 |
| pb-5 | 1 |
| pb-3 | 1 |
| pb-20 | 1 |
| pb-16 | 1 |
| pb-12 | 1 |
| pb-10 | 1 |
| p-8 | 1 |
| p-4 | 1 |
| mx-0 | 1 |
| mt-2 | 1 |
| gap-y-7 | 1 |
| gap-x-6 | 1 |
| gap-2.5 | 1 |
| gap-10 | 1 |

### Text size utilities

Static Tailwind scale:

| Utility | Count |
|---|---|
| text-sm | 24 |
| text-xs | 7 |
| text-base | 5 |
| text-4xl | 4 |
| text-xl | 3 |
| text-lg | 3 |
| text-6xl | 2 |
| text-2xl | 2 |
| text-5xl | 1 |
| text-3xl | 1 |

Arbitrary-value text sizes (bracket syntax):

| Utility | Count |
|---|---|
| text-[11px] | 7 |
| text-[0.95rem] | 2 |
| text-[3.6rem] | 1 |
| text-[1.02rem] | 1 |
| text-[0.9em] | 1 |
| text-[0.96rem] | 1 |
| text-[0.8rem] | 1 |
| text-[0.88rem] | 1 |
