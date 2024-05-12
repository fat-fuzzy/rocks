<script lang="ts">
	import type {TogglePayload} from '$types'
	import {PlayerEvent} from '$types'
	import {blocks, actors} from '@fat-fuzzy/ui-s5'

	import playerStore from './store.svelte'
	import {PlayerState} from '../../types/index.js'

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

	playerStore.init({
		initial: PlayerState.idle,
		onclick: updatePlayer,
	})
	let playButtonActor = switchActor.actor(
		id,
		playerStore.getPlayState(),
		'play',
	)
	let playButtonLabel = $derived.by(playerStore.getPlayLabel)
	let disablePlay = $derived.by(playerStore.getPlayDisabled)
	let disableStop = $derived.by(playerStore.getStopDisabled)
	let disableClear = $derived.by(playerStore.getClearDisabled)

	function updatePlayer(payload: TogglePayload) {
		console.log('updatePlayer', payload)
		playerStore.update(payload.id)
		const tmp = playerStore.state
		const playerPayload = {event: payload.id}
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
	}
</script>

<menu {id} class={`l:switcher:${size} hug w:full justify:center`}>
	<Switch
		id="play"
		name="play"
		states={playerStore.playSwitch}
		{color}
		{size}
		shape="square"
		initial={playerStore.getPlayState()}
		container="main"
		disabled={disablePlay}
		onclick={updatePlayer}
		actor={playButtonActor}
	>
		{playButtonLabel}
	</Switch>
	<li class="l:stack:2xs">
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
