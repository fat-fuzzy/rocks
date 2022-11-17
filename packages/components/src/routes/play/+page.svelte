<script>
	import {currentAnimationId, animations} from '../../stores/gfx'
	import Canvas from '$lib/canvas/Canvas.svelte'
	import Feedback from '$lib/feedback/Feedback.svelte'
	import Menu from '$lib/menu/Menu.svelte'

	let showcanvas = true
	let animationId = $currentAnimationId
	let animation

	let showFeedback = !showcanvas
	let feedback = ''

	currentAnimationId.subscribe((value) => {
		animationId = value
	})

	function loadAnimation(event) {
		currentAnimationId.set(event.detail.animationId)
	}

	$: animation = $animations.find((a) => a.id === animationId)
</script>

<svelte:head>
	<title>Sandbox | 👾 Play</title>
	<meta
		name="description"
		content="Playground: a sandbox environment to experiment and learn web-based computer graphics."
	/>
</svelte:head>

<header class="header-main">
	<h1>👾 Play</h1>
	<h2>&nbsp;❤︎&nbsp;{animation.name}&nbsp;{animation.emoji}</h2>
</header>

<section class="l-sidebar">
	<div class="l-sidebar-side sm shrink">
		<Menu on:input={loadAnimation} />
	</div>
	<div class="l-sidebar-main l-stack">
		<Canvas show={showcanvas} />
		<Feedback {feedback} show={showFeedback} />
	</div>
</section>
