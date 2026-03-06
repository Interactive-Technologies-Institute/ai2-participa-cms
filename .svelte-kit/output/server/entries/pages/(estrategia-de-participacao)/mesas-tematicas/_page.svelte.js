import { d as derived } from "../../../../chunks/index.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const pt = { "body": "As mesas temáticas têm como objetivo aprofundar temas críticos, identificar consensos e divergências e recolher propostas concretas. Participarão representantes dos diferentes universos a consultar: comunidade académica, sistema científico e tecnológico, setor empresarial, Administração Pública e sociedade civil.\n\nA composição será mista, garantindo diversidade de perspetivas, e as sessões decorrerão entre março e abril e entre final de junho e início de julho.\n\nEm breve serão divulgadas as datas, os temas e a lista de participantes." };
const en = { "body": "The thematic tables aim to deepen critical topics, identify areas of consensus and divergence, and gather concrete proposals. Representatives from the different communities to be consulted will participate: academic community, scientific and technological system, business sector, Public Administration and civil society.\n\nThe composition will be mixed, ensuring diversity of perspectives, and sessions will take place between March and April and between late June and early July.\n\nDates, themes and the list of participants will be announced soon." };
const content = {
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let body = derived(() => parseMarkdown(content[getLang()].body));
    Page_header($$renderer2, { title: t("page.thematicTables.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(body())}</div></div>`);
  });
}
export {
  _page as default
};
