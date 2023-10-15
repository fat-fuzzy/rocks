<script lang="ts">
	import {onMount} from 'svelte'
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)
	export let sketch

	let {title, init, dimensions, clear} = sketch
	let canvas: HTMLCanvasElement
	let width
	let height

	/**
	 * Responsive canvas
	 *  The default width and height of the canvas will change responsively,
	 *  thanks to the combination of the following:
	 *  - the `l:frame` class used on the canvas container does the following:
	 *     - it sets a fixed ratio specified by the `dimensions` class
	 *     - it resizes itself responsively to the size its container
	 *  - the width and height of the canvas are bound reactively to the offsetWidth and offsetHeight of the container frame
	 *  - the canvas element adjusts to the dimensions provided by the reactive width and height properties
	 */
	onMount(() => {
		// Get the size that the browser is displaying the canvas
		init(canvas)
		return () => clear(canvas) // TODO: figure this out : clear doesn't reset the webgl context
	})
</script>

<div class="l:main">
	<div class={`l:frame ${dimensions} ${layer}`} bind:offsetWidth={width} bind:offsetHeight={height}>
		<canvas aria-label={title} data-test="canvas" bind:this={canvas}>
			You need HTML5 canvas support to display this content
		</canvas>
	</div>
	<!-- Optionally add controls to interact with the canvas -->
	<slot name="player" {canvas} />
</div>
