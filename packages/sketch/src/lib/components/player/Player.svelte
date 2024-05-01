<script lang="ts">
	import type {SwitchState, ButtonPayload} from '$types'
	import {PlayerState, PlayerEvent} from '$types'
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {Button, Switch} = blocks

	type Props = {
		id?: string
		size: string
		variant?: string
		color: string
		disabled?: boolean
		initial?: string
		play: (payload: {event: string; state: string}) => void
		pause: (payload: {event: string; state: string}) => void
		clear: (payload: {event: string; state: string}) => void
		stop: (payload: {event: string; state: string}) => void
	}

	let {
		id = 'player',
		size,
		variant = 'outline',
		color = 'primary',
		initial = PlayerState.idle,
		disabled,
		play,
		pause,
		clear,
		stop,
	}: Props = $props()

	function updateState(payload: ButtonPayload) {
		const tmp = initial
		const playerPayload = {event: payload.value, state: tmp}
		switch (payload.value) {
			case PlayerEvent.play:
				initial = PlayerState.playing
				playerPayload.state = initial
				play(playerPayload)
				break
			case PlayerEvent.pause:
				initial = PlayerState.paused
				playerPayload.state = initial
				pause(playerPayload)
				break
			case PlayerEvent.clear:
				clear(playerPayload)
				initial = tmp
				break
			case PlayerEvent.stop:
				initial = PlayerState.stopped
				playerPayload.state = initial
				stop(playerPayload)
				break
		}
		events.previous = events.current
		events.current = payload.value
	}

	let events: {
		previous?: string
		current: string
	} = $state({
		previous: undefined,
		current: 'init',
	})

	let playerState = $derived(initial === PlayerState.idle ? 'inactive' : 'active')

	let disableStop = $derived.by(() => {
		return initial === PlayerState.idle ||
			initial === PlayerState.stopped ||
			initial === PlayerState.ended
			? true
			: undefined
	})

	let disableClear = $derived.by(() => {
		return events.current === PlayerEvent.clear ||
			initial === PlayerState.idle ||
			initial === PlayerState.stopped ||
			initial === PlayerState.ended
			? true
			: undefined
	})

	const playSwitch: SwitchState = {
		active: {
			value: PlayerEvent.pause,
			text: 'Pause',
			asset: 'emoji:pause',
			variant: 'outline',
			onclick: updateState,
		},
		inactive: {
			value: PlayerEvent.play,
			text: 'Play',
			asset: 'emoji:play',
			variant: 'fill',
			onclick: updateState,
		},
	}
</script>

<menu {id} class={`l:switcher:${size}`}>
	<Switch
		id="play"
		name="play"
		states={playSwitch}
		{color}
		{size}
		initial={playerState}
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
		disabled={disableClear}
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
		disabled={disableStop}
	>
		Stop
	</Button>
</menu>
