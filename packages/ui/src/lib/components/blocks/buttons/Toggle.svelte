<script lang="ts">
	import type {ButtonType} from '$types'
	import {onMount, createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'

	const dispatch = createEventDispatcher()

	/**
	 * State props
	 */
	export let id = 'toggle'
	export let name = 'toggle'
	export let text = ''
	export let title = ''
	export let initial = false
	export let value = ''
	export let disabled = false
	export let formaction: string | undefined = undefined

	/**
	 * Style props
	 */
	export let align = ''
	export let asset = '' // emoji:value or svg:value
	export let color = ''
	export let size = ''
	export let shape = ''
	export let variant = 'fill'

	export let container = ''
	export let dimensions = ''
	export let layout = 'flex'

	export let type: ButtonType = 'submit'

	let payloadId = name // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value

	let machineConfig = {
		predictableActionArguments: true,
		id: payloadId,
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

	let pressed = $state.value === 'active'

	export let onClick = (event: MouseEvent) => {
		send('TOGGLE')
		const payload = {
			id: payloadId,
			value,
			pressed: $state.value === 'active',
			send,
		}
		dispatch('click', payload)
	}

	onMount(() => {
		if (initial) {
			const payload = {
				id: payloadId,
				value,
				pressed: $state.value === 'active',
				send,
			}
			dispatch('click', payload)
		}
	})

	$: pressed = $state.value === 'active'
	$: containerClasses = container.startsWith('main')
		? `l:${container}:${dimensions}`
		: `l:${container}:${size}`
	$: layoutClasses = shape ? `l:stack:${size}` : `l:switcher:${size}`
	$: contextClasses = `${layoutClasses} ${containerClasses}`
	$: elementClasses = `${asset} ${color} ${size} shape:${shape} ${variant} align:${align} font:${size}`
	$: stateClasses = `toggle:${$state.value}`

	// Order is important
	$: buttonClasses = `${stateClasses} ${contextClasses} ${elementClasses}`
</script>

<button
	{id}
	{type}
	{name}
	{title}
	{disabled}
	{formaction}
	{value}
	class={buttonClasses}
	data-key={name}
	on:click={onClick}
	aria-pressed={pressed}
>
	{text}
</button>
