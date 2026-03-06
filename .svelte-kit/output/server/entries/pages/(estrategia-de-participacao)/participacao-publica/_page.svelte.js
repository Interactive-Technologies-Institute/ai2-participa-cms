import { d as derived } from "../../../../chunks/index.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const pt = { "body": "A Avaliação Estratégica da AI² assenta numa participação pública ampla, contínua e informada, envolvendo atores de todo o ecossistema de investigação e inovação. O objetivo é assegurar um processo transparente e inclusivo, onde diferentes perspetivas sobre prioridades estratégicas são partilhadas e ponderadas.\n\nEste espaço de diálogo permite acompanhar a evolução do processo, aceder à informação disponibilizada e contribuir ativamente com opiniões e respostas às questões colocadas, de forma pública e transparente, reforçando a qualidade da avaliação e a legitimidade das decisões." };
const en = { "body": "The AI² Strategic Assessment is built on broad, continuous and informed public participation, involving actors from across the research and innovation ecosystem. The goal is to ensure a transparent and inclusive process, where different perspectives on strategic priorities are shared and considered.\n\nThis dialogue space allows you to follow the evolution of the process, access available information and actively contribute with opinions and responses to the questions raised, in a public and transparent manner, reinforcing the quality of the assessment and the legitimacy of decisions." };
const content = {
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let body = derived(() => parseMarkdown(content[getLang()].body));
    Page_header($$renderer2, { title: t("page.publicParticipation.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(body())}</div></div>`);
  });
}
export {
  _page as default
};
