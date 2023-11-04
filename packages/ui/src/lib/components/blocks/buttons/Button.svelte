<script lang="ts">
	import format from '$lib/utils/format'
	type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

	export let id = 'button'
	export let name = 'button'
	export let value = ''
	export let disabled = false
	export let color = ''
	export let variant = 'default'
	export let layout = 'switcher'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let asset = '' // emoji:value or svg:value
	export let text = ''
	export let formaction = 'enter'
	export let page = ''
	export let type: ButtonType = 'button'

	export let onClick = (event: MouseEvent) => {
		window.alert(`${format.formatLabel(text, asset)} Clicked`)
	}

	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variant} ${asset} ${align}`
</script>

<button
	{id}
	{type}
	data-key={`${name}-${id}`}
	on:click={onClick}
	class={classes}
	{disabled}
	formaction={page ? `/${page}?/${formaction}` : `?/${formaction}`}
	value={id}
	{name}
>
	<slot>{text}</slot>
</button>
