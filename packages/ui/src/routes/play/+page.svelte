<script lang="ts">
	import type {PageData} from './$types'
	import type {Sketch} from '$data/data'
	import Canvas from '$blocks/media/Canvas.svelte'
	import Feedback from '$blocks/cards/Feedback.svelte'
	import ButtonMenuReveal from '$blocks/buttons/ButtonMenuReveal.svelte'

	export let data: PageData
	const {sketches} = data

	let sketchId = 'default'
	let sketch: Sketch | undefined = sketches.find((a) => a.id === sketchId)
	const items: {slug: string; title: string; emoji: string}[] = sketches

	let showcanvas = true
	let showFeedback = !showcanvas
	let feedback = ''

	function loadSketch(event) {
		sketchId = event.detail.selected
	}

	$: sketch = sketches.find((a) => a.id === sketchId)
</script>

<svelte:head>
	<title>UI Sandbox | 👾 Play</title>
	<meta
		name="description"
		content="Playground: a sandbox environment to experiment and learn web-based computer graphics."
	/>
</svelte:head>

<header class="header-page">
	<h1>👾 Play</h1>
	{#if sketch} <h2>&nbsp;❤︎&nbsp;{sketch.title}&nbsp;{sketch.emoji}</h2> {/if}
</header>

<section class="l-sidebar start">
	<div class="l-main l-stack">
		<Canvas show={showcanvas} {sketch} />
		<Feedback {feedback} show={showFeedback} />
	</div>
	<div class="l-side sm shrink">
		<!--TODO: make routes for animations & use Nav -->
		<ButtonMenuReveal on:click={loadSketch} {items} size="md" />
	</div>
</section>
