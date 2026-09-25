import data from '../data/links.json';

export type HubLink = {
  id: string;
  label: string;
  note?: string;
  url: string;
  badge?: string;
  hidden?: boolean;
};

export const hub = data;

const UTM = { utm_source: 'plataforma', utm_medium: 'hub' } as const;

/** Adds UTM params to outbound links. WhatsApp deep links are left untouched. */
export function track(url: string, id: string): string {
  const u = new URL(url);
  if (u.hostname === 'wa.me') return url;
  for (const [k, v] of Object.entries(UTM)) u.searchParams.set(k, v);
  u.searchParams.set('utm_content', id);
  return u.toString();
}

export const visible = <T extends { hidden?: boolean }>(items: T[]) => items.filter((i) => !i.hidden);
