<script lang="ts">
	import {page} from '$app/stores'
	import Feedback from '$blocks/cards/Feedback.svelte'

	$: sketches = $page.data.sketches

	let showcanvas = true
	let showFeedback = !showcanvas
	let feedback = ''
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

<div class="l-text">
	{#each sketches as sketch}
		<pre>{sketch.title}</pre>
	{/each}
	<Feedback {feedback} show={showFeedback} />
</div>
