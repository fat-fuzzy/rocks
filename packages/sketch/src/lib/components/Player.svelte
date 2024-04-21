<script lang="ts">
	import type {SwitchState} from '$types'
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {Button, Switch} = blocks

	type Props = {
		id: string
		size: string
		variant?: string
		color: string
		mode: 'radio' | 'multiple'
		disabled?: boolean
	}
	let {id = 'player', size, variant = 'outline', color = 'primary', disabled}: Props = $props()

	let state = $state('idle')

	function clear(event: MouseEvent) {
		console.log('clear', event)
		console.log('payload', event.detail)
	}
	function play(event: MouseEvent) {
		console.log('play', event)
		console.log('payload', event.detail)
	}
	function pause(event: MouseEvent) {
		console.log('pause', event)
		console.log('payload', event.detail)
	}
	const playSwitch: SwitchState = {
		active: {
			value: 'pause',
			text: 'Pause',
			asset: 'emoji:pause',
			variant: 'outline',
			onclick: (e) => pause(e),
		},
		inactive: {
			value: 'play',
			text: 'Play',
			asset: 'emoji:play',
			variant: 'fill',
			onclick: (e) => play(e),
		},
	}
</script>

<menu {id} class={`l:switcher:${size} w:full nowrap`}>
	<Switch
		id={`${id}-button`}
		name="player-button"
		states={playSwitch}
		{color}
		{size}
		initial="inactive"
		container="main"
		dimensions="50 grow:1"
		{disabled}
	/>
	<Button
		id="clear"
		name="clear"
		value="clear"
		{color}
		{variant}
		{size}
		asset="emoji:clear"
		onclick={(e) => clear(e)}
		disabled={disabled || state === 'clear'}>Clear</Button
	>
</menu>
