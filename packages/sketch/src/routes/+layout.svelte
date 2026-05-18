<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {UiColor, UiSize, UiSurface} from '@fat-fuzzy/ui'

	import '@fat-fuzzy/style/css'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	const {ToggleTree, ToggleReveal} = ui.drafts
	const {SkipLinks} = ui.recipes
	const {LayoutGrid} = ui.content

	type Props = {
		children: Snippet
	}

	let {children}: Props = $props()

	let appContext = $derived(page.data.appContext)

	let sketches = $state(page.data.sketches.map((s) => ({...s, label: s.title})))

	let path = ''

	let nav = {
		path,
		id: 'sidebar',
		slug: 'play',
		title: 'Sketches',
		label: 'Sketches',
		items: sketches,
		reveal: 'expanded',
		background: 'inherit' as UiSurface,
		breakpoint: 'sm' as UiSize,
		size: 'sm' as UiSize,
		color: 'primary' as UiColor,
		place: 'left',
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
	<nav
		id="sidenav"
		class="font:md width:md height:lg"
		data-testid={`sidenav-${path}`}
		aria-label={nav.label}
	>
		<SkipLinks id={`skiplinks-${path}`} text="Skip to content" href="#main" />
		<ToggleReveal
			id="sidenav-reveal"
			label={nav.label}
			color={nav.color}
			background={nav.background}
			variant="bare"
			checked={true}
			area="gare"
			place="ouest"
			scroll="y"
			justify="evenly"
			font="md"
			width="md"
			height="lg"
			depth={0}
			dismiss="outside"
		>
			<ToggleTree
				items={sketches}
				id={`sidenav-${path}`}
				pathname={path}
				preload={true}
				depth={0}
			/>
		</ToggleReveal>
	</nav>
{/snippet}

{#snippet zoneContent()}
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
{/snippet}

{#snippet zoneFooter()}{/snippet}
