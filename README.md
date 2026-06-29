# Win The Night Productions

React/Vite site for Win The Night, configured for Netlify.

## Local Development

```sh
npm install
npm run dev
```

For Netlify Functions locally, use Netlify CLI:

```sh
netlify dev
```

## Netlify Environment Variables

- `YOUTUBE_API_KEY`: required for playlist item/search data.
- `OPENAI_API_KEY`: optional, enables Arc chat.
- `OPENAI_MODEL`: optional, defaults to `gpt-5.4-nano`.

Support payments are handled externally at `https://buymeacoffee.com/winthenight`.
