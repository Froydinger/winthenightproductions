# Plan

## 1. Fix the scroll glitch on Lander (and other pages)

**Diagnosis.** `src/pages/Lander.tsx` wraps `<AnimatedBackground />` in a `motion.div` with `opacity: backgroundOpacity` that ramps from 0 → 1 mid-scroll. `AnimatedBackground` itself uses a `bg-[length:200%_200%] animate-gradient-shift` element at `-top-[100%] h-[800%]` plus three layers of 200 stars animating opacity. Animating opacity on a fixed parent that contains compositor-promoted children (`will-change: transform`) forces the browser to re-promote/repaint the whole stack each frame — that's the in-and-out flicker, and it's amplified on iOS Safari. The same root cause shows up on other pages because the AnimatedBackground gradient itself constantly animates `background-position` over an 800%-tall element.

**Fix.**
- In `Lander.tsx`, stop animating opacity on the AnimatedBackground wrapper. Render `<AnimatedBackground />` always at full opacity behind everything (z-0). Move the fade to the hero overlay above it (already fading via `heroOpacity`) so the transition is hero-fades-out → stars revealed, no parent opacity on the star layers.
- Add `isolation: isolate` + `transform: translateZ(0)` to the AnimatedBackground root so its star repaints don't bubble out.
- In `AnimatedBackground.tsx`, drop the `animate-gradient-shift` on the huge `h-[800%]` gradient (replace with a static gradient div) — the animated background-position over that area is the main repaint cost and triggers periodic compositor flicker site-wide.
- Keep parallax + star float animations; they're cheap once the gradient stops thrashing.

## 2. Crisis & Care link in global nav

In `src/components/Header.tsx`, remove the `{isHomePage && ...}` guard around both the mobile and desktop "Crisis & Care" links so they render on every page. Keep the same green styling.

## 3. WordPress-style Admin dashboard with sidebar

Refactor `src/pages/Admin.tsx` into a shell using the existing shadcn `Sidebar` (`@/components/ui/sidebar`) with `collapsible="icon"` so it shows full sidebar on desktop and collapses to a hamburger Sheet on mobile.

**Sections (one sidebar item per section, content swapped via local `activeSection` state):**
1. Overview — the 5 stat cards
2. Users — User Management table
3. Posts — Posts Management table
4. Home Page — Watch Latest Tile + CTA Featured Video
5. Watch Page — Watch Page Settings
6. About Page — About Page Content
7. Trailer Button
8. Arc Chatbot
9. Newsletter — Broadcast Email + Sent Emails

**Layout.**
```text
SidebarProvider
├── AdminSidebar (collapsible="icon")
│     SidebarGroup "Dashboard"
│       SidebarMenuItem × N (icon + label, isActive on activeSection)
└── main
    ├── header row: SidebarTrigger + page title + Shield icon
    └── section content (existing JSX moved into per-section render fns)
```

- Keep AnimatedBackground fixed behind everything (benefits from fix #1).
- Persist `activeSection` in URL hash (`#users`, `#newsletter`, …) so refresh + deep-links work.
- No business logic changes — move existing JSX/handlers into a `renderSection()` switch; data fetching stays as-is in the parent.
- Mobile: `Sidebar` already renders inside a `Sheet` automatically when viewport is small, with `SidebarTrigger` (hamburger) shown in the admin header.

## Technical notes
- New file: `src/components/admin/AdminSidebar.tsx` (sidebar menu).
- `Admin.tsx` becomes: auth/data hooks (unchanged) → `<SidebarProvider><AdminSidebar/><main>{renderSection()}</main></SidebarProvider>`.
- No DB / RLS / edge function changes.
- No new dependencies.

## Files to change
- `src/components/AnimatedBackground.tsx` — drop animated gradient, add isolation.
- `src/pages/Lander.tsx` — un-wrap AnimatedBackground from opacity motion.
- `src/components/Header.tsx` — Crisis & Care on all pages.
- `src/pages/Admin.tsx` — sidebar shell + section switcher.
- `src/components/admin/AdminSidebar.tsx` — new.
