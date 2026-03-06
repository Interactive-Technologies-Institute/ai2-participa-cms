import { d as derived } from "../../../../chunks/index.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const pt = { "body": "A metodologia prevê a realização de conferências e workshops descentralizados, abertos a todos os interessados mediante inscrição. Estas sessões têm como objetivo apresentar o processo, esclarecer dúvidas e recolher contributos em tempo real.\n\nEstá previsto um workshop em cada região NUTS II do continente, em articulação com as CCDR, bem como nas Regiões Autónomas.\n\nAlém da conferência de apresentação da metodologia, marcada para 24 de fevereiro de 2026 no Técnico Innovation Centre, estão previstas as seguintes iniciativas:\n\n- Cinco workshops em maio de 2026 para abordar a focagem estratégica (Funchal, Évora, Coimbra, Bragança, Porto).\n- Cinco workshops em junho-julho de 2026 para definir e discutir opções estratégicas e respetiva avaliação de oportunidades e riscos (Ponta Delgada, Aveiro, Covilhã, Braga, Faro).\n- Apresentação preliminar de resultados (em outubro de 2026).\n- Conferência final (em novembro/dezembro de 2026).\n\nEm breve será disponibilizada informação com as datas e local dos workshops, temas e lista de participantes." };
const en = { "body": "The methodology provides for conferences and decentralised workshops, open to all interested parties upon registration. These sessions aim to present the process, clarify doubts and gather contributions in real time.\n\nOne workshop is planned for each NUTS II region on the mainland, in coordination with the CCDRs, as well as in the Autonomous Regions.\n\nIn addition to the methodology presentation conference, scheduled for 24 February 2026 at the Técnico Innovation Centre, the following initiatives are planned:\n\n- Five workshops in May 2026 to address strategic focus (Funchal, Évora, Coimbra, Bragança, Porto).\n- Five workshops in June–July 2026 to define and discuss strategic options and assessment of their opportunities and risks (Ponta Delgada, Aveiro, Covilhã, Braga, Faro).\n- Preliminary presentation of results (October 2026).\n- Final conference (November/December 2026).\n\nInformation on workshop dates, venues, themes and participant lists will be made available soon." };
const content = {
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let body = derived(() => parseMarkdown(content[getLang()].body));
    Page_header($$renderer2, { title: t("page.decentralizedWorkshops.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(body())}</div></div>`);
  });
}
export {
  _page as default
};
