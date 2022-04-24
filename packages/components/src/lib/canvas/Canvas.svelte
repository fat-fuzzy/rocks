<script context="module" lang="ts">
	import {getGeometryDefaults} from '../../gl/animations.js'
	export const prerender = true
</script>

<script>
	import Controls from '../controls/Controls.svelte'
	import Geometry from '../geometry/Geometry.svelte'
	export let show = true
	export let animation
	// Canvas
	let canvas
	let canvasWidth = 300
	let canvasHeight = 600
	let animationFrame

	let showGeometryInputs = false
	// TODO : fix - geometry state is not reactive
	let geometry = getGeometryDefaults(canvasWidth, canvasHeight)

	function runLoop(timestamp, duration) {
		if (animation.interactive) {
			if (animation.webGlProps) {
				animation.update(geometry)
			} else {
				animation.run(canvas, geometry)
			}
		} else {
			animation.run(canvas)
		}
		animationFrame = requestAnimationFrame(function (t) {
			// call requestAnimationFrame again with parameters
			runLoop(t, duration)
		})
	}

	function updateGeometry(event) {
		console.log('Update Geometry')
		geometry = {...geometry, ...event.detail.value}
	}

	function play() {
		console.log('Play animation')
		animationFrame = requestAnimationFrame(function (timestamp) {
			let {duration} = animation
			runLoop(timestamp, duration)
		})
	}

	function stop() {
		console.log('Stop animation')
		if (animation && animation.interactive && animation.webGlProps) {
			geometry = getGeometryDefaults(canvasWidth, canvasHeight)
			animation.update(geometry)
		}
		cancelAnimationFrame(animationFrame)
		animation.clear()
	}

	function toggleHandles() {
		showGeometryInputs = !showGeometryInputs
	}

	$: canvasClass = show ? 'canvas' : 'u-hidden'
	$: interactive = animation.interactive
</script>

<div class="l-frame video layer xl" bind:offsetWidth={canvasWidth} bind:offsetHeight={canvasHeight}>
	<canvas data-test="canvas" class={canvasClass} bind:this={canvas} />
</div>
<div class="l-switcher xs">
	<Controls {play} {stop} on:toggleInputs={toggleHandles} {interactive} />
	{#if showGeometryInputs}
		<Geometry on:update={updateGeometry} {canvasWidth} {canvasHeight} />
	{/if}
</div>
