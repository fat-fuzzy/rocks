<svelte:options accessors={true} />

<script lang="ts">
	import type {ButtonType, ButtonState} from '$lib/types/constants'
	import {onMount, createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'

	const dispatch = createEventDispatcher()

	export let id = 'switch'
	export let name = 'switch'
	export let title = ''
	export let initial = false
	export let value = ''
	export let disabled = false
	export let color = ''
	export let variant = 'fill'
	export let layout = 'flex'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let shape = ''
	export let formaction: string | undefined = undefined

	export let type: ButtonType = 'submit'
	export let states: ButtonState // this component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state

	let machineConfig = {
		predictableActionArguments: true,
		id,
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
				pressed: $state.value === 'active',
				send,
			}
			dispatch('click', payload)
		}
	})

	$: currentState = states[$state.value.toString()]
	$: pressed = $state.value === 'active'
	$: layoutClasses = shape
		? `${shape} ${variant}`
		: `l:${layout}:${size} bp:${breakpoint} ${variant}`
	$: buttonClasses = `switch:${$state.value} ${layoutClasses} ${color} ${currentState.asset} ${align} ${size} font:${size}`
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
	data-key={`${name}-${id}`}
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
