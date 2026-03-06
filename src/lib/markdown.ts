import { marked } from 'marked';

marked.use({ gfm: true });

// Injected by Vite at build time from the VITE_BASE_PATH env var.
// '/ai2-participa-cms' in production, '' in local dev.
const APP_BASE: string = (import.meta.env['VITE_BASE_PATH'] as string) || '';

/**
 * Parse a Markdown string and return an HTML string.
 * Absolute paths (e.g. /docs/file.pdf) are automatically prefixed with the
 * app base path (VITE_BASE_PATH) when building for a subdirectory deployment.
 * Content comes from trusted CMS editors, so no sanitisation is applied.
 */
export function parseMarkdown(src: string): string {
	const html = marked.parse(src) as string;
	if (!APP_BASE) return html;
	// Prefix every absolute href (starting with / but not //) with the base path.
	return html.replace(/href="(\/(?!\/)[^"]*)"/g, `href="${APP_BASE}$1"`);
}
