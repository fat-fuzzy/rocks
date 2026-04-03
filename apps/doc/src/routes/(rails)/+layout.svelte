<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {AreaProps} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import {resolve} from '$app/paths'
	import {page} from '$app/state'
	import {links} from '$data/nav'

	import {linksSocials} from '$data/nav'
	import config from '$config/app'

	import Footer from '$lib/ui/Footer.svelte'
	import Socials from '$lib/ui/Socials.svelte'
	import NavSlides from '$lib/ui/NavSlides.svelte'

	const {ToggleTree, ToggleReveal, Cookies, Settings} = ui.drafts
	const {SkipLinks} = ui.recipes
	const {LayoutGrid} = ui.content
	const {Magic} = ui.blocks

	const {APP_SETTINGS} = config

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let sidenav = $derived(page.data.sidebar)
	let pathname = $derived(page.url.pathname)
	let layout = $derived(page.data.layout ?? sidenav.layout)
	let appContext = $derived(page.data.appContext)
	let talk = $derived(page.params.talk)
	let slide = $derived(page.data.content)
	let series = $derived(
		slide?.meta?.series && slide.meta.index > 0
			? slide.meta.series.items.map((id) =>
					page.data.talks.find((slide) => slide.meta.id === id),
				)
			: null,
	)

	const areas: AreaProps[] = $derived([
		{
			zone: zoneHeader,
			grid: true,
			exchange: true,
			tag: 'header',
		},
		{
			zone: zoneContent,
			hug: layout === 'steam' || layout === 'tram' || layout === 'urbanist',
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	])

	let brightness = $derived(appContext.brightness)
	let contrast = $derived(appContext.contrast)
	let preferences = $derived.by(() => {
		let preferences = APP_SETTINGS
		preferences.display[0].initial =
			brightness === 'night' ? 'active' : 'inactive'
		preferences.display[1].initial =
			contrast === 'blend' ? 'active' : 'inactive'
		return preferences
	})
</script>

<LayoutGrid
	{layout}
	{areas}
	{sidenav}
	size="3xs"
	app={appContext}
	path={pathname}
/>

{#snippet zoneHeader()}
	<div class="navbar l:grid size:3xs align:center bg:inherit raviolink">
		<ToggleReveal
			id="nav"
			label="Menu"
			font="md"
			variant="outline"
			color="primary"
			asset="home"
			justify="center"
			dismiss="outside"
			auto={true}
			place="nord"
			breakpoint="sm"
			background="inherit"
		>
			<ul
				class="header-nav l:switcher:2xs size:md unstyled color:primary align:center justify:evenly w:full bg:inherit"
			>
				<!-- <ul class={`header-nav unstyled ${navClasses}`}> -->
				<li aria-current={pathname === '/' ? 'page' : undefined}>
					<a data-sveltekit-preload-data href={resolve('/')}>Home</a>
				</li>
				{#each links as { slug, label }, i (i)}
					<li
						aria-current={pathname?.startsWith(`/${slug}`) ? 'page' : undefined}
					>
						<a data-sveltekit-preload-data href={resolve(`/${slug}`)}>
							{label}
						</a>
					</li>
				{/each}
			</ul>
		</ToggleReveal>
	</div>

	<div
		class="sidebar surface:0:neutral l:grid size:3xs align:center width:lg height:sm raviolink"
	>
		{#if sidenav.layout === 'tgv'}
			<div class="app-name">
				<Magic spell="fuzzy" size="3xs" mask="text">
					<div class="l:flex align:center justify:center">
						<ff-icon class="emoji:home font:lg"></ff-icon>
						<p class="font:h1 font:lg">Fat Fuzzy</p>
					</div>
				</Magic>
			</div>
		{:else}
			<nav
				id="sidenav"
				class="font:md width:md height:lg"
				data-testid={`sidenav-${pathname}`}
			>
				<SkipLinks
					id={`skiplinks-${pathname}`}
					text="Skip to content"
					href="#main"
				/>
				<ToggleReveal
					id="sidenav-reveal"
					label={sidenav.label}
					asset={sidenav.asset}
					color={sidenav.color}
					background={sidenav.background}
					variant={sidenav.variant}
					checked={true}
					area="gare"
					place="ouest"
					scroll="y"
					justify="evenly"
					font="md"
					width="md"
					height="lg"
					dismiss="outside"
				>
					<ToggleTree
						{...sidenav}
						id={`sidenav-${pathname}`}
						{pathname}
						preload={true}
						depth={0}
					/>
				</ToggleReveal>
			</nav>
		{/if}
	</div>

	<div class="context l:grid size:3xs bg:inherit raviolink">
		<ToggleReveal
			id="appContext"
			label="Settings"
			auto={true}
			breakpoint="xs"
			asset="settings"
			font="md"
			layout="grid"
			justify="center"
			text="start"
			place="est"
			variant="bare"
			background="inherit"
		>
			<Settings
				id="appContext-menu"
				label=""
				items={preferences.display}
				formaction="updateSettings"
				actionPath={page.url.pathname}
				onupdate={preferences.onupdate}
			/>
		</ToggleReveal>
	</div>
{/snippet}

{#snippet zoneContent()}
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
{/snippet}

{#snippet zoneFooter()}
	{#if talk}
		<Footer>
			<NavSlides {series} meta={slide?.meta ?? {}} />
		</Footer>
	{:else}
		<Footer>
			{#snippet socials()}
				<Socials links={linksSocials} />
			{/snippet}
			{#snippet actions()}
				{#if appContext.consent}
					<Cookies
						consent={appContext.consent}
						actionPath={appContext.actionPath}
						font="lg"
					/>
				{/if}
			{/snippet}
		</Footer>
	{/if}
{/snippet}
