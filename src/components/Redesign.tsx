import { useState } from "react";
import { productGroups } from "../final-data";
import { Action, Arrow, Eyebrow, ProductImage, RouteLink } from "./FinalShared";

const slides = [
  {
    photo: "hastes-3",
    title: "Hastes de panela",
    label: "01 — Nosso carro-chefe",
    slug: "hastes",
  },
  {
    photo: "torneiras-1",
    title: "Torneiras",
    label: "02 — Metais sanitários",
    slug: "torneiras",
  },
  {
    photo: "canoplas-1",
    title: "Canoplas",
    label: "03 — Atenção aos detalhes",
    slug: "canoplas",
  },
];

export function Showcase() {
  const [slide, setSlide] = useState(0);
  const current = slides[slide];
  return (
    <section className="r-hero" aria-label="Vitrine de acabamentos">
      <div className="r-hero-image" key={current.photo}>
        <ProductImage id={current.photo} priority sizes="100vw" />
      </div>
      <div className="r-hero-top">
        <span>CROMEAÇÃO PRIMOS</span>
        <span>ACABAMENTOS METÁLICOS / DESDE 2002</span>
      </div>
      <div className="r-hero-content">
        <Eyebrow>Da unidade ao lote. Do metal ao detalhe.</Eyebrow>
        <h1>
          O metal é o começo.
          <br />
          <em>
            O acabamento
            <br />
            faz a diferença.
          </em>
        </h1>
        <div className="r-hero-bottom-copy">
          <p>
            Cromação e niquelação para peças em ferro, metais e zamac.
            Experiência de quem conhece cada etapa do trabalho.
          </p>
          <Action>Vamos falar da sua peça</Action>
        </div>
        <div className="r-hero-facts">
          <span>
            <strong>1983</strong>Experiência no ramo
          </span>
          <span>
            <strong>2002</strong>Fundação da Primos
          </span>
          <span>
            <strong>1 ou +</strong>Unidades e lotes
          </span>
        </div>
      </div>
      <div className="r-hero-previews" aria-label="Peças em destaque">
        {slides.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => setSlide(i)}
            aria-pressed={slide === i}
            aria-label={`Mostrar foto de ${s.title}`}
          >
            <ProductImage id={s.photo} sizes="(max-width: 1100px) 30vw, 20vw" />
            <span>
              0{i + 1}
              <strong>{s.title}</strong>
              <Arrow />
            </span>
          </button>
        ))}
      </div>
      <div className="r-hero-bottom">
        <div className="f-slide-caption" aria-live="polite">
          <span>{current.label}</span>
          <RouteLink to={`pecas/${current.slug}`}>
            <h2>{current.title}</h2>
            <Arrow />
          </RouteLink>
        </div>
        <div className="r-slide-navigation">
          <div className="f-dots" aria-label="Escolher destaque">
            {slides.map((s, i) => (
              <button
                key={s.slug}
                aria-label={`Ver destaque: ${s.title}`}
                aria-pressed={slide === i}
                onClick={() => setSlide(i)}
              >
                <span />
              </button>
            ))}
          </div>
          <button
            aria-label="Destaque anterior"
            onClick={() => setSlide((slide + 2) % 3)}
          >
            ←
          </button>
          <button
            aria-label="Próximo destaque"
            onClick={() => setSlide((slide + 1) % 3)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export function Introduction() {
  return (
    <section className="r-introduction f-container f-reveal">
      <div>
        <Eyebrow>01 / A CROMEAÇÃO PRIMOS</Eyebrow>
        <span className="r-years">
          1983
          <span>
            O início de uma trajetória
            <br />
            no acabamento de metais.
          </span>
        </span>
        <div className="r-intro-mosaic">
          <ProductImage id="pesos-1" />
          <ProductImage id="flexiveis-1" />
          <span>
            PEÇAS REAIS.
            <br />
            TRABALHO DE VERDADE.
          </span>
        </div>
      </div>
      <div>
        <h2>
          Peças diferentes.
          <br />
          Uma experiência que
          <br />
          <em>atravessa gerações.</em>
        </h2>
        <div className="r-intro-text">
          <p>
            Na Primos, o trabalho começa com a sua necessidade. Uma peça, um
            lote, um acabamento: cada consulta leva em conta o material e a
            aplicação.
          </p>
          <p>
            À frente da empresa está Mario Reis. No ramo desde 1983, ele fundou
            a Primos em 2002 e continua próximo do trabalho, todos os dias.
          </p>
        </div>
        <RouteLink to="empresa" className="f-text-link">
          Conheça a Primos <Arrow />
        </RouteLink>
      </div>
    </section>
  );
}

const filters = [
  { label: "Todas as peças", slugs: [] as string[] },
  { label: "Para panelas", slugs: ["hastes", "pesos"] },
  { label: "Metais sanitários", slugs: ["torneiras", "canoplas", "flexiveis"] },
  {
    label: "Outros componentes",
    slugs: ["dobradicas", "guidoes", "outras-pecas"],
  },
];
export function Collection({ featured = false }: { featured?: boolean }) {
  const [filter, setFilter] = useState(0);
  const groups = featured
    ? productGroups
    : productGroups.filter(
        (g) => filter === 0 || filters[filter].slugs.includes(g.slug),
      );
  return (
    <section
      className={`r-collection ${featured ? "r-collection-featured" : ""}`}
    >
      <div className="f-container">
        <div className="r-section-heading f-reveal">
          <div>
            <Eyebrow>
              {featured
                ? "02 / PEÇAS QUE PASSAM POR AQUI"
                : "EXPLORE POR APLICAÇÃO"}
            </Eyebrow>
            <h2>
              O trabalho,
              <br />
              <em>visto de perto.</em>
            </h2>
          </div>
          <div>
            <p>
              Superfícies, formas e reflexos. Um olhar sobre as peças reais que
              fazem parte do dia a dia da Primos.
            </p>
            {featured && (
              <RouteLink className="f-text-link" to="pecas">
                Ver todas as aplicações <Arrow />
              </RouteLink>
            )}
          </div>
        </div>
        {!featured && (
          <div className="r-filters" aria-label="Filtrar peças por aplicação">
            {filters.map((f, i) => (
              <button
                key={f.label}
                aria-pressed={i === filter}
                onClick={() => setFilter(i)}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
        <div className="r-catalog" aria-live="polite">
          {groups.map((g) => (
            <RouteLink
              key={g.slug}
              to={`pecas/${g.slug}`}
              className="r-catalog-item f-reveal"
            >
              <div className="r-catalog-photo">
                <ProductImage id={g.cover} sizes="(max-width: 800px) 45vw, (max-width: 1100px) 30vw, 23vw" />
                <span className="r-catalog-open">
                  <Arrow />
                </span>
                {["hastes", "canoplas", "guidoes"].includes(g.slug) && (
                  <span className="r-3d-label">EXPERIÊNCIA 3D</span>
                )}
              </div>
              <div className="r-catalog-caption">
                <span>
                  {g.slug === "hastes" ? "NOSSO CARRO-CHEFE" : g.caption}
                </span>
                <h3>{g.name}</h3>
              </div>
            </RouteLink>
          ))}
        </div>
        {featured && (
          <div className="r-catalog-footer">
            <span>Ferro, metais e zamac. Unidades e lotes.</span>
            <RouteLink to="pecas">
              Explore o catálogo completo <Arrow />
            </RouteLink>
          </div>
        )}
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section className="r-journey f-container f-reveal">
      <div className="r-section-heading">
        <div>
          <Eyebrow>DO PRIMEIRO CONTATO AO ACABAMENTO</Eyebrow>
          <h2>
            Vamos começar
            <br />
            <em>pela sua peça.</em>
          </h2>
        </div>
        <RouteLink to="processo" className="f-text-link">
          Conheça as etapas do processo <Arrow />
        </RouteLink>
      </div>
      <div className="r-journey-steps">
        {[
          [
            "01",
            "Mostre o que você precisa.",
            "Envie fotos, material e quantidade. Se ainda não souber todos os detalhes, a conversa pode começar mesmo assim.",
          ],
          [
            "02",
            "Converse sobre o acabamento.",
            "Cromação ou niquelação: a equipe avalia a peça e orienta a consulta conforme a aplicação.",
          ],
          [
            "03",
            "Alinhe o seu pedido.",
            "Viabilidade, condições e prazo são combinados diretamente com a Primos antes do serviço.",
          ],
        ].map(([n, title, text]) => (
          <article key={n} className="f-reveal">
            <div className="r-journey-photo">
              <ProductImage
                id={
                  n === "01"
                    ? "hastes-2"
                    : n === "02"
                      ? "canoplas-2"
                      : "dobradicas-2"
                }
              />
            </div>
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <Action>Consultar meu pedido</Action>
    </section>
  );
}

export function MovingBand() {
  const [paused, setPaused] = useState(false);
  const words = [
    "CROMAÇÃO",
    "NIQUELAÇÃO",
    "FERRO",
    "METAIS",
    "ZAMAC",
    "UNIDADES & LOTES",
  ];
  return (
    <section
      className={`r-moving-band f-reveal ${paused ? "is-paused" : ""}`}
      aria-label="Serviços e materiais"
    >
      <div className="r-moving-window">
        <div className="r-moving-track">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {words.map((word) => (
                <span key={word}>
                  {word}
                  <i aria-hidden="true">✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Retomar faixa animada" : "Pausar faixa animada"}
      >
        {paused ? "▶" : "Ⅱ"}
      </button>
    </section>
  );
}

export function FinishExplorer() {
  const [selected, setSelected] = useState(0);
  const options = [
    {
      name: "Cromação",
      symbol: "Cr",
      number: "24",
      photo: "torneiras-2",
      text: "O acabamento acompanha a forma. Conheça a cromação e converse sobre a aplicação na sua peça.",
      to: "banhos?tipo=cromacao",
    },
    {
      name: "Niquelação",
      symbol: "Ni",
      number: "28",
      photo: "canoplas-3",
      text: "Uma nova camada na superfície. Entenda a niquelação e consulte a equipe sobre o seu material.",
      to: "banhos?tipo=niquelacao",
    },
  ];
  const item = options[selected];
  return (
    <section className="r-finish-explorer f-reveal">
      <div className="f-container">
        <div className="r-finish-copy">
          <Eyebrow>DUAS POSSIBILIDADES. UM OLHAR ATENTO.</Eyebrow>
          <h2>
            A forma é sua.
            <br />
            <em>
              O acabamento
              <br />é com a Primos.
            </em>
          </h2>
          <div className="r-finish-tabs" aria-label="Explorar acabamentos">
            {options.map((o, i) => (
              <button
                key={o.name}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {o.name}
                <Arrow />
              </button>
            ))}
          </div>
          <p aria-live="polite">{item.text}</p>
          <RouteLink to={item.to} className="f-button">
            Conhecer {item.name.toLowerCase()} <Arrow />
          </RouteLink>
        </div>
        <div className="r-finish-visual" key={item.name}>
          <ProductImage id={item.photo} />
          <div className="r-finish-element">
            <span>{item.number}</span>
            <strong>{item.symbol}</strong>
            <span>{item.name}</span>
          </div>
          <span className="r-finish-note">
            REGISTRO REAL DE PEÇAS DA PRIMOS
          </span>
        </div>
      </div>
    </section>
  );
}
