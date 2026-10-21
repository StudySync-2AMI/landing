# AGENTS.md — StudySync Architecture & Design Standards

## 1. Architectural Vision & Identity
**StudySync** is a unified academic ecosystem and student-support platform designed for modern higher education.

### Design Tone: The "Curated Academic Atelier & Editorial Collage"
- **Anti-AI-Generic**: Strictly ban generic multi-column card spam, glossy gradients, massive rounded corners (e.g., `rounded-3xl`), floating detached labels, and overly soft, artificial drop-shadows.
- **Editorial Scrapbook Aesthetic**: The UI must feel like a highly organized, tactile university research journal or a professor's well-kept scrapbook. It must balance **professional academic rigor** with **analog, editorial warmth**.
- **Tactile Depth & Imperfection**: Introduce subtle CSS noise overlays (grain), masking tape elements, paper clips, and stamped ink effects. Elements should overlap slightly, use slight rotations (`rotate-1`, `-rotate-2`), and avoid perfect digital alignment where it adds character.
- **Typographic Contrast**: Combine a heavy, authoritative Serif for headings (e.g., *Fraunces* or *Playfair Display*), a clean Sans for body copy, a Monospace for data/labels/meta (e.g., *JetBrains Mono*), and a Handwritten script (e.g., *Caveat*) for margin notes, arrows, or annotations.

---

## 2. Multi-Page Architecture & Route Map

To maintain high performance, avoid colossal 2,000-line single-page sprawl, and present an intuitive university prospectus hierarchy:

```
src/
├── app/
│   ├── layout.tsx                 # Root layout (Fonts, Providers, Metadata, Global Noise/Grain Overlay)
│   ├── globals.css                # Academic paper design tokens, palettes, & tape/paper utilities
│   ├── page.tsx                   # Home: Overview, Thesis Pitch, 4 Roles, 10 Objectives
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
│   ├── layout/                    # Global navigation, tabs, binder spine, footer
│   ├── ui/                        # Low-level physical stationery components (<=150 lines)
│   │   ├── PaperCard.tsx          # Card with offset shadow or subtle rotation, no soft shadows
│   │   ├── MaskingTape.tsx        # CSS tape (semi-transparent, blend-mode multiply, rotate)
│   │   ├── HighlighterText.tsx    # Text with colored, uneven background blocks
│   │   ├── ArchivalStamp.tsx      # Circular/distressed text stamp
│   │   ├── BinderTab.tsx          # Physical notebook tab styling
│   │   └── PageHeader.tsx
│   └── modules/                   # Isolated feature blocks per page (<=200 lines each)
├── context/
│   └── LanguageContext.tsx        # Bilingual (AR/EN) direction & string state
├── locales/
│   ├── ar.json                    # Arabic editorial copy
│   └── en.json                    # English editorial copy
└── lib/
    └── utils.ts                   # Helpers and formatters
```

---

## 3. Strict Code & Engineering Rules

1. **File Size Limit (<250 lines)**:
   - Any component growing above 250 lines must be split into sub-components.
   - Keep views modular, composable, and single-purpose.

2. **Color Palette & Texture Discipline**:
   - Base Canvas: Warm parchment (`#f8f6f0`), archive stone (`#eeeae0`).
   - Ink & Accents: Dark fountain-pen charcoal (`#1c2024`), Oxford navy (`#2d3b48`), muted sealing-wax terracotta (`#b85d38`), sage binder linen (`#435343`).
   - Dark Mode: Scholarly obsidian study room (`#111317`), soft graphite (`#1a1d23`), muted bone text (`#dedad2`).
   - **Grain:** Every page must have a very subtle CSS noise/grain overlay (`pointer-events: none; opacity: 0.03` to `0.05`) to give it a physical paper texture.

3. **Scrapbook UI Constraints (Crucial)**:
   - **No Perfect Shadows:** Avoid standard soft `box-shadow`. Use hard borders (`border-2 border-[--ink-primary]`) or offset block shadows (`box-shadow: 4px 4px 0px var(--ink-primary)`).
   - **Controlled Imperfection:** Use utility classes like `rotate-1`, `-rotate-1`, or `-translate-y-1` on cards, tags, and tape to break the rigid grid.
   - **Type Lockup:** Use `font-serif` for `<h1>`/`<h2>`. Use `font-mono` for tags/meta. Use `font-handwriting` sparingly for micro-copy and annotations.
   - **Highlights:** Apply `box-decoration-break: clone` to text backgrounds to mimic a real highlighter pen that crosses line breaks.

4. **Bilingual i18n First**:
   - All text must exist in both `ar.json` and `en.json`.
   - RTL (`dir="rtl"`) and LTR (`dir="ltr"`) layout symmetry using Tailwind logical padding/margins (`ms-`, `me-`, `ps-`, `pe-`). Ensure rotated elements and tape overlays mirror correctly in RTL.

5. **Performance & SEO**:
   - Server-first components with minimal client islands for interactive simulators (QR counter, Risk calculator, HITL toggles).
   - Proper descriptive semantic headings (`<h1>`, `<h2>`, `<article>`).

---

## 4. Component Design Blueprints (For the Agent)

When building UI, reference these specific patterns rather than standard Tailwind UI blocks:

### A. The "Paper Card" (Replaces standard cards)
```tsx
// Do NOT use rounded-xl, shadow-lg, or generic padding.
<div className="relative bg-[#eeeae0] border border-[#1c2024]/20 p-6 rotate-[1deg] transition-transform hover:rotate-0">
  <MaskingTape className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
  <h3 className="font-serif text-2xl text-[#1c2024]">Module Title</h3>
  <p className="font-sans text-sm mt-2 text-[#1c2024]/70">Body copy...</p>
</div>
```

### B. Highlighter Text
```tsx
// Used for drawing attention to key features in paragraphs
<span className="bg-[#b85d38]/30 px-1 box-decoration-break-clone">
  ML-powered career tracks
</span>
```

### C. Scrapbook Annotations
```tsx
// Use handwriting fonts for tips, arrows, or side notes
<p className="font-handwriting text-xl text-[#2d3b48] rotate-[-2deg] mt-4">
  ↳ * Hint: You can sync this with your phone.
</p>
```