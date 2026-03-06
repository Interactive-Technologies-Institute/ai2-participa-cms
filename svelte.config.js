import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.BASE_PATH ?? ''
		},
		// The /admin route is served as a static HTML file from static/admin/index.html
		// so we exclude it from SvelteKit's prerendering
		prerender: {
			handleMissingId: 'warn'
		}
	}
};

export default config;
