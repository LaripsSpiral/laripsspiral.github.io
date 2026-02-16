# AI Development Notes — Portfolio Website

> This document is a reference guide for AI assistants working on this codebase.
> It explains the project structure, design system, conventions, and patterns
> so that any new feature or fix follows the same format.

---

## 1. Tech Stack

| Layer       | Technology                                          |
| ----------- | ---------------------------------------------------- |
| Framework   | **Next.js 16** (App Router, static export via `output: 'export'`) |
| Language    | TypeScript (strict)                                  |
| Styling     | **Tailwind CSS** + inline `style` props for theme tokens |
| UI Library  | **daisyUI** (imported via Tailwind plugin)            |
| Icons       | `lucide-react`                                        |
| Fonts       | Google Fonts — loaded in `layout.tsx`                 |
| Dates       | `date-fns`                                            |
| Animation   | CSS transitions & Tailwind utilities (no external lib) |

---

## 2. Folder Structure

```
src/app/
├── (routes)/               # Next.js route groups
│   ├── about/page.tsx      # About Me page
│   ├── contact/page.tsx    # Contact page
│   ├── home/page.tsx       # Home / landing page
│   └── projects/
│       ├── page.tsx        # Projects listing page
│       └── [slug]/page.tsx # Dynamic project detail page
│
├── components/
│   ├── layout/             # Shell & navigation components
│   │   ├── PageLayout.tsx  # Main page wrapper (header, footer, nav)
│   │   └── TabNavigation.tsx
│   │
│   ├── project/            # Project/game-specific components
│   │   ├── ProjectCard.tsx       # Card component + Game/FeatureDetailItem types
│   │   ├── ProjectDetailPage.tsx # Full project detail view (Steam-style layout)
│   │   ├── ItchWidget.tsx        # Embedded itch.io widget
│   │   ├── ProjectPortfolio.tsx   # Portfolio grid showing all projects
│   │   ├── ProjectSummary.tsx     # Single project summary/overview page
│   │   ├── ProjectRouteClient.tsx # Client wrapper for [slug] route
│   │   └── ProjectsTab.tsx        # Projects listing tab with search/filter
│   │
│   ├── ui/                 # Reusable, generic UI primitives
│   │   ├── CalendarDisplay.tsx  # Date range & duration display
│   │   ├── MediaOverlay.tsx     # Fullscreen image/video/YouTube lightbox
│   │   └── ThemeBox.tsx         # Themed card, badge, heading components
│   │
│   ├── AboutTab.tsx        # About Me tab content
│   └── HomeTab.tsx         # Home tab content
│
├── data/
│   ├── gamesDB.ts          # All project entries (Game[])
│   └── personalInfo.ts     # Personal info, education, experience, skills
│
├── lib/
│   ├── project/
│   │   └── slug.ts         # createSlug() utility
│   └── youtube.ts          # YouTube URL helpers (shared)
│
├── theme/
│   └── palette.ts          # All color tokens & font constants
│
├── globals.css             # Global styles & Tailwind directives
├── layout.tsx              # Root layout (metadata, fonts, body)
└── page.tsx                # Root redirect → /home
```

---

## 3. Design System & Theming

### 3.1 Color Tokens

All colors are defined in `theme/palette.ts` as exported constants.
**Never hard-code hex colors in component files.** Always import from the palette.

Key tokens:
- `THEME_PRIMARY` — main accent color
- `THEME_PRIMARY_BORDER` — border color
- `THEME_PRIMARY_TINT` — subtle tinted background
- `THEME_COMPLEMENT_TINT` — complementary tinted background
- `THEME_PANEL_BG` — panel/card background
- `THEME_HEADER_BG` — header background
- `THEME_FONT_PRIMARY` — primary font family string
- `THEME_BADGE_*` — badge color variants (star, trophy, school, default)
- `THEME_CATEGORY_*_BG / _TEXT` — category card header colors (skills, education, experience, achievements, summary)

### 3.2 Applying Theme Colors

Colors are applied via **inline `style` props**, not Tailwind color classes:

```tsx
// ✅ Correct
<div style={{ color: THEME_PRIMARY, borderColor: THEME_PRIMARY_BORDER }}>

// ❌ Wrong — don't hard-code colors
<div className="text-blue-400 border-blue-600">
```

Tailwind is used for **layout, spacing, typography sizes, and responsive design**.
Inline styles are used for **theme colors**.

### 3.3 Typography

- Always set `style={{ fontFamily: THEME_FONT_PRIMARY }}` on root containers.
- Use Tailwind font-size classes (`text-xs`, `text-sm`, `text-base`, etc.).

### 3.4 Component Patterns

#### ThemeBox Components (`ui/ThemeBox.tsx`)
Reusable themed containers:
- `ThemeCard` — rounded card with border
- `ThemeCardHeader` — card header section
- `ThemeCardBody` — card body section
- `ThemeTitle` — section title text
- `ThemeHeading` — heading with accent color
- `ThemeDetail` — secondary detail text
- `ThemeBadge` — colored badge with tone variants (`"default"`, `"star"`, `"trophy"`, `"school"`)

#### MediaOverlay (`ui/MediaOverlay.tsx`)
Fullscreen lightbox for images, gifs, videos, and YouTube embeds.
Import `OverlayMedia` interface for the media object type.

#### CalendarDisplay (`ui/CalendarDisplay.tsx`)
Displays date ranges with optional duration calculation.
Supports `variant: 'inline' | 'stacked'` and a `scale` prop for sizing.

---

## 4. Data Model

### 4.1 Game Interface (defined in `project/ProjectCard.tsx`)

The `Game` interface is the central data type for all projects (defined in `project/ProjectCard.tsx`):

```typescript
interface Game {
  title: string;
  imageUrl: string;
  description?: string;
  status?: string;
  startDate?: string;      // Format: "MMM yyyy" (e.g., "Jan 2024")
  lastDate?: string;
  client?: string;
  role?: string;
  roleDetails?: string;
  teamMembers?: { name: string; role: string }[];
  tags?: string[];
  links?: { label: string; url: string }[];
  media?: GameMedia[];
  featureDetails?: (string | FeatureDetailItem)[];
  badges?: GameBadges;
  // ... other optional fields
}
```

### 4.2 Adding a New Project

1. Add a new `Game` object to `data/gamesDB.ts`
2. Place project images in `public/` (reference with `/filename.ext`)
3. The project automatically gets a route at `/projects/<slug>`
4. The slug is generated from the title via `createSlug()` in `lib/project/slug.ts`

### 4.3 Personal Info (`data/personalInfo.ts`)

Contains name, title, education, experience, skills, achievements, and languages.
Used by `AboutTab` and `HomeTab`.

---

## 5. Routing Conventions

- All pages use `'use client'` directive (client-side rendering)
- Page routes live in `(routes)/` route group
- Each page wraps its content in `<PageLayout>` for consistent header/nav
- Project detail pages support query params:
  - `?view=all` → Full detail view (`GameDetailPage`)
  - `?view=overview` (default) → Overview (`ProjectOverview`)
  - `?returnView=<view>` → Back button navigation context

---

## 6. Import Conventions

### Always use absolute imports (`@/app/...`) for:
- Cross-folder imports (e.g., component importing from `data/`, `lib/`, `theme/`)
- Any import that crosses folder boundaries

### Use relative imports (`./`) only for:
- Files within the same subfolder (e.g., `project/ProjectsTab.tsx` importing `./GameCard`)

### Import order:
1. React / Next.js imports
2. Third-party libraries (lucide-react, date-fns, etc.)
3. Internal utilities (`@/app/lib/...`)
4. Components (`@/app/components/...` or `./`)
5. Theme/palette imports
6. Data imports

---

## 7. Responsive Design

All components use Tailwind responsive prefixes:
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Common patterns:
  ```
  className="text-xs sm:text-sm md:text-base"
  className="px-2 sm:px-3 md:px-4"
  className="flex flex-col lg:flex-row"
  ```

---

## 8. Key Shared Utilities

| Utility | Location | Purpose |
|---------|----------|---------|
| `createSlug()` | `lib/project/slug.ts` | Generate URL-safe slugs from titles |
| `getYouTubeVideoId()` | `lib/youtube.ts` | Extract video ID from YouTube URLs |
| `getYouTubeEmbedUrl()` | `lib/youtube.ts` | Build embed URL with params |
| `getYouTubeThumbnail()` | `lib/youtube.ts` | Get thumbnail URL for a video |

---

## 9. Do's and Don'ts

### ✅ Do:
- Import colors from `theme/palette.ts`
- Use `ThemeBox` components for consistent card styling
- Use `MediaOverlay` for any fullscreen media viewing
- Use `CalendarDisplay` for date ranges
- Keep project-specific components in `components/project/`
- Keep generic UI in `components/ui/`
- Keep layout components in `components/layout/`
- Use absolute `@/app/...` imports for cross-folder references

### ❌ Don't:
- Hard-code hex colors in components
- Duplicate YouTube helper functions
- Create new media overlay implementations
- Put project-specific logic in generic UI components
- Use relative imports across folder boundaries
- Add unused imports or dead code
