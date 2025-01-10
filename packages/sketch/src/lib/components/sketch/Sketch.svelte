<script lang="ts">
	import type {SketchProps, SceneContext, SceneMeta, Filters} from '$types'

	import {onDestroy, onMount} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {
		CanvasState,
		SketchEvent,
		ControlsEvent,
		CanvasEvent,
		PlayerEvent,
	} from '$types'

	import Geometry2D from '$lib/components/geometry/Geometry2D.svelte'
	import Player from '$lib/components/player/Player.svelte'
	import TextureControls from '$lib/components/menus/TextureControls.svelte'
	import CameraControls from '$lib/components/menus/CameraControls.svelte'
	import GeometryControls from '$lib/components/menus/GeometryControls.svelte'
	import Debug from '$lib/components/debug/Debug.svelte'

	import {DEFAULT_FILTERS} from './definitions.js'
	import actor from './actor.svelte'

	const {Feedback} = ui.blocks

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
	}: SketchProps = $props()

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
		actor.state.canvas === CanvasState.idle && asset
			? `emoji:${asset}`
			: `emoji:${actor.events.current}`,
	)

	let currentState = $derived(
		actor.state.canvas === CanvasState.loading ||
			actor.state.canvas === CanvasState.idle
			? `state:${actor.state.canvas}`
			: '',
	)

	let backgroundClass = background
		? `l:frame:${dimensions} bg:${background}`
		: `l:frame:${dimensions}`

	let frameClasses = $derived(
		`canvas ${backgroundClass} ${layer} ${currentState} ${currentAsset}`,
	)

	function init() {
		actor.update(SketchEvent.load)
		if (canvas) {
			try {
				context = scene.main(canvas)
				meta = scene.meta as SceneMeta
				scene.update({...context, texture: {filters}})
				actor.update(SketchEvent.loadOk)
			} catch (e: unknown) {
				actor.update(SketchEvent.loadNok)
				actor.feedback.canvas.push({status: 'error', message: e as string})
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
		if (actor.state.canvas === CanvasState.idle) {
			init()
		}
		render()
		actor.update(PlayerEvent.play)
	}

	function reset() {
		pause()
		actor.feedback.canvas = []
		let random = Math.random()
		resetEvent = random !== resetEvent ? random : random - 1
		actor.updateTexture(
			{texture: {filters: DEFAULT_FILTERS}},
			ControlsEvent.update,
		)
	}

	function clear() {
		const prevCanvasState = actor.state.canvas
		reset()
		init()
		render()
		if (prevCanvasState === CanvasState.paused) {
			pause()
		} else {
			actor.update(PlayerEvent.play)
		}
		actor.update(PlayerEvent.clear)
	}

	function stop() {
		scene.stop()
		reset()
		actor.update(PlayerEvent.stop)
	}

	function pause() {
		//TODO: pause scene with time elapsed
		if (frame) {
			cancelAnimationFrame(frame)
		}
		actor.update(PlayerEvent.pause)
	}

	function updateGeometry(payload: SceneContext) {
		context.geometry = payload.geometry
		if (context.camera && payload.camera) {
			context.camera.fieldOfView = degToRad(payload.camera.fieldOfView ?? 60)
		}
		scene.update({...context, texture: {filters}})
		actor.update(ControlsEvent.update)
	}

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	function updateCamera(payload: SceneContext) {
		if (context.camera && payload.camera) {
			context.camera.fieldOfView = degToRad(payload.camera.fieldOfView ?? 60)
			context.camera.cameraAngle = degToRad(payload.camera.cameraAngle ?? 0)
		}
		context.texture = {filters}
		scene.update(context)
		actor.update(ControlsEvent.update)
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

	function updateTexture(filters: Filters) {
		try {
			context.texture = {filters}
			scene.update(context)
			if (meta.controls.includes('texture')) {
				render()
			}
			actor.update(ControlsEvent.update)
		} catch (e: unknown) {
			actor.feedback.canvas.push({status: 'error', message: e as string})
			actor.update(CanvasEvent.error)
		}
	}

	onMount(() => {
		try {
			init()
		} catch (e: unknown) {
			actor.feedback.sketch.push({status: 'error', message: e as string})
			actor.update(SketchEvent.loadNok)
		}
	})

	onDestroy(() => {
		try {
			stop()
		} catch (e: unknown) {
			actor.feedback.sketch.push({status: 'error', message: e as string})
			actor.update(SketchEvent.loadNok) // TODO: fix this
		}
	})
</script>

<article class="l:grid:sketch bp:xs size:sm media">
	<div class="scene">
		<div class={frameClasses}>
			<canvas
				id={`${id}.canvas`}
				aria-label={title}
				data-testid="canvas"
				bind:this={canvas}
				inert={actor.getSketchDisabled()}
			>
				<p class={`feedback emoji:default ${size} content`}>
					The canvas element needs JavaScript enabled to display and interact
					with animations
				</p>
			</canvas>
			{#if actor.feedback.canvas.length}
				<div class="feedback">
					{#each actor.feedback.canvas as feedback}
						<Feedback status={feedback.status} context="code" {size}>
							{feedback.message}
						</Feedback>
					{/each}
				</div>
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
				initial={actor.getPlayButtonState()}
				{color}
				size="xs"
				{variant}
				disabled={actor.hasError() ?? undefined}
				{init}
			/>
			{#if meta && actor.getState('sketch') === 'active' && actor.getIsInteractive()}
				{#if context.geometry && meta.controls.includes('matrix-2d')}
					<Geometry2D
						id={`${id}-context-2d`}
						onupdate={updateGeometry}
						threshold={breakpoint}
						context={context.geometry}
						canvasWidth={canvas.getBoundingClientRect().width}
						canvasHeight={canvas.getBoundingClientRect().height}
						disabled={actor.getSketchDisabled()}
					/>
				{:else}
					<div class={`l:${layout}:${size} maki:block`}>
						{#if meta.controls.includes('camera')}
							<CameraControls
								id={`${id}-camera-controls`}
								onupdate={updateCamera}
							/>
						{/if}
						{#if context.geometry && meta.controls.includes('matrix-3d')}
							<GeometryControls
								id={`${id}-geometry-controls`}
								{canvas}
								onupdate={updateGeometry}
								{context}
							/>
						{/if}
						{#if meta.controls.includes('texture')}
							{#key resetEvent}
								<TextureControls
									id={`${id}-texture-controls`}
									filters={meta.filters ?? DEFAULT_FILTERS}
									onupdate={updateTexture}
								/>
							{/key}
						{/if}
					</div>
				{/if}
			{/if}
		{/if}
	</aside>
	{#if debug}
		<Debug {meta} context={actor} />
	{/if}
</article>

<style lang="scss">
	@forward '../../styles/scss/grid-sketch.scss';
	@forward '../../styles/css/grid-sketch.css';
	@forward '../../styles/css/sketch.css';
</style>
