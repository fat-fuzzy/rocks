<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {AreaProps, ViewingPreferences} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import {resolve} from '$app/paths'
	import {page} from '$app/state'

	import {links} from '$config/navigation'
	import {linksSocials} from '$config/navigation'

	import Footer from '$lib/ui/Footer.svelte'
	import Socials from '$lib/ui/Socials.svelte'
	import NavSlides from '$lib/ui/NavSlides.svelte'

	const {ToggleTree, ToggleReveal, Cookies, ToggleSettings} = ui.drafts
	const {SkipLinks} = ui.recipes
	const {LayoutGrid} = ui.content
	const {Magic} = ui.blocks

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let sidenav = $derived(page.data.sidebar)
	let pathname = $derived(page.url.pathname)
	let layout = $derived(page.data.layout ?? sidenav.layout)
	let appContext: ViewingPreferences = $state({
		brightness: 'system',
		contrast: 'contrast',
		consent: {
			functional: true,
		},
	})
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
			hug:
				layout === 'steam' ||
				layout === 'tram' ||
				layout === 'urbanist' ||
				layout === 'voyager',
			grid: true,
			container: 'text',
			containerSize: '2xl',
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	])

	function updateSettings(event: Event) {
		const target = event.target as HTMLInputElement
		appContext[target.name] = target.value
	}
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
	<div class="navbar align:start">
		<ToggleReveal
			id="nav"
			label="Menu"
			font="sm"
			size="3xs"
			asset="home"
			justify="center"
			align="start"
			layer="1"
			auto={true}
			depth={0}
			breakpoint="sm"
			shape="square"
			background="inherit"
		>
			<ul
				class="header-nav l:flex size:xs w:full unstyled color:primary align:center justify:around bg:inherit"
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
		class="sidebar hug surface:0:neutral align:center width:lg height:sm raviolink"
	>
		{#if sidenav.layout === 'tgv'}
			<div class="app-name">
				<Magic spell="fuzzy" mask="text">
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
					variant="bare"
					checked={true}
					area="gare"
					place="ouest"
					shape="square"
					scroll="y"
					layer="1"
					depth={0}
					font="sm"
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
						shape="square"
						width="full"
					/>
				</ToggleReveal>
			</nav>
		{/if}
	</div>

	<div class="context hug raviolink">
		<ToggleReveal
			id="appContext"
			label="Settings"
			color="neutral"
			asset="settings"
			font="sm"
			layout="flex"
			justify="end"
			place="est"
			depth={0}
			layer="1"
			variant="bare"
			shape="square"
			background="blur"
		>
			<ToggleSettings
				id="appContext-menu"
				name="app-settings"
				label="Settings"
				selected={appContext}
				oninput={updateSettings}
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
				<Cookies actionPath={page.url.pathname} font="lg" />
			{/snippet}
		</Footer>
	{/if}
{/snippet}
