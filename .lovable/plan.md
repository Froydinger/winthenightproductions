## Adding this last minute so ALSO: Put JUST the old cta back under all FAQ (the one with the video that the admin dash has the slot for) below everything above footer on lander

&nbsp;

## Main Goal

A real, ground-up redesign that makes the entire public site feel like one product — same architectural rhythm as the new lander About/Explore section: editorial spacing, neon-blue accent system, restrained glass cards, icon-led headings, no glass-blur, no random gradient backgrounds. Every information element from the old pages survives — the structure around it changes.

## The design system (built first, used by every page)

### 1. Tokens (`src/index.css`)

Add a small set of named surface + shadow tokens so cards/heroes match without per-page guesswork:

- `--surface-card`: `hsl(var(--background) / 0.6)`
- `--surface-card-strong`: `hsl(var(--background) / 0.8)`
- `--border-neon-soft`: `hsl(var(--neon-blue) / 0.15)`
- `--border-neon-mid`: `hsl(var(--neon-blue) / 0.4)`
- `--shadow-neon-soft`: `0 0 40px -20px hsl(var(--neon-blue) / 0.35)`
- `--shadow-neon-glow`: `0 0 30px -10px hsl(var(--neon-blue) / 0.5)`

### 2. Shared primitives (`src/components/site/`)

Built once, imported by every restyled page. They define the structure, not just styling:

- `PageShell` — `<main>` + fixed `AnimatedBackground` + `Header` + `Footer` + scroll-to-top. Replaces the 10+ copies of this boilerplate.
- `PageHero` — icon-in-glow-ring + eyebrow + H1 (neon-blue accent on key word, drop-shadow) + lede + optional CTA row. One canonical hero.
- `SectionHeader` — small icon + eyebrow + H2 + optional sub-lede. Used between sections.
- `SiteCard` — the lander's card. Variants: `default`, `feature` (with icon slot), `quote`, `media` (for video embeds), `alert` (red, for crisis).
- `IconTile` — the lander's icon link tile. Used wherever a page lists links/resources.
- `Prose` — typography wrapper for long-form copy (Legal/Privacy/Terms).
- `siteLinkCls` — the canonical neon-blue underline.

### 3. Guiding rhythm (applied to every restyled page)

```
PageShell
  PageHero            (icon + brand H1 + lede + 1–2 CTAs)
  Container max-w-4xl, space-y-12 sm:space-y-16
    ┌ Intro card (SiteCard)
    ┌ Section: SectionHeader + (IconTile grid | SiteCard list | media)
    ┌ Section: ...
    ┌ Closing card / CTA
```

No more bespoke `border-2 border-neon-blue/30 ring-1 ring-neon-blue/20 bg-gradient-to-br from-card/60` per-section snowflakes. No `backdrop-blur` over `AnimatedBackground`.

## Crisis link audit (runs first, in build mode)

Before any redesign code, `curl -I` every external URL on `/crisis-resources`:
988lifeline, crisistextline, samhsa disaster + national helpline, thehotline, rainn, lgbthotline, thetrevorproject, translifeline, strongheartshelpline, aa, na, smartrecovery, findtreatment, childhelp, sakitta, cancer, mesothelioma, hrc.

Replace only the dead ones with the org's current canonical URL. Phone numbers untouched. Report all results in chat.

## Per-page redesigns (info preserved, structure rebuilt)

Each page is **rewritten from scratch** on top of the new primitives — not just restyled in place.

### `src/pages/About.tsx`

- New rhythm: Hero → "Our mission" intro card → "How we do it" 3-up IconTile grid (Conversations/Connections/Lessons & Insights — same copy) → "The heart of our mission" video card → "The founders" two-up bio cards + pull-quote card → "Featured episode" video card → "Join the community" closing CTA card.
- Founder bios still hydrated from `watch_settings`. Video IDs untouched.

### `src/pages/CrisisResources.tsx`

- Hero: red-tinted urgency banner with "Need help now?" + Call/Text 988 buttons (kept red — emergency).
- "Crisis management" → red-accent `IconTile` grid (still red because emergency tier).
- All other categories (Substance use, Survivors, Cancer support, LGBTQ+ resources) → neon-blue `IconTile` grids under `SectionHeader`s.
- Intro disclaimer → `SiteCard`.
- All copy and link order preserved.

### `src/pages/Listen.tsx`, `src/pages/Contact.tsx`, `src/pages/BeOurGuest.tsx`, `src/pages/Support.tsx`

- Each rebuilt: PageHero + content cards. Forms stay functionally identical (same fields, same handlers, same validation, same submit endpoints) — wrapped in `SiteCard`, inputs restyled to match the system.
- Listen: platform-link section becomes `IconTile` grid (Spotify, Apple, YouTube, etc. — keep current platforms).
- Support: Pro Supporters Wall data fetch + tier copy preserved; only the surrounding cards/buttons get the system treatment.

### `src/pages/Updates.tsx`

- Header → PageHero. Feed item shells → `SiteCard`. Composer form preserved with new card styling.
- Cloud media, profile, like/comment/share logic untouched.

### `src/pages/Blog.tsx`

- Header → PageHero. Each post preview becomes an `IconTile`-derived card variant with thumbnail + title + excerpt. Substack edge function & data flow untouched.

### `src/pages/Legal.tsx`, `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`

- PageHero + single `SiteCard` wrapping `Prose` long-form. Headings inside prose normalized to the system.

## Not touched

- `Lander.tsx` (already the source of truth)
- `Watch.tsx`, `ChapterPage.tsx` (purpose-built media UIs; reskinning risks the player)
- `BlogPost.tsx` (article reader — uses sanitized HTML)
- `Dashboard.tsx`, `Admin.tsx`, `GuestPortal.tsx` (auth-gated tools, separate UX)
- `ResetPassword.tsx`, `Unsubscribe.tsx`, `NotFound.tsx`, `Index.tsx` (utility surfaces)
- `Header`, `Footer`, `AnimatedBackground` (already shared)
- All business logic, data fetching, forms, auth, Stripe, edge functions, routing

## Order of execution in build mode

1. Audit crisis links, report findings.
2. Add tokens to `index.css`.
3. Build `src/components/site/` primitives.
4. Rewrite About (smallest blast radius, validates the system).
5. Rewrite CrisisResources (applies emergency variant).
6. Rewrite Legal / Privacy / Terms (pure prose — fastest).
7. Rewrite Contact / BeOurGuest / Support / Listen.
8. Rewrite Updates and Blog last (highest risk — most dynamic).
9. Smoke-test each route in the preview after rewriting.

## Risks & mitigations

- Forms break: rewrites preserve every field name, handler, and submit call verbatim; smoke-test each form path.
- Dynamic feeds (Updates/Blog) break: keep the data hook + render contract; only the JSX shell changes.
- Crisis page emergency tier must still read as urgent — keep red accents for that one section.
- This is a large diff. Per-page commits via separate file rewrites so a single broken page doesn't take down the others.

## Out of scope

- Copy / information changes (except dead crisis-link URL swaps)
- Header / Footer / nav structure changes
- New routes, new features, new data, new fonts
- Lander, Watch, ChapterPage, BlogPost, admin/auth/utility surfaces