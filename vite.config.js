import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import { SITE, whatsapp, brand } from './src/content.js';
import { pages, notFounds, head, rtl } from './src/templates.js';

// Every page is index.html (with its built CSS and JS) plus the page's language, its own head tags and its markup from
// src/templates.js.
const render = (html, page) => {
  // The preloads of the hero's painted edge belong to the home page only.
  if (page.rest !== '/') html = html.replace(/\s*<link rel="preload" as="image"[^>]*>/g, '');
  return html.replace('<html lang="en">', `<html lang="${page.lang}"${rtl(page.lang) ? ' dir="rtl"' : ''}>`)
    .replace('</head>', `  ${head(page)}\n  </head>`).replace('<div id="app"></div>', page.body)
    .replaceAll(`${whatsapp}"`, `${whatsapp}?text=${encodeURIComponent(page.whatsapp)}"`);
};
// A URL's language: the not-found page of the language its path starts with.
const notFound = pathname => notFounds.find(p => p.lang !== 'en' && pathname.startsWith(`/${p.lang}/`)) ?? notFounds[0];
// Fails the build on what search engines would flag: a missing or overlong title or description, a title without the
// brand, other than one <h1>, an image without alt text, or a link to a page that does not exist.
const paths = new Set(pages.map(p => p.path));
const check = (html, page) => {
  const problems = [
    !(page.title?.length <= 65) && `title is ${page.title?.length ?? 0} characters (at most 65)`,
    !page.title?.includes(brand.name) && `title does not name ${brand.name}`,
    !(page.description?.length >= 50 && page.description.length <= 170) && `description is ${page.description?.length ?? 0} characters (50 to 170)`,
    html.match(/<h1[\s>]/g)?.length !== 1 && 'needs exactly one <h1>',
    html.includes('undefined') && 'contains "undefined"',
    ...[...html.matchAll(/<img\b[^>]*>/g)].filter(([img]) => !/\salt="[^"]+"/.test(img)).map(([img]) => `image without alt text, ${img.slice(0, 80)}`),
    ...[...html.matchAll(/\shref="(\/[^"#?.]*)["#?]/g)].filter(([, href]) => !paths.has(href)).map(([, href]) => `links to a missing page, ${href}`),
  ].filter(Boolean);
  if (problems.length) throw new Error(`${page.path}: ${problems.join('; ')}`);
};
// The photos a page shows, for the image sitemap: below-the-fold ones only get their src from main.js after load.
const photos = html => [...new Set([...html.matchAll(/<img\b[^>]*?\s(?:data-)?src="(\/img\/[^"]+)"/g)].map(([, src]) => src))];

export default defineConfig({
  // Inline only the hero's mask: the hero stays invisible until its mask loads. Other small files would be copied into the
  // render-blocking CSS several times over (the -webkit- prefixed duplicates), so they load as cached files instead.
  build: { assetsInlineLimit: file => file.endsWith('/paint-mask.svg') },
  // The trip planner's /api/brief is worker.js, run by `npm run api` (wrangler dev) next to this dev server.
  server: { proxy: { '/api': 'http://127.0.0.1:8787' } },
  plugins: [{
    name: 'pages',
    // The dev server renders the requested page (it serves index.html for every path); a build writes them all below.
    transformIndexHtml: (html, { server, originalUrl = '/' }) => { const { pathname } = new URL(originalUrl, SITE); return server ? render(html, pages.find(p => p.path === pathname) ?? notFound(pathname)) : html; },
    writeBundle({ dir }, bundle) {
      const sitemap = [];
      // Polish, Russian and Arabic pages also preload the font file with their letters (see the @font-face rules in style.css).
      const letters = {pl: 'dm-sans-latin-ext', ru: 'manrope-cyrillic', ar: 'readex-pro-arabic'};
      const preload = lang => { const font = letters[lang] && Object.keys(bundle).find(f => f.startsWith(`assets/${letters[lang]}-`)); return font ? `<link rel="preload" href="/${font}" as="font" type="font/woff2" crossorigin />\n    ` : ''; };
      for (const page of [...pages, ...notFounds]) {
        const html = render(bundle['index.html'].source, page).replace('<link rel="preload" href="/assets/dm-sans-variable', `${preload(page.lang)}$&`), file = join(dir, page.path.endsWith('/') ? `${page.path}index.html` : page.path);
        check(html, page);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html);
        if (page.index) sitemap.push(`  <url><loc>${SITE}${page.path}</loc>${photos(html).map(src => `<image:image><image:loc>${SITE}${src}</image:loc></image:image>`).join('')}</url>`);
      }
      writeFileSync(join(dir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemap.join('\n')}\n</urlset>\n`);
      // A plain-text map of the site for AI assistants (llms.txt), in English.
      writeFileSync(join(dir, 'llms.txt'), `# ${brand.name}\n\n> ${brand.description} Instagram: @${brand.handle} (${brand.instagram}). Plan and book on WhatsApp: ${brand.phone}.\n\n## Pages\n\n${pages.filter(p => p.index && p.lang === 'en').map(p => `- [${p.title.replace(` | ${brand.name}`, '')}](${SITE}${p.path}): ${p.description}`).join('\n')}\n`);
    },
  }],
});
