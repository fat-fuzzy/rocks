<script lang="ts">
	import * as draw from '../../utils/gl/draw.js'
	import {getGeometryDefaults} from '../../utils/gl/utils.js'
	import type {Sketch} from '../../../../data/data'
	import {theme} from '../../stores/theme'
	import {currentItemId} from '../../stores/gfx'
	import Button from '../button/Button.svelte'
	import Controls from '../controls/Controls.svelte'
	import Geometry from '../geometry/Geometry.svelte'

	export let show = true
	export let sketches: Sketch[] = []
	// Canvas
	let canvas
	let canvasWidth = 300
	let canvasHeight = 600
	let showDetails = true
	let animationFrame
	let variant = ''
	const btnVariant = 'outline'
	let webGlOptions

	// TODO : fix
	let geometry = getGeometryDefaults(canvasWidth, canvasHeight)

	function run(sketch) {
		if (!sketch.draw) {
			return // TODO: throw error
		}
		if (!webGlOptions) {
			webGlOptions = draw.initScene(canvas, sketch.vert, sketch.frag)
		}
		if (sketch.interactive) {
			drawFunction({webGlOptions, ...geometry})
		} else {
			drawFunction(webGlOptions)
		}
	}

	function clearCanvas() {
		draw.clear(webGlOptions)
	}

	function runLoop(timestamp, duration) {
		run(sketch)
		animationFrame = requestAnimationFrame(function (t) {
			// call requestAnimationFrame again with parameters
			runLoop(t, duration)
		})
	}

	function updateGeometry(event) {
		geometry = {...geometry, ...event.detail.value}
	}

	function play() {
		webGlOptions = draw.initScene(canvas, sketch.vert, sketch.frag)
		animationFrame = requestAnimationFrame(function (timestamp) {
			let {duration} = sketch
			runLoop(timestamp, duration)
		})
	}

	function stop() {
		cancelAnimationFrame(animationFrame)
		clearCanvas()
	}

	function togglelDetails() {
		showDetails = !showDetails
	}

	$: canvasClass = show ? '' : 'u-visually-hidden'
	$: sketch = sketches.find((sketch) => sketch.id === $currentItemId) // TODO: harmonize this naming
	$: details = sketch.interactive
	$: detailsIcon = showDetails ? '👇' : '👉'
	$: variant = $theme ? `${btnVariant} accent` : `${btnVariant} highlight`
	$: drawFunction = draw[sketch.draw]
</script>

<div class="l-sidebar">
	<div class="l-sidebar-main">
		<div
			class="l-frame video layer"
			bind:offsetWidth={canvasWidth}
			bind:offsetHeight={canvasHeight}
		>
			<canvas
				alt={`HTML Canvas displaying scene: ${sketch.title}`}
				data-test="canvas"
				class={canvasClass}
				bind:this={canvas}
			/>
		</div>
		<Controls {play} {stop} />
	</div>
	<div class="l-sidebar-side md">
		<aside class="l-stack sm">
			{#if details}
				<Button testId="btn-details" {variant} handleClick={() => togglelDetails()}>
					{detailsIcon} Details
				</Button>
				<Geometry show={showDetails} on:update={updateGeometry} {canvasWidth} {canvasHeight} />
			{/if}
		</aside>
	</div>
</div>
