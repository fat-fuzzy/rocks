<script lang="ts">
	import type {FuzzyPayload} from '@fat-fuzzy/ui'
	import type {PlayerProps, PlayerEvent} from '$types'
	import {onMount} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import actor from './actor.svelte'

	const {Button, Switch} = ui.blocks

	let {
		id = 'player',
		font,
		size,
		variant = 'outline',
		color = 'primary',
		play,
		pause,
		clear,
		stop,
		snap,
		init,
	}: PlayerProps = $props()

	function updatePlayer(payload: FuzzyPayload) {
		let event = payload.value as PlayerEvent
		if (event === 'play') {
			event = actor.getState() === 'playing' ? 'pause' : 'play'
		}
		switch (event) {
			case 'play':
				play({event})
				break
			case 'pause':
				pause({event})
				break
			case 'clear':
				clear({event})
				break
			case 'stop':
				stop({event})
				break
		}
		actor.update(event as PlayerEvent)
	}

	onMount(() => {
		actor.init({
			initial: 'idle',
			onclick: updatePlayer,
		})

		if (init) {
			init({event: 'loadOk'})
		}
	})
</script>

<div class="l:burrito contain">
	<menu {id} class="player l:switcher:2xs">
		<li>
			{#key actor.playState}
				<Switch
					id="play"
					name="play"
					value="play"
					states={actor.playSwitch}
					{color}
					{size}
					{font}
					shape="pill"
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
				color="accent"
				{variant}
				{size}
				{font}
				shape="pill"
				value="clear"
				asset="clear"
				onclick={updatePlayer}
				disabled={actor.getClearDisabled()}
			>
				clear
			</Button>
		</li>
		<li>
			<Button
				id="snap"
				name="snap"
				color="neutral"
				{variant}
				{size}
				{font}
				shape="pill"
				value="snap"
				asset="snap"
				onclick={snap}
				disabled={actor.getSnapDisabled()}
			>
				snap
			</Button>
		</li>
		<li>
			<Button
				id="stop"
				name="stop"
				color="highlight"
				{variant}
				{size}
				{font}
				shape="pill"
				value="stop"
				asset="rect"
				onclick={updatePlayer}
				disabled={actor.getStopDisabled()}
			>
				stop
			</Button>
		</li>
	</menu>
</div>

<style nonce="%sveltekit.nonce%">
	@import '../../styles/css/player.css';
</style>
