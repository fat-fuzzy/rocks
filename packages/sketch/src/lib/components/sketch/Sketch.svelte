<script lang="ts">
	import type {
		Scene,
		SceneContext,
		SceneMeta,
		Filters,
		PlayerPayload,
		GeometryProps,
	} from '$types'
	import {CanvasState, SketchEvent, ControlsEvent} from '$types'

	import {onDestroy, onMount} from 'svelte'

	import Geometry2D from '$lib/components/geometry/Geometry2D.svelte'
	import Player from '$lib/components/player/Player.svelte'
	import TextureControls from '$lib/components/menus/TextureControls.svelte'
	import CameraControls from '$lib/components/menus/CameraControls.svelte'
	import GeometryControls from '$lib/components/menus/GeometryControls.svelte'
	import Debug from '$lib/components/debug/Debug.svelte'

	import sketchStore from './store.svelte'

	type Props = {
		id: string
		scene: Scene
		title: string
		asset: string
		dimensions: string
		layer: string // if 'layer' the canvas will appear on a layer (with drop shadow)
		color: string
		size: string
		variant: string
		background: string
		layout: string
		breakpoint: string
		threshold: string
		meta?: SceneMeta
	}

	let {
		id = 'sketch',
		scene,
		title,
		asset,
		dimensions = 'video',
		layer = 'layer', // if 'layer' the canvas will appear on a layer (with drop shadow)
		color,
		size,
		variant = 'outline',
		background,
		layout = 'switcher',
		breakpoint,
		threshold,
		meta,
	}: Props = $props()

	let debug = true // TODO : fix this
	const DEFAULT_FILTERS = {
		channels: 'rgba',
		blur: 0,
		effects: ['normal'],
	}
	let feedback = $state([])

	let filters: Filters = $state(DEFAULT_FILTERS)
	let canvas: HTMLCanvasElement | null = $state(null)
	let programInfo = $state({})
	let context: SceneContext = $state({})
	let width = $state(undefined)
	let height = $state(undefined)

	let frame: number

	let disabled = $derived.by(sketchStore.getSketchDisabled)
	let isInteractive = $derived.by(sketchStore.getIsInteractive)

	let currentAsset = $derived(
		sketchStore.getCanvasState() === CanvasState.idle && asset
			? asset
			: `emoji:${sketchStore.canvas}`,
	)

	let backgroundClass = background
		? `l:frame:${dimensions} bg:${background}`
		: `l:frame:${dimensions}`

	let frameClasses = $derived(
		canvas
			? `canvas ${backgroundClass} ${layer} state:${sketchStore.getCanvasState()} ${currentAsset}`
			: `canvas ${backgroundClass} ${layer} card:xl`,
	)

	function init() {
		sketchStore.update(SketchEvent.load)
		filters = DEFAULT_FILTERS
		if (scene.init) {
			programInfo.context = scene.init(canvas)
		} else {
			programInfo = scene.main(canvas, context)
		}
		context = programInfo.context
		if (canvas) {
			try {
				scene.main(canvas, {filters})
				sketchStore.update(SketchEvent.loadOk)
				scene.update(context, {filters})
			} catch (e: any) {
				sketchStore.update(SketchEvent.loadNok)
				feedback.push({status: 'error', message: e})
			}
		}
	}

	function loop(t) {
		scene.draw(t)
		frame = requestAnimationFrame((t) => {
			loop(t)
		})
	}

	function play() {
		if (meta?.type !== 'texture') {
			loop(Date.now())
		} else {
			frame = requestAnimationFrame((t) => {
				scene.draw(t)
			})
		}
	}

	function clear() {
		const prevCanvasState = sketchStore.getCanvasState()
		stop()
		init()
		play()
		if (prevCanvasState === CanvasState.paused) {
			pause()
		}
	}

	function stop() {
		cancelAnimationFrame(frame)
		if (scene.stop) {
			scene.stop()
		} else {
			// TODO: use scene.stop() instead of scene.clear()
			scene.clear()
		}
		if (sketchStore.getCanvasState() === CanvasState.idle) {
			init()
		}
	}

	function pause() {
		cancelAnimationFrame(frame)
	}

	function updateGeometry(payload: {
		fieldOfView?: number
		geometry: GeometryProps
	}) {
		sketchStore.update(ControlsEvent.update)
		context = payload.geometry
		scene.update(context, {filters})
	}

	function updateCamera(event: CustomEvent) {
		context.fieldOfView = event.detail.value.fieldOfView
		context.cameraAngle = event.detail.value.fieldOfView
	}

	function updateCanvas(payload: PlayerPayload) {
		switch (payload.event) {
			case 'play':
				play()
				break
			case 'pause':
				pause()
				break
			case 'clear':
				clear()
				break
			case 'stop':
				stop()
				break
		}
		sketchStore.update(payload.event)
	}

	function updateFilters(filters: Filters) {
		if (canvas) {
			scene.update(canvas, {...context, filters})
			play()
		}
	}

	function handleMouseEvent(event: MouseEvent) {
		scene.update(context, {...context, filters})
	}

	onMount(() => {
		init()
	})

	onDestroy(() => {
		// TODO: make sure there are no leftover resources to clean
		if (frame) {
			stop()
		}
	})
</script>

<div class={`l:grid:sketch bp:xs`}>
	<div class="scene">
		<div
			class={frameClasses}
			bind:offsetWidth={width}
			bind:offsetHeight={height}
		>
			{#if scene?.meta?.input === 'mouse'}
				<canvas
					id={`${id}.canvas`}
					aria-label={title}
					data-test="canvas"
					bind:this={canvas}
					onmousedown={handleMouseEvent}
					onmousemove={handleMouseEvent}
					onmouseup={handleMouseEvent}
				>
					<p class={`feedback emoji:default ${size} content`}>
						The canvas element needs JavaScript enabled to display and interact
						with animations
					</p>
				</canvas>
			{:else}
				<canvas
					id={`${id}.canvas`}
					aria-label={title}
					data-test="canvas"
					bind:this={canvas}
				>
					<p class={`feedback emoji:default ${size} content`}>
						The canvas element needs JavaScript enabled to display and interact
						with animations
					</p>
				</canvas>
			{/if}

			{#if feedback.length > 0}
				{#each feedback as feedback}
					<pre
						class={`feedback emoji:${feedback.status} content ${size}`}>{feedback.message}</pre>
				{/each}
			{/if}
		</div>
	</div>
	<aside class="context">
		{#if canvas}
			<Player
				play={updateCanvas}
				pause={updateCanvas}
				clear={updateCanvas}
				stop={updateCanvas}
				initial={sketchStore.getPlayButtonState()}
				{color}
				size="xs"
				{variant}
				disabled={Boolean(feedback)}
			/>
			{#if meta && sketchStore.getState('player') === 'playing' && isInteractive}
				{#if meta.type === 'matrix-2d'}
					<Geometry2D
						id={`${id}-context-2d`}
						onupdate={updateGeometry}
						threshold={breakpoint}
						{context}
						canvasWidth={canvas.getBoundingClientRect().width}
						canvasHeight={canvas.getBoundingClientRect().height}
						{disabled}
					/>
				{:else}
					<div
						class={`l:${layout}:${size} th:${threshold} maki:block lg context bg:${background}`}
					>
						{#if meta.camera}
							<CameraControls id="camera-controls" onupdate={updateCamera} />
						{:else if meta.type === 'matrix-3d'}
							<GeometryControls
								id="geometry-controls"
								{canvas}
								onupdate={updateGeometry}
								{context}
							/>
						{:else if meta.type === 'texture'}
							<TextureControls
								id="texture-controls"
								channels={meta?.channels}
								blur={meta?.blur}
								convolutions={meta?.convolutions}
								onupdate={updateFilters}
							/>
						{/if}
					</div>
				{/if}
			{/if}
		{/if}
	</aside>
	{#if debug}
		<Debug {meta} context={sketchStore} />
	{/if}
</div>

<style lang="scss">
	@import '../../styles/scss/grid-sketch.scss';
	@import '../../styles/css/grid-sketch.css';
	@import '../../styles/css/sketch.css';
</style>
