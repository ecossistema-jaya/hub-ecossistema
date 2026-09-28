/* Sales pages for the planners (Stories 4.1 and 4.2).
 *
 * One entry per planner; the template in src/pages/planners/[slug].astro reads
 * only this. Every sentence below comes from the planner PDF itself (the
 * "Novo" edition of June 2026, read from its pages) or from the Hotmart page
 * that already sells it. Nothing here is invented: no testimonials, no bonuses,
 * no results. Em dashes of the PDF become commas or periods on the web page.
 *
 * Images: src/assets/planners/<slug>/ (scripts/build-planner-art.py).
 * Checkout, name, theme and arcano stay in links.json, shared with the hub.
 */

/** Jaya's Meta Pixel (supplied 2026-09-28). Planners use it unless they set their own. */
export const DEFAULT_PIXEL_ID = '871203640872617';

export type Exercise = {
  day: number;
  title: string;
  /** Shown instead of the day number when a page covers more than one day (e.g. "29·30"). */
  label?: string;
  /** Weekly review day: shown in a quieter style. */
  review?: boolean;
};

export type Week = { name: string; summary: string; exercises: Exercise[] };

/** An image rendered from a page of the PDF, in src/assets/planners/<slug>/<file>.jpg. */
export type PagePreview = { file: string; alt: string; caption: string };

export type Planner = {
  slug: string;
  /** links.json elements.items id */
  hubId: string;
  /** Printed on the cover, used as the promise. */
  promise: string;
  /** One sentence about what the element is. */
  element: string;
  /** Meta Pixel ID for this product. Null means no pixel code at all. */
  pixelId: string | null;
  /** Small line above the name in the opening, e.g. "Elemento Água · 30 dias a dois". */
  kicker: string;
  signsLabel: string;
  /** Headlines come in two parts: [plain, accent]. */
  signsHeadline: [string, string];
  howHeadline: [string, string];
  weeksHeadline: [string, string];
  /** Line under the weeks headline. */
  weeksLead: string;
  /** Page count of the PDF. */
  pages: number;
  signs: string[];
  /** Why it happens, in the planner's own words. */
  thesis: string;
  intro: string[];
  howTo: { title: string; text: string }[];
  weeks: Week[];
  featured: { day: number; title: string; text: string; reflection: string }[];
  closing: { title: string; text: string };
  /** Optional photographs supplied by Jaya, in the planner's asset folder. */
  photos: { hero?: string; offer?: string };
  previews: { how: PagePreview; gallery: PagePreview[]; closing: PagePreview };
  faq: { q: string; a: string }[];
};

export const planners: Planner[] = [
  {
    slug: 'agua',
    hubId: 'planner-agua',
    promise: 'A profundidade emocional que seu amor precisa',
    element:
      'O elemento Água representa a fluidez emocional: expressão de sentimentos, empatia, vulnerabilidade e compreensão mútua.',
    pixelId: DEFAULT_PIXEL_ID,
    kicker: 'Elemento Água · 30 dias a dois',
    signsLabel: 'Quando a Água está desalinhada',
    signsHeadline: ['O relacionamento', 'seca.'],
    howHeadline: ['Um encontro por dia.', 'A dois.'],
    weeksHeadline: ['Quatro semanas,', 'quatro movimentos.'],
    weeksLead: 'Cada uma constrói sobre a anterior: da consciência ao compromisso.',
    pages: 42,
    signs: [
      'Vocês podem estar juntos fisicamente, mas emocionalmente distantes.',
      'Os sentimentos ficam represados, não ditos.',
      'Ou transbordam de formas destrutivas.',
      'Dizer "eu preciso de você" parece fraqueza.',
    ],
    thesis: 'A Água só estagna quando para de se mover.',
    intro: [
      'A Água é o elemento da emoção em movimento. O trabalho aqui é deixar o que vocês sentem fluir entre vocês, e criar espaço para a vulnerabilidade sem que ela vire arma.',
      'Nos próximos 30 dias, vocês vão reaprender a sentir juntos. A chorar sem vergonha, a rir sem reserva, a dizer "eu preciso de você" sem que isso pareça fraqueza.',
    ],
    howTo: [
      { title: 'Tempo diário', text: 'Reserve 15 a 30 minutos por dia para o exercício. É um encontro, não uma tarefa.' },
      { title: 'Na ordem', text: 'Façam os exercícios na sequência. Cada dia prepara o próximo.' },
      { title: 'Espaço de reflexão', text: 'Usem a área em branco para anotar o que surgir. Sem censura.' },
      { title: 'Se mexer demais', text: 'Se um exercício mexer demais com vocês, respirem. Está funcionando.' },
      { title: 'Revisão semanal', text: 'Ao fim de cada semana, releiam o que escreveram. O padrão aparece na revisão.' },
      { title: 'Trabalho a dois', text: 'Façam juntos, se possível. Se não for possível agora, comece por você.' },
    ],
    weeks: [
      {
        name: 'Destravar o sentir',
        summary: 'A água só estagna quando para de se mover. Esta semana é sobre nomear o que está represado, sem julgamento.',
        exercises: [
          { day: 1, title: 'Temperatura Emocional' },
          { day: 2, title: 'O Sentimento Escondido' },
          { day: 3, title: 'Espelho Emocional' },
          { day: 4, title: 'Mapa das Emoções' },
          { day: 5, title: 'Toque Emocional' },
          { day: 6, title: 'Necessidades Emocionais' },
          { day: 7, title: 'Reflexão da semana', review: true },
        ],
      },
      {
        name: 'Deixar fluir',
        summary: 'Deixar a água correr. Vocês dão palavras ao não dito, à raiva guardada e ao perdão pequeno que liberta.',
        exercises: [
          { day: 8, title: 'Vocabulário Emocional' },
          { day: 9, title: 'Carta Não Enviada' },
          { day: 10, title: 'O Pedido Emocional' },
          { day: 11, title: 'Memória Afetiva' },
          { day: 12, title: 'Raiva Limpa' },
          { day: 13, title: 'Perdão Pequeno' },
          { day: 14, title: 'Reflexão da semana', review: true },
        ],
      },
      {
        name: 'Empatia e presença',
        summary: 'Sentir junto é cola emocional. Esta semana é sobre empatia, escuta e a linguagem que faz o outro se sentir visto.',
        exercises: [
          { day: 15, title: 'Check-in Emocional' },
          { day: 16, title: 'Chorar Junto' },
          { day: 17, title: 'Empatia Ativa' },
          { day: 18, title: 'Linguagem do Amor' },
          { day: 19, title: 'Fronteiras com Amor' },
          { day: 20, title: 'Gratidão Emocional' },
          { day: 21, title: 'Reflexão da semana', review: true },
        ],
      },
      {
        name: 'Aprofundar a entrega',
        summary: 'Quanto mais fundo, mais perto. Silêncio, medos íntimos e promessas que selam a entrega de vocês.',
        exercises: [
          { day: 22, title: 'Silêncio Compartilhado' },
          { day: 23, title: 'Medos Íntimos' },
          { day: 24, title: 'Promessa Emocional' },
          { day: 25, title: 'Rituais de Conexão' },
          { day: 26, title: 'Reescrita com Compaixão' },
          { day: 27, title: 'Sonhos Compartilhados' },
          { day: 28, title: 'Carta de Amor Real' },
          { day: 30, label: '29·30', title: 'O Que Levar Adiante' },
        ],
      },
    ],
    featured: [
      {
        day: 1,
        title: 'Temperatura Emocional',
        text: 'Cada um responde, sem discutir o número, apenas ouçam: "De 0 a 10, qual é a minha temperatura emocional com você hoje? Por quê?"',
        reflection: 'Qual foi a sua temperatura e por quê?',
      },
      {
        day: 9,
        title: 'Carta Não Enviada',
        text: 'Escreva uma carta ao parceiro dizendo tudo que sente, sem filtro. Não vai entregar; é só para você. Deixe a água correr.',
        reflection: 'O que fluiu quando tirou os filtros?',
      },
      {
        day: 12,
        title: 'Raiva Limpa',
        text: 'Se há ressentimento guardado, escrevam. Não precisa entregar, mas reconheçam: "Eu sinto raiva/mágoa porque..." Reconhecer é o primeiro passo para liberar.',
        reflection: 'O que precisava ser reconhecido?',
      },
      {
        day: 25,
        title: 'Rituais de Conexão',
        text: 'Criem juntos um ritual diário de conexão emocional: um abraço de 20 segundos, um beijo de bom dia, um "eu te amo" olhando nos olhos. Pequeno, mas consistente.',
        reflection: 'Qual ritual escolheram criar?',
      },
    ],
    closing: {
      title: 'Parabéns.',
      text: 'Relacionamentos são organismos vivos. Precisam de atenção constante, não de perfeição constante.',
    },
    photos: { hero: 'hero-photo', offer: 'offer-cover' },
    previews: {
      how: { file: 'como-usar', alt: 'Página "Como usar este planner", com as seis orientações de uso.', caption: 'Antes de começar' },
      gallery: [
        { file: 'jornada', alt: 'Página "A jornada de 30 dias", com as quatro semanas e seus temas.', caption: 'Visão geral' },
        { file: 'semana-1', alt: 'Abertura da semana um, "Destravar o sentir", em fundo azul-noite, com a lista dos sete dias.', caption: 'Abertura de cada semana' },
        { file: 'dia-1', alt: 'Página do dia 1, "Temperatura Emocional", com o exercício e o espaço de reflexão.', caption: 'Um dia do planner' },
      ],
      closing: { file: 'parabens', alt: 'Página final "Parabéns", em azul-noite e dourado, assinada "água viva".', caption: 'Página final' },
    },
    faq: [
      {
        q: 'Em que formato eu recebo?',
        a: 'Um PDF de 40 páginas em tamanho A4, com um exercício e um espaço de reflexão por dia. Dá para usar na tela ou imprimir.',
      },
      {
        q: 'Como eu acesso depois de pagar?',
        a: 'O acesso é imediato pela Hotmart. O planner fica disponível na sua conta, em "Minhas compras".',
      },
      {
        q: 'Preciso fazer com meu parceiro?',
        a: 'É um trabalho a dois, e rende mais quando os dois fazem juntos. Se não for possível agora, comece por você.',
      },
      {
        q: 'Quanto tempo leva por dia?',
        a: 'De 15 a 30 minutos. É um encontro, não uma tarefa, e a ordem importa: cada dia prepara o próximo.',
      },
      {
        q: 'Como sei se a Água é o meu elemento?',
        a: 'O quiz dos 5 Elementos mostra qual elemento pede atenção na sua relação agora. Se o resultado for outro, existe um planner para cada um.',
      },
      {
        q: 'E se eu não gostar?',
        a: 'Você tem 7 dias de garantia incondicional. Se não fizer sentido, peça o reembolso. Sem perguntas.',
      },
    ],
  },
];

export const plannerBySlug = (slug: string) => planners.find((p) => p.slug === slug);
export const plannerByHubId = (id: string) => planners.find((p) => p.hubId === id);

// Água, Ar and Terra have dedicated hand-built pages (src/pages/planners/<slug>.astro);
// [slug].astro must not generate them.
export const CUSTOM_PAGES = new Set(['agua', 'ar', 'terra']);
