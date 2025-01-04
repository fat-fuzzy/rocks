<script lang="ts">
	import type {SceneContext, CameraControlsProps} from '$types'
	import FieldOfView from '$lib/components/camera/FieldOfView.svelte'
	import Camera from '$lib/components/camera/Camera.svelte'
	import actor from '$lib/components/sketch/actor.svelte'

	let {
		id = 'sketch',
		color = 'neutral',
		onupdate,
	}: CameraControlsProps = $props()

	let fieldOfView = $state(60)
	let cameraAngle = $state(60)
	let updated: SceneContext = $derived({
		camera: {
			fieldOfView,
			cameraAngle,
		},
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
	size="xs"
	disabled={actor.getSketchDisabled()}
/>

<FieldOfView
	id={`${id}-fieldOfView`}
	{fieldOfView}
	max={180}
	onupdate={updateFieldOfView}
	{color}
	size="xs"
	disabled={actor.getSketchDisabled()}
/>
