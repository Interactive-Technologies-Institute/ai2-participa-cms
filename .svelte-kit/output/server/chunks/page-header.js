import { af as fallback, m as head, e as escape_html, b as bind_props, c as attr, o as stringify } from "./index.js";
function Page_header($$renderer, $$props) {
  let title = $$props["title"];
  let description = fallback($$props["description"], void 0);
  head("4haew3", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>${escape_html(title)} | AI²Participa</title>`);
    });
    $$renderer2.push(`<meta name="title"${attr("content", `${stringify(title)} | AI²Participa`)}/> <meta property="og:title"${attr("content", `${stringify(title)} | AI²Participa`)}/> <meta name="twitter:title"${attr("content", `${stringify(title)} | AI²Participa`)}/>`);
  });
  $$renderer.push(`<div class="relative w-full overflow-hidden"><div class="dotted-grid-bg absolute inset-0 z-0"></div> <div class="relative z-10 container mx-auto px-4 py-12 text-center md:py-20"><h1 class="mb-6 font-title text-5xl font-bold md:text-6xl lg:text-7xl">${escape_html(title)}</h1> `);
  if (description) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div></div>`);
  bind_props($$props, { title, description });
}
export {
  Page_header as P
};
