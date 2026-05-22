## Goal

Cut the repetition. One beautiful lander: hero → latest videos → shorts → one unified "About / Explore" section (icon-led, link-rich, AEO-strong) → footer. Nuke the three redundant sections that duplicate the same links and CTAs.

## What stays (untouched)

- Hero (logo, mountains, parallax, slogans, scroll callout)
- `WatchLatestSection` (latest episode tiles)
- `HomeShortsSection`
- `Header`, `Footer`, `AnimatedBackground`
- `index.html` JSON-LD, `public/sitemap.xml`, `public/llms.txt`

## What gets removed from `src/pages/Lander.tsx`

- `<CommunitySection />` block (`#community`)
- `<FeaturesSection />` block (`#features`)
- `<CTASection />` block (`#cta`)

Component files stay on disk (still used elsewhere / safe). Just removed from the lander.

## What gets rebuilt: `src/components/AboutContentSection.tsx`

Single, cohesive section that absorbs every unique link the removed sections carried, presented with icons (per request) instead of repeated card walls. Preserves all AEO wins (H1, H2/H3 hierarchy, ~500 words, internal + external links, visible FAQ + FAQPage JSON-LD).

### Structure (top → bottom)

1. **H1 header** — same headline + lede as today (the lander's only H1)

2. **Intro paragraph** (~80 words) — 2 in-prose internal links: `/watch`, `/about`

3. **"Explore everything" icon grid** (replaces Community + Features tile walls)
   One 2-col-on-mobile / 3–4-col-on-desktop grid of compact icon tiles. Each tile = lucide icon + label + 1-line desc. Absorbs every link from the nuked sections:
   - Play → `/watch` — Full episodes
   - Headphones → `/listen` — Podcast
   - Smartphone (Shorts icon) → `#shorts` — Shorts
   - BookOpen → `/blog` — Essays
   - Mic → `/guest` — Be our guest
   - Users → `/updates` — Community timeline
   - Heart / Info → `/about` — Our mission
   - LifeBuoy → `/crisis-resources` — Crisis resources
   - Youtube → `https://youtube.com/@winthenight?sub_confirmation=1` — Subscribe on YouTube (external)
   - Instagram → `https://instagram.com/win_the_night` — Instagram (external)
   - ExternalLink → `https://winthenight.blog` — Blog mirror (external)
   - NotebookPen → `https://noteily.app/` — Noteily (external)
   - MessageCircle → `https://chatwitharc.com/` — Chat with Arc (external)

4. **"What we talk about" prose card** (~100 words) — H2, no extra links (links already above)

5. **"If tonight is hard" crisis card** — H2 with 4 external citations (988, Find A Helpline, NIMH, WHO) + `/crisis-resources` internal link. Unchanged.

6. **FAQ** — H2 + 5 visible Q&As as H3 + `<p>`, FAQPage JSON-LD. Unchanged.

7. **Last updated** timestamp. Unchanged.

### Visual treatment

- Same dark / neon-blue token palette already in use (`border-neon-blue/15`, `bg-background/60`, no `backdrop-blur` per memory).
- Icon tiles: small square cards, neon-blue icon on hover-lift, subtle border glow on hover. External tiles get a tiny `↗` glyph in the corner so it's obvious they leave the site.
- Spacing tightened so the whole section reads as one continuous "About + explore" block instead of 5 stacked walls.
- Section anchor stays `#about-win-the-night`. Adds `#explore` anchor on the icon grid so existing header nav (if it points at `#community` / `#features`) can be redirected later if needed — not changing nav in this pass.

## Expected impact

- Visual: one clean below-the-fold flow instead of 4 repetitive sections.
- AEO: same content density, same link/citation/FAQ count → keeps the score we just earned.
- No business logic touched. No removed components deleted from disk.

## Out of scope

- Header nav link changes (the removed sections' anchors may now scroll to nothing; can clean up in a follow-up if desired).
- Any change to hero, videos, shorts, or footer.
