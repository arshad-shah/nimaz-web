import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile, mkdir } from 'node:fs/promises';

const SRC = 'src/assets/nimaz-icon.png';
const FG = 'src/assets/nimaz-foreground.webp';
const TEAL = { r: 0x14, g: 0xb8, b: 0xa6, alpha: 1 };

await mkdir('public', { recursive: true });

// Square PNG favicons / touch / pwa icons from the original icon.
const sizes = {
  'favicon-16.png': 16,
  'favicon-32.png': 32,
  'apple-touch-icon.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512,
};
for (const [name, size] of Object.entries(sizes)) {
  await sharp(SRC).resize(size, size).png().toFile(`public/${name}`);
}

// favicon.ico (16+32)
await writeFile(
  'public/favicon.ico',
  await pngToIco(['public/favicon-16.png', 'public/favicon-32.png']),
);

// Open Graph 1200x630: gradient-free teal field + centered foreground figure tile.
const tile = await sharp(FG)
  .resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .flatten({ background: TEAL })
  .extend({ top: 40, bottom: 40, left: 40, right: 40, background: TEAL })
  .png()
  .toBuffer();
await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 0x0c, g: 0x0a, b: 0x09, alpha: 1 },
  },
})
  .composite([{ input: tile, gravity: 'center' }])
  .png()
  .toFile('public/og.png');

console.log('assets generated');
