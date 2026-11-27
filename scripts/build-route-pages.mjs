import { mkdir, readFile, writeFile } from 'node:fs/promises';

const base = 'https://winthenight.org';
const shell = await readFile('dist/index.html', 'utf8');
const routes = {
  guest: {
    title: 'Be a Podcast Guest | Win The Night',
    description: 'Share your story on an independent Chicago-area interview podcast about life, creativity, and mental health. Book a free discovery call with Josh Lopez.',
  },
  contact: {
    title: 'Sponsor an Independent Podcast | Win The Night',
    description: 'Email producer Jake Freudinger about sponsoring Win The Night, an independent Chicago-area interview podcast. Sponsorship is separate from guest booking.',
  },
};

function escape(value) {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

await mkdir('dist/_route', { recursive: true });
for (const [name, route] of Object.entries(routes)) {
  const url = `${base}/${name}`;
  const tags = {
    description: route.description,
    'og:title': route.title,
    'og:description': route.description,
    'og:url': url,
    'twitter:title': route.title,
    'twitter:description': route.description,
  };
  let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${escape(route.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]+/, `$1${url}`)
    .replace(/(<meta (?:name|property)="([^"]+)" content=")[^"]+/g, (match, prefix, key) => Object.hasOwn(tags, key) ? prefix + escape(tags[key]) : match)
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (match, data) => {
      const item = JSON.parse(data);
      if (item['@type'] === 'FAQPage') return '';
      if (item['@type'] !== 'WebPage') return match;
      return `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org', '@type': name === 'contact' ? 'ContactPage' : 'WebPage',
        name: route.title, description: route.description, url, inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', name: 'Win The Night', url: base + '/' },
      })}</script>`;
    });
  if (!html.includes(`rel="canonical" href="${url}"`)) throw new Error(`Route metadata failed to render ${name}`);
  await writeFile(`dist/_route/${name}.html`, html);
}
