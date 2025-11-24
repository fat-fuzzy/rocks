<script lang="ts">
	import type {Snippet} from 'svelte'
	import '@fat-fuzzy/style/css'
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {RevealNav} = ui.recipes
	const {LayoutGrid} = ui.content

	type Props = {
		children: Snippet
	}

	let {children}: Props = $props()

	let appContext = $derived(page.data.appContext)

	let sketches = $state(page.data.sketches)

	let path = ''

	let nav = {
		path,
		id: 'sidebar',
		slug: 'play',
		title: 'Sketches',
		label: 'Sketches',
		items: sketches,
		reveal: 'expanded',
		background: 'inherit',
		breakpoint: 'sm',
		size: 'sm',
		color: 'primary',
		place: 'left',
		formaction: 'toggleSidebar',
	}

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
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	])
</script>

<LayoutGrid
	layout="steam"
	{areas}
	size="3xs"
	app={appContext}
	path={page.url.pathname}
/>

{#snippet zoneHeader()}
	<RevealNav
		{...nav}
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
{/snippet}

{#snippet zoneContent()}
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
{/snippet}

{#snippet zoneFooter()}{/snippet}
