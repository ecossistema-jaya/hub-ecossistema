// Generates favicon.svg, apple-touch-icon.png and og.jpg (1200x630) into public/ in the SAND identity.
// Inputs (optional, build never fails without them): src/assets/art/hero-art.jpg, art/portrait.jpg, public/brand/logo-symbol.png.
import sharp from 'sharp';
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const pub = join(root, 'public');
const artDir = join(root, 'src', 'assets', 'art');

const PAPER = '#f4eee4';
const INK = '#152d38';
const RUST = '#a5482a';
const TEAL = '#0f2e3a';
const GOLD = '#f4cf85';

// Favicon: gold compass-star on teal (SAND circle motif), crisp at 16px.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<circle cx="32" cy="32" r="31" fill="${TEAL}"/>
<circle cx="32" cy="32" r="24" fill="none" stroke="${GOLD}" stroke-width="1.5" stroke-dasharray="2 3"/>
<path d="M32 10 36 28 54 32 36 36 32 54 28 36 10 32 28 28Z" fill="${GOLD}"/>
</svg>`;
writeFileSync(join(pub, 'favicon.svg'), favicon);

const symbol = join(pub, 'brand', 'logo-symbol.webp');
const touchBase = sharp({ create: { width: 180, height: 180, channels: 4, background: TEAL } });
if (existsSync(symbol)) {
  const mark = await sharp(symbol).resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await touchBase.composite([{ input: mark, gravity: 'center' }]).png().toFile(join(pub, 'apple-touch-icon.png'));
} else {
  await sharp(Buffer.from(favicon)).resize(180, 180).png().toFile(join(pub, 'apple-touch-icon.png'));
}

// OG image: paper + text left, portal artwork dissolving on the right, portrait in a double-ring circle.
const text = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="${PAPER}"/>
<text x="72" y="118" font-family="Georgia, serif" font-size="24" letter-spacing="10" fill="${INK}">JAYA ROBERTA</text>
<line x1="72" y1="140" x2="160" y2="140" stroke="${RUST}" stroke-width="2"/>
<text x="72" y="280" font-family="Georgia, serif" font-size="80" fill="${INK}">Inteligência</text>
<text x="72" y="370" font-family="Georgia, serif" font-size="80" fill="${INK}">Relacional<tspan fill="${RUST}">.</tspan></text>
<text x="72" y="470" font-family="Arial, sans-serif" font-size="22" letter-spacing="6" fill="${RUST}">SHAKTI JAYA  ·  TAROT  ·  JAYA AI</text>
<text x="72" y="540" font-family="Georgia, serif" font-size="18" letter-spacing="8" fill="#6f655c">JAYA, ENTRE MUNDOS</text>
</svg>`;

const layers = [];
const heroArt = join(artDir, 'hero-art.jpg');
if (existsSync(heroArt)) {
  const art = await sharp(heroArt).resize(700, 630, { fit: 'cover', position: 'centre' }).toBuffer();
  const fade = Buffer.from(
    `<svg width="700" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.35" stop-color="#fff"/></linearGradient></defs><rect width="700" height="630" fill="url(#g)"/></svg>`,
  );
  layers.push({ input: await sharp(art).composite([{ input: fade, blend: 'dest-in' }]).png().toBuffer(), left: 500, top: 0 });
}
const portrait = join(artDir, 'portrait.jpg');
if (existsSync(portrait)) {
  const size = 170;
  const face = await sharp(portrait).resize(size, size, { fit: 'cover', position: 'top' }).toBuffer();
  const circle = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`);
  const round = await sharp(face).composite([{ input: circle, blend: 'dest-in' }]).png().toBuffer();
  const ring = Buffer.from(
    `<svg width="200" height="200"><circle cx="100" cy="100" r="96" fill="${PAPER}" stroke="#9a7a5c" stroke-dasharray="2 3"/><circle cx="100" cy="100" r="99" fill="none" stroke="#d9cebd"/></svg>`,
  );
  layers.push({ input: ring, left: 960, top: 400 }, { input: round, left: 975, top: 415 });
}

await sharp(Buffer.from(text)).composite(layers).jpeg({ quality: 84, mozjpeg: true }).toFile(join(pub, 'og.jpg'));
console.log('[assets] favicon, apple-touch-icon, og.jpg');
