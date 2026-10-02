# WTN Arc UI refresh — 2026-10-02

Base: 8a5e887aedf855c6ad1755171afd8d0deea32c7b, current remote main and ready production deploy 6abff9f648b4440008d91620. Authoritative source checkout: /Users/jakefreudinger/APPS/winthenightproductions (Netlify, winthenight.org).

Reconstructed requirements came from current repositories, the supplied PNG, public plugin assets on froydinger.com, and the live jakes.stream widget. No frozen conversation was accessed.

## Changes

- Match the live Arc widget: orbital white logo, dark round panel, neutral message surfaces, pill prompts, composer focus ring, expand/close controls, New chat and AI disclosure footer.
- Preserve the existing Netlify chat endpoint, model configuration, markdown, tab-session history and internal navigation. Preserves current remote’s pinned gpt-6-luna with low reasoning effort and official Mental Health Media Organization wording. No backend, credentials or provider changes.
- Preserve failed questions, offer retry without duplicate user turns, cancel pending requests when starting a new chat, ignore obsolete replies, and add a 45-second timeout.
- Add accessible names, keyboard focus loop, Escape close, IME-safe Enter handling, resilient session storage, dynamic viewport/safe-area layout and reduced-motion CSS.
- Homepage: identify Josh Lopez as host and Jake Freudinger as producer using README facts. Replace unsupported audience/episode counts and absolute free-forever claim with Watch/Listen/Read/Share cards. Remove misleading sequential chapter numbers from latest-feed rows.

## Verification

- Production build passes; changed component ESLint and git diff --check pass.
- Full ESLint: 13 errors / 10 warnings, identical on original base checkout.
- TypeScript: existing src/lib/youtube-api.ts:96 TS2677, reproduced on original base checkout.
- Codex in-app browser: local built app at 1280x720 and 390x844. Repeated close/reopen, expand/shrink, Escape, keyboard loop, send failure, rate-limit retry with no duplicate user turn, response rendering, internal About link navigation, reload persistence, New chat during pending request with no stale response.
- Successful chat and 429 response use the consumer-local wtn-qa-server.mjs fixture outside this repo; no provider calls or credentials. Production Netlify endpoint and AI delivery remain unverified.
- Local Vite preview has no Netlify functions, so feed/settings unavailable there; this is not evidence of a production outage.
- Screenshot evidence: task/wtn-desktop.png and task/wtn-mobile.png.

## Other projects / release

ChatWithArc retains existing uncommitted Voice Lab native-animation changes and QA fixtures. No changes made there. Its QA notes explicitly leave page lint comparison and release verification pending. WordPress public plugin and jakes.stream already expose the new widget design; no changes made to either.

No push, merge or deployment performed. Netlify publication needs user approval. This work does not establish that every requirement from the inaccessible conversation is fulfilled.

Publishing safety: implicit Netlify status from the original checkout resolves to askarc.chat. Explicit verified WTN target is wtnlive, a253d7a9-6c08-4f68-a294-7bac866df2f8, winthenight.org. Never use the implicit target.
