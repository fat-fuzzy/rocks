<script lang="ts">
	import {onMount} from 'svelte'
	import {blocks} from '@fat-fuzzy/ui'
	import store from './store.svelte'
	import {PlayerEvent, PlayerState} from './types.js'
	const {Button, Switch} = blocks

	type Props = {
		id?: string
		size: string
		variant?: string

		color?: string
		disabled?: boolean
		initial?: string
		play: (payload: {event: PlayerEvent}) => void
		pause: (payload: {event: PlayerEvent}) => void
		clear: (payload: {event: PlayerEvent}) => void
		stop: (payload: {event: PlayerEvent}) => void
		init: (payload: {event: PlayerEvent}) => void
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
		init,
	}: Props = $props()

	function updatePlayer(payload: {value: string | number}) {
		let event = payload.value as PlayerEvent
		if (event === 'play') {
			event =
				store.getState() === PlayerState.playing
					? PlayerEvent.pause
					: PlayerEvent.play
		}
		switch (payload.value) {
			case PlayerEvent.play:
				play({event})
				break
			case PlayerEvent.pause:
				pause({event})
				break
			case PlayerEvent.clear:
				clear({event})
				break
			case PlayerEvent.stop:
				stop({event})
				break
		}
		store.update(event as PlayerEvent)
	}

	onMount(() => {
		store.init({
			initial: PlayerState.idle,
			onclick: updatePlayer,
		})

		if (init) {
			init({event: PlayerEvent.loadOk})
		}
	})
</script>

<menu {id} class={`player l:switcher:2xs w:full hug justify:center`}>
	<li>
		{#key store.playState}
			<Switch
				id="play"
				name="play"
				value="play"
				states={store.playSwitch}
				{color}
				{size}
				shape="square"
				initial={store.playState}
				disabled={store.getPlayDisabled()}
				onclick={updatePlayer}
			>
				{store.playLabel}
			</Switch>
		{/key}
	</li>
	<li class="l:stack:2xs group">
		<Button
			id="clear"
			name="clear"
			{color}
			{variant}
			{size}
			value="clear"
			asset="clear"
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
			asset="rect"
			onclick={updatePlayer}
			disabled={store.getStopDisabled()}
		>
			Stop
		</Button>
	</li>
</menu>

<style>
	@import '../../styles/css/player.css';
</style>
