# Hub do Ecossistema Jaya — Catálogo de Efeitos, Bibliotecas e Performance

**Data:** 24/09/2026 · **Status:** pesquisa concluída, arquitetura aguardando aprovação
**Fontes:** 3 frentes de pesquisa paralelas (sites vivos, catálogo de efeitos, performance mobile) + `inventario-2026-09-16/ativos.csv` + `reconciliacao-jaya-hub-page/DESIGN.md`.

> Ressalva: versões e tamanhos vieram de pesquisa web em set/2026. Onde as fontes divergem, está marcado **[conflito]**; checar em `npm view` / caniuse antes da implementação.

---

## 1. O que o hub precisa servir

### 1.1 Leitura dos sites vivos

| Site | O que é hoje | CTA real | Stack |
|---|---|---|---|
| shaktijaya.com.br | Terapia de casal, "Arquitetura Relacional dos 5 Elementos™" | "Descobrir meu elemento" (`/quiz1`) | Vite/React (Jaya_Hub_Page) |
| jayaroberta.com | Redireciona para `/login` — área do aluno "Claude do Zero" | Entrar com Google | Next.js/Vercel |
| jayaroberta.com.br | Marca "Business Jaya"; home hoje = masterclass "Primeira Conversa" (26/09/2026) | Garantir minha vaga | Next.js/Vercel |

**Achados:**
- `jayaroberta.com` raiz cai em login: o card do hub deve apontar para a **oferta** (`/claude`), não para a raiz.
- `jayaroberta.com.br` troca de campanha na home: o card precisa de texto que não envelheça com a campanha.
- shaktijaya.com.br carrega Meta Pixel **2×**, um deles com domínio `localhost` (fora do escopo; possível dupla contagem de eventos).
- Fontes: jayaroberta.com já usa **Petrona + Jost**, o mesmo par do DESIGN.md da Shakti. Há continuidade tipográfica real entre as duas marcas.

### 1.2 Inventário: o ecossistema já tem 2 hubs

`ativos.csv` classifica 49 ativos: **Shakti** (24), **Jaya AI** (16), **Operação** (8, interno), Academia Lendária (1).

Candidatos públicos para o hub (selecionados por Jaya em 24/09):

| Mundo | Ativo | URL | Acesso |
|---|---|---|---|
| Shakti | Shakti Jaya (site) | https://www.shaktijaya.com.br/ | Público |
| Shakti | Quiz dos 5 Elementos | https://www.shaktijaya.com.br/quiz1 | Público |
| Shakti | Ayla IA | https://www.shaktijaya.com.br/ayla-ai | Público/Premium |
| Shakti | Planners (Terra, Água, Ar, Fogo, Éter, Despertar, Harmonia) | pay.hotmart.com/* | Pago R$57 |
| Shakti | Fogueira Junina | https://fogueira-junina.shaktijaya.com.br/ | Pendente (sazonal) |
| Jaya AI | Claude do Zero (oferta) | https://jayaroberta.com/claude | Pago |
| Jaya AI | Biblioteca Claude by Jaya | https://jayaroberta.com/biblioteca | Público |
| Jaya AI | Primeira Conversa / Business Jaya | https://jayaroberta.com.br/ | Pago |
| Jaya AI | Atlas de Forças | https://quiz.jayaroberta.com.br/ | Público |
| Jaya AI | EIXO | https://entrenoeixo.jayaroberta.com.br/ | Restrito (login) |
| Operação | Command Center | https://app.jayaroberta.com/ | **Interno** |
| Operação | JayaFinance | https://finance.jayaroberta.com/ | **Interno** |
| Canais | Instagram, WhatsApp, YouTube | — | Público |

**Risco:** Command Center e JayaFinance estão como *Interno* no inventário. Listá-los num hub público divulga a localização das portas de login. Recomendação: fora do hub, ou num link discreto "área restrita" no rodapé.

---

## 2. Catálogo de efeitos

Legenda de risco mobile: **B** baixo (só compositor: transform/opacity), **M** médio (paint/JS por frame), **A** alto (GPU/main thread contínuo).

### 2.1 Entrada / intro
| Efeito | Técnica recomendada | JS | Risco | Suporte 2026 | Reduced-motion |
|---|---|---|---|---|---|
| Reveal de título por linha (máscara) | Splitting.js + CSS `@keyframes` com `--line-index` | ~2 KB | B | Baseline | só fade |
| Reveal de foto (clip-path inset/circle) | CSS `clip-path` animado | 0 | B–M | Baseline | aparece direto |
| Stagger de cards | CSS `animation-delay: calc(var(--i) * 60ms)` | 0 | B | Baseline | sem stagger |
| Blur-up / LQIP | placeholder base64 ≤1 KB + fade | 0 | B | Baseline | sem transição |
| View Transitions same-document | `document.startViewTransition()` | 0 | B | Baseline Newly Available | desativar no JS |
| View Transitions cross-document | `@view-transition { navigation: auto }` | 0 | B | Chromium + Safari 18.2; Firefox não | fallback nativo |
| ~~Preloader bloqueante~~ | **Evitar**: piora LCP | — | A | — | — |

### 2.2 Scroll
| Efeito | Técnica | JS | Risco | Suporte |
|---|---|---|---|---|
| Reveal ao entrar na tela | CSS `animation-timeline: view()` + fallback IntersectionObserver | 0 | B | ~83% global **[conflito: Firefox estável 132+ vs só jun/2026]** |
| Parallax suave | `translateY` com `animation-timeline: scroll()` | 0 | B | idem |
| Carrossel (5 Elementos / Planners) | `scroll-snap-type: x mandatory` | 0 | B | Baseline |
| Storytelling sticky | `position: sticky` + view timeline | 0 | B | Baseline |
| ~~Lenis / smooth scroll~~ | **Evitar no mobile**: quebra o momentum nativo e a acessibilidade | 3–5 KB | A | — |
| ~~`background-attachment: fixed`~~ | **Evitar**: repaint constante | 0 | A | — |

### 2.3 Ponteiro / toque
| Efeito | Técnica | Risco | Regra |
|---|---|---|---|
| Spotlight/glow na borda do card | `radial-gradient` com `--x/--y` via pointermove | B | só `(hover:hover) and (pointer:fine)` |
| Botão magnético | Motion `animate()` mini | M | só desktop |
| Tilt 3D | react-parallax-tilt (2.9 KB) / própria | M | só desktop, nunca em N cards simultâneos |
| Cursor follower | — | — | inútil em touch; dispensável |
| Parallax por giroscópio | `DeviceOrientationEvent` | M | iOS exige permissão por toque + HTTPS; opt-in explícito |
| Haptics | `navigator.vibrate()` | — | não existe em iOS Safari; nunca essencial |
| Press feedback no toque | `:active { transform: scale(.98) }` | B | substitui hover no mobile |

### 2.4 Ambiente / fundo
| Efeito | Técnica | Custo | Risco | Nota |
|---|---|---|---|---|
| Grão/noise | PNG tile 256 px (5–15 KB) | 0 JS | B | feTurbulence **animado** = A |
| Gradiente vivo (luz de pôr do sol) | CSS `@property` animando stops oklch | 0 JS | B | Baseline Widely Available |
| Aurora / light-leak / sun-glow | `radial-gradient` + `mix-blend-mode` | 0 JS | B | estático ou `@property` |
| Mesh gradient / heat haze em shader | **OGL** (~15–20 KB tree-shaken) ou **@paper-design/shaders** | 15–20 KB | A→M com guardas | DPR ≤1.5, 30 fps, pausa fora da tela e em `visibilitychange`, `webglcontextlost` tratado |
| Partículas de poeira | canvas-confetti (6 KB) pontual; tsParticles slim se sistema | 6–30 KB | A | evitar full-screen contínuo |
| three.js / ShaderGradient | — | 150 KB+ | A | overkill para hub |
| Unicorn Studio | embed no-code | ? | A | orçamento de JS incontrolável |

### 2.5 Tipografia
| Efeito | Técnica | Risco | Nota |
|---|---|---|---|
| Letter-spacing "respirando" (caps espaçadas do mockup) | CSS `letter-spacing` + view timeline | M (paint) | só no hero |
| Eixo de variable font (peso/opsz) | `font-variation-settings` + scroll | M | Petrona tem eixo `wght` |
| Marquee/ticker ("CONHECIMENTO EM MOVIMENTO") | CSS `translateX` infinito, conteúdo duplicado | B | `aria-hidden` na cópia |
| Texto com imagem dentro | `background-clip: text` | B | — |
| Text-scramble | JS ~1 KB | M | combina com Jaya AI, não com Shakti |

### 2.6 Micro-interações
| Efeito | Técnica | JS |
|---|---|---|
| Troca de tema "nascer/pôr do sol" (circular reveal) | View Transition + `clip-path: circle()` a partir do toque | 0 |
| Sublinhado desenhado | `::after scaleX` | 0 |
| Linha botânica se desenhando | SVG `stroke-dashoffset` + view timeline | 0 |
| Compartilhar | `navigator.share()` + fallback clipboard | 0 |
| Ícones animados | SVG + CSS | 0 |
| ~~Lottie / dotLottie / Rive~~ | lottie-web ~60 KB; dotLottie WASM ~500 KB; Rive ~200 KB — não compensa para 2–3 ícones | — |

### 2.7 Tema claro/escuro
- `light-dark()` + `color-scheme` + tokens oklch (Baseline Widely Available).
- `color-mix(in oklch, …)` para derivar estados (hover, bordas) sem duplicar paleta.
- Script inline de ~300 B no `<head>` lendo `localStorage` **antes do paint** para evitar flash de tema errado.

---

## 3. Bibliotecas: veredito

| Lib | Licença | gzip | Veredito para este hub |
|---|---|---|---|
| CSS nativo (scroll-driven, @property, VT, light-dark) | — | 0 | **Base de tudo** |
| Splitting.js | MIT | ~2 KB | **Usar** (split do título) |
| Motion `animate()` mini | MIT | ~2.3–5 KB | **Usar** só no desktop (magnético/spring) |
| OGL | MIT | ~15–20 KB | **Usar** atrás de gate de dispositivo (tier alto) |
| @paper-design/shaders | verificar | por shader | alternativa a OGL se quisermos preset pronto |
| GSAP 3.13 (+SplitText, ScrollTrigger) | "No Charge" desde abr/2025 (proíbe só construir concorrente do Webflow) | core ~27 KB | Não precisa; reservar se a timeline ficar complexa |
| anime.js v4 | MIT | modular | Não precisa |
| Lenis | MIT | 3–5 KB | **Evitar** (mobile) |
| three.js, Theatre.js, Rive, dotLottie, tsParticles full | — | 60–500 KB | **Evitar** |
| Swup/Barba | MIT | 12–25 KB | Desnecessário (1 página) |

**Orçamento de JS de motion: ≤ 25 KB gzip** (≤ 5 KB em dispositivo tier baixo).

---

## 4. Performance: técnicas e orçamento

### 4.1 Framework
**Astro + adapter Vercel** (zero JS por padrão, `<Picture>` com AVIF/WebP, ilhas só onde precisa). Alternativa: HTML único estático. Descartado: rota dentro do Jaya_Hub_Page (bundle React pesado + marca Shakti) e Next.js (hidratação desnecessária).

### 4.2 Tiering de dispositivo (gate progressivo)
| Tier | Condição | Recebe |
|---|---|---|
| 0 — Essencial | `prefers-reduced-motion`, `Save-Data`, `prefers-reduced-data`, 2g/3g | layout completo, só fades; sem shader; imagens menores |
| 1 — Padrão | mobile comum (`deviceMemory` < 4 ou `hardwareConcurrency` ≤ 4) | todo o CSS motion; gradiente `@property` + grão PNG |
| 2 — Pleno | WebGL2 + `deviceMemory` ≥ 4 + 4g | + shader OGL (DPR 1.5, 30 fps) + interações de ponteiro no desktop |

Battery API está deprecada; o Low Power Mode do iOS não é detectável. Usar os proxies acima.

### 4.3 Checklist (top 20)
1. Astro estático + Vercel.
2. Foto do hero: `fetchpriority="high"`, nunca `loading="lazy"`.
3. `<picture>` AVIF → WebP com `srcset`/`sizes`.
4. `width`/`height` ou `aspect-ratio` em toda imagem (CLS = 0).
5. `content-visibility: auto` + `contain-intrinsic-size` abaixo da dobra.
6. Petrona + Jost self-hosted, WOFF2 variable, subset latin + latin-ext (acentos pt-BR).
7. Fallback com `size-adjust`/`ascent-override` (Fontaine) para matar o CLS da fonte.
8. Preload só de 1 fonte (Petrona do título).
9. Animar apenas `transform`/`opacity` (e `clip-path` com moderação).
10. Scroll-driven CSS no lugar de scroll JS.
11. `will-change` just-in-time, removido no fim.
12. Pausar tudo offscreen (IntersectionObserver) e em aba oculta (`visibilitychange`).
13. `scheduler.yield()` em qualquer loop JS longo.
14. Gates: reduced-motion / Save-Data / reduced-data / tier.
15. WebGL com `webglcontextlost`/`restored`.
16. `viewport-fit=cover` + `env(safe-area-inset-*)` com fallback.
17. Hero em `100svh`/`min-height`, nunca `100vh` (WebView do Instagram).
18. Alvos de toque ≥ 44 px.
19. Vercel Analytics + Speed Insights; Pixel/GA, se houver, via Partytown.
20. Validar em Galaxy A15/A54-class (WebPageTest) além do Lighthouse.

### 4.4 Orçamento (mobile 4G)
| Recurso | Limite |
|---|---|
| HTML | < 15 KB |
| CSS | < 30 KB (crítico inline) |
| JS total | < 50 KB (meta < 25 KB) |
| Fontes | < 100 KB |
| Imagens acima da dobra | < 150 KB |
| Requests até LCP | < 10 |
| **LCP / INP / CLS** | **< 2.0 s / < 150 ms / < 0.05** |

### 4.5 Específico de link-hub
- Instagram WebView: links na **mesma aba** (sem `target=_blank`); autoplay só `muted playsinline`.
- OG image **JPG** 1200×630 < 300 KB (AVIF não gera preview confiável).
- JSON-LD `Person` com `sameAs` para todos os domínios e perfis.
- UTM em todo link de saída (`utm_source=hub&utm_medium=link&utm_content=<card>`); `rel="noopener"` sem `noreferrer`.
- Speculation Rules: só **prefetch** cross-origin; prerender exige header de opt-in no destino (controlamos os destinos na Vercel, então é viável numa fase 2).

---

## 5. Referências visuais
- Mockup "Atlas de Inteligência Jaya AI" (raiz do ecossistema, variantes Claude / brasa / sand).
- Awwwards Sites of the Day e a categoria Portfolio, filtrando por Editorial + Serif.
- taap.bio: link-in-bio como mini-site.
