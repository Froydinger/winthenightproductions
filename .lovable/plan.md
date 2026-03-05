

## Plan: Episode Grid + Featured Player for Chapter Pages

You already have a `VITE_YOUTUBE_API_KEY` secret stored. Here's the plan to replace the single playlist embed with a proper "featured player + episode grid" layout.

### 1. Create an edge function to fetch playlist items

Create `supabase/functions/fetch-playlist-items/index.ts` that:
- Accepts a `playlistId` query param
- Calls the YouTube Data API v3 `playlistItems.list` endpoint using your stored `VITE_YOUTUBE_API_KEY`
- Returns an array of `{ videoId, title, thumbnail, publishedAt }` for all items in the playlist (handles pagination if >50 items)
- Has proper CORS headers

This avoids exposing the API key to the client and sidesteps CORS issues.

### 2. Create a React hook `usePlaylistItems`

Create `src/hooks/use-playlist-items.ts`:
- Uses `@tanstack/react-query` to call the edge function
- Caches results for 10 minutes per playlist
- Returns `{ items, isLoading, error }`

### 3. Redesign ChapterPage layout

Update `src/pages/ChapterPage.tsx`:
- **Top**: Large featured player (`iframe`) showing the currently selected video (defaults to the first/newest in the playlist)
- **Below**: A responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop) of episode cards
- Each card shows: YouTube thumbnail, title, published date
- Clicking a card updates the featured player to that video (no page reload, just state change)
- The currently playing card gets a highlighted border (neon-blue)
- Show skeleton loaders in the grid while the API call is loading

### 4. Update config.toml

Add `[functions.fetch-playlist-items]` with `verify_jwt = false` since this is public data.

### Technical notes

- The YouTube Data API `playlistItems.list` endpoint returns `snippet.title`, `snippet.thumbnails`, `snippet.resourceId.videoId`, and `snippet.publishedAt` -- all we need
- The featured player iframe src changes to `https://www.youtube.com/embed/{selectedVideoId}` (single video, not videoseries)
- The specials page keeps its existing shorts section above the grid

