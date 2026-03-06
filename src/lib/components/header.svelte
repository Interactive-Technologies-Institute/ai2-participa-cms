<script lang="ts">
	import MainNav from '$lib/components/nav/main-nav.svelte';
	import MobileNav from '$lib/components/nav/mobile-nav.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getLang, t, toggleLang } from '$lib/i18n.svelte';
	import Logo from './logo.svelte';
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background">
	<div class="container flex h-16 items-center gap-4">
		<Logo class="mr-auto h-10 w-auto" />
		<MainNav class="hidden lg:flex" />
		<button
			onclick={toggleLang}
			title={t('lang.switchTo')}
			aria-label={t('lang.switchTo')}
			class="flex items-center rounded border px-2 py-1 text-xs font-semibold tracking-wide transition-colors hover:bg-muted"
		>
			<span class={getLang() === 'pt' ? 'text-foreground' : 'text-muted-foreground'}>PT</span>
			<span class="mx-0.5 text-muted-foreground">|</span>
			<span class={getLang() === 'en' ? 'text-foreground' : 'text-muted-foreground'}>EN</span>
		</button>
		<Button href="https://ai2participa.eu.consider.it/" target="_blank" rel="noopener noreferrer">
			{t('header.participate')}
		</Button>
		<MobileNav class="flex lg:hidden" />
	</div>
</header>
