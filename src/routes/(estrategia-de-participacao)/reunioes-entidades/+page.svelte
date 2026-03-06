<script lang="ts">
	import PageHeader from '$lib/components/page-header.svelte';
	import { getLang, t } from '$lib/i18n.svelte';
	import { parseMarkdown } from '$lib/markdown';
	import content from '$lib/content/reunioes-entidades.json';

	type Lang = 'pt' | 'en';
	let body = $derived(parseMarkdown(content[getLang() as Lang].body));
</script>

<PageHeader title={t('page.stakeholderMeetings.title')} />
<div class="container my-12 md:my-24">
	<div class="typography">
		{@html body}
	</div>
</div>
