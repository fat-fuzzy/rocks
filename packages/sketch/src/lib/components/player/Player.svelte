<script lang="ts">
	import type {SwitchState, TogglePayload} from '$types'
	import {PlayerState, PlayerEvent} from '$types'
	import {blocks, actors} from '@fat-fuzzy/ui-s5'

	const {Button, Switch} = blocks
	const {switchActor} = actors

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

	let playerState = $state(initial)
	const playSwitch: SwitchState = {
		active: {
			value: PlayerEvent.pause,
			text: 'Pause',
			asset: 'emoji:pause',
			variant: 'outline',
			onclick,
		},
		inactive: {
			value: PlayerEvent.play,
			text: 'Play',
			asset: 'emoji:play',
			variant: 'fill',
			onclick,
		},
	}

	let events: {
		previous?: string
		current: string
	} = $state({
		previous: undefined,
		current: 'init',
	})

	let disableStop = $derived.by(() => {
		return playerState === PlayerState.idle ||
			playerState === PlayerState.stopped ||
			playerState === PlayerState.ended
			? true
			: undefined
	})

	let disableClear = $derived.by(() => {
		return events.current === PlayerEvent.clear ||
			playerState === PlayerState.idle ||
			playerState === PlayerState.stopped ||
			playerState === PlayerState.ended
			? true
			: undefined
	})

	function onclick(payload: TogglePayload) {
		const tmp = playerState
		const playerPayload = {event: payload.value, state: tmp}
		switch (payload.value) {
			case PlayerEvent.play:
				playerState = PlayerState.playing
				playerPayload.state = playerState
				play(playerPayload)
				break
			case PlayerEvent.pause:
				playerState = PlayerState.paused
				playerPayload.state = playerState
				pause(playerPayload)
				break
			case PlayerEvent.clear:
				clear(playerPayload)
				playerState = tmp
				break
			case PlayerEvent.stop:
				playerState = PlayerState.stopped
				playerPayload.state = playerState
				stop(playerPayload)
				break
		}
		events.previous = events.current
		events.current = payload.value
	}
</script>

<menu {id} class={`l:switcher:${size} align:stretch`}>
	<Switch
		id="play"
		name="play"
		states={playSwitch}
		{color}
		{size}
		shape="square"
		initial={playerState === PlayerState.idle ||
		playerState === PlayerState.stopped ||
		playerState === PlayerState.paused
			? 'inactive'
			: 'active'}
		container="main"
		{disabled}
		actor={switchActor.actor(id, 'inactive', 'play')}>{playerState}</Switch
	>
	<li class="l:stack">
		<Button
			id="clear"
			name="clear"
			{color}
			{variant}
			{size}
			value="clear"
			asset="emoji:clear"
			{onclick}
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
			{onclick}
			disabled={disableStop}
		>
			Stop
		</Button>
	</li>
</menu>
