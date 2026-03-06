import { marked, Marked } from 'marked';

marked.use({ gfm: true });

/**
 * Parse a Markdown string and return an HTML string.
 * Pass `base` (from `$app/paths`) when markdown content may contain absolute
 * paths (e.g. `/docs/file.pdf`) so they are correctly prefixed for GitHub Pages.
 * Content comes from trusted CMS editors, so no sanitisation is applied.
 */
export function parseMarkdown(src: string, base = ''): string {
	if (!base) {
		return marked.parse(src) as string;
	}

	const m = new Marked({ gfm: true });
	m.use({
		walkTokens(token) {
			if (
				(token.type === 'link' || token.type === 'image') &&
				typeof token.href === 'string' &&
				token.href.startsWith('/') &&
				!token.href.startsWith('//')
			) {
				token.href = base + token.href;
			}
		}
	});
	return m.parse(src) as string;
}
