<script lang="ts">
	import type {Scene, GeometryProps} from '$lib/types'
	import {afterUpdate} from 'svelte'

	import Geometry from '$lib/components/graphics/Geometry.svelte'
	import Player from '$lib/components/graphics/Player.svelte'
	import ToggleMenu from '$lib/components/recipes/menus/ToggleMenu.svelte'

	export let id = 'sketch'
	export let scene: Scene
	export let title: string
	export let dimensions = 'video'
	export let layer = 'layer' // if 'layer' the canvas will appear on a layer (with drop shadow)
	export let color = ''
	export let size = ''
	export let variant = ''

	let canvas: HTMLCanvasElement | null = null
	let width: number
	let height: number
	let angle = 45
	let geometry: GeometryProps
	let programInfo

	let frame: number

	$: state = 'clear'
	$: showDetails = geometry !== undefined && (state === 'play' || state === 'pause')
	$: frameClasses = canvas
		? `l:frame:${dimensions} ${layer} state:${state} emoji:${state}`
		: `l:frame:${dimensions} ${layer} card:xl`

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	function init() {
		if (canvas) {
			programInfo = scene.main(canvas)
			if (state === 'clear') {
				initGeometry()
			}
			scene.update(geometry)
		}
	}

	function initGeometry() {
		if (canvas) {
			programInfo = scene.main(canvas)
			geometry = {
				...programInfo.geometry,
				translation: [width / 2, height / 2],
				rotation: [Math.cos(degToRad(angle)), Math.sin(degToRad(angle))],
			}
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
		scene.update(event.detail.value)
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
	</div>
	<aside class="l:side">
		{#if canvas}
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
