# Win The Night 🌙

**[winthenight.org](https://winthenight.org)** — the official site for Win The Night, a weekly, independent mental health podcast and community.

## Who We Are

Win The Night is hosted by **Josh Lopez** and produced by **Jake Freudinger**, co-founders of the Win The Night Foundation. We make long-form, trauma-informed conversations about the real work of healing — anxiety, depression, grief, addiction recovery, complex trauma and PTSD, inner child work, generational trauma, and neurodivergence.

We're independent and community-funded: no network, no scripted advertisers. Episodes run 45–90 minutes and publish weekly as an audio podcast, long-form YouTube videos, short clips, and written essays. Our angle is peer storytelling and honest, story-driven conversation — not quick-fix self-help, and not clinical advice.

> **Not a crisis service.** If you're in crisis in the US, call or text **988** (Suicide & Crisis Lifeline). International: [findahelpline.com](https://findahelpline.com).

## Where to Find Us

- 🎧 **Listen:** [winthenight.org/listen](https://winthenight.org/listen) · Apple Podcasts, Spotify, or any app via the [podcast RSS feed](https://api.substack.com/feed/podcast/3678939.rss)
- 📺 **Watch:** [YouTube @winthenight](https://youtube.com/@winthenight) · [winthenight.org/watch](https://winthenight.org/watch)
- ✍️ **Read:** [winthenight.org/blog](https://winthenight.org/blog)
- 🤝 **Be a guest:** [winthenight.org/guest](https://winthenight.org/guest)
- ☕ **Support the show:** [buymeacoffee.com/winthenight](https://buymeacoffee.com/winthenight)

## About This Repo

This is the source for the Win The Night website — a React + Vite + TypeScript app styled with Tailwind and shadcn/ui, deployed on Netlify with serverless functions for YouTube data and the Arc site chat.

### Local Development

```sh
npm install
npm run dev
```

For Netlify Functions locally, use the Netlify CLI:

```sh
netlify dev
```

### Environment Variables

Set these in Netlify (or a local `.env`, which is gitignored — never commit keys):

- `YOUTUBE_API_KEY` — required for playlist item/search data
- `OPENAI_API_KEY` — optional, enables Arc chat
- `OPENAI_MODEL` — optional, defaults to `gpt-5.4-nano`

Support payments are handled externally through Buy Me a Coffee.

---

Win The Night Foundation is a mental health media organization. It is not a 501(c)(3) nonprofit or registered charity, and contributions are not tax-deductible.
