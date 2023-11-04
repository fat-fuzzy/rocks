<svelte:options accessors={true} />

<script lang="ts">
	import {onMount, createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'

	const dispatch = createEventDispatcher()

	export let id = 'toggle'
	export let name = 'toggle'
	export let initial = false
	export let value = ''
	export let disabled = false
	export let color = ''
	export let variant = ''
	export let layout = 'flex'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let asset = '' // emoji:value or svg:value
	export let text = ''
	export let formaction = 'update'
	export let page = ''

	let machineConfig = {
		predictableActionArguments: true,
		id,
		initial: initial ? 'active' : 'inactive',
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

	export let onClick = (event: MouseEvent) => {
		send('TOGGLE')
		const payload = {
			id,
			value,
			pressed: $state.value === 'active',
			send,
		}
		dispatch('click', payload)
	}

	onMount(() => {
		if (initial) {
			const payload = {
				id,
				value,
				asset,
				pressed: $state.value === 'active',
				send,
			}
			dispatch('click', payload)
		}
	})

	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variant} ${asset} ${align}`
	$: pressed = $state.value === 'active'
</script>

<button
	{id}
	data-key={id}
	on:click|preventDefault={onClick}
	aria-pressed={pressed}
	class={classes}
	formaction={page ? `/${page}?/${formaction}` : `?/${formaction}`}
	{disabled}
	{value}
	{name}
>
	{text}
</button>
