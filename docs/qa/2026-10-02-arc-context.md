# WTN Arc public context and episode retrieval

Prepared on 2026-10-02 from main fecb5f3. No frozen-chat recovery was used.

## Behavior

- The widget sends its current pathname on every request. Server allowlists public routes; admin/auth routes, arbitrary origins, query strings, private form/session data and unknown stored settings are excluded.
- `npm run build` and `build:dev` regenerate `netlify/lib/public-site-context.json` from current public route JSX text, visible string expressions, resource/chapter data, shared public components and static public HTML. This is authored public copy, including conditional wording, rather than a screenshot or client DOM scrape. New routes/components must be added to the explicit allowlist. Dynamic public settings override defaults; source availability is reported in context.
- All public page documents and navigation are supplied alongside current-page identity. The current public Substack post body is included when its GUID matches the route; the public article catalogue and relevant article bodies are available across the site. Feed posts are public RSS content, with no authenticated or paywall crawl.
- Existing server-side YouTube playlistItems integration supplies the podcast catalogue and requested/current chapter catalogue, including titles, descriptions, true video publish dates and exact video links. At most eight relevant descriptions accompany the full title catalogue. Descriptions are not transcripts; no caption/audio ingestion is claimed.
- Playlist cache lasts at most 60 seconds per warm function; playlist and feed reads have 7-second deadlines. Settings use strong reads. Public context is limited to 250,000 serialized characters; oversized context fails explicitly instead of silently presenting a complete answer.
- Responses use the existing server-side OPENAI_API_KEY, pinned gpt-6-luna, structured role messages and `store: false`. Existing YOUTUBE_API_KEY remains server-side. Neither keys nor provider response bodies are logged. No new credentials, access scope or provider were introduced.
- Resource replies include WTN's `/crisis-resources` directory. Imminent-risk guidance prioritizes emergency services/988/international human help; WTN content complements that support. A deterministic safety fallback remains available when the provider is unavailable. No sensitive safety test was sent to a provider.
- Legacy Lambda Blobs initialization now calls the installed SDK's documented connectLambda bridge. The existing live site-settings endpoint had returned MissingBlobsEnvironmentError; this caused chat to fall back silently to defaults. No stored settings or admin authorization rules were changed.

## Local verification

- `npm run test:arc`: 12 tests pass, using injected offline provider/API fixtures. Covers public-route boundaries, build copy updates, episode number/guest/topic matches, changed public settings/catalogue, retrieval failure, chapter mapping, current post body, YouTube metadata/pagination/hidden items, structured provider evidence, resource navigation, synthetic crisis failure/omission, malformed/oversized requests and rate limits.
- Changed-file ESLint, focused Netlify TypeScript check and `git diff --check` pass.
- `npm run build` passes. Function bundles to CommonJS with installed Vite esbuild; bundled handler imports successfully.
- Actual existing public API previously returned 94 podcast entries. Current public Substack feed parses 20 entries, of which five are articles; canonical links use www.winthenight.blog.
- Codex in-app browser, offline integrated handler: neutral episode send on `/about`; directory link navigates within app with chat preserved; subsequent request has `/crisis-resources` context. Reload and repeated open/close preserve messages. At 390x844 expanded panel is x12/y12, width366/height820; shrink/close/reopen preserve messages. Screenshots are consumer workspace `wtn-context-desktop.png` and `wtn-context-mobile.png`; replies are explicitly synthetic.
- Existing repository-wide lint issues and youtube-api.ts TS2677 are unchanged from the earlier UI baseline.

## Deployment gate

These checks establish local packaging/context wiring, not live AI accuracy. Before claiming release completion: verify correct wtnlive Netlify target at winthenight.org, deployment receipt/commit, site-settings GET, playlist descriptions, then neutral live episode-specific and current-page/resource questions. Crisis cases remain offline synthetic tests. This backend preparation does not itself publish; the earlier UI release fecb5f3 is already live.
