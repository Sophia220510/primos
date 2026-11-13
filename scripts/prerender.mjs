import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";
const server = await createServer({
  server: { middlewareMode: true, watch: null },
  appType: "custom",
});
const escape = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
try {
  const { render, getSeo, indexableRoutes } = await server.ssrLoadModule(
    "/src/entry-server.tsx",
  );
  const template = await fs.readFile("dist/index.html", "utf8");
  for (const route of [...indexableRoutes, "404"]) {
    const seo = getSeo(route);
    let html = template.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escape(seo.title)}</title>`,
    );
    html = html.replace(
      /<meta\s+(?:name|property)="(?:description|robots|og:title|og:description|og:url|og:image)"\s+content="[^"]*"\s*\/?>/g,
      "",
    );
    const head = `<meta name="description" content="${escape(seo.description)}"><meta name="robots" content="${seo.robots}"><link rel="canonical" href="${seo.canonical}"><meta property="og:title" content="${escape(seo.title)}"><meta property="og:description" content="${escape(seo.description)}"><meta property="og:url" content="${seo.canonical}"><meta property="og:image" content="https://www.cromeacaoprimos.com.br/media/instagram/04.webp"><script id="primos-schema" type="application/ld+json">${JSON.stringify(seo.structuredData).replace(/</g, "\\u003c")}</script>`;
    html = html
      .replace("</head>", `${head}</head>`)
      .replace(
        '<div id="root"></div>',
        `<div id="root">${render(route)}</div>`,
      );
    const target = path.join(
      "dist",
      route === "inicio" ? "index.html" : `${route}.html`,
    );
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, html);
  }
  const urls = indexableRoutes.map((route) => getSeo(route).canonical);
  await fs.writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${escape(url)}</loc></url>`).join("")}</urlset>`,
  );
  console.log(
    `Rendered ${indexableRoutes.length} indexable pages, 404 and sitemap.`,
  );
} finally {
  await server.close();
}
