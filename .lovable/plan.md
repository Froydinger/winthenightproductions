## Why the score is stuck

The scanner doesn't read content inside collapsed `<details>` elements. Everything we hid behind the "More info" toggle (the H1, body text, FAQ, internal links, external citations) is invisible to it — which is why **Substantial text 0/8, Heading hierarchy 0/4, Internal links 0/18, External citations 0/7, FAQ 0/5** all failed despite the content existing in the DOM. To score, the content has to render visibly on first paint.

## What stays untouched

- Hero (logo, mountains, parallax, scroll-reveal slogan, "Scroll to explore")
- `WatchLatestSection` (latest episode tiles)
- `HomeShortsSection`, `CommunitySection`, `FeaturesSection`, `CTASection`
- `Header`, `Footer`
- All JSON-LD already in `index.html` (it's passing)
- Sitemap (passing — 11/11 on freshness)

## What changes — `src/components/AboutContentSection.tsx`

Rebuild the component so it renders visibly between `CTASection` and `Footer`, styled to match the rest of the lander (dark glassy cards, neon-blue accents, no `backdrop-blur` over the stars background per project rules).

### Visible structure (in order)

1. **Single visible H1** — "Win The Night™ — a mental health community for the long road of healing." Large, on-brand, only H1 on the page (Lander has none of its own).
2. **Intro prose** (~80 words) — what the show is and who it's for. Includes 2 in-prose internal links (`/watch`, `/about`).
3. **"What we talk about" H2 card** (~100 words) — topics covered. Includes 2 in-prose internal links (`/guest`, `/updates`).
4. **"Where to start" H2 card** — three small tiles linking to `/watch`, `/listen`, `/blog` with one-line descriptions. Counts as additional contextual internal links.
5. **"If tonight is hard" H2 card** (~90 words) — crisis framing with 4 external citations (988 Lifeline, Find A Helpline, NIMH, WHO) plus internal link to `/crisis-resources`.
6. **"Frequently asked questions" H2** — 5 Q&As rendered as H3 + paragraph, all visible (not in `<details>`). Keeps the existing FAQPage JSON-LD.
7. **"Last updated" timestamp** — small muted line at the bottom.

### Why this nails each failing check

| Check | Current | Fix |
| --- | --- | --- |
| Single H1 (1/5 → 5/5) | sr-only, scanner discounting it | Visible, descriptive, single |
| Heading hierarchy (0/4) | Hidden inside details | Visible H1 → H2 → H3 chain |
| Substantial text (0/8) | Hidden | ~400+ words of visible prose |
| FAQ bonus (0/5) | Hidden | 5 visible Q&As + existing schema |
| Internal links (0/18) | Hidden / footer-only | 7+ in-prose `<Link>`s in body |
| External citations (0/7) | Hidden | 4 outbound links to authority sites |

### Design treatment (below the fold, on-brand)

- Section wrapper: `relative z-10 px-4 py-16 sm:py-24`, max-w container.
- H1: gradient or solid foreground, `text-4xl sm:text-5xl`, neon-blue glow accent on the trademark.
- Body cards: `bg-background/60 border border-neon-blue/15 rounded-2xl p-6 sm:p-8`, no `backdrop-blur` (would degrade the AnimatedBackground per project memory).
- Links: neon-blue underline-offset, hover lighten.
- "Where to start" tiles: 3-column grid on `sm:`, stacks on mobile, each tile uses an icon from `lucide-react` already in the project.
- FAQ: stacked, no accordion — visible plain text so the scanner can read every Q.
- "Last updated" `<time dateTime="2026-05-21">` already passes the freshness check; keep it.

## What changes — `src/pages/Lander.tsx`

No structural change. The `AboutContentSection` is already mounted after `CTASection`; only the component's internals change. The scroll-reveal hero, mountain layers, parallax timings, and all sections above remain identical.

## What I will NOT touch

- `index.html` (JSON-LD, meta, canonical — all passing)
- `public/sitemap.xml` (11/11 freshness)
- `public/llms.txt` (3/3)
- Hero section, mountains, logo animation, slogan timing
- `WatchLatestSection`, `HomeShortsSection`, `CommunitySection`, `FeaturesSection`, `CTASection`
- `Header`, `Footer`, routes, auth, any backend

## Expected score impact

Trustworthy 3/25 → ~22/25 (internal + external links pass; llms.txt already passing). Quotable 17/25 → 25/25 (substantial text + FAQ). Understandable 17/25 → 25/25 (single H1 visible + hierarchy). Findable stays 25/25. Projected overall: **~95/100**.
