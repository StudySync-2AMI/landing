# AGENTS.md — StudySync Architecture, Engineering & Design Standards

## 1. Architectural Vision & Identity
**StudySync** is a unified academic ecosystem and student-support platform designed for modern higher education.

### Design Tone: The "Curated Academic Atelier & Editorial Collage"
- **Anti-AI-Generic**: Strictly ban generic multi-column card spam, glossy gradients, massive rounded corners (e.g., `rounded-3xl`), floating detached labels, and overly soft, artificial drop-shadows.
- **Editorial Scrapbook Aesthetic**: The UI must feel like a highly organized, tactile university research journal or a professor's well-kept scrapbook. It must balance **professional academic rigor** with **analog, editorial warmth**.
- **Tactile Depth & Imperfection**: Introduce subtle CSS noise overlays (grain), masking tape elements, brass paper clips, and stamped ink effects. Elements should overlap slightly, use subtle rotations (`rotate-1`, `-rotate-1`), and avoid perfect digital alignment where it adds character.
- **Typographic Contrast & Arabic Pairing**:
  - **Headings (Editorial Book Serif)**: Latin *Playfair Display* paired with classical Arabic *Amiri* (`--font-serif`).
  - **Body Copy (Refined Modern Sans)**: Latin *Outfit* paired with *IBM Plex Sans Arabic* (`--font-sans`).
  - **Margin Notes & Marginalia (Handwritten Script)**: Latin *Caveat* paired with authentic Arabic Ruq'ah *Aref Ruqaa* (`--font-handwriting`).
  - **Data / Catalog Meta**: Monospace for codes, timestamps, and ledger metrics (`--font-mono`).

---

## 2. Directory Architecture & Scalable Component Hierarchy

To maintain high performance, avoid colossal 400-line single-page sprawl, and present an intuitive hierarchy:

```
src/
├── app/                           # Route Pages (Composition Roots only, <70 lines each)
│   ├── layout.tsx                 # Root layout (Fonts, Providers, Metadata, Global Noise/Grain Overlay)
│   ├── globals.css                # Academic paper design tokens, palettes, & tape/paper utilities
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
│   ├── ui/                        # Canonical physical stationery components (Strictly <=150 lines)
│   │   ├── PaperCard.tsx          # Card with offset shadow or subtle rotation, no soft shadows
│   │   ├── Tape.tsx               # CSS masking tape (washi, kraft, striped, semi-transparent)
│   │   ├── PaperClip.tsx          # Brass/steel/rose paperclip pinning elements
│   │   ├── Highlighter.tsx        # Highlighter mark with uneven background block
│   │   ├── ArchivalStamp.tsx      # Distressed circular/rectangular ink stamp
│   │   ├── PageHeader.tsx         # Standardized archival dossier header per route
│   │   └── ConstellationOrbit.tsx # Orbital systems constellation with live inspection lens
│   └── sections/                  # Domain-grouped section modules (Strictly <=200 lines each)
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

---

## 3. Strict Non-Negotiable Engineering Invariants

### 1. Zero Inline Translations (100% i18n First)
- **STRICTLY BANNED**: `isArabic ? "نص عربي" : "English text"` or inline bilingual ternaries in components.
- **MANDATORY**: Every single piece of user-facing copy MUST be declared in both `src/locales/en.json` and `src/locales/ar.json`.
- Access all copy via `const { dict } = useLanguage()` through structured keys (e.g., `dict.hero.title`, `dict.s3_roles.roles`).
- If you need a new string, you MUST add it to BOTH `en.json` and `ar.json` first.

### 2. Hard File Size Limit (<200 lines per file)
- **Page files (`src/app/**/page.tsx`)**: Must be pure composition roots (strictly `<70` lines). No inline section bodies!
- **Section modules (`src/components/sections/**`)**: Must be modular, single-purpose, and strictly `<200` lines.
- **UI stationery components (`src/components/ui/**`)**: Must be focused, atomic, and strictly `<150` lines.
- If a component grows past 200 lines, you MUST split it into sub-components immediately.

### 3. Tactile Scrapbook Aesthetic & Token Discipline
- **Light Mode Paper Tokens**: The light mode palette must always feel like warm, authentic physical notebook stationery:
  - Base canvas: Warm cream paper (`--bg-paper: #F8F6F0`).
  - Card layer: Crisp physical paper (`--surface-card: #FFFFFF` / `bg-white`).
  - Secondary desk tray / kraft backing: Warm deeper cream (`--surface-subtle: #EAE5D9`).
  - High-contrast ink text: Deep black ink (`--ink-primary: #1A1A1A`), dark charcoal (`--ink-secondary: #2C2A27`), and rich readable burgundy red (`--accent-terracotta: #B93815`).
  - Bullet Journal Dot Grid: Use `.paper-grain-overlay` (`radial-gradient(#BDB4A3 1.35px, transparent 1.35px)` on `24px 24px`) to ensure visible tactile notebook dots across pages.
- **No Soft Shadows**: Avoid generic `shadow-md` or `shadow-xl`. Use solid hard borders (`border-2 border-[#1A1A1A] dark:border-[#3E4A5C]`) and solid offset block shadows (`shadow-[2.5px_2.5px_0px_#1A1A1A]`, `shadow-[4px_4px_0px_#1A1A1A]`, or `.shadow-stationery`).
- **No Generic Rounded Pills**: Avoid `rounded-full` pills for tags/categories. Use tactile **Archival Index Slips** or **Docket Tickets** with `rounded-sm` or `rounded-md`, catalog codes (`CAT.01`), and hard borders.
- **Controlled Imperfection**: Use utility classes like `rotate-1`, `-rotate-1`, or `hover:rotate-0` with tape overlays to break digital rigidity.

### 4. Bulletproof Contrast & Hover Invariant
- **STRICTLY BANNED**: Ad-hoc hover background overrides without explicit hover text colors (e.g. `hover:bg-[#F2EFE7]` on dark mode text causing invisible white-on-white text).
- **MANDATORY**: Every button or interactive card MUST declare both its base AND hover colors for both light and dark mode:
  ```tsx
  // Canonical Primary CTA:
  className="scrapbook-btn bg-[#E86A46] text-white hover:bg-[#D45936] dark:bg-[#E86A46] dark:hover:bg-[#D45936] border-2 border-[#1A1A1A] dark:border-[#FF8A65] shadow-[3px_3px_0px_#1A1A1A] dark:shadow-[3px_3px_0px_#0A0D12]"

  // Canonical Secondary Button:
  className="scrapbook-btn bg-[#FFFDF9] dark:bg-[#18212D] text-[#1A1A1A] dark:text-[#F3EFE6] hover:bg-[#F3EFE6] dark:hover:bg-[#232D3B] hover:text-[#1A1A1A] dark:hover:text-[#FFFFFF] border-2 border-[#1A1A1A] dark:border-[#3E4A5C] shadow-[3px_3px_0px_#1A1A1A] dark:shadow-[3px_3px_0px_#0A0D12]"
  ```

### 5. Directional Arrow & Annotation Pointer Invariant (RTL / LTR Symmetry)
- **STRICTLY BANNED**: Hardcoded ASCII arrows (`→`, `←`, `↗`) and hardcoded unicode sub-arrows (`↳`, `↲`).
  - *Why `↳` is broken in Arabic*: `↳` (U+21B3) curves down and to the RIGHT. In Arabic (RTL), pointing right means pointing *backwards* into the margin, creating visual discordance and violating natural reading direction.
- **MANDATORY**:
  - For forward flow arrows: Always use `<ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />`
  - For external links: Always use `<ArrowUpRight className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />`
  - For handwritten margin notes and sub-annotations: Use the dedicated atomic pointer files in `@/ui/pointers/` (or via `@/ui/AnnotationPointer`):
    - `<CornerPointer />`: Canonical downward-sweeping corner arrow (replaces `↳` / `↲`).
    - `<SketchPointer />`: Hand-drawn sketchy horizontal pointer with organic waviness (replaces `→` / `←`).
    - `<LoopPointer />`: Authentic margin loop-de-loop note pointer.
    - `<HandPointer />`: Historical scholar's manicula pointing finger (`☞` in LTR, `☜` in RTL).
    - `<CurvePointer />`: Hand-sketched upward swoop (`⤴`).
    - `<BracketPointer />`: Archival margin bracket callout.
  - Every pointer automatically mirrors with `rtl:-scale-x-100` so arrows point into the text flow for both English and Arabic.

### 6. SEO, Crawlability & Metadata Invariant
- **Route-Level Sitemap Indexing**: `src/app/sitemap.ts` MUST register every public specification route (`/`, `/academics`, `/attendance-safety`, `/intelligence`, `/ecosystem`, `/privacy`) with appropriate `changeFrequency` and `priority` weighting. Never omit deep specification routes!
- **No Blank Social Previews**: Ensure OpenGraph and Twitter cards are properly mapped, and canonical URLs are declared per route.
- **Semantic Heading Hierarchy**: Only a single `<h1>` per route. Section headers must use `<h2>`, and nested cards/modules must use `<h3>` or `<h4>`.

### 7. Performance & Bundle Optimization Invariant
- **Dynamic Imports for Non-Critical Packages**: Heavy or user-triggered libraries (e.g., `canvas-confetti`, search indexes, chart libraries) MUST NOT be imported at the module root of a section. Always lazy-load them on demand via `const confetti = (await import("canvas-confetti")).default;`.
- **Zero Cumulative Layout Shift (CLS)**: Sliders, badges, and countdown meters must reserve their bounding dimensions so client state updates don't cause sudden page jumps.
- **Grain Overlay GPU Acceleration**: Background noise and grain overlays must use `pointer-events-none` and hardware-accelerated CSS properties to prevent scroll jank on mobile devices.

### 8. Accessibility (a11y) & Interactive Controls Invariant
- **Interactive Inputs**: Every `<input type="range">`, `<select>`, or custom toggle MUST provide an explicit `aria-label` linked to its localized label from `dict`.
- **Keyboard Navigation**: All clickable cards and tabs must have clear focus rings (`focus-visible:ring-2 focus-visible:ring-[var(--accent-terracotta)] outline-none`).
- **Color Contrast**: Pill badges and text overlays must maintain WCAG AA minimum 4.5:1 contrast against both light (`#F9F7F1`) and dark (`#11151C`) card backgrounds.

### 9. Tactile Desk Stationery Navigation Utilities (Anti-SaaS Buttons)
- **STRICTLY BANNED**: Generic floating circular/square icon buttons, standalone SaaS action buttons, and emojis (`🌐`, generic sun/moon icons without physical tactile framing).
- **MANDATORY**: Navigation utilities must feel like physical objects resting on an oak study desk:
  - **Desk Pen Tray / Blotter Docket**: Utilities (Search, Lamp, Language) must be anchored together inside a framed paper docket (`border-2 border-[#1A1A1A]`, `shadow-[3px_3px_0px_#1A1A1A]`, kraft tape accents).
  - **Archival Search Loupe**: Styled as a library catalog card with typewriter `[ ⌘K ]` stamp.
  - **Brass Study Desk Lamp**: Styled as an analog mechanical toggle dial with brass rivet dot and `DAY / NIGHT` mode stamp.
  - **Registrar Postmark Seal**: Styled as a university registrar ink postmark with cancellation lines (`POST [AR/EN] ///`) instead of generic browser emojis.
  - **Mobile Responsive Dock Invariant**: On small mobile screens (`<640px`), the dock scales down (`p-1 gap-1.5`, `hidden sm:inline` for secondary labels like `DAY/NIGHT`, `POST`, `///`, `⌘K`) to fit comfortably alongside the header logo without wrapping, while retaining 100% of the desktop stationery aesthetic on larger viewports.

### 10. Tailwind CSS v4 Class-Based Dark Mode Invariant (`@custom-variant dark`)
- **CRITICAL**: In Tailwind CSS v4, the `dark:` utility variant defaults to `@media (prefers-color-scheme: dark)` rather than `.dark` class. Because StudySync relies on an intentional user-controlled desk lighting toggle via `next-themes` (adding/removing `.dark` on `<html>`), `src/app/globals.css` **MUST** declare:
  ```css
  @custom-variant dark (&:where(.dark, .dark *));
  ```
- **STRICT PROHIBITION**: NEVER remove this `@custom-variant` declaration. Without it, whenever a user's operating system (Windows/macOS) is in Dark Mode, `dark:*` classes will falsely trigger in Light Mode (`DAY`), turning light mode cards pitch-black and causing catastrophic contrast failures (e.g. black text on dark navy cards).
- **Light Mode Testing Invariant**: Always verify that in Light Mode (`DAY`), all parchment cards remain ivory/cream (`bg-[#FFFDF9]` or `bg-[var(--surface-card)]`), text remains dark charcoal ink (`text-[#1A1A1A]`), and highlighters preserve deep ink contrast.

---

## 4. Standard Operating Procedure (SOP) for Adding Code

When instructed to add or modify a section or page, follow this exact sequence:

1. **Check Locales First**:
   - Add all required text keys into `src/locales/en.json` and `src/locales/ar.json`. Ensure identical key paths in both files.
   - Absolutely no `language === "ar"` ternaries in JSX.
2. **Create or Modify the Isolated Section**:
   - Create a dedicated file under `src/components/sections/[domain]/[SectionName].tsx` matching the page route folder.
   - Keep the file `<200` lines.
   - Use canonical stationery components (`PaperCard`, `Tape`, `PaperClip`, `ArchivalStamp`, `Highlighter`).
   - If using non-critical animation/effect libraries, dynamically import them.
3. **Assemble in the Page Composition Root**:
   - In `src/app/[route]/page.tsx`, import and assemble the section component.
   - Keep the page file `<70` lines.
4. **Run Pre-Flight Validation**:
   - Execute `npx tsc --noEmit` to ensure zero compilation or type errors.
   - Verify WCAG contrast in both Light (`#F9F7F1`) and Dark (`#11151C`) modes.
   - Verify RTL symmetry by checking that all arrows, spine docks, and tabs mirror correctly.
   - Verify that all routes are indexed in `src/app/sitemap.ts`.