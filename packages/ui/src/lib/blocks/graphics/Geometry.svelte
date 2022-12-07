<script lang="ts">
	import {gl} from '@fat-fuzzy/lib'
	import {createEventDispatcher} from 'svelte'
	import Position from './Position.svelte'
	import Scale from './Scale.svelte'
	import Rotation from './Rotation.svelte'

	export let show = true
	export let canvasWidth: number
	export let canvasHeight: number
	export let geometry

	const {utils} = gl

	const dispatch = createEventDispatcher()

	let color = geometry.color
	let width = geometry.width
	let height = geometry.height

	// input attributes
	let angle = 0

	// Position
	let [coordX, coordY] = geometry.translation

	// Rotation
	let [radCoordX, radCoordY] = geometry.rotation

	// Scale
	let [scaleX, scaleY] = geometry.scale

	$: maxX = canvasWidth
	$: maxY = canvasHeight
	$: radCoordX = Math.cos(utils.degToRad(angle))
	$: radCoordY = Math.sin(utils.degToRad(angle))
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

	const update = () =>
		dispatch('update', {
			value: geometry,
		})
</script>

<form class={show ? 'l-switcher xxs' : 'visually-hidden'}>
	<Position bind:coordX bind:coordY bind:maxX bind:maxY on:input={update} />
	<Scale bind:scaleX bind:scaleY maxX={5} maxY={5} minX={-5} minY={-5} on:input={update} />
	<Rotation bind:angle max={360} on:input={update} />
</form>
