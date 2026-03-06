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
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/ai2-participa-cms/","/ai2-participa-cms/relatorios/","/ai2-participa-cms/participacao-publica/","/ai2-participa-cms/metodologia-participacao-publica/","/ai2-participa-cms/comissao-acompanhamento/","/ai2-participa-cms/apresentacao-publica/","/ai2-participa-cms/reunioes-entidades/","/ai2-participa-cms/mesas-tematicas/","/ai2-participa-cms/workshops-descentralizados/","/ai2-participa-cms/iniciativas-bottom-up/","/ai2-participa-cms/metodologia-st4s/","/ai2-participa-cms/metodologia-avaliacao-estrategica-ai2/","/ai2-participa-cms/legislacao-nacional/","/ai2-participa-cms/coordenacao/","/ai2-participa-cms/equipa-peritos/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
