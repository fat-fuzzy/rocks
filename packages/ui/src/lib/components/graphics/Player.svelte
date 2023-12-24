<script lang="ts">
	import type {SwitchState} from '$types'
	import Switch from '$lib/components/blocks/buttons/Switch.svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	export let id = 'player-controls'
	export let size = ''
	export let variant = 'outline'
	export let color = ''
	export let mode = 'radio'

	let selected: {
		id: string
		value: string
		pressed: boolean
		name: string
		send: (event: string) => unknown
	}[] = []

	const onClick = (event: CustomEvent) => {
		switch (mode) {
			case 'multiple':
				if (event.detail.pressed) {
					selected = [...selected, event.detail]
				} else {
					selected = selected.filter((c) => c.value !== event.detail.value)
				}
				break
			case 'radio':
				if (event.detail.pressed) {
					if (!playerState.send) {
						playerState = event.detail
					}
					if (playerState.value !== event.detail.value) {
						selected.forEach((c) => {
							if (c.value !== playerState.value && c.pressed) {
								c.send('SWITCH')
							}
						})
					}
				}
				if (event.detail.pressed === undefined) {
					if (state === 'play' && playerState.send) {
						playerState.send('SWITCH')
					}
				}
				state = event.detail.value
				selected = [event.detail]
				break
			default:
				break
		}

		dispatch('click', {
			selected,
		})
	}

	export let items: any = {
		button: {id: 'clear', value: 'clear', text: 'Clear', asset: 'emoji:clear'},
		switch: {
			active: {
				id: 'pause',
				value: 'pause',
				text: 'Pause',
				asset: 'emoji:pause',
			},
			inactive: {id: 'play', value: 'play', text: 'Play', asset: 'emoji:play'},
		},
	}
	let playerState: SwitchState = items.switch['inactive']
	let state = 'clear'
</script>

<menu {id} class={`l:switcher:sm`}>
	<Switch
		id="switch-play-pause"
		states={items.switch}
		{variant}
		{color}
		{size}
		container="main:50 flex-grow"
		on:click={onClick}
	/>
	<Button
		id="button-clear"
		text="Clear"
		asset="emoji:clear"
		{variant}
		{color}
		{size}
		container="flex-grow"
		{...items.button}
		on:click={onClick}
		disabled={state === 'clear'}
	/>
</menu>
