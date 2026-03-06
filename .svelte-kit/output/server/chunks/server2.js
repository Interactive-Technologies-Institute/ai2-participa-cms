import { i as initial_base, b as base, a as assets } from "./server.js";
import { r as resolve_route } from "./routing.js";
import "./url.js";
import { try_get_request_store } from "@sveltejs/kit/internal/server";
import "./root.js";
function asset(file) {
  return assets ? assets + file : resolve(file);
}
function resolve(id, params) {
  const resolved = resolve_route(
    id,
    /** @type {Record<string, string>} */
    params
  );
  {
    const store = try_get_request_store();
    if (store && !store.state.prerendering?.fallback) {
      const after_base = store.event.url.pathname.slice(initial_base.length);
      const segments = after_base.split("/").slice(2);
      const prefix = segments.map(() => "..").join("/") || ".";
      return prefix + resolved;
    }
  }
  return base + resolved;
}
export {
  asset as a,
  resolve as r
};
