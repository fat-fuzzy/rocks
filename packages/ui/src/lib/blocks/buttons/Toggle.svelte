<svelte:options accessors={true} />

<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'
	import format from '../../utils/format'
	import mocks from '../../../data/mocks'

	const dispatch = createEventDispatcher()

	export let id = 'toggle'
	export let name = 'toggle'
	export let size = ''
	export let variant = ''
	export let color = ''
	export let disabled = false
	export let pressed = false
	export let asset = mocks.toggle.emoji // TODO: emoji OR svg
	export let text = mocks.toggle.text
	export let formaction = 'update'
	export let page = ''

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

	$: classes = `${size} ${variant} ${color}`
	$: pressed = $state.value === 'active'
</script>

<button
	{id}
	data-key={`${name}-${id}`}
	on:click|preventDefault={onClick}
	aria-pressed={pressed}
	class={classes}
	formaction={page ? `/${page}?/${formaction}` : `?/${formaction}`}
	{disabled}
	value={id}
	{name}
>
	{format.formatLabel(text, asset)}
</button>
