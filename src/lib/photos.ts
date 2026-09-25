import type { ImageMetadata } from 'astro';

/**
 * Photos Jaya drops into src/assets/photos/ (hero, hero-dark, shakti, jaya-ai, avatar).
 * Missing files return null so components render the CanyonArt placeholder instead of failing the build.
 */
// Only the named slots are imported; any other image in the folder stays out of the build.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/{hero,hero-dark,shakti,jaya-ai,avatar}.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
);

export function photo(name: string): ImageMetadata | null {
  const key = Object.keys(files).find((k) => {
    const base = k.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase();
    return base === name;
  });
  return key ? files[key].default : null;
}
