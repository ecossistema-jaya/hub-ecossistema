import type { ImageMetadata } from 'astro';

/** Curated artwork (see scripts/curate-art.mjs). Missing slots return null so the build never fails. */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/art/**/*.jpg', { eager: true });

export function art(slot: string): ImageMetadata | null {
  return files[`/src/assets/art/${slot}.jpg`]?.default ?? null;
}
