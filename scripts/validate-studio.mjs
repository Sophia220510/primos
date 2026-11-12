import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const page = await browser.newPage({ reducedMotion: "reduce" });
await page.addInitScript(() => {
  window.__studioDraws = 0;
  for (const name of ["drawElements", "drawArrays"]) {
    const original = WebGL2RenderingContext.prototype[name];
    WebGL2RenderingContext.prototype[name] = function (...args) {
      window.__studioDraws++;
      return original.apply(this, args);
    };
  }
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("http://127.0.0.1:5175/#/inicio");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `.playwright/final/editorial-${width}.png` });
  for (const slug of ["hastes", "canoplas", "guidoes"]) {
    await page.goto(`http://127.0.0.1:5175/#/pecas/${slug}`);
    assert.equal(await page.locator("canvas").count(), 0);
    await page.getByRole("button", { name: "Explorar peça em 3D" }).click();
    await expect(page.locator(".p-canvas canvas")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Animar", exact: true }),
    ).toBeVisible();
    await page.waitForTimeout(200);
    const idleDraws = await page.evaluate(() => window.__studioDraws);
    await page.waitForTimeout(200);
    assert.equal(
      await page.evaluate(() => window.__studioDraws),
      idleDraws,
      "Paused studio must not render continuously",
    );
    await page.getByRole("button", { name: "Girar peça à direita" }).click();
    await page.getByRole("button", { name: "Reiniciar", exact: true }).click();
    await page.getByRole("button", { name: "Animar", exact: true }).click();
    await expect
      .poll(() => page.evaluate(() => window.__studioDraws))
      .toBeGreaterThan(idleDraws);
    await page.getByRole("button", { name: "Pausar", exact: true }).click();
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await page
      .locator(".p-studio")
      .screenshot({ path: `.playwright/final/studio-${slug}-${width}.png` });
  }
}
assert.deepEqual(errors, []);
await browser.close();
console.log(
  "3D: all three scenes, desktop/mobile, lazy loading, reduced motion and controls passed.",
);
