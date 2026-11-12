import media from "./client-media.json";
export const business = {
  name: "Cromeação Primos",
  legalName: "Cromeação Primos LTDA.",
  email: "cromeacaoprimos@gmail.com",
  phone: "(11) 91493-5874",
  whatsapp: "5511914935874",
  instagram: "https://www.instagram.com/cromeacao_primos/",
  since: "2002",
  founder: "Mario Reis",
  portrait: "media/cliente/mario-retrato.webp",
  portraitOriginal: "media/cliente/mario-original.webp",
  portraitWork: "media/cliente/mario-trabalho.webp",
  portraitDetail: "media/cliente/mario-detalhe.webp",
  logo: "media/instagram/04.webp",
  logoSmall: "media/instagram/00.webp",
};
export type ProductPhoto = (typeof media.photos)[number];
export const productGroups = media.groups;
export const productPhotos = media.photos;
export const getPhoto = (id: string) => productPhotos.find((p) => p.id === id)!;
export const mediaUrl = (src: string) => `${import.meta.env.BASE_URL}${src}`;
export const waLink = (
  text = "Olá, Cromeação Primos! Gostaria de consultar um orçamento para minhas peças.",
) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
export const baths = [
  {
    id: "cromacao",
    name: "Cromação",
    symbol: "Cr",
    number: "01",
    image: "torneiras-1",
    title: "Uma superfície. Um novo acabamento.",
    text: "Revestimento da superfície com cromo para compor o acabamento da peça. O resultado é definido pelo material, pelo processo e pela aplicação.",
    detail:
      "O estado da peça e o acabamento desejado orientam a avaliação. Envie fotos e medidas para consultar a cromação com a equipe.",
  },
  {
    id: "niquelacao",
    name: "Niquelação",
    symbol: "Ni",
    number: "02",
    image: "pesos-2",
    title: "O cuidado começa em cada camada.",
    text: "Revestimento de superfície com níquel, utilizado em acabamentos metálicos e, conforme o processo, como base para outros revestimentos.",
    detail:
      "A indicação da niquelação depende da peça e da aplicação. Converse com a Primos sobre o seu material e o resultado que procura.",
  },
];
export const timeline = [
  {
    year: "1979",
    title: "De Pernambuco para São Paulo",
    text: "Pernambucano, Mario chega a São Paulo para construir uma nova etapa da sua vida.",
  },
  {
    year: "1983",
    title: "O começo na cromeação",
    text: "Mario começa a trabalhar no ramo. É o início de uma experiência construída no dia a dia, perto das peças e dos processos.",
  },
  {
    year: "2002",
    title: "O próprio negócio",
    text: "Ao lado de dois sócios, Mario inicia o seu negócio de cromeação. Nasce a história da Primos.",
  },
  {
    year: "Hoje",
    title: "Mario à frente da Primos",
    text: "Atualmente, Mario conduz o negócio sem os sócios iniciais e segue trabalhando no ramo que faz parte da sua trajetória.",
  },
];
export const faqs = [
  {
    q: "Vocês atendem uma peça ou apenas lotes?",
    a: "Atendemos unidades e lotes. Compartilhe a quantidade, o material e as medidas para a equipe avaliar o seu pedido.",
  },
  {
    q: "Quais materiais vocês trabalham?",
    a: "Trabalhamos com ferro, metais e zamac. Como cada material tem características próprias, a viabilidade do banho é avaliada conforme a peça e a aplicação. Zamac é uma liga metálica à base de zinco.",
  },
  {
    q: "Não sei o material ou o banho ideal. Posso consultar?",
    a: "Sim. Envie fotos da peça, as medidas aproximadas e explique como ela é utilizada. A equipe pode orientar a consulta mesmo que você não saiba os termos técnicos.",
  },
  {
    q: "As peças das fotos estão à venda?",
    a: "As fotografias mostram peças atendidas e seus acabamentos. A atuação da Primos é o tratamento e o revestimento de superfícies; consulte a equipe sobre a sua peça.",
  },
  {
    q: "Qual é o prazo e quanto custa o serviço?",
    a: "O orçamento e o prazo são avaliados conforme o material, o estado da peça, a quantidade e o acabamento. Converse com a equipe antes de combinar o serviço.",
  },
  {
    q: "Como envio fotos para o orçamento?",
    a: "Use o WhatsApp comercial. Você pode iniciar a conversa diretamente ou preparar a mensagem no formulário e anexar as fotos na conversa.",
  },
];
