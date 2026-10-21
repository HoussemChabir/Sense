import sharp from 'sharp';
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const directory = 'public/assets';
await mkdir('assets/originals', { recursive: true });
const originals = (await readdir('assets/originals')).filter(name => /\.(png|jpe?g|webp)$/.test(name));
const manifest = [];
for (const filename of originals) {
  const name = path.parse(filename).name;
  const widths = name === 'hero-mobile' ? [480, 800] : name === 'hero-desktop' || name === 'oasis-panorama' ? [800, 1600] : [480, 960, 1600];
  const input = path.join('assets/originals', filename);
  const metadata = await sharp(input).metadata();
  for (const width of widths) {
    const output = `${name}-${width}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(path.join(directory, output));
    manifest.push({ name, file: output, requestedWidth: width, originalWidth: metadata.width, originalHeight: metadata.height });
  }
}
await sharp('assets/originals/watercolor-edge.png').trim().webp({ quality: 90 }).toFile(`${directory}/watercolor-edge.webp`);

const interludePhotos = [
  { name: 'beach-interlude-desktop', input: 'assets/source-photos/virgin-beach-original.jpg', widths: [800, 1600] },
  { name: 'beach-interlude-mobile', input: 'assets/source-photos/virgin-beach-original.jpg', widths: [480, 800] },
];

for (const photo of interludePhotos) {
  const metadata = await sharp(photo.input).metadata();
  for (const width of photo.widths) {
    const output = `${photo.name}-${width}.webp`;
    await sharp(photo.input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .modulate({ brightness: 1.035, saturation: 0.86 })
      .webp({ quality: 86, effort: 5 })
      .toFile(path.join(directory, output));
    manifest.push({ name: photo.name, file: output, requestedWidth: width, originalWidth: metadata.width, originalHeight: metadata.height });
  }
}

const watercolorSource = await sharp('assets/originals/watercolor-edge.png').trim().png().toBuffer();
const watercolorMetadata = await sharp(watercolorSource).metadata();
const watercolorAlpha = await sharp(watercolorSource).extractChannel(3).png().toBuffer();
const beachPigment = Buffer.from(`<svg width="${watercolorMetadata.width}" height="${watercolorMetadata.height}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pigment" x1="0" x2="1"><stop offset="0" stop-color="#276f8e"/><stop offset=".42" stop-color="#72afbd"/><stop offset=".73" stop-color="#d1a06f"/><stop offset="1" stop-color="#a93948"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#pigment)"/></svg>`);
await sharp(beachPigment)
  .ensureAlpha()
  .composite([{ input: watercolorAlpha, blend: 'dest-in' }])
  .webp({ quality: 90 })
  .toFile(`${directory}/beach-watercolor-edge.webp`);

await writeFile(`${directory}/manifest.json`, JSON.stringify(manifest, null, 2));
console.log(`Prepared ${manifest.length} responsive WebP assets, including the beach interlude.`);
