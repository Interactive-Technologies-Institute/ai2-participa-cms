<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '$lib/components/page-header.svelte';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { getLang, t } from '$lib/i18n.svelte';
	import { parseMarkdown } from '$lib/markdown';
	import content from '$lib/content/equipa-peritos.json';

	type Lang = 'pt' | 'en';
	let pageContent = $derived(content[getLang() as Lang]);
	let intro = $derived(parseMarkdown(pageContent.intro));
</script>

<PageHeader title={t('page.expertTeam.title')} />
<div class="container my-12 md:my-24">
	<div class="typography">
		{@html intro}
		{#each content.sections as section, i}
			<section class="mt-12">
				<h2>{pageContent.section_titles[i]}</h2>
				<ul class="grid gap-4 sm:grid-cols-2">
					{#each section.people as person (i + '|' + person.name + '|' + person.image)}
						<li class="not-typography flex items-center gap-4">
							<Avatar class="size-14">
								<AvatarImage
									src={asset(person.image)}
									alt={`${t('page.expertTeam.photoAlt')} ${person.name}`}
								/>
								<AvatarFallback>
									{person.name.slice(0, 1).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<span>{person.name}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</div>
