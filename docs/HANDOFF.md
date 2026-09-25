# HANDOFF — Jaya, Entre Mundos (hub)

**Atualizado em:** 25/09/2026, fim da sessão 1. **Estado:** no ar e estável. **Retomar em:** "Próximos passos" abaixo.

## Onde está tudo

| O quê | Onde |
|---|---|
| Site no ar | https://plataforma.jayaroberta.com.br |
| Código local | `C:\Users\Jaya\Projetos\ecosistema-jaya\hub-ecossistema` |
| Repositório | `github.com/ecossistema-jaya/hub-ecossistema` (privado, branch `main`) |
| Vercel | projeto `hub-ecossistema` (`prj_K9vdaLbDunBlrin3CuBQDjzWYsBz`), time `betinhapotters-projects` (Pro) |
| Deploy | automático a cada push na `main` (Git conectado em 25/09) |
| DNS | Hostinger (`dns-parking.com`): `CNAME plataforma → cname.vercel-dns.com` |
| Story | [stories/1.1.story.md](stories/1.1.story.md) |
| Pesquisa | [research/effects-and-performance-catalog.md](research/effects-and-performance-catalog.md) |
| Design de referência | `../sanddesignsystem.html` e mockups `../Atlas de Inteligência Jaya AI*.png` |

## Identidade decidida por Jaya

- **Nome:** "Jaya, Entre Mundos". **Subtítulo/tese:** "Inteligência Relacional". Descartados: "Atlas do ecossistema" (sem magia), "Inteligência Relacional" como marca principal (genérico, difícil de registrar), Entreaberta, Antara, Bindu, Trama, Raiz & Rede, Corpo & Código.
- **Visual:** design system SAND (papel creme, tinta teal, ação rust, dourado; Marcellus + Open Sans 300; UI reta + motivo do círculo). **Claro por padrão**, mesmo com o sistema em modo escuro; o escuro ("noite no deserto") é opcional e fica memorizado.
- **Jaya rejeitou a v1** (minimalista, escura). Ela quer riqueza, camadas e arte própria.
- **Portal Jaya AI — kicker:** "AI · Negócios · Consultoria".

## Estrutura da página

1. Hero: ilustração de Jaya entre os dois mundos (`src/assets/home/hero.png`); celular recebe recorte vertical (`hero-art-mobile`), desktop a panorâmica.
2. Acesso rápido: Quiz (teal), Claude do Zero, WhatsApp.
3. Dois territórios: Shakti Jaya (capa `home/shakti.png`) e Jaya AI (capa `home/jay.png`) com todos os links.
4. Faixa "Conhecimento em movimento" (`zona-genialidade/19`).
5. Mapa dos 5 Elementos: 7 planners como medalhões com arcanos (Terra=Imperatriz, Água=Estrela, Ar=Louco, Fogo=Força, Éter=Universo, Despertar=Sol, Harmonia=Arte).
6. Tarot da Jaya → `shaktijaya.com.br/tarot` (leque de 6 arcanos).
7. Citação + rodapé teal com logo real e "Área restrita" (Command Center, JayaFinance).

## Como editar

- **Links e textos dos cards:** `src/data/links.json` (UTM é automático; `"hidden": true` esconde um link).
- **Trocar imagem:** coloque o arquivo em `src/assets/home/` ou na biblioteca `src/assets/photos/` (ambas fora do git), ajuste a lista em `scripts/curate-art.mjs` e rode `npm run art`. As versões otimizadas vão para `src/assets/art/` (versionada).
- **Rodar local:** `npm run build && npx astro preview --port 4321` → http://127.0.0.1:4321
- **Checar:** `npx astro check`; screenshots: `node scripts/shots.cjs <pasta>` e `node scripts/scroll-shots.cjs <pasta> light 390 844`.
- **Publicar:** commit + `git push origin main` (Jaya autorizou push/deploy para este projeto).

## Verificado no fim da sessão

- Lighthouse mobile local ×3: **98 · 100 · 100 · 100**, LCP ~2.27 s, TBT 0, CLS 0.
- Produção: deploy `dpl_9j39NnuMgnTZgLrG92LpVNjLuyo7` (commit `859c03a`) READY, alias `plataforma.jayaroberta.com.br`, sem erro.
- Produção (fetch pelo servidor, deploy anterior): HTTP 200, sem login; links com UTM; scripts de Analytics/Speed Insights presentes.

## Próximos passos

1. **Distribuição (maior retorno):** trocar o link da bio do Instagram `@jayaroberta.shakti` para `plataforma.jayaroberta.com.br`. Ayla ofereceu escrever story/post de lançamento.
2. **Jaya, no painel Vercel:** ligar Web Analytics e Speed Insights (os scripts já estão no site; só registram depois de ligados).
3. **Lighthouse em produção:** PageSpeed Insights deu cota anônima esgotada (HTTP 429) em 25/09; repetir.
4. **Revisão de copy escrita pela Ayla** (lista na story, "Open items").
5. **Fogueira Junina:** está "Pendente" no inventário; marcar `"hidden": true` fora de época.
6. **Opcional:** busca no INPI se "Jaya, Entre Mundos" virar marca registrada.

## Armadilhas conhecidas

- **Rede desta máquina:** às vezes dá timeout em `api.vercel.com` e nos IPs da Vercel (o GitHub funciona). O conector Vercel do Claude funciona pelo servidor e serve para checar deploys.
- **GitHub App da Vercel** na org usa "repositórios selecionados": repositório novo precisa ser liberado por Jaya no navegador (a CLI recebe 403).
- **Estilos Astro com escopo** não alcançam a raiz de componentes filhos: use `:global(.componente.classe)` (Compass, Botanical).
- **Cache de prévia** (WhatsApp/Instagram) mantém a imagem antiga de links já compartilhados por alguns dias.
- **Não relacionado a este projeto:** `HANDOFF.md` da raiz (migração do EIXO, pausada) segue sem alteração de estado.
