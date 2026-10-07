import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
fs.mkdirSync('.playwright',{recursive:true});
const browser=await chromium.launch();
const context=await browser.newContext({permissions:['clipboard-read','clipboard-write'],reducedMotion:'reduce'});
const page=await context.newPage();const errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('fonts.googleapis'))errors.push(m.text());});
await page.addInitScript(()=>{window.__opened=[];window.open=(...args)=>{window.__opened.push(args);return null;};});
const routes=['inicio','servicos','cromacao','niquelacao','trabalhos','processo','empresa','contato'];
for(const width of [360,390,768,1440]){
 await page.setViewportSize({width,height:900});
 for(const route of routes){
  await page.goto(`http://127.0.0.1:5175/#/${route}`);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('h1').count(),1,route);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width} ${route} overflow`);
  for(const link of await page.locator('a[href^="#/"]').all()){assert(routes.includes((await link.getAttribute('href')).slice(2)));}
  for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());assert(await img.evaluate(el=>el.naturalWidth>0));}
  if(route==='contato'){
   await page.locator('#name').fill('João & teste');await page.locator('#piece').fill('Peça metálica de teste');await page.locator('#quantity').fill('20');await page.locator('#dimensions').fill('10 × 5 cm');
   await page.getByRole('button',{name:'Preparar mensagem no WhatsApp'}).click();
   const opened=await page.evaluate(()=>window.__opened.at(-1));assert(opened[0].startsWith('https://wa.me/5511914935874?text='));assert(decodeURIComponent(opened[0]).includes('João & teste'));
   await page.getByRole('button',{name:'Copiar resumo',exact:true}).click();assert((await page.evaluate(()=>navigator.clipboard.readText())).includes('Quantidade: 20'));
   assert((await page.locator('[role=status]').innerText()).includes('Resumo copiado'));
   await page.locator('details').first().locator('summary').click();assert(await page.locator('details').first().evaluate(e=>e.open));
  }
 }
 await page.goto('http://127.0.0.1:5175/#/inicio');
 if(width<=800){await page.getByRole('button',{name:'Menu',exact:false}).click();await page.getByRole('navigation').getByRole('link',{name:'Trabalhos',exact:true}).click();await page.waitForURL('**/#/trabalhos');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
 else{await page.getByRole('navigation').getByRole('link',{name:'Trabalhos',exact:true}).click();await page.waitForURL('**/#/trabalhos');}
 await page.waitForFunction(()=>document.querySelectorAll('.gallery-item').length===10);
 await page.getByRole('button',{name:'Processo',exact:false}).click();assert.equal(await page.locator('.gallery-item').count(),3);
 await page.getByRole('button',{name:'Todos',exact:false}).click();assert.equal(await page.locator('.gallery-item').count(),10);
 const trigger=page.getByRole('button',{name:'Ampliar Superfícies que refletem'});await trigger.click();assert(await page.locator('dialog').evaluate(e=>e.open));
 const first=await page.locator('#modal-title').innerText();await page.keyboard.press('ArrowRight');assert.notEqual(await page.locator('#modal-title').innerText(),first);
 await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('#modal-title').innerText(),first);
 for(let i=0;i<7;i++){await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)));}
 await page.keyboard.press('Escape');assert(await trigger.evaluate(e=>e===document.activeElement));
 await page.waitForFunction(()=>document.body.style.overflow==='');
 await page.goto('http://127.0.0.1:5175/#/inicio');await page.evaluate(()=>document.fonts.ready);
 for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:`.playwright/new-home-${width}.png`,fullPage:true});
 await page.goto('http://127.0.0.1:5175/#/trabalhos');
 for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:`.playwright/new-gallery-${width}.png`,fullPage:true});
 console.log(`${width}px: 8 páginas, imagens, navegação, menu, 10 registros/filtros, modal/teclado/foco, WhatsApp, cópia e FAQ OK`);
}
assert.deepEqual(errors,[]);
const moving=await browser.newContext({reducedMotion:'no-preference'});const mp=await moving.newPage({viewport:{width:1440,height:1000}});
await mp.goto('http://127.0.0.1:5175/#/inicio');await mp.waitForTimeout(1100);
assert.notEqual(await mp.locator('.hero h1>span').first().evaluate(el=>getComputedStyle(el).animationName),'none');
const panel=mp.locator('.service-panel').first();await panel.scrollIntoViewIfNeeded();await mp.waitForTimeout(950);assert(await panel.evaluate(e=>e.classList.contains('in-view')));
await mp.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await mp.waitForTimeout(800);assert(!(await panel.evaluate(e=>e.classList.contains('in-view'))));
await panel.scrollIntoViewIfNeeded();await mp.waitForTimeout(950);assert(await panel.evaluate(e=>e.classList.contains('in-view')));assert.equal(await mp.locator('html').getAttribute('data-direction'),'up');
await mp.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await mp.waitForTimeout(850);await mp.screenshot({path:'.playwright/new-opening.png'});
console.log('Animação de abertura e reentrada ao rolar em ambas as direções OK; modo reduzido e ausência de erros verificados.');
await browser.close();
