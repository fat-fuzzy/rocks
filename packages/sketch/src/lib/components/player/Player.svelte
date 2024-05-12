<script lang="ts">
	import type {TogglePayload} from '$types'
	import {blocks, actors} from '@fat-fuzzy/ui-s5'

	import store from './store.svelte'
	import {PlayerEvent, PlayerState} from './types.js'

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

	store.init({
		initial: PlayerState.idle,
		onclick: updatePlayer,
	})
	let playButtonActor = switchActor.actor(id, store.getPlayState(), 'play')

	function updatePlayer(payload: TogglePayload) {
		const tmp = store.state
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
				store.state = tmp
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
		states={store.playSwitch}
		{color}
		{size}
		shape="square"
		initial={store.getPlayState()}
		container="main"
		disabled={store.getPlayDisabled()}
		onclick={updatePlayer}
		actor={playButtonActor}
	>
		{store.getPlayLabel()}
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
			disabled={store.getClearDisabled()}
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
			disabled={store.getStopDisabled()}
		>
			Stop
		</Button>
	</li>
</menu>
