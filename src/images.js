import manifest from './image-manifest.json';

// Photos ship as AVIF (10-bit, 4:4:4) with a JPEG fallback, illustrations with alpha as AVIF with a WebP fallback, at
// widths up to the full original; a JPEG/WebP original itself tops a list when it is smaller than re-encoding it.
// scripts/prepare-assets.mjs makes them (and the manifest) and checks each against its source.
export const base = (name, width) => `/img/${name}-${manifest[name].hash}-${width}`;
export const srcset = (name, list) => manifest[name][list].map(([w, ext]) => `${base(name, w)}.${ext} ${w}w`).join(', ');

// `sizes` for an object-fit: cover slot: unless the browser fetches max(slot width, slot height x image aspect) device
// pixels, the visible crop is upscaled. Ranges mirror style.css, narrowest viewport first:
// [max viewport width, [vw share, px] slot width, slot height in px, or { ratio } for an aspect-ratio box].
export const coverSizes = (name, ranges) => {
  const aspect = manifest[name].width / manifest[name].height, out = [];
  const length = (k, c) => { const vw = Math.ceil(k * 1e4) / 100, px = Math.ceil(c); return !vw ? `${px}px` : !px ? `${vw}vw` : `calc(${vw}vw ${px < 0 ? '-' : '+'} ${Math.abs(px)}px)`; };
  let min = 0;
  for (const [max, [k, c], h] of ranges) {
    if (h.ratio) { const f = Math.max(1, aspect / h.ratio); out.push([max, length(k * f, c * f)]); }
    else {
      const x = k ? (aspect * h - c) / k : c >= aspect * h ? -Infinity : Infinity; // viewport where the width starts to rule
      if (x > min) out.push([Math.min(x, max), length(0, aspect * h)]);
      if (x < max) out.push([max, length(k, c)]);
    }
    min = max;
  }
  return out.filter(([, l], i) => l !== out[i + 1]?.[1]).map(([max, l], i, all) => i < all.length - 1 ? `(max-width: ${Math.ceil(max)}px) ${l}` : l).join(', ');
};
// Detail-page photos fill the viewport: on screens narrower than the photo's aspect, its height decides the width.
export const fullBleedSizes = name => { const { width, height } = manifest[name]; return `(max-aspect-ratio: ${width}/${height}) ${Math.ceil(100 * width / height)}vh, 100vw`; };

export const slots = {
  // Experience tiles: 340px tall on phones; three 1.45:1 tiles in the 1320px shell above 700px.
  tile: [[700, [1, 0], 340], [1320, [1 / 3, -28 / 3], { ratio: 1.45 }], [Infinity, [0, 1292 / 3], { ratio: 1.45 }]],
  // Adventure: 340px tall up to 850px (full width on phones, the 2fr column on tablets), then 2.6:1.
  adventure: [[700, [1, 0], 340], [850, [2 / 3, -12], 340], [1320, [2 / 3, -12], { ratio: 2.6 }], [Infinity, [0, 868], { ratio: 2.6 }]],
  journey: [[700, [1, -20], { ratio: 1.5 }], [850, [1 / 3, -8], { ratio: 1.5 }], [1320, [1 / 3, -12], { ratio: 1.5 }], [Infinity, [0, 428], { ratio: 1.5 }]],
  galleryLead: [[700, [1, -20], 330], [Infinity, [2 / 3, -116 / 3], 634]],
  gallery: [[700, [1 / 2, -15], 190], [Infinity, [1 / 3, -58 / 3], 310]],
  interlude: [[700, [1, 2], 750], [974, [1, 2], 760], [1538, [1, 2], { ratio: 1 / 0.78 }], [Infinity, [1, 2], 1200]],
};
// The hero is art-directed (portrait crop up to 700px); vite.config.js preloads the same candidates from index.html.
export const heroSources = [
  { name: 'hero-mobile', media: '(max-width: 700px)', sizes: coverSizes('hero-mobile', [[360, [1, 0], 850], [Infinity, [1, 0], 890]]) },
  { name: 'hero-desktop', media: '(min-width: 701px)', sizes: coverSizes('hero-desktop', [[850, [1, 0], 760], [960, [1, 0], 720], [1200, [1, 0], { ratio: 4 / 3 }], [1599, [1, 0], 900], [Infinity, [1, 0], 980]]) },
];

// For browsers without srcset.
export const fallbackSrc = name => { const list = manifest[name].fallback, [w, ext] = list.find(([w]) => w >= 1080) ?? list.at(-1); return `${base(name, w)}.${ext}`; };
// AVIF first, then the fallback; picture.media is display:contents so the img stays the layout box.
// `defer` parks the URLs in data- attributes, for main.js to restore once the page has loaded.
export const picture = (name, sizes, attrs, cls = 'media', defer = false) => {
  const { width, height } = manifest[name], d = defer ? 'data-' : '';
  return `<picture class="${cls}"><source type="image/avif" ${d}srcset="${srcset(name, 'avif')}" sizes="${sizes}"/><img ${d}src="${fallbackSrc(name)}" ${d}srcset="${srcset(name, 'fallback')}" sizes="${sizes}" width="${width}" height="${height}" ${attrs}/></picture>`;
};
