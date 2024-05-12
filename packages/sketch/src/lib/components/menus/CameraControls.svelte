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
		onupdate: (payload: any) => void // TODO: Fix type
	}

	let {id = 'sketch', color, threshold, onupdate}: Props = $props()

	let fieldOfView = $state(60)
	let cameraAngle = $state(60)
	let payload: SceneContext = $derived({
		fieldOfView,
		cameraAngle,
	})

	function updateFieldOfView(event: CustomEvent) {
		fieldOfView = event.detail.value
		onupdate(payload)
	}

	function updateCamera(event: CustomEvent) {
		cameraAngle = event.detail.value
		onupdate(payload)
	}
</script>

<Camera
	id={`${id}-camera-3d`}
	bind:angle={cameraAngle}
	on:input={updateCamera}
	{color}
	size={`xs l:burrito:${threshold}`}
	disabled={store.getSketchDisabled()}
/>

<FieldOfView
	id={`${id}-fieldOfView`}
	bind:fieldOfView
	max={180}
	on:input={updateFieldOfView}
	{color}
	size={`xs l:burrito:${threshold}`}
	disabled={store.getSketchDisabled()}
/>
