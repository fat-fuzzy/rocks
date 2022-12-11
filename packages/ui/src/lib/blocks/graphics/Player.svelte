<script lang="ts">
	import {theme} from '../../stores/theme'
	import Button from '../buttons/Button.svelte'

	export let canvas: HTMLCanvasElement
	export let sketch
	let frame: number

	const loop = () => {
		sketch.draw()
		frame = requestAnimationFrame((t) => {
			// call requestAnimationFrame again with parameters
			loop()
		})
	}

	const play = () => loop()

	const stop = () => {
		cancelAnimationFrame(frame)
		sketch.clear()
	}

	const pause = () => cancelAnimationFrame(frame)
	let disabled = false

	$: variant = $theme ? `accent` : `highlight`
</script>

<div class="l-burrito xxl">
	<menu class="menu l-switcher sm">
		<Button id="btn-play" {variant} onClick={play} type="button" {disabled}>▶︎ &nbsp;Play</Button>
		<Button id="btn-pause" {variant} onClick={pause} type="button" {disabled}>⏸ &nbsp;Pause</Button>
		<Button id="btn-stop" {variant} onClick={stop} type="button" {disabled}>◼ &nbsp;Stop</Button>
	</menu>
</div>
