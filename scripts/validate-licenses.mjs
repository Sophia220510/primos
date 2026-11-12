import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
fs.mkdirSync(".playwright/licenses/ui", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
for (const width of [360, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of ["inicio", "empresa", "mario-reis"]) {
    await page.goto(`http://127.0.0.1:5175/#/${route}`);
    const section = page.locator(".f-licenses");
    await expect(section.locator("h2")).toHaveText(/Licenças e autorizações\./);
    await expect(section.locator(".f-license-list>div")).toHaveCount(5);
    for (const authority of [
      "Exército Brasileiro",
      "Polícia Federal",
      "Corpo de Bombeiros de São Paulo",
      "Polícia Civil de São Paulo",
    ])
      await expect(section).toContainText(authority);
    assert(
      !/\b20\d{2}\b|\d{2}\/\d{2}|validade|exercício|triênio|em dia/i.test(
        await section.innerText(),
      ),
      "Do not display dates or imply current validity",
    );
    assert(
      !/fundador|fundou|sócios/i.test(await page.locator("main").innerText()),
    );
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${route} ${width}px`,
    );
  }
  await page
    .locator(".f-licenses")
    .screenshot({ path: `.playwright/licenses/ui/licencas-${width}.png` });
  console.log(
    `${width}px: tipos de licença sem datas, biografia corrigida e sem overflow.`,
  );
}
await page.goto("http://127.0.0.1:5175/#/inicio");
await expect(page.locator("h1")).toContainText("Cada peça importa");
await expect(page.locator(".r-hero-facts")).toContainText("Mario Reis");
await expect(page.locator(".r-introduction")).toContainText(
  "mercado desde 2002",
);
await page.goto("http://127.0.0.1:5175/#/pecas/outras-pecas");
await expect(page.locator("h1")).toContainText("Molas");
await expect(page.locator('img[src*="outras-pecas-1"]')).toHaveCount(0);
await expect(page.locator(".f-detail-photo")).toHaveCount(1);
assert.equal(fs.existsSync("public/media/cliente/outras-pecas-1.webp"), false);
assert.deepEqual(errors, []);
await browser.close();
