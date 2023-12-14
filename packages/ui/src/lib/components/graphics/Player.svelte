<script lang="ts">
	import {onDestroy} from 'svelte'
	import * as settings from '$lib/stores/settings'

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

	let appSettings: {[key: string]: string} = {brightness: '', contrast: ''}

	const stores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
	]

	const play = () => loop()

	const stop = () => {
		cancelAnimationFrame(frame)
		scene.clear()
	}

	const pause = () => cancelAnimationFrame(frame)
	let disabled = false

	$: variant = appSettings.brightness === 'day' ? `accent` : `highlight`

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<menu class="l:switcher bp:xxs sm">
	<Button id="btn-play" {variant} onClick={play} {disabled}>▶︎ &nbsp;Play</Button>
	<Button id="btn-pause" {variant} onClick={pause} {disabled}>⏸ &nbsp;Pause</Button>
	<Button id="btn-stop" {variant} onClick={stop} {disabled}>◼ &nbsp;Stop</Button>
</menu>
