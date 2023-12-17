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
	export let breakpoint = ''
	export let color = ''
	export let layout = 'switcher'
	export let size = ''
	export let shape = ''
	export let variant = 'fill'

	const dispatch = createEventDispatcher()

	export let onClick = (event: MouseEvent) => {
		const payload = {
			id,
			value,
		}
		dispatch('click', payload)
	}

	$: layoutClasses = shape
		? `${shape} ${variant}`
		: `l:${layout}:${size} bp:${breakpoint} ${variant}`
	$: buttonClasses = `${layoutClasses} ${color} ${asset} ${align} ${size} font:${size}`
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
	<slot>{text}</slot>
</button>
