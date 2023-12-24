<script lang="ts">
	import type {Scene, GeometryProps} from '$lib/types'
	import {afterUpdate} from 'svelte'

	import Geometry from '$lib/components/graphics/Geometry.svelte'
	import Player from '$lib/components/graphics/Player.svelte'

	export let id = 'sketch'
	export let scene: Scene
	export let title: string
	export let dimensions = 'video'
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)
	export let color = ''
	export let size = ''
	export let variant = ''
	export let background = ''

	let canvas: HTMLCanvasElement | null = null
	let width: number
	let height: number
	let geometry: GeometryProps
	let programInfo

	let frame: number

	$: playerAside = ['xs', 'sm'].includes(size)
	$: state = 'clear'
	$: showDetails = geometry !== undefined && (state === 'play' || state === 'pause')
	$: backgroundClass = background
		? `l:frame:${dimensions} bg:${background}`
		: `l:frame:${dimensions}`
	$: frameClasses = canvas
		? `canvas ${backgroundClass} ${layer} state:${state} emoji:${state}`
		: `canvas ${backgroundClass} ${layer} card:xl `

	function init() {
		if (canvas) {
			programInfo = scene.main(canvas)
			if (state === 'clear') {
				geometry = programInfo.geometry
			}
			scene.update(geometry)
		}
	}

	const loop = () => {
		scene.draw()
		frame = requestAnimationFrame((t) => {
			loop()
		})
	}

	const play = () => loop()

	const clear = () => {
		cancelAnimationFrame(frame)
		scene.clear()
	}

	const pause = () => cancelAnimationFrame(frame)

	function update(event: CustomEvent) {
		geometry = event.detail.value
		scene.update(geometry)
	}

	const handleToggle = (event: CustomEvent) => {
		state = event.detail.selected[0].value
		switch (state) {
			case 'play':
				play()
				break
			case 'pause':
				pause()
				break
			case 'clear':
				clear()
				break
		}
	}

	afterUpdate(() => {
		if (state !== 'pause') {
			init()
		}
	})
</script>

<article class="l:sidebar:xxs">
	<div class={`l:main ${size}`}>
		<div class={frameClasses} bind:offsetWidth={width} bind:offsetHeight={height}>
			<canvas id={`${id}.canvas`} aria-label={title} data-test="canvas" bind:this={canvas}>
				<slot name="fallback">
					<p class={`feedback emoji:info ${size} l:text`}>
						This is a demo of an interactive canvas component used to display and interact with
						WebGL animations
					</p>
				</slot>
			</canvas>
		</div>
		{#if canvas && !playerAside}
			<Player id="sketch.player" on:click={handleToggle} {color} {size} {variant} />
		{/if}
	</div>
	<aside class="l:side">
		{#if canvas && playerAside}
			<Player on:click={handleToggle} {color} {size} {variant} />
		{/if}
		{#if showDetails}
			<Geometry
				on:update={update}
				{geometry}
				canvasWidth={width}
				canvasHeight={height}
				{color}
				disabled={state === 'pause'}
			/>
		{/if}
	</aside>
</article>
