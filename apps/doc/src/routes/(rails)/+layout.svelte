<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'
	import Footer from '$lib/ui/Footer.svelte'

	const {RevealNav, Header} = ui.recipes
	const {HeaderGrid, HeaderNav, RevealContext} = ui.drafts
	const {LayoutGrid} = ui.content

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let mainNav = $derived(page.data.nav)
	let sidenav = $derived(page.data.sidebar)
	let layout = $derived(page.data.layout ?? sidenav.layout)
	let appContext = $derived(page.data.appContext)

	type AreaZone = {
		zone: Snippet
		grid?: boolean
		gare?: string
		scroll?: string
	}

	type Areas = {
		[key: string]: AreaZone[]
	}

	const twoZones = [
		{
			zone: zoneHeader,
			grid: true,
			tag: 'header',
		},
		{
			zone: zoneContent,
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	]
	const fourZones = [
		{
			zone: zoneHeaderGrid,
			grid: true,
			tag: 'header',
		},
		{
			zone: zoneNav2,
			grid: true,
			gare: 'ouest',
		},
		{
			zone: zoneContent,
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	]
	const fiveZones = [
		{
			zone: zoneNav1,
			grid: true,
			gare: 'nord',
		},
		{
			zone: zoneNav2,
			grid: true,
			gare: 'ouest',
		},
		{
			zone: zoneAppContext,
			grid: true,
		},
		{
			zone: zoneContent,
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	]
	const zoneGroups: Areas = {
		tgv: twoZones,
		metro: fourZones,
		steam: fourZones,
		tram: fourZones,
		voyager: fiveZones,
		railway: fiveZones,
	}

	let areas = $derived(zoneGroups[sidenav.layout])
</script>

<LayoutGrid
	{layout}
	{areas}
	{sidenav}
	size={'3xs'}
	app={appContext}
	path={page.url.pathname}
/>

{#snippet zoneHeaderGrid()}
	<HeaderGrid
		id="nav"
		name="nav"
		label="Menu"
		font="sm"
		size="md"
		path={page.url.pathname}
		reveal={mainNav.reveal}
		actionPath={page.url.pathname}
		formaction="toggleNav"
		dismiss="outside"
		main={links}
		context={appContext}
		breakpoint="xs"
	/>
{/snippet}

{#snippet zoneHeader()}
	<Header
		id="nav"
		name="nav"
		title="Menu"
		label="Menu"
		font="sm"
		size="md"
		path={page.url.pathname}
		reveal={page.data.nav.reveal}
		actionPath={page.url.pathname}
		formaction="updateSettings"
		main={links}
		context={appContext}
		breakpoint="xs"
		layout="grid"
	/>
{/snippet}

{#snippet zoneNav1()}
	<div class="navbar">
		<HeaderNav
			id="nav"
			name="nav"
			title="Menu"
			label="Menu"
			font="sm"
			size="md"
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
			formaction="toggleNav"
		/>
	</div>
{/snippet}

{#snippet zoneNav2()}
	<RevealNav
		{...sidenav}
		position={false}
		place="left"
		scroll="y"
		layer={1}
		justify="evenly"
		size="md"
		font="sm"
		dismiss="outside"
	/>
{/snippet}

{#snippet zoneAppContext()}
	<RevealContext
		id="appContext"
		name="appContext"
		label="Settings"
		path={page.url.pathname}
		actionPath={page.url.pathname}
		breakpoint="xs"
		size="md"
		font="sm"
		formaction="updateSettings"
		context={appContext}
		reveal={appContext.reveal}
	/>
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
