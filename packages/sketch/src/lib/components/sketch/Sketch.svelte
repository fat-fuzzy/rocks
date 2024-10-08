<script lang="ts">
	import {onDestroy, onMount} from 'svelte'
	import type {
		Scene,
		SceneContext,
		SceneMeta,
		Filters,
		CameraContext,
		GeometryContext,
	} from '$types/index.js'
	import {
		CanvasState,
		SketchEvent,
		ControlsEvent,
		CanvasEvent,
	} from '$types/index.js'
	import {PlayerEvent} from '$lib/components/player/types.js'

	import Geometry2D from '$lib/components/geometry/Geometry2D.svelte'
	import Player from '$lib/components/player/Player.svelte'
	import TextureControls from '$lib/components/menus/TextureControls.svelte'
	import CameraControls from '$lib/components/menus/CameraControls.svelte'
	import GeometryControls from '$lib/components/menus/GeometryControls.svelte'
	import Debug from '$lib/components/debug/Debug.svelte'

	import store from './store.svelte'
	import {DEFAULT_FILTERS} from './types.js'

	type Props = {
		scene: Scene
		title: string
		asset: string
		dimensions: string
		layer?: string // if 'layer' the canvas will appear on a layer (with drop shadow)
		color?: string
		size?: string
		variant?: string
		background?: string
		layout?: string
		breakpoint?: string
		dev?: boolean
	}

	let {
		scene,
		layer = '0', // if 'layer' the canvas will appear on a layer (with drop shadow)
		color,
		size,
		variant = 'outline',
		background,
		layout = 'switcher',
		breakpoint,
		dev,
	}: Props = $props()

	let id = $derived(scene.meta?.id ? `sketch-${scene.meta.id}` : 'sketch')
	let debug = dev
	let filters: Filters = $state(DEFAULT_FILTERS)
	let canvas: HTMLCanvasElement | null = $state(null)
	let context: SceneContext = $state({})
	let meta: SceneMeta = $state({controls: []})
	let title = scene.meta.title
	let asset = scene.meta.asset
	let dimensions = scene.meta.dimensions || 'video'

	let frame: number
	let time: number
	let resetEvent = $state(0)

	let currentAsset = $derived(
		store.state.canvas === CanvasState.idle && asset
			? `emoji:${asset}`
			: `emoji:${store.events.current}`,
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
				context = scene.main(canvas)
				meta = scene.meta as SceneMeta
				scene.update({...context, filters})
				store.update(SketchEvent.loadOk)
			} catch (e: unknown) {
				store.update(SketchEvent.loadNok)
				store.feedback.canvas.push({status: 'error', message: e as string})
			}
		}
	}

	function loop(time: number) {
		scene.draw(time)
		frame = requestAnimationFrame((time) => {
			loop(time)
		})
	}

	function render() {
		time = Date.now()
		if (meta.controls.includes('loop')) {
			loop(time)
		} else {
			frame = requestAnimationFrame((time) => {
				scene.draw(time)
			})
		}
	}

	function play() {
		if (store.state.canvas === CanvasState.idle) {
			init()
		}
		render()
		store.update(PlayerEvent.play)
	}

	function reset() {
		pause()
		store.feedback.canvas = []
		let random = Math.random()
		resetEvent = random !== resetEvent ? random : random - 1
		store.updateFilters(DEFAULT_FILTERS, ControlsEvent.update)
	}

	function clear() {
		const prevCanvasState = store.state.canvas
		reset()
		init()
		render()
		if (prevCanvasState === CanvasState.paused) {
			pause()
		} else {
			store.update(PlayerEvent.play)
		}
		store.update(PlayerEvent.clear)
	}

	function stop() {
		scene.stop()
		reset()
		store.update(PlayerEvent.stop)
	}

	function pause() {
		//TODO: pause scene with time elapsed
		if (frame) {
			cancelAnimationFrame(frame)
		}
		store.update(PlayerEvent.pause)
	}

	function updateGeometry(payload: {
		fieldOfView?: number
		geometry: GeometryContext
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
		;(context as CameraContext).fieldOfView = degToRad(payload.fieldOfView)
		;(context as CameraContext).cameraAngle = degToRad(payload.cameraAngle)
		scene.update({...context, filters})
		store.update(ControlsEvent.update)
	}

	function updateCanvas(payload: {
		event: SketchEvent | ControlsEvent | PlayerEvent | CanvasEvent
	}) {
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
	}

	function updateFilters(filters: Filters) {
		try {
			scene.update({...context, filters})
			if (meta.controls.includes('texture')) {
				render()
			}
			store.update(ControlsEvent.update)
		} catch (e: unknown) {
			store.feedback.canvas.push({status: 'error', message: e as string})
			store.update(CanvasEvent.error)
		}
	}

	function loadFilters(filters: Filters) {
		try {
			scene.update({...context, filters})
			if (meta.controls.includes('texture')) {
				render()
			}
		} catch (e: unknown) {
			store.feedback.canvas.push({status: 'error', message: e as string})
			store.update(CanvasEvent.loadNok)
		}
	}

	onMount(() => {
		try {
			init()
		} catch (e: unknown) {
			store.feedback.sketch.push({status: 'error', message: e as string})
			store.update(SketchEvent.loadNok)
		}
	})

	onDestroy(() => {
		try {
			stop()
		} catch (e: unknown) {
			store.feedback.sketch.push({status: 'error', message: e as string})
			store.update(SketchEvent.loadNok) // TODO: fix this
		}
	})
</script>

<div class={`l:grid:sketch bp:xs size:sm`}>
	<div class="scene">
		<div class={frameClasses}>
			<canvas
				id={`${id}.canvas`}
				aria-label={title}
				data-test="canvas"
				bind:this={canvas}
				inert={store.getSketchDisabled()}
			>
				<p class={`feedback emoji:default ${size} content`}>
					The canvas element needs JavaScript enabled to display and interact
					with animations
				</p>
			</canvas>
			{#if store.feedback.canvas.length}
				{#each store.feedback.canvas as feedback}
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
				disabled={store.hasError() ?? undefined}
				{init}
			/>
			{#if meta && store.getState('sketch') === 'active' && store.getIsInteractive()}
				{#if meta.controls.includes('matrix-2d')}
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
					<div class={`l:${layout}:${size} maki:block`}>
						{#if meta.controls.includes('camera')}
							<CameraControls
								id={`${id}-camera-controls`}
								onupdate={updateCamera}
							/>
						{:else if meta.controls.includes('matrix-3d')}
							<GeometryControls
								id={`${id}-geometry-controls`}
								{canvas}
								onupdate={updateGeometry}
								{context}
							/>
						{:else if meta.controls.includes('texture')}
							{#key resetEvent}
								<TextureControls
									id={`${id}-texture-controls`}
									channels={meta.filters?.channels}
									blur={meta.filters?.blur}
									convolutions={meta.filters?.convolutions}
									onupdate={updateFilters}
									init={loadFilters}
								/>
							{/key}
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
