<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import Controls from '$lib/controls/Controls.svelte'
	import Geometry from '$lib/geometry/Geometry.svelte'
	export let show = true
	// Canvas
	let canvas
	let canvasWidth = 300
	let canvasHeight = 150

	let showGeometryInputs = false

	function updateGeometry() {
		console.log('Update Geometry')
	}

	function play() {
		console.log('Play animation')
	}

	function stop() {
		console.log('Stop animation')
	}

	$: canvasClass = show ? 'canvas' : 'u-hidden'
</script>

<svelte:head>
	<title>State Machines</title>
</svelte:head>
<div bind:offsetWidth={canvasWidth} bind:offsetHeight={canvasHeight}>
	<canvas data-test="canvas" class={canvasClass} bind:this={canvas} />
</div>

<Controls {play} {stop} />
{#if showGeometryInputs}
	<Geometry on:update={updateGeometry} {canvasWidth} {canvasHeight} />
{/if}
