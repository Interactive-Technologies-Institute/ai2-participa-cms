import { d as derived } from "../../../../chunks/index.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const pt = { "body": "O [Decreto-Lei n.º 132/2025, de 24 de dezembro](https://diariodarepublica.pt/dr/detalhe/decreto-lei/132-2025-992627244), estabelece a criação da Agência para a Investigação e Inovação (AI²), E. P. E., resultante da transformação da Agência Nacional de Inovação, S. A., e da fusão com a Fundação para a Ciência e a Tecnologia, I. P., aprovando também o respetivo regime jurídico." };
const en = { "body": "[Decree-Law No. 132/2025, of 24 December](https://diariodarepublica.pt/dr/detalhe/decreto-lei/132-2025-992627244), establishes the creation of the Agency for Research and Innovation (AI²), E. P. E., resulting from the transformation of the National Innovation Agency, S. A., and its merger with the Foundation for Science and Technology, I. P., also approving the respective legal framework." };
const content = {
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let body = derived(() => parseMarkdown(content[getLang()].body));
    Page_header($$renderer2, { title: t("page.nationalLegislation.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(body())}</div></div>`);
  });
}
export {
  _page as default
};
