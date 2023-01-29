<script lang="ts">
	import lib from '@fat-fuzzy/lib'
	import {createEventDispatcher, onMount} from 'svelte'
	import Position from './Position.svelte'
	import Scale from './Scale.svelte'
	import Rotation from './Rotation.svelte'

	const mathUtils = lib.math.utils

	export let canvasWidth: number
	export let canvasHeight: number
	export let geometry

	const dispatch = createEventDispatcher()

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
	$: radCoordX = Math.cos(mathUtils.degToRad(angle))
	$: radCoordY = Math.sin(mathUtils.degToRad(angle))
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

<form class="l:switcher bp:sm sm">
	<Position bind:coordX bind:coordY bind:maxX bind:maxY on:input={update} />
	<Scale bind:scaleX bind:scaleY maxX={5} maxY={5} minX={-5} minY={-5} on:input={update} />
	<Rotation bind:angle max={360} on:input={update} />
</form>
