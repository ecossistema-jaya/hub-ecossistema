// Generates favicon.svg, apple-touch-icon.png and og.jpg (1200x630) into public/.
// Uses src/assets/photos/hero.* in the OG image when present. Runs before every build.
import sharp from 'sharp';
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const pub = join(root, 'public');
const photosDir = join(root, 'src', 'assets', 'photos');

const CREAM = '#f6efe6';
const INK = '#3a2219';
const TERRA = '#9a3b22';
const SUN = '#f0c27a';

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="${CREAM}"/>
<circle cx="40" cy="24" r="9" fill="${SUN}"/>
<path d="M10 50h44M16 50V36a16 16 0 0 1 32 0v14" fill="none" stroke="${TERRA}" stroke-width="4" stroke-linecap="round"/>
</svg>`;
writeFileSync(join(pub, 'favicon.svg'), favicon);

await sharp(Buffer.from(favicon.replace('rx="14"', 'rx="0"')))
  .resize(180, 180)
  .png()
  .toFile(join(pub, 'apple-touch-icon.png'));

const heroFile = existsSync(photosDir)
  ? readdirSync(photosDir).find((f) => /^hero\.(jpe?g|png|webp|avif)$/i.test(f))
  : undefined;

const text = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs>
  <radialGradient id="s" cx="0.78" cy="0.22" r="0.6">
    <stop offset="0" stop-color="${SUN}" stop-opacity="0.9"/>
    <stop offset="1" stop-color="${CREAM}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="1200" height="630" fill="${CREAM}"/>
<rect width="1200" height="630" fill="url(#s)"/>
<text x="72" y="120" font-family="Georgia, serif" font-size="30" letter-spacing="12" fill="${INK}">JAYA ROBERTA</text>
<text x="72" y="300" font-family="Georgia, serif" font-size="92" fill="${INK}">Dois caminhos,</text>
<text x="72" y="400" font-family="Georgia, serif" font-size="92" fill="${INK}">uma Jaya.</text>
<text x="72" y="520" font-family="Arial, sans-serif" font-size="26" letter-spacing="6" fill="${TERRA}">SHAKTI JAYA  ·  JAYA AI</text>
</svg>`;

const layers = [];
if (heroFile) {
  const photo = await sharp(join(photosDir, heroFile)).resize(420, 560, { fit: 'cover', position: 'attention' }).toBuffer();
  const mask = Buffer.from(
    `<svg width="420" height="560"><path d="M0 560V210A210 210 0 0 1 420 210V560Z" fill="#fff"/></svg>`,
  );
  const arch = await sharp(photo).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  layers.push({ input: arch, left: 720, top: 70 });
}

await sharp(Buffer.from(text))
  .composite(layers)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(join(pub, 'og.jpg'));

console.log(`[assets] favicon, apple-touch-icon, og.jpg${heroFile ? ` (with ${heroFile})` : ' (no hero photo yet)'}`);
