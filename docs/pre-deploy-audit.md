# Pre-Deployment Audit

Date: 2026-09-13
Branch: `redesign` (40 commits ahead of `main`)
Working tree at time of audit: **dirty** — see section 10.

---

## 1. BUILD

**`npm run build` FAILS.** This is the headline finding — the site cannot currently be deployed as a production build.

```
▲ Next.js 16.1.6 (Turbopack)
✓ Compiled successfully in 1657.8ms
  Running TypeScript ...
Failed to compile.

./app/blog/page.tsx:49:9
Type error: Type '{ eyebrow: string; title: string; description: string; }' is not assignable to type 'IntrinsicAttributes & SectionHeadingProps'.
  Property 'eyebrow' does not exist on type 'IntrinsicAttributes & SectionHeadingProps'.

   47 |     <main className="container-shell section-space pt-32">
   48 |       <SectionHeading
>  49 |         eyebrow="Writing"
      |         ^
   50 |         title="Field notes on building interfaces that feel intentional."
   51 |         description="Short essays on motion systems, frontend architecture, and the small details that make software feel crafted."
   52 |       />
Next.js build worker exited with code: 1 and signal: null
```

`components/section-heading.tsx` only accepts `{ title, count? }`. `app/blog/page.tsx` calls it with `eyebrow` and `description` props that don't exist on the type. This is the only build error; no other files were reached because the build worker exited on this one.

No build warnings were observed before the failure (compile step succeeded; only the TypeScript pass failed).

---

## 2. LINT AND TYPES

**TypeScript (`tsc --noEmit`): 1 error.**
Same error as the build, verbatim:
```
app/blog/page.tsx(49,9): error TS2322: Type '{ eyebrow: string; title: string; description: string; }' is not assignable to type 'IntrinsicAttributes & SectionHeadingProps'.
  Property 'eyebrow' does not exist on type 'IntrinsicAttributes & SectionHeadingProps'.
```

**ESLint (`npm run lint`): 1 error, 0 warnings.**
```
/Users/ayushthakur/Documents/Projects/PortfolioWeb/components/about-section.tsx
  95:7  error  Error: Calling setState synchronously within an effect can trigger cascading renders
  ...
  react-hooks/set-state-in-effect
```
Location: `components/about-section.tsx:95` — the `Greeting` component's `useEffect` calls `setGreeting(...)` directly in the effect body (used to compute the time-of-day greeting once on mount). Flagged by the `react-hooks/set-state-in-effect` rule. Functionally harmless here (single conditional set, once, on mount) but is a real lint error, not a warning — it will fail a strict CI lint gate.

---

## 3. CONSOLE

Checked in a fresh headless Chrome session (not the same as production — Turbopack dev mode) on:
- Homepage (`/`)
- Blog index (`/blog`)
- A real blog post (`/blog/designing-interfaces-with-intent`)

**No application errors or warnings on any of the three pages.** All console output was:
- `[HMR] connected` / `[Fast Refresh] rebuilding` / `[Fast Refresh] done in …ms` — classified as **dev-server HMR noise**, ignored per instructions.
- The standard React DevTools install suggestion (`Download the React DevTools…`) — classified as **dev-only Next.js/React info banner**, ignored per instructions.

No hydration mismatch warnings were observed on any of the three pages. Note: the blog pages render fine in **dev mode** despite the TypeScript error in section 1 — dev mode does not type-check the same way `next build` does, so this masks a build-breaking error that would only surface in CI/production builds.

---

## 4. DEAD AND PLACEHOLDER LINKS

Every outbound `href` in the site, traced from `lib/site-config.ts`, `components/contact-section.tsx`, `components/contact-form.tsx`, and `components/site-header.tsx`:

| Source | Label | Destination | Flag |
|---|---|---|---|
| Header nav | About | `/#about` | OK — target exists |
| Header nav | Stack | `/#stack` | OK — target exists |
| Header nav | Projects | `/#projects` | OK — target exists |
| Header nav | Contact Me | `/#contact` | OK — target exists |
| About detail grid | github.com/ryvvern | `https://github.com/ryvvern` | OK |
| About detail grid | (mail icon) | `mailto:ayushth199@gmail.com` | OK |
| About socials | GitHub | `https://github.com/ryvvern` | OK |
| About socials | LinkedIn | `https://www.linkedin.com/in/ayush--thakur` | OK |
| About socials | Twitter | `https://x.com/ryvvern_x` | OK |
| Hero CTA | View Projects | `#projects` | OK — target exists |
| Hero CTA | Contact Me | `#contact` | OK — target exists |
| Projects — World Lore | Live site | `https://project-worldlore.vercel.app` | OK, real domain |
| Projects — World Lore | GitHub | `https://github.com/ryvvern/project_worldlore` | OK — correct username |
| **Projects — Northstar Commerce** | **Live site** | **`https://example.com/northstar-commerce`** | **🚩 placeholder domain** |
| **Projects — Northstar Commerce** | **GitHub** | **`https://github.com/ayushthakur/northstar-commerce`** | **🚩 wrong GitHub username** (site's real one is `ryvvern`) |
| **Projects — MotionKit** | **Live site** | **`https://example.com/motion-kit`** | **🚩 placeholder domain** |
| **Projects — MotionKit** | **GitHub** | **`https://github.com/ayushthakur/motion-kit`** | **🚩 wrong GitHub username** |
| Contact section | email text | `mailto:ayushth199@gmail.com` | OK |
| Contact section socials | GitHub / LinkedIn / Twitter | same three URLs as About | OK |
| Contact form | Send message | builds `mailto:` on submit (see section 11) | OK |

**4 flagged links**, both non-World-Lore projects: 2 point to `example.com` and 2 point to GitHub user `ayushthakur` rather than the real `ryvvern` account used everywhere else on the site.

**Anchor targets**: all four (`#about`, `#stack`, `#projects`, `#contact`) exist as real `id` attributes on their respective `<section>` elements — confirmed by direct grep, no dead anchor links.

**Orphaned route**: `/blog` and `/blog/[slug]` exist, are included in `app/sitemap.ts`, but are **not linked from `siteConfig.navigation`** or anywhere else in the UI — a visitor cannot reach them by clicking anything on the site, only by knowing the URL or via search-engine discovery through the sitemap.

---

## 5. UNUSED CODE

**Unused files** (verified by grepping the rest of the codebase for each filename/import path before listing):
- `components/ui/separator.tsx` — exports `Separator`, but nothing in `app/`, `components/`, or `lib/` imports it. Confirmed via full-repo grep for `separator`/`Separator`; the only hits are inside the file's own definition.

No other files under `app/`, `components/`, or `lib/` came back with zero references. (Next.js convention files — `layout.tsx`, `template.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `page.tsx` files — are used by the framework via file-based routing even though nothing explicitly imports them; excluded from this list as instructed.)

**Unused dependencies**: none found. Checked every entry in `package.json` (`dependencies` + `devDependencies`) against actual source usage:
- All `@fortawesome/*` packages and `simple-icons` → used together in `components/stack-section.tsx`.
- `framer-motion` → used in `components/theme-toggle.tsx`.
- `shadcn` → not imported in any `.tsx`/`.ts` file, but **is** used via `@import "shadcn/tailwind.css";` in `styles/globals.css` — real usage, just not a JS import.
- Every remaining package (`@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `next-themes`, `next-mdx-remote`, `gray-matter`, `lucide-react`, `tw-animate-css`, `@tailwindcss/typography`, `@tailwindcss/postcss`, `tailwindcss`, `typescript`, `eslint*`, `@types/*`) traced to at least one real import or config reference.

---

## 6. RESPONSIVE

Checked at 375px, 768px, 1280px, and 2560px on the homepage (dev server, both themes).

**No horizontal scrollbar, no element wider than the viewport, and no overlapping content at any of the four widths.** Confirmed both by DOM measurement (`scrollWidth` vs `clientWidth`, plus a scan for any element wider than the viewport) and visual screenshot review at each width.

One visual observation at **375px only**: the floating Next.js dev-mode indicator badge (the black circular icon in the bottom-left corner, tag name `<nextjs-portal>`) sits on top of part of the "Tailwind" skill badge in the About section's tag row, visually clipping it to read "…lwind". **This is confirmed to be the Next.js development-mode overlay, not a site element** — it does not exist in production builds and will not appear for real visitors. Flagging for completeness since it was visible during the check, but it is not a real responsive-design bug.

No other width showed any issue.

---

## 7. THEMES

Checked light and dark mode across the full homepage (About, Stack, Projects, Contact, footer).

**Light mode — contact form field contrast.** The `Input` and `Textarea` fields in the Contact section render with a background color computed as `lab(100 0 0)` (pure white) — **identical** to the page's own `body` background (also `lab(100 0 0)`). The only thing distinguishing a field from the page is a 1px border (`lab(86.09 -0.097 0.365)`, a light gray). There is no fill contrast at all between the input and the page in light mode; a visitor with any contrast sensitivity, or under glare, may not perceive the fields as distinct input boxes. This matches the specific concern named in the task.

**Dark mode — hairline rule contrast.** The `--border` token in dark mode is `oklch(1 0 0 / 0.08)` — pure white at 8% opacity — over a background of `oklch(0.145 0.003 260)` (near-black). This computes to a very low-contrast line (rough estimate under 1.2:1 relative to the background). Visually, the divider rules between sections and inside the detail grid are noticeably fainter in dark mode than their light-mode counterparts. This appears to be an intentional "hairline" aesthetic choice rather than an oversight, but it is genuinely very low contrast and worth a deliberate decision either way before shipping.

No other invisible-content or contrast issues were found in either theme across the sections checked.

---

## 8. ACCESSIBILITY

Tabbed through the page (via simulated keyboard `Tab` key events, not mouse) and inspected the full interactive element set programmatically.

**Focus reachability**: all 26 interactive elements on the homepage (nav links, theme toggle, social links, hero CTAs, project-expander buttons, project live/GitHub links, contact socials, form fields, submit button) have `tabIndex: 0` and are in the natural tab order — none are unreachable by keyboard.

**Focus ring**: confirmed visible. Tabbing to the "Stack" nav link produced a real rendered outline (`2px solid`, ~63% opacity foreground-tinted color) — verified both via computed style and a screenshot showing a visible rectangular ring around the focused link. The global `:focus-visible` rule in `globals.css` is working as intended.

**Accessible names**: every interactive element returned a non-empty accessible name (via `aria-label`, visible text content, or `placeholder` fallback for inputs). No unlabeled controls were found.

**One naming quality issue (not a hard failure)**: the three project-expander buttons in the Projects section have their accessible name built by concatenating the title and year with no separating text — e.g. `"World Lore2026"`, `"Northstar Commerce2025"`, `"MotionKit2025"`. This is because the button's accessible name is computed from its full text content (title + year, which are visually on separate lines with no punctuation between them). A screen reader will read this as one run-on token. Not unreachable or unlabeled, but reads poorly.

**Images**: only one `<img>` on the homepage (the profile cover photo), and it has `alt=""` — an explicit empty alt, which is the *correct* pattern for a purely decorative image, not a missing-alt bug. No other images found on the homepage. Did not check blog post MDX content for images.

**Heading levels**: `h1 → h2 → h2 → h2 → h2` (`ayush_thakur` → `Good evening` → `Stack` → `Projects` → `Contact`). No skipped levels.

---

## 9. METADATA

Current values (from `app/layout.tsx`'s `metadata` export, read live from the rendered `<head>`):

- **Title**: `Ayush Thakur — Software Developer & Design Engineer`
- **Meta description**: `A minimal personal portfolio for Ayush Thakur with a clean developer-focused design system.`
- **Canonical URL**: `https://ayushthakur.dev/`
- **OG title**: same as page title
- **OG description**: same as meta description
- **OG URL**: `https://ayushthakur.dev`
- **OG site name**: same as page title
- **OG type**: `website`
- **Twitter card**: `summary_large_image`
- **Twitter title**: same as page title

The domain `ayushthakur.dev` was checked directly (`curl` HTTP status) and **resolves live with a 200 response** — this is a real, working domain, not a placeholder.

**🚩 No Open Graph image exists.** `og:image` is not present in the rendered `<head>` at all (`null`). This is inconsistent with `twitter:card` being set to `summary_large_image`, which is specifically the card type that expects a large preview image — without one, link previews on social platforms (Twitter/X, LinkedIn, Slack, iMessage, etc.) will show no image, undermining the point of choosing that card type.

Nothing in the metadata references the old design or a wrong domain.

---

## 10. GIT

- **Branch**: `redesign`
- **Ahead of `main`**: 40 commits
- **Working tree**: **not clean** at the time of this audit:
  ```
   D app/favicon.ico
   M app/layout.tsx
   M components/about-section.tsx
   M lib/site-config.ts
   M styles/globals.css
  ?? app/cover_photo2.png
  ```
  This audit reflects that in-progress state, not a clean snapshot. If a deploy were cut right now, these uncommitted changes would not be included unless committed first.

- **`.gitignore`**: correctly excludes `.env*`, `.claude/`, `*.pem`, and standard build/dependency directories. No `.env` files or `.claude/` directory are tracked in git — confirmed via `git ls-files`.
- **No obvious secrets or credentials** found in tracked files (searched tracked filenames for `.env`, `.claude/`, `secret`, `credential` — no hits).
- **Large tracked binary**: `app/cover_photo.jpg` (2.3 MB) is tracked in git, but **is no longer referenced anywhere in the source** (`components/about-section.tsx` now imports `cover_photo2.png` instead — confirmed by grep, zero remaining references to `cover_photo.jpg`). If left as-is, this is 2.3 MB of dead weight permanently baked into repo history. The new `app/cover_photo2.png` (1.9 MB, currently untracked) will add further repo size once committed — combined, the two cover images alone are ~4.2 MB.

---

## 11. CONTACT FORM

**Mailto construction — correct.** `components/contact-form.tsx`'s `handleSubmit` builds:
```
mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}
```
`siteConfig.email` is `ayushth199@gmail.com` — the right recipient — and both `subject` and `body` are URL-encoded before being placed in the mailto string, so special characters in the name/email/message fields won't break the link.

**Empty-field submission — blocked correctly, verified directly in-browser.** All three fields (`name`, `email`, `message`) carry the HTML5 `required` attribute. Programmatically clicking the submit button with all fields empty triggers native browser validation before React's `onSubmit` handler logic can run any further: `form.checkValidity()` returns `false`, and the first invalid field reported is "Your name". The `mailto:` redirect and `window.location.href` assignment inside `handleSubmit` never execute in this case — confirmed there is no unwanted mail-client launch or blank-field email on empty submission.

---

## Summary — ordered by severity

1. **Production build fails** (section 1/2) — a real TypeScScript type error in `app/blog/page.tsx` blocks `next build` entirely. This alone prevents deployment as-is.
2. **Placeholder/wrong-owner project links** (section 4) — Northstar Commerce and MotionKit both link to `example.com` and to GitHub user `ayushthakur` instead of the real `ryvvern` account visible everywhere else on the site.
3. **No Open Graph image** (section 9) — social link previews will render with no image despite `twitter:card` being configured for one.
4. **Light-mode contact-form field contrast** (section 7) — input fields are visually indistinguishable from the page background except for a thin border.
5. **1 ESLint error** (section 2) in the greeting effect — not currently breaking anything but will fail a strict lint gate.
6. **Orphaned `/blog` routes** (section 4) — built, sitemapped, but unreachable from the site's own navigation.
7. **Dead code**: `components/ui/separator.tsx` (section 5) and the untracked-vs-tracked cover image situation (section 10) — no functional impact, just cleanup opportunities.
8. **Dark-mode hairline contrast** (section 7) and **project-button accessible-name phrasing** (section 8) — minor polish items, likely intentional design choices that are worth a deliberate yes/no rather than being silently shipped.

Everything else checked (console errors, anchor targets, unused dependencies, tab-order/focus rings/accessible names generally, responsive layout at all four widths, heading structure, contact-form mailto correctness) came back clean.
