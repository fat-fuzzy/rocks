<svelte:options accessors={true} />

<script lang="ts">
	import type {ButtonType, ButtonState} from '$lib/types/constants'
	import {onMount, createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'

	const dispatch = createEventDispatcher()

	export let id = 'expand'
	export let controls = 'expand' // id of the DOM element that is controlled by this button
	export let name = 'expand'
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
	export let states: ButtonState // this component contains a button that will Expand the DOM element it controls when active, or minimize it when inactive.  Each state can have its own text and asset (if any) and possible style according to its active / inactive state

	let machineConfig = {
		predictableActionArguments: true,
		id,
		initial: initial ? 'active' : 'inactive',
		states: {
			inactive: {
				on: {EXPAND: 'active'},
			},
			active: {
				on: {EXPAND: 'inactive'},
			},
		},
	}
	let machine = createMachine(machineConfig)
	let {state, send} = useMachine(machine)

	let expanded = $state.value === 'active'

	export let onClick = (event: MouseEvent) => {
		send('EXPAND')
		const payload = {
			id,
			value,
			expanded: $state.value === 'active',
			send,
		}
		dispatch('click', payload)
	}

	onMount(() => {
		if (initial) {
			const payload = {
				id,
				value,
				expanded: $state.value === 'active',
				send,
			}
			dispatch('click', payload)
		}
	})

	$: expanded = $state.value === 'active'
	$: currentState = states[$state.value.toString()]
	$: layoutClasses = shape
		? `${shape} ${variant}`
		: `l:${layout}:${size} bp:${breakpoint} ${variant}`
	$: buttonClasses = `expand:${$state.value} ${layoutClasses} ${color} ${currentState.asset} ${align} ${size} font:${size}`
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
	aria-expanded={expanded}
	aria-controls={controls}
>
	{#if shape}
		<span class="sr-only">{title}</span>
	{:else}
		<span class="sr-only">{title}</span>
		<span class="viz-only">{currentState.text}</span>
	{/if}
</button>
