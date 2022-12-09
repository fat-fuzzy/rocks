<script lang="ts">
	import {theme} from '$stores/theme' // TODO: figure out whubut not inside lib folder
	import Button from '../buttons/Button.svelte'
	import Canvas from '../media/Canvas.svelte'
	// import Geometry from '../graphics/Geometry.svelte'

	export let sketch
	let title = ''
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)
	let {geometry} = sketch

	// Canvas
	let showDetails = true
	let variant = 'outline'

	$: detailsIcon = showDetails ? '👇' : '👉'
	$: variant = $theme ? `${variant} accent` : `${variant} highlight` // TODO:  fix this in css

	function updateGeometry(event) {
		console.log('Geometry event')
		console.log(event)
		geometry = {...geometry, ...event.detail.value}
	}

	function togglelDetails() {
		showDetails = !showDetails
	}
</script>

<article class="l-sidebar">
	<div class="l-main">
		<Canvas {sketch} />
	</div>
	<aside class="l-side l-stack sm">
		<h2>{title}</h2>
		<Button id="btn-details" {variant} onClick={() => togglelDetails()}>
			{detailsIcon} Details
		</Button>
		{#if geometry}
			<!-- <Geometry
				show={showDetails}
				on:update={updateGeometry}
				{geometry}
				{canvasWidth}
				{canvasHeight}
			/> -->
		{/if}
	</aside>
</article>
