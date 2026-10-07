import { useState } from "react";
import type { ReactNode, FormEvent } from "react";
import {
  company as c,
  photos,
  photoById,
  processSteps,
  asset,
} from "./content";
import type { Photo } from "./content";
export const routes = [
  "inicio",
  "servicos",
  "cromacao",
  "niquelacao",
  "trabalhos",
  "processo",
  "empresa",
  "contato",
] as const;
export type Route = (typeof routes)[number];
export const Arrow = () => <span aria-hidden="true">↗</span>;
export const Link = ({
  to,
  children,
  className = "",
}: {
  to: Route;
  children: ReactNode;
  className?: string;
}) => (
  <a className={className} href={`#/${to}`}>
    {children}
  </a>
);
export function Picture({
  id,
  priority = false,
}: {
  id: string;
  priority?: boolean;
}) {
  const p = photoById(id);
  return (
    <img
      src={asset(p.file)}
      alt={p.alt}
      width={p.width}
      height={p.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
export const Label = ({ children }: { children: ReactNode }) => (
  <p className="label">
    <span />
    {children}
  </p>
);
export const Button = ({
  to,
  children,
  secondary = false,
}: {
  to: Route;
  children: ReactNode;
  secondary?: boolean;
}) => (
  <Link to={to} className={`button ${secondary ? "outline" : ""}`}>
    {children}
    <Arrow />
  </Link>
);
export function PageHead({
  tag,
  title,
  text,
}: {
  tag: string;
  title: ReactNode;
  text: string;
}) {
  return (
    <section className="page-head wrap">
      <div className="breadcrumbs">
        <Link to="inicio">Início</Link>
        <span>/</span>
        {tag.startsWith("SERVIÇOS /") && (
          <>
            <Link to="servicos">Serviços</Link>
            <span>/</span>
          </>
        )}
        <span>{tag.replace("SERVIÇOS / ", "")}</span>
      </div>
      <Label>{tag}</Label>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
export function Cta() {
  return (
    <section className="cta wrap motion">
      <Label>O PRÓXIMO DETALHE PODE SER O SEU</Label>
      <div>
        <h2>
          Vamos conversar
          <br />
          sobre a sua <em>peça?</em>
        </h2>
        <Button to="contato">Solicitar orçamento</Button>
      </div>
      <p>
        Fotos, material, quantidade e medidas. Uma conversa com os detalhes
        certos.
      </p>
    </section>
  );
}
export function Faq() {
  return (
    <section className="faq wrap motion">
      <div>
        <Label>ANTES DE COMEÇAR</Label>
        <h2>
          Boas perguntas.
          <br />
          <em>Uma boa conversa.</em>
        </h2>
        <p>O acabamento começa por entender a peça.</p>
      </div>
      <div>
        {c.faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Materials() {
  return (
    <section className="materials wrap motion">
      <div>
        <Label>MATERIAL & APLICAÇÃO</Label>
        <h2>
          Cada metal.
          <br />
          <em>Uma avaliação.</em>
        </h2>
        <p>
          O material, as dimensões e o uso da peça ajudam a definir a
          viabilidade do tratamento.
        </p>
      </div>
      <div className="material-list">
        {c.materials.map((m, i) => (
          <article key={m.name}>
            <span className="material-symbol">{i ? "Zn" : "Fe"}</span>
            <div>
              <h3>{m.name}</h3>
              <p>{m.text}</p>
            </div>
          </article>
        ))}
        <Link to="contato" className="text-link">
          Outro material? Consulte a equipe <Arrow />
        </Link>
      </div>
    </section>
  );
}
export function Services({ full = false }: { full?: boolean }) {
  return (
    <section className="services wrap">
      <div className="section-heading motion">
        <div>
          <Label>O QUE FAZEMOS</Label>
          <h2>
            O valor está
            <br />
            <em>na superfície.</em>
          </h2>
        </div>
        <p>
          Cromação e niquelação. Dois revestimentos, diferentes possibilidades
          de acabamento para a sua peça.
        </p>
      </div>
      <div className="service-panels">
        {c.services.map((s, i) => (
          <article className="service-panel motion" key={s.slug}>
            <div className="service-image">
              <Picture id={s.image} />
              <span className="image-credit">
                {photoById(s.image).frame ? "FRAME DO VÍDEO" : "FOTO REAL"} ·
                INSTAGRAM OFICIAL
              </span>
            </div>
            <div className="service-content">
              <span className="index">0{i + 1} / REVESTIMENTO</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <Link to={s.slug as Route} className="round-link">
                <span>Conhecer {s.name}</span>
                <Arrow />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {full && (
        <div className="service-explainer motion">
          <Label>ENTENDA O SERVIÇO</Label>
          <h3>
            Tratamento da superfície.
            <br />A peça continua sendo a sua.
          </h3>
          <p>
            O revestimento atua sobre a superfície da peça metálica. Antes de
            combinar um serviço, a equipe precisa conhecer o material, o estado
            atual e a aplicação. Brilho e propriedades dependem de cada caso.
          </p>
        </div>
      )}
    </section>
  );
}
export function Process({ full = false }: { full?: boolean }) {
  return (
    <section className="process wrap">
      <div className="section-heading motion">
        <div>
          <Label>POR DENTRO DO TRABALHO</Label>
          <h2>
            Além do brilho.
            <br />
            <em>O cuidado com a peça.</em>
          </h2>
        </div>
        <p>
          Um olhar para o ambiente e para as etapas que a empresa compartilha no
          seu perfil oficial.
        </p>
      </div>
      <div className="process-grid">
        {processSteps.map((s) => (
          <article className="motion" key={s.number}>
            <div className="process-photo">
              <Picture id={s.image} />
              <span>{s.number}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <a
              className="text-link"
              href={photoById(s.image).source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver publicação original <Arrow />
            </a>
          </article>
        ))}
      </div>
      {!full ? (
        <div className="section-bottom">
          <p>Registros reais da Cromeação Primos.</p>
          <Button to="processo" secondary>
            Conhecer o processo
          </Button>
        </div>
      ) : (
        <div className="process-note motion">
          <Label>CADA PEÇA TEM SEU CONTEXTO</Label>
          <h3>
            As etapas podem variar
            <br />
            conforme o trabalho.
          </h3>
          <p>
            Estes registros documentam o que a empresa publicou. A sequência, o
            tratamento indicado e as condições para a sua peça devem ser
            combinados com a equipe.
          </p>
        </div>
      )}
    </section>
  );
}
export function Gallery({
  full = false,
  onOpen,
}: {
  full?: boolean;
  onOpen: (p: Photo, el: HTMLButtonElement) => void;
}) {
  const [filter, setFilter] = useState("Todos");
  const selection = (full ? photos : photos.slice(0, 3)).filter(
    (p) => filter === "Todos" || p.category === filter,
  );
  return (
    <section className={`portfolio wrap ${full ? "full-gallery" : ""}`}>
      <div className="section-heading motion">
        <div>
          <Label>TRABALHOS & REGISTROS REAIS</Label>
          <h2>
            O acabamento
            <br />
            <em>visto de perto.</em>
          </h2>
        </div>
        <div>
          <p>
            Peças, reflexos e bastidores. Uma seleção das publicações da
            Cromeação Primos.
          </p>
          {!full && (
            <Link to="trabalhos" className="text-link">
              Explorar a galeria completa <Arrow />
            </Link>
          )}
        </div>
      </div>
      {full && (
        <div className="filter-bar" role="group" aria-label="Filtrar registros">
          {["Todos", "Peças", "Processo"].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              <span>
                {f === "Todos"
                  ? photos.length
                  : photos.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
          <p>{selection.length} registros do perfil oficial</p>
        </div>
      )}
      <div className="gallery-grid">
        {selection.map((p, i) => (
          <article key={p.id} className={`gallery-item motion item-${i % 4}`}>
            <button
              onClick={(e) => onOpen(p, e.currentTarget)}
              aria-label={`Ampliar ${p.title}`}
            >
              <Picture id={p.id} />
              <span className="gallery-overlay">
                <span>{p.frame ? "FRAME DO VÍDEO" : "FOTOGRAFIA REAL"}</span>
                <span className="circle">+</span>
              </span>
            </button>
            <div className="gallery-meta">
              <span>
                {String(i + 1).padStart(2, "0")} / {p.category}
              </span>
              <h3>{p.title}</h3>
              <p>{p.date}</p>
            </div>
            {full && <p className="gallery-description">{p.description}</p>}
          </article>
        ))}
      </div>
      {!full && (
        <div className="section-bottom">
          <span>Peças e acabamentos publicados pela própria empresa.</span>
          <Button to="trabalhos" secondary>
            Todos os registros
          </Button>
        </div>
      )}
    </section>
  );
}
export function Company({ full = false }: { full?: boolean }) {
  return (
    <>
      <section className="company wrap motion">
        <div className="company-visual">
          <Picture id="11" />
          <span className="year">
            2002<span>O INÍCIO DE UMA HISTÓRIA</span>
          </span>
        </div>
        <div className="company-copy">
          <Label>CROMEAÇÃO PRIMOS LTDA.</Label>
          <h2>
            Uma história
            <br />
            escrita em <em>metal.</em>
          </h2>
          <p className="lead">
            Desde 2002, trabalhando com o tratamento e o revestimento de
            superfícies metálicas.
          </p>
          <p>
            A cromação e a niquelação fazem parte da atuação da Cromeação
            Primos. Nas publicações da empresa, aparecem peças de diferentes
            formatos, trabalhos em gancheiras e momentos de limpeza, inspeção,
            secagem e embalagem.
          </p>
          <p>
            Cada projeto começa com uma peça e suas características. É a partir
            delas que a equipe pode orientar a consulta sobre o acabamento.
          </p>
          <Button to={full ? "contato" : "empresa"} secondary>
            {full ? "Converse com a equipe" : "Conheça a empresa"}
          </Button>
        </div>
      </section>
      {full && (
        <section className="identity wrap motion">
          <div>
            <img
              src={asset("04.webp")}
              alt="Identidade visual publicada pela Cromeação Primos, com símbolo CP em acabamento cromado"
              width="640"
              height="427"
              loading="lazy"
            />
          </div>
          <div>
            <Label>NOSSA IDENTIDADE</Label>
            <h2>
              Primos.
              <br />
              Cromeação.
            </h2>
            <p>
              A marca e as imagens que você vê nesta apresentação vêm do perfil
              oficial da empresa. Um trabalho que se apresenta nas peças, nos
              detalhes e nos registros do dia a dia.
            </p>
            <a
              className="text-link"
              href={c.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Acompanhe no Instagram <Arrow />
            </a>
          </div>
        </section>
      )}
    </>
  );
}
export function Quote() {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = `Olá, Cromeação Primos! Gostaria de consultar um orçamento.\nNome: ${d.get("name")}\nPeça e aplicação: ${d.get("piece")}\nMaterial: ${d.get("material")}\nQuantidade: ${d.get("quantity") || "A informar"}\nMedidas: ${d.get("dimensions") || "A informar"}\nAcabamento: ${d.get("finish")}\nVou anexar fotos da peça na conversa.`;
    setSummary(text);
    setStatus(
      "Resumo preparado. Confira e envie a mensagem na conversa do WhatsApp.",
    );
    window.open(
      `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Resumo copiado. Cole na conversa e anexe as fotos da peça.");
    } catch {
      setStatus("Selecione e copie o resumo abaixo para compartilhar.");
    }
  }
  return (
    <section className="quote wrap">
      <div className="quote-aside motion">
        <Label>SEU PEDIDO, COM OS DETALHES CERTOS</Label>
        <h2>
          Conte sobre
          <br />a sua <em>peça.</em>
        </h2>
        <p>
          Você não precisa conhecer todos os termos técnicos. Uma descrição e
          boas fotos já ajudam a começar a conversa.
        </p>
        <div className="quote-checklist">
          {[
            "Fotografe a peça e os detalhes",
            "Informe o material, se souber",
            "Conte a quantidade e as medidas",
            "Explique o uso e o acabamento desejado",
          ].map((t, i) => (
            <div key={t}>
              <span>0{i + 1}</span>
              <p>{t}</p>
            </div>
          ))}
        </div>
        <div className="contact-card">
          <span>WHATSAPP COMERCIAL</span>
          <a
            href={`https://wa.me/${c.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.phone}
            <Arrow />
          </a>
          <p>Canal divulgado no perfil oficial.</p>
          <a
            className="button direct-contact"
            href={`https://wa.me/${c.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conversar direto no WhatsApp <Arrow />
          </a>
        </div>
        <a
          className="text-link"
          href={c.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prefere conversar no Instagram? <Arrow />
        </a>
      </div>
      <form className="quote-form motion" onSubmit={submit}>
        <div className="form-heading">
          <h3>Preparar orçamento</h3>
          <span>SEUS DETALHES AJUDAM NA AVALIAÇÃO</span>
        </div>
        <label htmlFor="name">
          Seu nome <span>*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          maxLength={100}
          placeholder="Como podemos chamar você?"
        />
        <label htmlFor="piece">
          Peça e aplicação <span>*</span>
        </label>
        <textarea
          id="piece"
          name="piece"
          required
          maxLength={1500}
          rows={3}
          placeholder="Descreva a peça, seu estado atual e onde será utilizada."
        />
        <div className="form-grid">
          <div>
            <label htmlFor="material">Material</label>
            <select id="material" name="material">
              <option>Não sei informar</option>
              <option>Ferro</option>
              <option>Zamac</option>
              <option>Outro material (consultar)</option>
            </select>
          </div>
          <div>
            <label htmlFor="quantity">
              Quantidade <small>(se souber)</small>
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              max="1000000"
              step="1"
              inputMode="numeric"
              placeholder="Ex.: 20"
            />
          </div>
        </div>
        <label htmlFor="dimensions">
          Medidas aproximadas <small>(opcional)</small>
        </label>
        <input
          id="dimensions"
          name="dimensions"
          maxLength={100}
          placeholder="Ex.: 10 × 5 cm"
        />
        <label htmlFor="finish">Acabamento desejado</label>
        <select id="finish" name="finish">
          <option>Preciso de orientação</option>
          <option>Cromação</option>
          <option>Niquelação</option>
        </select>
        <button className="button" type="submit">
          Preparar mensagem no WhatsApp <Arrow />
        </button>
        <p className="form-note">
          Você revisa e envia a mensagem no WhatsApp. Anexe as fotos da peça na
          conversa.
        </p>
        <p className="status" role="status">
          {status}
        </p>
        {summary && (
          <div className="summary-box">
            <label htmlFor="summary">Resumo do pedido</label>
            <textarea
              id="summary"
              readOnly
              value={summary}
              rows={9}
              onFocus={(e) => e.currentTarget.select()}
            />
            <button type="button" className="copy-button" onClick={copy}>
              Copiar resumo <Arrow />
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
export function ServiceDetail({ route }: { route: "cromacao" | "niquelacao" }) {
  const s = c.services.find((s) => s.slug === route)!;
  return (
    <>
      <PageHead
        tag={`SERVIÇOS / ${s.name.toUpperCase()}`}
        title={
          <>
            {s.name}.<br />
            <em>
              {route === "cromacao"
                ? "O detalhe ganha expressão."
                : "Uma camada de possibilidades."}
            </em>
          </>
        }
        text={s.text}
      />
      <section className="detail-service wrap motion">
        <div className="detail-image">
          <Picture id={s.image} priority />
          <span className="image-credit">REGISTRO DO PERFIL OFICIAL</span>
        </div>
        <div>
          <Label>ENTENDA O REVESTIMENTO</Label>
          <h2>{s.label}</h2>
          <p>{s.text}</p>
          <p>
            Material, dimensões, condições da superfície e aplicação são
            informações essenciais para avaliar a peça. Compartilhe esses
            detalhes com a equipe antes de definir o tratamento.
          </p>
          <div className="detail-list">
            <div>
              <span>01</span> Material e estado da peça
            </div>
            <div>
              <span>02</span> Formato, dimensões e quantidade
            </div>
            <div>
              <span>03</span> Aplicação e acabamento desejado
            </div>
          </div>
          <Button to="contato">Consultar minha peça</Button>
        </div>
      </section>
      <Materials />
      <section className="related wrap motion">
        <Label>OUTRO SERVIÇO</Label>
        <Link to={route === "cromacao" ? "niquelacao" : "cromacao"}>
          <h2>{route === "cromacao" ? "Niquelação" : "Cromação"}</h2>
          <Arrow />
        </Link>
      </section>
      <Faq />
      <Cta />
    </>
  );
}
export function Home({
  onOpen,
}: {
  onOpen: (p: Photo, el: HTMLButtonElement) => void;
}) {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <Label>CROMAÇÃO & NIQUELAÇÃO · DESDE 2002</Label>
          <h1>
            <span>Acabamento</span>
            <span>que valoriza</span>
            <span>
              <em>cada peça.</em>
            </span>
          </h1>
          <p>
            Cromação e niquelação de peças metálicas desde 2002. Conheça os
            acabamentos e consulte a equipe sobre a sua peça.
          </p>
          <div className="hero-actions">
            <Button to="contato">Solicitar orçamento</Button>
            <Link className="text-link" to="servicos">
              Conhecer os serviços <Arrow />
            </Link>
          </div>
          <div className="hero-bottom">
            <span>CROMAÇÃO · NIQUELAÇÃO · PEÇAS REAIS</span>
            <button
              onClick={() =>
                document
                  .getElementById("destaques")
                  ?.scrollIntoView({
                    behavior: matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "auto"
                      : "smooth",
                  })
              }
              aria-label="Descer para conhecer os serviços"
            >
              ↓
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <Picture id="12" priority />
          <div className="hero-image-label">
            <span>01 / TRABALHO REAL</span>
            <span>
              Uma superfície.
              <br />
              Muitos detalhes.
            </span>
          </div>
          <a
            className="photo-source"
            href={photoById("12").source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Foto do Instagram oficial <Arrow />
          </a>
        </div>
        <div className="hero-side">CROMEAÇÃO PRIMOS — EST. 2002</div>
      </section>
      <section className="intro-band" id="destaques">
        <div>
          <span>01</span>
          <strong>Cromação</strong>
          <p>Revestimento com cromo.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Niquelação</strong>
          <p>Revestimento com níquel.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Desde 2002</strong>
          <p>Uma história em acabamento.</p>
        </div>
        <Link to="empresa">
          Conheça a Primos <Arrow />
        </Link>
      </section>
      <Services />
      <Gallery onOpen={onOpen} />
      <EnquirySteps />
      <Company />
      <Faq />
      <Cta />
    </>
  );
}
export function EnquirySteps() {
  return (
    <section className="enquiry-steps">
      <div className="wrap">
        <div className="section-heading motion">
          <div>
            <Label>DA SUA PEÇA À CONSULTA</Label>
            <h2>
              Quer saber se podemos
              <br />
              <em>atender sua peça?</em>
            </h2>
          </div>
          <p>
            Comece com uma foto e uma descrição. Você pode pedir orientação
            mesmo sem saber o material ou o acabamento ideal.
          </p>
        </div>
        <div className="enquiry-grid">
          {[
            {
              title: "Mostre a peça",
              text: "Fotografe o formato, a superfície e os detalhes. As imagens podem ser anexadas no WhatsApp.",
            },
            {
              title: "Conte o que precisa",
              text: "Informe o uso da peça, as medidas e a quantidade, se souber. Explique o acabamento que procura.",
            },
            {
              title: "Consulte a equipe",
              text: "Converse sobre a viabilidade, o tratamento indicado e as condições para o seu pedido.",
            },
          ].map((step, i) => (
            <article className="motion" key={step.title}>
              <span>0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="enquiry-actions motion">
          <Button to="contato">Solicitar avaliação da peça</Button>
          <Link to="processo" className="text-link">
            Conheça os bastidores do trabalho <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
