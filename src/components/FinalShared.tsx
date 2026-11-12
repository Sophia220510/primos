import type { ReactNode, AnchorHTMLAttributes } from "react";
import { business, mediaUrl, getPhoto, waLink } from "../final-data";
export const Arrow = () => <span aria-hidden="true">↗</span>;
export function RouteLink({
  to,
  children,
  className = "",
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string }) {
  return (
    <a href={`#/${to}`} className={className} {...props}>
      {children}
    </a>
  );
}
export function Action({
  to = "contato",
  children = "Solicitar orçamento",
  secondary = false,
}: {
  to?: string;
  children?: ReactNode;
  secondary?: boolean;
}) {
  return (
    <RouteLink to={to} className={`f-button ${secondary ? "f-secondary" : ""}`}>
      {children}
      <Arrow />
    </RouteLink>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="f-eyebrow">
      <span />
      {children}
    </p>
  );
}
export function ProductImage({
  id,
  priority = false,
  className = "",
}: {
  id: string;
  priority?: boolean;
  className?: string;
}) {
  const p = getPhoto(id);
  return (
    <img
      src={mediaUrl(p.src)}
      srcSet={`${mediaUrl(p.small)} 640w, ${mediaUrl(p.src)} ${p.width}w`}
      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 48vw, 42vw"
      width={p.width}
      height={p.height}
      alt={p.alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
export function PageIntro({
  label,
  title,
  text,
  parent,
}: {
  label: string;
  title: ReactNode;
  text: string;
  parent?: { to: string; label: string };
}) {
  return (
    <section className="f-page-intro f-container">
      <nav className="f-breadcrumb" aria-label="Você está aqui">
        <RouteLink to="inicio">Início</RouteLink>
        <span aria-hidden="true">/</span>
        {parent && (
          <>
            <RouteLink to={parent.to}>{parent.label}</RouteLink>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span aria-current="page">{label}</span>
      </nav>
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
export function FinalCta() {
  return (
    <section className="f-final-cta">
      <div className="f-container f-reveal">
        <div>
          <Eyebrow>UNIDADES OU LOTES</Eyebrow>
          <h2>
            O próximo acabamento
            <br />
            pode ser o da <em>sua peça.</em>
          </h2>
          <p>Envie uma foto. Conte o que você precisa. Vamos conversar.</p>
        </div>
        <Action />
      </div>
    </section>
  );
}
export function LicenseBlock() {
  return (
    <section className="f-licenses f-container f-reveal">
      <div>
        <Eyebrow>DOCUMENTAÇÃO & RESPONSABILIDADE</Eyebrow>
        <h2>
          Um trabalho levado
          <br />
          <em>a sério.</em>
        </h2>
        <p>
          A Cromeação Primos possui licenças do Exército, da Polícia Civil e da
          Polícia Federal. Para informações sobre a documentação, converse com a
          equipe.
        </p>
      </div>
      <div className="f-license-list">
        {["Exército", "Polícia Civil", "Polícia Federal"].map((name, i) => (
          <div key={name}>
            <span>0{i + 1}</span>
            <strong>{name}</strong>
            <span>Licença</span>
          </div>
        ))}
      </div>
    </section>
  );
}
export function FounderPreview() {
  return (
    <section className="f-founder-preview f-container f-reveal">
      <div className="f-founder-photo">
        <img
          src={mediaUrl(business.portrait)}
          alt="Mario Reis, fundador da Cromeação Primos, sorrindo com sua camisa azul e óculos."
          width="1200"
          height="1600"
          loading="lazy"
        />
        <span>
          Mario Reis<span>Fundador · no ramo desde 1983</span>
        </span>
      </div>
      <div>
        <Eyebrow>A EXPERIÊNCIA TEM NOME E HISTÓRIA</Eyebrow>
        <h2>
          Mais de quatro décadas.
          <br />
          <em>O mesmo olhar atento.</em>
        </h2>
        <p className="f-lead">
          Por trás de cada acabamento, uma história construída com trabalho.
        </p>
        <p>
          Mario Reis começou na cromeação em 1983. Em 2002, deu o próximo passo
          e iniciou o próprio negócio. Hoje, segue à frente da Primos, com a
          experiência de quem conhece o trabalho de perto.
        </p>
        <Action to="mario-reis" secondary>
          Conheça a história de Mario
        </Action>
      </div>
    </section>
  );
}
export function DirectContact() {
  return (
    <div className="f-direct-contact">
      <a href={waLink()} target="_blank" rel="noopener noreferrer">
        <span>WhatsApp comercial</span>
        <strong>{business.phone}</strong>
        <Arrow />
      </a>
      <a href={`mailto:${business.email}`}>
        <span>E-mail</span>
        <strong>{business.email}</strong>
        <Arrow />
      </a>
      <a href={business.instagram} target="_blank" rel="noopener noreferrer">
        <span>Instagram</span>
        <strong>@cromeacao_primos</strong>
        <Arrow />
      </a>
    </div>
  );
}
