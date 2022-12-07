<script lang="ts">
	import {theme} from '../../stores/theme' // ... but not inside lib folder
	import Button from '../buttons/Button.svelte'
	import Canvas from '../media/Canvas.svelte'
	// import Geometry from '../graphics/Geometry.svelte'

	export let sketch
	const {title, details, geometry} = sketch

	// Canvas
	let showDetails = true
	let variant = ''
	const btnVariant = 'outline'

	let geometry = {}

	// TODO : fix
	// let geometry = utils.getGeometryDefaults(canvasWidth, canvasHeight)

	$: detailsIcon = showDetails ? '👇' : '👉'
	$: variant = $theme ? `${btnVariant} accent` : `${btnVariant} highlight`

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
		{#if details}
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
