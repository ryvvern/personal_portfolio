# Design Tokens

This file is the reference every later step will be checked against.

## Type scale

Exactly five sizes, use the token utilities only:

| Utility | Size | Usage |
|---|---|---|
| `text-display` | 30px | the name in the hero, and nothing else on the site |
| `text-heading` | 16px | section headings |
| `text-body` | 14px | body copy, default |
| `text-secondary` | 13px | supporting text, descriptions |
| `text-label` | 12px | labels, metadata, eyebrows |

Banned: every `text-xs` / `text-sm` / `text-base` / `text-lg` / `text-xl` / `text-2xl` / `text-3xl` / `text-4xl` / `text-5xl` / `text-6xl` utility, and every arbitrary bracket text size such as `text-[0.95rem]`.

## Font weights

Only 400, 500, 600. Banned: `font-bold`, `font-extrabold`, `font-black`, `font-light`, `font-thin`.

## Spacing

Only these Tailwind steps: 1, 2, 3, 4, 6, 8, 12, 16 (4px 8px 12px 16px 24px 32px 48px 64px).

Banned: every half step (`p-2.5`, `gap-1.5`, `py-3.5`, etc), every arbitrary bracket spacing value, and every step not in the list above (5, 7, 10, 20, 24, 28, 32...).

## Section vertical padding

`py-section` (48px) on mobile, `py-section-lg` (64px) from the `md` breakpoint up. Every section, no exceptions.

## Container

Max-width `var(--container-content)` (640px), centred, with 24px horizontal padding.

## Colour

The existing neutral oklch ramp only, via the semantic tokens (`foreground`, `muted-foreground`, `border`, `background`). One accent, budgeted to a maximum of three uses on a page.
