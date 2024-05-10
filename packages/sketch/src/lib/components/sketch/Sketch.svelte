<script lang="ts">
	import type {
		Scene,
		SceneContext,
		SceneMeta,
		Filters,
		PlayerPayload,
		GeometryProps,
	} from '$types'
	import {
		PlayerState,
		PlayerEvent,
		CanvasState,
		SketchEvent,
		ControlsEvent,
	} from '$types'

	import {onDestroy, onMount} from 'svelte'

	import Geometry2D from '$lib/components/geometry/Geometry2D.svelte'
	import Geometry3D from '$lib/components/geometry/Geometry3D.svelte'
	import FieldOfView from '$lib/components/scene/FieldOfView.svelte'
	import Camera from '$lib/components/scene/Camera.svelte'
	import Player from '$lib/components/player/Player.svelte'
	import Debug from '$lib/components/debug/Debug.svelte'
	import {recipes} from '@fat-fuzzy/ui-s5'

	import SketchStore from './store.svelte'

	const {ToggleMenu} = recipes

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

	let sketchStore = new SketchStore()
	let debug = true // TODO : fix this
	const DEFAULT_FILTERS = {
		channels: 'rgba',
		blur: 0,
		effects: ['normal'],
	}
	let feedback = $state([])

	let filters: Filters = $state(DEFAULT_FILTERS)
	let canvas: HTMLCanvasElement | null = $state(null)
	let programInfo = $state({context: {}})
	let context: SceneContext = $state(programInfo?.context)
	let width: number | undefined = $state(undefined)
	let height: number | undefined = $state(undefined)
	let fieldOfView = $state(60)
	let cameraAngle = $state(60)

	let frame: number

	let channelMenuItems = $derived(
		meta?.channels?.map((c) => ({
			id: c,
			name: c,
			text: c,
			value: c,
			initial: c === filters.channels ? 'active' : 'inactive',
		})) || [],
	)

	let blurMenuItems = $derived(
		meta?.blur?.map((b) => ({
			id: b,
			name: b,
			text: `blur ${b}`,
			value: b,
			initial: b === filters.blur ? 'active' : 'inactive',
		})) || [],
	)

	let effectMenuItems = $derived(
		meta?.convolutions?.map((b) => ({
			id: b,
			name: b,
			text: b,
			value: b,
			initial: filters.effects.includes(b) ? 'active' : 'inactive',
		})) || [],
	)

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	let disabled = $derived(sketchStore.getSketchDisabled() ? true : undefined)

	let menuDisabled = $derived(sketchStore.getMenuDisabled() ? true : undefined)

	let isInteractive = $derived(
		context !== undefined && sketchStore.getIsInteractive(),
	)

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
		if (canvas) {
			if (scene.init) {
				programInfo.context = scene.init(canvas)
			} else {
				programInfo = scene.main(canvas, context)
			}
			sketchStore.update(SketchEvent.loadOk)
			try {
				scene.main(canvas, {filters})
				if (sketchStore.getPlayerState() === PlayerState.stopped || !context) {
					context = programInfo.context
				}
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
		sketchStore.update(PlayerEvent.play)
	}

	function clear() {
		const prevCanvasState = sketchStore.getCanvasState()
		sketchStore.update(PlayerEvent.clear)
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
		sketchStore.update(PlayerEvent.stop)
		if (sketchStore.getCanvasState() === CanvasState.idle) {
			init()
		}
	}

	function pause() {
		sketchStore.canvas = CanvasState.paused
		cancelAnimationFrame(frame)
		sketchStore.update(PlayerEvent.pause)
	}

	function updateGeometry(payload: {value: GeometryProps}) {
		context = payload.value
		scene.update(context, {filters})
		sketchStore.update(ControlsEvent.update)
	}

	function updateFieldOfView(event: CustomEvent) {
		context.fieldOfView = degToRad(event.detail.value)
	}

	function updateCamera(event: CustomEvent) {
		context.cameraAngle = degToRad(event.detail.value)
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

	function updateChannel(selected: {name: string; pressed: boolean}) {
		if (selected.pressed) {
			filters.channels = selected.name
		} else {
			filters.channels = 'rgba'
		}
		if (canvas) {
			scene.update(canvas, {...context, filters})
			play()
		}
	}

	function updateBlur(selected: {
		value: number
		name: string
		pressed: boolean
	}) {
		if (selected.pressed) {
			filters.blur = selected.value
		} else {
			filters.blur = 0
		}
		if (canvas) {
			scene.update(canvas, {...context, filters})
			play()
		}
	}

	function updateEffects(selected: {name: string; pressed: boolean}) {
		if (!selected.pressed) {
			filters.effects = filters.effects.filter(
				(filter: string) => filter !== selected.name,
			)
		} else if (!filters.effects.includes(selected.name)) {
			filters.effects.push(selected.name)
		}
		if (filters.effects.length === 0) {
			filters.effects = ['normal']
		}
		if (canvas) {
			scene.update(canvas, {...context, filters})
			play()
		}
	}

	function handleMouseEvent(event: MouseEvent) {
		scene.update(context, {...context, filters}, event)
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
				{sketchStore}
			/>
			{#if isInteractive}
				{#if meta?.type === 'matrix-2d'}
					<Geometry2D
						id={`${id}-context-2d`}
						onupdate={updateGeometry}
						threshold={breakpoint}
						geometry={context}
						canvasWidth={canvas.getBoundingClientRect().width}
						canvasHeight={canvas.getBoundingClientRect().height}
						{disabled}
					/>
				{:else}
					<div
						class={`l:${layout}:${size} th:${threshold} maki:block lg context bg:${background}`}
					>
						{#if meta?.camera}
							<Camera
								id={`${id}-camera-3d`}
								bind:angle={cameraAngle}
								on:input={updateCamera}
								{color}
								size={`xs l:burrito:${threshold}`}
								{disabled}
							/>
							<FieldOfView
								id={`${id}-fieldOfView`}
								bind:fieldOfView
								max={180}
								on:input={updateFieldOfView}
								{color}
								size={`xs l:burrito:${threshold}`}
								{disabled}
							/>
						{:else if meta?.type === 'matrix-3d'}
							<FieldOfView
								id={`${id}-fieldOfView`}
								bind:fieldOfView
								max={180}
								on:input={updateFieldOfView}
								{color}
								size={`xs l:burrito:${threshold}`}
								{disabled}
							/>
							<Geometry3D
								id={`${id}-context-3d`}
								onupdate={updateGeometry}
								threshold={breakpoint}
								geometry={context}
								canvasWidth={canvas.getBoundingClientRect().width}
								canvasHeight={canvas.getBoundingClientRect().height}
								{disabled}
							/>
						{:else if meta?.type === 'texture'}
							{#if meta?.channels}
								<ToggleMenu
									id="channels"
									size="xs"
									mode="radio"
									layout="switcher"
									color="primary"
									variant="bare"
									items={channelMenuItems}
									onupdate={updateChannel}
									disabled={menuDisabled}
								/>
							{/if}
							{#if meta?.blur}
								<ToggleMenu
									id="blur"
									size="xs"
									mode="radio"
									layout="switcher"
									color="accent"
									variant="bare"
									items={blurMenuItems}
									onupdate={updateBlur}
									disabled={menuDisabled}
								/>
							{/if}
							{#if meta?.convolutions}
								<ToggleMenu
									id="convolutions"
									size="xs"
									mode="multiple"
									layout="switcher"
									color="accent"
									variant="bare"
									items={effectMenuItems}
									onupdate={updateEffects}
									disabled={menuDisabled}
								/>
							{/if}
						{/if}
					</div>
				{/if}
			{/if}
		{/if}
	</aside>
	{#if debug}
		<Debug {meta} {sketchStore} />
	{/if}
</div>

<style lang="scss">
	@import '../../styles/scss/grid-sketch.scss';
	@import '../../styles/css/grid-sketch.css';
	@import '../../styles/css/sketch.css';
</style>
