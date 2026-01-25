<script lang="ts">
	import type {Geometry2DProps} from '$types'

	import Position from '$lib/components/geometry/Position.svelte'
	import Scale from '$lib/components/geometry/Scale.svelte'
	import Rotation from '$lib/components/geometry/Rotation.svelte'
	import ui from '@fat-fuzzy/ui'

	const {Button} = ui.blocks

	let {
		id = 'geometry-2d',
		canvasWidth,
		canvasHeight,
		context,
		background,
		formaction = 'updateGeometry',
		actionPath,
		redirect,
		disabled,
		onupdate,
		children,
	}: Geometry2DProps = $props()

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	let update = () =>
		onupdate({
			geometry: payload,
		})

	let {scale, translation, rotation} = context

	// input attributes
	let angle = $state(0)

	// Dimensions
	let maxX = $state(canvasWidth)
	let maxY = $state(canvasHeight)
	// Position
	let coordX = $state(translation[0] ?? 0)
	let coordY = $state(translation[1] ?? 0)
	// Scale
	let scaleX = $state(scale[0] ?? 1)
	let scaleY = $state(scale[1] ?? 1)

	let payload = $derived({
		color: context.color,
		translation: [coordX, coordY],
		rotation: [degToRad(angle)],
		scale: [scaleX, scaleY],
	})

	let action =
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction
	let backgroundClass = background ? `bg:${background}` : ''
</script>

<form
	class={`l:grid:auto size:xs maki:block geometry raviolink ${backgroundClass}`}
	name="geometry-update"
	action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
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
		<div class={`l:frame:twin ravioli:lg`}>
			<Button
				id="update-geometry"
				name="update-geometry"
				size="xl"
				color="highlight"
				variant="outline"
				shape="round"
				asset="nojs"
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

<style nonce="%sveltekit.nonce%">
	@import '../../styles/css/geometry.css';
</style>
