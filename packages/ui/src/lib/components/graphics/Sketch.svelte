<script lang="ts">
	import type {Scene, GeometryProps} from '$lib/types'
	import {afterUpdate} from 'svelte'

	import Geometry from '$lib/components/graphics/Geometry.svelte'
	import ToggleMenu from '$lib/components/compositions/menus/ToggleMenu.svelte'

	export let id = 'sketch'
	export let scene: Scene
	export let title: string
	export let dimensions = 'twin'
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

	export let items: any = [
		{id: 'play', value: 'play', text: 'Play', asset: 'emoji:play'},
		{id: 'pause', value: 'pause', text: 'Pause', asset: 'emoji:pause'},
		{id: 'clear', value: 'clear', text: 'Clear', asset: 'emoji:clear'},
	]

	$: state = 'clear'
	$: showDetails = geometry !== undefined && state === 'play'
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
			// call requestAnimationFrame again with parameters
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
		console.log('handleToggle - event')
		console.log(event)

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
	<div class="l:main">
		<div class={frameClasses} bind:offsetWidth={width} bind:offsetHeight={height}>
			<canvas id={`${id}.canvas`} aria-label={title} data-test="canvas" bind:this={canvas}>
				<div class={`feedback emoji:info ${size} l:text`}>
					<p>
						This is a demo of an interactive canvas component built with Svelte, using the example
						taken from the <a
							href="https://webglfundamentals.org/"
							target="_blank"
							rel="noopener noreferrer"
						>
							webglfundamentals
						</a> tutorials.
					</p>
				</div>
			</canvas>
		</div>
		{#if canvas}
			<ToggleMenu
				id="togggle"
				layout="switcher"
				{items}
				{variant}
				{color}
				{size}
				on:click={handleToggle}
			/>
		{/if}
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
