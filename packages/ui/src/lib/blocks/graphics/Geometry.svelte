<script lang="ts">
	import * as lib from '@fat-fuzzy/lib'
	import {createEventDispatcher} from 'svelte'
	import Position from './Position.svelte'
	import Scale from './Scale.svelte'
	import Rotation from './Rotation.svelte'

	export let canvasWidth: number
	export let canvasHeight: number
	export let animation

	const mathUtils = lib.default.math.utils
	console.log('mathUtils')
	console.log(mathUtils)
	console.log('canvasWidth')
	console.log(canvasWidth)
	console.log('canvasHeight')
	console.log(canvasHeight)
	console.log('animation')
	console.log(animation)
	const dispatch = createEventDispatcher()

	let {color, width, height, scale, translation, rotation} = animation.geometry

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
	$: geometry = {
		color,
		translation,
		rotation,
		scale,
		width,
		height,
	}

	const update = () => animation.update(geometry)
</script>

<form class="l-switcher xxs">
	<Position bind:coordX bind:coordY bind:maxX bind:maxY on:input={update} />
	<Scale bind:scaleX bind:scaleY maxX={5} maxY={5} minX={-5} minY={-5} on:input={update} />
	<Rotation bind:angle max={360} on:input={update} />
</form>
