
# AGENTS.md — StudySync Architecture & Engineering Standards

## 1. Architectural Vision

**StudySync** is a unified academic ecosystem and student-support platform for modern higher education.

The visual language — the "Curated Academic Atelier & Editorial Collage" aesthetic, typography pairing, color tokens, stationery primitives, and RTL arrow invariants — is specified in **`design.md`**. This file (`AGENTS.md`) governs **architecture, structure, and non-negotiable engineering invariants**. When in doubt about *how something should look*, consult `design.md`; when in doubt about *how something should be structured or built*, consult this file.

---

## 2. Directory Architecture & Scalable Component Hierarchy

To maintain high performance, avoid colossal 400-line single-page sprawl, and present an intuitive hierarchy:

```
src/
├── app/                           # Route Pages (Composition Roots only, <70 lines each)
│   ├── layout.tsx                 # Root layout (Fonts, Providers, Metadata, Global Noise/Grain Overlay)
│   ├── globals.css                # Design tokens (see design.md §3), palettes, & tape/paper utilities
│   ├── page.tsx                   # Home: Overview, Pitch, 4 Roles, 10 Objectives (Assembles sections)
│   ├── academics/
│   │   └── page.tsx               # Courses, Syllabus Hierarchy, Prereq Graph, Calendar
│   ├── attendance-safety/
│   │   └── page.tsx               # Smart QR, Anti-Proxy, Rules Risk Matrix, Notifications
│   ├── intelligence/
│   │   └── page.tsx               # ML Career Track, HITL Admin Demo, Course Recommender, AI Tools
│   ├── ecosystem/
│   │   └── page.tsx               # Opportunity Hub, 5 Workflows, Scope Matrix, Value Dossier
│   └── privacy/
│       └── page.tsx               # Student Vault, Zero-Access Privacy, FERPA Governance
├── components/
│   ├── layout/                    # Global navigation, Header, Footer, ThemeToggle, LanguageToggle
│   ├── ui/                        # Canonical stationery components (strictly ≤150 lines each)
│   │   ├── PaperCard.tsx          # Card with offset shadow or subtle rotation, no soft shadows
│   │   ├── Tape.tsx               # CSS masking tape (washi, kraft, striped, semi-transparent)
│   │   ├── PaperClip.tsx          # Brass/steel/rose paperclip pinning elements
│   │   ├── Highlighter.tsx        # Highlighter mark with uneven background block
│   │   ├── ArchivalStamp.tsx      # Distressed circular/rectangular ink stamp
│   │   ├── PageHeader.tsx         # Standardized archival dossier header per route
│   │   ├── ConstellationOrbit.tsx # Orbital systems constellation with live inspection lens
│   │   └── pointers/              # RTL-symmetric annotation pointers (see design.md §6)
│   └── sections/                  # Domain-grouped section modules (strictly ≤200 lines each)
│       ├── home/                  # Home page modules (HeroSection, RolesSection, etc.)
│       ├── academics/             # Academic route sections
│       ├── attendance-safety/     # Attendance and safety route sections
│       ├── intelligence/          # AI & Career route sections
│       ├── ecosystem/             # Ecosystem & scope sections
│       └── privacy/               # Privacy & FERPA sections
├── context/
│   └── LanguageContext.tsx        # Bilingual (AR/EN) direction, dict, and string state
├── locales/
│   ├── ar.json                    # Arabic editorial copy (Single Source of Truth)
│   └── en.json                    # English editorial copy (Single Source of Truth)
└── lib/
    └── utils.ts                   # Helpers, clsx, and formatters
```

**Rule of thumb**: `app/**/page.tsx` files are *only* composition roots that import and assemble section modules. Any substantive JSX (>5 lines of body) belongs in `src/components/sections/[domain]/`.

---

## 3. Strict Non-Negotiable Engineering Invariants

### 1. Zero Inline Translations (100% i18n First)

- **STRICTLY BANNED**: `isArabic ? "نص عربي" : "English text"` or any inline bilingual ternary in components.
- **MANDATORY**: Every single piece of user-facing copy MUST be declared in both `src/locales/en.json` and `src/locales/ar.json`.
- Access all copy via `const { dict } = useLanguage()` through structured keys (e.g., `dict.hero.title`, `dict.s3_roles.roles`).
- If you need a new string, you MUST add it to **BOTH** `en.json` and `ar.json` first. Identical key paths in both files — no exceptions.

### 2. Hard File Size Limit (<200 lines per file)

- **Page files** (`src/app/**/page.tsx`): pure composition roots, strictly **<70 lines**. No inline section bodies.
- **Section modules** (`src/components/sections/**`): modular, single-purpose, strictly **<200 lines**.
- **UI stationery components** (`src/components/ui/**`): focused, atomic, strictly **<150 lines**.
- If a component grows past 200 lines, you MUST split it into sub-components immediately.

### 3. SEO, Crawlability & Metadata

- **Route-Level Sitemap Indexing**: `src/app/sitemap.ts` MUST register every public specification route (`/`, `/academics`, `/attendance-safety`, `/intelligence`, `/ecosystem`, `/privacy`) with appropriate `changeFrequency` and `priority` weighting. Never omit deep specification routes.
- **No Blank Social Previews**: OpenGraph and Twitter cards properly mapped; canonical URLs declared per route.
- **Semantic Heading Hierarchy**: Only a single `<h1>` per route. Section headers use `<h2>`; nested cards/modules use `<h3>` or `<h4>`.

### 4. Performance & Bundle Optimization

- **Dynamic Imports for Non-Critical Packages**: Heavy or user-triggered libraries (e.g., `canvas-confetti`, search indexes, chart libraries) MUST NOT be imported at the module root of a section. Always lazy-load them on demand:
  ```ts
  const confetti = (await import("canvas-confetti")).default;
  ```
- **Zero Cumulative Layout Shift (CLS)**: Sliders, badges, and countdown meters must reserve their bounding dimensions so client-state updates don't cause sudden page jumps.
- **Grain Overlay GPU Acceleration**: Background noise and grain overlays must use `pointer-events-none` and hardware-accelerated CSS properties (e.g., `will-change: transform`, `transform: translateZ(0)`) to prevent scroll jank on mobile devices.

### 5. Accessibility (a11y) Engineering

(Visual a11y standards — focus rings, contrast — are in `design.md` §8.)

- **Interactive Inputs**: Every `<input type="range">`, `<select>`, or custom toggle MUST provide an explicit `aria-label` linked to its localized label from `dict`. Never rely on placeholder text alone.
- **Keyboard Navigation**: All clickable cards and tabs must be reachable via `Tab` and activatable via `Enter` / `Space`. Prefer semantic elements (`<button>`, `<a>`) over `<div onClick>`.
- **Focus Rings**: Non-negotiable — see `design.md` §8 for the canonical class string.
- **Motion**: Respect `prefers-reduced-motion` — hover translations and rotations should collapse to 0 when the user has reduced motion enabled.

### 6. Tailwind CSS v4 Class-Based Dark Mode (`@custom-variant dark`)

- **CRITICAL**: In Tailwind CSS v4, the `dark:` utility variant defaults to `@media (prefers-color-scheme: dark)` rather than `.dark` class. Because StudySync relies on an intentional user-controlled desk-lighting toggle via `next-themes` (adding/removing `.dark` on `<html>`), `src/app/globals.css` **MUST** declare:
  ```css
  @custom-variant dark (&:where(.dark, .dark *));
  ```
- **STRICT PROHIBITION**: NEVER remove this `@custom-variant` declaration. Without it, whenever a user's OS is in Dark Mode, `dark:*` classes will falsely trigger in Light Mode (`DAY`), turning light-mode cards pitch-black and causing catastrophic contrast failures.
- **Verification**: See `design.md` §9 for the light/dark design verification checklist.

### 7. Design-System Compliance

All UI code MUST comply with `design.md` in full — including:
- Stationery primitives from `src/components/ui/` (no ad-hoc tapes, clips, or stamps).
- Bulletproof contrast + hover invariant (`design.md` §5).
- RTL arrow/pointer invariant (`design.md` §6).
- Tactile desk stationery navigation utilities (`design.md` §7).
- Typography role discipline (`design.md` §2).
- Token discipline (`design.md` §3–§4).

Any deviation must be raised as a design-system change proposal — not implemented silently inside a section.

---

## 4. Standard Operating Procedure (SOP) for Adding Code

When instructed to add or modify a section or page, follow this exact sequence:

1. **Check Locales First**
   - Add all required text keys into `src/locales/en.json` and `src/locales/ar.json`. Ensure identical key paths in both files.
   - Absolutely no `language === "ar"` ternaries in JSX.

2. **Consult `design.md`**
   - Review the design checklist in `design.md` §10 for the components, tokens, and invariants you'll be using.

3. **Create or Modify the Isolated Section**
   - Create a dedicated file under `src/components/sections/[domain]/[SectionName].tsx` matching the page route folder.
   - Keep the file **<200 lines**.
   - Compose from canonical stationery components (`PaperCard`, `Tape`, `PaperClip`, `ArchivalStamp`, `Highlighter`).
   - Use RTL-safe arrows and pointers (`design.md` §6).
   - If using non-critical animation/effect libraries, dynamically import them (§3.4 above).

4. **Assemble in the Page Composition Root**
   - In `src/app/[route]/page.tsx`, import and assemble the section component.
   - Keep the page file **<70 lines**.

5. **Update SEO**
   - If you add a new route, register it in `src/app/sitemap.ts` with `changeFrequency` and `priority`, and add OpenGraph / Twitter / canonical metadata.

6. **Run Pre-Flight Validation**
   - `npx tsc --noEmit` → zero compilation or type errors.
   - Verify WCAG contrast in both Light (`#F9F7F1`) and Dark (`#11151C`) modes.
   - Verify RTL symmetry by switching to Arabic — all arrows, spine docks, and tabs mirror correctly.
   - Verify that all routes are indexed in `src/app/sitemap.ts`.
   - Confirm no file exceeds its size budget (page <70, section <200, ui <150).
   - Confirm no inline translation ternaries exist in the diff.