<script lang="ts">
	import {createEventDispatcher, onMount} from 'svelte'

	import Position from '$lib/components/graphics/Position.svelte'
	import Scale from '$lib/components/graphics/Scale.svelte'
	import Rotation from '$lib/components/graphics/Rotation.svelte'

	export let canvasWidth: number
	export let canvasHeight: number
	export let geometry

	const dispatch = createEventDispatcher()

	function degToRad(degrees) {
		return degrees * (Math.PI / 180)
	}

	let update = () =>
		dispatch('update', {
			value,
		})

	let {color, width, height, scale, translation, rotation} = geometry

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
		color,
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

<form class="l:switcher bp:xxs xs">
	<Position bind:coordX bind:coordY bind:maxX bind:maxY on:input={update} />
	<Scale bind:scaleX bind:scaleY maxX={5} maxY={5} minX={-5} minY={-5} on:input={update} />
	<Rotation bind:angle max={360} on:input={update} />
</form>
