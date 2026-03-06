<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '$lib/components/page-header.svelte';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { getLang, t } from '$lib/i18n.svelte';
	import { parseMarkdown } from '$lib/markdown';
	import content from '$lib/content/coordenacao.json';

	type Lang = 'pt' | 'en';
	let pageContent = $derived(content[getLang() as Lang]);
	let intro = $derived(parseMarkdown(pageContent.intro));
	let scientificBio = $derived(parseMarkdown(pageContent.scientific_bio));
	let institutionalBio = $derived(parseMarkdown(pageContent.institutional_bio));
</script>

<PageHeader title={t('page.coordination.title')} />
<div class="container my-12 md:my-24">
	<div class="typography">
		{@html intro}
		<h2>{t('page.coordination.scientificCoordination')}</h2>
		<div class="mt-4 flex flex-col items-start gap-4">
			<Avatar class="not-typography size-28">
				<AvatarImage
					src={asset(content.scientific_coordinator_image)}
					alt={content.scientific_coordinator_name}
				/>
				<AvatarFallback>MR</AvatarFallback>
			</Avatar>
			<p class="large mt-0">
				{content.scientific_coordinator_name}<br />
				<span class="muted">{t('page.coordination.scientificRole')}</span>
			</p>
		</div>
		{@html scientificBio}
		<h2>{t('page.coordination.institutionalCoordination')}</h2>
		<div class="mt-4 flex flex-col items-start">
			<img
				src={asset('/logo-planapp.svg')}
				alt="PLANAPP - Centro de Planeamento e de Avaliação de Políticas Públicas"
				class="h-24 w-auto"
			/>
			<p class="large mt-0">
				PLANAPP - Centro de Planeamento e de Avaliação de Políticas Públicas<br />
				<span class="muted">{t('page.coordination.institutionalRole')}</span>
			</p>
		</div>
		{@html institutionalBio}
	</div>
</div>
