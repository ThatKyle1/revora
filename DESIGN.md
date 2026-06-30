---
name: Revora
description: AI-powered listing generator for clothing resellers — fast copy, clear profit.
colors:
  action: "#000000"
  ink: "#111827"
  ink-muted: "#374151"
  surface: "#ffffff"
  surface-dim: "#f9fafb"
  surface-subtle: "#f3f4f6"
  border: "#e5e7eb"
  text-secondary: "#6b7280"
  text-muted: "#9ca3af"
  profit: "#059669"
  profit-surface: "#ecfdf5"
typography:
  display:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
rounded:
  control: "8px"
  card: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  "2xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "#1f2937"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "20px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  badge-profit:
    backgroundColor: "{colors.profit-surface}"
    textColor: "{colors.profit}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
---

# Design System: Revora

## 1. Overview

**Creative North Star: "The Fast Flip"**

Revora is built for resellers who think in profit margins, not design philosophies. The visual system reflects that: near-black on white, one accent color reserved for profit, and Geist Sans throughout. Nothing decorates what doesn't need decorating. Every element earns its place or it's gone.

The palette is stark by choice. When every surface is monochrome, the profit signal — emerald — carries all the weight. It appears exactly once per listing card. A user scanning their dashboard sees profit; everything else recedes. The scarcity of color is the design.

Confidence comes from restraint, not ornamentation. Rounded-2xl containers (16px) feel grounded without being bubbly. Controls sit at rounded-lg (8px) for functional cohesion. Flat by default; a whisper of hover shadow is the only elevation signal. Nothing competes with the task at hand: get in, create the listing, move on.

**Key Characteristics:**
- Near-black action color on pure white canvas — maximum contrast, no ambiguity
- Emerald profit signal as the only accent, appearing once per item
- Geist Sans throughout — geometric, contemporary, optimized for screen legibility
- 16px card radius (confident) / 8px control radius (functional) — two tiers, no deviations
- Flat-by-default elevation; hover shadow is a state signal, not decoration
- Anti-ceremony: no eyebrow labels, no icon-card grids, no lifestyle softness

## 2. Colors: The Monochrome-Plus-One Palette

A true monochrome foundation with a single earned accent. If a color isn't black, white, gray, or profit-green, it doesn't belong.

### Primary
- **Revora Black** (#000000 / `action`): The primary action color. Button backgrounds. Wherever the user needs to go or act.

### Secondary
- **Profit Green** (#059669 / `profit`): The only accent in the system. Appears exclusively on profit figures and the "Generated" chip. Its rarity makes it semantically unambiguous — when the user sees emerald, they see money.
- **Profit Surface** (#ecfdf5 / `profit-surface`): The background behind the "Generated" badge. Never used for layout or decoration.

### Neutral
- **Ink** (#111827 / `ink`): Primary text — card titles, page headings, form labels.
- **Ink Muted** (#374151 / `ink-muted`): Hover state for ghost actions; secondary emphasis.
- **Surface** (#ffffff / `surface`): Card backgrounds, primary canvas.
- **Surface Dim** (#f9fafb / `surface-dim`): Page background behind cards and forms.
- **Surface Subtle** (#f3f4f6 / `surface-subtle`): Icon placeholders, secondary fills. Used sparingly.
- **Border** (#e5e7eb / `border`): Card borders, input strokes. Whisper-quiet separation.
- **Text Secondary** (#6b7280 / `text-secondary`): Helper text, metadata, prose.
- **Text Muted** (#9ca3af / `text-muted`): Placeholder text, low-priority metadata, disabled states.

### Named Rules
**The One Green Rule.** Emerald is reserved for profit and AI generation status. Never use it for decorative accents, icons, or section markers. The moment it appears in two semantic roles, it loses the one role that matters.

**The No Tint Rule.** The neutral palette is true gray — zero warm tint, zero cool drift. Warmth comes from the content (brand names, marketplace culture), not the background. Any value in the OKLCH L 0.84–0.97, C < 0.06, hue 40–100 band is prohibited.

## 3. Typography

**Primary Font:** Geist (with -apple-system, BlinkMacSystemFont, sans-serif fallback)
**Mono Font:** Geist Mono (reserved for technical output if needed)

**Character:** One geometric family in multiple weights. No pairing friction, no type personality competing with the work. Geist is contemporary, fast-rendering, and purpose-built for screen legibility. It disappears into the task.

### Hierarchy
- **Display** (700, clamp(2.25rem, 6vw, 3rem), line-height 1.1, letter-spacing -0.02em): Hero headline only. One per page, never in the dashboard.
- **Title** (700, 1.25rem / 20px, line-height 1.3, letter-spacing -0.01em): Page and section titles — "My Listings", "New Listing".
- **Body** (400, 0.875rem / 14px, line-height 1.6): Primary UI text — card content, form labels, descriptions. Cap prose at 65ch.
- **Label** (600, 0.75rem / 12px, line-height 1): Metadata counts, badges, supporting detail. Never as a section eyebrow.

### Named Rules
**The No-Eyebrow Rule.** Small all-caps tracked text (`text-xs uppercase tracking-widest`) above every section is the generic SaaS default. Prohibited as a section cadence. Use size and weight contrast instead. (The existing "Item Details" / "AI Output" patterns in the new-listing form are technical debt — do not extend them.)

**The Single Family Rule.** One typeface, all weights. Do not introduce a second sans-serif or display face. If a typographic moment needs more presence, add weight or scale — not a new font.

## 4. Elevation

Flat by default. Depth is conveyed through tonal layering (white card on gray-50 background) and borders, not shadows. The only shadow in the system is a whisper on card hover — communicating interactivity, not architectural depth.

### Shadow Vocabulary
- **hover-lift** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Listing card hover state only. Signals the card is interactive. Never used decoratively or at rest.

### Named Rules
**The Flat-by-Default Rule.** Surfaces are flat at rest. A shadow only appears when it communicates state (hover, transient focus). Decorative shadows, gradient glows, and layered blur effects are prohibited. If you want to add depth, use a border and a surface color step.

## 5. Components

### Buttons
- **Shape:** Gently rounded (8px, `rounded-lg`) — functional, not playful
- **Primary:** Black (`#000000`) background, white text, 10px/16px padding, 14px semibold. Hover: dark gray (`#1f2937`). Transition: `background 150ms`
- **Ghost / Inline:** No background, no border. Text-muted at rest (`#9ca3af`), ink-muted on hover (`#374151`). Used for low-weight actions: delete, sign out, back navigation

### Cards / Containers
- **Corner Style:** Generously rounded (16px, `rounded-2xl`)
- **Background:** White (`#ffffff`) on gray-50 (`#f9fafb`) page background
- **Shadow Strategy:** None at rest. `hover:shadow-sm` on listing cards only
- **Border:** `1px solid #e5e7eb` — always present. Provides card edge without shadow
- **Internal Padding:** 20px (`p-5`) for listing cards; 24px (`p-6`) for form sections; 64px (`p-16`) for empty states

### Inputs / Fields
- **Style:** White background, 1px gray-200 stroke, 8px radius. Matches button radius for visual cohesion
- **Focus:** 2px gray-900 ring, border collapses. The ring confirms action without introducing a new color
- **Placeholder:** `#9ca3af` (text-muted) — hits 4.5:1 contrast against white
- **Disabled:** 50% opacity

### Navigation
- **Style:** White bar, 1px gray-100 bottom border. Logo in 700 weight tracking-tight. Context-appropriate: primary CTA on landing; user info + sign out on dashboard
- **Back link:** Ghost style (`text-gray-400 hover:text-gray-700`) with `←` prefix; no underline

### Profit Signal (Signature Component)
The emerald profit figure is the only colored text in the system. `text-sm font-semibold` in `#059669`, placed after metadata so the eye moves through context (size, condition, cost) before landing on the payoff. Never use emerald for any other informational role.

### AI Generated Badge
- **Style:** `bg-emerald-50 text-emerald-600 font-medium text-xs px-2 py-0.5 rounded-full`
- Appears inline with section label when content has been AI-generated. The only use of `profit-surface` as a badge background.

## 6. Do's and Don'ts

### Do:
- **Do** use pure white (`#ffffff`) for card surfaces and black (`#000000`) for primary CTAs. These are the structural poles; don't soften them.
- **Do** reserve emerald exclusively for profit figures and the AI-generated status badge. Two uses, maximum.
- **Do** use 16px radius (rounded-2xl) for containers and 8px (rounded-lg) for controls, consistently. No deviations.
- **Do** keep shadows absent at rest and `hover:shadow-sm` only on interactive cards.
- **Do** cap body prose at 65ch using `max-w-prose` or an equivalent constraint.
- **Do** use `focus:ring-2 focus:ring-gray-900 focus:border-transparent` for all input focus states. Keyboard users need the same contrast as mouse users.
- **Do** cite PRODUCT.md's "speed is the product" principle when evaluating any new UI element: does it save time or cost time?

### Don't:
- **Don't** use `text-xs font-semibold uppercase tracking-widest` as a section label cadence. That is the generic SaaS scaffold — prohibited. Replace with type hierarchy (size and weight).
- **Don't** add warm tints to the neutral background. Cream, sand, paper, parchment, or bone backgrounds are prohibited. The system is true gray.
- **Don't** use developer-tooling aesthetics: dark backgrounds, monospace-heavy UI, terminal vibes, power-user density. This tool is for resellers, not engineers.
- **Don't** use lifestyle softness: pastel fills, bubbly type, decorative rounded-everything, Instagram-adjacent aesthetics. This is a work tool.
- **Don't** add a second accent color without a strict semantic role. The one-accent rule is load-bearing.
- **Don't** add shadows for decoration. Every shadow communicates state. No state, no shadow.
- **Don't** nest cards. A card inside a card is always wrong.
- **Don't** use side-stripe borders (`border-left` > 1px as a colored accent). Use a full border or a background tint instead.
