<script lang="ts">
	import {onDestroy} from 'svelte'
	import * as settings from '$lib/stores/settings'

	import ToggleMenu from '$lib/components/compositions/menus/ToggleMenu.svelte'

	export let scene
	export let color = ''
	export let size = ''
	export let variant = ''

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

	export let items = [
		{id: 'menu.button.play', text: '▶︎ Play', asset: '', onClick: play},
		{id: 'menu.button.pause', text: '⏸ Pause', asset: '', onClick: pause},
		{id: 'menu.button.stop', text: '◼ Stop', asset: '', onClick: stop},
	]

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<ToggleMenu layout="switcher" {items} {variant} {color} {size} />
