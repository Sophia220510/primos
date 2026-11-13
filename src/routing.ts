import media from "./client-media.json";
export const legacyRoutes: Record<string, string> = {
  servicos: "banhos",
  trabalhos: "pecas",
  cromacao: "banhos?tipo=cromacao",
  niquelacao: "banhos?tipo=niquelacao",
};
const pages = new Set([
  "inicio",
  "pecas",
  "banhos",
  "processo",
  "mario-reis",
  "empresa",
  "contato",
  "404",
]);
export function normalizeRoute(raw: string) {
  const value =
    raw
      .replace(/^\/+|\/+$/g, "")
      .replace(/^index\.html$/, "")
      .replace(/\.html(?=\?|$)/, "") || "inicio";
  const key = legacyRoutes[value] || value;
  const [path] = key.split("?");
  const [page, slug, ...rest] = path.split("/");
  if (
    !pages.has(page) ||
    rest.length ||
    (slug && (page !== "pecas" || !media.groups.some((g) => g.slug === slug)))
  )
    return "404";
  return key;
}
export function routeHref(key: string) {
  return key === "inicio" ? "/" : `/${key}`;
}
export function browserRoute() {
  return normalizeRoute(
    location.hash.startsWith("#/")
      ? location.hash.slice(2)
      : `${location.pathname.replace(/^\/+|\/+$/g, "")}${location.search}`,
  );
}
