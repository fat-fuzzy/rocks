<script lang="ts">
	import {onMount} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import actor from './actor.svelte'
	import type {PlayerProps} from '$types'
	import {PlayerEvent, PlayerState} from '$types'

	const {Button, Switch} = ui.blocks

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
	}: PlayerProps = $props()

	function updatePlayer(payload: {value?: string | number}) {
		let event = payload.value as PlayerEvent
		if (event === 'play') {
			event =
				actor.getState() === PlayerState.playing
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
		actor.update(event as PlayerEvent)
	}

	onMount(() => {
		actor.init({
			initial: PlayerState.idle,
			onclick: updatePlayer,
		})

		if (init) {
			init({event: PlayerEvent.loadOk})
		}
	})
</script>

<menu {id} class={`player l:switcher:${size} th:2xs raviolink`}>
	<li>
		{#key actor.playState}
			<Switch
				id="play"
				name="play"
				value="play"
				states={actor.playSwitch}
				{color}
				{size}
				shape="pill w:full"
				initial={actor.playState}
				disabled={actor.getPlayDisabled()}
				onclick={updatePlayer}
			>
				{actor.playLabel}
			</Switch>
		{/key}
	</li>
	<li>
		<Button
			id="clear"
			name="clear"
			{color}
			{variant}
			{size}
			shape="pill w:full"
			value="clear"
			asset="clear"
			onclick={updatePlayer}
			disabled={actor.getClearDisabled()}
		>
			Clear
		</Button>
	</li>
	<li>
		<Button
			id="stop"
			name="stop"
			{color}
			{variant}
			{size}
			shape="pill w:full"
			value="stop"
			asset="rect"
			onclick={updatePlayer}
			disabled={actor.getStopDisabled()}
		>
			Stop
		</Button>
	</li>
</menu>
