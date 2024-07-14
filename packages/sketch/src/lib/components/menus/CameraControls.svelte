<script lang="ts">
	import type {SceneContext} from '$types'
	import FieldOfView from '$lib/components/camera/FieldOfView.svelte'
	import Camera from '$lib/components/camera/Camera.svelte'
	import store from '$lib/components/sketch/store.svelte'

	type Props = {
		id: string
		color?: string
		size?: string
		background?: string
		layout?: string
		breakpoint?: string
		threshold?: string
		onupdate: (payload: {fieldOfView: number; cameraAngle: number}) => void // TODO: Fix type
	}

	let {id = 'sketch', color = 'neutral', threshold, onupdate}: Props = $props()

	let fieldOfView = $state(60)
	let cameraAngle = $state(60)
	let updated: SceneContext = $derived({
		fieldOfView,
		cameraAngle,
	})

	function updateFieldOfView(payload: {value: number}) {
		fieldOfView = payload.value
		onupdate(updated)
	}

	function updateCamera(payload: {value: number}) {
		cameraAngle = payload.value
		onupdate(updated)
	}
</script>

<Camera
	id={`${id}-camera-3d`}
	angle={cameraAngle}
	onupdate={updateCamera}
	{color}
	size={`xs l:burrito:${threshold}`}
	disabled={store.getSketchDisabled()}
/>

<FieldOfView
	id={`${id}-fieldOfView`}
	{fieldOfView}
	max={180}
	onupdate={updateFieldOfView}
	{color}
	size={`xs l:burrito:${threshold}`}
	disabled={store.getSketchDisabled()}
/>
