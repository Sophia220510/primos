import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
const origin = "https://www.cromeacaoprimos.com.br";
const sitemap = await fs.readFile("dist/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(urls.length, 16);
assert.equal(new Set(urls).size, 16);
assert(urls.includes(`${origin}/pecas/parafusos`));
const titles = new Set(),
  descriptions = new Set();
for (const url of urls) {
  assert(url.startsWith(origin) && !url.includes("#"));
  const route = new URL(url).pathname;
  const html = await fs.readFile(
    `dist/${route === "/" ? "index" : route.slice(1)}.html`,
    "utf8",
  );
  assert(!html.includes("noindex"));
  assert(html.includes("<h1>"));
  assert(html.includes(`rel="canonical" href="${url}"`));
  assert(!html.includes('href="#/'));
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  const desc = html.match(/name="description" content="([^"]*)"/)[1];
  assert(!titles.has(title));
  assert(!descriptions.has(desc));
  titles.add(title);
  descriptions.add(desc);
  const schema = JSON.parse(
    html.match(
      /id="primos-schema" type="application\/ld\+json">(.*?)<\/script>/s,
    )[1],
  );
  assert(schema["@graph"].some((n) => n["@type"] === "LocalBusiness"));
}
const token = "google-site-verification: google81e2668a8d6c9a70.html";
assert.equal(
  (await fs.readFile("dist/google81e2668a8d6c9a70.html", "utf8")).trim(),
  token,
);
const robots = await fs.readFile("dist/robots.txt", "utf8");
assert(!robots.includes("Disallow: /"));
assert(robots.includes(`${origin}/sitemap.xml`));
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  let file = decodeURIComponent(url.pathname);
  let status = 200;
  if (file === "/inicio") {
    res.writeHead(308, { Location: "/" });
    res.end();
    return;
  }
  const relative = file === "/" ? "index.html" : file.slice(1);
  if (relative.includes("..")) {
    res.writeHead(400);
    res.end();
    return;
  }
  let data;
  try {
    data = await fs.readFile(path.join("dist", relative));
  } catch {
    try {
      data = await fs.readFile(path.join("dist", `${relative}.html`));
    } catch {
      data = await fs.readFile("dist/404.html");
      status = 404;
    }
  }
  const ext = path.extname(relative);
  res.writeHead(status, {
    "Content-Type":
      {
        ".js": "text/javascript",
        ".css": "text/css",
        ".webp": "image/webp",
        ".xml": "application/xml",
        ".txt": "text/plain",
      }[ext] || "text/html",
  });
  res.end(data);
});
await new Promise((resolve) => server.listen(5188, "127.0.0.1", resolve));
const browser = await chromium.launch();
try {
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const page = await nojs.newPage();
  for (const url of urls) {
    const response = await page.goto(
      `http://127.0.0.1:5188${new URL(url).pathname}`,
    );
    assert.equal(response.status(), 200);
    await expect(page.locator("h1")).toHaveCount(1);
    assert((await page.locator("main").innerText()).length > 300);
  }
  assert.equal(
    (await page.goto("http://127.0.0.1:5188/pagina-inexistente")).status(),
    404,
  );
  const interactive = await browser.newPage();
  const errors = [];
  interactive.on("pageerror", (e) => errors.push(e.message));
  interactive.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  for (const url of urls) {
    await interactive.goto(`http://127.0.0.1:5188${new URL(url).pathname}`);
    await expect(interactive.locator("h1")).toHaveCount(1);
    await expect(interactive.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      url,
    );
  }
  await interactive.goto("http://127.0.0.1:5188/contato?peca=hastes");
  await expect(interactive.locator("#piece")).toHaveValue("Hastes de panela");
  await interactive.goto("http://127.0.0.1:5188/#/mario-reis");
  await interactive.waitForURL("**/mario-reis");
  await expect(interactive.locator("h1")).toContainText("Mario Reis");
  await interactive
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Início", exact: true })
    .click();
  await interactive.waitForURL("http://127.0.0.1:5188/");
  await interactive.goBack();
  await expect(interactive.locator("h1")).toContainText("Mario Reis");
  assert.deepEqual(errors, []);
  console.log(
    "SEO: 16 pages with pre-rendered content, unique metadata, schemas, canonical, sitemap, verification, no-JS access, hydration, navigation/back, legacy hashes and HTTP 404 passed.",
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
