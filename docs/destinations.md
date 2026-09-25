# Destination readiness

Every destination the hub links to, whether it answers, and whether its critical flow was verified. Reachability comes from `npm run check:links`; flow verification comes from `../../inventario-2026-09-16/VERIFICACAO.md` and `RESUMO.md`. Decision Q3 (2026-09-25): unverified destinations stay visible; fixes live in the owner project.

**Reachability run:** 2026-09-25, 28 unique URLs, 0 failed, 1 bot-walled (LinkedIn, HTTP 999).

| Link id(s) | Destination | Reachable | Critical flow | Flow status | Owner project |
|---|---|---|---|---|---|
| `shakti-quiz`, `quick-quiz` | shaktijaya.com.br/quiz1 | 200 | Quiz → result → persistence | Verified (`VERIFICACAO-QUIZ-CANONICO.md`) | Jaya_Hub_Page |
| `shakti-site` | shaktijaya.com.br | 200 | Page load | OK | Jaya_Hub_Page |
| `shakti-tarot`, `tarot` | shaktijaya.com.br/tarot | 200 | Page load | OK | Jaya_Hub_Page |
| `shakti-ayla` | shaktijaya.com.br/ayla-ai | 200 | Purchase → e-mail code → unlock | Unlock verified with a controlled zero-value record; Hotmart Club guidance **not published** | Jaya_Hub_Page / Hotmart |
| `shakti-fogueira` (hidden) | fogueira-junina.shaktijaya.com.br | 200 | Sign-up POST | Seasonal, hidden until June | fogueira-junina |
| `planner-*` (7) | pay.hotmart.com | 200 | Real purchase → webhook → e-mail with PDF | **Never run with a real purchase**; Despertar/Harmonia delivery unproven | Jaya_Hub_Page (`hotmart-webhook` v7) |
| `ai-claude-do-zero`, `quick-claude`, `ai-biblioteca` | jayaroberta.com | 200 | Login to course area | Verified with an authenticated profile | Claude site |
| `ai-business` | jayaroberta.com.br | 200 | Google login | **Broken:** callback `.com.br` missing from Supabase allowlist; returns to the Claude site | BusinessJaya |
| `ai-atlas` | quiz.jayaroberta.com.br | 200 | Quiz + admin | Admin verified (5 respondents) | Atlas de Forças |
| `ai-eixo` | entrenoeixo.jayaroberta.com.br | 200 | Login → workspace → autosave | Read verified 2026-09-23; autosave/RLS write **untested**; migration paused | eixo |
| `ops-command`, `ops-finance` | app./finance.jayaroberta.com | 200 | Login | Verified with an authenticated profile | Command Center / JayaFinance |
| `social-*`, `quick-whatsapp` | Instagram, WhatsApp, YouTube, TikTok, LinkedIn | 200 (LinkedIn 999) | Profile opens | OK | External |
