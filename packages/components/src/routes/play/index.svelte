<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import {animations, currentAnimationId} from '../../stores.js'
	import Canvas from '../../lib/canvas/Canvas.svelte'
	import Feedback from '../../lib/feedback/Feedback.svelte'
	import Menu from '../../lib/menu/Menu.svelte'

	let showcanvas = true
	let animation
	let animationId = $currentAnimationId

	let showFeedback = !showcanvas
	let feedback = ''

	function loadAnimation(event) {
		console.log('Load animation')
		currentAnimationId.set(event.detail.animationId)
		animation = $animations.find((animation) => animation.id === animationId)
		console.log(animation)
	}

	$: animation = $animations.find((animation) => animation.id === animationId)
</script>

<svelte:head>
	<title>Sandbox | 👾 Playground</title>
</svelte:head>

<header>
	<h1>👾 Playground</h1>
</header>

<section class="l-sidebar xs">
	<div class="l-sidebar-side">
		<Menu on:input={loadAnimation} />
	</div>
	<div class="l-sidebar-main">
		<Canvas show={showcanvas} {animation} />
		<Feedback {feedback} show={showFeedback} />
	</div>
</section>
