// Checks every destination in src/data/links.json and prints one status line per link id.
// Usage: npm run check:links  (exit 1 when any link fails)
import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile(new URL('../src/data/links.json', import.meta.url), 'utf8'));
const TIMEOUT_MS = 20_000;
// Sites that answer automated requests with 403/429 even when up; reported as "blocked", not failed.
const BOT_WALLED = ['instagram.com', 'linkedin.com', 'tiktok.com'];

const links = [];
const add = (id, url, hidden = false) => url && links.push({ id, url, hidden });
for (const w of data.worlds) {
  add(w.primary.id, w.primary.url);
  for (const l of w.links) add(l.id, l.url, l.hidden);
}
for (const i of data.elements.items) add(i.id, i.url, i.hidden);
for (const s of data.social) add(s.id, s.url, s.hidden);
for (const r of data.restricted) add(r.id, r.url, r.hidden);
for (const q of data.quick) add(q.id, q.url, q.hidden);
add(data.tarot.id, data.tarot.url);

async function check({ url }) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (hub-ecossistema link check)' },
    });
    res.body?.cancel();
    const host = new URL(res.url).hostname;
    if (res.ok) return { state: 'ok', detail: `${res.status}` };
    if (BOT_WALLED.some((h) => host.endsWith(h))) return { state: 'blocked', detail: `${res.status}` };
    return { state: 'fail', detail: `${res.status}` };
  } catch (err) {
    return { state: 'fail', detail: err.name === 'AbortError' ? 'timeout' : err.cause?.code ?? err.message };
  } finally {
    clearTimeout(timer);
  }
}

const results = await Promise.all(links.map(async (l) => ({ ...l, ...(await check(l)) })));
const mark = { ok: 'OK     ', blocked: 'BLOCKED', fail: 'FAIL   ' };
for (const r of results) {
  console.log(`${mark[r.state]} ${r.detail.padEnd(9)} ${r.id}${r.hidden ? ' (hidden)' : ''}  ${r.url}`);
}
const failed = results.filter((r) => r.state === 'fail');
console.log(`\n${results.length} links · ${failed.length} failed · ${results.filter((r) => r.state === 'blocked').length} blocked by bot wall`);
process.exit(failed.length ? 1 : 0);
