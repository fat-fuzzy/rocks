<script lang="ts">
	import type {Snippet} from 'svelte'
	import {onMount} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'
	import Footer from '$lib/ui/Footer.svelte'

	const {HeaderNav, RevealContext} = ui.drafts
	const {RevealNav} = ui.recipes
	const {LayoutGrid} = ui.content
	const {Magic} = ui.blocks

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let useDarkScheme = $state(false)
	let mainNav = $derived(page.data.nav)
	let sidenav = $derived(page.data.sidebar)
	let layout = $derived(page.data.layout ?? sidenav.layout)
	let appContext = $derived(page.data.appContext)

	type AreaZone = {
		zone: Snippet
		grid?: boolean
		gare?: string
		scroll?: string
		exchange?: boolean
		hug?: boolean
		tag?: string
	}

	const areas: AreaZone[] = $derived([
		{
			zone: zoneHeader,
			grid: true,
			exchange: true,
			tag: 'header',
		},
		{
			zone: zoneContent,
			// hug: layout === 'steam' || layout === 'tram' || layout === 'urbanist',
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	])

	function handleThemeChange(event: MediaQueryListEvent | MediaQueryList) {
		if (event.matches) {
			useDarkScheme = true
		} else {
			useDarkScheme = false
		}
	}

	onMount(() => {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
		handleThemeChange(prefersDarkScheme)
		appContext.brightness = useDarkScheme ? 'night' : 'day'
	})
</script>

<LayoutGrid
	{layout}
	{areas}
	{sidenav}
	size="3xs"
	app={appContext}
	path={page.url.pathname}
/>

{#snippet zoneHeader()}
	<div class="navbar bg:inherit l:grid size:3xs align:center">
		<HeaderNav
			id="nav"
			name="nav"
			title="Menu"
			label="Menu"
			size="sm"
			font="xs"
			variant="outline"
			asset="home"
			justify="start"
			dismiss="outside"
			auto={true}
			{links}
			path={page.url.pathname}
			reveal={mainNav.reveal}
			actionPath={page.url.pathname}
			breakpoint="xs"
			background="inherit"
			formaction="toggleNav"
		/>
	</div>

	<div
		class={`${sidenav.reveal} sidebar bg:inherit l:grid size:3xs align:center width:lg height:sm`}
	>
		{#if sidenav.layout === 'tgv'}
			<div class="app-name">
				<Magic spell="fuzzy" size="xs" circle="dotted" mask="text">
					<div class="l:flex align:center justify:center">
						<ff-icon class="emoji:home font:lg"></ff-icon>
						<p class="font:h1 font:lg">Fat Fuzzy</p>
					</div>
				</Magic>
			</div>
		{:else}
			<RevealNav
				{...sidenav}
				position={false}
				area="gare"
				place="ouest"
				layout="rails"
				scroll="y"
				layer={1}
				justify="evenly"
				size="sm"
				font="xs"
				width="lg"
				height="sm"
				background="inherit"
				dismiss="outside"
			/>
		{/if}
	</div>

	<div class="context l:grid size:3xs bg:inherit">
		<RevealContext
			id="appContext"
			name="appContext"
			label="Settings"
			path={page.url.pathname}
			actionPath={page.url.pathname}
			breakpoint="xs"
			size="sm"
			font="xs"
			layout="grid"
			formaction="updateSettings"
			background="inherit"
			context={appContext}
			reveal={appContext.reveal}
		/>
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
	<Footer />
{/snippet}
