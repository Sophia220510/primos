import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { company as c } from './data';
import './style.css';
import './media.css';

const Arrow = () => <span aria-hidden="true">↗</span>;
const media = c.media[0];
const imageSrc = `${import.meta.env.BASE_URL}${media.src}`;
function App() {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState('');
  const [summary, setSummary] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const galleryButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [menu]);
  useEffect(() => {
    const el = dialog.current;
    const restore = () => { document.body.style.overflow = ''; galleryButton.current?.focus(); };
    el?.addEventListener('close', restore);
    return () => { el?.removeEventListener('close', restore); document.body.style.overflow = ''; };
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Olá, Cromeação Primos! Gostaria de consultar um orçamento.\nNome: ${data.get('name')}\nPeça: ${data.get('piece')}\nMaterial: ${data.get('material')}\nQuantidade: ${data.get('quantity')}\nMedidas: ${data.get('dimensions') || 'A informar'}\nAcabamento: ${data.get('finish')}\nPosso compartilhar fotos na conversa.`;
    setSummary(text);
    if (c.whatsapp) { window.open(`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer'); setStatus('Mensagem preparada. Confira os dados e envie na conversa.'); return; }
    try { await navigator.clipboard.writeText(text); setStatus('Resumo copiado. Cole na conversa do Instagram e anexe as fotos da peça.'); }
    catch { setStatus('Seu resumo está pronto abaixo. Selecione e copie para enviar pelo Instagram.'); }
  }
  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <header className="header"><a className="brand" href="#inicio" aria-label={`${c.name}, início`}><span>CROMEAÇÃO</span><strong>PRIMOS<span className="brand-dot">.</span></strong></a>
      <button ref={menuButton} className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Fechar ×' : 'Menu ☰'}</button>
      <nav id="navigation" ref={navRef} className={menu ? 'nav open' : 'nav'} aria-label="Navegação principal">{[['Serviços', '#servicos'], ['Acabamentos', '#acabamentos'], ['Sobre', '#sobre'], ['Contato', '#contato']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}<a className="nav-cta" href="#orcamento" onClick={() => setMenu(false)}>Solicitar orçamento <Arrow/></a></nav>
    </header>
    <main id="conteudo">
      <section id="inicio" className="hero"><div className="hero-copy"><p className="eyebrow"><span className="tiny-dot"/> SUPERFÍCIES COM NOVAS POSSIBILIDADES</p><h1>Acabamento que valoriza <em>cada peça.</em></h1><p className="hero-description">{c.hero.description}</p><div className="actions"><a className="button" href="#orcamento">Solicitar orçamento <Arrow/></a><a className="text-link" href="#servicos">Conhecer os serviços <span aria-hidden="true">↓</span></a></div><div className="hero-note"><span>O detalhe faz a diferença.</span><span>DESDE {c.since}</span></div></div><figure className="hero-figure"><img src={imageSrc} width={media.width} height={media.height} alt={media.alt} fetchPriority="high"/><figcaption><span>ESTUDO DE SUPERFÍCIE / 001</span><span>Imagem ilustrativa · criada com IA</span></figcaption></figure></section>
      <div className="intro-strip"><span>CROMAÇÃO</span><span className="strip-star" aria-hidden="true">✳</span><span>NIQUELAÇÃO</span><span className="strip-star" aria-hidden="true">✳</span><span>ACABAMENTO METÁLICO</span><span className="strip-note">Cuidado em cada superfície.</span></div>
      <section id="servicos" className="section services reveal"><div className="section-top"><p className="eyebrow">01 / O QUE FAZEMOS</p><span>Da matéria ao acabamento.</span></div><div className="service-layout"><h2>Uma nova camada.<br/><span>Outra expressão.</span></h2><div><p className="section-lead">Tratamos a superfície de peças metálicas. Você traz a peça; a conversa começa pelo material, pela aplicação e pelo acabamento desejado.</p>{c.services.map(s => <article className="service-row" key={s.number}><span className="number">{s.number}</span><div><h3>{s.name}</h3><p>{s.description}</p></div><Arrow/></article>)}</div></div></section>
      <section id="acabamentos" className="finishes"><div className="section-top"><p className="eyebrow">02 / OLHAR DE PERTO</p><span>A superfície também conta uma história.</span></div><div className="finish-heading"><h2>Acabamentos<br/><em>em detalhe.</em></h2><p>Forma, luz e textura.<br/>Um estudo visual das possibilidades<br className="desktop-break"/> do acabamento metálico.</p></div><button className="gallery-button" ref={galleryButton} aria-label="Ampliar estudo ilustrativo de acabamento metálico" onClick={() => { dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }}><img src={imageSrc} width={media.width} height={media.height} loading="lazy" alt={media.alt}/><span className="expand">Ampliar imagem <span aria-hidden="true">↗</span></span></button><div className="gallery-caption"><span>001 — {media.caption}</span><span>Imagem ilustrativa criada com IA. Não representa trabalhos da empresa.</span></div>
        <div className="materials"><div><p className="eyebrow">O MATERIAL É O PONTO DE PARTIDA</p><h3>Cada peça tem<br/>suas características.</h3></div><div>{c.materials.map(m => <article key={m.name}><h4>{m.name}</h4><p>{m.description}</p></article>)}<a href="#orcamento" className="light-link">Outro material? Consulte a equipe <Arrow/></a></div></div>
      </section>
      <section id="sobre" className="section about reveal"><div className="since"><span>DESDE</span><strong>{c.since}</strong><span>CROMEAÇÃO PRIMOS LTDA.</span></div><div><p className="eyebrow">03 / NOSSA EMPRESA</p><h2>O nosso trabalho<br/>está na superfície.</h2><p>A {c.legalName} atua desde {c.since} com cromação e niquelação de peças metálicas. Nosso trabalho é o tratamento e o revestimento da superfície, compondo o acabamento de cada peça.</p><p>Uma boa conversa começa com os detalhes. Compartilhe as características da sua peça para consultar as possibilidades com a equipe.</p><a className="text-link" href={c.instagram} target="_blank" rel="noopener noreferrer">Conheça nosso Instagram <Arrow/></a></div></section>
      <section id="orcamento" className="section quote"><div><p className="eyebrow">04 / VAMOS CONVERSAR</p><h2>Seu próximo<br/><em>acabamento</em><br/>começa aqui.</h2><p>Conte um pouco sobre a sua peça. Prepare o resumo do pedido e compartilhe com a equipe pelo Instagram.</p><div className="quote-tip"><span aria-hidden="true">↗</span><p><strong>Uma foto ajuda muito.</strong><br/>Anexe imagens da peça na conversa. Medidas aproximadas também ajudam na avaliação.</p></div></div><form onSubmit={submit}><div className="form-title"><h3>Prepare seu pedido</h3><span>01 — 05</span></div><label htmlFor="name">Seu nome</label><input id="name" name="name" autoComplete="name" required maxLength={100} placeholder="Como podemos chamar você?"/><label htmlFor="piece">Descrição da peça</label><textarea id="piece" name="piece" required maxLength={1500} rows={3} placeholder="Qual é a peça e onde ela será utilizada?"/><div className="form-grid"><div><label htmlFor="material">Material</label><select id="material" name="material"><option>Não sei informar</option><option>Ferro</option><option>Zamac</option><option>Outro material (consultar)</option></select></div><div><label htmlFor="quantity">Quantidade de peças</label><input id="quantity" name="quantity" type="number" min="1" step="1" max="1000000" required placeholder="Ex.: 20" inputMode="numeric"/></div></div><label htmlFor="dimensions">Medidas aproximadas <span className="optional">(opcional)</span></label><input id="dimensions" name="dimensions" maxLength={100} placeholder="Ex.: 10 × 5 cm"/><label htmlFor="finish">Acabamento desejado</label><select id="finish" name="finish"><option>Preciso de orientação</option><option>Cromação</option><option>Niquelação</option></select><button className="button" type="submit">{c.whatsapp ? 'Preparar mensagem no WhatsApp' : 'Copiar resumo do pedido'} <Arrow/></button><p className="form-note">Este formulário prepara uma mensagem. Seus dados não são enviados pelo site.</p><p className="status" role="status">{status}</p>{summary && <div className="summary"><label htmlFor="summary">Resumo para compartilhar</label><textarea id="summary" value={summary} readOnly rows={9} onFocus={e => e.currentTarget.select()}/><a className="text-link" href={c.instagram} target="_blank" rel="noopener noreferrer">Conversar no Instagram <Arrow/></a></div>}</form></section>
      <section className="section faq reveal"><div><p className="eyebrow">05 / DÚVIDAS FREQUENTES</p><h2>Antes de<br/>começar.</h2></div><div>{c.faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
    </main>
    <footer id="contato"><div className="footer-top"><div><p className="eyebrow">VAMOS DAR FORMA À SUA IDEIA?</p><h2>Converse com a gente.<Arrow/></h2></div><a className="button light" href={c.instagram} target="_blank" rel="noopener noreferrer">Conversar no Instagram <Arrow/></a></div><div className="footer-bottom"><a className="brand" href="#inicio"><span>CROMEAÇÃO</span><strong>PRIMOS.</strong></a><span>{c.legalName}<br/>Cromação e niquelação desde {c.since}.</span><a href="#servicos">Serviços</a><a href="#orcamento">Orçamento</a><span className="preview-label">Prévia para apresentação</span></div></footer>
    <dialog ref={dialog} aria-labelledby="image-title" onKeyDown={e => { if (e.key === 'Tab') { e.preventDefault(); dialog.current?.querySelector<HTMLButtonElement>('button')?.focus(); } }} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><button className="dialog-close" autoFocus onClick={() => dialog.current?.close()} aria-label="Fechar imagem ampliada">Fechar ×</button><img src={imageSrc} alt={media.alt} width={media.width} height={media.height}/><p id="image-title">{media.caption} · Imagem ilustrativa criada com IA</p></dialog>
  </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
