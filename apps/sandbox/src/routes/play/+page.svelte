<script lang="ts">
	import type {PageData} from './$types'
	import {compositions, graphics, layouts} from '@fat-fuzzy/ui'

	export let data: PageData
	let {sketches} = data
	const {Sidebar} = layouts
	const {RevealNav} = compositions
	const {Sketch} = graphics

	let sketchId = '001'
	let title = ''
	let emoji = ''
	let dimensions: string | undefined
	let sketchData = sketches.find((a) => a.id === sketchId)
	if (sketchData) {
		title = sketchData.title
		emoji = sketchData.emoji
		dimensions = sketchData.dimensions
	}
	$: items = sketches
</script>

<svelte:head>
	<title>Client | 👾 Play</title>
	<meta
		name="description"
		content="Playground: a sandbox environment to experiment and learn web-based computer graphics."
	/>
</svelte:head>

<header class="header-page">
	<h1>👾 Play</h1>
	{#if sketchData}
		<h2>&nbsp;❤︎&nbsp;{title}&nbsp;{emoji}</h2>
	{/if}
</header>

<Sidebar>
	<div slot="side">
		<RevealNav {items} id="nav-sketches" title="👾 Sketches" size="md" />
	</div>
	<div slot="main" class="l:stack">
		🚧 WIP 🚧
		<!-- <Sketch sketch={sketchId} {title} {dimensions} /> -->
	</div>
</Sidebar>
