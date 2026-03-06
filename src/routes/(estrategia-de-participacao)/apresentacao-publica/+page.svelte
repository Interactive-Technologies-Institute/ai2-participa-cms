<script lang="ts">
	import PageHeader from '$lib/components/page-header.svelte';
	import { getLang, t } from '$lib/i18n.svelte';
	import { parseMarkdown } from '$lib/markdown';
	import content from '$lib/content/apresentacao-publica.json';

	type Lang = 'pt' | 'en';
	let pageContent = $derived(content[getLang() as Lang]);
	let body = $derived(parseMarkdown(pageContent.body || content.pt.body));
</script>

<PageHeader title={t('page.publicPresentation.title')} />
<div class="container my-12 md:my-24">
	<div class="typography">
		{@html body}
	</div>
</div>
