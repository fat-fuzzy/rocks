<script lang="ts">
	import {onDestroy} from 'svelte'
	import * as settings from '$lib/stores/settings'
	import {onMount, afterUpdate} from 'svelte'
	import Geometry from '$lib/components/graphics/Geometry.svelte'
	import Player from '$lib/components/graphics/Player.svelte'

	export let scene
	export let title: string
	export let dimensions = 'twin'
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)

	let canvas: HTMLCanvasElement
	let width
	let height
	let geometry
	let programInfo
	// Canvas

	let appSettings: {[key: string]: string} = {brightness: '', contrast: ''}

	const stores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
	]

	$: variant = appSettings.brightness === 'day' ? 'accent' : 'highlight' // TODO:  fix this
	$: showDetails = geometry !== undefined

	function toggleDetails() {
		showDetails = !showDetails
	}

	function update(event) {
		scene.update(event.detail.value)
	}

	onMount(() => {
		programInfo = scene.main(canvas)
		geometry = programInfo.geometry
	})

	afterUpdate(() => {
		programInfo = scene.main(canvas)
		geometry = programInfo.geometry
	})
	// TODO clean gl data when switching animations

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<article class="l:sidebar:xxs">
	<div class="l:main">
		<div
			class={`l:frame:${dimensions} ${layer}`}
			bind:offsetWidth={width}
			bind:offsetHeight={height}
		>
			<canvas aria-label={title} data-test="canvas" bind:this={canvas}>
				You need HTML5 canvas support to display this content
			</canvas>
		</div>
		<Player {scene} />
	</div>
	<aside class={showDetails ? 'l:side' : 'hide:rm-node'}>
		<details open>
			<summary class={`card:sm box:${variant}`}> Details </summary>
			{#if geometry}
				<Geometry on:update={update} {geometry} canvasWidth={width} canvasHeight={height} />
			{/if}
		</details>
	</aside>
</article>
