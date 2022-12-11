<script lang="ts">
	import {theme} from '$stores/theme' // TODO: figure out whubut not inside lib folder
	import {onMount} from 'svelte'
	import Button from '../buttons/Button.svelte'
	import Geometry from '../graphics/Geometry.svelte'
	import Player from './Player.svelte'

	export let sketch
	export let title: string
	export let dimensions: string
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)

	let canvas: HTMLCanvasElement
	let width
	let height
	let geometry
	let programInfo
	// Canvas
	let showDetails = true
	let variant = 'outline'

	$: detailsIcon = showDetails ? '👇' : '👉'
	$: variant = $theme ? `${variant} accent` : `${variant} highlight` // TODO:  fix this in css

	function togglelDetails() {
		showDetails = !showDetails
	}
	function update(event) {
		sketch.update(event.detail.value)
	}
	onMount(() => {
		programInfo = sketch.main(canvas)
		geometry = programInfo.geometry
	})
</script>

<article class="l-sidebar">
	<div class="l-main">
		<div
			class={`l-frame ${dimensions} ${layer}`}
			bind:offsetWidth={width}
			bind:offsetHeight={height}
		>
			<canvas aria-label={title} data-test="canvas" bind:this={canvas}>
				You need HTML5 canvas support to display this content
			</canvas>
		</div>
		<Player {sketch} {canvas} />
	</div>
	<aside class="l-side l-stack sm">
		<h2>{title}</h2>
		<Button id="btn-details" {variant} onClick={() => togglelDetails()}>
			{detailsIcon} Details
		</Button>
		<div class={showDetails ? 'l-stack' : 'visually-hidden'}>
			{#if geometry}
				<Geometry on:update={update} {geometry} canvasWidth={width} canvasHeight={height} />
			{/if}
		</div>
	</aside>
</article>
