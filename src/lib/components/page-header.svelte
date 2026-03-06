<script lang="ts">
	export let title: string;
	export let description: string | undefined = undefined;
</script>

<svelte:head>
	<title>{title} | AI²Participa</title>
	<meta name="title" content="{title} | AI²Participa" />
	<meta property="og:title" content="{title} | AI²Participa" />
	<meta name="twitter:title" content="{title} | AI²Participa" />
</svelte:head>

<div class="relative w-full overflow-hidden">
	<div class="dotted-grid-bg absolute inset-0 z-0"></div>
	<div class="relative z-10 container mx-auto px-4 py-12 text-center md:py-20">
		<h1 class="mb-6 font-title text-5xl font-bold md:text-6xl lg:text-7xl">{title}</h1>
		{#if description}
			<p class="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">{description}</p>
		{/if}
	</div>
</div>
