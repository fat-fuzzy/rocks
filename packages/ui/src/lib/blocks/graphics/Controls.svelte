<script lang="ts">
	import {theme} from '../../stores/theme'
	import Button from '../buttons/Button.svelte'

	export let canvas: HTMLCanvasElement
	export let sketch
	let frame: number
	let {render, clear, duration} = sketch

	function runLoop(timestamp, duration) {
		render(canvas)
		frame = requestAnimationFrame(function (t) {
			// call requestAnimationFrame again with parameters
			runLoop(t, duration)
		})
	}

	function play() {
		clear(canvas)
		frame = requestAnimationFrame(function (timestamp) {
			runLoop(timestamp, duration)
		})
	}

	function stop() {
		cancelAnimationFrame(frame)
		clear(canvas)
	}

	function pause() {
		cancelAnimationFrame(frame)
	}
	let disabled = false
	let variant = ``

	$: variant = $theme ? `accent` : `highlight`
</script>

<div class="l-burrito xxl">
	<menu class="menu l-switcher sm">
		<Button id="btn-play" {variant} onClick={play} type="button" {disabled}>▶︎ &nbsp;Play</Button>
		<Button id="btn-pause" {variant} onClick={pause} type="button" {disabled}>⏸ &nbsp;Pause</Button>
		<Button id="btn-stop" {variant} onClick={stop} type="button" {disabled}>◼ &nbsp;Stop</Button>
	</menu>
</div>
