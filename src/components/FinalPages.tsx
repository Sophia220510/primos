import { useState } from "react";
import type { FormEvent } from "react";
import {
  business,
  productGroups,
  productPhotos,
  baths,
  processStages,
  timeline,
  faqs,
  mediaUrl,
  waLink,
} from "../final-data";
import type { ProductPhoto } from "../final-data";
import {
  Action,
  Arrow,
  RouteLink,
  Eyebrow,
  ProductImage,
  PageIntro,
  FinalCta,
  FounderPreview,
  LicenseBlock,
  DirectContact,
} from "./FinalShared";
export type OpenPhoto = (
  photo: ProductPhoto,
  trigger: HTMLButtonElement,
) => void;

export function Showcase() {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      photo: "hastes-1",
      category: "Hastes de panela",
      label: "Nosso carro-chefe",
      to: "pecas/hastes",
    },
    {
      photo: "torneiras-1",
      category: "Torneiras",
      label: "O cuidado com cada superfície",
      to: "pecas/torneiras",
    },
    {
      photo: "canoplas-1",
      category: "Canoplas",
      label: "Acabamento nos detalhes",
      to: "pecas/canoplas",
    },
  ];
  const current = slides[slide];
  return (
    <section className="f-showcase" aria-label="Vitrine de acabamentos">
      <div className="f-showcase-copy">
        <Eyebrow>CROMAÇÃO & NIQUELAÇÃO · DESDE 2002</Eyebrow>
        <h1>
          O detalhe muda
          <br />
          <em>toda a peça.</em>
        </h1>
        <p>
          Cromação e niquelação em ferro, metais e zamac. Da unidade ao lote, um
          acabamento pensado para a sua peça.
        </p>
        <div className="f-hero-actions">
          <Action />
          <Action to="pecas" secondary>
            Conheça as peças
          </Action>
        </div>
        <div className="f-hero-proof">
          <span>
            1983<strong>Experiência no ramo</strong>
          </span>
          <span>
            2002<strong>Início da Primos</strong>
          </span>
          <span>
            1 ou +<strong>Unidades e lotes</strong>
          </span>
        </div>
      </div>
      <div className="f-showcase-media" key={current.photo}>
        <ProductImage id={current.photo} priority={slide === 0} />
        <div className="f-photo-index">
          <span>FOTOGRAFIA REAL · CROMEAÇÃO PRIMOS</span>
          <span>0{slide + 1} / 03</span>
        </div>
        <div className="f-slide-caption" aria-live="polite">
          <span>{current.label}</span>
          <h2>{current.category}</h2>
          <RouteLink to={current.to}>
            Ver acabamento da peça <Arrow />
          </RouteLink>
        </div>
      </div>
      <div className="f-showcase-controls">
        <div className="f-dots" aria-label="Escolher destaque">
          {slides.map((s, i) => (
            <button
              key={s.photo}
              aria-label={`Ver destaque: ${s.category}`}
              aria-pressed={slide === i}
              onClick={() => setSlide(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="f-slider-arrows">
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
export function ProductGrid({ featured = false }: { featured?: boolean }) {
  const groups = featured ? productGroups.slice(0, 5) : productGroups;
  return (
    <section className="f-products f-container">
      <div className="f-section-head f-reveal">
        <div>
          <Eyebrow>PEÇAS & APLICAÇÕES</Eyebrow>
          <h2>
            Diferentes formas.
            <br />
            <em>O mesmo cuidado.</em>
          </h2>
        </div>
        <div>
          <p>
            Conheça algumas das peças que passam pela Primos. Fotografias reais
            do nosso trabalho, do detalhe ao conjunto.
          </p>
          {featured && (
            <RouteLink className="f-text-link" to="pecas">
              Explorar todas as peças <Arrow />
            </RouteLink>
          )}
        </div>
      </div>
      <div className={`f-product-grid ${featured ? "f-featured-grid" : ""}`}>
        {groups.map((g, i) => (
          <RouteLink
            to={`pecas/${g.slug}`}
            key={g.slug}
            className={`f-product-card f-reveal ${i === 0 ? "f-product-main" : ""}`}
          >
            <div>
              <ProductImage id={g.cover} />
              <span className="f-card-arrow">
                <Arrow />
              </span>
              {g.slug === "hastes" && (
                <span className="f-main-badge">CARRO-CHEFE</span>
              )}
            </div>
            <span className="f-category-index">
              0{i + 1} / {g.caption}
            </span>
            <h3>{g.name}</h3>
          </RouteLink>
        ))}
      </div>
    </section>
  );
}
export function Flagship() {
  return (
    <section className="f-flagship">
      <div className="f-container">
        <div className="f-flagship-image f-reveal">
          <ProductImage id="hastes-3" />
          <span>
            HASTES DE PANELA
            <br />
            <strong>Nosso carro-chefe.</strong>
          </span>
        </div>
        <div className="f-reveal">
          <Eyebrow>UM DESTAQUE DA NOSSA PRODUÇÃO</Eyebrow>
          <h2>
            Nas hastes,
            <br />
            <em>a nossa assinatura.</em>
          </h2>
          <p className="f-lead">
            O carro-chefe da Primos merece um lugar especial.
          </p>
          <p>
            As hastes de panela fazem parte do dia a dia do nosso trabalho. Do
            conjunto ao detalhe, o acabamento da superfície recebe a atenção de
            quem tem experiência no ramo desde 1983.
          </p>
          <div className="f-inline-facts">
            <span>Unidades e lotes</span>
            <span>Avaliação por peça</span>
          </div>
          <Action to="pecas/hastes">Conheça as hastes</Action>
        </div>
      </div>
    </section>
  );
}
export function BathPreview() {
  return (
    <section className="f-bath-preview f-container f-reveal">
      <div>
        <Eyebrow>BANHOS & ACABAMENTOS</Eyebrow>
        <h2>
          A superfície ganha
          <br />
          <em>uma nova camada.</em>
        </h2>
        <p>
          O tratamento é escolhido conforme o material, as características e a
          aplicação da peça. A equipe orienta a consulta sobre o acabamento.
        </p>
        <Action to="banhos" secondary>
          Entenda os banhos
        </Action>
      </div>
      <div className="f-bath-list">
        {baths.map((b) => (
          <RouteLink to={`banhos?tipo=${b.id}`} key={b.id}>
            <span className="f-element">
              {b.symbol}
              <small>{b.number}</small>
            </span>
            <div>
              <h3>{b.name}</h3>
              <p>{b.text}</p>
            </div>
            <Arrow />
          </RouteLink>
        ))}
        <RouteLink className="f-bath-consult" to="contato">
          Não sabe qual escolher? Peça orientação <Arrow />
        </RouteLink>
      </div>
    </section>
  );
}
export function Faq() {
  return (
    <section className="f-faq f-container f-reveal">
      <div>
        <Eyebrow>ANTES DE PEDIR UM ORÇAMENTO</Eyebrow>
        <h2>
          Respostas para
          <br />
          <em>começar a conversa.</em>
        </h2>
        <p>
          Você não precisa saber todos os termos técnicos para consultar a
          Primos.
        </p>
      </div>
      <div>
        {faqs.map(({ q, a }) => (
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
export function Home() {
  return (
    <>
      <Showcase />
      <div className="f-trust-strip">
        <div className="f-container">
          <span>FERRO, METAIS & ZAMAC</span>
          <span>UNIDADES & LOTES</span>
          <span>HASTES DE PANELA EM DESTAQUE</span>
          <RouteLink to="mario-reis">
            Conheça quem faz <Arrow />
          </RouteLink>
        </div>
      </div>
      <ProductGrid featured />
      <Flagship />
      <BathPreview />
      <FounderPreview />
      <LicenseBlock />
      <Faq />
      <FinalCta />
    </>
  );
}
export function ProductsPage() {
  return (
    <>
      <PageIntro
        label="Peças & aplicações"
        title={
          <>
            O acabamento aparece
            <br />
            <em>em cada detalhe.</em>
          </>
        }
        text="Hastes de panela, pesos, dobradiças, metais sanitários e outras peças. Explore nossos registros e converse sobre a sua necessidade."
      />
      <ProductGrid />
      <FinalCta />
    </>
  );
}
export function ProductDetail({
  slug,
  onOpen,
}: {
  slug: string;
  onOpen: OpenPhoto;
}) {
  const group = productGroups.find((g) => g.slug === slug);
  if (!group) return <ProductsPage />;
  const photos = productPhotos.filter((p) => p.category === slug);
  return (
    <>
      <PageIntro
        label={group.name}
        parent={{ to: "pecas", label: "Peças & aplicações" }}
        title={
          <>
            {group.name}.<br />
            <em>
              {group.slug === "hastes"
                ? "Nosso carro-chefe."
                : group.caption + "."}
            </em>
          </>
        }
        text={group.description}
      />
      <section className="f-product-detail f-container">
        <div className="f-product-detail-gallery">
          {photos.map((p, i) => (
            <button
              className="f-detail-photo f-reveal"
              key={p.id}
              onClick={(e) => onOpen(p, e.currentTarget)}
              aria-label={`Ampliar ${group.name}, foto ${i + 1}`}
            >
              <ProductImage id={p.id} priority={i === 0} />
              <span>
                0{i + 1} / FOTOGRAFIA REAL <strong>+</strong>
              </span>
            </button>
          ))}
        </div>
        <aside className="f-product-consult f-reveal">
          <Eyebrow>FALE SOBRE A SUA PEÇA</Eyebrow>
          <h2>
            Uma unidade
            <br />
            ou <em>um lote?</em>
          </h2>
          <p>
            Atendemos as duas necessidades. Informe o material, as medidas e o
            acabamento desejado para consultar a viabilidade.
          </p>
          <ul>
            <li>Ferro, metais e zamac</li>
            <li>Avaliação conforme a aplicação</li>
            <li>Fotos ajudam na consulta</li>
          </ul>
          <RouteLink className="f-button" to={`contato?peca=${group.slug}`}>
            Orçar {group.name.toLowerCase()} <Arrow />
          </RouteLink>
          <RouteLink className="f-text-link" to="banhos">
            Conheça os banhos <Arrow />
          </RouteLink>
        </aside>
      </section>
      <section className="f-related f-container">
        <Eyebrow>OUTRAS PEÇAS</Eyebrow>
        <div>
          {productGroups
            .filter((g) => g.slug !== slug)
            .slice(0, 3)
            .map((g) => (
              <RouteLink to={`pecas/${g.slug}`} key={g.slug}>
                <ProductImage id={g.cover} />
                <h3>
                  {g.name}
                  <Arrow />
                </h3>
              </RouteLink>
            ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
export function BathsPage() {
  const selected = new URLSearchParams(location.hash.split("?")[1]).get("tipo");
  return (
    <>
      <PageIntro
        label="Banhos & acabamentos"
        title={
          <>
            Novas camadas.
            <br />
            <em>Novas possibilidades.</em>
          </>
        }
        text="Cromação e niquelação para o acabamento de superfícies. Conheça os serviços e consulte o tratamento conforme o material da sua peça."
      />
      <div className="f-bath-shortcuts f-container">
        {baths.map((b) => (
          <a
            key={b.id}
            href={`#/banhos?tipo=${b.id}`}
            aria-current={selected === b.id ? "true" : undefined}
          >
            {b.name}
            <span>↓</span>
          </a>
        ))}
        <RouteLink to="processo">
          Conheça o processo <Arrow />
        </RouteLink>
      </div>
      {baths.map((b) => (
        <section
          id={b.id}
          key={b.id}
          className={`f-bath-feature f-container f-reveal ${selected === b.id ? "f-bath-selected" : ""}`}
        >
          <div>
            <ProductImage id={b.image} />
            <span>FOTOGRAFIA REAL DAS PEÇAS DA PRIMOS</span>
          </div>
          <div>
            <Eyebrow>{b.number} / REVESTIMENTO DE SUPERFÍCIE</Eyebrow>
            <h2>{b.name}.</h2>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
            <p>{b.detail}</p>
            <Action to={`contato?banho=${b.id}`}>
              Consultar {b.name.toLowerCase()}
            </Action>
          </div>
        </section>
      ))}
      <section className="f-bath-guide f-container f-reveal">
        <div className="f-section-head">
          <div>
            <Eyebrow>ENTENDA A ESCOLHA</Eyebrow>
            <h2>
              Qual banho combina
              <br />
              <em>com a sua peça?</em>
            </h2>
          </div>
          <p>
            O nome do banho é só o começo. Material, estado da superfície e
            aplicação ajudam a definir o revestimento.
          </p>
        </div>
        <table>
          <caption className="f-sr-only">
            Comparação entre cromação e niquelação
          </caption>
          <thead>
            <tr>
              <th scope="col">O que considerar</th>
              <th scope="col">Cromação</th>
              <th scope="col">Niquelação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Revestimento</th>
              <td>Acabamento da superfície com cromo.</td>
              <td>Revestimento da superfície com níquel.</td>
            </tr>
            <tr>
              <th scope="row">No acabamento</th>
              <td>Compõe o acabamento final do sistema de revestimento.</td>
              <td>
                Pode compor o acabamento ou servir de base para outros
                revestimentos.
              </td>
            </tr>
            <tr>
              <th scope="row">Para definir</th>
              <td colSpan={2}>
                A equipe avalia o material, o formato, a superfície e o uso da
                peça.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="f-bath-guide-action">
          <p>
            Não precisa escolher sozinho. Selecione “Preciso de orientação” no
            orçamento.
          </p>
          <Action>Receber orientação</Action>
        </div>
      </section>
      <section className="f-material-band">
        <div className="f-container f-reveal">
          <div>
            <Eyebrow>O MATERIAL É O PONTO DE PARTIDA</Eyebrow>
            <h2>
              Ferro, metais
              <br />
              <em>e zamac.</em>
            </h2>
          </div>
          <div>
            <p>
              Trabalhamos com peças de ferro, metais e zamac. Zamac é uma liga
              metálica à base de zinco.
            </p>
            <p>
              As dimensões, o estado da superfície e a aplicação da peça ajudam
              a definir a viabilidade do banho. Consulte a equipe sobre o seu
              material específico.
            </p>
            <Action secondary>Consultar meu material</Action>
          </div>
        </div>
      </section>
      <Faq />
      <FinalCta />
    </>
  );
}
export function ProcessPage() {
  return (
    <>
      <PageIntro
        label="Processo & cuidado"
        title={
          <>
            Além do brilho,
            <br />
            <em>existe trabalho.</em>
          </>
        }
        text="Conheça as etapas usuais do tratamento de superfície: da preparação do metal à conferência do acabamento. A sequência é ajustada ao material, ao formato e à aplicação da peça."
      />
      <section className="f-process-opening f-container f-reveal">
        <img
          src={mediaUrl(business.portraitWork)}
          alt="Mario Reis trabalhando na limpeza e inspeção de peças metálicas na empresa."
          width="1200"
          height="1600"
          loading="eager"
        />
        <div>
          <Eyebrow>A EXPERIÊNCIA NO DIA A DIA</Eyebrow>
          <h2>
            Conhecer a peça.
            <br />
            <em>Cuidar do acabamento.</em>
          </h2>
          <p>
            O trabalho da Primos é o tratamento e o revestimento de superfícies.
            O banho indicado e as etapas necessárias variam conforme o material,
            o estado e a finalidade da peça.
          </p>
          <p>
            A preparação da superfície, a montagem das peças e os cuidados entre
            os banhos fazem parte do caminho até o acabamento. É um trabalho de
            etapas: cada uma contribui para o resultado da seguinte.
          </p>
          <Action to="contato">Converse sobre o seu projeto</Action>
        </div>
      </section>
      <section className="f-process-steps f-container">
        <div className="f-section-head f-reveal">
          <div>
            <Eyebrow>DO METAL AO ACABAMENTO</Eyebrow>
            <h2>
              O cuidado acontece
              <br />
              <em>em cada etapa.</em>
            </h2>
          </div>
        </div>
        <ol
          className="f-process-list"
          aria-label="Etapas usuais do tratamento de superfície"
        >
          {processStages.map((s, i) => (
            <li key={s.title}>
              <article key={s.title} className="f-reveal">
                <span>0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <ProductImage id={s.image} />
              </article>
            </li>
          ))}
        </ol>
      </section>
      <BathPreview />
      <FinalCta />
    </>
  );
}
export function FounderPage() {
  return (
    <>
      <section className="f-founder-hero">
        <div className="f-container">
          <div>
            <nav className="f-breadcrumb" aria-label="Você está aqui">
              <RouteLink to="inicio">Início</RouteLink>
              <span>/</span>
              <span aria-current="page">Mario Reis</span>
            </nav>
            <Eyebrow>FUNDADOR DA CROMEAÇÃO PRIMOS</Eyebrow>
            <h1>
              Mario Reis.
              <br />
              Uma vida de trabalho.
              <br />
              <em>Uma história em metal.</em>
            </h1>
            <p>
              De Pernambuco a São Paulo. Do primeiro trabalho no ramo, em 1983,
              ao próprio negócio. Uma trajetória construída perto das peças, dos
              banhos e de cada detalhe.
            </p>
            <span className="f-founder-signature">
              Mario Reis <small>NO RAMO DESDE 1983</small>
            </span>
          </div>
          <figure>
            <img
              src={mediaUrl(business.portrait)}
              alt="Retrato de Mario Reis, fundador da Cromeação Primos, com óculos e camisa azul."
              width="1200"
              height="1600"
              fetchPriority="high"
            />
            <figcaption>
              Mario Reis · Retrato com tratamento de fundo.
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="f-biography f-container f-reveal">
        <Eyebrow>EXPERIÊNCIA QUE SE CONSTRÓI COM O TEMPO</Eyebrow>
        <div>
          <h2>
            Quem conhece o trabalho,
            <br />
            <em>reconhece o detalhe.</em>
          </h2>
          <div>
            <p className="f-lead">
              Mario é pernambucano e chegou a São Paulo em 1979 para construir
              uma nova etapa da sua vida.
            </p>
            <p>
              Em 1983, começou a trabalhar no ramo da cromeação. O ofício passou
              a fazer parte da sua rotina, com a experiência formada no contato
              direto com as peças e os procedimentos.
            </p>
            <p>
              Em 2002, iniciou o próprio negócio com dois sócios. Hoje, Mario
              segue à frente da Primos sem os sócios iniciais, dando
              continuidade ao trabalho que acompanha há mais de quatro décadas.
            </p>
            <p>
              Pai de Laís e Bernardo, sua história pessoal se encontra com a
              história da empresa: tempo, trabalho e dedicação a um ofício.
            </p>
          </div>
        </div>
      </section>
      <section
        className="f-timeline f-container"
        aria-label="Linha do tempo de Mario Reis"
      >
        {timeline.map((t) => (
          <article className="f-reveal" key={t.year}>
            <span>{t.year}</span>
            <div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="f-founder-at-work f-container f-reveal">
        <div>
          <img
            src={mediaUrl(business.portraitWork)}
            alt="Mario Reis inspecionando peças na bancada de trabalho."
            width="1200"
            height="1600"
            loading="lazy"
          />
          <img
            src={mediaUrl(business.portraitDetail)}
            alt="Mario Reis observando o acabamento de uma peça metálica."
            width="1200"
            height="1600"
            loading="lazy"
          />
        </div>
        <div>
          <Eyebrow>PERTO DE CADA PEÇA</Eyebrow>
          <h2>
            A história continua
            <br />
            <em>no trabalho de hoje.</em>
          </h2>
          <p>
            A experiência de Mario não está só nas datas. Está também nos
            registros do trabalho, no olhar sobre a superfície e na atenção aos
            detalhes.
          </p>
          <Action to="pecas" secondary>
            Conheça as peças
          </Action>
        </div>
      </section>
      <LicenseBlock />
      <FinalCta />
    </>
  );
}
export function CompanyPage() {
  return (
    <>
      <PageIntro
        label="A Cromeação Primos"
        title={
          <>
            Desde 2002,
            <br />
            <em>cuidando de cada superfície.</em>
          </>
        }
        text="Cromação e niquelação de peças de ferro, metais e zamac, com atendimento em unidades e lotes."
      />
      <section className="f-company-story f-container f-reveal">
        <img
          src={mediaUrl(business.logo)}
          alt="Logo oficial da Cromeação Primos com símbolo CP cromado sobre fundo de metal escovado."
          width="640"
          height="427"
        />
        <div>
          <Eyebrow>UM NEGÓCIO CONSTRUÍDO COM EXPERIÊNCIA</Eyebrow>
          <h2>
            Primos no nome.
            <br />
            <em>Acabamento no trabalho.</em>
          </h2>
          <p>
            A Primos começou em 2002, quando Mario Reis iniciou o próprio
            negócio ao lado de dois sócios. Hoje, ele conduz a empresa e dá
            continuidade à sua trajetória na cromeação, iniciada em 1983.
          </p>
          <p>
            As hastes de panela são o carro-chefe. O trabalho também aparece em
            pesos de panela, dobradiças, torneiras, canoplas e outras peças.
          </p>
          <Action to="mario-reis" secondary>
            Conheça Mario Reis
          </Action>
        </div>
      </section>
      <LicenseBlock />
      <FinalCta />
    </>
  );
}
export function ContactPage() {
  const params = new URLSearchParams(location.hash.split("?")[1]);
  const initialGroup = productGroups.find((g) => g.slug === params.get("peca"));
  const bath = baths.find((b) => b.id === params.get("banho"));
  const [summary, setSummary] = useState(""),
    [status, setStatus] = useState("");
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = `Olá, Cromeação Primos! Gostaria de solicitar uma avaliação.\nNome: ${d.get("name")}\nPeça: ${d.get("piece")}\nMaterial: ${d.get("material")}\nQuantidade: ${d.get("quantity") || "A informar"}\nMedidas: ${d.get("dimensions") || "A informar"}\nBanho desejado: ${d.get("bath")}\nObservações: ${d.get("details") || "A informar"}\nVou anexar fotos na conversa.`;
    setSummary(text);
    setStatus("Mensagem preparada. Confira os dados e envie no WhatsApp.");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Resumo copiado. Cole na conversa e anexe as fotos.");
    } catch {
      setStatus("Selecione e copie o resumo abaixo para compartilhar.");
    }
  }
  return (
    <>
      <PageIntro
        label="Contato & orçamento"
        title={
          <>
            A sua peça.
            <br />
            <em>A nossa próxima conversa.</em>
          </>
        }
        text="Uma unidade ou um lote. Comece pelo WhatsApp, envie um e-mail ou prepare os detalhes abaixo."
      />
      <section className="f-contact-layout f-container">
        <div className="f-reveal">
          <Eyebrow>FALE DIRETO COM A EQUIPE</Eyebrow>
          <h2>
            Como podemos
            <br />
            <em>ajudar?</em>
          </h2>
          <p>
            Não sabe o material ou o acabamento ideal? Compartilhe uma foto e
            conte o que precisa. A equipe orienta a consulta.
          </p>
          <DirectContact />
          <div className="f-contact-tip">
            <strong>Uma boa foto ajuda.</strong>
            <p>
              Mostre a peça inteira e alguns detalhes da superfície. Você pode
              anexar as imagens na conversa do WhatsApp.
            </p>
          </div>
        </div>
        <form onSubmit={prepare} className="f-quote-form f-reveal">
          <Eyebrow>ORGANIZE SEU PEDIDO</Eyebrow>
          <h2>Prepare seu orçamento.</h2>
          <p>Preencha o que souber. Você revisa a mensagem antes de enviar.</p>
          <label htmlFor="name">
            Seu nome <span>*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Como podemos chamar você?"
          />
          <label htmlFor="piece">
            Qual é a peça? <span>*</span>
          </label>
          <input
            id="piece"
            name="piece"
            defaultValue={initialGroup?.name || ""}
            required
            maxLength={200}
            placeholder="Ex.: hastes de panela"
          />
          <div className="f-form-grid">
            <div>
              <label htmlFor="material">Material</label>
              <select id="material" name="material">
                <option>Não sei informar</option>
                <option>Ferro</option>
                <option>Zamac</option>
                <option>Outro metal (informar na conversa)</option>
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
                placeholder="Unidade ou lote"
                inputMode="numeric"
              />
            </div>
          </div>
          <label htmlFor="dimensions">
            Medidas aproximadas <small>(opcional)</small>
          </label>
          <input
            id="dimensions"
            name="dimensions"
            maxLength={150}
            placeholder="Ex.: 20 cm de comprimento"
          />
          <label htmlFor="bath">Banho desejado</label>
          <select
            id="bath"
            name="bath"
            defaultValue={bath?.name || "Preciso de orientação"}
          >
            <option>Preciso de orientação</option>
            {baths.map((b) => (
              <option key={b.id}>{b.name}</option>
            ))}
          </select>
          <label htmlFor="details">
            Conte um pouco mais <small>(opcional)</small>
          </label>
          <textarea
            id="details"
            name="details"
            rows={3}
            maxLength={2000}
            placeholder="Aplicação, estado da peça e o que você procura."
          />
          <button className="f-button" type="submit">
            Preparar mensagem <Arrow />
          </button>
          <p className="f-form-footnote">
            Você confere e envia no WhatsApp. O formulário não envia o pedido
            automaticamente.
          </p>
          <p role="status" className="f-form-status">
            {status}
          </p>
          {summary && (
            <div className="f-summary">
              <label htmlFor="summary">Seu pedido</label>
              <textarea
                id="summary"
                readOnly
                value={summary}
                rows={10}
                onFocus={(e) => e.currentTarget.select()}
              />
              <a
                className="f-button"
                href={waLink(summary)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Continuar no WhatsApp <Arrow />
              </a>
              <button type="button" className="f-copy" onClick={copy}>
                Copiar resumo <Arrow />
              </button>
            </div>
          )}
        </form>
      </section>
      <Faq />
    </>
  );
}
