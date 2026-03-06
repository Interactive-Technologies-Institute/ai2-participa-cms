import { e as escape_html, d as derived } from "../../../../chunks/index.js";
import { a as asset } from "../../../../chunks/server2.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { B as Button } from "../../../../chunks/button.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const pt = { "body": 'A Avaliação Estratégica da AI² utiliza a metodologia ST4S - Strategic Thinking for Sustainability, desenvolvida pela Professora Maria do Rosário Partidário (Partidário, 2021)<sup>1</sup>. Esta abordagem combina pensamento sistémico, backcasting e participação pública ativa para apoiar decisões estratégicas de longo prazo.\n\nA metodologia começa por definir, de forma participada, o objetivo, a visão, os princípios e pilares estratégicos para o futuro da investigação e inovação em Portugal e, a partir daí, identifica caminhos estratégicos para os concretizar. Todo o processo decorre com envolvimento de peritos, atores relevantes e uma Comissão de Acompanhamento independente.\n\n## As três fases da metodologia ST4S\n\n1. **Focagem**\n\n   Identificação do que é prioritário avaliar, definindo os Fatores Críticos para a Decisão (FCD) e o quadro de avaliação estratégica.\n\n2. **Avaliação de opções estratégicas**\n\n   Análise das diferentes opções com base nas suas oportunidades e riscos, selecionando as que melhor contribuem para a visão e objetivos estabelecidos.\n\n3. **Diálogos contínuos**\n\n   Interação permanente entre atores relevantes, garantindo aprendizagem, transparência e monitorização contínua ao longo das fases de decisão e implementação.\n\nA metodologia integra uma abordagem participativa e híbrida, combinando contributos bottom-up com uma decisão final top-down, garantindo rigor técnico, envolvimento plural e orientação estratégica para a definição da alocação orçamental e dos domínios estratégicos da AI².\n\n---\n\n<p class="small"><sup>1</sup> Partidário, M. R. (2021). <em>Strategic thinking for sustainability (ST4S) in strategic environmental assessment.</em> In <em>Handbook on strategic environmental assessment</em> (pp. 41-57). Edward Elgar Publishing.</p>' };
const en = { "body": `The AI² Strategic Assessment uses the ST4S methodology — Strategic Thinking for Sustainability — developed by Professor Maria do Rosário Partidário (Partidário, 2021)<sup>1</sup>. This approach combines systems thinking, backcasting and active public participation to support long-term strategic decisions.

The methodology begins by defining, through a participatory process, the objective, vision, strategic principles and pillars for the future of research and innovation in Portugal, and from there identifies strategic pathways to achieve them. The entire process involves experts, relevant stakeholders and an independent Advisory Committee.

## The three phases of the ST4S methodology

1. **Focus**

   Identifying what is a priority to assess, defining the Critical Decision Factors (CDF) and the strategic assessment framework.

2. **Assessment of strategic options**

   Analysis of the different options based on their opportunities and risks, selecting those that best contribute to the established vision and objectives.

3. **Continuous dialogues**

   Permanent interaction among relevant stakeholders, ensuring learning, transparency and continuous monitoring throughout the decision-making and implementation phases.

The methodology integrates a participatory and hybrid approach, combining bottom-up contributions with a final top-down decision, ensuring technical rigour, plural involvement and strategic orientation for defining AI²'s budget allocation and strategic domains.

---

<p class="small"><sup>1</sup> Partidário, M. R. (2021). <em>Strategic thinking for sustainability (ST4S) in strategic environmental assessment.</em> In <em>Handbook on strategic environmental assessment</em> (pp. 41-57). Edward Elgar Publishing.</p>` };
const doc_url = "/docs/RelatMetod_PT.pdf";
const content = {
  pt,
  en,
  doc_url
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let body = derived(() => parseMarkdown(content[getLang()].body));
    Page_header($$renderer2, { title: t("page.st4sMethodology.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(body())} <div class="not-typography mt-10">`);
    Button($$renderer2, {
      variant: "outline",
      href: asset(content.doc_url),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(t("page.strategicAssessment.viewDoc"))}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div>`);
  });
}
export {
  _page as default
};
