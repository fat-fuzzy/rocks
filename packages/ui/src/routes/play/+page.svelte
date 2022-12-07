<script lang="ts">
	import type {PageData} from './$types'
	import Feedback from '$blocks/cards/Feedback.svelte'

	export let data: PageData
	const {sketches} = data

	let sketchId = 'default'
	const items: {id: string; slug: string; title: string; emoji: string}[] = sketches

	let showcanvas = true
	let showFeedback = !showcanvas
	let feedback = ''

	function loadSketch(event) {
		sketchId = event.detail.selected
	}
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
</header>

{#each sketches as sketch}
	<pre>{sketch.title}</pre>
{/each}

<Feedback {feedback} show={showFeedback} />
