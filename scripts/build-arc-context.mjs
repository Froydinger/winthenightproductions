import ts from 'typescript';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Explicit public routes only. Never ingest admin, submissions, session state or env files.
export const routes = {
  '/': 'Lander', '/about': 'About', '/watch': 'Watch', '/watch/:chapterId': 'ChapterPage',
  '/listen': 'Listen', '/blog': 'Blog', '/blog/:postId': 'BlogPost', '/guest': 'BeOurGuest',
  '/contact': 'Contact', '/support': 'Support', '/crisis-resources': 'CrisisResources',
  '/updates': 'Updates', '/legal': 'Legal', '/privacy': 'Privacy', '/terms': 'Terms',
};
const dataKeys = new Set(['name', 'meta', 'href', 'desc', 'q', 'a', 'label', 'title', 'description', 'playlistId', 'id', 'text', 'answer']);
export function extractPublicCopy(source, filename) {
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const copy = [];
  function visit(node) {
    let value;
    if (ts.isJsxText(node)) value = node.text;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      if (ts.isPropertyAssignment(parent) && dataKeys.has(parent.name.getText(tree).replace(/['"]/g, ''))) value = node.text;
      if (ts.isJsxAttribute(parent) && ['href', 'to', 'alt', 'title', 'aria-label', 'placeholder'].includes(parent.name.text)) value = node.text;
      if (ts.isJsxExpression(parent)) value = node.text;
      // Conditional/array expressions inside JSX also contain displayed wording.
      for (let ancestor = parent; ancestor && !ts.isBlock(ancestor); ancestor = ancestor.parent) {
        if (ts.isJsxExpression(ancestor)) { value = node.text; break; }
      }
    }
    if (value?.trim()) copy.push(value.replace(/\s+/g, ' ').trim());
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return [...new Set(copy)];
}

export function extractPublicData(source, filename) {
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const groups = {};
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      const entries = node.initializer.elements.filter(ts.isObjectLiteralExpression).map(object => Object.fromEntries(
        object.properties.filter(ts.isPropertyAssignment).flatMap(property => {
          const key = property.name.getText(tree).replace(/['"]/g, '');
          return dataKeys.has(key) && (ts.isStringLiteral(property.initializer) || ts.isNoSubstitutionTemplateLiteral(property.initializer)) ? [[key, property.initializer.text]] : [];
        }),
      )).filter(entry => Object.keys(entry).length);
      if (entries.length) groups[node.name.getText(tree)] = entries;
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return groups;
}

export async function buildContext(root = new URL('../', import.meta.url)) {
  const pages = [];
  const hash = createHash('sha256');
  for (const [path, page] of Object.entries(routes)) {
    const file = `src/pages/${page}.tsx`;
    const source = await readFile(new URL(file, root), 'utf8');
    hash.update(file + source);
    pages.push({ path, source: file, copy: extractPublicCopy(source, file), data: extractPublicData(source, file) });
  }
  for (const component of ['Header', 'Footer', 'NewsletterSubscribe', 'EpisodeCard', 'EpisodeSearch', 'ShortsCarousel', 'ShortsGrid', 'InviteCTA', 'TrailerButton']) {
    const file = `src/components/${component}.tsx`;
    const source = await readFile(new URL(file, root), 'utf8');
    hash.update(file + source);
    pages.push({ path: 'shared', source: file, copy: extractPublicCopy(source, file) });
  }
  const html = await readFile(new URL('index.html', root), 'utf8');
  hash.update(html);
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';
  const publicHTML = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  pages.push({ path: 'shared', source: 'index.html', copy: [publicHTML.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()],
    links: [...publicHTML.matchAll(/href="([^"]+)"/g)].map(match => match[1]) });
  const output = { version: hash.digest('hex'), pages };
  await writeFile(new URL('netlify/lib/public-site-context.json', root), JSON.stringify(output, null, 2) + '\n');
  return output;
}
if (process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url) {
  const result = await buildContext();
  console.log(`Arc public context: ${result.pages.length} route/shared documents (${result.version.slice(0, 12)})`);
}
