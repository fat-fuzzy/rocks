<script lang="ts">
	import type {
		Scene,
		SceneContext,
		SceneMeta,
		Filters,
		PlayerPayload,
		GeometryProps,
	} from '$types'
	import {CanvasState, CanvasEvent, SketchEvent, ControlsEvent} from '$types'

	import {onMount} from 'svelte'

	import Geometry2D from '$lib/components/geometry/Geometry2D.svelte'
	import Player from '$lib/components/player/Player.svelte'
	import TextureControls from '$lib/components/menus/TextureControls.svelte'
	import CameraControls from '$lib/components/menus/CameraControls.svelte'
	import GeometryControls from '$lib/components/menus/GeometryControls.svelte'
	import Debug from '$lib/components/debug/Debug.svelte'

	import store from './store.svelte'
	import types from './types'

	const {DEFAULT_FILTERS} = types

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
		layer = '0', // if 'layer' the canvas will appear on a layer (with drop shadow)
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
	let feedback = $state([])
	let filters: Filters = $state(DEFAULT_FILTERS)
	let canvas: HTMLCanvasElement | null = $state(null)
	let context: SceneContext = $state({})

	let frame: number
	let time: number

	let currentAsset = $derived(
		store.state.canvas === CanvasState.idle && asset
			? asset
			: `emoji:${store.state.events.current}`,
	)

	let currentState = $derived(
		store.state.canvas === CanvasState.loading ||
			store.state.canvas === CanvasState.idle
			? `state:${store.state.canvas}`
			: '',
	)

	let backgroundClass = background
		? `l:frame:${dimensions} bg:${background}`
		: `l:frame:${dimensions}`

	let frameClasses = $derived(
		`canvas ${backgroundClass} ${layer} ${currentState} ${currentAsset}`,
	)

	function init() {
		store.update(SketchEvent.load)
		if (canvas) {
			try {
				if (scene.init) {
					context = {...context, ...scene.init(canvas)}
				}
				context = {...context, ...scene.main(canvas, context)}

				scene.update({...context, filters})
				store.update(SketchEvent.loadOk)
			} catch (e: any) {
				store.update(SketchEvent.loadNok)
				store.state.feedback['canvas'].push({status: 'error', message: e})
			}
		}
	}

	function loop(time: number) {
		scene.draw(time)
		frame = requestAnimationFrame((time) => {
			loop(time)
		})
	}

	function play() {
		if (store.state.canvas === CanvasState.idle) {
			init()
		}
		time = Date.now()
		if (meta?.type !== 'texture') {
			loop(time)
		} else {
			frame = requestAnimationFrame((time) => {
				scene.draw(time)
			})
		}
		store.update(CanvasEvent.play)
	}

	function reset() {
		if (frame) {
			cancelAnimationFrame(frame)
		}
		store.state.feedback['canvas'] = []
		store.updateFilters(DEFAULT_FILTERS)
		scene.clear()
	}

	function clear() {
		const prevCanvasState = store.state.canvas
		reset()
		init()
		play()
		//TODO: test this VS transitions
		if (prevCanvasState === CanvasState.paused) {
			pause()
			store.update(prevCanvasState)
		} else {
			store.update(CanvasEvent.play)
		}
	}

	function stop() {
		reset()
		if (scene.stop) {
			scene.stop()
		}
	}

	function pause() {
		//TODO: pause scene
		cancelAnimationFrame(frame)
	}

	function updateGeometry(payload: {
		fieldOfView?: number
		geometry: GeometryProps
	}) {
		context = {
			...payload.geometry,
			fieldOfView: degToRad(payload.fieldOfView ?? 60),
		}
		scene.update({...context, filters})
		store.update(ControlsEvent.update)
	}
	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	function updateCamera(payload: {fieldOfView: number; cameraAngle: number}) {
		context.fieldOfView = degToRad(payload.fieldOfView)
		context.cameraAngle = degToRad(payload.cameraAngle)
		scene.update({...context, filters})
	}

	function updateCanvas(payload: PlayerPayload) {
		let event = payload.event
		if (payload.id === 'play') {
			event =
				store.getState('canvas') === CanvasState.playing
					? CanvasEvent.pause
					: CanvasEvent.play
		}
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
		store.update(event)
	}

	function updateFilters(filters: Filters) {
		if (canvas) {
			scene.update({...context, filters})
			play()
		}
	}

	function handleMouseEvent(event: MouseEvent) {
		scene.update({...context, filters})
	}

	onMount(() => {
		init()
	})
</script>

<div class={`l:grid:sketch bp:xs`}>
	<div class="scene">
		<div class={frameClasses}>
			{#if scene?.meta?.input === 'mouse'}
				<canvas
					id={`${id}.canvas`}
					aria-label={title}
					data-test="canvas"
					bind:this={canvas}
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
				initial={store.getPlayButtonState()}
				{color}
				size="xs"
				{variant}
				disabled={Boolean(feedback)}
			/>
			{#if meta && store.getState('sketch') === 'active' && store.getIsInteractive()}
				{#if meta.type === 'matrix-2d'}
					<Geometry2D
						id={`${id}-context-2d`}
						onupdate={updateGeometry}
						threshold={breakpoint}
						{context}
						canvasWidth={canvas.getBoundingClientRect().width}
						canvasHeight={canvas.getBoundingClientRect().height}
						disabled={store.getSketchDisabled()}
					/>
				{:else}
					<div
						class={`l:${layout}:${size} th:${threshold} maki:block lg context bg:${background}`}
					>
						{#if meta.camera}
							<CameraControls
								id={`${id}-camera-controls`}
								onupdate={updateCamera}
							/>
						{:else if meta.type === 'matrix-3d'}
							<GeometryControls
								id={`${id}-geometry-controls`}
								{canvas}
								onupdate={updateGeometry}
								{context}
							/>
						{:else if meta.type === 'texture'}
							<TextureControls
								id={`${id}-texture-controls`}
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
		<Debug {meta} context={store} />
	{/if}
</div>

<style lang="scss">
	@import '../../styles/scss/grid-sketch.scss';
	@import '../../styles/css/grid-sketch.css';
	@import '../../styles/css/sketch.css';
</style>
