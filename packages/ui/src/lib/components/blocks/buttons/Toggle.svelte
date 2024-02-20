<script lang="ts">
	import type {ButtonType} from '$types'
	import {createEventDispatcher, onMount} from 'svelte'
	import {useMachine} from '@xstate/svelte'
	import {createActor} from 'xstate'
	import machines from '$lib/machines/button.machines'

	const dispatch = createEventDispatcher()

	/**
	 * State props
	 */
	export let id = 'toggle' // TODO: use for machine id
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

	let machine = machines.createToggle(payloadId, initial ? 'active' : 'inactive')
	// Actor (instance of the machine logic, like a store)
	let actor = createActor(machine)
	let {snapshot} = useMachine(machine)
	let pressed = $snapshot.value === 'active'

	actor.subscribe((snapshot) => {
		// snapshot is the machine's state
		pressed = snapshot.value === 'active'
		const payload = {
			id: payloadId,
			value,
			pressed,
			actor,
		}
		dispatch('click', payload)
	})
	actor.start()

	export let onClick = (event: MouseEvent) => {
		actor.send({type: 'TOGGLE'})
	}

	$: pressed = $snapshot.value === 'active'
	$: containerClasses = container.startsWith('main')
		? `l:${container}:${dimensions}`
		: `l:${container}:${size}`
	$: shapeClass = shape ? ` shape:${shape}` : ''
	$: alignClass = align ? `align:${align}` : ''
	$: layoutClasses = shapeClass ? `l:stack:${size}` : `l:flex`
	$: contextClasses = `${layoutClasses} ${containerClasses}`
	$: elementClasses = `${asset} ${color} ${size} ${shapeClass} ${variant} align:${alignClass} font:${size}`
	$: stateClasses = `toggle:${$snapshot.value}`

	// Order is important
	$: buttonClasses = `${stateClasses} ${contextClasses} ${elementClasses}`

	onMount(() => {
		// Set the initial state
		if (initial) actor.send({type: 'TOGGLE'})
	})
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
