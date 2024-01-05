<script lang="ts">
	import type {Geometry3dProps, SceneMeta} from '$types'

	import {createEventDispatcher, onMount} from 'svelte'
	import {enhance} from '$app/forms'

	import Position from '$lib/components/graphics/Position.svelte'
	import Scale from '$lib/components/graphics/Scale.svelte'
	import Rotation from '$lib/components/graphics/Rotation.svelte'
	import FieldOfView from '$lib/components/graphics/FieldOfView.svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	export let id = 'geometry'
	export let method = 'POST'
	export let canvasWidth: number
	export let canvasHeight: number
	export let geometry: Geometry3dProps
	export let color = ''
	export let size = ''
	export let background = ''
	export let layout = ''
	export let threshold = ''
	export let formaction = 'updateGeometry'
	export let actionPath: string | undefined = undefined
	export let redirect: string | undefined = undefined
	export let disabled: boolean
	export let meta: SceneMeta | undefined

	const dispatch = createEventDispatcher()

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	let update = () =>
		dispatch('update', {
			value,
		})

	let {width, height, depth, scale, translation, rotation, fieldOfView} = geometry

	// input attributes
	let maxZ = 1
	let minZ = -1000
	// Position
	let [coordX, coordY, coordZ] = [canvasWidth / 2, canvasHeight / 2, meta?.depth ?? undefined]

	// Scale
	let [scaleX, scaleY, scaleZ] = scale

	// Rotation
	let [angleX, angleY, angleZ] = rotation

	$: maxX = canvasWidth
	$: maxY = canvasHeight
	$: translation = [coordX, coordY, coordZ]
	$: scale = [scaleX, scaleY, scaleZ]
	$: rotation = [degToRad(angleX), degToRad(angleY), degToRad(angleZ)]
	$: value = {
		color: geometry.color,
		translation,
		rotation,
		scale,
		width,
		height,
		depth,
		fieldOfView,
	}
	$: action = formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction
	$: backgroundClass = background ? `bg:${background}` : ''
	onMount(() => {
		update()
	})
</script>

<form
	class={`l:${layout}:${size} th:${threshold} maki:block lg geometry ${backgroundClass}`}
	name="geometry-update"
	{method}
	action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({update}) => {
			update({reset: false})
		}
	}}
>
	<FieldOfView
		id={`${id}-fieldOfView`}
		bind:fieldOfView
		max={180}
		on:input={update}
		{color}
		size={`xs l:burrito:${threshold}`}
		{disabled}
	/>
	<Position
		id={`${id}-position`}
		bind:coordX
		bind:coordY
		bind:coordZ
		bind:maxX
		bind:maxY
		bind:maxZ
		bind:minZ
		on:input={update}
		color={'primary'}
		size={`xs l:burrito:${threshold}`}
		{disabled}
	/>
	<Rotation
		id={`${id}-rotation-x`}
		label="Angle x"
		bind:angle={angleX}
		max={360}
		on:input={update}
		color={'accent'}
		size={`xs l:burrito:${threshold}`}
		{disabled}
	/>
	<Rotation
		id={`${id}-rotation-y`}
		label="Angle y"
		bind:angle={angleY}
		max={360}
		on:input={update}
		color={'accent'}
		size={`xs l:burrito:${threshold}`}
		{disabled}
	/>
	<Rotation
		id={`${id}-rotation-z`}
		label="Angle z"
		bind:angle={angleZ}
		max={360}
		on:input={update}
		color={'accent'}
		size={`xs l:burrito:${threshold}`}
		{disabled}
	/>
	<Scale
		id={`${id}-scale`}
		bind:scaleX
		bind:scaleY
		bind:scaleZ
		maxX={5}
		maxY={5}
		maxZ={meta?.depth ? 5 : undefined}
		minX={meta?.minScaleX ?? -5}
		minY={meta?.minScaleY ?? -5}
		minZ={meta?.depth ? meta?.minScaleZ ?? -5 : undefined}
		on:input={update}
		color={'highlight'}
		size={`xs l:burrito:${threshold}`}
		{disabled}
	/>
	{#await Promise.resolve()}
		<div class={`l:frame:twin card:lg`}>
			<Button
				title="Update geometry"
				size="xl"
				color="highlight"
				variant="outline"
				shape="round"
				asset="emoji:nojs"
				{disabled}
			/>
		</div>
	{:then}
		<slot />
	{/await}
</form>
