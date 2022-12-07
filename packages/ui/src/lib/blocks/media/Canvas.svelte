<script lang="ts">
	import {onMount} from 'svelte'
	import Controls from '../graphics/Controls.svelte'
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)
	export let sketch
	let {title, init, dimensions, clear} = sketch

	let canvas: HTMLCanvasElement
	let width
	let height
	/**
	 * Responsive canvas
	 *  Thes default width and height of the canvas (declarations below) will change responsively,
	 *  thanks to the combination of the following:
	 *  - the `l-frame` class used on the canvas container does the following:
	 *     - it sets a fixed ratio specified by the `dimensions` class
	 *     - it resizes itself responsively to the size its container
	 *  - the width and height of the canvas are bound reactively to the offsetWidth and offsetHeight of the above frame
	 *  - the canvas element will adjust to the dimensions provided by the reactive width and height properties
	 */
	onMount(() => {
		init(canvas)
		return () => clear(canvas) // TODO: figure this out : clear doesn't reset the webgl context
	})
</script>

<div class={`l-frame ${dimensions} ${layer}`} bind:offsetWidth={width} bind:offsetHeight={height}>
	<canvas aria-label={title} data-test="canvas" bind:this={canvas} {width} {height}>
		You need HTML5 canvas support to display this content
	</canvas>
</div>
<Controls {sketch} {canvas} />
