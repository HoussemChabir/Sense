import { defineConfig } from 'vite';
import manifest from './src/image-manifest.json';
import { base, srcset, heroSources } from './src/images.js';

// The page is rendered by JS, so the HTML preloads the hero photo (same candidates as the <picture>) to download alongside it.
const [ogWidth, ogExt] = manifest['hero-desktop'].fallback.find(([w]) => w >= 1200);
export default defineConfig({
  // Inline only the hero's mask: the hero stays invisible until its mask loads. Other small files would be copied into the
  // render-blocking CSS several times over (the -webkit- prefixed duplicates), so they load as cached files instead.
  build: { assetsInlineLimit: file => file.endsWith('/paint-mask.svg') },
  plugins: [{
    name: 'hero-preload',
    transformIndexHtml: () => [
      ...heroSources.map(({ name, media, sizes }) => ({ tag: 'link', attrs: { rel: 'preload', as: 'image', type: 'image/avif', imagesrcset: srcset(name, 'avif'), imagesizes: sizes, media, fetchpriority: 'high' }, injectTo: 'head' })),
      { tag: 'meta', attrs: { property: 'og:image', content: `${base('hero-desktop', ogWidth)}.${ogExt}` }, injectTo: 'head' },
    ],
  }],
});
