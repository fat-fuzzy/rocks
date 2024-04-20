<script lang="ts">
	import type {ButtonType, ButtonState} from '$types'
	import {onMount, createEventDispatcher} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createActor} from 'xstate'
	import machines from '$lib/machines/button.machines'

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

	let machine = machines.createExpand(payloadId, initial ? 'active' : 'inactive')
	// Actor (instance of the machine logic, like a store)
	let actor = createActor(machine)
	let {snapshot} = useMachine(machine)
	let expanded = $snapshot.value === 'active'
	let currentState = states[$snapshot.value as string]

	actor.subscribe((snapshot) => {
		// snapshot is the machine's state
		expanded = snapshot.value === 'active'
		currentState = states[snapshot.value as string]
		const payload = {
			id: payloadId,
			value: currentState.value,
			expanded,
			actor,
		}
		dispatch('click', payload)
	})
	actor.start()

	export let onClick = (event: MouseEvent) => {
		actor.send({type: 'EXPAND'})
	}

	$: containerClasses = container.startsWith('main')
		? `l:${container}:${dimensions}`
		: `l:${container}:${size}`
	$: shapeClass = shape ? ` shape:${shape}` : ''
	$: alignClass = align ? `align:${align}` : ''
	$: layoutClasses = shapeClass ? `l:stack:${size}` : `l:flex`
	$: contextClasses = `${layoutClasses} ${containerClasses}`
	$: elementClasses = `${color} ${size} ${shapeClass} ${variant} ${alignClass} font:${size}`
	$: stateClasses = `expand:${$snapshot.value} ${currentState.asset}`

	// Order is important
	$: buttonClasses = `${stateClasses} ${contextClasses} ${elementClasses}`

	onMount(() => {
		// Set the initial state
		if (initial) actor.send({type: 'EXPAND'})
	})
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
	{#if shape}
		<span class="sr-only">{title}</span>
	{:else}
		<span class="sr-only">{title}</span>
		<span class="viz-only">{currentState.text ?? title}</span>
	{/if}
</button>
