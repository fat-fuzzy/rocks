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
		play: (payload: {event: string}) => void
		pause: (payload: {event: string}) => void
		clear: (payload: {event: string}) => void
		stop: (payload: {event: string}) => void
	}

	let {
		id = 'player',
		size,
		variant = 'outline',
		color = 'primary',
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
		current: undefined,
	})

	let playerStore = new PlayerStore({onclick: updatePlayer})
	let playButtonActor = $state(switchActor.actor(id, playerStore.state, 'play'))
	let disablePlay = $derived.by(playerStore.getPlayDisabled)
	let disableStop = $derived.by(playerStore.getStopDisabled)
	let disableClear = $derived.by(() => {
		return events.current === PlayerEvent.clear || playerStore.getStopDisabled()
	})

	function updatePlayer(payload: TogglePayload) {
		console.log('updatePlayer', payload)
		const tmp = playerStore.state
		const playerPayload = {event: payload.value}
		switch (payload.value) {
			case PlayerEvent.play:
				play(playerPayload)
				break
			case PlayerEvent.pause:
				pause(playerPayload)
				break
			case PlayerEvent.clear:
				clear(playerPayload)
				playerStore.state = tmp
				break
			case PlayerEvent.stop:
				stop(playerPayload)
				break
		}
		playerStore.update({event: payload.value})
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
		disabled={disablePlay}
		onclick={updatePlayer}
		actor={playButtonActor}>{playerStore.getPlayLabel()}</Switch
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
			onclick={updatePlayer}
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
			onclick={updatePlayer}
			disabled={disableStop}
		>
			Stop
		</Button>
	</li>
</menu>
