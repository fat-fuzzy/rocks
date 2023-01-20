<svelte:options accessors={true} />

<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'
	import format from '../../utils/format'

	const dispatch = createEventDispatcher()

	export let id = 'toggle'
	export let size = ''
	export let icon = ''
	export let variant = ''
	export let initial = false
	export let color = ''
	export let text = 'Toggle'
	export let disabled = false

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

	$: classes = `${icon} ${size} ${variant} ${color}`
	$: pressed = $state.value === 'active'

	const onClick = () => {
		send('TOGGLE')
		const payload = {
			id,
			pressed: $state.value === 'active',
			send,
		}
		dispatch('toggle', payload)
	}
</script>

<button {id} type="button" on:click={onClick} aria-pressed={pressed} class={classes} {disabled}>
	{format.formatLabel(text, icon)}
</button>
