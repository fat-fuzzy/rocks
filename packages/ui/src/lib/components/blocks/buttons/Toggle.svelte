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
	export let breakpoint = ''
	export let color = ''
	export let layout = 'flex'
	export let size = ''
	export let shape = ''
	export let variant = 'fill'

	export let type: ButtonType = 'submit'

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

	let pressed = $state.value === 'active'

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
				pressed: $state.value === 'active',
				send,
			}
			dispatch('click', payload)
		}
	})

	$: pressed = $state.value === 'active'
	$: layoutClasses = shape
		? `${shape} ${variant}`
		: `l:${layout}:${size} bp:${breakpoint} ${variant}`
	$: buttonClasses = `toggle:${$state.value} ${layoutClasses} ${color} ${asset} ${align} ${size} font:${size}`
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
	data-key={`${name}-${id}`}
	on:click={onClick}
	aria-pressed={pressed}
>
	{#if shape}
		<span class="sr-only">{text}</span>
	{:else}
		{text}
	{/if}
</button>
