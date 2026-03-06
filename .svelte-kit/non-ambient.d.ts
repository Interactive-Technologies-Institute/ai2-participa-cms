
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(sobre-a-equipa)" | "/(o-que-e)" | "/(estrategia-de-participacao)" | "/" | "/(estrategia-de-participacao)/apresentacao-publica" | "/(estrategia-de-participacao)/comissao-acompanhamento" | "/(sobre-a-equipa)/coordenacao" | "/(sobre-a-equipa)/equipa-peritos" | "/(estrategia-de-participacao)/iniciativas-bottom-up" | "/(o-que-e)/legislacao-nacional" | "/(estrategia-de-participacao)/mesas-tematicas" | "/(o-que-e)/metodologia-avaliacao-estrategica-ai2" | "/(estrategia-de-participacao)/metodologia-participacao-publica" | "/(o-que-e)/metodologia-st4s" | "/(estrategia-de-participacao)/participacao-publica" | "/relatorios" | "/(estrategia-de-participacao)/reunioes-entidades" | "/(estrategia-de-participacao)/workshops-descentralizados";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(sobre-a-equipa)": Record<string, never>;
			"/(o-que-e)": Record<string, never>;
			"/(estrategia-de-participacao)": Record<string, never>;
			"/": Record<string, never>;
			"/(estrategia-de-participacao)/apresentacao-publica": Record<string, never>;
			"/(estrategia-de-participacao)/comissao-acompanhamento": Record<string, never>;
			"/(sobre-a-equipa)/coordenacao": Record<string, never>;
			"/(sobre-a-equipa)/equipa-peritos": Record<string, never>;
			"/(estrategia-de-participacao)/iniciativas-bottom-up": Record<string, never>;
			"/(o-que-e)/legislacao-nacional": Record<string, never>;
			"/(estrategia-de-participacao)/mesas-tematicas": Record<string, never>;
			"/(o-que-e)/metodologia-avaliacao-estrategica-ai2": Record<string, never>;
			"/(estrategia-de-participacao)/metodologia-participacao-publica": Record<string, never>;
			"/(o-que-e)/metodologia-st4s": Record<string, never>;
			"/(estrategia-de-participacao)/participacao-publica": Record<string, never>;
			"/relatorios": Record<string, never>;
			"/(estrategia-de-participacao)/reunioes-entidades": Record<string, never>;
			"/(estrategia-de-participacao)/workshops-descentralizados": Record<string, never>
		};
		Pathname(): "/" | "/apresentacao-publica/" | "/comissao-acompanhamento/" | "/coordenacao/" | "/equipa-peritos/" | "/iniciativas-bottom-up/" | "/legislacao-nacional/" | "/mesas-tematicas/" | "/metodologia-avaliacao-estrategica-ai2/" | "/metodologia-participacao-publica/" | "/metodologia-st4s/" | "/participacao-publica/" | "/relatorios/" | "/reunioes-entidades/" | "/workshops-descentralizados/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/admin/config.yml" | "/admin/index.html" | "/apple-touch-icon.png" | "/docs/AI2_ADELIO_MENDES_CNCTI.pdf" | "/docs/AI2_ALESSANDRA_COLECCHIA_OCDE.pdf" | "/docs/AI2_EUGENIO_CAMPOS_FERREIRA_DIAGNOSTICO_QUANTITATIVO.pdf" | "/docs/AI2_RAUL_FANGUEIRO_CNCTI.pdf" | "/docs/AI2_RICARDO_REIS.pdf" | "/docs/AI2_ROSARIO_PARTIDARIO_ENG.pdf" | "/docs/Apresentacao_ENG.pdf" | "/docs/RelatGrupoTrab_PT.pdf" | "/docs/RelatMetod_PT.pdf" | "/favicon-96x96.png" | "/favicon.ico" | "/favicon.svg" | "/fonts/InterVariable-Italic.woff2" | "/fonts/InterVariable.woff2" | "/fonts/TitilliumWeb-Bold.woff2" | "/fonts/TitilliumWeb-Regular.woff2" | "/fonts/TitilliumWeb-SemiBold.woff2" | "/images/ana-quartin.jpg" | "/images/antonio-bob-santos.jpg" | "/images/artur-santoalha.jpg" | "/images/bruno-beu.jpg" | "/images/cristiana-leandro.jpg" | "/images/daniel-carapau.jpg" | "/images/diana-carrilho.jpg" | "/images/joao-lobo-ferreira.jpg" | "/images/joao-nuno-ferreira.jpg" | "/images/joao-ricau.jpg" | "/images/luis-ascencao.jpg" | "/images/madalena-alves.jpg" | "/images/margarida-prado.jpg" | "/images/maria-rosario-partidario.jpg" | "/images/marisa-borges.jpg" | "/images/marta-abrantes.jpg" | "/images/marta-norton.jpg" | "/images/nanete-sousa.jpg" | "/images/pedro-leite.jpg" | "/images/rui-munha.jpg" | "/images/silvia-figueiras.jpg" | "/images/sofia-azevedo.jpg" | "/images/susana-dias.jpg" | "/logo-meic.svg" | "/logo-planapp.svg" | "/logo-pt.svg" | "/og.png" | "/robots.txt" | "/site.webmanifest" | "/web-app-manifest-192x192.png" | "/web-app-manifest-512x512.png" | string & {};
	}
}