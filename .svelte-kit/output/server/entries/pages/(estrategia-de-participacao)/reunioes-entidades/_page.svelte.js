import { d as derived } from "../../../../chunks/index.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const pt = { "body": "Estas reuniões têm como objetivo recolher perspetivas e contributos das entidades estratégicas definidas no quadro de governança da Avaliação Estratégica (ver Anexo 2 do documento da metodologia). Estão previstas, pelo menos, oito sessões online, a realizar entre março e abril de 2026.\n\nEm breve serão divulgadas as datas e a lista completa de entidades participantes." };
const en = { "body": "These meetings aim to gather perspectives and contributions from strategic entities defined in the Strategic Assessment governance framework (see Annex 2 of the methodology document). At least eight online sessions are planned, to be held between March and April 2026.\n\nDates and the full list of participating entities will be announced soon." };
const content = {
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let body = derived(() => parseMarkdown(content[getLang()].body));
    Page_header($$renderer2, { title: t("page.stakeholderMeetings.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(body())}</div></div>`);
  });
}
export {
  _page as default
};
