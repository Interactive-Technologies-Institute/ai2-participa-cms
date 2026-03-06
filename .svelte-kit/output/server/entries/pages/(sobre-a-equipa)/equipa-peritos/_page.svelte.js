import { i as ensure_array_like, e as escape_html, d as derived } from "../../../../chunks/index.js";
import { a as asset } from "../../../../chunks/server2.js";
import { P as Page_header } from "../../../../chunks/page-header.js";
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from "../../../../chunks/avatar-fallback.js";
import { t, g as getLang } from "../../../../chunks/i18n.svelte.js";
import { h as html, p as parseMarkdown } from "../../../../chunks/markdown.js";
const pt = { "intro": "A Avaliação Estratégica da AI² é apoiada por uma equipa de peritos provenientes da FCT e da ANI que irão contribuir para realizar diagnósticos estratégicos, análises de tendências e avaliação de opções estratégicas, bem como facilitação de mesas temáticas.\n\nCoordenados pela Professora Maria do Rosário Partidário, os peritos estão organizados por temas-chave da Avaliação Estratégica:", "section_titles": ["Desafios societais e necessidades de investigação e inovação", "Governança e ecossistema de investigação e inovação", "Modelo e fontes de financiamento", "Relação entre investigação e inovação", "Áreas de I&D", "Infraestruturas e emprego científico e tecnológico"] };
const en = { "intro": "The AI² Strategic Assessment is supported by a team of experts from the National Innovation Agency, S. A. (ANI) and the Foundation for Science and Technology, I. P. (FCT) who will contribute to strategic diagnoses, trend analyses and assessment of strategic options, as well as facilitation of thematic roundtables.\n\nCoordinated by Professor Maria do Rosário Partidário, the experts are organised by key themes of the Strategic Assessment:", "section_titles": ["Societal challenges and research and innovation needs", "Governance and research and innovation ecosystem", "Funding model and sources", "Relationship between research and innovation", "R&D Areas", "Scientific and technological infrastructures and employment"] };
const sections = [{ "people": [{ "name": "Ana Quartin (FCT)", "image": "/images/ana-quartin.jpg" }, { "name": "Artur Santoalha (ANI) - coordenador", "image": "/images/artur-santoalha.jpg" }, { "name": "Dina Carrilho (FCT)", "image": "/images/diana-carrilho.jpg" }, { "name": "Margarida Prado (FCT)", "image": "/images/margarida-prado.jpg" }, { "name": "Marta Norton (FCT) - coordenadora", "image": "/images/marta-norton.jpg" }] }, { "people": [{ "name": "António Bob Santos (FCT)", "image": "/images/antonio-bob-santos.jpg" }, { "name": "Bruno Béu (FCT) - coordenador", "image": "/images/bruno-beu.jpg" }, { "name": "Cristiana Leandro (ANI) - coordenadora", "image": "/images/cristiana-leandro.jpg" }, { "name": "Rui Munhá (FCT)", "image": "/images/rui-munha.jpg" }] }, { "people": [{ "name": "Bruno Béu (FCT) - coordenador", "image": "/images/bruno-beu.jpg" }, { "name": "João Ribau (ANI) - coordenador", "image": "/images/joao-ricau.jpg" }, { "name": "Luís Ascenção (FCT)", "image": "/images/luis-ascencao.jpg" }, { "name": "Nanete Sousa (FCT)", "image": "/images/nanete-sousa.jpg" }, { "name": "Pedro Leite (FCT) - coordenador", "image": "/images/pedro-leite.jpg" }, { "name": "Rui Munhá (FCT)", "image": "/images/rui-munha.jpg" }, { "name": "Susana Dias (FCT)", "image": "/images/susana-dias.jpg" }] }, { "people": [{ "name": "João Ferreira (ANI) - coordenador", "image": "/images/joao-lobo-ferreira.jpg" }, { "name": "António Bob Santos (FCT) - coordenador", "image": "/images/antonio-bob-santos.jpg" }, { "name": "Bruno Béu (FCT)", "image": "/images/bruno-beu.jpg" }] }, { "people": [{ "name": "Sofia Azevedo (ANI) - coordenadora", "image": "/images/sofia-azevedo.jpg" }, { "name": "Bruno Béu (FCT) - coordenador", "image": "/images/bruno-beu.jpg" }, { "name": "Madalena Alves (FCT)", "image": "/images/madalena-alves.jpg" }] }, { "people": [{ "name": "Marisa Borges (ANI) - coordenadora", "image": "/images/marisa-borges.jpg" }, { "name": "Daniel Carapau (FCT) - coordenador", "image": "/images/daniel-carapau.jpg" }, { "name": "João Nuno Ferreira (FCT)", "image": "/images/joao-nuno-ferreira.jpg" }, { "name": "Marta Abrantes (FCT)", "image": "/images/marta-abrantes.jpg" }, { "name": "Sílvia Figueiras (FCT)", "image": "/images/silvia-figueiras.jpg" }] }];
const content = {
  pt,
  en,
  sections
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let pageContent = derived(() => content[getLang()]);
    let intro = derived(() => parseMarkdown(pageContent().intro));
    Page_header($$renderer2, { title: t("page.expertTeam.title") });
    $$renderer2.push(`<!----> <div class="container my-12 md:my-24"><div class="typography">${html(intro())} <!--[-->`);
    const each_array = ensure_array_like(content.sections);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let section = each_array[i];
      $$renderer2.push(`<section class="mt-12"><h2>${escape_html(pageContent().section_titles[i])}</h2> <ul class="grid gap-4 sm:grid-cols-2"><!--[-->`);
      const each_array_1 = ensure_array_like(section.people);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let person = each_array_1[$$index];
        $$renderer2.push(`<li class="not-typography flex items-center gap-4">`);
        Avatar($$renderer2, {
          class: "size-14",
          children: ($$renderer3) => {
            Avatar_image($$renderer3, {
              src: asset(person.image),
              alt: `${t("page.expertTeam.photoAlt")} ${person.name}`
            });
            $$renderer3.push(`<!----> `);
            Avatar_fallback($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->${escape_html(person.name.slice(0, 1).toUpperCase())}`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----> <span>${escape_html(person.name)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul></section>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
