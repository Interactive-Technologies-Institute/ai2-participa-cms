<script lang="ts">
	import { resolve } from '$app/paths';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu';
	import { t } from '$lib/i18n.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className
	}: {
		class?: string;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<NavigationMenu.Root class={className} viewport={false}>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Link href={resolve('/relatorios/')}>
				{t('nav.reports')}
			</NavigationMenu.Link>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>{t('nav.participationStrategy')}</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[260px] gap-4 p-2">
					<li>
						<NavigationMenu.Link href={resolve('/participacao-publica/')}>
							{t('nav.publicParticipation')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/metodologia-participacao-publica/')}>
							{t('nav.publicParticipationMethodology')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/comissao-acompanhamento/')}>
							{t('nav.advisoryCommittee')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/apresentacao-publica/')}>
							{t('nav.reports.presentations')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/reunioes-entidades/')}>
							{t('nav.stakeholderMeetings')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/mesas-tematicas/')}>
							{t('nav.thematicTables')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/workshops-descentralizados/')}>
							{t('nav.decentralizedWorkshops')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/iniciativas-bottom-up/')}>
							{t('nav.bottomUpInitiatives')}
						</NavigationMenu.Link>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>{t('nav.whatIsIt')}</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[280px] gap-4 p-2">
					<li>
						<NavigationMenu.Link href={resolve('/metodologia-st4s/')}>
							{t('nav.st4sMethodology')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/metodologia-avaliacao-estrategica-ai2/')}>
							{t('nav.strategicAssessmentMethodology')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/legislacao-nacional/')}>
							{t('nav.nationalLegislation')}
						</NavigationMenu.Link>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>{t('nav.aboutTeam')}</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[220px] gap-4 p-2">
					<li>
						<NavigationMenu.Link href={resolve('/coordenacao/')}>
							{t('nav.coordination')}
						</NavigationMenu.Link>
						<NavigationMenu.Link href={resolve('/equipa-peritos/')}>
							{t('nav.expertTeam')}
						</NavigationMenu.Link>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
