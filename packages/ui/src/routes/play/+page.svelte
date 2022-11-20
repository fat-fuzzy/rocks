<script lang="ts">
	import type {PageData} from './$types'
	import {currentItemId} from '$lib/stores/gfx'
	import Canvas from '$lib/blocks/canvas/Canvas.svelte'
	import Feedback from '$lib/blocks/feedback/Feedback.svelte'
	import Menu from '$lib/blocks/menu/Menu.svelte'

	export let data: PageData
	const {sketches} = data

	const menuItems: {id: string; title: string; emoji: string}[] = sketches
	let showcanvas = true
	let currentItem

	let showFeedback = !showcanvas
	let feedback = ''

	function loadSketch(event) {
		currentItemId.set(event.detail.selected)
	}

	$: currentItem = menuItems.find((a) => a.id === $currentItemId)
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
	<h2>&nbsp;❤︎&nbsp;{currentItem.title}&nbsp;{currentItem.emoji}</h2>
</header>

<section class="l-sidebar">
	<div class="l-sidebar-side sm shrink">
		<Menu on:input={loadSketch} {menuItems} />
	</div>
	<div class="l-sidebar-main l-stack">
		<Canvas show={showcanvas} {sketches} />
		<Feedback {feedback} show={showFeedback} />
	</div>
</section>
