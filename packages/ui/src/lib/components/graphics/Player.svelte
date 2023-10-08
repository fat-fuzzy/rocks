<script lang="ts">
	import {theme} from '$lib/stores/theme'

	import Button from '$lib/components/blocks/buttons/Button.svelte'

	export let scene
	let frame: number

	const loop = () => {
		scene.draw()
		frame = requestAnimationFrame((t) => {
			// call requestAnimationFrame again with parameters
			loop()
		})
	}

	const play = () => loop()

	const stop = () => {
		cancelAnimationFrame(frame)
		scene.clear()
	}

	const pause = () => cancelAnimationFrame(frame)
	let disabled = false

	$: variant = $theme ? `accent` : `highlight`
</script>

<menu class="l:switcher bp:xxs sm">
	<Button id="btn-play" {variant} onClick={play} {disabled}>▶︎ &nbsp;Play</Button>
	<Button id="btn-pause" {variant} onClick={pause} {disabled}>⏸ &nbsp;Pause</Button>
	<Button id="btn-stop" {variant} onClick={stop} {disabled}>◼ &nbsp;Stop</Button>
</menu>
