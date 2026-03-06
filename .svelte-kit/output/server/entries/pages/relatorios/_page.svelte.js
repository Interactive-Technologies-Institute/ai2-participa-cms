import { d as derived } from "../../../chunks/index.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import { P as Page_header } from "../../../chunks/page-header.js";
import { t, g as getLang } from "../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../chunks/markdown.js";
const pt = { "body": "## Entregáveis\n\n- Documento com a **metodologia de avaliação estratégica** ([link](/docs/RelatMetod_PT.pdf));\n\n## Outros Documentos\n\n- **Relatório do Grupo de Trabalho de Análise do Ecossistema Nacional de Investigação e Inovação**, criado nos termos do Despacho n.º 1994/2026, de 17 de fevereiro ([link](/docs/RelatGrupoTrab_PT.pdf));" };
const en = { "body": "## Deliverables\n\n- Document with the **strategic assessment methodology** ([link in Portuguese](/docs/RelatMetod_PT.pdf));\n\n## Other Documents\n\n- **Report of the Working Group on National R&D Ecosystem**, created under Despacho n.º 1994/2026, de 17 of February ([link in Portuguese](/docs/RelatGrupoTrab_PT.pdf));" };
const content = {
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let body = derived(() => parseMarkdown(content[getLang()].body, base));
    Page_header($$renderer2, { title: t("page.reports.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(body())}</div></div>`);
  });
}
export {
  _page as default
};
