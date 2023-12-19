<script lang="ts">
	import {createEventDispatcher, onMount} from 'svelte'

	import Position from '$lib/components/graphics/Position.svelte'
	import Scale from '$lib/components/graphics/Scale.svelte'
	import Rotation from '$lib/components/graphics/Rotation.svelte'

	export let canvasWidth: number
	export let canvasHeight: number
	export let geometry
	export let color = ''

	const dispatch = createEventDispatcher()

	function degToRad(degrees) {
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
	let [coordX, coordY] = translation

	// Rotation
	let [radCoordX, radCoordY] = rotation

	// Scale
	let [scaleX, scaleY] = scale

	$: maxX = canvasWidth
	$: maxY = canvasHeight
	$: radCoordX = Math.cos(degToRad(angle))
	$: radCoordY = Math.sin(degToRad(angle))
	$: translation = [coordX, coordY]
	$: rotation = [radCoordX, radCoordY]
	$: scale = [scaleX, scaleY]
	$: value = {
		color: geometry.color,
		translation,
		rotation,
		scale,
		width,
		height,
	}
	onMount(() => {
		update()
	})
</script>

<form class="l:switcher:xxs xs card:lg bg:polar">
	<Position bind:coordX bind:coordY bind:maxX bind:maxY on:input={update} {color} size="xs" />
	<Scale
		bind:scaleX
		bind:scaleY
		maxX={5}
		maxY={5}
		minX={-5}
		minY={-5}
		on:input={update}
		{color}
		size="xs"
	/>
	<Rotation bind:angle max={360} on:input={update} {color} size="xs" />
</form>
