export const company = {
  name: 'Cromeação Primos', legalName: 'Cromeação Primos LTDA.', since: '2002',
  instagram: 'https://www.instagram.com/cromeacao_primos/', whatsapp: '',
  hero: { title: 'Acabamento que valoriza cada peça.', description: 'Cromação e niquelação de peças metálicas, com atuação desde 2002.' },
  services: [
    { number: '01', name: 'Cromação', description: 'Um revestimento de superfície com cromo que compõe o acabamento da peça. O resultado depende do material, do processo e da aplicação.' },
    { number: '02', name: 'Niquelação', description: 'Um revestimento de superfície com níquel, utilizado no acabamento metálico e, conforme o processo, como base para outros revestimentos.' },
  ],
  materials: [{ name: 'Ferro', description: 'Um dos materiais mencionados pela empresa. A viabilidade é avaliada conforme as características da sua peça.' }, { name: 'Zamac', description: 'Liga metálica à base de zinco. Material, dimensões e aplicação ajudam a definir o tratamento adequado.' }],
  media: [{ src: 'media/metal-study.webp', width: 1536, height: 1024, type: 'illustrative' as const, caption: 'Forma, superfície e reflexão', alt: 'Estudo ilustrativo de um puxador tubular, uma arruela e uma luva cilíndrica com superfícies metálicas polidas.' }],
  faqs: [
    ['O que é cromação?', 'É o revestimento da superfície de uma peça com cromo. O acabamento e suas propriedades dependem do material, do processo e da aplicação.'],
    ['O que é niquelação?', 'É o revestimento da superfície com níquel, usado em acabamentos metálicos e, conforme o processo, como base para outros revestimentos.'],
    ['O que preciso informar para pedir um orçamento?', 'Envie a descrição e fotos da peça, o material (se souber), a quantidade, as medidas aproximadas e o acabamento desejado. A equipe poderá avaliar a viabilidade.'],
    ['Não sei o material da minha peça. Como consultar?', 'Selecione “Não sei informar” no pedido e compartilhe fotos e detalhes com a equipe pelo Instagram. Não é necessário adivinhar o material.'],
  ],
  confirmed: ['Nome e atuação desde 2002', 'Cromação e niquelação', 'Ferro e zamac mencionados no perfil, segundo briefing'],
  pending: ['Logo, cores e autorização das fotografias', 'Telefone, WhatsApp, endereço e horários', 'Materiais e tipos/dimensões de peças atendidas', 'Atendimento a pessoas físicas, quantidade mínima e peças usadas', 'Outros acabamentos, prazos, garantias e capacidade produtiva'],
};
