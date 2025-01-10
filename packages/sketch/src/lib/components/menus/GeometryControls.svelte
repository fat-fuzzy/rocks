<script lang="ts">
	import type {
		GeometryContext,
		SceneContext,
		GeometryControlsProps,
	} from '$types'
	import Geometry3D from '$lib/components/geometry/Geometry3D.svelte'
	import FieldOfView from '$lib/components/camera/FieldOfView.svelte'

	import actor from '$lib/components/sketch/actor.svelte'

	let {
		id,
		color = 'neutral',
		breakpoint,
		threshold,
		context,
		canvas,
		onupdate,
	}: GeometryControlsProps = $props()

	let geometry: GeometryContext | undefined = $state(context.geometry)
	let fieldOfView = $state(60)
	let updated: SceneContext = $derived({
		camera: {
			fieldOfView,
		},
		geometry,
	})

	function updateGeometry(payload: SceneContext) {
		geometry = payload.geometry
		onupdate(updated)
	}

	function updateFieldOfView(payload: {value: number}) {
		fieldOfView = payload.value
		onupdate(updated)
	}
</script>

<FieldOfView
	id={`${id}-fieldOfView`}
	{fieldOfView}
	max={180}
	onupdate={updateFieldOfView}
	{color}
	size="xs"
	disabled={actor.getSketchDisabled()}
/>

{#if geometry}
	<Geometry3D
		id={`${id}-context-3d`}
		onupdate={updateGeometry}
		threshold={breakpoint}
		context={geometry}
		canvasWidth={canvas.getBoundingClientRect().width}
		canvasHeight={canvas.getBoundingClientRect().height}
		disabled={actor.getSketchDisabled()}
	/>
{/if}
