import sharp from 'sharp';

// Cut the three watercolour rings out of the loading-screen mockup as transparent textures.
// Usage: node scripts/extract-loader-rings.mjs   (reads assets/loader-mockup.png, writes src/assets/loader-ring-*.avif/webp)
const { data, info } = await sharp('assets/loader-mockup.png').removeAlpha().raw().toBuffer({ resolveWithObject: true });
const paper = [231.7, 214.4, 189.6]; // mean of the mockup's empty paper
const luma = ([r, g, b]) => 0.299 * r + 0.587 * g + 0.114 * b;
const [cx, cy] = [803.5, 469.5]; // flag centre; the rings are concentric with it to within ~5px
const flag = [704, 397, 904, 560]; // flag and its brownish drop shadow: never part of a ring
// [ring, inner radius, outer radius]: the boundaries run through the bare paper between the rings, so every crop is
// centred on the flag and the rings line back up when stacked at 50%, 72% and 100% of one box (style.css .loader-ring).
for (const [name, r0, r1] of [['red', 0, 200], ['sand', 200, 288], ['sea', 288, 400]]) {
  const size = 2 * r1, out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const sx = Math.round(cx - r1 + x), sy = Math.round(cy - r1 + y), r = Math.hypot(sx - cx, sy - cy);
    if (r < r0 || r >= r1 || (sx >= flag[0] && sx <= flag[2] && sy >= flag[1] && sy <= flag[3])) continue;
    const i = (sy * info.width + sx) * 3, p = [data[i], data[i + 1], data[i + 2]];
    if (sy > 800 && p[0] - p[2] > 30) continue; // the crimson wordmark just under the outer ring
    // Paper grain changes only brightness; pigment changes hue. Gating on hue leaves the grain (<= 8.4 here) behind.
    const k = luma(paper) / Math.max(1, luma(p)), hue = Math.hypot(...p.map((v, c) => v * k - paper[c]));
    const gate = Math.min(1, Math.max(0, (hue - 9) / 12));
    // Colour-to-alpha: the most transparent pigment that reproduces this pixel when laid over the paper.
    const a = Math.max(...p.map((v, c) => v < paper[c] ? (paper[c] - v) / paper[c] : (v - paper[c]) / (255 - paper[c])));
    if (!gate || !a) continue;
    const o = 4 * (y * size + x);
    for (let c = 0; c < 3; c++) out[o + c] = Math.round(Math.min(255, Math.max(0, (p[c] - (1 - a) * paper[c]) / a)));
    out[o + 3] = Math.round(255 * a * gate);
  }
  // The rings are on screen only while the hero loads, so they skip prepare-assets.mjs's visually-lossless search:
  // AVIF q50 keeps the pigment granulation at ~87 KB for all three, where that bar would cost ~250 KB.
  const ring = sharp(out, { raw: { width: size, height: size, channels: 4 } });
  await ring.clone().avif({ quality: 50, bitdepth: 10, effort: 4 }).toFile(`src/assets/loader-ring-${name}.avif`);
  await ring.clone().webp({ quality: 60, alphaQuality: 70, effort: 6 }).toFile(`src/assets/loader-ring-${name}.webp`);
}
