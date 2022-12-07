<script lang="ts">
	import {onMount} from 'svelte'
	import Controls from '../graphics/Controls.svelte'
	export let title = ''
	export let dimensions = 'video'
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)
	export let sketch

	const {init, render, clear, duration} = sketch
	let canvas: HTMLCanvasElement
	let frame: number

	function runLoop(timestamp, duration) {
		render(canvas)
		frame = requestAnimationFrame(function (t) {
			// call requestAnimationFrame again with parameters
			runLoop(t, duration)
		})
	}

	function play() {
		clear(canvas)
		frame = requestAnimationFrame(function (timestamp) {
			runLoop(timestamp, duration)
		})
	}

	function stop() {
		cancelAnimationFrame(frame)
		clear(canvas)
	}

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
	let width = 300
	let height = 600
	onMount(() => {
		init(canvas)
		return () => clear(canvas)
	})
</script>

<div class={`l-frame ${dimensions} ${layer}`} bind:offsetWidth={width} bind:offsetHeight={height}>
	<canvas aria-label={title} data-test="canvas" bind:this={canvas}>
		You need HTML5 canvas support to display this content
	</canvas>
</div>
<Controls {play} {stop} />
