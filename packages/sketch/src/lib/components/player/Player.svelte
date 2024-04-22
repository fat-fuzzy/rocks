<script lang="ts">
	import type {SwitchState} from '$types'
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {Button, Switch} = blocks

	type Props = {
		id?: string
		size: string
		variant?: string
		color: string
		disabled?: boolean
		onclick?: (event: MouseEvent, payload: any /* ButtonPayload */) => void
	}
	let {
		id = 'player',
		size,
		variant = 'outline',
		color = 'primary',
		disabled,
		onclick,
	}: Props = $props()

	let state = $state('idle')

	function clear(event: MouseEvent) {
		state = 'clear'
		if (onclick) onclick(event, payload)
	}
	function play(event: MouseEvent) {
		state = 'play'
		if (onclick) onclick(event, payload)
	}
	function pause(event: MouseEvent) {
		state = 'pause'
		if (onclick) onclick(event, payload)
	}
	const playSwitch: SwitchState = {
		active: {
			value: 'pause',
			text: 'Pause',
			asset: 'emoji:pause',
			variant: 'outline',
			onclick: pause,
		},
		inactive: {
			value: 'play',
			text: 'Play',
			asset: 'emoji:play',
			variant: 'fill',
			onclick: play,
		},
	}

	let payload = $derived({
		state,
	})
</script>

<menu {id} class={`l:switcher:${size} w:full nowrap`}>
	<Switch
		id={id ? `${id}-player-button` : 'player-button'}
		name="play"
		states={playSwitch}
		{color}
		{size}
		initial="inactive"
		container="main"
		{disabled}
	/>
	<Button
		id={id ? `${id}-clear-button` : 'clear-button'}
		name="clear"
		{color}
		{variant}
		{size}
		value="clear"
		asset="emoji:clear"
		onclick={clear}
		disabled={disabled || state === 'clear'}>Clear</Button
	>
</menu>
