import { marked } from 'marked';

marked.use({ gfm: true });

/**
 * Parse a Markdown string and return an HTML string.
 * Content comes from trusted CMS editors, so no sanitisation is applied.
 */
export function parseMarkdown(src: string): string {
	return marked.parse(src) as string;
}
