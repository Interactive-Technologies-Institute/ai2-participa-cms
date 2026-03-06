import { marked } from 'marked';

marked.use({ gfm: true });

/**
 * Parse a Markdown string and return an HTML string.
 * Pass `base` (from `$app/paths`) when markdown content may contain absolute
 * paths (e.g. `/docs/file.pdf`) so they are correctly prefixed for GitHub Pages.
 * Content comes from trusted CMS editors, so no sanitisation is applied.
 */
export function parseMarkdown(src: string, base = ''): string {
	const html = marked.parse(src) as string;
	if (!base) return html;
	// Prefix every absolute href (starting with / but not //) with the base path.
	return html.replace(/href="(\/(?!\/)[^"]*)"/g, `href="${base}$1"`);
}
