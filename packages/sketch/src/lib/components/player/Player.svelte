<script lang="ts">
	import type {TogglePayload} from '$types'
	import {PlayerState, PlayerEvent} from '$types'
	import {blocks, actors} from '@fat-fuzzy/ui-s5'

	import PlayerStore from './store.svelte'

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
		disabled,
		play,
		pause,
		clear,
		stop,
	}: Props = $props()

	let events: {
		previous?: string
		current: string
	} = $state({
		previous: undefined,
		current: 'init',
	})
	let playerStore = new PlayerStore({onclick})
	let disableStop = $derived.by(() => {
		return playerStore.state === PlayerState.idle ||
			playerStore.state === PlayerState.stopped ||
			playerStore.state === PlayerState.ended
			? true
			: undefined
	})

	let disableClear = $derived.by(() => {
		return events.current === PlayerEvent.clear ||
			playerStore.state === PlayerState.idle ||
			playerStore.state === PlayerState.stopped ||
			playerStore.state === PlayerState.ended
			? true
			: undefined
	})

	function onclick(payload: TogglePayload) {
		const tmp = playerStore.state
		const playerPayload = {event: payload.value, state: tmp}
		switch (payload.value) {
			case PlayerEvent.play:
				playerStore.state = PlayerState.playing
				playerPayload.state = playerStore.state
				play(playerPayload)
				break
			case PlayerEvent.pause:
				playerStore.state = PlayerState.paused
				playerPayload.state = playerStore.state
				pause(playerPayload)
				break
			case PlayerEvent.clear:
				clear(playerPayload)
				playerStore.state = tmp
				break
			case PlayerEvent.stop:
				playerStore.state = PlayerState.stopped
				playerPayload.state = playerStore.state
				stop(playerPayload)
				break
		}
		events.previous = events.current
		events.current = payload.value
	}
</script>

<menu {id} class={`l:switcher:${size} w:full shrink justify:center`}>
	<Switch
		id="play"
		name="play"
		states={playerStore.playSwitch}
		{color}
		{size}
		shape="square"
		initial={playerStore.playState}
		container="main"
		{disabled}
		actor={switchActor.actor(id, 'inactive', 'play')}
		>{playerStore.getPlayLabel()}</Switch
	>
	<li class="l:switcher">
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
