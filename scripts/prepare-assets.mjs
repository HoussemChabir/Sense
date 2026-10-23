import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir, mkdtemp, rm, access } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Quality bar: every derivative is decoded and compared with its source, resized identically, using SSIMULACRA2
// (libjxl's perceptual metric). 90 = "visually lossless: impossible to distinguish from the original in a flicker
// test at 1:1". Encoder quality is searched per file for the smallest output that still reaches the bar.
// Needs `ssimulacra2` from https://github.com/libjxl/libjxl/releases on PATH, or its path in $SSIMULACRA2.
// `npm run assets -- --verify` re-scores the committed files without encoding anything.
const TARGET = 90;
const SSIMULACRA2 = process.env.SSIMULACRA2 || 'ssimulacra2';
// Widths cover phones up to 3x, Retina laptops, and 4K/5K screens; each photo also ships at its full original width.
const LADDER = [480, 640, 800, 1080, 1280, 1600, 1920, 2560, 3840];
const verify = process.argv.includes('--verify');

sharp.cache(false);
const run = promisify(execFile);
const exists = file => access(file).then(() => true, () => false);
const tmp = await mkdtemp(path.join(tmpdir(), 'sense-assets-'));

const photo = (name, input, adjust) => ({ name, input, adjust, dir: 'public/img', formats: ['avif', 'jpg'], widths: w => [...LADDER.filter(l => l < w * 0.9), w] });
const assets = [
  ...(await readdir('assets/originals')).map(f => photo(path.parse(f).name, `assets/originals/${f}`)),
  photo('beach-interlude', 'assets/source-photos/virgin-beach-original.jpg', s => s.modulate({ brightness: 1.035, saturation: 0.86 })),
  // Atlas illustrations render at most ~115 CSS px wide, so 480px covers 4x screens.
  ...(await readdir('assets/atlas')).map(f => ({ name: path.parse(f).name, input: `assets/atlas/${f}`, dir: 'public/img', formats: ['avif', 'webp'], widths: () => [480] })),
  // CSS backgrounds and masks go through Vite, which content-hashes them. The edge is stretched to 100% x 165px over the
  // hero (and 500 x 300px as the planner wash); style.css picks the variant by screen density.
  { name: 'watercolor-edge', input: 'assets/watercolor-edge.png', adjust: s => s.trim(), dir: 'src/assets', formats: ['avif', 'webp'], widths: w => [w] },
  { name: 'watercolor-edge-1x', input: 'assets/watercolor-edge.png', adjust: s => s.trim(), height: 300, dir: 'src/assets', formats: ['avif', 'webp'], widths: w => [w] },
  // Phones: the strip is <=700 CSS px wide and 145px tall, so 1440px covers the width; the height follows the density.
  { name: 'watercolor-edge-mobile', input: 'assets/watercolor-edge.png', adjust: s => s.trim(), stretch: true, dir: 'src/assets', formats: ['avif', 'webp'], widths: () => [1440] },
  { name: 'watercolor-edge-mobile-2x', input: 'assets/watercolor-edge.png', adjust: s => s.trim(), height: 290, dir: 'src/assets', formats: ['avif', 'webp'], widths: () => [1440] },
  { name: 'watercolor-edge-flipped', input: 'assets/masks/watercolor-edge-flipped.webp', dir: 'src/assets', formats: ['avif', 'webp'], widths: w => [w] },
];

let seq = 0;
const score = async (buf, refFile) => {
  const file = path.join(tmp, `${++seq}.png`);
  await sharp(buf).png({ compressionLevel: 1 }).toFile(file); // decodes to 8 bits per channel, as SDR screens show it
  try { return +(await run(SSIMULACRA2, [refFile, file])).stdout; } finally { await rm(file); }
};
// AVIF: 10-bit with full 4:4:4 chroma (sharp's default). JPEG fallback for photos: mozjpeg, 4:4:4, progressive.
// WebP (fallback for art with alpha) cannot keep full chroma when lossy, so it steps through near-lossless levels.
const encoders = {
  avif: q => s => s.avif({ quality: q, bitdepth: 10, effort: 4 }),
  jpg: q => s => s.jpeg({ quality: q, mozjpeg: true, chromaSubsampling: '4:4:4', progressive: true }),
  webp: level => s => s.webp(level < 100 ? { nearLossless: true, quality: level, effort: 6 } : { lossless: true, effort: 6 }),
};
const webpLevels = [40, 60, 80, 100];
// Output names carry a hash of the source and of every setting that shapes the pixels, so URLs can be cached forever.
const version = JSON.stringify([TARGET, LADDER, webpLevels, ...Object.values(encoders).map(String)]);

// Lowest quality whose output still scores >= TARGET: gallop from a guess, then bisect. null if even 100 fails, or
// once a failing try already weighs `limit` bytes (anything that passes would weigh more).
// ponytail: huge files accept a passing guess without probing lower; a bisect there costs minutes for a few %.
const search = async (trial, guess, greedy, limit) => {
  let lo = 0, hi = 101, best = null, hopeless = false;
  const test = async q => { const r = await trial(q); if (r.score >= TARGET) [hi, best] = [q, { ...r, q }]; else [lo, hopeless] = [q, r.buf.length >= limit]; };
  await test(guess);
  if (best && greedy) return best;
  for (let step = 1; hi > 100 && lo < 100 && !hopeless; step *= 2) await test(Math.min(100, lo + step));
  for (let step = 1; lo === 0 && hi > 1; step *= 2) await test(Math.max(1, hi - step));
  while (best && hi - lo > 1) await test((lo + hi) >> 1);
  return best;
};

// Drop EXIF/XMP (APP1), IPTC (APP13) and comments from a JPEG without touching its compressed image data.
const stripJpeg = buf => {
  const parts = [buf.subarray(0, 2)];
  for (let i = 2; i < buf.length;) {
    if (buf[i + 1] === 0xda) { parts.push(buf.subarray(i)); break; } // start of scan: the rest is image data
    const end = i + 2 + buf.readUInt16BE(i + 2);
    if (![0xe1, 0xed, 0xfe].includes(buf[i + 1])) parts.push(buf.subarray(i, end));
    i = end;
  }
  return Buffer.concat(parts);
};

const prepare = async (a, previous) => {
  const source = await readFile(a.input);
  const hash = createHash('sha256').update(version + a.adjust + a.widths + a.stretch + (a.height ?? '')).update(source).digest('hex').slice(0, 8);
  let master = sharp(source).rotate();
  if ((await sharp(source).stats()).isOpaque) master = master.removeAlpha();
  if (a.adjust) master = a.adjust(master);
  const { data, info } = await master.raw().toBuffer({ resolveWithObject: true });
  const fileName = (w, ext) => a.dir === 'src/assets' ? `${a.dir}/${a.name}.${ext}` : `${a.dir}/${a.name}-${hash}-${w}.${ext}`;
  const refs = new Map(), reference = width => refs.get(width) ?? refs.set(width, (async () => {
    const height = a.height ?? (a.stretch ? info.height : undefined); // fit: 'fill' without a height would keep the full source height
    const ref = await sharp(data, { raw: info }).resize(height ? { width, height, fit: 'fill' } : { width }).png({ compressionLevel: 1 }).toBuffer({ resolveWithObject: true });
    const file = path.join(tmp, `${a.name}-${width}.png`);
    await writeFile(file, ref.data);
    return { ...ref, file };
  })()).get(width);
  const prev = previous[a.name]?.hash === hash ? previous[a.name] : null;

  try {
    if (verify) {
      if (!prev) throw new Error(`${a.name}: outputs are missing or stale, run npm run assets`);
      for (const f of prev.files) {
        f.score = +(await score(await readFile(f.file), (await reference(f.width)).file)).toFixed(2);
        if (f.score < TARGET) throw new Error(`${f.file}: SSIMULACRA2 ${f.score} < ${TARGET}`);
      }
      return prev;
    }
    // A JPEG or WebP original is its own exact copy at full size (minus metadata), often smaller than any re-encode of it.
    const meta = await sharp(source).metadata(), originalExt = { jpeg: 'jpg', webp: 'webp' }[meta.format];
    let original = null;
    if (a.formats[1] === 'jpg' && !a.adjust && originalExt && (meta.orientation ?? 1) === 1) {
      const buf = originalExt === 'jpg' ? stripJpeg(source) : source;
      if ((await sharp(buf).raw().toBuffer()).equals(await sharp(source).raw().toBuffer())) original = { buf, ext: originalExt };
    }
    const old = Object.fromEntries((prev?.files ?? []).map(f => [f.file, f]));
    const entry = { hash, width: info.width, height: info.height, avif: [], fallback: [], files: [] };
    const guess = { avif: 88, jpg: 95 }, last = {};
    for (const width of a.widths(info.width)) {
      for (const [list, ext] of [['avif', a.formats[0]], ['fallback', a.formats[1]]]) {
        if (last[list] === 'done') continue;
        // Once a re-encode would outweigh the original, so would every larger width: the original serves those.
        if (original && last[list] && last[list].bytes * (width / last[list].width) ** 2 >= original.buf.length) { last[list] = 'done'; continue; }
        const file = fileName(width, ext);
        let r = old[file] && await exists(file) ? old[file] : null;
        if (!r) {
          const ref = await reference(width);
          const trial = async q => { const buf = await encoders[ext](q)(sharp(ref.data)).toBuffer(); return { buf, q, score: await score(buf, ref.file) }; };
          let result = null;
          if (ext === 'webp') for (const level of webpLevels) { result = await trial(level); if (result.score >= TARGET) break; }
          else result = await search(trial, guess[ext], ref.info.width * ref.info.height > 4e6, original?.buf.length);
          if (result) {
            r = { file, width: ref.info.width, height: ref.info.height, quality: result.q, score: +result.score.toFixed(2), bytes: result.buf.length };
            if (!original || r.bytes < original.buf.length) await writeFile(file, result.buf);
          }
        }
        if (original && (!r || r.bytes >= original.buf.length)) { last[list] = 'done'; continue; }
        if (!r) throw new Error(`${file}: no ${ext} quality reaches SSIMULACRA2 ${TARGET}`);
        guess[ext] = r.quality; // the next, larger width usually needs the same or a lower quality
        entry[list].push([width, ext]);
        entry.files.push(r);
        last[list] = r;
      }
    }
    if (original) {
      const file = fileName(info.width, original.ext);
      for (const list of [entry.avif, entry.fallback]) if (list.at(-1)?.[0] !== info.width) list.push([info.width, original.ext]);
      if (!entry.files.some(f => f.file === file) && [entry.avif, entry.fallback].some(l => l.at(-1).join() === `${info.width},${original.ext}`)) {
        await writeFile(file, original.buf);
        entry.files.push({ file, width: info.width, height: info.height, quality: 'original', score: +(await score(original.buf, (await reference(info.width)).file)).toFixed(2), bytes: original.buf.length });
      }
    }
    return entry;
  } finally {
    for (const ref of refs.values()) await rm((await ref).file);
  }
};

await mkdir('public/img', { recursive: true });
await mkdir('src/assets', { recursive: true });
const reportFile = 'assets/image-report.json';
const previous = JSON.parse(await readFile(reportFile, 'utf8').catch(() => '{}'));
try { await run(SSIMULACRA2, []); } catch (e) { if (e.code === 'ENOENT') throw new Error(`ssimulacra2 not found (${SSIMULACRA2}); see the comment at the top of this script.`); }

// `npm run assets -- carthage tozeur` redoes just those; the others keep their previous results.
const only = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const selected = assets.filter(a => !only.length || only.includes(a.name));
const report = Object.fromEntries(assets.filter(a => !selected.includes(a) && previous[a.name]).map(a => [a.name, previous[a.name]]));
const sorted = () => Object.fromEntries(Object.entries(report).sort(([x], [y]) => x.localeCompare(y)));
let saving = Promise.resolve(); // the report is saved after every image, so an interrupted run resumes where it stopped
// Largest sources first so the slow encodes overlap; a few in parallel keeps every core busy.
const pixels = Object.fromEntries(await Promise.all(selected.map(async a => { const m = await sharp(a.input).metadata(); return [a.name, m.width * m.height]; })));
const queue = [...selected].sort((x, y) => pixels[y.name] - pixels[x.name]);
await Promise.all(Array.from({ length: 4 }, async () => {
  for (let a; (a = queue.shift());) {
    const started = Date.now();
    report[a.name] = await prepare(a, previous);
    const files = report[a.name].files;
    console.log(`${a.name.padEnd(28)} ${String(files.length).padStart(2)} files  min SSIMULACRA2 ${Math.min(...files.map(f => f.score)).toFixed(2)}  ${(files.reduce((s, f) => s + f.bytes, 0) / 1024).toFixed(0).padStart(6)} KB  ${((Date.now() - started) / 1000).toFixed(0)}s`);
    if (!verify) saving = saving.then(() => writeFile(reportFile, JSON.stringify({ ...previous, ...sorted() }, null, 1) + '\n'));
  }
}));
await saving;
await rm(tmp, { recursive: true });
if (verify) { console.log(`All ${selected.flatMap(a => report[a.name].files).length} files score >= ${TARGET}.`); process.exit(0); }

await writeFile(reportFile, JSON.stringify(sorted(), null, 1) + '\n');
const manifest = Object.fromEntries(Object.entries(sorted()).filter(([, r]) => r.files[0].file.startsWith('public/img/')).map(([name, { width, height, hash, avif, fallback }]) => [name, { width, height, hash, avif, fallback }]));
await writeFile('src/image-manifest.json', JSON.stringify(manifest) + '\n');
const keep = new Set(Object.values(report).flatMap(r => r.files.map(f => path.basename(f.file))));
for (const file of await readdir('public/img')) if (!keep.has(file)) await rm(`public/img/${file}`);
console.log(`${keep.size} files; every one scores >= ${TARGET}.`);
