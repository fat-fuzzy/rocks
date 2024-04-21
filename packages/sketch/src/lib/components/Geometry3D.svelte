<script lang="ts">
	import type {GeometryProps} from '$types'

	import {createEventDispatcher, onMount} from 'svelte'

	import Position from '$lib/components/Position.svelte'
	import Scale from '$lib/components/Scale.svelte'
	import Rotation from '$lib/components/Rotation.svelte'
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {Button} = blocks

	export let id = 'geometry-3d'
	export let canvasWidth: number
	export let canvasHeight: number
	export let geometry: GeometryProps
	export let threshold = ''
	export let disabled: boolean

	const dispatch = createEventDispatcher()

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	let update = () =>
		dispatch('update', {
			value,
		})

	let {scale, translation} = geometry

	// input attributes
	let maxZ = 1
	let minZ = -1000

	// Position
	let [coordX, coordY, coordZ] = translation

	// Scale
	let [scaleX, scaleY, scaleZ] = scale

	// Rotation
	let [angleX, angleY, angleZ] = [190, 40, 30] // TODO: fix this

	$: maxX = canvasWidth
	$: maxY = canvasHeight
	$: value = {
		...geometry,
		rotation: [degToRad(angleX), degToRad(angleY), degToRad(angleZ)],
		translation: [coordX, coordY, coordZ],
		scale: [scaleX, scaleY, scaleZ],
	}

	onMount(() => {
		value = geometry
		update()
	})
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
