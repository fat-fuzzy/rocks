<script lang="ts">
	import type {Geometry3dProps} from '$types'

	import {createEventDispatcher, onMount} from 'svelte'

	import Position from '$lib/components/graphics/Position.svelte'
	import Scale from '$lib/components/graphics/Scale.svelte'
	import Rotation from '$lib/components/graphics/Rotation.svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	export let id = 'geometry'
	export let canvasWidth: number
	export let canvasHeight: number
	export let geometry: Geometry3dProps
	export let threshold = ''
	export let disabled: boolean

	const dispatch = createEventDispatcher()

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	function radToDeg(rads: number) {
		return (rads * Math.PI) / 180
	}

	let update = () =>
		dispatch('update', {
			value,
		})

	let {scale, translation, rotation} = geometry

	// input attributes
	let maxZ = 1
	let minZ = -1000
	// Position
	let [coordX, coordY, coordZ] = translation ?? []

	// Scale
	let [scaleX, scaleY, scaleZ] = scale ?? []

	// Rotation
	let [angleX, angleY, angleZ] = (rotation ?? []).map((a) => radToDeg(a))

	onMount(() => {
		update()
	})

	$: maxX = canvasWidth
	$: maxY = canvasHeight
	$: value = {
		...geometry,
		translation: translation ? [coordX, coordY, coordZ] : undefined,
		rotation: rotation ? [degToRad(angleX), degToRad(angleY), degToRad(angleZ)] : undefined,
		scale: scale ? [scaleX, scaleY, scaleZ] : undefined,
	}
</script>

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
	maxZ={5}
	minX={-5}
	minY={-5}
	minZ={-5}
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
