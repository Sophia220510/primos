import { observeRevealMotion } from "./reveal-motion";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  business,
  productPhotos,
  productGroups,
  mediaUrl,
  waLink,
} from "./final-data";
import type { ProductPhoto } from "./final-data";
import {
  Home,
  ProductsPage,
  ProductDetail,
  BathsPage,
  ProcessPage,
  FounderPage,
  CompanyPage,
  ContactPage,
} from "./components/FinalPages";
import { Arrow, RouteLink } from "./components/FinalShared";
import "./final.css";

const aliases: Record<string, string> = {
  servicos: "banhos",
  trabalhos: "pecas",
  cromacao: "banhos?tipo=cromacao",
  niquelacao: "banhos?tipo=niquelacao",
};
const known = [
  "inicio",
  "pecas",
  "banhos",
  "processo",
  "mario-reis",
  "empresa",
  "contato",
];
function resolve() {
  const raw = location.hash.replace(/^#\/?/, "");
  const key = aliases[raw] || raw || "inicio";
  return known.includes(key.split(/[/?]/)[0]) ? key : "inicio";
}
const navItems = [
  { to: "inicio", label: "Início" },
  { to: "pecas", label: "Peças & aplicações" },
  { to: "banhos", label: "Banhos & acabamentos" },
  { to: "processo", label: "Processo" },
  { to: "mario-reis", label: "Mario Reis" },
  { to: "empresa", label: "A empresa" },
  { to: "contato", label: "Contato" },
];
function Brand() {
  return (
    <RouteLink
      to="inicio"
      className="f-brand"
      aria-label="Cromeação Primos, início"
    >
      <img
        src={mediaUrl(business.logoSmall)}
        alt="Símbolo CP da Cromeação Primos"
        width="150"
        height="150"
      />
      <span>
        CROMEAÇÃO<strong>PRIMOS</strong>
        <small>CROMAÇÃO & NIQUELAÇÃO</small>
      </span>
    </RouteLink>
  );
}
export default function App() {
  const [routeKey, setRouteKey] = useState(resolve),
    [menu, setMenu] = useState(false),
    [active, setActive] = useState<ProductPhoto | null>(null);
  const main = useRef<HTMLElement>(null),
    nav = useRef<HTMLElement>(null),
    menuButton = useRef<HTMLButtonElement>(null),
    dialog = useRef<HTMLDialogElement>(null),
    origin = useRef<HTMLButtonElement | null>(null);
  const [page, slug] = routeKey.split("?")[0].split("/");
  const activePhotos = active
    ? productPhotos.filter((photo) => photo.category === active.category)
    : [];
  useEffect(() => {
    const sync = () => {
      const key = resolve();
      if (location.hash !== `#/${key}`)
        history.replaceState(
          null,
          "",
          `${location.pathname}${location.search}#/${key}`,
        );
      setRouteKey(key);
      setMenu(false);
      dialog.current?.close();
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    sync();
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    const titles: Record<string, string> = {
      inicio: "Cromação e niquelação de peças",
      pecas: slug
        ? productGroups.find((g) => g.slug === slug)?.name ||
          "Peças & aplicações"
        : "Peças & aplicações",
      banhos: "Banhos & acabamentos",
      processo: "Processo & cuidado",
      "mario-reis": "Mario Reis — Nossa história",
      empresa: "A empresa",
      contato: "Contato e orçamento",
    };
    document.title = `${titles[page] || titles.inicio} | Cromeação Primos`;
    main.current?.focus({ preventScroll: true });
    const stopMotion = main.current
      ? observeRevealMotion(main.current)
      : undefined;
    document.body.classList.add("f-motion-ready");
    const type = new URLSearchParams(routeKey.split("?")[1]).get("tipo");
    const timer = type
      ? requestAnimationFrame(() =>
          document
            .getElementById(type)
            ?.scrollIntoView({ behavior: "instant", block: "start" }),
        )
      : 0;
    return () => {
      stopMotion?.();
      cancelAnimationFrame(timer);
    };
  }, [routeKey, page, slug]);
  useEffect(() => {
    if (!menu) return;
    nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, [menu]);
  useEffect(() => {
    const el = dialog.current;
    const close = () => {
      setActive(null);
      document.body.style.overflow = "";
      if (origin.current?.isConnected) origin.current.focus();
    };
    el?.addEventListener("close", close);
    return () => {
      el?.removeEventListener("close", close);
      document.body.style.overflow = "";
    };
  }, []);
  function open(photo: ProductPhoto, trigger: HTMLButtonElement) {
    origin.current = trigger;
    setActive(photo);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }
  function next(offset: number) {
    setActive((current) => {
      if (!current) return null;
      const categoryPhotos = productPhotos.filter(
        (p) => p.category === current.category,
      );
      return categoryPhotos[
        (categoryPhotos.findIndex((p) => p.id === current.id) +
          offset +
          categoryPhotos.length) %
          categoryPhotos.length
      ];
    });
  }
  function modalKeys(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      next(-1);
    }
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
        className="f-skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <div className="f-reading-progress" />
      <div className="f-contact-bar">
        <div className="f-container">
          <span>CROMAÇÃO & NIQUELAÇÃO</span>
          <div>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp {business.phone}
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <Arrow />
            </a>
          </div>
        </div>
      </div>
      <header className="f-header">
        <div className="f-masthead f-container">
          <div className="f-masthead-note">
            <span>MARIO REIS · NO RAMO DESDE 1983</span>
            <strong>
              A experiência encontra
              <br />o acabamento.
            </strong>
          </div>
          <Brand />
          <div className="f-masthead-action">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="f-header-consult"
            >
              Converse com a Primos <Arrow />
            </a>
            <span>UNIDADES E LOTES</span>
          </div>
          <button
            ref={menuButton}
            className="f-menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="f-navigation"
          >
            {menu ? "Fechar ×" : "Menu ☰"}
          </button>
        </div>
        <nav
          ref={nav}
          id="f-navigation"
          className={menu ? "f-navigation f-menu-open" : "f-navigation"}
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <RouteLink
              key={item.to}
              to={item.to}
              aria-current={page === item.to ? "page" : undefined}
              onClick={() => setMenu(false)}
            >
              {item.label}
            </RouteLink>
          ))}
          <RouteLink
            to="contato"
            className="f-nav-quote"
            onClick={() => setMenu(false)}
          >
            Pedir orçamento <Arrow />
          </RouteLink>
        </nav>
      </header>
      <main id="main" ref={main} tabIndex={-1} key={routeKey}>
        {page === "inicio" ? (
          <Home />
        ) : page === "pecas" ? (
          slug ? (
            <ProductDetail slug={slug} onOpen={open} />
          ) : (
            <ProductsPage />
          )
        ) : page === "banhos" ? (
          <BathsPage />
        ) : page === "processo" ? (
          <ProcessPage />
        ) : page === "mario-reis" ? (
          <FounderPage />
        ) : page === "empresa" ? (
          <CompanyPage />
        ) : (
          <ContactPage />
        )}
      </main>
      <footer className="f-footer">
        <div className="f-container">
          <div className="f-footer-top">
            <Brand />
            <p>
              Da experiência no ramo
              <br />
              ao cuidado com a sua peça.
            </p>
            <RouteLink to="contato" className="f-button">
              Quero meu orçamento <Arrow />
            </RouteLink>
          </div>
          <div className="f-footer-columns">
            <div>
              <EyebrowFooter>CONTATO</EyebrowFooter>
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                {business.phone}
              </a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                @cromeacao_primos <Arrow />
              </a>
            </div>
            <div>
              <EyebrowFooter>EXPLORE</EyebrowFooter>
              <RouteLink to="inicio">Início</RouteLink>
              <RouteLink to="pecas">Peças & aplicações</RouteLink>
              <RouteLink to="banhos">Banhos & acabamentos</RouteLink>
              <RouteLink to="processo">Processo</RouteLink>
            </div>
            <div>
              <EyebrowFooter>NOSSA HISTÓRIA</EyebrowFooter>
              <RouteLink to="mario-reis">Mario Reis</RouteLink>
              <RouteLink to="empresa">A Cromeação Primos</RouteLink>
              <RouteLink to="empresa">Licenças e responsabilidade</RouteLink>
            </div>
            <div>
              <EyebrowFooter>O SEU PEDIDO</EyebrowFooter>
              <RouteLink to="pecas/hastes">Hastes de panela</RouteLink>
              <RouteLink to="contato">Solicitar orçamento</RouteLink>
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
          <div className="f-footer-type" aria-hidden="true">
            PRIMOS
          </div>
          <div className="f-footer-bottom">
            <span>{business.legalName}</span>
            <span>Fotografias reais da empresa.</span>
          </div>
        </div>
      </footer>
      <a
        className="f-floating-wa"
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com a Primos no WhatsApp"
        title="WhatsApp — Fale com a Primos"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="25"
          height="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.6-4.7A9 9 0 1 1 21 11.5Z" />
          <path d="m8 7 2-.5 1 3-1.2 1a8 8 0 0 0 3.7 3.7l1-1.2 3 1-.5 2c-.2.6-.8.9-1.4.8-4.7-.8-8.6-4.7-9.4-9.4C6.1 7.8 6.7 7.2 8 7Z" />
        </svg>
      </a>
      <dialog
        ref={dialog}
        className="f-lightbox"
        aria-labelledby="f-modal-title"
        onKeyDown={modalKeys}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          autoFocus
          className="f-modal-close"
          onClick={() => dialog.current?.close()}
          aria-label="Fechar imagem ampliada"
        >
          Fechar ×
        </button>
        {active && (
          <>
            <img
              src={mediaUrl(active.src)}
              alt={active.alt}
              width={active.width}
              height={active.height}
            />
            <div className="f-modal-info">
              <div>
                <p>FOTOGRAFIA REAL · CROMEAÇÃO PRIMOS</p>
                <h2 id="f-modal-title">{active.title}</h2>
              </div>
              <div className="f-modal-controls">
                <button aria-label="Imagem anterior" onClick={() => next(-1)}>
                  ←
                </button>
                <span>
                  {activePhotos.findIndex((p) => p.id === active.id) + 1} /{" "}
                  {activePhotos.length}
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
function EyebrowFooter({ children }: { children: string }) {
  return <span className="f-footer-label">{children}</span>;
}
