<script lang="ts">
	import type {ButtonType, ButtonState} from '$types'
	import {onMount, createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'

	const dispatch = createEventDispatcher()

	/**
	 * State props
	 */
	export let id = 'expand'
	export let controls = 'expand' // id of the DOM element that is controlled by this button
	export let name = 'expand'
	export let title = ''
	export let initial = false
	export let value = ''
	export let disabled = false
	export let type: ButtonType = 'submit'
	export let formaction: string | undefined = undefined
	export let states: ButtonState // this component contains a button that will Expand the DOM element it controls when active, or minimize it when inactive. Each state can have its own text, style, and asset (if any) according to its active / inactive state

	/**
	 * Style props
	 */
	export let align = ''
	export let color = ''
	export let size = ''
	export let shape = ''
	export let variant = 'fill'

	export let container = ''
	export let dimensions = ''
	export let layout = 'flex'

	let payloadId = name // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value

	let machineConfig = {
		predictableActionArguments: true,
		id: payloadId,
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
			id: payloadId,
			value,
			expanded: $state.value === 'active',
			send,
		}
		dispatch('click', payload)
	}

	onMount(() => {
		if (initial) {
			const payload = {
				id: payloadId,
				value,
				expanded: $state.value === 'active',
				send,
			}
			dispatch('click', payload)
		}
	})

	$: expanded = $state.value === 'active'
	$: currentState = states[$state.value.toString()]
	$: containerClasses = container.startsWith('main')
		? `l:${container}:${dimensions}`
		: `l:${container}:${size}`
	$: layoutClasses = `l:${layout}:${size}`
	$: contextClasses = `${layoutClasses} ${containerClasses}`
	$: elementClasses = `${color} ${size} ${shape} ${variant} align:${align} font:${size}`
	$: stateClasses = `expand:${$state.value} ${currentState.asset}`

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
	value={currentState.value}
	class={buttonClasses}
	data-key={name}
	on:click={onClick}
	aria-expanded={expanded}
	aria-controls={controls}
>
	{#if shape !== 'default'}
		<span class="sr-only">{title}</span>
	{:else}
		<span class="sr-only">{title}</span>
		<span class="viz-only">{currentState.text ?? title}</span>
	{/if}
</button>
