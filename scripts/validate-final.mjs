import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
fs.mkdirSync(".playwright/final", { recursive: true });
const media = JSON.parse(fs.readFileSync("src/client-media.json", "utf8"));
function filesIn(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? filesIn(`${dir}/${entry.name}`)
        : [`${dir}/${entry.name}`],
    );
}
assert.equal(
  filesIn("public").some((file) => /\.pdf$/i.test(file)),
  false,
  "Os comprovantes não devem ser publicados.",
);
const routes = [
  "inicio",
  "pecas",
  "banhos",
  "processo",
  "mario-reis",
  "empresa",
  "contato",
  ...media.groups.map((g) => `pecas/${g.slug}`),
];
const browser = await chromium.launch();
const context = await browser.newContext({
  reducedMotion: "reduce",
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
for (const width of [360, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:5175/#/${route}`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${width}px ${route}: overflow`,
    );
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((el) => el.decode());
    }
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${width}px ${route}: overflow after images`,
    );
  }
  await page.goto("http://127.0.0.1:5175/#/pecas");
  await expect(page.locator(".r-catalog-item")).toHaveCount(8);
  await page.getByRole("button", { name: "Para panelas", exact: true }).click();
  await expect(page.locator(".r-catalog-item")).toHaveCount(2);
  await expect(page.locator(".r-catalog")).toContainText("Hastes de panela");
  await page
    .getByRole("button", { name: "Metais sanitários", exact: true })
    .click();
  await expect(page.locator(".r-catalog-item")).toHaveCount(3);
  await expect(page.locator(".r-catalog")).toContainText("Torneiras");
  await page
    .getByRole("button", { name: "Outros componentes", exact: true })
    .click();
  await expect(page.locator(".r-catalog-item")).toHaveCount(3);
  await expect(page.locator(".r-catalog")).toContainText("Guidões");
  await page
    .getByRole("button", { name: "Todas as peças", exact: true })
    .click();
  await expect(page.locator(".r-catalog-item")).toHaveCount(8);
  await page.goto("http://127.0.0.1:5175/");
  await page.waitForURL("**/#/inicio");
  await expect(
    page.locator('nav[aria-label="Navegação principal"] a[aria-current]'),
  ).toHaveText("Início");
  await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
  await expect(page.locator(".r-catalog-item")).toHaveCount(8);
  await page
    .getByRole("button", { name: "Mostrar foto de Canoplas", exact: true })
    .click();
  await expect(page.locator(".f-slide-caption h2")).toHaveText("Canoplas");
  await page
    .getByRole("button", {
      name: "Mostrar foto de Hastes de panela",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Pausar faixa animada", exact: true })
    .click();
  await expect(page.locator(".r-moving-band")).toHaveClass(/is-paused/);
  await page
    .getByRole("button", { name: "Retomar faixa animada", exact: true })
    .click();
  await page.getByRole("button", { name: "Niquelação", exact: true }).click();
  await expect(page.locator(".r-finish-element strong")).toHaveText("Ni");
  await expect(page.locator(".r-finish-copy .f-button")).toHaveAttribute(
    "href",
    "#/banhos?tipo=niquelacao",
  );
  await page.getByRole("button", { name: "Cromação", exact: true }).click();
  await expect(page.locator(".r-finish-element strong")).toHaveText("Cr");
  await page
    .getByRole("button", { name: "Próximo destaque", exact: true })
    .click();
  await expect(page.locator(".f-slide-caption h2")).toHaveText("Torneiras");
  await page
    .getByRole("button", { name: "Destaque anterior", exact: true })
    .click();
  await expect(page.locator(".f-slide-caption h2")).toHaveText(
    "Hastes de panela",
  );
  await page
    .getByRole("button", { name: "Ver destaque: Canoplas", exact: true })
    .click();
  await expect(page.locator(".f-slide-caption h2")).toHaveText("Canoplas");
  if (width <= 800) {
    await page.locator(".f-menu-toggle").click();
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Mario Reis", exact: true })
      .click();
    await page.waitForURL("**/#/mario-reis");
    await expect(page.locator(".f-menu-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await page.locator(".f-menu-toggle").click();
    await page.keyboard.press("Escape");
    await expect(page.locator(".f-menu-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  } else {
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Mario Reis", exact: true })
      .click();
    await page.waitForURL("**/#/mario-reis");
  }
  for (const year of ["1979", "1983", "2002", "Hoje"])
    await expect(
      page.locator(".f-timeline article>span").filter({ hasText: year }),
    ).toBeVisible();
  await page.goto("http://127.0.0.1:5175/#/pecas/hastes");
  const trigger = page.getByRole("button", {
    name: "Ampliar Hastes de panela, foto 1",
    exact: true,
  });
  await trigger.click();
  await expect(page.locator("dialog")).toBeVisible();
  const src = await page.locator("dialog>img").getAttribute("src");
  await page.keyboard.press("ArrowRight");
  assert.notEqual(await page.locator("dialog>img").getAttribute("src"), src);
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("dialog>img")).toHaveAttribute("src", src);
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    assert(
      await page.evaluate(() =>
        document.querySelector("dialog").contains(document.activeElement),
      ),
    );
  }
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.waitForFunction(() => document.body.style.overflow === "");
  await page
    .getByRole("link", { name: "Orçar hastes de panela", exact: true })
    .click();
  await page.waitForURL("**/#/contato?peca=hastes");
  await expect(page.locator("#piece")).toHaveValue("Hastes de panela");
  await page.locator("#name").fill("José & teste");
  await page.locator("#quantity").fill("100");
  await page.locator("#dimensions").fill("20 cm");
  await page.locator("#details").fill("Avaliação de acabamento");
  await page
    .getByRole("button", { name: "Preparar mensagem", exact: true })
    .click();
  const href = await page
    .getByRole("link", { name: "Continuar no WhatsApp", exact: true })
    .getAttribute("href");
  assert(href.startsWith("https://wa.me/5511914935874?text="));
  assert(decodeURIComponent(href).includes("José & teste"));
  assert(decodeURIComponent(href).includes("Quantidade: 100"));
  assert(decodeURIComponent(href).includes("Hastes de panela"));
  await page
    .getByRole("button", { name: "Copiar resumo", exact: true })
    .click();
  assert(
    (await page.evaluate(() => navigator.clipboard.readText())).includes(
      "Hastes de panela",
    ),
  );
  await expect(
    page.locator('a[href="mailto:cromeacaoprimos@gmail.com"]').first(),
  ).toHaveAttribute("href", "mailto:cromeacaoprimos@gmail.com");
  await page.locator("details").first().locator("summary").click();
  assert(
    await page
      .locator("details")
      .first()
      .evaluate((e) => e.open),
  );
  await page.goto("http://127.0.0.1:5175/#/contato");
  assert.deepEqual(await page.locator("#bath option").allTextContents(), [
    "Preciso de orientação",
    "Cromação",
    "Niquelação",
  ]);
  await page.locator("#name").fill("Consulta sem quantidade");
  await page.locator("#piece").fill("Minha peça");
  await page
    .getByRole("button", { name: "Preparar mensagem", exact: true })
    .click();
  await expect(page.locator("#summary")).toContainText("");
  assert(
    (await page.locator("#summary").inputValue()).includes(
      "Quantidade: A informar",
    ),
  );
  await page.goto("http://127.0.0.1:5175/#/processo");
  await expect(page.locator(".f-process-list>li")).toHaveCount(6);
  await expect(page.locator(".f-process-steps")).toContainText(
    "Preparação e limpeza",
  );
  await expect(page.locator(".f-process-steps")).toContainText(
    "Lavagem e secagem",
  );
  await page.goto("http://127.0.0.1:5175/#/banhos");
  await expect(page.locator(".f-bath-feature")).toHaveCount(2);
  await expect(page.getByRole("table")).toBeVisible();
  await page
    .getByRole("link", { name: "Consultar niquelação", exact: true })
    .click();
  await page.waitForURL("**/#/contato?banho=niquelacao");
  await expect(page.locator("#bath")).toHaveValue("Niquelação");
  for (const route of [
    "inicio",
    "mario-reis",
    "pecas",
    "contato",
    "banhos",
    "processo",
  ]) {
    await page.goto(`http://127.0.0.1:5175/#/${route}`);
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((el) => el.decode());
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `.playwright/final/${route}-${width}.png`,
      fullPage: true,
    });
  }
  console.log(
    `${width}px: 15 páginas, fotos, vitrine, menu, biografia, modal/foco, orçamento contextual, WhatsApp, cópia, e-mail e FAQ OK.`,
  );
}
await page.goto("http://127.0.0.1:5175/#/servicos");
await page.waitForURL("**/#/banhos");
await page.goto("http://127.0.0.1:5175/#/trabalhos");
await page.waitForURL("**/#/pecas");
const moving = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
});
await moving.goto("http://127.0.0.1:5175/#/inicio");
await moving.waitForTimeout(1000);
assert.notEqual(
  await moving.locator("h1").evaluate((e) => getComputedStyle(e).animationName),
  "none",
);
const card = moving.locator(".r-catalog-item").first();
await card.scrollIntoViewIfNeeded();
await expect(card).toHaveClass(/f-visible/);
await moving.evaluate(() =>
  scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
);
await expect(card).not.toHaveClass(/f-visible/);
await card.scrollIntoViewIfNeeded();
await expect(card).toHaveClass(/f-visible/);
await moving.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
await moving.waitForTimeout(900);
await moving.screenshot({ path: ".playwright/final/abertura-desktop.png" });
assert.deepEqual(errors, []);
console.log(
  "Abertura, reentrada das animações, movimento reduzido, rotas antigas e ausência de erros verificados.",
);
await browser.close();
