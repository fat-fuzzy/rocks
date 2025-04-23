<script lang="ts">
	import type {SketchProps, SceneContext, Filters} from '$types'

	import {onDestroy, onMount} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'

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
	const {PageRails} = ui.content

	let {
		scene,
		meta,
		layer = '0', // if 'layer' the canvas will appear on a layer (with drop shadow)
		color,
		size,
		variant = 'outline',
		background,
		layout = 'switcher',
		breakpoint,
		dev,
		mainFooter,
		context,
	}: SketchProps = $props()

	let id = $derived(meta?.id ? `sketch-${meta.id}` : 'sketch')
	let debug = dev
	let filters: Filters = $state(DEFAULT_FILTERS)
	let canvas: HTMLCanvasElement | null = $state(null)
	let sceneContext: SceneContext = $state({})
	let title = meta.title
	let asset = meta.asset
	let dimensions = meta.dimensions || 'video'

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
		? `l:frame:${dimensions} scene bg:${background}`
		: `l:frame:${dimensions} scene`

	let frameClasses = $derived(
		`canvas ${backgroundClass} ${layer} ${currentState} ${currentAsset}`,
	)

	async function init() {
		actor.update(SketchEvent.load)
		if (canvas) {
			try {
				sceneContext = await scene.main(canvas)
				scene.update({...sceneContext, texture: {filters}})
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

	async function play() {
		if (actor.state.canvas === CanvasState.idle) {
			await init()
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

	async function clear() {
		const prevCanvasState = actor.state.canvas
		reset()
		await init()
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
		sceneContext.geometry = payload.geometry
		if (sceneContext.camera && payload.camera) {
			sceneContext.camera.fieldOfView = degToRad(
				payload.camera.fieldOfView ?? 60,
			)
		}
		scene.update({...sceneContext, texture: {filters}})
		actor.update(ControlsEvent.update)
	}

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	function updateCamera(payload: SceneContext) {
		if (sceneContext.camera && payload.camera) {
			sceneContext.camera.fieldOfView = degToRad(
				payload.camera.fieldOfView ?? 60,
			)
			sceneContext.camera.cameraAngle = degToRad(
				payload.camera.cameraAngle ?? 0,
			)
		}
		sceneContext.texture = {filters}
		scene.update(sceneContext)
		actor.update(ControlsEvent.update)
	}

	async function updateCanvas(payload: {
		event: SketchEvent | ControlsEvent | PlayerEvent | CanvasEvent
	}) {
		switch (payload.event) {
			case 'play':
				await play()
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
			sceneContext.texture = {filters}
			scene.update(sceneContext)
			if (meta.controls.includes('texture')) {
				render()
			}
			actor.update(ControlsEvent.update)
		} catch (e: unknown) {
			actor.feedback.canvas.push({status: 'error', message: e as string})
			actor.update(CanvasEvent.error)
		}
	}

	onMount(async () => {
		try {
			await init()
		} catch (e: unknown) {
			actor.feedback.sketch.push({status: 'error', message: e as string})
			actor.update(SketchEvent.loadNok)
		}
	})

	onDestroy(() => {
		try {
			if (scene) stop()
		} catch (e: unknown) {
			actor.feedback.sketch.push({status: 'error', message: e as string})
			actor.update(SketchEvent.exitNok)
		}
	})
</script>

<PageRails
	pageName={meta.categories[0]}
	{title}
	description={meta.description}
	path={page.url.pathname}
	nav={page.data.pageNav}
	{context}
	{dimensions}
	layout="steam"
>
	{#snippet main()}
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
	{/snippet}

	{#snippet aside()}
		<div class="maki:block w:full">
			{#if canvas}
				<Player
					play={updateCanvas}
					pause={updateCanvas}
					clear={updateCanvas}
					stop={updateCanvas}
					initial={actor.getPlayButtonState()}
					{color}
					size="2xs"
					{variant}
					disabled={actor.hasError() ?? undefined}
					{init}
				/>
				{#if meta && actor.getState('sketch') === 'active' && actor.getIsInteractive()}
					{#if sceneContext.geometry && meta.controls.includes('matrix-2d')}
						<Geometry2D
							id={`${id}-context-2d`}
							onupdate={updateGeometry}
							threshold="2xs"
							context={sceneContext.geometry}
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
							{#if sceneContext.geometry && meta.controls.includes('matrix-3d')}
								<GeometryControls
									id={`${id}-geometry-controls`}
									{canvas}
									onupdate={updateGeometry}
									context={sceneContext}
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
		</div>
	{/snippet}

	{#snippet footer()}
		{#if debug}
			<Debug {meta} context={actor} />
		{/if}
		{#if mainFooter}
			{@render mainFooter()}
		{/if}
	{/snippet}
</PageRails>

<!-- <article class="l:grid:sketch bp:xs size:sm media"></article> -->

<style lang="scss">
	@forward '../../styles/css/sketch.css';
</style>
