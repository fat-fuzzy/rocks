<script lang="ts">
	import type {ButtonState} from '$types'
	import {createEventDispatcher, onMount} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createActor} from 'xstate'
	import machines from '$lib/machines/button.machines'

	const dispatch = createEventDispatcher()

	/**
	 * State props
	 */
	export let id = 'switch' // TODO: use for machine id
	export let name = 'switch'
	export let title = ''
	export let initial = false
	export let disabled = false
	export let type = 'submit'
	export let formaction: string | undefined = undefined
	export let states: ButtonState // this component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state

	/**
	 * Style props
	 */
	export let align = ''
	export let color = ''
	export let size = ''
	export let shape = ''
	export let value = ''
	export let variant = 'fill'

	export let container = ''
	export let dimensions = ''
	export let layout = 'flex'

	let payloadId = name // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value

	// Actor (instance of the machine logic, like a store)
	let machine = machines.createSwitch(payloadId, initial ? 'active' : 'inactive')
	let actor = createActor(machine)
	let {snapshot} = useMachine(machine)
	let pressed = $snapshot.value === 'active'
	let currentState = states[$snapshot.value as string]

	actor.subscribe((snapshot) => {
		// snapshot is the machine's state
		pressed = snapshot.value === 'active'
		currentState = states[snapshot.value as string]
		const payload = {
			id: payloadId,
			value: currentState.value,
			pressed,
			actor,
		}
		dispatch('click', payload)
	})
	actor.start()

	export let onClick = (event: MouseEvent) => {
		actor.send({type: 'SWITCH'})
	}

	$: containerClasses = container.startsWith('main')
		? `l:${container}:${dimensions}`
		: `l:${container}:${size}`
	$: shapeClass = shape ? ` shape:${shape}` : ''
	$: alignClass = align ? `align:${align}` : ''
	$: layoutClasses = shapeClass ? `l:stack:${size}` : `l:flex`
	$: contextClasses = `${layoutClasses} ${containerClasses}`
	$: elementClasses = `${color} ${size} ${shapeClass} ${variant} ${alignClass} font:${size}`
	$: stateClasses = `switch:${$snapshot.value} ${currentState.asset} ${
		currentState.variant || variant
	}`
	// Order is important
	$: buttonClasses = `${stateClasses} ${contextClasses} ${elementClasses}`

	onMount(() => {
		// Set the initial state
		if (initial) actor.send({type: 'SWITCH'})
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
	aria-pressed={pressed}
>
	{#if shape}
		<span class="sr-only">{title}</span>
	{:else}
		<span class="sr-only">{title}</span>
		<span class="viz-only">{currentState.text}</span>
	{/if}
</button>
