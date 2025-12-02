# YouTube Shorts Integration

## How It Works

The shorts carousel uses YouTube's public RSS feed to fetch your recent videos and displays them with `/shorts` URLs.

**Live URL:** `https://www.youtube.com/feeds/videos.xml?user=winthenight`

## Features

✅ No API key required
✅ No quota limits
✅ Fetches 6 most recent videos
✅ Displays with `/shorts/VIDEO_ID` URLs
✅ Shows thumbnails and titles
✅ Click to play in modal
✅ Fallback to YouTube shorts page if RSS fails

## Implementation

- **File:** `src/lib/youtube.ts`
- **Component:** `src/components/ShortsCarousel.tsx`
- **Feed:** Uses DOMParser to parse XML RSS feed
- **Display:** Grid layout (2/3/6 columns responsive)

## Important Note

YouTube's RSS feed doesn't distinguish between shorts and regular videos. This implementation shows the **6 most recent videos** from your channel formatted as shorts URLs.

**Best practices:**
- If you only upload shorts, this works perfectly
- If you mix shorts and regular videos, consider:
  - Uploading shorts separately from long videos
  - Or manually filtering in the code
  - Or using YouTube Data API v3 to check durations

## Channel Configuration

Update your channel handle in `src/lib/youtube.ts`:

```typescript
const CHANNEL_ID = '@winthenight'; // Your channel handle
```

## Testing RSS Feed

Test your RSS feed directly:
```
https://www.youtube.com/feeds/videos.xml?user=winthenight
```

Or with channel ID:
```
https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_CHANNEL_ID
```
