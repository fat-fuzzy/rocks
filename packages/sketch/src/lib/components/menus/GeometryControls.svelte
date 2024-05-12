<script lang="ts">
	import type {SceneContext, GeometryProps} from '$types'
	import Geometry3D from '$lib/components/geometry/Geometry3D.svelte'
	import FieldOfView from '$lib/components/camera/FieldOfView.svelte'

	import store from '$lib/components/sketch/store.svelte'

	type Props = {
		id: string
		color?: string
		size?: string
		layout?: string
		breakpoint?: string
		threshold?: string
		canvas: $bindable<HTMLCanvasElement>
		onupdate: (payload: {geometry: GeometryProps}) => void
		context: GeometryProps
	}

	let {id, color, breakpoint, threshold, context, canvas, onupdate}: Props =
		$props()

	let width = $state(canvas?.getBoundingClientRect().width)
	let height = $state(canvas?.getBoundingClientRect().width)

	let geometry: SceneContext = $state(context)
	let fieldOfView = $state(60)
	let payload: SceneContext = $derived({
		fieldOfView,
		geometry,
	})

	function updateGeometry(payload: {geometry: GeometryProps}) {
		geometry = payload.geometry
		onupdate(payload)
	}

	function updateFieldOfView(event: CustomEvent) {
		fieldOfView = event.detail.value
		onupdate(payload)
	}
</script>

<FieldOfView
	id={`${id}-fieldOfView`}
	bind:fieldOfView
	max={180}
	on:input={updateFieldOfView}
	{color}
	size={`xs l:burrito:${threshold}`}
	disabled={store.getSketchDisabled()}
/>
<Geometry3D
	id={`${id}-context-3d`}
	onupdate={updateGeometry}
	threshold={breakpoint}
	{context}
	canvasWidth={width}
	canvasHeight={height}
	disabled={store.getSketchDisabled()}
/>
