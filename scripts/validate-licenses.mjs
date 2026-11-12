import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
fs.mkdirSync('.playwright/licenses/ui',{recursive:true});
const browser=await chromium.launch();
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.clock.install({time:new Date('2026-11-12T12:00:00-03:00')});
for(const width of [360,390,768,1440]){
 await page.setViewportSize({width,height:1000});
 for(const route of ['inicio','empresa','mario-reis']){
  await page.goto(`http://127.0.0.1:5175/#/${route}`);
  const section=page.locator('.f-licenses');
  await expect(section.locator('h2')).toHaveText(/Licenças em dia\./);
  await expect(section.locator('.f-license-list>div')).toHaveCount(5);
  await expect(section).toContainText('Exército Brasileiro');
  await expect(section).toContainText('Polícia Federal');
  await expect(section).toContainText('Corpo de Bombeiros de São Paulo');
  for(const text of ['14/08/2028','12/06/2027','Exercício: 2026','Triênio: 2026 a 2028','30/04/2029'])await expect(section).toContainText(text);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route} ${width}px`);
 }
 await page.locator('.f-licenses').screenshot({path:`.playwright/licenses/ui/licencas-${width}.png`});
 console.log(`${width}px: 5 comprovantes, 4 órgãos e períodos corretos nas 3 páginas, sem overflow.`);
}
await page.clock.setSystemTime(new Date('2027-01-10T12:00:00-03:00'));
await page.reload();
await expect(page.locator('.f-licenses h2')).toHaveText(/Licenças e autorizações\./);
await expect(page.locator('.f-licenses h2')).not.toContainText('em dia');
assert.deepEqual(errors,[]);
console.log('Após o exercício informado, o título muda para uma redação neutra; sem erros de JavaScript.');
await browser.close();
