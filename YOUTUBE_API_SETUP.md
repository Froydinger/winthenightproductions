# YouTube API Setup Guide

This project uses the YouTube Data API v3 to fetch and display recent shorts from your channel.

## Getting Your YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

## Configuration

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your YouTube API key to `.env`:
   ```
   VITE_YOUTUBE_API_KEY=your_actual_api_key_here
   ```

3. Find your YouTube Channel ID:
   - Go to your YouTube Studio
   - Click on "Settings" > "Channel" > "Advanced settings"
   - Copy your Channel ID

4. Update the Channel ID in `src/lib/youtube.ts`:
   ```typescript
   const CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE';
   ```

## How It Works

- The app fetches recent videos from your channel
- Filters for shorts (videos 60 seconds or less)
- Displays the 6 most recent shorts in a grid
- Falls back to a "View on YouTube" button if API fails or no API key is set

## API Quota

The YouTube Data API has a daily quota limit. Each request costs quota points:
- Search: 100 points
- Videos list: 1 point
- Daily quota: 10,000 points

This implementation uses ~101 points per page load. You can make ~99 loads per day.

To optimize quota usage, consider:
- Implementing caching (localStorage or Redis)
- Only fetching when user clicks "Load Shorts"
- Using a backend server to cache API responses

## Fallback Behavior

If the API key is not set or the API fails:
- The component will show a "Watch Shorts on YouTube" button
- Clicking it opens your shorts feed in a new tab
- No errors are shown to users
