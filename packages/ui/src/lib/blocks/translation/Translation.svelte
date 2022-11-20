<script>
	import {onMount} from 'svelte'
	import {gl} from '@fat-fuzzy/lib'

	const {draw} = gl

	let maxX
	let maxY

	let canvas
	const height = 400
	const width = 400
	let coordX = 0
	let coordY = 0
	let translation

	$: translation = [coordX, coordY]
	$: maxX = width
	$: maxY = height

	let webGlProps

	function run(canvas, translation) {
		webGlProps = draw.initScene(canvas)
		draw.drawTranslationScene(webGlProps, translation)
	}

	function update() {
		draw.drawTranslation(webGlProps, translation)
	}

	onMount(() => {
		run(canvas, translation)
	})
</script>

<label>
	x =
	{coordX}
	<input type="range" bind:value={coordX} max={maxX} on:input={update} />
</label>
<label>
	y =
	{coordY}
	<input type="range" bind:value={coordY} max={maxY} on:input={update} />
</label>

<canvas bind:this={canvas} {width} {height} />
