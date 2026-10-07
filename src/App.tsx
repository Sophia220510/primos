import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { company as c, photos, photoById, asset } from "./content";
import type { Photo } from "./content";
import {
  routes,
  Arrow,
  Link,
  Label,
  PageHead,
  Picture,
  Home,
  Services,
  Materials,
  Process,
  Gallery,
  Company,
  Quote,
  ServiceDetail,
  Faq,
  Cta,
} from "./Sections";
import type { Route } from "./Sections";
import "./professional.css";
import "./refinements.css";
const getRoute = (): Route => {
  const name = location.hash.replace(/^#\/?/, "").split("?")[0];
  return routes.includes(name as Route) ? (name as Route) : "inicio";
};
export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<Photo | null>(null);
  const [progress, setProgress] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    if (
      !location.hash ||
      !routes.includes(
        location.hash.replace(/^#\/?/, "").split("?")[0] as Route,
      )
    ) {
      history.replaceState(
        null,
        "",
        `${location.pathname}${location.search}#/inicio`,
      );
    }
    const change = () => {
      setRoute(getRoute());
      setMenu(false);
      dialog.current?.close();
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    addEventListener("hashchange", change);
    return () => removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    const titles = {
      inicio: "Acabamento que valoriza cada peça",
      contato: "Contato e orçamento",
      empresa: "A empresa",
      trabalhos: "Trabalhos e registros",
      processo: "Nosso processo",
      niquelacao: "Niquelação",
      cromacao: "Cromação",
      servicos: "Serviços",
    };
    document.title = `${titles[route]} — Cromeação Primos`;
    main.current?.focus({ preventScroll: true });
    let last = window.scrollY;
    let raf = 0;
    const scroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        document.documentElement.dataset.direction = y < last ? "up" : "down";
        last = y;
        const max = document.documentElement.scrollHeight - innerHeight;
        setProgress(max > 0 ? y / max : 0);
        document.documentElement.style.setProperty(
          "--hero-shift",
          `${Math.min(y * 0.08, 40)}px`,
        );
      });
    };
    addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("in-view", e.isIntersecting),
        ),
      { threshold: 0.06 },
    );
    const observe = () =>
      document.querySelectorAll(".motion").forEach((e) => observer.observe(e));
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(main.current!, { childList: true, subtree: true });
    document.body.classList.add("enhanced");
    scroll();
    return () => {
      observer.disconnect();
      mutations.disconnect();
      removeEventListener("scroll", scroll);
      cancelAnimationFrame(raf);
    };
  }, [route]);
  useEffect(() => {
    if (!menu) return;
    nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const escape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    addEventListener("keydown", escape);
    return () => removeEventListener("keydown", escape);
  }, [menu]);
  useEffect(() => {
    const el = dialog.current;
    const close = () => {
      setActive(null);
      document.body.style.overflow = "";
      origin.current?.focus();
    };
    el?.addEventListener("close", close);
    return () => el?.removeEventListener("close", close);
  }, []);
  function open(p: Photo, el: HTMLButtonElement) {
    origin.current = el;
    setActive(p);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }
  function next(offset: number) {
    if (active)
      setActive(
        photos[
          (photos.findIndex((p) => p.id === active.id) +
            offset +
            photos.length) %
            photos.length
        ],
      );
  }
  function modalKeys(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") next(1);
    if (e.key === "ArrowLeft") next(-1);
    if (e.key === "Tab") {
      const els = Array.from(
        dialog.current!.querySelectorAll<HTMLElement>("button,a[href]"),
      );
      const first = els[0],
        last = els.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  return (
    <>
      <a
        className="skip"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <div
        className="reading-progress"
        style={{ transform: `scaleX(${progress})` }}
      />
      <header className="header">
        <Link to="inicio" className="brand">
          <img
            src={asset("00.webp")}
            alt="Logo Cromeação Primos"
            width="150"
            height="150"
          />
          <span>
            CROMEAÇÃO<strong>PRIMOS</strong>
          </span>
        </Link>
        <button
          className="menu-toggle"
          ref={menuButton}
          aria-expanded={menu}
          aria-controls="main-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Fechar ×" : "Menu ☰"}
        </button>
        <nav
          ref={nav}
          id="main-nav"
          className={menu ? "open" : ""}
          aria-label="Navegação principal"
        >
          {[
            ["inicio", "Início"],
            ["servicos", "Serviços"],
            ["trabalhos", "Trabalhos"],
            ["empresa", "A empresa"],
          ].map(([to, label]) => (
            <a
              href={`#/${to}`}
              key={to}
              aria-current={route === to ? "page" : undefined}
              data-active={
                route === to ||
                (to === "servicos" &&
                  (route === "cromacao" || route === "niquelacao"))
              }
              onClick={() => setMenu(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#/contato"
            className="nav-cta"
            aria-current={route === "contato" ? "page" : undefined}
            onClick={() => setMenu(false)}
          >
            Pedir orçamento <Arrow />
          </a>
        </nav>
      </header>
      <main
        key={route}
        id="main-content"
        ref={main}
        tabIndex={-1}
        className="page-enter"
      >
        {route === "inicio" ? (
          <Home onOpen={open} />
        ) : route === "servicos" ? (
          <>
            <PageHead
              tag="NOSSOS SERVIÇOS"
              title={
                <>
                  Cromação e niquelação.
                  <br />
                  <em>Conheça os serviços.</em>
                </>
              }
              text="Conheça os dois serviços divulgados pela Cromeação Primos e entenda como começar a consulta sobre a sua peça."
            />
            <Services full />
            <Materials />
            <Process />
            <Cta />
          </>
        ) : route === "cromacao" || route === "niquelacao" ? (
          <ServiceDetail route={route} />
        ) : route === "trabalhos" ? (
          <>
            <PageHead
              tag="GALERIA DE TRABALHOS"
              title={
                <>
                  O trabalho aparece
                  <br />
                  <em>nos detalhes.</em>
                </>
              }
              text="Fotografias e frames de vídeos publicados pela própria empresa. Explore as peças e os bastidores, amplie as imagens e consulte as publicações originais."
            />
            <Gallery full onOpen={open} />
            <Cta />
          </>
        ) : route === "processo" ? (
          <>
            <PageHead
              tag="BASTIDORES & PROCESSO"
              title={
                <>
                  Entre a peça
                  <br />
                  <em>e o acabamento.</em>
                </>
              }
              text="O trabalho visto por dentro, a partir dos registros públicos que a Cromeação Primos compartilha."
            />
            <Process full />
            <section className="process-feature wrap motion">
              <Picture id="06" />
              <div>
                <Label>GANCHEIRA, SECAGEM & EMBALAGEM</Label>
                <h2>
                  Depois dos banhos,
                  <br />
                  <em>o trabalho continua.</em>
                </h2>
                <p>
                  Uma publicação de março de 2023 documenta as peças na
                  gancheira, na secagem e embaladas. São registros reais do
                  trabalho da empresa, reunidos em uma mesma imagem.
                </p>
                <a
                  className="text-link"
                  href={photoById("06").source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar publicação original <Arrow />
                </a>
              </div>
            </section>
            <Cta />
          </>
        ) : route === "empresa" ? (
          <>
            <PageHead
              tag="A CROMEAÇÃO PRIMOS"
              title={
                <>
                  Desde 2002.
                  <br />
                  <em>Uma história em metal.</em>
                </>
              }
              text="Cromação e niquelação de peças metálicas. Conheça a empresa a partir da sua atuação e dos seus registros."
            />
            <Company full />
            <Process />
            <Cta />
          </>
        ) : (
          <>
            <PageHead
              tag="CONTATO E ORÇAMENTO"
              title={
                <>
                  Solicite um orçamento.
                  <br />
                  <em>Conte sobre a sua peça.</em>
                </>
              }
              text="Converse direto pelo WhatsApp ou organize os detalhes da peça para solicitar uma avaliação."
            />
            <Quote />
            <Faq />
          </>
        )}
      </main>
      <footer>
        <div className="footer-top wrap">
          <Link to="inicio" className="brand">
            <img src={asset("00.webp")} alt="" width="150" height="150" />
            <span>
              CROMEAÇÃO<strong>PRIMOS</strong>
            </span>
          </Link>
          <p>
            Metal. Superfície.
            <br />
            Novas possibilidades.
          </p>
          <a
            className="footer-instagram"
            href={c.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            @cromeacao_primos <Arrow />
          </a>
        </div>
        <div className="footer-grid wrap">
          <div>
            <h3>Vamos conversar.</h3>
            <a
              href={`https://wa.me/${c.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.phone} <Arrow />
            </a>
            <p>WhatsApp divulgado no perfil oficial.</p>
          </div>
          <div>
            <span>EXPLORE</span>
            <Link to="inicio">Início</Link>
            <Link to="empresa">A empresa</Link>
            <Link to="trabalhos">Trabalhos reais</Link>
            <Link to="processo">Processo</Link>
          </div>
          <div>
            <span>SERVIÇOS</span>
            <Link to="cromacao">Cromação</Link>
            <Link to="niquelacao">Niquelação</Link>
            <Link to="contato">Solicitar orçamento</Link>
          </div>
          <div>
            <span>ACOMPANHE</span>
            <a href={c.instagram} target="_blank" rel="noopener noreferrer">
              Instagram <Arrow />
            </a>
            <button
              onClick={() =>
                scrollTo({
                  top: 0,
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                })
              }
            >
              Voltar ao topo ↑
            </button>
          </div>
        </div>
        <div className="footer-word wrap" aria-hidden="true">
          PRIMOS<span>·</span>
        </div>
        <div className="footer-bottom wrap">
          <span>
            {c.legalName} · Desde {c.since}
          </span>
          <span>Prévia para apresentação</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        aria-labelledby="modal-title"
        className="lightbox"
        onKeyDown={modalKeys}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="modal-close"
          autoFocus
          onClick={() => dialog.current?.close()}
          aria-label="Fechar imagem ampliada"
        >
          Fechar ×
        </button>
        {active && (
          <>
            <div className="modal-image">
              <img
                src={asset(active.file)}
                alt={active.alt}
                width={active.width}
                height={active.height}
              />
            </div>
            <div className="modal-info">
              <div>
                <span className="index">
                  {active.frame ? "FRAME DE VÍDEO" : "FOTO REAL"} ·{" "}
                  {active.date}
                </span>
                <h2 id="modal-title">{active.title}</h2>
                <p>{active.description}</p>
                <a
                  href={active.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver publicação original <Arrow />
                </a>
              </div>
              <div className="modal-controls">
                <button aria-label="Imagem anterior" onClick={() => next(-1)}>
                  ←
                </button>
                <span>
                  {photos.findIndex((p) => p.id === active.id) + 1} /{" "}
                  {photos.length}
                </span>
                <button aria-label="Próxima imagem" onClick={() => next(1)}>
                  →
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
