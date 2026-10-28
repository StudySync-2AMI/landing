# design.md — StudySync Design System & Visual Standards

## 1. Design Identity: "Curated Academic Atelier & Tactile Scrapbook Desk"

**StudySync**'s visual language must feel like a highly organized, tactile university research journal — a professor's well-kept, slightly messy scrapbook resting on a dark oak desk. It must balance **professional academic rigor** with **analog, editorial warmth**. Elements should feel physically placed by hand: masking tape, brass paperclips, pins, stamped ink, and overlapping paper edges.

### Anti-AI-Generic Doctrine
Strictly banned across every route and component:
- Generic multi-column card spam / dashboard grids.
- Glossy gradients, holographic sheens, or glass-morphism.
- Massive rounded corners (e.g., `rounded-3xl`) reserved for mobile OS UI.
- Floating detached labels, chips, or badges without physical framing.
- Overly soft, artificial drop-shadows (`shadow-md`, `shadow-xl`, `blur-3xl`).
- Perfect digital alignment. 

### Editorial Scrapbook Aesthetic
Every surface should feel placed by hand:
- Subtle CSS noise overlays (grain) and dot grids.
- Masking tape (washi, kraft, striped), brass paper clips, and stamped ink effects.
- Elements may overlap slightly, use subtle rotations (`rotate-1`, `-rotate-1`), and avoid perfect digital alignment where it adds character.
- Cards should stack like physical paper, using hard offset shadows rather than blur.
- Motion should feel mechanical/analog (a page turning, a stamp pressing, a clip snapping), never bouncy or elastic.

---

## 2. Typography System

StudySync runs a **bilingual (Arabic/English) editorial pairing**. Every text role must have parallel Latin + Arabic treatment.

| Role | Latin Font | Arabic Font | CSS Variable |
|------|-----------|-------------|--------------|
| **Headings (Editorial Book Serif)** | *Playfair Display* | classical *Amiri* | `--font-serif` |
| **Body Copy (Refined Modern Sans)** | *Outfit* | *IBM Plex Sans Arabic* | `--font-sans` |
| **Margin Notes & Marginalia (Handwritten Script)** | *Caveat* | authentic Ruq'ah *Aref Ruqaa* | `--font-handwriting` |
| **Data / Catalog Meta (Codes, Timestamps, Ledger Metrics)** | Monospace | Monospace | `--font-mono` |

Fonts MUST be loaded once in `src/app/layout.tsx` (via `next/font` or equivalent) and exposed as CSS variables on `<html>`. Never re-declare fonts inside section components.

---

## 3. Color Tokens & Palette

Design tokens are declared in `src/app/globals.css` and consumed by every section. **Dark Mode** must feel like an evening study session under a desk lamp, with deep charcoal/navy paper and bright, contrasting ink.

### Dark Mode Tokens (Evening Study Desk - Night Aesthetic)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-desk` / `--bg-paper` | `#0F131A` / `#11151C` | Base canvas (dark oak desk mat) |
| `--surface-paper` / `--surface-card` | `#18212D` | Card layer (heavy midnight rag paper) |
| `--surface-subtle` | `#11151C` / `#1F2733` | Secondary desk tray / backing |
| `--ink-primary` | `#F3EFE6` / `#F9F7F1` | Bright parchment ink (headings) |
| `--ink-secondary` | `#A3B1C6` / `#C2C9D6` | Muted slate ink (body text) |
| `--accent-terracotta` | `#E86A46` | High-visibility orange/red (CTAs, highlights) |
| `--border-hard` / `--border-paper` | `#3E4A5C` / `#3A4556` | Visible edges of physical paper |
| `--shadow-anchor` | `#0A0D12` / `#090B0F` | Solid offset shadow block |

### Light Mode Tokens (Curated Academic Paper Desk - Day Aesthetic)
The light mode must feel like sunlight falling gently on an antique scholar's desk. **Strictly banned: clinical high-glare pure white (`#FFFFFF`) card flooding and raw jet-black (`#1A1A1A` / `#000000`) secondary elements**, which cause severe visual vibration and ocular fatigue. All light surfaces must evoke tactile, warm, natural cotton rag paper and scholarly walnut-gall ink.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-paper` | `#F4EFE6` | Base canvas (warm French cream vellum, soothing & anti-glare) |
| `--surface-card` | `#FAF6EE` | Card layer (natural warm ivory rag paper, soft on the eye) |
| `--surface-subtle` | `#EBE3D3` | Secondary desk tray, docket backing & pen blotter |
| `--surface-docket` | `#E2D8C3` | Tertiary paper layer, index tabs & catalog dividers |
| `--ink-primary` | `#28231D` | Deep walnut-gall ink (warm espresso, zero harsh edge glare) |
| `--ink-secondary` | `#584F45` | Warm graphite / walnut slate ink (comfortable body copy) |
| `--ink-muted` | `#7E7467` | Antique pencil / marginalia notation ink |
| `--border-paper` | `#3D352E` | Deep warm walnut sepia (crisp tactile paper borders) |
| `--shadow-anchor` | `#3D352E` | Warm umber solid offset block shadow (authentic physical weight) |

### Rich Academic Secondary & Accent Palette (Light Mode Harmony)
Instead of defaulting to monochrome black/white for secondary components, use curated, low-fatigue academic accents:
- **Oxford Navy**: `#1E3A5F` (headers, primary course tracks) | Soft Wash: `#EBF2FA`
- **Scholar Laurel / Sage**: `#265935` (unlocked status, safety metrics) | Soft Wash: `#E8F4EB`
- **Sealing Wax Terracotta**: `#B84224` (focal CTAs, key stamps) | Soft Wash: `#FDF0EB`
- **Antique Amber / Washi Gold**: `#A66A14` (bookmarks, highlights) | Soft Wash: `#FDF6E3`
- **Scholarly Mulberry / Plum**: `#62426E` (specialized tags, badges) | Soft Wash: `#F4EEF7`

### Bullet Journal Dot Grid
Every route's canvas should carry `.paper-grain-overlay` — a `radial-gradient(rgba(255, 255, 255, 0.08) 1.25px, transparent 1.25px)` in dark mode, or `radial-gradient(#C5BBAA 1.35px, transparent 1.35px)` on `#F4EFE6` in light mode on a `24px 24px` grid. This produces soothing, tactile bullet-journal dots that soften the background and eliminate screen glare. The overlay MUST be `pointer-events-none` and hardware-accelerated.

---

## 4. Tactile Scrapbook Aesthetic & Token Discipline

### No Soft Shadows — Hard Edges Only
Avoid generic `shadow-md` / `shadow-xl`. Use **solid hard borders + solid offset block shadows** to simulate stacked paper.

```tsx
// Canonical hard-shadow recipes:
className="border-2 border-[#3E4A5C] dark:shadow-[4px_4px_0px_#0A0D12] bg-[#18212D]"
```

### No Generic Rounded Pills — Index Cards & Dockets
Avoid `rounded-full` pills for tags/categories. Use **Archival Index Slips** or **Docket Tickets** — `rounded-sm` or `rounded-md`, hard borders, catalog codes (`CAT.01`), monospace meta.

### Controlled Imperfection & Desk Tools
Use `rotate-1`, `-rotate-1`, and `hover:rotate-0` with tape overlays to break digital rigidity. Rotations must remain subtle (±1–2°) so they don't interfere with readability.

- **Tape**: Half-transparent, textured overlays pinning cards to the background.
- **Clips & Pins**: Metallic brass or steel elements holding paper together.
- **Overlaps**: Cards should occasionally overlap each other, breaking the grid.
- **Stamps**: Distressed ink stamps for metadata (e.g., "VERIFIED", "PITCH").

### Canonical Stationery Components
These live in `src/components/ui/`:
- **`PaperCard.tsx`** — card with offset block shadow or subtle rotation. No soft shadows.
- **`Tape.tsx`** — CSS masking tape for pinning elements.
- **`PaperClip.tsx`** — brass / steel / rose paperclip pinning elements.
- **`Highlighter.tsx`** — highlighter mark with an uneven background block.
- **`ArchivalStamp.tsx`** — distressed circular or rectangular ink stamp.
- **`PageHeader.tsx`** — standardized archival dossier header.
- **`ConstellationOrbit.tsx`** — orbital systems constellation with dashed lines and a central node.

---

## 5. Bulletproof Contrast & Hover Invariant

**STRICTLY BANNED**: ad-hoc hover background overrides without explicit hover text colors (e.g., `hover:bg-[#F2EFE7]` on dark-mode text → invisible white-on-white text).

**MANDATORY**: Every button or interactive card MUST declare both base and hover colors.

```tsx
// Canonical Primary CTA:
className="bg-[#E86A46] text-white hover:bg-[#D45936] border-2 border-[#FF8A65] shadow-[3px_3px_0px_#0A0D12] transition-all hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#0A0D12]"

// Canonical Secondary Button:
className="bg-[#18212D] text-[#F3EFE6] hover:bg-[#232D3B] border-2 border-[#3E4A5C] shadow-[3px_3px_0px_#0A0D12]"
```

Pill badges, tags, and text overlays must maintain **WCAG AA minimum 4.5:1 contrast** against both card backgrounds.

---

## 6. Directional Arrow & Annotation Pointer Invariant (RTL / LTR Symmetry)

**STRICTLY BANNED**: hardcoded ASCII arrows (`→`, `←`, `↗`) and hardcoded unicode sub-arrows (`↳`, `↲`).

### Canonical Replacements
Use dedicated atomic pointers in `@/ui/pointers/`:
- **`<CornerPointer />`** — canonical downward-sweeping corner arrow.
- **`<SketchPointer />`** — hand-drawn sketchy horizontal pointer.
- **`<HandPointer />`** — historical scholar's manicula pointing finger.
- **`<BracketPointer />`** — archival margin bracket callout.

**Every pointer automatically mirrors** with `rtl:-scale-x-100` so arrows point into the text flow for both English and Arabic.

---

## 7. Tactile Desk Stationery Navigation Utilities (Anti-SaaS Buttons)

**STRICTLY BANNED**: generic floating circular/square icon buttons, standalone SaaS action buttons, and raw emojis.

**MANDATORY**: Navigation utilities must feel like physical objects resting on the study desk.

- **File Folder Tabs (Header Nav)**: Top navigation should look like index tabs cut from folders, slightly overlapping, with physical borders and hard shadows.
- **Desk Pen Tray / Blotter Docket**: Utilities (Search, Lamp, Language) anchored together inside a framed paper docket.
- **Archival Search Loupe**: Styled as a library catalog card with typewriter `[ ⌘K ]` stamp.
- **Brass Study Desk Lamp**: Analog mechanical toggle dial for DAY/NIGHT mode.

---

## 8. Accessibility Visual Standards

- **Focus visibility**: Every clickable card and tab must render a visible focus ring: `focus-visible:ring-2 focus-visible:ring-[#E86A46] outline-none`.
- **Contrast**: All badges, highlighter marks, tape labels, and stamped text must maintain WCAG AA 4.5:1 against their actual rendered background.
- **Highlighter marks** must never reduce text contrast below 4.5:1 — the accent block sits *behind* text, never on top.

---

## 9. Dark Mode Design Testing Invariant

StudySync uses an intentional user-controlled desk lighting toggle (via `next-themes`, toggling `.dark` on `<html>`). 

### Dark Mode (`NIGHT` - Primary) Verification
- Cards render deep navy/graphite (`#18212D`) — never pure black; borders remain visible (`#3E4A5C`).
- Text remains bright parchment ink (`#F3EFE6`).
- Shadows are solid blocks (`#0A0D12`).
- Accent terracotta remains highly visible (`#E86A46`).

### Light Mode (`DAY` - Curated Paper Desk) Verification
- Base canvas renders warm soothing French cream (`#F4EFE6`) — no glaring bleached white canvas.
- All parchment cards render warm natural ivory/cream rag paper (`#FAF6EE` / `#FFFDF9`).
- Text renders deep walnut-gall ink (`#28231D`) with secondary umber slate (`#584F45`) — never harsh jet-black `#1A1A1A`.
- Solid borders render warm walnut sepia (`#3D352E`); offset shadows render warm umber (`#3D352E`).
- Secondary elements, pills, and chips use harmonious academic washes (Oxford Navy, Scholar Sage, Sealing Wax, Washi Amber) — never dumped into monochrome black and white.
- Hover states remain legible, smooth, and comfortable.

---

## 10. Design Review Checklist

Before shipping any section, verify visually:

- [ ] Composed from canonical stationery primitives (`PaperCard`, `Tape`, `PaperClip`, `Highlighter`, `ArchivalStamp`).
- [ ] No `rounded-full` pills, no soft `shadow-md`, no gradients.
- [ ] Every interactive element has explicit base + hover colors for both modes.
- [ ] All arrows use `<ArrowRight />` / `<ArrowUpRight />` or one of the `@/ui/pointers/*` primitives — zero literal arrows.
- [ ] RTL symmetry verified by switching to Arabic — spine docks, tabs, pointers all mirror correctly.
- [ ] Typography uses the correct role (serif heading / sans body / handwriting marginalia / mono meta).
- [ ] Dark mode renders as an evening study desk with deep navy paper and bright ink.
- [ ] Light mode renders as a warm, eye-friendly academic paper desk with ivory cards, walnut-gall ink, and soothing academic secondary accents (no sterile white or harsh jet-black).
- [ ] WCAG AA 4.5:1 contrast verified in **both** modes.