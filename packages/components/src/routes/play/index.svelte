<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import {currentAnimationId} from '../../stores.js'
	import Canvas from '../../lib/canvas/Canvas.svelte'
	import Feedback from '../../lib/feedback/Feedback.svelte'
	import Menu from '../../lib/menu/Menu.svelte'

	let showcanvas = true
	let animation

	let showFeedback = !showcanvas
	let feedback = ''

	function loadAnimation(event) {
		console.log('Load animation')
		currentAnimationId.set(event.detail.animationId)
		console.log(animation)
	}
</script>

<svelte:head>
	<title>Sandbox | 👾 Playground</title>
	<meta
		name="description"
		content="Playground: a sandbox environment to experiment and learn web-based computer graphics."
	/>
</svelte:head>

<header>
	<h1>👾 Playground</h1>
</header>

<section class="l-sidebar">
	<div class="l-sidebar-side sm">
		<Menu on:input={loadAnimation} />
	</div>
	<div class="l-sidebar-main l-stack">
		<Canvas show={showcanvas} />
		<Feedback {feedback} show={showFeedback} />
	</div>
</section>
