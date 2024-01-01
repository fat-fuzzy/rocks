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
	export let breakpoint = ''

	let canvas: HTMLCanvasElement | null = null
	let width: number
	let height: number
	let geometry: GeometryProps
	let programInfo

	let frame: number
	let state = 'clear'

	$: showDetails = geometry !== undefined && (state === 'play' || state === 'pause')
	$: playerAsset = state === 'clear' ? 'sketch' : state
	$: backgroundClass = background
		? `l:frame:${dimensions} bg:${background}`
		: `l:frame:${dimensions}`
	$: frameClasses = canvas
		? `canvas ${backgroundClass} ${layer} state:${state} emoji:${playerAsset}`
		: `canvas ${backgroundClass} ${layer} card:xl `

	function init() {
		if (canvas) {
			programInfo = scene.main(canvas)
			if (state === 'clear' || !geometry) {
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

<article class={`l:grid:sketch bp:xs`}>
	<div class="scene">
		<div class={frameClasses} bind:offsetWidth={width} bind:offsetHeight={height}>
			<canvas id={`${id}.canvas`} aria-label={title} data-test="canvas" bind:this={canvas}>
				<slot name="fallback-canvas">
					<p class={`feedback emoji:default ${size} content`}>
						With JavaScript enabled, you would see a demo of a canvas component used to display and
						interact with WebGL animations
					</p>
				</slot>
			</canvas>
			{#await Promise.resolve()}
				<p class={`feedback emoji:default ${size} content`}>
					When JavaScript loads, you should see a demo of a canvas component used to display and
					interact with WebGL animations
				</p>
			{/await}
		</div>
	</div>
	<aside class="context">
		{#if canvas}
			<Player on:click={handleToggle} {color} size="xs" {variant} />

			{#if showDetails}
				<Geometry
					id={`${id}-geometry`}
					on:update={update}
					threshold={breakpoint}
					{geometry}
					canvasWidth={Number(canvas.getBoundingClientRect().width.toFixed())}
					canvasHeight={Number(canvas.getBoundingClientRect().height.toFixed())}
					{color}
					disabled={state === 'pause'}
				/>
			{/if}
		{/if}
	</aside>
</article>
