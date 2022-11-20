<script lang="ts">
	// @ts-ignore
	import {gl} from '@fat-fuzzy/lib'
	import type {Sketch} from '../../../data/data'
	import {theme} from '../../stores/theme'
	import Button from '../button/Button.svelte'
	import Controls from '../controls/Controls.svelte'
	import Geometry from '../geometry/Geometry.svelte'

	const {draw, utils} = gl

	export let show = true
	export let sketch: Sketch
	
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
	let geometry = utils.getGeometryDefaults(canvasWidth, canvasHeight)

	$: details = sketch ? sketch.interactive : false
	$: detailsIcon = showDetails ? '👇' : '👉'
	$: variant = $theme ? `${btnVariant} accent` : `${btnVariant} highlight`
	$: drawFunction = sketch ? draw[sketch.draw] : null

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
</script>

<div class="l-sidebar">
	<div class="l-sidebar-main">
		<div
			class="l-frame video layer"
			bind:offsetWidth={canvasWidth}
			bind:offsetHeight={canvasHeight}
		>
			<canvas
				alt={sketch ? `Current sketch: ${sketch.title}` :  'No sketch selected yet'}
				data-test="canvas"
				class={!show ? 'u-visually-hidden' : ''}
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
