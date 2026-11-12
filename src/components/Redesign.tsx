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
    ? productGroups.filter((g) =>
        ["hastes", "canoplas", "dobradicas"].includes(g.slug),
      )
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
                <ProductImage id={g.cover} />
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
          <article key={n}>
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
