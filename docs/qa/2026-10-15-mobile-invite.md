# Mobile invite and latest episodes preparation

Repository: Froydinger/winthenightproductions. Base: 9dc3ca37bce2be1a4f517aca891e6786d5a59e09, matching freshly fetched origin/main.
Authoritative original checkout: /Users/jakefreudinger/APPS/winthenightproductions (main, untracked .claude/ preserved).
Changes prepared in isolated local clone /Users/jakefreudinger/Documents/Codex/2026-10-14/task-3/winthenightproductions, branch codex/wtn-invite-award.

The final user instruction superseded the floating top-left invite: USMC EVENT is now a matching hero button directly under Be Our Guest. It opens the existing event dialog, retaining the settings-based RSVP URL, calendar endpoint, event visibility and expiry. The button scrolls away with the hero. The old floating pill and its dismissal state are removed. The mobile logo is reduced to leave space for the two buttons.

Latest now uses a compact horizontal mobile heading/link row, smaller loading skeletons, readable episode secondary text and an explicit error/empty state with Try again and Watch on YouTube. Playlist requests time out after ten seconds; existing query retries remain. Playlist selection, episode order and server functions are unchanged.

## Local evidence

- npm run build: pass.
- git diff --check: pass.
- ESLint for all changed TS/TSX files: pass.
- tsc --noEmit -p tsconfig.app.json: existing TS2677 at src/lib/youtube-api.ts:96 (optional durationSeconds predicate). Reproduced identically in a clean archive of base HEAD under /tmp/wtn-base-typecheck.
- Chrome native UI: 412 x 924 device preview and desktop viewed. Event button opens existing event details; RSVP points to https://invite.social/251st-marine-corps-birthday-chicago and calendar endpoint remains. Escape closes. Mobile menu opens; Latest action closes menu and navigates to episodes. Final mobile hero screenshot shows the two matching buttons above the logo with no overlap.
- Plain Vite preview failure state exercised: compact readable message and retry/YouTube actions, rather than indefinite loading text. Netlify functions are not served by Vite preview.
- Second local static preview proxies only public site-settings and fetch-playlist-items GETs to winthenight.org. Real episode thumbnails/titles render on mobile. Public endpoint independently returned HTTP 200 with 94 items.
- Arc widget visible; no chatbot functions, model settings, auth or credentials changed. Its generated public context was rebuilt by the existing prebuild script; no live model request was made.

## Award hold and publication

AwardCallout.tsx is a separate unimported draft, labeled Nominee, Media Innovator Awards 2026, Corporate Vision; no category or Foundation recipient assertion. It is not in any route or generated public context. A search of dist for Nominee and Media Innovator Awards returns no matches. Intended placement after announcement clearance is beneath Lander hero CTAs. Status is a single removable word.

No push or Netlify publication performed. Existing docs/qa/2026-10-02-arc-widget.md says Netlify publication needs user approval. Ask approval specifically to publish the USMC EVENT and latest-episodes mobile changes to the existing wtnlive Netlify site at winthenight.org; the award draft must remain excluded until the user confirms the original notice and embargo clearance.

## Approval update

At 02:35 UTC Jake approved both prepared updates: “approve both of them tbh”. This supersedes the nominee hold only. AwardCallout is now imported in a dedicated strip between the hero and Latest. Its copy is limited to Nominee, Media Innovator Awards 2026, Corporate Vision and the official program link. Winner/category/recipient claims remain withheld. The existing public context builder now includes the callout; its regression test checks that the Nominee qualifier and program title survive extraction. All 13 offline Arc tests pass. Combined desktop preview confirms the full nominee card and populated episodes.

Netlify getSite verified explicit ID a253d7a9-6c08-4f68-a294-7bac866df2f8, name wtnlive, account froydingermedia, SSL URL https://winthenight.org and repository Froydinger/winthenightproductions. Publication uses explicit site ID, never implicit Netlify state.

## Production receipt

Published approved source d706e22f4bf5ede898d3036265f5ce038f0390da through explicit CLI target. Netlify deploy 6ad03ce50259cad152807861 is ready, published 2026-10-15T02:39:40.217Z. Receipt: https://app.netlify.com/projects/wtnlive/deploys/6ad03ce50259cad152807861 . Production URL: https://winthenight.org . CLI deploy title records the source commit; Netlify commit_ref is null for this upload. Live index asset references exactly match dist/index.html. Public settings responds with JSON and playlist returns 94 items after release. Source pushed to origin/codex/wtn-invite-award.

Local combined preview rendered Nominee, Media Innovator Awards 2026, Corporate Vision and the official link. Final post-deploy browser interaction was interrupted by concurrent user browser changes; live visual interaction remains unverified. Live HTTP/asset/function verification passed. No paid model request made.

Automatic approval review rejected advancing GitHub main as a separately unauthorized protected-branch mutation. No main push occurred. Explicit approval to update main is needed before source can be aligned there; approved source remains on the pushed release branch.
