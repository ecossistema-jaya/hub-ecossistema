/** Progressive enhancements. Everything here is optional: the page works without JS. */

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

/* ---------- Theme toggle with circular View Transition ---------- */
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function applyTheme(theme: 'light' | 'dark') {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* private mode */
  }
  themeColor?.setAttribute('content', theme === 'dark' ? '#1d1310' : '#f6efe6');
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(theme === 'dark'));
  });
  document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
  btn.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  btn.addEventListener('click', (e) => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || reduced.matches) return applyTheme(next);
    const rect = btn.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => {});
  });
});

/* ---------- Reveal fallback when scroll-driven animations are unsupported ---------- */
if (!CSS.supports('animation-timeline: view()') && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  document.querySelectorAll('[data-reveal], .draw').forEach((el) => io.observe(el));
}

/* ---------- Pointer-only: spotlight borders + magnetic CTAs ---------- */
function enablePointerFx() {
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      },
      { passive: true },
    );
  });

  if (reduced.matches) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.transform = `translate(${dx * 10}px, ${dy * 8}px)`;
      },
      { passive: true },
    );
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}
if (finePointer.matches) enablePointerFx();

/* ---------- Share (Web Share API → clipboard fallback) ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-share]').forEach((btn) => {
  const status = document.getElementById(btn.dataset.status || '');
  btn.addEventListener('click', async () => {
    const data = { title: document.title, url: location.origin + location.pathname };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(data.url);
      if (status) status.textContent = 'Link copiado.';
    } catch {
      /* user cancelled */
    }
  });
});

/* ---------- Tier 2: WebGL sun, loaded after the page is idle ---------- */
if (root.dataset.tier === '2') {
  const canvas = document.querySelector<HTMLCanvasElement>('.sun-canvas');
  const hasGL = (() => {
    try {
      const gl = document.createElement('canvas').getContext('webgl2');
      gl?.getExtension('WEBGL_lose_context')?.loseContext(); // free the probe context
      return !!gl;
    } catch {
      return false;
    }
  })();
  if (canvas && hasGL) {
    const boot = () =>
      import('./sun')
        .then((m) => m.startSun(canvas))
        .catch(() => {});
    const idle = () =>
      'requestIdleCallback' in window ? requestIdleCallback(boot, { timeout: 3000 }) : setTimeout(boot, 1500);
    if (document.readyState === 'complete') setTimeout(idle, 1200);
    else addEventListener('load', () => setTimeout(idle, 1200), { once: true });
  }
}
