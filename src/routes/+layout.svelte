<script lang="ts">
	import { browser } from '$app/environment';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { getLang, initLang } from '$lib/i18n.svelte';
	import { onMount } from 'svelte';
	import './layout.css';

	onMount(() => {
		initLang();
	});

	$effect(() => {
		if (browser) {
			document.documentElement.lang = getLang();
		}
	});

	let { children } = $props();
</script>

<ScrollArea class="h-screen w-full">
	<div id="top"></div>
	<Header />
	<main class="min-h-[calc(100vh-4rem)]">
		{@render children()}
	</main>
	<Footer />
</ScrollArea>
