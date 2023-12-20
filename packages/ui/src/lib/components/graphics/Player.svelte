<script lang="ts">
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

	const play = () => loop()

	const clear = () => {
		cancelAnimationFrame(frame)
		scene.clear()
	}

	const pause = () => cancelAnimationFrame(frame)

	export let items: any = [
		{id: 'play', value: 'play', text: 'Play', asset: 'emoji:play', onClick: play},
		{id: 'pause', value: 'pause', text: 'Pause', asset: 'emoji:pause', onClick: pause},
		{id: 'clear', value: 'clear', text: 'Clear', asset: 'emoji:clear', onClick: clear},
	]
</script>

<ToggleMenu layout="switcher" {items} {variant} {color} {size} />
