<script lang="ts">
	import {onMount} from 'svelte'
	import Geometry from '$lib/components/graphics/Geometry.svelte'
	import Player from '$lib/components/graphics/Player.svelte'

	export let scene
	export let title: string
	export let dimensions = 'twin'
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)
	export let color = ''
	export let size = ''
	export let variant = ''

	let canvas: HTMLCanvasElement
	let width
	let height
	let geometry
	let programInfo
	// Canvas

	$: showDetails = geometry !== undefined

	function update(event) {
		scene.update(event.detail.value)
	}

	onMount(() => {
		programInfo = scene.main(canvas)
		geometry = programInfo.geometry
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
		<Player {scene} {color} {variant} {size} />
	</div>
	<aside class={showDetails ? 'l:side' : 'hide:rm-node'}>
		<details open>
			<summary class={`card:xs box:${color}:light bg:${color}:light `}> Details </summary>
			{#if geometry}
				<Geometry on:update={update} {geometry} canvasWidth={width} canvasHeight={height} {color} />
			{/if}
		</details>
	</aside>
</article>
