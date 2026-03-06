export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "ai2-participa-cms/_app",
	assets: new Set([".DS_Store","admin/config.yml","admin/index.html","apple-touch-icon.png","docs/AI2_ADELIO_MENDES_CNCTI.pdf","docs/AI2_ALESSANDRA_COLECCHIA_OCDE.pdf","docs/AI2_EUGENIO_CAMPOS_FERREIRA_DIAGNOSTICO_QUANTITATIVO.pdf","docs/AI2_RAUL_FANGUEIRO_CNCTI.pdf","docs/AI2_RICARDO_REIS.pdf","docs/AI2_ROSARIO_PARTIDARIO_ENG.pdf","docs/Apresentacao_ENG.pdf","docs/RelatGrupoTrab_PT.pdf","docs/RelatMetod_PT.pdf","favicon-96x96.png","favicon.ico","favicon.svg","fonts/InterVariable-Italic.woff2","fonts/InterVariable.woff2","fonts/TitilliumWeb-Bold.woff2","fonts/TitilliumWeb-Regular.woff2","fonts/TitilliumWeb-SemiBold.woff2","images/ana-quartin.jpg","images/antonio-bob-santos.jpg","images/artur-santoalha.jpg","images/bruno-beu.jpg","images/cristiana-leandro.jpg","images/daniel-carapau.jpg","images/diana-carrilho.jpg","images/joao-lobo-ferreira.jpg","images/joao-nuno-ferreira.jpg","images/joao-ricau.jpg","images/luis-ascencao.jpg","images/madalena-alves.jpg","images/margarida-prado.jpg","images/maria-rosario-partidario.jpg","images/marisa-borges.jpg","images/marta-abrantes.jpg","images/marta-norton.jpg","images/nanete-sousa.jpg","images/pedro-leite.jpg","images/rui-munha.jpg","images/silvia-figueiras.jpg","images/sofia-azevedo.jpg","images/susana-dias.jpg","logo-meic.svg","logo-planapp.svg","logo-pt.svg","og.png","robots.txt","site.webmanifest","web-app-manifest-192x192.png","web-app-manifest-512x512.png"]),
	mimeTypes: {".yml":"text/yaml",".html":"text/html",".png":"image/png",".pdf":"application/pdf",".svg":"image/svg+xml",".woff2":"font/woff2",".jpg":"image/jpeg",".txt":"text/plain",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.CsRUMDVt.js",app:"_app/immutable/entry/app.j2AWRrxG.js",imports:["_app/immutable/entry/start.CsRUMDVt.js","_app/immutable/chunks/BA6Y2jc2.js","_app/immutable/chunks/K0aZDt7b.js","_app/immutable/chunks/CkRqmbKL.js","_app/immutable/chunks/CqFghqGp.js","_app/immutable/chunks/STtQHxoh.js","_app/immutable/entry/app.j2AWRrxG.js","_app/immutable/chunks/K0aZDt7b.js","_app/immutable/chunks/B_eR6wdd.js","_app/immutable/chunks/CqFghqGp.js","_app/immutable/chunks/BnCFUYBX.js","_app/immutable/chunks/oGbzho37.js","_app/immutable/chunks/DNMWl4Qg.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/(estrategia-de-participacao)/apresentacao-publica",
				pattern: /^\/apresentacao-publica\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(estrategia-de-participacao)/comissao-acompanhamento",
				pattern: /^\/comissao-acompanhamento\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(sobre-a-equipa)/coordenacao",
				pattern: /^\/coordenacao\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(sobre-a-equipa)/equipa-peritos",
				pattern: /^\/equipa-peritos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(estrategia-de-participacao)/iniciativas-bottom-up",
				pattern: /^\/iniciativas-bottom-up\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(o-que-e)/legislacao-nacional",
				pattern: /^\/legislacao-nacional\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(estrategia-de-participacao)/mesas-tematicas",
				pattern: /^\/mesas-tematicas\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(o-que-e)/metodologia-avaliacao-estrategica-ai2",
				pattern: /^\/metodologia-avaliacao-estrategica-ai2\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(estrategia-de-participacao)/metodologia-participacao-publica",
				pattern: /^\/metodologia-participacao-publica\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(o-que-e)/metodologia-st4s",
				pattern: /^\/metodologia-st4s\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(estrategia-de-participacao)/participacao-publica",
				pattern: /^\/participacao-publica\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/relatorios",
				pattern: /^\/relatorios\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(estrategia-de-participacao)/reunioes-entidades",
				pattern: /^\/reunioes-entidades\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(estrategia-de-participacao)/workshops-descentralizados",
				pattern: /^\/workshops-descentralizados\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
