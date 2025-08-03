<script lang="ts">
	import {onMount} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import actor from './actor.svelte'
	import type {PlayerProps} from '$types'
	import {PlayerEvent, PlayerState} from '$types'

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
		init,
		canvas,
	}: PlayerProps = $props()

	let blobLink: HTMLAnchorElement | undefined = $state(undefined)
	let blobUrl: string | undefined = $state(undefined)
	let blobName: string | undefined = $state(undefined)
	let downloadSnap = $derived(actor.getCurrentEvent() === PlayerEvent.snap)

	// $effect(() => {
	// 	const currentEvent = actor.getCurrentEvent()
	// 	const previousEvent = actor.getPreviousEvent()

	// 	console.log(
	// 		`Current Event: ${currentEvent}, Previous Event: ${previousEvent}`,
	// 	)

	// 	downloadSnap = currentEvent === PlayerEvent.pause
	// 	currentEvent === PlayerEvent.snap ||
	// 		currentEvent === PlayerEvent.play ||
	// 		previousEvent === PlayerEvent.pause ||
	// 		previousEvent === PlayerEvent.play ||
	// 		previousEvent === PlayerEvent.snap
	// })

	function updatePlayer(payload: {value?: string | number}) {
		let event = payload.value as PlayerEvent
		if (event === 'play') {
			event =
				actor.getState() === PlayerState.playing
					? PlayerEvent.pause
					: PlayerEvent.play
		}
		downloadSnap = true // TODO: this should be handled by the actor
		switch (payload.value) {
			case PlayerEvent.play:
				play({event})
				break
			case PlayerEvent.pause:
				pause({event})
				break
			case PlayerEvent.clear:
				blobUrl = undefined
				blobName = undefined
				clear({event})
				break
			case PlayerEvent.stop:
				blobUrl = undefined
				blobName = undefined
				stop({event})
				break
		}
		actor.update(event as PlayerEvent)
	}

	function takeSnapshot() {
		if (canvas) {
			canvas.toBlob(
				(blob: Blob | null) => {
					if (blob) {
						saveBlob()(blob, canvas)
					}
				},
				'image/jpeg',
				1,
			)
		}
		actor.update(PlayerEvent.snap)
		downloadSnap = true // TODO: this should be handled by the actor
	}

	function saveBlob() {
		return function saveData(blob: Blob, canvas: HTMLCanvasElement) {
			blobUrl = URL.createObjectURL(blob)
			blobName = `snap-${canvas.width}x${canvas.height}-${Date.now()}`
		}
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
				color="accent"
				{variant}
				{size}
				{font}
				shape="pill w:full"
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
				shape="pill w:full"
				value="snap"
				asset="snap"
				onclick={takeSnapshot}
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
				shape="pill w:full"
				value="stop"
				asset="rect"
				onclick={updatePlayer}
				disabled={actor.getStopDisabled()}
			>
				stop
			</Button>
		</li>
		<li class="w:full text:center">
			{#if blobUrl && blobName && downloadSnap}
				<a
					bind:this={blobLink}
					href={blobUrl}
					download={blobName}
					class="font:xs raviolink"
				>
					Download snapshot
				</a>
			{/if}
		</li>
	</menu>
</div>
