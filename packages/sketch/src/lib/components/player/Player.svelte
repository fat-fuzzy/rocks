<script lang="ts">
	import type {SwitchState, ButtonPayload} from '$types'
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {Button, Switch} = blocks

	type Props = {
		id?: string
		size: string
		variant?: string
		color: string
		disabled?: boolean
		initial?: string
		play: () => void
		pause: () => void
		clear: () => void
		stop: () => void
	}

	let {
		id = 'player',
		size,
		variant = 'outline',
		color = 'primary',
		initial = 'stop',
		disabled,
		play,
		pause,
		clear,
		stop,
	}: Props = $props()

	function updateState(payload: ButtonPayload) {
		state = payload.value
		switch (state) {
			case 'play':
				play()
				break
			case 'pause':
				pause()
				break
			case 'clear':
				clear()
				break
			case 'stop':
				stop()
				break
		}
	}

	let state = $state(initial)
	const playSwitch: SwitchState = {
		active: {
			value: 'pause',
			text: 'Pause',
			asset: 'emoji:pause',
			variant: 'outline',
			onclick: updateState,
		},
		inactive: {
			value: 'play',
			text: 'Play',
			asset: 'emoji:play',
			variant: 'fill',
			onclick: updateState,
		},
	}
</script>

<menu {id} class={`l:switcher:${size} w:full nowrap`}>
	<Switch
		id="play"
		name="play"
		states={playSwitch}
		{color}
		{size}
		initial="inactive"
		container="main"
		{disabled}
	/>
	<Button
		id="clear"
		name="clear"
		{color}
		{variant}
		{size}
		value="clear"
		asset="emoji:clear"
		onclick={updateState}
		disabled={state === 'clear' || state === 'stop' ? true : undefined}
	>
		Clear
	</Button>
	<Button
		id="stop"
		name="stop"
		{color}
		{variant}
		{size}
		value="stop"
		asset="emoji:rect"
		onclick={updateState}
		disabled={state === 'stop' ? true : undefined}
	>
		Stop
	</Button>
</menu>
