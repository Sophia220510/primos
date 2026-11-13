import { renderToString } from "react-dom/server";
import App from "./App";
import { getSeo, indexableRoutes } from "./seo";
export { indexableRoutes, getSeo };
export function render(route: string) {
  return renderToString(<App initialRoute={route} />);
}
