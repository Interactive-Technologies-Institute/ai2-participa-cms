<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getLang, t } from '$lib/i18n.svelte';
	import { parseMarkdown } from '$lib/markdown';
	import content from '$lib/content/home.json';

	type Lang = 'pt' | 'en';
	let pageContent = $derived(content[getLang() as Lang]);
	let body = $derived(parseMarkdown(pageContent.body));
</script>

<svelte:head>
	<title>AI²Participa</title>
	<meta name="title" content="AI²Participa" />
	<meta property="og:title" content="AI²Participa" />
	<meta name="twitter:title" content="AI²Participa" />
</svelte:head>

<section class="relative overflow-hidden bg-background py-20 md:py-32">
	<div class="relative z-10 container">
		<div class="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
			<Logo class="h-48 w-auto" />
			<h1 class="font-title text-4xl font-bold sm:text-5xl md:text-6xl">
				{pageContent.heading}
			</h1>
			<div class="flex justify-center">
				<Button
					size="lg"
					href={pageContent.participate_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{t('home.participateBtn')}
				</Button>
			</div>
		</div>
	</div>
	<div class="absolute inset-0 -z-10 overflow-hidden">
		<div class="dotted-grid-bg absolute inset-0 opacity-70"></div>
	</div>
</section>

<section class="bg-muted/30 py-16 md:py-20">
	<div class="typography container">
		<div class="large mx-auto max-w-4xl">
			{@html body}
		</div>
	</div>
</section>

<section class="py-20 md:py-24">
	<div class="container">
		<div class="mx-auto max-w-5xl text-center">
			<p class="text-lg leading-relaxed text-muted-foreground">
				{pageContent.cta_text}
			</p>
			<div class="mt-8 flex justify-center">
				<Button
					size="lg"
					href={pageContent.participate_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{t('home.ctaBtn')}
				</Button>
			</div>
		</div>
	</div>
</section>
