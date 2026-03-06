<script lang="ts">
	import { base } from '$app/paths';
	import PageHeader from '$lib/components/page-header.svelte';
	import { getLang, t } from '$lib/i18n.svelte';
	import { parseMarkdown } from '$lib/markdown';
	import content from '$lib/content/relatorios.json';

	type Lang = 'pt' | 'en';
	let body = $derived(parseMarkdown(content[getLang() as Lang].body, base));
</script>

<PageHeader title={t('page.reports.title')} />
<div class="container my-12 md:my-24">
	<div class="typography">
		{@html body}
	</div>
</div>
