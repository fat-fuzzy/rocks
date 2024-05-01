<script lang="ts">
	import type {GeometryProps} from '$types'

	import Position from '$lib/components/geometry/Position.svelte'
	import Scale from '$lib/components/geometry/Scale.svelte'
	import Rotation from '$lib/components/geometry/Rotation.svelte'
	import {blocks} from '@fat-fuzzy/ui-s5'
	import {onMount} from 'svelte'
	const {Button} = blocks

	type Props = {
		id?: string
		canvasWidth: number
		canvasHeight: number
		geometry: GeometryProps
		disabled?: boolean
		threshold?: string
		onupdate: (payload: {value: GeometryProps}) => void
	}

	let {
		id = 'geometry-3d',
		canvasWidth,
		canvasHeight,
		geometry = $bindable({}),
		threshold,
		disabled,
		onupdate,
	}: Props = $props()

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	let update = () => {
		onupdate({
			value,
		})
	}

	let {scale, translation} = $state(geometry)

	// input attributes
	let maxZ = 1
	let minZ = -1000

	// Position
	let [coordX, coordY, coordZ] = $state(translation)

	// Scale
	let [scaleX, scaleY, scaleZ] = $state(scale)

	// Rotation
	let [angleX, angleY, angleZ] = $state([190, 40, 30]) // TODO: fix this

	let maxX = $state(canvasWidth)
	let maxY = $state(canvasHeight)
	let value = $derived({
		...geometry,
		rotation: [degToRad(angleX), degToRad(angleY), degToRad(angleZ)],
		translation: [coordX, coordY, coordZ],
		scale: [scaleX, scaleY, scaleZ],
	})

	onMount(() => {
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
	onupdate={update}
	color={'primary'}
	size={`xs l:burrito:${threshold}`}
	{disabled}
/>
<Rotation
	id={`${id}-rotation-x`}
	label="Angle x"
	bind:angle={angleX}
	max={360}
	onupdate={update}
	color={'accent'}
	size={`xs l:burrito:${threshold}`}
	{disabled}
/>
<Rotation
	id={`${id}-rotation-y`}
	label="Angle y"
	bind:angle={angleY}
	max={360}
	onupdate={update}
	color={'accent'}
	size={`xs l:burrito:${threshold}`}
	{disabled}
/>
<Rotation
	id={`${id}-rotation-z`}
	label="Angle z"
	bind:angle={angleZ}
	max={360}
	onupdate={update}
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
	onupdate={update}
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

<style>
	@import '../../styles/css/geometry.css';
</style>
