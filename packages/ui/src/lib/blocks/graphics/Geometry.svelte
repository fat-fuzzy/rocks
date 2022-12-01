<script lang="ts">
	import {gl} from '@fat-fuzzy/lib'
	import {onMount, createEventDispatcher} from 'svelte'
	import Position from './Position.svelte'
	import Scale from './Scale.svelte'
	import Rotation from './Rotation.svelte'

	export let show = true
	export let canvasWidth
	export let canvasHeight

	const {utils} = gl

	const dispatch = createEventDispatcher()

	let geometry
	let color
	let width
	let height

	// input attributes
	let maxX
	let maxY
	let angle

	// Position
	let coordX
	let coordY
	let translation

	// Rotation
	let radCoordX
	let radCoordY
	let rotation

	// Scale
	let scaleX
	let scaleY
	let scale

	function init() {
		geometry = utils.getGeometryDefaults(canvasWidth, canvasHeight)

		// Shape
		color = geometry.color
		width = geometry.width
		height = geometry.height

		// Position
		;[coordX, coordY] = geometry.translation

		// Rotation
		;[radCoordX, radCoordY] = geometry.rotation

		// Scale
		;[scaleX, scaleY] = geometry.scale

		// input attributes
		maxX = canvasWidth
		maxY = canvasHeight
		angle = 0
	}

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

	onMount(() => {
		init()
		update()
	})
</script>

<form class={show ? 'l-switcher xxs' : 'visually-hidden'}>
	<Position bind:coordX bind:coordY bind:maxX bind:maxY on:input={update} />
	<Scale bind:scaleX bind:scaleY maxX={5} maxY={5} minX={-5} minY={-5} on:input={update} />
	<Rotation bind:angle max={360} on:input={update} />
</form>
