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

	function clear(event: MouseEvent, payload) {
		console.log('clear', event)
		console.log('payload', payload)
	}
	function play(event: MouseEvent, payload) {
		console.log('play', event)
		console.log('payload', payload)
	}
	function pause(event: MouseEvent, payload) {
		console.log('pause', event)
		console.log('payload', payload)
	}
	const playSwitch: SwitchState = {
		active: {
			value: 'pause',
			text: 'Pause',
			asset: 'emoji:pause',
			variant: 'outline',
			onclick: pause,
		},
		inactive: {
			value: 'play',
			text: 'Play',
			asset: 'emoji:play',
			variant: 'fill',
			onclick: play,
		},
	}
</script>

<menu {id} class={`l:switcher:${size} w:full nowrap`}>
	<Switch
		id={`${id}-player-button`}
		name="play"
		states={playSwitch}
		{color}
		{size}
		initial="inactive"
		container="main"
		dimensions="50 grow:1"
		{disabled}
	/>
	<Button
		id={`${id}-clear-button`}
		name="clear"
		value="clear"
		{color}
		{variant}
		{size}
		asset="emoji:clear"
		onclick={clear}
		disabled={disabled || state === 'clear'}>Clear</Button
	>
</menu>
