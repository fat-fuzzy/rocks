<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'
	import Footer from '$lib/ui/Footer.svelte'

	const {RevealNav} = ui.recipes
	const {HeaderGrid} = ui.drafts
	const {LayoutGrid} = ui.content

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let mainNav = $derived(page.data.nav)
	let gridLayout = $derived(page.data.layout ?? page.data.nav.layout)
	let sidenav = $derived(page.data.sidebar)
	let appContext = $derived(page.data.appContext)

	let brightness = $derived(appContext.brightness)
	let contrast = $derived(appContext.contrast)
	let preferences = $derived.by(() => {
		let preferences = ui.constants.APP_SETTINGS
		preferences.display[0].initial =
			brightness === 'night' ? 'active' : 'inactive'
		preferences.display[1].initial =
			contrast === 'blend' ? 'active' : 'inactive'
		return preferences
	})

	let areas = [
		{
			zone: zone1,
			grid: true,
			gare: 'nord',
		},
		{
			zone: zone2,
			grid: true,
			gare: 'ouest',
		},
		{
			zone: zone3,
			grid: true,
			scroll: 'y',
		},
		{
			zone: zone4,
			grid: true,
		},
	]
</script>

<LayoutGrid
	layout={gridLayout}
	{areas}
	{sidenav}
	app={appContext}
	path={page.url.pathname}
/>

{#snippet zone1()}
	<HeaderGrid
		id="nav"
		name="nav"
		label="Menu"
		path={page.url.pathname}
		reveal={mainNav.reveal}
		actionPath={page.url.pathname}
		formaction="toggleNav"
		dismiss="outside"
		main={links}
		context={appContext}
		{preferences}
		breakpoint="xs"
		layout={sidenav.layout}
	/>
{/snippet}

{#snippet zone2()}
	<RevealNav
		{...sidenav}
		position={false}
		place="left"
		scroll="y"
		justify="evenly"
		font="sm"
		size="md"
		dismiss="outside"
	/>
{/snippet}

{#snippet zone3()}
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
{/snippet}

{#snippet zone4()}
	<Footer />
{/snippet}
