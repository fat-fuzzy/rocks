<script lang="ts">
	import type {GeometryProps, SceneMeta} from '$types'

	import {createEventDispatcher, onMount} from 'svelte'
	import {enhance} from '$app/forms'

	import Position from '$lib/components/graphics/Position.svelte'
	import Scale from '$lib/components/graphics/Scale.svelte'
	import Rotation from '$lib/components/graphics/Rotation.svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	export let id = 'geometry'
	export let method = 'POST'
	export let canvasWidth: number
	export let canvasHeight: number
	export let geometry: GeometryProps
	export let color = ''
	export let background = ''
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

	let {width, height, scale, translation, rotation} = geometry

	// input attributes
	let angle = 0

	// Position
	let [coordX, coordY] = [canvasWidth / 2, canvasHeight / 2]

	// Rotation

	// Scale
	let [scaleX, scaleY] = scale

	$: maxX = canvasWidth
	$: maxY = canvasHeight
	$: translation = [coordX, coordY]
	$: rotatedAngle = degToRad(angle)
	$: scale = [scaleX, scaleY]
	$: value = {
		color: geometry.color,
		translation,
		rotation: rotatedAngle,
		scale,
		width,
		height,
	}
	$: action = formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction
	$: backgroundClass = background ? `bg:${background}` : ''
	onMount(() => {
		update()
	})
</script>

<form
	class={`l:switcher:${threshold} maki:block lg geometry ${backgroundClass}`}
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
	<Rotation
		id={`${id}-rotation`}
		bind:angle
		max={360}
		on:input={update}
		{color}
		size={`xs l:burrito:${threshold} maki:inline`}
		{disabled}
	/>
	<Position
		id={`${id}-position`}
		bind:coordX
		bind:coordY
		bind:maxX
		bind:maxY
		on:input={update}
		{color}
		size={`xs l:burrito:${threshold} maki:inline`}
		{disabled}
	/>
	<Scale
		id={`${id}-scale`}
		bind:scaleX
		bind:scaleY
		maxX={5}
		maxY={5}
		minX={meta?.minScaleX ?? -5}
		minY={meta?.minScaleY ?? -5}
		on:input={update}
		{color}
		size={`xs l:burrito:${threshold} maki:inline`}
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
