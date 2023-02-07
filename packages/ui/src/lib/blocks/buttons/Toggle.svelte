<svelte:options accessors={true} />

<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'
	import format from '../../utils/format'
	import fixtures from '../../../data/fixtures'

	const dispatch = createEventDispatcher()

	export let id = 'toggle'
	export let size = ''
	export let variant = ''
	export let initial = false
	export let color = ''
	export let disabled = false
	export let asset = fixtures.toggle.asset
	export let text = fixtures.toggle.text

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
	{format.formatLabel(text, asset)}
</button>
