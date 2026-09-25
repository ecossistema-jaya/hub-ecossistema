// Curates the hub's artwork from Jaya's local photo library (src/assets/photos, not versioned)
// into src/assets/art (versioned): resized to max 1800px, high-quality JPEG/PNG sources for astro:assets.
// Run after changing the picks below: `npm run art`.
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const lib = join(root, 'src', 'assets', 'photos');
const out = join(root, 'src', 'assets', 'art');
mkdirSync(join(out, 'arcanos'), { recursive: true });
mkdirSync(join(root, 'public', 'brand'), { recursive: true });

const ZG = 'zona-genialidade';
const AB = 'arcanos-brutos';

/** slot → source (relative to the photo library) */
const picks = {
  'hero-art': `${ZG}/14.png`,
  'panorama': `${ZG}/19.png`,
  'portrait': 'jaya 09.png',
  'world-shakti': `${AB}/arcano-os-amantes.png`,
  'world-ai': `${ZG}/11.png`,
  // 5 Elementos + jornadas
  'arcanos/terra': `${AB}/arcano-a-imperatriz.png`,
  'arcanos/agua': `${AB}/arcano-a-estrela.png`,
  'arcanos/ar': `${AB}/arcano-o-louco.png`,
  'arcanos/fogo': `${AB}/arcano-forca-luxuria.png`,
  'arcanos/eter': `${AB}/arcano-o-universo.png`,
  'arcanos/despertar': `${AB}/arcano-o-sol.png`,
  'arcanos/harmonia': `${AB}/arcano-a-arte.png`,
  // Tarot fan
  'arcanos/sacerdotisa': `${AB}/arcano-a-sacerdotisa.png`,
  'arcanos/mago': `${AB}/arcano-o-mago.png`,
  'arcanos/lua': `${AB}/arcano-a-lua.png`,
  'arcanos/eremita': `${AB}/arcano-o-eremita.png`,
  'arcanos/fortuna': `${AB}/arcano-a-fortuna.png`,
  'arcanos/hierofante': `${AB}/arcano-o-hierofante.png`,
};

for (const [slot, src] of Object.entries(picks)) {
  const from = join(lib, src);
  if (!existsSync(from)) {
    console.warn(`[art] missing ${src} — slot ${slot} keeps its previous file (or falls back)`);
    continue;
  }
  await sharp(from)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(out, `${slot}.jpg`));
}

// Brand marks: trimmed, resized, transparent PNG (used as CSS masks so they take theme colors).
const logos = {
  'logo-horizontal': `${ZG}/jaya-logo-horizontal-bege - remasterizado.png`,
  'logo-symbol': `${ZG}/jaya-logo-símbolo-bege.png`,
};
for (const [name, src] of Object.entries(logos)) {
  const from = join(lib, src);
  if (!existsSync(from)) continue;
  await sharp(from).trim().resize({ height: 120, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 100 }).toFile(join(root, 'public', 'brand', `${name}.webp`));
}

console.log('[art] curated', Object.keys(picks).length, 'slots');
