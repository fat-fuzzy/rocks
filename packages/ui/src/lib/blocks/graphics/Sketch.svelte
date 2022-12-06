<script lang="ts">
	import {onMount} from 'svelte'
	import type {Sketch} from '$data/sketches/data' // seems to accept aliases outside lib folder
	import {theme} from '../../stores/theme' // ... but not inside lib folder
	import Button from '../buttons/Button.svelte'
	import Canvas from '../media/Canvas.svelte'
	import Controls from '../graphics/Controls.svelte'
	import Geometry from '../graphics/Geometry.svelte'

	const {draw, utils} = gl

	export let show = true
	export let sketch: Sketch

	// Canvas
	let canvas: HTMLCanvasElement
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
		console.log('RUN')
		if (!sketch.draw) {
			return // TODO: throw error
		}
		// if (!webGlOptions) {
		// 	console.log('webGlOptions Once')
		// 	webGlOptions = draw.initScene(canvas, sketch.vert, sketch.frag)
		// }
		if (sketch.interactive) {
			console.log('sketch.interactive')
			console.log(geometry)
			drawFunction({webGlOptions, ...geometry})
		} else {
			drawFunction(webGlOptions)
		}
	}

	function clearCanvas() {
		draw.clear(webGlOptions)
	}

	function runLoop(timestamp, duration) {
		console.log('RUN LOOP', duration)
		run(sketch)
		animationFrame = requestAnimationFrame(function (t) {
			// call requestAnimationFrame again with parameters
			runLoop(t, duration)
		})
	}

	function updateGeometry(event) {
		console.log('Geometry event')
		console.log(event)
		geometry = {...geometry, ...event.detail.value}
	}

	function play() {
		updateGeometry({detail: {value: {}}})
		if (sketch) {
			webGlOptions = draw.initScene(canvas, sketch.vert, sketch.frag)
			animationFrame = requestAnimationFrame(function (timestamp) {
				console.log('PLAY')
				let {duration} = sketch
				runLoop(timestamp, duration)
			})
		}
	}

	function stop() {
		cancelAnimationFrame(animationFrame)
		// if (animationFrame) {
		// 	cancelAnimationFrame(animationFrame)
		// }
		clearCanvas()
	}

	function togglelDetails() {
		showDetails = !showDetails
	}
	onMount(() => {
		console.log(sketch)
	})
	$: title = sketch.title ? `Sketch: ${sketch.title}` : 'No sketch selected yet'
</script>

<article class="l-sidebar">
	<div class="l-main">
		<Canvas {canvas} />
		<Controls {play} {stop} />
	</div>
	<aside class="l-side l-stack sm">
		<h2>{title}</h2>
		<Button id="btn-details" {variant} onClick={() => togglelDetails()}>
			{detailsIcon} Details
		</Button>
		{#if details}
			<Geometry show={showDetails} on:update={updateGeometry} {canvasWidth} {canvasHeight} />
		{/if}
	</aside>
</article>
