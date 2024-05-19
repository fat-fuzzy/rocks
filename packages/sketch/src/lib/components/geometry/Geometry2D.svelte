<script lang="ts">
	import {onMount, type Snippet} from 'svelte'
	import {enhance} from '$app/forms'
	import type {GeometryContext} from '$types/index.js'

	import Position from '$lib/components/geometry/Position.svelte'
	import Scale from '$lib/components/geometry/Scale.svelte'
	import Rotation from '$lib/components/geometry/Rotation.svelte'
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {Button} = blocks

	type Props = {
		id?: string
		canvasWidth: number
		canvasHeight: number
		context: GeometryContext
		background?: string
		method?: string
		formaction?: string
		actionPath?: string
		redirect?: string
		size?: string
		layout?: string
		threshold?: string
		disabled?: boolean
		onupdate: (payload: {geometry: GeometryContext}) => void,
		children?: Snippet
	}

	let {
		id = 'geometry-2d',
		canvasWidth,
		canvasHeight,
		context,
		background,
		method = 'POST',
		formaction = 'updateGeometry',
		actionPath,
		redirect,
		size = 'xs',
		layout = 'stack',
		threshold,
		disabled,
		onupdate,
		children
	}: Props = $props()

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	let update = () =>
		onupdate({
			geometry: payload,
		})

	let geometry = $state(context)
	let {scale, translation, rotation} = $derived(geometry)

	// input attributes
	let angle = $state(0)

	// Position
	let maxX = $state(canvasWidth)
	let maxY = $state(canvasHeight)
	let [coordX, coordY] = $state(translation ?? [0, 0])

	// Scale
	let [scaleX, scaleY] = $state(scale ?? [1, 1])

	let payload = $derived({
		color: context.color,
		translation: [coordX, coordY],
		rotation: [degToRad(angle)],
		scale: [scaleX, scaleY],
	})

	let action =
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction
	let backgroundClass = background ? `bg:${background}` : ''

	onMount(() => {
		update()
	})
</script>

<form
	class={`l:${layout}:${size} th:${threshold} maki:block geometry ${backgroundClass}`}
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
	<Position
		id={`${id}-position`}
		bind:coordX
		bind:coordY
		bind:maxX
		bind:maxY
		onupdate={update}
		color="primary"
		size="xs"
		{disabled}
	/>
	<Rotation
		id={`${id}-rotation`}
		bind:angle
		max={360}
		onupdate={update}
		color="accent"
		size="xs"
		{disabled}
	/>
	<Scale
		id={`${id}-scale`}
		bind:scaleX
		bind:scaleY
		maxX={5}
		maxY={5}
		minX={-5}
		minY={-5}
		onupdate={update}
		color="highlight"
		size="xs"
		{disabled}
	/>
	{#await Promise.resolve()}
		<!-- This will display if no JS is present -->>
		<div class={`l:frame:twin card:lg`}>
			<Button
				id="update-geometry"
				name="update-geometry"
				size="xl"
				color="highlight"
				variant="outline"
				shape="round"
				asset="emoji:nojs"
				{disabled}
			>
				Update geometry
			</Button>
		</div>
	{:then}
		{#if children}
			{@render children()}
		{/if}
	{/await}
</form>

<style>
	@import '../../styles/css/geometry.css';
</style>
