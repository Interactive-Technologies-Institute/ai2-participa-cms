import { m as head, e as escape_html, d as derived } from "../../chunks/index.js";
import { L as Logo } from "../../chunks/logo.js";
import { B as Button } from "../../chunks/button.js";
import { g as getLang, t } from "../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../chunks/markdown.js";
const pt = { "heading": "Espaço de diálogo sobre as prioridades nacionais de investigação e inovação no âmbito da criação da AI²", "body": "Portugal está a definir as suas **prioridades nacionais de investigação e inovação** no âmbito da criação da **Agência para a Investigação e Inovação** (AI²), E.P.E. Para apoiar decisões estratégicas que orientarão a atuação futura da agência, está em curso uma Avaliação Estratégica que abrange:\n\n- Alocação orçamental às áreas de I&D, aos domínios estratégicos e à Unidade de Promoção da Inovação (UPI);\n- Definição dos domínios estratégicos da AI², incluindo possíveis subdomínios.\n\nEsta avaliação visa identificar opções estratégicas, analisar oportunidades e riscos, e sustentar a elaboração do contrato-programa plurianual da AI². Este processo centra-se em quatro questões essenciais:\n\n- Que percentagem do orçamento deverá ser alocada às áreas de I&D, domínios estratégicos e à UPI?\n- Quantos e quais os domínios estratégicos devem integrar o contrato-programa entre o Governo e a AI²?\n- Como deverá ser distribuído o orçamento entre os domínios estratégicos?\n- Como deverá ser distribuído o orçamento entre as áreas de I&D?", "cta_text": "A sua participação é essencial para definir o futuro da investigação e da inovação em Portugal. Participe no espaço de diálogo e contribua para o desenvolvimento científico e tecnológico do país.", "participate_url": "https://ai2participa.eu.consider.it/" };
const en = { "heading": "Dialogue space on the national research and innovation priorities in the context of creating AI²", "body": "Portugal is defining its **national research and innovation priorities** in the context of creating the **Agency for Research and Innovation** (AI²), E.P.E. To support strategic decisions that will guide the agency's future activities, a Strategic Assessment is currently underway covering:\n\n- Budget allocation to R&D areas, strategic domains and the Innovation Promotion Unit (UPI);\n- Definition of AI²'s strategic domains, including possible sub-domains.\n\nThis assessment aims to identify strategic options, analyse opportunities and risks, and support the preparation of AI²'s multi-annual programme contract. The process focuses on four key questions:\n\n- What percentage of the budget should be allocated to R&D areas, strategic domains and the UPI?\n- How many and which strategic domains should be included in the programme contract between the Government and AI²?\n- How should the budget be distributed among strategic domains?\n- How should the budget be distributed among R&D areas?", "cta_text": "Your participation is essential to define the future of research and innovation in Portugal. Participate in the dialogue space and contribute to the country's scientific and technological development.", "participate_url": "https://ai2participa.eu.consider.it/" };
const content = {
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let pageContent = derived(() => content[getLang()]);
    let body = derived(() => parseMarkdown(pageContent().body));
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>AI²Participa</title>`);
      });
      $$renderer3.push(`<meta name="title" content="AI²Participa"/> <meta property="og:title" content="AI²Participa"/> <meta name="twitter:title" content="AI²Participa"/>`);
    });
    $$renderer2.push(`<section class="relative overflow-hidden bg-background py-20 md:py-32"><div class="relative z-10 container"><div class="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">`);
    Logo($$renderer2, { class: "h-48 w-auto" });
    $$renderer2.push(`<!----> <h1 class="font-title text-4xl font-bold sm:text-5xl md:text-6xl">${escape_html(pageContent().heading)}</h1> <div class="flex justify-center">`);
    Button($$renderer2, {
      size: "lg",
      href: pageContent().participate_url,
      target: "_blank",
      rel: "noopener noreferrer",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(t("home.participateBtn"))}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div> <div class="absolute inset-0 -z-10 overflow-hidden"><div class="dotted-grid-bg absolute inset-0 opacity-70"></div></div></section> <section class="bg-muted/30 py-16 md:py-20"><div class="typography container"><div class="large mx-auto max-w-4xl">${html(body())}</div></div></section> <section class="py-20 md:py-24"><div class="container"><div class="mx-auto max-w-5xl text-center"><p class="text-lg leading-relaxed text-muted-foreground">${escape_html(pageContent().cta_text)}</p> <div class="mt-8 flex justify-center">`);
    Button($$renderer2, {
      size: "lg",
      href: pageContent().participate_url,
      target: "_blank",
      rel: "noopener noreferrer",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(t("home.ctaBtn"))}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div></section>`);
  });
}
export {
  _page as default
};
