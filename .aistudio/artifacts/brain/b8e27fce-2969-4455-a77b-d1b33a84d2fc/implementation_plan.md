# CertifyMe Swiss Editorial Spatial Redesign & Anti-Slop Plan

Transform CertifyMe from a generic template card directory into a refined Swiss editorial archive inspired by the reference video, preserving 100% of existing certification data, search, bookmarking, bilingual (English and Arabic RTL), and multi-page workflows while eliminating every AI-generated UI cliche.

## User Review & Critical Decisions

> [!IMPORTANT]
> The choices below incorporate your confirmed preferences from the clarification step alongside the strict anti-slop subtraction rules.

- **Confirmed Primary Views Mapping**: The central interactive canvas features three fluid modes mirroring the video:
  1. **Portal Stage**: Minimalist arrival canvas with subtle floating Swiss preview plates on hover, two central capsule triggers (`Majors` and `Certifications`), and a bottom `Introduction` expandable editorial sheet.
  2. **Majors Horizontal Gallery (`Temi` Mode)**: Full-height architectural columns separated by `1px` vertical hairlines, draggable horizontally with a bottom tick-mark drag scrubber (`<- Drag ->`).
  3. **Certifications Arc Dial (`Storia` Mode)**: Interactive large-radius curved SVG/CSS arc where certifications sit along the curve, paired with a bottom ruler scrubber (`<- Prev`, active index readout, `Next ->`), instant category/search filtering, and a central `Explore Certification` action.
- **Confirmed Background Atmosphere**: Crisp alabaster paper (`#F7F6F2`) overlaid with ultra-faint `1px` vertical architectural grid lines and a soft, grounded warm amber, peach, and pale sky ambient wash along the lower horizon (paired with a deep charcoal archival mode when Dark Theme is toggled).
- **Confirmed Column Visuals**: Custom Swiss typographic plates and geometric discipline linework for all 10 university majors, eliminating generic stock photography and cartoon icons.
- **Multi-Page & Legal Completeness**: Preserves dedicated multi-page routes for Category detail views, Individual Certification detail views, and Saved Bookmarks, while adding complete **Privacy Policy** and **Terms & Conditions** pages so zero links are missing or broken.

---

## 1. Overview & Core Concept

- **What It Does**: Curates verified free industry certifications from providers such as Google, Microsoft, IBM, Cisco, HubSpot, and AWS, organized by university major and skill level so students can earn credentials and add concrete experience to their CVs.
- **Target Audience / Persona**: University students and recent graduates seeking legitimate, zero-cost technical and business credentials without marketing fluff or paywall traps.
- **Key Value & Subtraction Audit (Anti-Slop Removals)**:
  1. **Removed Bouncing Rocket Pill & Split-Color Italic Hero**: Replaces the bouncing icon badge and artificially colored/italicized trailing headline words with calm, high-contrast Swiss display typography and generous negative space.
  2. **Removed 3-Up Floating Icon Box Roadmap**: Deletes the generic three-column rotated blue icon squares and dashed line, folding the 3-step student workflow into the video's centered, expandable `Introduction` editorial overlay sheet.
  3. **Removed Glassmorphic Blob Clutter, Sparkle Kickers, & Left Accent Stripes**: Eliminates `Sparkles` badges, `rounded-[2rem]` translucent cards, thick `border-l-4` active sidebar bars, and pill-badge sandwiches in favor of `1px` hairline rules and unboxed metadata separated by middle dots (`·`).
  4. **Removed Text-Only / Generic Box Logo**: Introduces a custom bespoke geometric SVG monogram mark in the top-left corner and matching vector favicon.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Arrival & Portal Canvas**:
   - Users land on a clean full-viewport architectural grid canvas framed by a minimalist top utility bar (bespoke SVG monogram + wordmark on the left; inline search trigger, Saved count, EN/AR language switch, and Light/Dark toggle on the right) and a quiet bottom utility rail (`Introduction` drawer toggle in the center, Privacy & Terms links on the edges).
   - Hovering over the two central hairline capsule buttons (`Majors` and `Certifications`) reveals subtle, staggered Swiss typographic preview plates behind the buttons.
   - Clicking `Introduction` smoothly expands a centered typographic card detailing how students discover, complete, and showcase free credentials, with a single `Close (X)` toggle at the bottom.
2. **Majors Horizontal Gallery (`Temi` Mode)**:
   - Clicking `Majors` transitions into full-height vertical grid columns (one per university discipline: Cyber Security, Computer Science, Artificial Intelligence, Data Science, Marketing, Cloud, IT Support, Finance, Graphic Design, Game Development).
   - Each column displays a custom Swiss geometric linework plate at the top, an interactive `Open ->` action bar on hover, a large light-weight editorial title, certification count in tabular numerals, and discipline summary at the base.
   - Users can drag horizontally with mouse/touch, scroll, or use the bottom tick-mark scrubber (`<- Drag ->`). Clicking any column navigates to the dedicated Major archive page.
3. **Certifications Arc Dial (`Storia` Mode)**:
   - Clicking `Certifications` transitions to the sweeping curved arc across the upper viewport, with a segmented mode toggle (`Majors` | `Certifications`) anchored at top-center.
   - Nodes along the curve display the provider name (e.g., `Cisco`, `Google`, `IBM`) and certification title at tangential angles along the arc.
   - Rotating the arc (via clicking any node, dragging, mouse wheel, or clicking `<- Prev` / `Next ->` on the bottom tick-mark ruler) brings the selected certification to the 12 o'clock focal apex, revealing its full title, duration · difficulty · category metadata, bookmark toggle, and a clean `View Certification` CTA leading to its dedicated detail page (plus direct official course link).
   - An inline filter & search bar lets students narrow the arc nodes by major, difficulty, or keyword in real time.
4. **Dedicated Multi-Page Views (Major Archive, Certification Monograph, Saved Bookmarks, Legal)**:
   - **Major Page**: Architectural header with discipline plate, real certification count, search/difficulty filter, and structured hairline catalog grid.
   - **Certification Detail Page**: Editorial two-column specification layout with provider verification summary, unboxed skill list, direct external enrollment link, working `Save` bookmark button, and working `Share` clipboard/native share feedback.
   - **Saved Bookmarks Page**: Persistent local collection with quick-remove and direct launch actions, plus a clean empty state returning to the catalog.
   - **Privacy Policy & Terms Pages**: Transparent, readable institutional legal pages explaining local browser storage usage, external provider links, and non-affiliation disclaimers.

### Visual Identity & Theme

- **Aesthetic Direction**: **Swiss Editorial & Institutional Archive**. Crisp, museum-catalog authority with mathematical grid alignment, light-weight display proportions, and abundant breathing room.
- **Color Palette & Mood (60-30-10 Distribution)**:
  - *60% Dominant Canvas*: Warm Alabaster `#F7F6F2` (Light) / Deep Archival Charcoal `#0E0F11` (Dark).
  - *30% Structural Surfaces & Hairlines*: Subtle translucent paper panels, crisp `1px` hairlines (`rgba(24, 24, 27, 0.10)` in Light / `rgba(244, 244, 240, 0.10)` in Dark), and soft horizon atmospheric wash combining muted warm amber (`#E8A87C` at low opacity), soft coral-peach (`#E2876F` at low opacity), and pale mineral sky (`#B8D0D8` at low opacity).
  - *10% Accent Budget*: Deep Ink Charcoal `#141413` (Light primary actions and active pills) / Crisp Alabaster `#F4F3EF` (Dark primary actions) with Terracotta Rust `#9A3412` reserved strictly for active bookmark/focus indicators.
- **Typography & Hierarchy**:
  - *Display & Headings*: **Outfit** (weights `300` Light and `500` Medium) for airy, architectural titles with `text-wrap: balance` and tight-to-neutral tracking, echoing the Swiss cultural showcase in the video.
  - *Body Prose & UI Controls*: **Plus Jakarta Sans** (weights `400` Regular and `600` SemiBold) for effortless legibility in English and clean pairing with Arabic RTL system/Google sans (`Cairo` / `IBM Plex Sans Arabic` fallback when Arabic is active).
  - *Catalog Indices & Ruler Ticks*: **IBM Plex Mono** (`tabular-nums`) for certification counts, durations, and ruler scrubber indices.
- **Interactive Feedback & Motion**:
  - Compositor-only transitions (`transform`, `opacity`) settling within `180ms-250ms` (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Zero decorative scroll-reveal animations; all content is immediately accessible in the DOM.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Spatial Mode Switcher + Dedicated Sub-Routes**
  - *Chosen Approach*: Implement the three-state interactive canvas (`Portal`, `Majors Gallery`, `Certifications Arc`) on the home route synced with URL query parameters (`?view=majors`, `?view=arc`, `?search=...`), while keeping `/category/[slug]`, `/cert/[id]`, `/bookmarks`, `/privacy`, and `/terms` as full standalone Next.js pages.
  - *Why*: Delivers the exact fluid spatial experience shown in the reference video while satisfying multi-page navigation, deep linking, browser back/forward history, and full SEO/accessibility.
  - *Alternatives Considered*: Converting the entire app into a single-page modal app was rejected because it violates multi-page usability and breaks deep links to individual certifications.
- **Decision 2: Custom SVG Geometric Plates Instead of Stock Photography**
  - *Chosen Approach*: Render deterministic, discipline-specific Swiss architectural SVG plates (fine coordinate grids, concentric security rings for Cyber Security, neural lattice lines for AI, isometric cloud strata for Cloud, etc.) inside each Major column header.
  - *Why*: Eliminates AI-slop stock photos, guarantees zero broken external image URLs, loads instantaneously, and adapts cleanly across Light and Dark modes.
- **Decision 3: Client-Side LocalStorage Persistence with Strict Error Logging**
  - *Chosen Approach*: Keep bookmarks, theme, and EN/AR language state in `localStorage` wrapped in centralized helper utilities that log any storage or parsing exceptions to `console.error`.
  - *Why*: Preserves existing instant zero-login student workflow while maintaining strict error visibility.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Root Layout & Settings Context                      │
│     (Theme Light/Dark · Language EN/AR RTL · Bookmarks Sync Store)      │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────────┐     ┌───────────────────┐       ┌───────────────────┐
│   Minimalist      │     │  Spatial Canvas   │       │  Multi-Page       │
│   Top & Bottom    │     │   Home Views      │       │  Archive Routes   │
│   Utility Rails   │     └─────────┬─────────┘       └─────────┬─────────┘
│                   │               │                           │
│ · Bespoke SVG     │     ┌─────────┼─────────┐       ┌─────────┼─────────┐
│   Monogram        │     ▼         ▼         ▼       ▼         ▼         ▼
│ · Inline Search   │  ┌──────┐ ┌───────┐ ┌───────┐ ┌────┐   ┌────┐   ┌──────┐
│   Overlay         │  │Portal│ │Majors │ │Certs  │ │Cat │   │Cert│   │Saved │
│ · Mode Pill       │  │Stage │ │Columns│ │Curved │ │Page│   │Spec│   │&Legal│
│   (Majors | Arc)  │  │+Intro│ │Gallery│ │Arc    │ │Grid│   │View│   │Pages │
│ · Theme & Lang    │  │Sheet │ │+Drag  │ │+Ruler │ └────┘   └────┘   └──────┘
└───────────────────┘  └──────┘ └───────┘ └───────┘
```

### Data Model & State

- **Static Curated Datasets**:
  - `Categories`: 10 university majors (`name`, `slug`, `description`, `icon`) mapped to custom geometric plate motifs and live certification counts derived at runtime.
  - `Certifications`: Complete catalog of free industry certifications (`id`, `title`, `organization`, `category`, `categorySlug`, `duration`, `difficulty`, `description`, `skills`, `link`, `featured`).
- **Reactive Client State**:
  - `viewMode`: `'portal' | 'majors' | 'arc'` synced with URL parameters so navigation from any sub-page can jump directly to Majors or the Certifications Arc.
  - `bookmarkedIds`: Shared reactive bookmark list persisted to `localStorage` (`bookmarked_certs`) with custom storage event synchronization so bookmarking in the Arc, Card, or Detail page updates the header counter immediately.
  - `arcIndex` & `activeCategoryFilter`: Controls which certification sits at the 12 o'clock focal point of the curved arc and syncs bidirectionally with the bottom tick-mark ruler scrubber.

### Interactive Component & State Mapping

- **Portal Capsules & Hover Preview**: Pointer hover over `Majors` or `Certifications` triggers staggered typographic preview plates (`transform` + `opacity`); clicking switches `viewMode` and updates the URL query.
- **Introduction Drawer**: Toggles `isIntroOpen` boolean, sliding up a centered architectural panel over the grid canvas; pressing `Escape` or clicking the `X` pill dismisses it.
- **Horizontal Majors Track**: Pointer drag (`onPointerDown` / `onPointerMove` / `onPointerUp`) and wheel scroll translate scroll position smoothly and update the bottom tick-mark progress thumb in real time.
- **Curved Arc Dial & Ruler Scrubber**: Calculates angular offsets `(index - activeIndex) * stepAngle` along a large radius circle (`R = 900px` desktop, `R = 520px` mobile), positioning visible certification nodes along the upper arc with smooth CSS transforms. Clicking `<- Prev`, `Next ->`, dragging the bottom tick-mark track, or clicking any peripheral node centers that certification and updates the focal summary and `View Certification` link.
- **Global Search Dialog / Bar**: Accessible from every screen; typing filters certifications live across title, organization, major, and skills, allowing one-click jump to the Certification Detail view or filtering the Arc Dial directly.
