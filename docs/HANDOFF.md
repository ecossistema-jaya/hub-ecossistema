# HANDOFF — Jaya, Entre Mundos (hub)

**Atualizado em:** 05/10/2026, sessão 5 (página Sobre no ar, PR #8). **Estado:** sete páginas de planners no ar com a trilha dos 7; seção da Ayla IA na home; página de vendas da Ayla refeita no shaktijaya.com.br; conteúdo de lançamento pronto, **ainda não publicado**. **Retomar em:** "Próximos passos" abaixo.

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
| PRD fase 2 | [prd.md](prd.md) · destinos: [destinations.md](destinations.md) |
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
6. Ayla IA (`src/components/Ayla.astro`, `id="ayla"`): foto da Jaya em arco SAND, 5 Elementos em órbita, chat da Ayla, CTA para a página de vendas. O card "Ayla IA" em Shakti Jaya desce até aqui (`"url": "#ayla"`).
7. Tarot da Jaya → `shaktijaya.com.br/tarot` (leque de 6 arcanos).
8. Citação + rodapé teal com logo real e "Área restrita" (Command Center, JayaFinance). Redes: dois Instagram, @jayaroberta.shakti (branco) e @jayaroberta.ai (dourado, `"accent": true`).

## Como editar

- **Links e textos dos cards:** `src/data/links.json` (UTM é automático; `"hidden": true` esconde um link).
- **Trocar imagem:** coloque o arquivo em `src/assets/home/` ou na biblioteca `src/assets/photos/` (ambas fora do git), ajuste a lista em `scripts/curate-art.mjs` e rode `npm run art`. As versões otimizadas vão para `src/assets/art/` (versionada).
- **Rodar local:** `npm run build && npx astro preview --port 4321` → http://127.0.0.1:4321
- **Testar links:** `npm run check:links` (sai com erro se algum destino falhar; LinkedIn aparece como BLOCKED, é normal).
- **Checar:** `npx astro check`; screenshots: `node scripts/shots.cjs <pasta>` e `node scripts/scroll-shots.cjs <pasta> light 390 844`.
- **Publicar (fluxo desde a sessão 4):** branch → commit → @devops faz push e abre PR → Jaya confere o preview da Vercel e **ela mesma faz o merge no GitHub** → conferir produção. O modo automático do Claude Code bloqueia `gh pr merge` quando a aprovação chega repassada ("Merge Without Review"); não contornar.
- **Link interno em `links.json`:** `"url": "#secao"` vira âncora na mesma aba, sem UTM e com seta para baixo (Worlds.astro).

## Verificado no fim da sessão

- Lighthouse mobile local ×3: **98 · 100 · 100 · 100**, LCP ~2.27 s, TBT 0, CLS 0.
- Produção: deploy `dpl_9j39NnuMgnTZgLrG92LpVNjLuyo7` (commit `859c03a`) READY, alias `plataforma.jayaroberta.com.br`, sem erro.
- Produção (fetch pelo servidor, deploy anterior): HTTP 200, sem login; links com UTM; scripts de Analytics/Speed Insights presentes.

## Sessão 2 · 28/09/2026 — acessos por produto

- **Cadeado "login"** (`"badge": "login"` em `links.json`) agora em EIXO, Atlas de Forças e Biblioteca Claude by Jaya.
- **Card trocado em Jaya AI:** "Business Jaya" virou "Biblioteca Gratuita da Jaya" → `https://jayaroberta.com.br/biblioteca` (aberta, sem login).
- **Regra decidida por Jaya:** cada produto tem convite, painel e login próprios; nada herda acesso de outro. Painéis: Biblioteca `jayaroberta.com/biblioteca/admin`, Atlas `quiz.jayaroberta.com.br/admin`; o `/admin` do curso só aponta para eles.
- **Supabase (Redirect URLs):** todo domínio de produto precisa de `https://<domínio>/**`. Sem isso, o login Google volta para `claude-by-jaya.vercel.app` e pede um segundo login. Já liberados: `jayaroberta.com/**` e `quiz.jayaroberta.com.br/**`.

## Páginas de venda dos planners (Epic 4)

- **No ar:** `/planners/agua` e `/planners/ar`, páginas dedicadas (`src/pages/planners/agua.astro`, `ar.astro`): documento próprio, sem o layout do hub. Água veio do pacote de Jaya (copy aprovada); Ar foi feita no mesmo molde a partir do PDF final. `shaktijaya.com.br/planners/<slug>` redireciona (307) via `Jaya_Hub_Page/vercel.json`.
- **Terra (28/09, sessão 3):** `/planners/terra` **no ar** (deploy `dpl_C9RC6nEAdYw6insPFkDfoA2Yo4i5`, commit `e5ef7b5`); Pixel PageView/ViewContent verificado em produção. Paleta em tons de terra e dia em destaque verde-broto. **Falta:** slug `terra` no redirect do `Jaya_Hub_Page/vercel.json` (@devops).
- **Fogo (28/09, sessão 3):** `/planners/fogo` **no ar** (deploy `dpl_2rHt1gQDoyWWGixm6Kbd3wJTJNQJ`, commit `f3aeb3a`); Pixel PageView/ViewContent verificado em produção. Capa renderizada do PDF (a `fogo_novo.png` de junho tem arte antiga). Paleta brasa/vinho, destaque laranja-chama.
- **Éter (28/09, sessão 3):** `/planners/eter` **no ar** (push `f3aeb3a..c727ad4` pelo @devops); Pixel verificado em produção. Capa renderizada do PDF (`eter_novo.png` tem a tagline da Terra); `eter-claro.png` corrigida por Jaya no fechamento. Paleta violeta, destaque lilás.
- **Despertar (28/09, sessão 3):** `/planners/despertar` **no ar**. Não é elemento: seção "O caminho do Despertar" (Presença, Clareza, Intenção, Transformação) no lugar da grade dos 5 elementos. Paleta amanhecer, destaque dourado-sol.
- **Harmonia (28/09, sessão 3):** `/planners/harmonia` **no ar**. Os 5 elementos em rotação: grade sem destaque, cards acendem só ao passar o mouse (Jaya não quis "sempre aceso" no celular). Mandala dos 5 Elementos no lugar do termômetro. Paleta verde-floresta.
- **Capa como livro 3D (28/09):** nas seis páginas, a capa do topo e a clara do fechamento viraram livro 3D (lombada, bloco de páginas à direita, contracapa, sombra). CSS no fim do `<style>` de cada página (`.product-cover.book`, `.closing-book`); selo "30 dias" no canto inferior esquerdo.
- **Quiz → páginas de venda (28/09):** o botão "QUERO MEU PLANNER DE 30 DIAS" do resultado do quiz abre a página de vendas do planner recomendado (UTMs do quiz repassadas ao checkout). PR #61 no Jaya_Hub_Page.
- **Revisão de copy e CLS (28/09):** revisora aplicada (grupo A); fontes provisórias com medidas da EB Garamond/Inter CLS mobile ≤ 0,05 nas sete páginas (29/09): Inter Fallback a 107,12% com versão negrita, proporção da capa fixada no livro 3D e o degradê do pé do topo pintado como fundo (o ::after pulava quando a página pintava antes do HTML terminar).
- **Redirects shaktijaya.com.br (28/09):** os sete slugs → 307 para o hub (PRs #57 a #60 em `ecossistema-jaya/Jaya_Hub_Page`, repo local `Projetos/Jaya_Hub_Page-planners`). Story 4.2 em InReview: falta QA gate (revisora formal, CLS da Água/Fogo ~0,057).
- **Capa clara no fechamento (28/09):** Terra, Água e Ar em duas colunas (capa clara à esquerda, frase e CTA à direita; empilhado no celular). `ar-claro.png` corrigida por Jaya para a tagline do PDF.
- **Fonte de verdade:** os PDFs "Novo" finais em `Projetos/ecosistema-jaya/Jaya_Hub_Page/planners/` (Água e Ar prontos; os outros estão sendo reconstruídos por Jaya). Imagens em `.../capa-planners/` (capas escuras e claras, `<elemento>-semana 01..04.png`, fotos `jaya1..10.jpg`, pasta `Logo/`).
- **Para um novo planner:** copiar `ar.astro` como base, reescrever a copy só com o que está no PDF, gerar assets em `public/planners/<slug>/`, adicionar o slug em `CUSTOM_PAGES` (`src/data/planners.ts`) e no `build-planner-art.py` (gera o `<slug>-og.jpg`), trocar o medalhão nas outras páginas, e acrescentar o slug ao redirect do `Jaya_Hub_Page/vercel.json` (PR pelo @devops).
- **Padrões fixos:** Meta Pixel `871203640872617` carregado depois do `load` (no `head` ele empurrava o LCP mobile para 3,5 s); UTMs repassadas ao checkout; um dia em destaque por semana; sem travessão, exclamação ou promessa inventada; capa do PDF vence o PNG se divergirem (`ar_novo.png` tinha a frase de outro planner).
- **Pendências:** CLS ~0,058 nas páginas (meta 0,05); `crm-shakti-jaya` corrigido em 29/09 (PR #62): o build do Next pegava o `middleware.ts` da raiz; `turbopack.root` e `outputFileTracingRoot` fixados em `apps/dashboard`.

## Sessão 4 · 29/09/2026 — trilha dos planners e Ayla IA

Tudo abaixo está em produção e foi conferido no site publicado.

- **Trilha dos 7 planners** (PRs #1 e #2): nas sete páginas de vendas, a grade de 6 medalhões virou `src/components/PlannerTrail.astro`: os 7 numerados 01→07 (Terra → Harmonia é o **caminho sugerido por Jaya**), zigue-zague com órbita no desktop, fio vertical no celular, o planner da página marcado "Você está aqui". Anel da Água usa `#1f5a64` do hub. CSS antigo `.medallion*` removido.
- **Página de vendas da Ayla** no shaktijaya.com.br (`/ayla-ai/como-funciona`, PR #63 no `Jaya_Hub_Page`): hero com chat de exemplo, 3 passos, diferenciais, planos, FAQ com limites éticos (não substitui terapia, não diagnostica, CVV 188 / SAMU 192 / 180) e fechamento, em pt/es/en. A seção da Ayla na home do shaktijaya recebeu as mesmas correções.
- **Decisões de Jaya sobre a Ayla** (valem para qualquer copy nova): preço **R$ 50 no 1º mês, depois R$ 100/mês**; **não é ilimitado**; "confidente de bolso" no lugar de "terapeuta de bolso"; "leitura dos 5 Elementos" no lugar de "diagnóstico"; sem depoimento (Patrícia M. removido), sem "suporte direto com Jaya", garantia de 7 dias; as 3 perguntas grátis liberam com o email do resultado do Quiz. Posicionamento aprovado: "a Jaya em forma de chat", "a versão dela em IA".
- **Seção da Ayla na home do hub** (PR #3): protótipo aprovado em https://claude.ai/artifact/3VXzeF4dmDBnx1UVkBC46c (v4). Fotos: `src/assets/art/ayla/jaya.jpg` (recorte de `capa-planners/jaya6.jpg`) e `ayla.jpg` (avatar de `Jaya_Hub_Page/public/jaya-avatar.png` sem o anel do Instagram). CTA com `utm_content=ayla-secao`.
- **Card Ayla → âncora** (PR #4) e **Instagram @jayaroberta.ai no rodapé** (PR #5), dourado para diferenciar.
- **Checkout da Ayla:** `https://pay.hotmart.com/C105022654V?off=25goz2ja`; a página repassa as UTMs do visitante e dispara `InitiateCheckout` no Pixel.
- **Sem story formal:** estes trabalhos foram por pedido direto de Jaya com aprovação de protótipo; não há story no `docs/stories/`.

## Sessão 5 · 05/10/2026 — página Sobre

- **`/sobre`** (`src/pages/sobre.astro`): página profissional dos dois mundos. Abertura com retrato em arco, "Dois repertórios" (Tecnologia e IA · Terapia e presença) separados pela costura "entre", citação, faixa teal "O que nasceu desse encontro" (5 Elementos → quiz, Ayla → `/#ayla`, Claude do Zero), galeria de 8 fotos e fechamento que leva à trajetória completa em `shaktijaya.com.br/trajetoria`. Protótipo aprovado: https://claude.ai/artifact/5z8i8RBKfYMtkhhswYcNjd.
- **Regras de copy decididas por Jaya:** o empregador **nunca** é citado, só "diretoria de tecnologia de uma grande instituição financeira"; sem "sistemas de pagamento e mobile"; os números do shaktijaya (50.000+ mulheres etc.) ficam só lá; Atman Consciência & Tantra entra. A história pessoal (maternidade, medicinas) fica na trajetória do Shakti, não aqui. A foto da tecnologia é a selfie da Ditec, escolhida por Jaya em 06/10.
- **Fotos:** `src/assets/art/sobre/` (versionada), curada à mão como a da Ayla. Fontes: `retrato.jpg` = `ecosistema-jaya/jaya/IMG_0995.jpg` (trocada por Jaya em 06/10, a `jaya10` não agradou); `capa-planners/jaya2, 8, 9.jpg` e `Projetos/Jaya_Hub_Page/public/trajetoria/` (lendaria-2, metodo, 16, repertorio, 14, 02); `tecnologia.jpg` = `ecosistema-jaya/jaya/travessia-servidora.jpg`, já recortada em 16:10 (o `position` do `<Picture>` só aceita palavras-chave).
- **Topo compartilhado:** a barra saiu do `index.astro` para `src/components/Topbar.astro`, com o link "Sobre" ao lado do logo (`aria-current` no `/sobre`). Rodapé ganhou "Sobre a Jaya".
- **Verificado local:** `astro check` 0 erros; Lighthouse mobile do `/sobre` 99 · 100 · 100 · 100, LCP 1,8 s, CLS 0; sem rolagem lateral em 390 px e 1440 px, claro e escuro.

## Próximos passos

1. **Distribuição: feita.** Jaya confirmou em 05/10/2026 que o lançamento dos planners ([distribuicao/lancamento-planners.md](distribuicao/lancamento-planners.md)) e o conteúdo da Ayla já foram divulgados. Acompanhar `utm_content=ayla-secao` na Hotmart.
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
- **`astro preview` órfão:** parar a tarefa do Claude Code não mata o node; a porta fica presa ("Another astro preview server is already running"). Use `npx astro preview stop`.
- **Quebra de linha no Astro:** texto que quebra linha logo antes de uma tag (`dos\n<b>5`) perde o espaço ("dos5"). Deixe a palavra na mesma linha da tag.
- **Pasta vazia `Projetos/Jaya_Hub_Page-ayla`:** sobra da cópia de trabalho da página da Ayla (já desregistrada do git); o Windows a mantém aberta. Pode apagar pelo Explorer.
- **Não relacionado a este projeto:** `HANDOFF.md` da raiz (migração do EIXO, pausada) segue sem alteração de estado.
