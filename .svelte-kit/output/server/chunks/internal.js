import { r as root } from "./root.js";
import "./environment.js";
import "./server.js";
let public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
let read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function set_manifest(_) {
}
const options = {
  app_template_contains_nonce: false,
  async: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  csrf_trusted_origins: [],
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  service_worker_options: void 0,
  templates: {
    app: ({ head, body, assets, nonce, env }) => '<!doctype html>\n<html lang="pt">\n\n<head>\n	<meta charset="utf-8" />\n	<meta name="viewport" content="width=device-width, initial-scale=1" />\n\n	<!-- Primary Meta Tags -->\n	<meta name="description"\n		content="Espaço de diálogo sobre a Avaliação Estratégica para a definição das prioridades nacionais de investigação e inovação no âmbito da criação da AI².">\n\n	<!-- Open Graph / Facebook -->\n	<meta property="og:type" content="website">\n	<meta property="og:description"\n		content="Espaço de diálogo sobre a Avaliação Estratégica para a definição das prioridades nacionais de investigação e inovação no âmbito da criação da AI².">\n	<meta property="og:image" content="https://ai2participa.pt/og.png">\n\n	<!-- Twitter -->\n	<meta name="twitter:card" content="summary_large_image">\n	<meta name="twitter:description"\n		content="Espaço de diálogo sobre a Avaliação Estratégica para a definição das prioridades nacionais de investigação e inovação no âmbito da criação da AI².">\n	<meta name="twitter:image" content="https://ai2participa.pt/og.png">\n\n	<!-- favicon -->\n	<link rel="icon" type="image/png" href="' + assets + '/favicon-96x96.png" sizes="96x96" />\n	<link rel="icon" type="image/svg+xml" href="' + assets + '/favicon.svg" />\n	<link rel="shortcut icon" href="' + assets + '/favicon.ico" />\n	<link rel="apple-touch-icon" sizes="180x180" href="' + assets + '/apple-touch-icon.png" />\n	<meta name="apple-mobile-web-app-title" content="AI²Participa" />\n	<link rel="manifest" href="' + assets + '/site.webmanifest" />\n\n	<!-- preload -->\n	<link rel="preload" href="' + assets + '/fonts/TitilliumWeb-Regular.woff2" as="font" type="font/woff2"\n		crossorigin />\n	<link rel="preload" href="' + assets + '/fonts/TitilliumWeb-SemiBold.woff2" as="font" type="font/woff2"\n		crossorigin />\n	<link rel="preload" href="' + assets + '/fonts/TitilliumWeb-Bold.woff2" as="font" type="font/woff2"\n		crossorigin />\n	<link rel="preload" href="' + assets + '/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin />\n	<link rel="preload" href="' + assets + '/fonts/InterVariable-Italic.woff2" as="font" type="font/woff2"\n		crossorigin />\n\n	' + head + '\n</head>\n\n<body data-sveltekit-preload-data="hover">\n	<div style="display: contents">' + body + "</div>\n</body>\n\n</html>",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1pvczq1"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let handleValidationError;
  let init;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    handleValidationError,
    init,
    reroute,
    transport
  };
}
export {
  set_public_env as a,
  set_read_implementation as b,
  set_manifest as c,
  get_hooks as g,
  options as o,
  public_env as p,
  read_implementation as r,
  set_private_env as s
};
