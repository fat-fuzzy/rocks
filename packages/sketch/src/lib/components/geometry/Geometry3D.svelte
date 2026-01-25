<script lang="ts">
	import type {Geometry2DProps} from '$types'

	import Position from '$lib/components/geometry/Position.svelte'
	import Scale from '$lib/components/geometry/Scale.svelte'
	import Rotation from '$lib/components/geometry/Rotation.svelte'
	import ui from '@fat-fuzzy/ui'

	const {Button} = ui.blocks

	let {
		id = 'geometry-3d',
		canvasWidth,
		canvasHeight,
		context,
		formaction = 'updateGeometry',
		actionPath,
		redirect,
		background,
		disabled,
		onupdate,
		children,
	}: Geometry2DProps = $props()

	function degToRad(degrees: number) {
		return degrees * (Math.PI / 180)
	}

	let update = () => {
		onupdate({
			geometry: payload,
		})
	}

	let {scale, translation} = context

	// input attributes
	let maxZ = $state(1)
	let minZ = $state(-1000)

	// Dimensions
	let maxX = $state(canvasWidth)
	let maxY = $state(canvasHeight)
	let minX = $state(-canvasWidth)
	let minY = $state(-canvasHeight)
	// Position
	let coordX = $state(translation[0] ?? 0)
	let coordY = $state(translation[1] ?? 0)
	let coordZ = $state(translation[2] ?? 0)
	// Scale
	let scaleX = $state(scale[0] ?? 1)
	let scaleY = $state(scale[1] ?? 1)
	let scaleZ = $state(scale[2] ?? 1)

	// Rotation
	let angleX = $state(190)
	let angleY = $state(40)
	let angleZ = $state(30)

	let payload = $derived({
		...context,
		rotation: [degToRad(angleX), degToRad(angleY), degToRad(angleZ)],
		translation: [coordX, coordY, coordZ],
		scale: [scaleX, scaleY, scaleZ],
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
		bind:coordZ
		bind:maxX
		bind:minX
		bind:maxY
		bind:minY
		bind:maxZ
		bind:minZ
		onupdate={update}
		color="primary"
		size="xs"
		{disabled}
	/>

	<div class="l:switcher:xs th:2xs">
		<Rotation
			id={`${id}-rotation-x`}
			label="Angle x"
			bind:angle={angleX}
			max={360}
			onupdate={update}
			color="accent"
			size="xs"
			{disabled}
		/>
		<Rotation
			id={`${id}-rotation-y`}
			label="Angle y"
			bind:angle={angleY}
			max={360}
			onupdate={update}
			color="accent"
			size="xs"
			{disabled}
		/>
		<Rotation
			id={`${id}-rotation-z`}
			label="Angle z"
			bind:angle={angleZ}
			max={360}
			onupdate={update}
			color="accent"
			size="xs"
			{disabled}
		/>
	</div>

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
		color="highlight"
		size="xs"
		{disabled}
	/>
	{#await Promise.resolve()}
		<div class={`l:frame:twin ravioli:lg`}>
			<Button
				id="update-geometry"
				name="update-geometry"
				title="Update geometry"
				size="xl"
				color="highlight"
				variant="outline"
				shape="round"
				asset="nojs"
				{disabled}
			/>
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
