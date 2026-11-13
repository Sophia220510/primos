import { business, productGroups } from "./final-data";
import { routeHref } from "./routing";
export const SITE_URL = "https://www.cromeacaoprimos.com.br";
export const indexableRoutes = [
  "inicio",
  "pecas",
  "banhos",
  "processo",
  "mario-reis",
  "empresa",
  "contato",
  ...productGroups.map((g) => `pecas/${g.slug}`),
];
const content: Record<string, [string, string]> = {
  inicio: [
    "Cromação e Niquelação em São Paulo | Cromeação Primos",
    "Cromação e niquelação em ferro, metais e zamac em São Paulo. Especialistas em hastes de panela. Unidades e lotes: envie fotos e peça seu orçamento.",
  ],
  pecas: [
    "Cromação de Peças: Hastes, Molas e Mais | Primos",
    "Conheça peças com acabamento da Primos: hastes de panela, pesos, dobradiças, torneiras, canoplas, flexíveis, guidões e molas. Atendimento em São Paulo.",
  ],
  banhos: [
    "Cromação e Niquelação: Banhos e Acabamentos | Primos",
    "Entenda os serviços de cromação e niquelação da Primos em São Paulo. Consulte o acabamento para peças de ferro, metais e zamac, em unidades e lotes.",
  ],
  processo: [
    "Processo de Cromação e Niquelação de Peças | Primos",
    "Da avaliação à conferência do acabamento: conheça as etapas usuais do tratamento de superfície e consulte a Primos sobre material, peça e quantidade.",
  ],
  "mario-reis": [
    "Mario Reis: Mais de 40 Anos de Experiência | Primos",
    "Conheça a trajetória de Mario Reis, no ramo da cromeação desde 1983 e à frente da Cromeação Primos. Experiência no cuidado com peças e acabamentos.",
  ],
  empresa: [
    "Cromeação Primos em São Paulo: Conheça a Empresa",
    "A Primos está no mercado desde 2002, com cromação e niquelação em ferro, metais e zamac. Conheça a atuação, a experiência de Mario Reis e as licenças.",
  ],
  contato: [
    "Orçamento de Cromação e Niquelação em São Paulo | Primos",
    "Peça seu orçamento à Cromeação Primos pelo WhatsApp (11) 91493-5874. Envie fotos, material e quantidade. Atendimento em São Paulo para unidades e lotes.",
  ],
  "404": [
    "Página não encontrada | Cromeação Primos",
    "A página solicitada não foi encontrada. Conheça os serviços de cromação e niquelação da Cromeação Primos em São Paulo.",
  ],
};
export function getSeo(routeKey: string) {
  const route = routeKey.split("?")[0];
  const slug = route.split("/")[1];
  const group = productGroups.find((g) => g.slug === slug);
  const [title, description] = group
    ? [
        `Acabamento de ${group.name} em São Paulo | Primos`,
        `Cromação e niquelação de ${group.name.toLowerCase()} em São Paulo. Atendimento em unidades e lotes. Envie fotos e consulte o acabamento com a Primos.`,
      ]
    : content[route] || content["404"];
  const canonical = `${SITE_URL}${routeHref(route)}`;
  const organization = {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#empresa`,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    telephone: "+5511914935874",
    email: business.email,
    image: `${SITE_URL}/media/instagram/04.webp`,
    logo: `${SITE_URL}/media/instagram/00.webp`,
    sameAs: [business.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Frei Inocêncio, 46",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "03940-050",
      addressCountry: "BR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cromação e niquelação",
      itemListElement: ["Cromação", "Niquelação"].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${SITE_URL}/#empresa` },
          areaServed: { "@type": "City", name: "São Paulo" },
        },
      })),
    },
  };
  const graph: unknown[] = [
    organization,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: business.name,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#empresa` },
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#pagina`,
      url: canonical,
      name: title,
      description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#site` },
    },
  ];
  if (route !== "inicio" && route !== "404")
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: `${SITE_URL}/`,
        },
        ...(group
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: "Peças e aplicações",
                item: `${SITE_URL}/pecas`,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: group ? 3 : 2,
          name: group?.name || title.split("|")[0].trim(),
          item: canonical,
        },
      ],
    });
  return {
    title,
    description,
    canonical,
    robots:
      route === "404"
        ? "noindex,follow"
        : "index,follow,max-image-preview:large",
    structuredData: { "@context": "https://schema.org", "@graph": graph },
  };
}
export function updateSeo(routeKey: string) {
  const seo = getSeo(routeKey);
  document.title = seo.title;
  const meta = (attribute: string, name: string, value: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(
      `meta[${attribute}="${name}"]`,
    );
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.content = value;
  };
  meta("name", "description", seo.description);
  meta("name", "robots", seo.robots);
  meta("property", "og:title", seo.title);
  meta("property", "og:description", seo.description);
  meta("property", "og:url", seo.canonical);
  meta("property", "og:image", `${SITE_URL}/media/instagram/04.webp`);
  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = seo.canonical;
  let schema = document.getElementById("primos-schema");
  if (!schema) {
    schema = document.createElement("script");
    schema.id = "primos-schema";
    schema.setAttribute("type", "application/ld+json");
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify(seo.structuredData);
}
