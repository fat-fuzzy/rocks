<script lang="ts">
	import type {ButtonType} from '$types'
	import {createEventDispatcher} from 'svelte'

	export let id = 'button'
	export let title = ''
	export let name = ''
	export let disabled = false
	export let color = ''
	export let variant = 'fill'
	export let layout = 'switcher'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let asset = '' // emoji:value or svg:value
	export let shape = ''
	export let text = ''
	export let value = ''
	export let formaction: string | undefined = undefined
	// export let pathname: string | undefined = undefined
	export let type: ButtonType = 'submit'

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
	data-key={`${name}-${id}`}
	on:click={onClick}
>
	<slot>{text}</slot>
</button>
