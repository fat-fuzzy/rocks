<script lang="ts">
	import type {ButtonType} from '$types'
	import {createEventDispatcher} from 'svelte'

	/**
	 * State props
	 */
	export let id = 'button'
	export let title = ''
	export let name = ''
	export let text = ''
	export let value = ''
	export let disabled = false
	export let type: ButtonType = 'submit'
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
	export let layout = 'switcher'

	const dispatch = createEventDispatcher()

	export let onClick = (event: MouseEvent) => {
		const payload = {
			id: name,
			value,
		}
		dispatch('click', payload)
	}

	$: containerClasses = container.startsWith('main')
		? `l:${container}:${dimensions}`
		: `l:${container}:${size}`
	$: layoutClasses = `l:${layout}:${size}`
	$: contextClasses = `${layoutClasses} ${containerClasses}`
	$: elementClasses = `${asset} ${color} ${size} ${shape} ${variant} align:${align} font:${size}`

	// Order is important
	$: buttonClasses = `${contextClasses} ${elementClasses}`
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
>
	{text}
</button>
