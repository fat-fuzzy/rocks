<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import Canvas from '$lib/canvas/Canvas.svelte'
	import Feedback from '$lib/feedback/Feedback.svelte'
	import Menu from '$lib/menu/Menu.svelte'

	let showcanvas = false
	let showFeedback = !showcanvas
	let feedback = ''

	function loadAnimation(event) {
		console.log('Load animation')
	}
</script>

<svelte:head>
	<title>Sandbox | 👾 Playground</title>
</svelte:head>

<header>
	<h1>👾 Playground</h1>
</header>

<section class="l-sidebar">
	<div class="l-sidebar-main">
		<Canvas show={showcanvas} />
		<Feedback {feedback} show={showFeedback} />
	</div>
	<div class="l-sidebar-side">
		<Menu on:input={loadAnimation} />
	</div>
</section>
