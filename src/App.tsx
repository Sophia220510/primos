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
        <small>ACABAMENTOS METÁLICOS</small>
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
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("f-visible", e.isIntersecting),
        ),
      { threshold: 0.05 },
    );
    const seen = new WeakSet<Element>();
    const observe = () =>
      main.current?.querySelectorAll(".f-reveal").forEach((el) => {
        if (!seen.has(el)) {
          observer.observe(el);
          seen.add(el);
        }
      });
    observe();
    const mutation = new MutationObserver(observe);
    if (main.current)
      mutation.observe(main.current, { childList: true, subtree: true });
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
      observer.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(timer);
    };
  }, [routeKey, page, slug]);
  useEffect(() => {
    let raf = 0,
      last = scrollY;
    const scroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        document.documentElement.style.setProperty(
          "--f-progress",
          String(max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0),
        );
        document.documentElement.dataset.direction =
          scrollY < last ? "up" : "down";
        last = scrollY;
      });
    };
    addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", scroll);
    };
  }, []);
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
            <span>NO RAMO DESDE 1983</span>
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
            Orçamento <Arrow />
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
              Vamos conversar <Arrow />
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
            <span>{business.legalName} · Desde 2002</span>
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
      >
        <span aria-hidden="true">↗</span>Fale com a Primos
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
