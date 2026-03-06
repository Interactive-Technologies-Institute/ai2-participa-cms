<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { t } from '$lib/i18n.svelte';
	import Logo from './logo.svelte';
</script>

<footer class="border-t bg-muted/50 py-12">
	<div class="container">
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div class="flex flex-col items-start gap-4">
				<Logo class="h-24 w-auto" />
				<p class="max-w-[24rem] text-sm text-muted-foreground">
					{t('footer.description')}
				</p>
				<p class="text-sm text-muted-foreground">
					{t('footer.contactPrompt')}
					<a
						href="mailto:ai2@planapp.gov.pt"
						class="transition-color text-primary hover:text-foreground"
					>
						{t('footer.contactLink')}
					</a>
				</p>
			</div>
			<div>
				<div class="flex flex-col gap-4">
					<a href="https://www.planapp.gov.pt/" target="_blank" rel="noreferrer">
						<img
							src={asset('/logo-planapp.svg')}
							alt={t('footer.logoAltPlanapp')}
							class="h-24 w-auto transition-opacity hover:opacity-80"
						/>
					</a>
					<a href="https://www.portugal.gov.pt/pt/gc25" target="_blank" rel="noreferrer">
						<img
							src={asset('/logo-pt.svg')}
							alt={t('footer.logoAltGov')}
							class="h-20 w-auto transition-opacity hover:opacity-80"
						/>
					</a>
				</div>
			</div>
			<div>
				<p class="font-semibold">{t('footer.participationStrategy')}</p>
				<ul class="mt-3 space-y-2 text-sm text-muted-foreground">
					<li>
						<a href={resolve('/participacao-publica/')} class="hover:text-foreground">
							{t('nav.publicParticipation')}
						</a>
					</li>
					<li>
						<a href={resolve('/metodologia-participacao-publica/')} class="hover:text-foreground">
							{t('nav.publicParticipationMethodology')}
						</a>
					</li>
					<li>
						<a href={resolve('/comissao-acompanhamento/')} class="hover:text-foreground">
							{t('nav.advisoryCommittee')}
						</a>
					</li>
					<li>
						<a href={resolve('/apresentacao-publica/')} class="hover:text-foreground">
							{t('nav.reports.presentations')}
						</a>
					</li>
					<li>
						<a href={resolve('/reunioes-entidades/')} class="hover:text-foreground">
							{t('nav.stakeholderMeetings')}
						</a>
					</li>
					<li>
						<a href={resolve('/mesas-tematicas/')} class="hover:text-foreground">
							{t('nav.thematicTables')}
						</a>
					</li>
					<li>
						<a href={resolve('/workshops-descentralizados/')} class="hover:text-foreground">
							{t('nav.decentralizedWorkshops')}
						</a>
					</li>
					<li>
						<a href={resolve('/iniciativas-bottom-up/')} class="hover:text-foreground">
							{t('nav.bottomUpInitiatives')}
						</a>
					</li>
				</ul>
			</div>
			<div>
				<a href={resolve('/relatorios/')} class="hover:text-foreground">{t('nav.reports')}</a>
				<p class="mt-4 font-semibold text-foreground">{t('footer.whatIsIt')}</p>
				<ul class="mt-3 space-y-2 text-sm text-muted-foreground">
					<li>
						<a href={resolve('/metodologia-st4s/')} class="hover:text-foreground">
							{t('nav.st4sMethodology')}
						</a>
					</li>
					<li>
						<a
							href={resolve('/metodologia-avaliacao-estrategica-ai2/')}
							class="hover:text-foreground"
						>
							{t('nav.strategicAssessmentMethodology')}
						</a>
					</li>
					<li>
						<a href={resolve('/legislacao-nacional/')} class="hover:text-foreground">
							{t('nav.nationalLegislation')}
						</a>
					</li>
				</ul>
				<p class="mt-4 font-semibold text-foreground">{t('footer.aboutTeam')}</p>
				<ul class="mt-3 space-y-2 text-sm text-muted-foreground">
					<li>
						<a href={resolve('/coordenacao/')} class="hover:text-foreground">
							{t('nav.coordination')}
						</a>
					</li>
					<li>
						<a href={resolve('/equipa-peritos/')} class="hover:text-foreground">
							{t('nav.expertTeam')}
						</a>
					</li>
				</ul>
			</div>
		</div>
		<Separator class="my-8" />
		<div
			class="flex flex-col gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between"
		>
			<p>{t('footer.copyright')}</p>
			<div class="flex justify-center md:justify-end">
				<Button variant="ghost" size="sm" href="#top">{t('footer.backToTop')}</Button>
			</div>
		</div>
	</div>
</footer>
