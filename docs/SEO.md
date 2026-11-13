# Indexação e Search Console

Domínio principal: `https://www.cromeacaoprimos.com.br`.

## Implementação

- Arquivo de verificação original copiado para `public/google81e2668a8d6c9a70.html`, sem o sufixo local `(1)`. Não alterar o conteúdo nem remover após verificar a propriedade.
- Removidos o `noindex,nofollow` e o bloqueio global em robots.txt, por solicitação de publicação e indexação do cliente.
- As 15 páginas têm URLs por caminho, sem fragmento. Endereços antigos `#/...` continuam funcionando e são convertidos no navegador. Links internos usam URLs reais; voltar/avançar e o formulário contextual continuam funcionando.
- O build renderiza React em HTML estático para cada página. A página já contém conteúdo, links, título, descrição e JSON-LD antes de executar JavaScript. O cliente hidrata o HTML; o 3D continua sob demanda.
- Títulos e descrições próprios incluem os serviços e São Paulo, sem repetir palavras artificialmente. A história da empresa e os textos revisados pela Laís foram preservados.
- Canonical aponta para a versão www e elimina variações com parâmetros. Sitemap contém as 15 páginas canônicas, sem datas de alteração inventadas.
- JSON-LD: LocalBusiness, WebSite, WebPage, serviços e breadcrumbs. Endereço transcrito dos documentos recebidos; telefone e e-mail confirmados. Não foram inventados horários, avaliações, preços, notas ou prêmios.
- A página 404 recebe noindex. A Vercel atende arquivos estáticos e faz apenas os rewrites conhecidos, sem fallback global que transforme URLs inexistentes em páginas com status 200.
- `cleanUrls` fica desativado para que o arquivo de verificação `.html` mantenha seu endereço exato. Os rewrites das páginas institucionais oferecem URLs sem extensão.

## Publicação e uso

O GitHub está conectado ao projeto Vercel `cromeacaoprimos`. Após a publicação:

1. Conferir `https://www.cromeacaoprimos.com.br/google81e2668a8d6c9a70.html`.
2. Clicar em Verificar na propriedade correspondente do Search Console.
3. Enviar `https://www.cromeacaoprimos.com.br/sitemap.xml` em Sitemaps.
4. Inspecionar a página inicial e solicitar indexação.

O código permite o rastreamento e melhora a compreensão das páginas, mas não determina quando o Google indexa nem garante primeira posição. Visibilidade também depende da concorrência, relevância, Perfil da Empresa, referências externas e qualidade percebida pelo buscador.

## Validação

`npm run build`, `npm run test:seo`, `npm run test:ui`, `npm run test:licenses` e `npm run test:3d`.

O teste de SEO verifica conteúdo com JavaScript desativado, metadados únicos, canonical, schema JSON válido, sitemap, arquivo exato, navegação e volta no histórico, URLs antigas, formulário com parâmetros e HTTP 404.

## Referências primárias

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/appearance/title-link
- https://support.google.com/webmasters/answer/9008080
