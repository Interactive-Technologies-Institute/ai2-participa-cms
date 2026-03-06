import { e as escape_html, c as attr, d as derived } from "../../../../chunks/index.js";
import { a as asset } from "../../../../chunks/server2.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from "../../../../chunks/avatar-fallback.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const scientific_coordinator_name = "Professora Doutora Maria do Rosário Partidário";
const scientific_coordinator_image = "/images/maria-rosario-partidario.jpg";
const pt = { "intro": "Conheça a equipa responsável pela coordenação da Avaliação Estratégica que apoia a definição das prioridades nacionais de investigação e inovação e a elaboração do contrato-programa plurianual da Agência para a Investigação e Inovação (AI²).", "scientific_bio": "Professora Catedrática do Instituto Superior Técnico, especialista em Avaliação Estratégica e autora da metodologia ST4S - Strategic Thinking for Sustainability, que estrutura o presente processo de avaliação.", "institutional_bio": "O PLANAPP coordena globalmente o processo de Avaliação Estratégica, em articulação com a Direção-Geral da Economia (DGE) e a Direção-Geral de Estudos, Planeamento e Avaliação (DGEPA), assegurando o desenho metodológico, a organização da participação pública e a consolidação técnica dos resultados." };
const en = { "intro": "Meet the team responsible for coordinating the Strategic Assessment that supports the definition of national research and innovation priorities and the preparation of the multi-annual programme contract for the Agency for Research and Innovation (AI²).", "scientific_bio": "Full Professor at Instituto Superior Técnico, specialist in Strategic Assessment and author of the ST4S methodology — Strategic Thinking for Sustainability — which structures the present assessment process.", "institutional_bio": "PLANAPP provides overall coordination of the Strategic Assessment process, in articulation with the Directorate-General for the Economy (DGE) and the Directorate-General for Studies, Planning and Evaluation (DGEPA), ensuring the methodological design, organisation of public participation and technical consolidation of results." };
const content = {
  scientific_coordinator_name,
  scientific_coordinator_image,
  pt,
  en
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let pageContent = derived(() => content[getLang()]);
    let intro = derived(() => parseMarkdown(pageContent().intro));
    let scientificBio = derived(() => parseMarkdown(pageContent().scientific_bio));
    let institutionalBio = derived(() => parseMarkdown(pageContent().institutional_bio));
    Page_header($$renderer2, { title: t("page.coordination.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(intro())} <h2>${escape_html(t("page.coordination.scientificCoordination"))}</h2> <div class="mt-4 flex flex-col items-start gap-4">`);
    Avatar($$renderer2, {
      class: "not-typography size-28",
      children: ($$renderer3) => {
        Avatar_image($$renderer3, {
          src: asset(content.scientific_coordinator_image),
          alt: content.scientific_coordinator_name
        });
        $$renderer3.push(`<!----> `);
        Avatar_fallback($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->MR`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <p class="large mt-0">${escape_html(content.scientific_coordinator_name)}<br/> <span class="muted">${escape_html(t("page.coordination.scientificRole"))}</span></p></div> ${html(scientificBio())} <h2>${escape_html(t("page.coordination.institutionalCoordination"))}</h2> <div class="mt-4 flex flex-col items-start"><img${attr("src", asset("/logo-planapp.svg"))} alt="PLANAPP - Centro de Planeamento e de Avaliação de Políticas Públicas" class="h-24 w-auto"/> <p class="large mt-0">PLANAPP - Centro de Planeamento e de Avaliação de Políticas Públicas<br/> <span class="muted">${escape_html(t("page.coordination.institutionalRole"))}</span></p></div> ${html(institutionalBio())}</div></div>`);
  });
}
export {
  _page as default
};
