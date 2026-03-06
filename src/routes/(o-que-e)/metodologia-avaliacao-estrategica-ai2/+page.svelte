<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '$lib/components/page-header.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getLang, t } from '$lib/i18n.svelte';
	import { parseMarkdown } from '$lib/markdown';
	import content from '$lib/content/metodologia-avaliacao-estrategica.json';

	type Lang = 'pt' | 'en';
	let body = $derived(parseMarkdown(content[getLang() as Lang].body));
</script>

<PageHeader title={t('page.strategicAssessmentMethodology.title')} />
<div class="container my-12 md:my-24">
	<div class="typography">
		{@html body}
		<div class="not-typography mt-10">
			<Button variant="outline" href={asset(content.doc_url)}>
				{t('page.strategicAssessment.viewDoc')}
			</Button>
		</div>
	</div>
</div>
