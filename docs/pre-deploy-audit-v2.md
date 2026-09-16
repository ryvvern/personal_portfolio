# Post-Fix Verification Audit

Date: 2026-09-16
Branch: `redesign` (41 commits ahead of `main`)
Baseline compared against: commit `5fd8a25` (`docs: add pre-deployment audit`)
Working tree at time of this audit: **dirty** — same uncommitted changes as before, plus more (see section 4/8).

---

## 1. BUILD

**`npm run build` still FAILS. Zero progress on this — this is the headline finding.**

```
▲ Next.js 16.1.6 (Turbopack)
✓ Compiled successfully in 1912.0ms
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

Identical error, identical location, to the previous audit. None of the work done since then touched `app/blog/page.tsx` or `components/section-heading.tsx` — confirmed by the diff in section 4. The site still cannot be deployed as a production build.

---

## 2. LINT AND TYPES

**TypeScript (`tsc --noEmit`): still 1 error**, unchanged:
```
app/blog/page.tsx(49,9): error TS2322: Type '{ eyebrow: string; title: string; description: string; }' is not assignable to type 'IntrinsicAttributes & SectionHeadingProps'.
  Property 'eyebrow' does not exist on type 'IntrinsicAttributes & SectionHeadingProps'.
```

**ESLint (`npm run lint`): still 1 error, 0 warnings**, unchanged:
```
components/about-section.tsx:95:7
error  Error: Calling setState synchronously within an effect can trigger cascading renders
react-hooks/set-state-in-effect
```
Same `Greeting` component, same line. Not touched since the last audit.

---

## 3. REGRESSION CHECK AGAINST THE PREVIOUS AUDIT

Checked each finding from `docs/pre-deploy-audit.md` against current state:

| # | Finding | Status |
|---|---|---|
| Build fails (TS error in `app/blog/page.tsx`) | **STILL PRESENT** — identical error, unfixed |
| ESLint error in `about-section.tsx:95` | **STILL PRESENT** — unfixed |
| Console: no errors on homepage/blog/blog post | **STILL CLEAN** — reconfirmed, see section 5 |
| Placeholder links: Northstar Commerce & MotionKit → `example.com` | **STILL PRESENT** — confirmed by direct grep of `lib/site-config.ts`, byte-for-byte identical URLs |
| Wrong GitHub username (`ayushthakur` instead of `ryvvern`) on those same 2 projects | **STILL PRESENT** — unchanged |
| Anchor targets all exist (`#about`, `#stack`, `#projects`, `#contact`) | **STILL TRUE** |
| Orphaned `/blog` routes (not in nav) | **STILL PRESENT** — `siteConfig.navigation` unchanged, no link to `/blog` added anywhere |
| Unused file `components/ui/separator.tsx` | **STILL UNUSED** — reconfirmed by repo-wide grep, zero importers |
| Unused dependencies | **STILL NONE** — no `package.json` changes since last audit, all previously-verified usages still hold |
| Responsive: no scrollbar/overflow at 375/768/1280/2560 | **STILL CLEAN** — reconfirmed at 375/768/1280 (see section 6); 2560 not re-checked this round, not in this task's required widths |
| Next.js dev-mode `<nextjs-portal>` badge clipping "Tailwind" badge at 375px | **CHANGED — now unobservable for a different reason**: the About section was restructured (full-bleed rules, hatched greeting band, new avatar/name layout) since the last audit, and the `aboutHighlights` badge row's position on the page has shifted enough that the dev overlay no longer visibly overlaps it in this pass. Still confirmed to be the dev-only overlay, not a site element, so this was never a real bug either way. |
| Light-mode contact-form field contrast (input bg = pure white, same as page) | **NOT RE-VERIFIED THIS ROUND** — `contact-form.tsx` and `globals.css`'s `--border`/`--input` tokens were not touched by any change since the last audit (confirmed by diff in section 4), so this finding almost certainly still holds, but it was outside this task's required check list (themes/contrast were not asked for in this audit) and I did not re-measure the exact computed colors to confirm. Flagging the gap rather than asserting a re-verified status. |
| Dark-mode hairline low contrast | **NOT RE-VERIFIED THIS ROUND** — same reasoning as above; `--border` token in `globals.css` is untouched by the diff, so almost certainly unchanged, but not re-measured. |
| Project-expander button accessible name concatenation (`"World Lore2026"`) | **NOT RE-VERIFIED THIS ROUND** — `projects-section.tsx` was not touched by any change since the last audit (absent from the diff in section 4), so this is almost certainly unchanged, but was outside this task's required check list and not re-measured. |
| `app/cover_photo.jpg` tracked but unreferenced (2.3 MB dead weight) | **CHANGED, WORSE** — see section 7. The file is still tracked and still on disk, but now there is a THIRD cover-image file (`app/NEW.png`) that is the one actually imported, meaning both `cover_photo.jpg` AND the previously-new `cover_photo2.png` are now dead weight simultaneously. |
| No Open Graph image (`og:image` absent) | **STILL PRESENT** — `app/layout.tsx`'s `openGraph` block has no `images` field; confirmed by direct read of the file. |

**Net result: zero of the previous audit's findings were fixed.** Every item is either unchanged, or (in the cover-image case) has gotten worse. The session's work since the last audit was entirely visual/UI work on the hero, header, and nav — none of it touched any of the previously flagged files (`app/blog/page.tsx`, `components/section-heading.tsx`, `components/contact-form.tsx`, `components/projects-section.tsx`, or the placeholder project links in `lib/site-config.ts`).

---

## 4. WHAT CHANGED SINCE THE LAST AUDIT

`git diff 5fd8a25` (this includes all uncommitted working-tree changes, since nothing has been committed since the audit commit):

| File | What changed |
|---|---|
| `app/favicon.ico` | **Deleted.** Replaced by a `metadata.icons.icon` pointing at a new `app/AT.png` import in `app/layout.tsx`. |
| `app/layout.tsx` | Added the `Homemade_Apple` Google Font (cursive/handwritten, for the "Good evening" greeting), added the `AT.png` favicon import + `metadata.icons` config, moved `overflow-x-hidden` from the inner content wrapper `<div>` up to `<body>` (required to make the header's `position: sticky` actually work — CSS forces `overflow-y: auto` on any element with `overflow-x: hidden` set directly, which silently breaks `sticky` for that element's descendants). |
| `components/about-section.tsx` | Cover image swapped from `cover_photo.jpg` → `NEW.png` (via an intermediate `cover_photo2.png` earlier in the session); avatar enlarged 116px→136px and repositioned; name changed from "Ayush Thakur" (proportional font) to `ayush_thakur` (monospace, snake_case); tagline demoted from `text-body` to `text-label`; a new horizontal rule inserted between name and tagline, extended to reach the page-frame's vertical hairline; the "Good evening" greeting moved out of a plain block into its own full-bleed hatched-band-bordered row and restyled in the new cursive font; the About-bullets copy was rewritten (3 bullets, opens "I am Ayush…", no longer mentions a QC-role transition); the section's own `overflow-x: hidden` was removed (now redundant, handled at `<body>` level per the `layout.tsx` change above). |
| `components/site-header.tsx` | Substantially rebuilt: the "Ayush Thakur" text link replaced with a `home.svg` icon (click-to-scroll-to-top when already on `/`); header made `sticky top-0` with an opaque background; the page-frame vertical hairlines re-implemented as an extra layer *inside* the header itself (needed because the opaque sticky background was otherwise painting over the site-wide vertical lines where they crossed the header row); desktop nav links resized/bolded; a mobile hamburger menu added (`lucide-react`'s `Menu`/`X`, toggling a dropdown with Home/About/Stack/Projects/Contact Me, positioned where the home icon sits on desktop); nav-link clicks now use a custom scroll handler that centers the target section vertically in the viewport instead of relying on native anchor-jump-to-top behavior, with a two-`requestAnimationFrame` delay so the mobile version measures against the post-menu-close layout rather than the still-open one. |
| `lib/site-config.ts` | Only the `aboutBullets` array content changed (see above). The flagged placeholder/wrong-username project links were **not** touched. |
| `styles/globals.css` | One line added: `--font-handwritten: var(--font-homemade-apple);` registers the new cursive font as a Tailwind `font-handwritten` utility. |
| `app/NEW.png` (new, untracked) | The cover photo actually in use now. |
| `app/cover_photo2.png` (new, untracked) | An intermediate cover-photo swap from earlier in the session; no longer referenced by any code — see section 7. |
| `app/home.svg` (new, untracked) | The header's home icon source. |

`app/blog/page.tsx`, `components/section-heading.tsx`, `components/contact-form.tsx`, `components/projects-section.tsx`, and `package.json` do **not** appear in this diff — none of the build-breaking, lint, contact-form, accessibility-naming, or dependency findings from the last audit had any chance of being affected by this round of work.

---

## 5. NEW CONSOLE ERRORS

Checked the homepage and a real blog post in a fresh headless Chrome session.

**No new console errors or warnings on either page**, and no hydration mismatches. All output was, again, dev-only noise:
- `[HMR] connected`, `[Fast Refresh] rebuilding` / `done in …ms`
- The standard React DevTools install banner

Same clean result as the previous audit.

---

## 6. NEW VISUAL REGRESSIONS

Screenshotted the full homepage at 375px, 768px, and 1280px, in both light and dark mode (6 combinations), at both the top of the page and scrolled to the vertical midpoint of the page (to specifically check the new sticky header's behavior mid-scroll, since that's the largest structural change this round).

**No horizontal scrollbar at any of the 6 combinations** (confirmed by `scrollWidth` vs `clientWidth` DOM measurement, not just visual read).

**No overlapping, clipped, misaligned, or broken-spacing content found in any of the 12 screenshots** (6 combinations × top + mid-scroll). Specifically checked, given what changed this round:
- The sticky header stays correctly pinned at `top: 0` during scroll at every width/theme, with its background opaque against scrolling content behind it.
- The page-frame vertical hairlines render continuously through the header row and into the page below, with no visible break or duplication, at 768px and 1280px (hidden below `md` as designed, so correctly absent at 375px).
- The mobile hamburger icon (375px) renders in the correct theme-following color (not hardcoded black) and sits where the home icon would be on desktop, with no crowding against the theme toggle.
- The new avatar (136px), `ayush_thakur` name, tagline, and the rule between them render with no gap or overlap in either theme at all three widths.
- The cursive "Good evening" greeting sits cleanly inside its own row between the hatched band above and the plain rule below, in the handwritten font, at every width/theme checked.
- Stack and Projects sections (visible in the mid-scroll captures) show no layout disruption from the header changes.

No new visual regressions found from this round's changes.

---

## 7. DEAD FILES CHECK

Checked directly against `git ls-files` and the filesystem — not assumed from the previous audit, since the previous audit's premise (that `cover_photo2.png` was the new/current cover image) is now itself stale:

- **`app/cover_photo.jpg`**: still **tracked in git** (`git ls-files` returns it), still present on disk (2,407,606 bytes). **Not gone.** It is also still **not referenced by any source file** — `components/about-section.tsx` imports neither `cover_photo.jpg` nor `cover_photo2.png` anymore.
- **`app/cover_photo2.png`**: **NOT tracked in git** (`git ls-files` returns nothing for it — it is an untracked working-tree file only). Present on disk (1,926,956 bytes). It was the cover image referenced by an earlier point in this session's work, but `components/about-section.tsx` has since moved on to importing `app/NEW.png` instead — so this file is now also dead weight, and additionally was never committed in the first place.
- **New finding, not covered by the task's two named files**: `app/NEW.png` (1,015,396 bytes) is the file actually imported and rendered as the cover photo right now, and it too is untracked. `app/home.svg` (673 bytes) is also untracked and is the live source for the header's home icon.

**Net: three sizeable untracked image-ish assets sit in the working tree (`NEW.png` ~1.0 MB, `cover_photo2.png` ~1.9 MB, plus the small `home.svg`), one stale tracked binary (`cover_photo.jpg`, 2.3 MB) with zero remaining references, and the file the site actually uses in production (`NEW.png`) has never been committed at all.** If a deploy were cut from a clean checkout of the current branch right now (i.e., without these uncommitted files), the site would fail to build for an additional reason beyond section 1: the import `@/app/NEW.png` in `components/about-section.tsx` would resolve to a missing file.

---

## 8. GIT STATE

- **Branch**: `redesign`
- **Ahead of `main`**: 41 commits (one more than the previous audit — the `docs: add pre-deployment audit` commit itself)
- **Working tree**: **not clean**:
  ```
   D app/favicon.ico
   M app/layout.tsx
   M components/about-section.tsx
   M components/site-header.tsx
   M lib/site-config.ts
   M styles/globals.css
  ?? app/NEW.png
  ?? app/cover_photo2.png
  ?? app/home.svg
  ```
  Same core set of pending changes as the last audit, plus `components/site-header.tsx` (modified) and `app/home.svg` (new, untracked) added on top.

- **Nothing new staged that shouldn't be**: `git status --short` shows no staged changes at all right now (everything listed above is unstaged working-tree state); no `.env*` files, no `.claude/` directory, appear anywhere in the status output. Confirmed by direct grep of the status output for `.env`/`.claude`.
- **Large binaries**: no *newly tracked* large binaries — `cover_photo.jpg` (2.3 MB) was already tracked before this round and remains so; nothing new has been added to git's index. The three untracked image files (`NEW.png`, `cover_photo2.png`, `home.svg`) are sitting in the working tree but are not yet part of any commit, so they carry no git-history weight yet — but see section 7 for the functional risk that matters more than the byte count.

---

## Summary — ordered by severity

1. **Production build still fails, zero change from the last audit** (sections 1–2) — the exact same `app/blog/page.tsx` TypeScript error blocks `next build`. Nothing done this round touched that file.
2. **The site's actual cover image (`app/NEW.png`) has never been committed to git** (sections 4/7) — a fresh clone or CI checkout of this branch would be missing the file that `components/about-section.tsx` imports, which would itself break the build independently of the pre-existing TypeScript error.
3. **Placeholder/wrong-owner project links, still present, untouched** (section 3) — Northstar Commerce and MotionKit still point at `example.com` and GitHub user `ayushthakur`.
4. **No Open Graph image, still present, untouched** (section 3).
5. **1 ESLint error, still present, untouched** (section 2).
6. **Growing dead-weight image pile**: one stale tracked binary (`cover_photo.jpg`) plus two untracked, unreferenced-or-about-to-be-unreferenced images (`cover_photo2.png` at 1.9 MB, on top of the still-tracked 2.3 MB `cover_photo.jpg`) — cleanup is getting more urgent, not less, each time the cover photo is swapped without removing the previous one (section 7).
7. **Orphaned `/blog` routes, still present, untouched** (section 3).
8. **Unused `components/ui/separator.tsx`, still present, untouched** (section 3).
9. Items not required by this audit's scope but flagged as **not re-verified** rather than assumed clean: light-mode contact-form field contrast, dark-mode hairline contrast, project-expander button accessible-name phrasing. All three live in files untouched by this round's diff, so they are very likely unchanged, but were outside this task's required checks and were not re-measured.

**No new regressions were introduced by this round of UI work** — console, responsive layout, and visual read all came back clean across every width/theme combination checked, and the new sticky-header/hamburger/scroll-centering behavior all functions correctly. The problem is that none of this round's work addressed any of the previous audit's actual blockers; the build is exactly as broken as it was, and one new build-blocking risk (the uncommitted `NEW.png` import) has been added on top.
