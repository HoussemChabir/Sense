// Composes the illustrated "treasure map" of Tunisia from the region illustrations in
// assets/map-pieces (produced by strip-map-wording.py) and the real outline in
// assets/tunisia-outline-source.svg. Run: node scripts/build-treasure-map.mjs
import {readFile} from 'node:fs/promises';
import sharp from 'sharp';

const W = 2400, H = 1800;
// source-svg -> canvas transform
const S = 1.5, TX = 535, TY = -52;
const toCanvas = ([x, y]) => [TX + x * S, TY + y * S];

const src = await readFile('assets/tunisia-outline-source.svg', 'utf8');
const pathIn = id => src.match(new RegExp(`<g id="${id}">[\\s\\S]*?<path[^>]*d="([^"]+)"`))[1].replace(/\s+/g, ' ');
const land = pathIn('land_fill');
const tunisia = pathIn('tunisia_fill');
const polylines = [...src.matchAll(/<polyline[^>]*points="([^"]+)"/g)].map(m => m[1].trim().split(/\s+/).map(p => p.split(',').map(Number)));
const [algeriaBorder, libyaBorder, coastline] = polylines;
const west = coastline.at(-1); // where the coast meets the source frame on the Algerian side
const poly = pts => 'M' + pts.map(p => p.join(' ')).join('L');

// Land beyond the source frame (source coordinates), so the sea stops at real coasts.
const landExt = `M-380 ${west[1] + 6}Q-150 ${west[1] - 14} ${west[0] + 1} ${west[1]}L${west[0] + 3} 1250H-380Z M70 1150H760V1250H70Z M737 755C900 772 1060 805 1260 845V1250H737Z`;
const regionLines = 'M165 300C285 285 390 318 520 300M210 565C325 545 430 580 555 550M185 735C315 700 455 750 590 700M455 300C446 385 466 480 455 565M350 565C365 620 355 680 350 735';

// Real locations (source coords, same as the site atlas) and where each illustration sits on the canvas.
const regions = [
  {key: 'north',   at: [468.78, 185.67], img: [1150, 215, 455], label: ['Tunis &', 'the North'], side: 'left'},
  {key: 'history', at: [472, 355],       img: [1095, 520, 430], label: ['The Historic Heart', 'Kairouan & El Jem'], side: 'left'},
  {key: 'coast',   at: [539, 480.5],     img: [1470, 735, 430], label: ['The Mediterranean', 'Coast'], side: 'right'},
  {key: 'oasis',   at: [230.5, 592.5],   img: [905, 862, 420], label: ['Tozeur &', 'the Oases'], side: 'left'},
  {key: 'island',  at: [552, 618],       img: [1462, 1012, 420], label: ['Djerba &', 'the South'], side: 'right'},
  {key: 'sahara',  at: [337, 735],       img: [1085, 1205, 445], label: ['The Sahara'], side: 'left'},
];
const treasure = [1168, 1440];

const dataUri = async (file, width) => {
  const buf = await sharp(file).resize({width, withoutEnlargement: true}).png().toBuffer();
  const {height} = await sharp(buf).metadata();
  return {uri: `data:image/png;base64,${buf.toString('base64')}`, ratio: height / width};
};

const ink = '#5b3a1e', crimson = '#9b161d';
const out = [];
const add = s => out.push(s);

add(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <filter id="paper" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.0035" numOctaves="5" seed="11" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 .45  0 0 0 0 .27  0 0 0 0 .10  1.6 0 0 0 -.62" result="stain"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="g"/>
    <feColorMatrix in="g" type="matrix" values="0 0 0 0 .35  0 0 0 0 .22  0 0 0 0 .1  0 0 0 -.9 .62" result="grain"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="stain"/><feMergeNode in="grain"/></feMerge>
  </filter>
  <filter id="torn" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="4" seed="9" result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale="46" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="burn" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="2" result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale="60" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="22"/>
  </filter>
  <filter id="handdrawn" x="-2%" y="-2%" width="104%" height="104%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5" result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale="4" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="aged"><feColorMatrix type="matrix" values=".93 .1 .02 0 .015  .05 .9 .05 0 .01  .03 .08 .8 0 0  0 0 0 1 0"/></filter>
  <filter id="knock" x="-5%" y="-5%" width="110%" height="110%">
    <feMorphology in="SourceAlpha" operator="dilate" radius="5"/><feGaussianBlur stdDeviation="5"/>
    <feComponentTransfer result="a"><feFuncA type="linear" slope="1.6"/></feComponentTransfer>
    <feFlood flood-color="#efddb4"/><feComposite in2="a" operator="in"/>
  </filter>
  <filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
  <radialGradient id="vignette" cx="50%" cy="50%" r="72%">
    <stop offset=".55" stop-color="#6b3d17" stop-opacity="0"/><stop offset="1" stop-color="#5a2f10" stop-opacity=".55"/>
  </radialGradient>
  <mask id="sheet"><rect width="${W}" height="${H}" fill="#000"/><rect x="34" y="30" width="${W - 68}" height="${H - 64}" fill="#fff" filter="url(#torn)"/></mask>
  <mask id="sea"><rect width="${W}" height="${H}" fill="#fff"/><g transform="translate(${TX} ${TY}) scale(${S})" fill="#000"><path d="${land}"/><path d="${landExt}"/></g></mask>
  <clipPath id="country"><path transform="translate(${TX} ${TY}) scale(${S})" d="${tunisia}"/></clipPath>
`);
// concentric "water lines" hugging the coast, the classic engraved-chart look
[16, 34, 56, 84].forEach((d, i) => add(`<mask id="ring${i}"><rect width="${W}" height="${H}" fill="#000"/><g transform="translate(${TX} ${TY}) scale(${S})" fill="none" stroke-linejoin="round"><g stroke="#fff" stroke-width="${(2 * d + 3.2) / S}"><path d="${land}"/><path d="${landExt}"/></g><g stroke="#000" stroke-width="${2 * d / S}"><path d="${land}"/><path d="${landExt}"/></g></g></mask>`));
add(`</defs>
<rect width="${W}" height="${H}" fill="#24160c"/>
<g mask="url(#sheet)">
  <rect width="${W}" height="${H}" fill="#e8d3a4" filter="url(#paper)"/>
  <g mask="url(#sea)"><rect width="${W}" height="${H}" fill="#6f9c97" opacity=".26"/>`);
[.5, .38, .26, .16].forEach((o, i) => add(`<rect width="${W}" height="${H}" fill="#3f6d6c" opacity="${o}" mask="url(#ring${i})"/>`));
add(`</g>`);

// rhumb lines from the compass, as on old portolan charts
const compass = [2105, 1455];
for (let i = 0; i < 32; i++) {
  const a = i * Math.PI / 16, x2 = compass[0] + Math.cos(a) * 3200, y2 = compass[1] + Math.sin(a) * 3200;
  add(`<line x1="${compass[0]}" y1="${compass[1]}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i % 4 ? ink : crimson}" stroke-width="${i % 4 ? 1.2 : 1.8}" opacity="${i % 4 ? .13 : .2}"/>`);
}

// land: neighbours, Tunisia, borders
add(`<g transform="translate(${TX} ${TY}) scale(${S})">
  <path d="${land}" fill="#a87843" opacity=".09"/><path d="${landExt}" fill="#a87843" opacity=".09"/>
  <path d="${tunisia}" fill="#f6e7c4" opacity=".5"/>
  <path d="${tunisia}" fill="none" stroke="#c99a5c" stroke-width="${18 / S}" opacity=".35" filter="url(#soft)" clip-path="none"/>
  <g fill="none" stroke="${ink}" stroke-linecap="round" filter="url(#handdrawn)">
    <path d="${poly(coastline)}" stroke-width="${3 / S}" opacity=".85"/>
    <path d="${poly(algeriaBorder)}" stroke-width="${2.2 / S}" stroke-dasharray="${10 / S} ${7 / S} ${2 / S} ${7 / S}" opacity=".7"/>
    <path d="${poly(libyaBorder)}" stroke-width="${2.2 / S}" stroke-dasharray="${10 / S} ${7 / S} ${2 / S} ${7 / S}" opacity=".7"/>
  </g>
  <path d="${tunisia}" fill="none" stroke="${crimson}" stroke-width="${4.2 / S}" stroke-linejoin="round" filter="url(#handdrawn)"/>
</g>
<g clip-path="url(#country)"><path transform="translate(${TX} ${TY}) scale(${S})" d="${regionLines}" fill="none" stroke="#b5652f" stroke-width="${2.6 / S}" stroke-dasharray="${3 / S} ${9 / S}" stroke-linecap="round"/></g>`);

// sketched mountains and waves
const mountain = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".55"><path d="M-46 0L-18-38L0-14L16-30L46 0"/><path d="M-18-38L-12-18M-26-22L-20-12M16-30L22-14M8-20L13-10"/></g>`;
[[260, 520], [420, 640, .8], [205, 1000, .9], [470, 1130], [330, 1210, .7], [1820, 1520], [2000, 1660, .8], [1640, 1700, .7], [990, 655, .6], [1230, 1580, .55]].forEach(m => add(mountain(...m)));
const wave = (x, y, k = 1) => `<path transform="translate(${x} ${y}) scale(${k})" d="M-36 0q9-10 18 0t18 0t18 0t18 0" fill="none" stroke="#2f5b5c" stroke-width="2.6" stroke-linecap="round" opacity=".55"/>`;
[[1640, 120], [1720, 165, .8], [2050, 110], [2250, 230, .8], [1940, 330], [2180, 470], [1560, 340, .7], [2280, 640, .8], [2060, 860, .7], [380, 120, .8], [520, 150, .6], [210, 95, .7], [1900, 1000, .7]].forEach(w => add(wave(...w)));

// neighbour and sea names
const caps = (t, x, y, size, ls, font = 'Georgia', fill = ink, style = 'normal') => `<text x="${x}" y="${y}" font-family="${font}" font-style="${style}" font-size="${size}" letter-spacing="${ls}" fill="${fill}" text-anchor="middle" opacity=".78">${t}</text>`;
add(caps('ALGERIA', 360, 965, 40, 22));
add(caps('LIBYA', 1930, 1300, 40, 22));
add(caps('Mediterranean Sea', 1900, 590, 44, 3, 'Palatino Linotype', '#2f5b5c', 'italic'));

// the treasure trail, region to region, ending at the X
const pts = ['north', 'history', 'coast', 'island', 'oasis', 'sahara'].map(k => toCanvas(regions.find(r => r.key === k).at)).concat([treasure]);
let trail = `M${pts[0].join(' ')}`;
for (let i = 1; i < pts.length; i++) {
  const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], bend = i % 2 ? 90 : -90;
  const mx = (x0 + x1) / 2 + bend * (y1 - y0) / Math.hypot(x1 - x0, y1 - y0), my = (y0 + y1) / 2 - bend * (x1 - x0) / Math.hypot(x1 - x0, y1 - y0);
  trail += `Q${mx.toFixed(1)} ${my.toFixed(1)} ${x1} ${y1}`;
}
add(`<path d="${trail}" fill="none" stroke="${crimson}" stroke-width="5" stroke-dasharray="16 13" stroke-linecap="round" opacity=".8"/>`);

// illustrations
for (const r of regions) {
  const [cx, cy, w] = r.img, {uri, ratio} = await dataUri(`assets/map-pieces/map-${r.key}.png`, w * 2), h = w * ratio;
  add(`<ellipse cx="${cx}" cy="${cy + h * .36}" rx="${w * .42}" ry="${h * .1}" fill="#6b3d17" opacity=".12" filter="url(#soft)"/>`);
  // knock out the trail/outline beneath so they don't show through the multiplied art
  add(`<image href="${uri}" x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" filter="url(#knock)"/>`);
  add(`<image href="${uri}" x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" filter="url(#aged)" style="mix-blend-mode:multiply"/>`);
}

// markers, leader lines and labels (like the reference map)
for (const r of regions) {
  const [mx, my] = toCanvas(r.at), left = r.side === 'left';
  const lx = left ? 640 : 1745, end = left ? lx + 22 : lx - 22;
  const head = left ? `M${end + 14} ${my - 8}L${end} ${my}L${end + 14} ${my + 8}` : `M${end - 14} ${my - 8}L${end} ${my}L${end - 14} ${my + 8}`;
  add(`<path d="M${mx} ${my}L${end} ${my}" stroke="${crimson}" stroke-width="2.6" fill="none"/><path d="${head}" stroke="${crimson}" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`);
  add(`<circle cx="${mx}" cy="${my}" r="13" fill="#f6e7c4" stroke="${crimson}" stroke-width="3"/><circle cx="${mx}" cy="${my}" r="6" fill="${crimson}"/>`);
  const y0 = my - (r.label.length - 1) * 26 + 14;
  add(`<text font-family="Palatino Linotype" font-weight="bold" font-size="46" fill="${crimson}" text-anchor="${left ? 'end' : 'start'}">${r.label.map((t, i) => `<tspan x="${lx}" y="${y0 + i * 52}">${t.replace('&', '&amp;')}</tspan>`).join('')}</text>`);
}

// X marks the spot
add(`<g transform="translate(${treasure.join(' ')}) rotate(-6)" stroke="${crimson}" stroke-linecap="round" filter="url(#handdrawn)"><path d="M-34-34L34 34M34-34L-34 34" stroke-width="15"/></g>`);

// logo and compass assets
const logo = await dataUri('assets/map-pieces/map-logo.png', 1200), compassImg = await dataUri('assets/map-pieces/map-compass.png', 700);
add(`<image href="${logo.uri}" x="105" y="1310" width="560" height="${560 * logo.ratio}"/>`);
add(`<image href="${compassImg.uri}" x="${compass[0] - 165}" y="${compass[1] - 165 * compassImg.ratio}" width="330" height="${330 * compassImg.ratio}"/>`);

// frame, ageing and burnt edge
add(`<rect x="78" y="74" width="${W - 156}" height="${H - 148}" fill="none" stroke="${ink}" stroke-width="3" opacity=".7"/><rect x="92" y="88" width="${W - 184}" height="${H - 176}" fill="none" stroke="${ink}" stroke-width="1.2" opacity=".6"/>`);
add(`<rect width="${W}" height="${H}" fill="url(#vignette)"/>`);
add(`<rect x="34" y="30" width="${W - 68}" height="${H - 64}" fill="none" stroke="#3b1f0b" stroke-width="70" opacity=".75" filter="url(#burn)"/>`);
add(`</g></svg>`);

const svg = out.join('\n');
await sharp(Buffer.from(svg), {limitInputPixels: false}).png().toFile('assets/unused/treasure-map.png');
for (const w of [1200, 2400]) await sharp('assets/unused/treasure-map.png').resize({width: w}).webp({quality: 84}).toFile(`assets/unused/treasure-map-${w}.webp`);
console.log('treasure map written');
