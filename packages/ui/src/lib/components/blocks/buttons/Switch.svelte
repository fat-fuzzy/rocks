<script lang="ts">
	import type {ButtonType, ButtonState} from '$types'
	import {onMount, createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'

	const dispatch = createEventDispatcher()

	/**
	 * State props
	 */
	export let id = 'switch'
	export let name = 'switch'
	export let title = ''
	export let initial = false
	export let value = ''
	export let disabled = false
	export let type: ButtonType = 'submit'
	export let formaction: string | undefined = undefined
	export let states: ButtonState // this component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state

	/**
	 * Style props
	 */
	export let align = ''
	export let breakpoint = ''
	export let color = ''
	export let layout = 'flex'
	export let size = ''
	export let shape = ''
	export let variant = 'fill'

	let payloadId = name // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value

	let machineConfig = {
		predictableActionArguments: true,
		id: name,
		initial: initial ? 'active' : 'inactive',
		states: {
			inactive: {
				on: {SWITCH: 'active'},
			},
			active: {
				on: {SWITCH: 'inactive'},
			},
		},
	}
	let machine = createMachine(machineConfig)
	let {state, send} = useMachine(machine)

	let pressed = $state.value === 'active'

	export let onClick = (event: MouseEvent) => {
		send('SWITCH')
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
	$: currentState = states[$state.value.toString()]
	$: layoutClasses = shape
		? `${shape} ${variant}`
		: `l:${layout}:${size} bp:${breakpoint} ${variant}`
	$: buttonClasses = `switch:${$state.value} ${layoutClasses} ${color} ${align} ${size} font:${size} ${currentState.asset}`
</script>

<button
	{id}
	{type}
	{name}
	{title}
	{disabled}
	{formaction}
	value={currentState.value}
	class={buttonClasses}
	data-key={name}
	on:click={onClick}
	aria-pressed={pressed}
>
	{#if shape}
		<span class="sr-only">{title}</span>
	{:else}
		<span class="sr-only">{title}</span>
		<span class="viz-only">{currentState.text}</span>
	{/if}
</button>
