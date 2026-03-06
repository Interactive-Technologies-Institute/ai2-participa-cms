<script lang="ts">
	import { resolve } from '$app/paths';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { t } from '$lib/i18n.svelte';
	import { cn } from '$lib/utils';
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

	type NavItemProps = HTMLAnchorAttributes & {
		content?: string;
	};

	let {
		class: className
	}: {
		class?: string;
	} & HTMLAttributes<HTMLElement> = $props();

	let open = $state(false);
</script>

{#snippet NavItem({ href, content, class: itemClassName, ...props }: NavItemProps)}
	<a
		{href}
		onclick={() => {
			open = false;
		}}
		class={cn('text-xl font-medium', itemClassName)}
		{...props}
	>
		{content}
	</a>
{/snippet}

<Popover.Root bind:open>
	<Popover.Trigger class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), className)}>
		<div class="relative flex h-8 w-4 items-center justify-center">
			<div class="relative size-4">
				<span
					class={cn(
						'absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
						open ? 'top-[0.4rem] -rotate-45' : 'top-1'
					)}
				></span>
				<span
					class={cn(
						'absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
						open ? 'top-[0.4rem] rotate-45' : 'top-2.5'
					)}
				></span>
			</div>
			<span class="sr-only">{t('nav.toggleMenu')}</span>
		</div>
	</Popover.Trigger>
	<Popover.Content
		class="no-scrollbar h-(--bits-popover-content-available-height) w-(--bits-popover-content-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100"
		align="start"
		side="bottom"
		alignOffset={-16}
		sideOffset={14}
		preventScroll
	>
		<div class="flex flex-col gap-5 overflow-auto px-6 py-6">
			{@render NavItem({ href: resolve('/relatorios/'), content: t('nav.reports') })}
			<div class="flex flex-col gap-2">
				<div class="text-sm font-medium text-muted-foreground">
					{t('nav.participationStrategy')}
				</div>
				<div class="flex flex-col gap-2">
					{@render NavItem({
						href: resolve('/participacao-publica/'),
						content: t('nav.publicParticipation')
					})}
					{@render NavItem({
						href: resolve('/metodologia-participacao-publica/'),
						content: t('nav.publicParticipationMethodology')
					})}
					{@render NavItem({
						href: resolve('/comissao-acompanhamento/'),
						content: t('nav.advisoryCommittee')
					})}
					{@render NavItem({
						href: resolve('/apresentacao-publica/'),
						content: t('nav.reports.presentations')
					})}
					{@render NavItem({
						href: resolve('/reunioes-entidades/'),
						content: t('nav.stakeholderMeetings')
					})}
					{@render NavItem({
						href: resolve('/mesas-tematicas/'),
						content: t('nav.thematicTables')
					})}
					{@render NavItem({
						href: resolve('/workshops-descentralizados/'),
						content: t('nav.decentralizedWorkshops')
					})}
					{@render NavItem({
						href: resolve('/iniciativas-bottom-up/'),
						content: t('nav.bottomUpInitiatives')
					})}
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="text-sm font-medium text-muted-foreground">{t('nav.whatIsIt')}</div>
				<div class="flex flex-col gap-2">
					{@render NavItem({
						href: resolve('/metodologia-st4s/'),
						content: t('nav.st4sMethodology')
					})}
					{@render NavItem({
						href: resolve('/metodologia-avaliacao-estrategica-ai2/'),
						content: t('nav.strategicAssessmentMethodology')
					})}
					{@render NavItem({
						href: resolve('/legislacao-nacional/'),
						content: t('nav.nationalLegislation')
					})}
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="text-sm font-medium text-muted-foreground">{t('nav.aboutTeam')}</div>
				<div class="flex flex-col gap-2">
					{@render NavItem({ href: resolve('/coordenacao/'), content: t('nav.coordination') })}
					{@render NavItem({ href: resolve('/equipa-peritos/'), content: t('nav.expertTeam') })}
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
