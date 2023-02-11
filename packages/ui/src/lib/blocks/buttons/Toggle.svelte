<svelte:options accessors={true} />

<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'
	import format from '../../utils/format'
	import mocks from '../../../data/mocks'

	const dispatch = createEventDispatcher()

	export let id = 'toggle'
	export let key = 'toggle'
	export let size = ''
	export let variant = ''
	export let initial = false
	export let color = ''
	export let disabled = false
	export let asset = mocks.toggle.emoji // TODO: emoji OR svg
	export let text = mocks.toggle.text

	export let onClick = (event: MouseEvent) => {
		send('TOGGLE')
		const payload = {
			id,
			pressed: $state.value === 'active',
			send,
		}
		dispatch('click', payload)
	}

	let machineConfig = {
		id: `toggle-${id}`,
		initial: 'inactive',
		states: {
			inactive: {
				on: {TOGGLE: 'active'},
			},
			active: {
				on: {TOGGLE: 'inactive'},
			},
		},
	}
	let machine = createMachine(machineConfig)
	let {state, send} = useMachine(machine)

	let pressed = initial

	$: classes = `${size} ${variant} ${color}`
	$: pressed = $state.value === 'active'
</script>

<button
	{id}
	type="button"
	data-key={key}
	on:click|preventDefault={onClick}
	aria-pressed={pressed}
	class={classes}
	{disabled}
>
	{format.formatLabel(text, asset)}
</button>
