import { d as derived } from "../../../../chunks/index.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const pt = { "body": "As entidades do Sistema Nacional de Ciência, Tecnologia e Inovação são convidadas a dinamizar iniciativas próprias de diálogos e a partilhar nesta plataforma os seus resultados para que possam contribuir para a Avaliação Estratégica da AI².\n\nEm breve será disponibilizada uma proposta de guião orientador para estas iniciativas." };
const en = { "body": "Entities of the National Science, Technology and Innovation System are invited to organise their own dialogue initiatives and share their results on this platform so that they can contribute to the AI² Strategic Assessment.\n\nA proposed guiding script for these initiatives will be made available soon." };
const content = {
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let body = derived(() => parseMarkdown(content[getLang()].body));
    Page_header($$renderer2, { title: t("page.bottomUpInitiatives.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(body())}</div></div>`);
  });
}
export {
  _page as default
};
