/* Sales pages for the planners (Story 4.1).
 *
 * One entry per planner; the template in src/pages/planners/[slug].astro reads
 * only this. Every sentence below comes from the planner PDF itself (re-spaced
 * where the PDF glued words together) or from the Hotmart page that already
 * sells it. Nothing here is invented: no testimonials, no bonuses, no results.
 *
 * Images: src/assets/planners/<slug>/ (scripts/build-planner-art.py).
 * Checkout, name, theme and arcano stay in links.json, shared with the hub.
 */

export type Exercise = { day: number; title: string };

/** Jaya's Meta Pixel (supplied 2026-09-28). Planners use it unless they set their own. */
export const DEFAULT_PIXEL_ID = '871203640872617';

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
  signs: string[];
  /** Why it happens, in the planner's own words. */
  thesis: string;
  intro: string[];
  howTo: string[];
  weeks: { question: string; exercises: Exercise[] }[];
  featured: { day: number; title: string; text: string }[];
  closing: string;
  previews: { file: string; alt: string }[];
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
    signs: [
      'Vocês estão juntos fisicamente, mas emocionalmente distantes.',
      'Os sentimentos ficam represados, não ditos.',
      'Ou transbordam de formas destrutivas.',
      'Dizer "eu preciso de você" parece fraqueza.',
    ],
    thesis: 'A Água só estagna quando para de se mover.',
    intro: [
      'A Água é o elemento da emoção em movimento. Não é sobre sentir mais, é sobre deixar o que sentem fluir entre vocês. É sobre criar espaço para a vulnerabilidade sem que ela vire arma.',
      'Nos próximos 30 dias, vocês vão reaprender a sentir juntos. A chorar sem vergonha, a rir sem reserva, a dizer "eu preciso de você" sem que isso pareça fraqueza.',
    ],
    howTo: [
      'Reservem de 15 a 30 minutos por dia para o exercício.',
      'Façam os exercícios na ordem: cada dia prepara o próximo.',
      'Usem o espaço de reflexão para anotar o que surgir. Sem censura.',
      'Se um exercício mexer demais com vocês, respirem. Está funcionando.',
      'Ao final de cada semana, releiam o que escreveram. O padrão aparece na revisão.',
      'É um trabalho a dois. Se possível, façam juntos. Se não for possível, comece por você.',
    ],
    weeks: [
      {
        question: 'O que desbloqueou essa semana?',
        exercises: [
          { day: 1, title: 'Temperatura Emocional' },
          { day: 2, title: 'O Sentimento Escondido' },
          { day: 3, title: 'Espelho Emocional' },
          { day: 4, title: 'Mapa das Emoções' },
          { day: 5, title: 'Toque Emocional' },
          { day: 6, title: 'Necessidades Emocionais' },
          { day: 7, title: 'Reflexão da semana' },
        ],
      },
      {
        question: 'O que ainda está represado?',
        exercises: [
          { day: 8, title: 'Vocabulário Emocional' },
          { day: 9, title: 'Carta Não Enviada' },
          { day: 10, title: 'O Pedido Emocional' },
          { day: 11, title: 'Memória Afetiva' },
          { day: 12, title: 'Raiva Limpa' },
          { day: 13, title: 'Perdão Pequeno' },
          { day: 14, title: 'Reflexão da semana' },
        ],
      },
      {
        question: 'O que mais cresceu em vocês essa semana?',
        exercises: [
          { day: 15, title: 'Check-in Emocional' },
          { day: 16, title: 'Chorar Junto' },
          { day: 17, title: 'Empatia Ativa' },
          { day: 18, title: 'Linguagem do Amor' },
          { day: 19, title: 'Fronteiras com Amor' },
          { day: 20, title: 'Gratidão Emocional' },
          { day: 21, title: 'Reflexão da semana' },
        ],
      },
      {
        question: 'Como vocês chegam ao fim desses 30 dias?',
        exercises: [
          { day: 22, title: 'Silêncio Compartilhado' },
          { day: 23, title: 'Medos Íntimos' },
          { day: 24, title: 'Promessa Emocional' },
          { day: 25, title: 'Rituais de Conexão' },
          { day: 26, title: 'Reescrever com compaixão' },
          { day: 27, title: 'Sonhos Compartilhados' },
          { day: 28, title: 'Carta de Amor Real' },
          { day: 29, title: 'O Que Ficou' },
          { day: 30, title: 'Celebração' },
        ],
      },
    ],
    featured: [
      {
        day: 1,
        title: 'Temperatura Emocional',
        text: 'Cada um responde: "De 0 a 10, qual a minha temperatura emocional com você hoje? Por quê?" Não discutam o número. Apenas ouçam.',
      },
      {
        day: 9,
        title: 'Carta Não Enviada',
        text: 'Escreva uma carta ao parceiro dizendo tudo o que sente, sem filtro. Não vai entregar. É só pra você. Deixe a água correr.',
      },
      {
        day: 12,
        title: 'Raiva Limpa',
        text: 'Se há ressentimento guardado, escrevam. Não precisa entregar. Mas reconheçam. Reconhecer é o primeiro passo pra liberar.',
      },
      {
        day: 25,
        title: 'Rituais de Conexão',
        text: 'Criem juntos um ritual diário de conexão emocional: um abraço de 20 segundos, um beijo de bom dia, um "te amo" olhando nos olhos. Pequeno, mas consistente.',
      },
    ],
    closing: 'A Água não para. Ela encontra sempre um caminho. Continuem fluindo juntos.',
    previews: [
      { file: 'como-usar', alt: 'Página "Como usar este planner", com as seis orientações de uso.' },
      { file: 'dia-30', alt: 'Página do dia 30, a celebração, com a foto de um casal caminhando junto a um rio.' },
    ],
    faq: [
      {
        q: 'Em que formato eu recebo?',
        a: 'Um PDF de 32 páginas em tamanho A4, com um exercício e um espaço de reflexão por dia. Dá para usar na tela ou imprimir.',
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
        a: 'De 15 a 30 minutos. A ordem importa: cada dia prepara o próximo.',
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
