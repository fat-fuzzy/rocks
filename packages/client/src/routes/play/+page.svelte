<script lang="ts">
	import type {PageData} from './$types'
	import type {Sketch} from '$data/data'
	import {blocks} from '@fat-fuzzy/ui'

	export let data: PageData
	let {sketches} = data
	const {Canvas, Feedback, Menu} = blocks

	let sketchId = 'default'
	let sketch: Sketch | undefined = sketches.find((a) => a.id === sketchId)
	const menuItems: {id: string; title: string; emoji: string}[] = sketches

	let showcanvas = true
	let showFeedback = !showcanvas
	let feedback = ''

	function loadAnimation(event) {
		sketchId = event.detail.selected
	}

	$: sketch = sketches.find((a) => a.id === sketchId)
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
	{#if sketch} <h2>&nbsp;❤︎&nbsp;{sketch.title}&nbsp;{sketch.emoji}</h2> {/if}
</header>

<section class="l-sidebar">
	<div class="l-side sm shrink">
		<Menu on:input={loadAnimation} {menuItems} />
	</div>
	<div class="l-main l-stack">
		<Canvas show={showcanvas} {sketch} />
		<Feedback {feedback} show={showFeedback} />
	</div>
</section>
